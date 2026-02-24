const OPENAI_API_URL = "https://api.openai.com/v1/responses";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    },
    body: JSON.stringify(body)
  };
}

function coachSystemPrompt() {
  return [
    "You are Codex Elite Coach, a concise, high-performance coding mentor.",
    "Produce practical, actionable guidance with clean structure.",
    "Prioritize clarity, sequence, and measurable outcomes.",
    "Tone: confident, calm, and direct.",
    "Avoid fluff and avoid generic motivational language.",
    "When user context is weak, ask 2-3 concrete clarifying assumptions and proceed with best-guess guidance."
  ].join(" ");
}

function actionInstruction(action) {
  const map = {
    daily_plan:
      "Create a 90-minute plan with exact sequence, time blocks, and deliverables aligned to the module context.",
    explain_module:
      "Explain the current module simply in: what matters, what to practice, what to avoid, and how to pass checkpoint.",
    improve_prompt:
      "Rewrite the user prompt into an elite prompt with goal, constraints, quality gates, and verification format.",
    review_notes:
      "Audit the user notes, identify weak patterns, and return a targeted improvement plan for next 3 sessions."
  };
  return map[action] || map.daily_plan;
}

function extractText(responseJson) {
  if (typeof responseJson.output_text === "string" && responseJson.output_text.trim()) {
    return responseJson.output_text.trim();
  }

  const outputs = Array.isArray(responseJson.output) ? responseJson.output : [];
  for (const outputItem of outputs) {
    const content = Array.isArray(outputItem.content) ? outputItem.content : [];
    for (const chunk of content) {
      if (chunk && chunk.type === "output_text" && typeof chunk.text === "string" && chunk.text.trim()) {
        return chunk.text.trim();
      }
    }
  }
  return "";
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json(500, { error: "OPENAI_API_KEY is missing on server." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (_error) {
    return json(400, { error: "Invalid JSON body." });
  }

  const action = String(payload.action || "daily_plan");
  const userInput = String(payload.userInput || "").slice(0, 6000);
  const context = payload.context || {};

  const userMessage = [
    `Action: ${action}`,
    `Instruction: ${actionInstruction(action)}`,
    "",
    "Context:",
    JSON.stringify(context, null, 2),
    "",
    "User input:",
    userInput || "(No additional user input provided.)",
    "",
    "Output requirements:",
    "1) Start with a short diagnosis of current situation.",
    "2) Then provide a practical step-by-step plan.",
    "3) Include a concrete prompt user can paste into Codex right now.",
    "4) End with a short checklist for success verification."
  ].join("\n");

  try {
    const openaiResponse = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        temperature: 0.45,
        max_output_tokens: 900,
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: coachSystemPrompt() }]
          },
          {
            role: "user",
            content: [{ type: "input_text", text: userMessage }]
          }
        ]
      })
    });

    const responseJson = await openaiResponse.json();
    if (!openaiResponse.ok) {
      return json(openaiResponse.status, {
        error: responseJson.error?.message || "OpenAI API request failed."
      });
    }

    const output = extractText(responseJson);
    if (!output) {
      return json(502, { error: "OpenAI returned an empty response." });
    }

    return json(200, { output });
  } catch (error) {
    return json(500, { error: `AI coach request failed: ${error.message}` });
  }
};
