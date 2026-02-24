const STORAGE_KEY = "codex_mastery_state_v1";
const TIMER_DEFAULT_SECONDS = 90 * 60;
const TASK_XP = 120;
const MODULE_BONUS_XP = 500;
const CHECKIN_XP = 40;

const RANK_TIERS = [
  { name: "Initiate", minXp: 0 },
  { name: "Operator", minXp: 1200 },
  { name: "Specialist", minXp: 3000 },
  { name: "Architect", minXp: 5200 },
  { name: "Commander", minXp: 8200 },
  { name: "Grandmaster", minXp: 12000 }
];

const modules = [
  {
    id: "level-1",
    level: "Level 1",
    title: "Execution Fundamentals",
    duration: "Week 1",
    summary:
      "Build mechanical reliability: precise prompts, strict constraints, and validation loops that eliminate vague AI usage.",
    operatingStandard:
      "Every request must contain objective, constraints, acceptance criteria, and verification command. No ambiguous asks.",
    outcomes: [
      "Write structured prompts that consistently produce executable output.",
      "Force Codex to show plan, implementation, and verification in one flow.",
      "Detect weak responses and re-prompt without losing context.",
      "Use task contracts (goal + constraints + done conditions) for every change.",
      "Establish daily journaling and KPI tracking discipline."
    ],
    weeklyPlan: [
      {
        day: "Day 1",
        focus: "Prompt Contracts",
        objective: "Create a reusable request format for all coding tasks.",
        sprint: "Run 10 micro tasks and refine wording until first-pass quality is stable.",
        deliverable: "Prompt contract v1 in your notes."
      },
      {
        day: "Day 2",
        focus: "Constraint Control",
        objective: "Train Codex to honor tooling/style/test constraints.",
        sprint: "Run 8 tasks with explicit stack and formatting limits.",
        deliverable: "Constraint block template with 5 default clauses."
      },
      {
        day: "Day 3",
        focus: "Verification Loops",
        objective: "Require test evidence and risk output.",
        sprint: "For each task, demand verification commands and residual risk notes.",
        deliverable: "Verification checklist v1."
      },
      {
        day: "Day 4",
        focus: "Failure Recovery",
        objective: "Recover quickly from bad outputs.",
        sprint: "Intentionally submit 5 under-specified prompts, then rescue each with stronger constraints.",
        deliverable: "Recovery protocol with 3 escalation levels."
      },
      {
        day: "Day 5",
        focus: "Timed Assessment",
        objective: "Execute 12 tasks under a 90-minute session.",
        sprint: "Measure first-pass success and completion speed.",
        deliverable: "Week-1 performance baseline."
      }
    ],
    drills: [
      "Convert fuzzy request into a strict engineering brief.",
      "Force Codex to state assumptions before coding.",
      "Require exact file references in every summary.",
      "Require test commands and expected outputs.",
      "Require " + "\"cannot verify\"" + " when the environment blocks testing.",
      "Require concise risk list before final output.",
      "Add rollback instruction for non-trivial edits.",
      "Document one failed prompt and the corrected version daily."
    ],
    antiPatterns: [
      "Asking for " + "\"help\"" + " without deliverable format.",
      "Skipping acceptance criteria.",
      "Accepting code without verification evidence.",
      "Changing scope mid-task without restating objective.",
      "Treating one good run as a repeatable workflow."
    ],
    artifacts: [
      "Prompt contract template",
      "Verification checklist",
      "Failure recovery protocol",
      "Day-by-day prompt journal",
      "Baseline KPI snapshot"
    ],
    scorecard: [
      { metric: "First-pass success", target: ">= 80%", failSignal: "Multiple re-prompts needed per task" },
      { metric: "Constraint compliance", target: ">= 95%", failSignal: "Codex ignores file/style/test requirements" },
      { metric: "Verification coverage", target: "100%", failSignal: "Tasks marked done without proof" },
      { metric: "Cycle speed", target: "< 10 min/task", failSignal: "Frequent reset or context drift" }
    ],
    promptStack: [
      {
        title: "Universal Task Contract",
        prompt:
          "Goal: [specific outcome]\n" +
          "Context: [repo + files + relevant constraints]\n" +
          "Requirements:\n" +
          "- Use [language/tooling]\n" +
          "- Keep changes minimal and safe\n" +
          "- Add or update tests\n" +
          "Execution format:\n" +
          "1) Discover context\n" +
          "2) Propose short plan\n" +
          "3) Implement\n" +
          "4) Run verification\n" +
          "5) Report changed files, risks, and next steps"
      },
      {
        title: "Re-Prompt Recovery",
        prompt:
          "The previous result missed requirements. Retry with these hard constraints:\n" +
          "- Keep scope to [exact scope]\n" +
          "- Do not edit unrelated files\n" +
          "- Add regression test for [case]\n" +
          "- Return exact verification commands and output summary"
      },
      {
        title: "Verification-First Closeout",
        prompt:
          "Before finalizing, provide:\n" +
          "- Test commands run and observed result\n" +
          "- Static checks/lint status\n" +
          "- Residual risks\n" +
          "- Why this change is minimal and safe"
      }
    ],
    tasks: [
      { id: "l1_t1", label: "Create a personal task contract template and test it on 3 small tasks." },
      { id: "l1_t2", label: "Execute 10 micro tasks with explicit constraints and log pass/fail." },
      { id: "l1_t3", label: "Produce a verification checklist and apply it to 5 tasks." },
      { id: "l1_t4", label: "Practice failure recovery on 5 intentionally weak prompts." },
      { id: "l1_t5", label: "Record 10 prompt improvements in journal format." },
      { id: "l1_t6", label: "Enforce file-level references in every Codex summary." },
      { id: "l1_t7", label: "Enforce test evidence in every completed task." },
      { id: "l1_t8", label: "Run a 90-minute timed drill with 12 tasks." },
      { id: "l1_t9", label: "Calculate Week-1 first-pass success and average completion time." },
      { id: "l1_t10", label: "Publish your Level 1 rulebook (1-page operating standard)." }
    ],
    checkpoint: {
      passCriteria: [
        "First-pass success >= 80% across at least 30 tasks.",
        "Verification evidence present for every completed task.",
        "Prompt template reused successfully in at least 3 different task types."
      ],
      failureCriteria: [
        "Frequent scope drift and missing acceptance criteria.",
        "Inability to explain why a task is considered done.",
        "No repeatable prompt structure."
      ],
      retakeProtocol: [
        "Repeat Days 2-4 with stricter constraints.",
        "Perform 15 additional micro tasks using one stable template.",
        "Retest with a timed 90-minute session."
      ]
    }
  },
  {
    id: "level-2",
    level: "Level 2",
    title: "Repo Combat",
    duration: "Week 2",
    summary:
      "Operate confidently in unknown codebases: fast orientation, safe modifications, and measurable bug-fix throughput.",
    operatingStandard:
      "Every cold-repo session starts with map -> risks -> plan -> smallest safe patch -> regression proof.",
    outcomes: [
      "Discover architecture quickly in unfamiliar repositories.",
      "Identify critical files and change boundaries in under 10 minutes.",
      "Deliver minimal safe fixes with regression tests.",
      "Generate reliable handoff summaries and change logs.",
      "Avoid damaging broad edits in legacy code."
    ],
    weeklyPlan: [
      {
        day: "Day 1",
        focus: "Repo Mapping",
        objective: "Extract architecture and critical paths quickly.",
        sprint: "Run discovery in 2 unknown repos and compare maps.",
        deliverable: "Repo map template with hotspots and ownership assumptions."
      },
      {
        day: "Day 2",
        focus: "Change Boundary Detection",
        objective: "Constrain edits to minimal files.",
        sprint: "Fix 4 issues while touching the fewest lines possible.",
        deliverable: "Boundary checklist for safe editing."
      },
      {
        day: "Day 3",
        focus: "Bug Reproduction",
        objective: "Demand reproducible failures before patching.",
        sprint: "Capture repro steps and expected behavior for 5 bug reports.",
        deliverable: "Repro-first bug workflow."
      },
      {
        day: "Day 4",
        focus: "Regression Armor",
        objective: "Add tests that fail before and pass after.",
        sprint: "Ship 3 fixes with strict regression tests.",
        deliverable: "Regression test checklist."
      },
      {
        day: "Day 5",
        focus: "Speed Trial",
        objective: "Go from zero context to merged-quality patch in under 45 min.",
        sprint: "Run 2 timed scenarios and compare metrics.",
        deliverable: "Time-to-fix benchmark report."
      }
    ],
    drills: [
      "Request architecture summary with confidence estimates.",
      "Ask for probable side effects before code edits.",
      "Require exact location of root cause (file + function + line context).",
      "Require smallest viable patch and rationale.",
      "Ask for alternative fixes and why one is chosen.",
      "Force test strategy before implementation.",
      "Require changelog summary in business language.",
      "Run same bug in different repos to test transfer skill."
    ],
    antiPatterns: [
      "Editing many files before root cause clarity.",
      "Assuming architecture instead of proving it.",
      "Patch without reproducible failing case.",
      "Skipping regression tests because fix seems obvious.",
      "No rollback path for risky changes."
    ],
    artifacts: [
      "Cold repo map template",
      "Safe boundary checklist",
      "Reproduction-first bug SOP",
      "Regression test library",
      "Timed patch benchmark"
    ],
    scorecard: [
      { metric: "Repo orientation time", target: "<= 10 min", failSignal: "Need repeated scanning to understand flow" },
      { metric: "Fix cycle time", target: "<= 45 min", failSignal: "Patch delivery drifts beyond time box" },
      { metric: "Regression coverage", target: "100% of fixes", failSignal: "Fixes lack failing-before tests" },
      { metric: "Edit footprint", target: "Minimal files", failSignal: "Unnecessary broad modifications" }
    ],
    promptStack: [
      {
        title: "Cold Repo Discovery",
        prompt:
          "Treat this as a zero-context repo.\n" +
          "Return:\n" +
          "1) High-level architecture map\n" +
          "2) Key files for [target behavior]\n" +
          "3) Risk hotspots\n" +
          "4) Minimal set of files likely needed for a fix"
      },
      {
        title: "Bug Repro Contract",
        prompt:
          "Do not patch yet.\n" +
          "First provide exact reproduction steps, expected vs actual behavior, and likely failing path.\n" +
          "Then propose smallest safe fix with regression test plan."
      },
      {
        title: "Patch + Evidence",
        prompt:
          "Implement the minimal fix and include:\n" +
          "- Before/after behavior\n" +
          "- Regression test details\n" +
          "- Files changed and why\n" +
          "- Residual risk and rollback note"
      }
    ],
    tasks: [
      { id: "l2_t1", label: "Map two unfamiliar repos and produce architecture notes in under 10 minutes each." },
      { id: "l2_t2", label: "Build a safe-edit boundary checklist and apply it on 4 bug fixes." },
      { id: "l2_t3", label: "Practice repro-first workflow on 5 bug tickets." },
      { id: "l2_t4", label: "Ship 3 minimal patches with regression tests that fail-before/pass-after." },
      { id: "l2_t5", label: "Generate changelog summaries for each patch in stakeholder language." },
      { id: "l2_t6", label: "Run two 45-minute zero-context patch simulations." },
      { id: "l2_t7", label: "Track average files touched per fix and reduce unnecessary edits." },
      { id: "l2_t8", label: "Document side effects and rollback path for each non-trivial fix." },
      { id: "l2_t9", label: "Create a reusable cold-repo prompt pack (discovery, bug, patch)." },
      { id: "l2_t10", label: "Pass a final blind repo challenge with full verification evidence." }
    ],
    checkpoint: {
      passCriteria: [
        "Deliver at least 6 verified fixes in unknown repos.",
        "Average orientation time <= 10 minutes.",
        "Regression tests included for 100% of delivered fixes."
      ],
      failureCriteria: [
        "Broad edits with weak root-cause certainty.",
        "No reproducible evidence before patching.",
        "Inconsistent verification quality."
      ],
      retakeProtocol: [
        "Repeat Day 3 and Day 4 with stricter patch boundaries.",
        "Perform 3 additional blind bug-fix drills.",
        "Reassess with one final timed simulation."
      ]
    }
  },
  {
    id: "level-3",
    level: "Level 3",
    title: "Prompt Systems Engineering",
    duration: "Week 3",
    summary:
      "Design reusable prompt systems that produce consistent outcomes across task classes and repositories.",
    operatingStandard:
      "Prompts are versioned assets: each has trigger condition, required inputs, expected output schema, and quality tests.",
    outcomes: [
      "Create modular prompt frameworks for build, fix, refactor, and review.",
      "Reduce prompt length while increasing control and output quality.",
      "Implement output schemas to eliminate ambiguity.",
      "Version prompts and evaluate them with A/B testing.",
      "Build a personal prompt registry with usage conditions."
    ],
    weeklyPlan: [
      {
        day: "Day 1",
        focus: "Prompt Inventory",
        objective: "Catalog your current prompts and failure modes.",
        sprint: "Audit 30 recent prompts and cluster by task type.",
        deliverable: "Prompt inventory with quality scores."
      },
      {
        day: "Day 2",
        focus: "Template Architecture",
        objective: "Create standardized prompt skeletons.",
        sprint: "Build four base templates: feature, bug, refactor, review.",
        deliverable: "Prompt framework v1."
      },
      {
        day: "Day 3",
        focus: "Output Schemas",
        objective: "Force deterministic response structure.",
        sprint: "Add strict sections: plan, patch, tests, risks, open questions.",
        deliverable: "Schema block library."
      },
      {
        day: "Day 4",
        focus: "A/B Evaluation",
        objective: "Compare prompt variants on speed and quality.",
        sprint: "Run 20 tasks with two competing templates and score outcomes.",
        deliverable: "Prompt benchmark report."
      },
      {
        day: "Day 5",
        focus: "System Release",
        objective: "Package your prompt system for repeated use.",
        sprint: "Finalize template docs and usage conditions.",
        deliverable: "Prompt playbook v1."
      }
    ],
    drills: [
      "Define minimum required inputs for each prompt type.",
      "Shorten verbose prompts without losing control.",
      "Enforce structured response schema in every output.",
      "Inject quality gates for tests and risks.",
      "Add fallback behavior when context is missing.",
      "Run A/B experiments and capture performance metrics.",
      "Create escalation prompts for poor outputs.",
      "Tag prompts by when-not-to-use conditions."
    ],
    antiPatterns: [
      "One giant prompt for every scenario.",
      "No output structure or validation rules.",
      "Copying prompts without measuring effectiveness.",
      "Ignoring context-quality as a variable.",
      "No version history for prompt changes."
    ],
    artifacts: [
      "Prompt inventory",
      "Four-template framework",
      "Output schema library",
      "A/B benchmark log",
      "Prompt playbook v1"
    ],
    scorecard: [
      { metric: "Template reuse", target: ">= 70% tasks", failSignal: "Frequent one-off prompt writing" },
      { metric: "Output format adherence", target: "100%", failSignal: "Responses miss required sections" },
      { metric: "Quality uplift vs baseline", target: ">= 25%", failSignal: "No measurable improvement" },
      { metric: "Prompt length efficiency", target: "-20% tokens", failSignal: "Prompts keep expanding" }
    ],
    promptStack: [
      {
        title: "Feature Build Template",
        prompt:
          "Objective: [feature]\n" +
          "Context files: [list]\n" +
          "Constraints: [style/perf/security]\n" +
          "Output schema:\n" +
          "- Plan\n" +
          "- Implementation\n" +
          "- Tests\n" +
          "- Risks\n" +
          "- Next actions"
      },
      {
        title: "Refactor Template",
        prompt:
          "Refactor target: [component/module]\n" +
          "Do not change behavior.\n" +
          "Return:\n" +
          "1) Current pain points\n" +
          "2) Refactor plan\n" +
          "3) Code changes\n" +
          "4) Proof of behavior parity"
      },
      {
        title: "Review Template",
        prompt:
          "Act as reviewer. Findings first, ordered by severity.\n" +
          "Check: correctness, regression risk, test gaps, security, reliability.\n" +
          "Then open questions. Then summary."
      }
    ],
    tasks: [
      { id: "l3_t1", label: "Audit 30 prompts and classify failures by root cause." },
      { id: "l3_t2", label: "Create four standardized prompt templates with clear triggers." },
      { id: "l3_t3", label: "Add strict output schema blocks to each template." },
      { id: "l3_t4", label: "Run A/B tests across 20 tasks and score quality + speed." },
      { id: "l3_t5", label: "Publish prompt registry with when-to-use / when-not-to-use notes." },
      { id: "l3_t6", label: "Design escalation prompts for low-quality outputs." },
      { id: "l3_t7", label: "Reduce average prompt length by 20% without quality drop." },
      { id: "l3_t8", label: "Reach 70% template reuse across weekly workload." },
      { id: "l3_t9", label: "Document version history for each template revision." },
      { id: "l3_t10", label: "Validate templates in a fresh repo and record transferability." }
    ],
    checkpoint: {
      passCriteria: [
        "Four stable templates used across at least 25 tasks.",
        "Output schema adherence at 100%.",
        "Measured quality uplift >= 25% over baseline."
      ],
      failureCriteria: [
        "Prompts remain ad-hoc and inconsistent.",
        "No benchmark evidence for improvements.",
        "High variance in output structure."
      ],
      retakeProtocol: [
        "Re-run A/B tests with tighter scoring criteria.",
        "Refine template triggers and required inputs.",
        "Execute 10 additional transfer tasks in new repos."
      ]
    }
  },
  {
    id: "level-4",
    level: "Level 4",
    title: "Quality Engineering",
    duration: "Week 4",
    summary:
      "Turn Codex into a quality accelerator: review rigor, risk detection, and preventive hardening.",
    operatingStandard:
      "No change is complete until correctness, regression, security, and reliability checks are explicitly addressed.",
    outcomes: [
      "Run structured review workflows with severity-ranked findings.",
      "Detect hidden regressions and weak assumptions early.",
      "Drive test depth: edge cases, failure paths, and invariants.",
      "Generate actionable hardening plans from code scans.",
      "Cut escaped defect rate by at least half."
    ],
    weeklyPlan: [
      {
        day: "Day 1",
        focus: "Review Framework",
        objective: "Standardize review output format and severity model.",
        sprint: "Review 5 diffs and enforce findings-first outputs.",
        deliverable: "Review SOP v1."
      },
      {
        day: "Day 2",
        focus: "Risk Taxonomy",
        objective: "Build repeatable risk categories.",
        sprint: "Tag defects by correctness/security/reliability/performance.",
        deliverable: "Risk taxonomy matrix."
      },
      {
        day: "Day 3",
        focus: "Test Depth",
        objective: "Expand tests beyond happy paths.",
        sprint: "Add edge-case and failure-mode tests to 3 modules.",
        deliverable: "Edge-case checklist."
      },
      {
        day: "Day 4",
        focus: "Hardening Pass",
        objective: "Perform quality strike on one real project.",
        sprint: "Run code review sweep, patch high-risk issues, verify.",
        deliverable: "Hardening report."
      },
      {
        day: "Day 5",
        focus: "Defect Reduction Audit",
        objective: "Quantify quality gain.",
        sprint: "Compare pre- and post-work defect trend.",
        deliverable: "Quality delta snapshot."
      }
    ],
    drills: [
      "Force severity-tagged findings with file/line evidence.",
      "Request open questions before merge recommendation.",
      "Require explicit test gap list for every review.",
      "Probe for concurrency, null handling, and boundary failures.",
      "Check for rollback and monitoring readiness.",
      "Review own patch after implementation as separate pass.",
      "Write minimal reproduction for each high-severity finding.",
      "Verify fixes close root cause, not symptoms."
    ],
    antiPatterns: [
      "Summary-only reviews with no concrete findings.",
      "Unranked issue lists that hide critical risks.",
      "No line-level evidence in reports.",
      "Skipping negative-path tests.",
      "Closing tickets without monitoring plan."
    ],
    artifacts: [
      "Review SOP",
      "Risk taxonomy matrix",
      "Edge-case test checklist",
      "Hardening report",
      "Defect reduction dashboard"
    ],
    scorecard: [
      { metric: "Escaped defects", target: "-50%", failSignal: "Post-done issues remain frequent" },
      { metric: "Review evidence quality", target: "100% line refs", failSignal: "Vague findings" },
      { metric: "Edge/failure test coverage", target: ">= 80% critical paths", failSignal: "Mostly happy-path tests" },
      { metric: "High-risk closure rate", target: "100%", failSignal: "Known severe issues left unresolved" }
    ],
    promptStack: [
      {
        title: "Findings-First Review",
        prompt:
          "Review this change as a staff engineer.\n" +
          "Output:\n" +
          "1) Findings (severity ordered, with file/line refs)\n" +
          "2) Missing tests\n" +
          "3) Open questions\n" +
          "4) Short summary"
      },
      {
        title: "Risk Probe",
        prompt:
          "Assess this implementation for hidden risks in:\n" +
          "- Correctness\n" +
          "- Security\n" +
          "- Reliability\n" +
          "- Performance\n" +
          "List concrete scenarios and mitigation actions."
      },
      {
        title: "Hardening Sprint",
        prompt:
          "Run a hardening pass on [module].\n" +
          "Identify top 5 risks, patch highest-impact items, add tests, and report residual risk."
      }
    ],
    tasks: [
      { id: "l4_t1", label: "Create and apply a findings-first review SOP to 5 diffs." },
      { id: "l4_t2", label: "Build risk taxonomy and classify recent defects." },
      { id: "l4_t3", label: "Add edge-case/failure-mode tests to 3 critical modules." },
      { id: "l4_t4", label: "Run one full hardening sweep on a real project area." },
      { id: "l4_t5", label: "Patch all P1/P2 findings from the sweep and verify fixes." },
      { id: "l4_t6", label: "Document line-level evidence for every major finding." },
      { id: "l4_t7", label: "Create rollback + monitoring notes for risky fixes." },
      { id: "l4_t8", label: "Run self-review on your own patches before closeout." },
      { id: "l4_t9", label: "Measure escaped defects against pre-course baseline." },
      { id: "l4_t10", label: "Deliver a final Week-4 quality report with metrics." }
    ],
    checkpoint: {
      passCriteria: [
        "Escaped defects reduced by >= 50%.",
        "All high-severity findings resolved or explicitly tracked.",
        "Review reports consistently include line-level evidence."
      ],
      failureCriteria: [
        "Reviews are generic or summary-only.",
        "No measurable quality delta.",
        "High-risk issues left without action plan."
      ],
      retakeProtocol: [
        "Repeat hardening sweep on a second module.",
        "Add missing failure tests and rerun quality audit.",
        "Reassess metrics after one additional week of strict review."
      ]
    }
  },
  {
    id: "level-5",
    level: "Level 5",
    title: "Speed + Depth Delivery",
    duration: "Weeks 5-6",
    summary:
      "Ship complete, production-ready features fast without sacrificing architecture, reliability, or user impact.",
    operatingStandard:
      "Every delivery includes architecture intent, implementation quality, verification depth, and rollout confidence.",
    outcomes: [
      "Execute one-day feature sprints with high confidence.",
      "Balance speed with architecture and test integrity.",
      "Integrate performance/accessibility/reliability checks into delivery flow.",
      "Produce concise technical and stakeholder release communication.",
      "Sustain 2x spec-to-ship velocity over baseline."
    ],
    weeklyPlan: [
      {
        day: "Day 1",
        focus: "Sprint Blueprint",
        objective: "Design one-day delivery workflow.",
        sprint: "Define intake, plan, build, test, review, release stages.",
        deliverable: "One-day sprint protocol."
      },
      {
        day: "Day 2",
        focus: "Feature Sprint #1",
        objective: "Ship one meaningful feature end-to-end.",
        sprint: "Run full cycle with strict acceptance gates.",
        deliverable: "Feature #1 release package."
      },
      {
        day: "Day 3",
        focus: "Production Hardening",
        objective: "Improve resilience of shipped feature.",
        sprint: "Add monitoring, fallback behavior, and edge tests.",
        deliverable: "Hardening patch #1."
      },
      {
        day: "Day 4",
        focus: "Feature Sprint #2",
        objective: "Repeat with tighter time and quality targets.",
        sprint: "Second full-cycle feature with stronger test matrix.",
        deliverable: "Feature #2 release package."
      },
      {
        day: "Day 5",
        focus: "Velocity Review",
        objective: "Measure throughput and quality trend.",
        sprint: "Compare two sprint runs against baseline metrics.",
        deliverable: "Speed-depth performance report."
      }
    ],
    drills: [
      "Require architecture notes before implementation.",
      "Add explicit non-functional requirements (perf/accessibility/reliability).",
      "Demand test pyramid coverage for each feature.",
      "Use release checklist before declaring done.",
      "Generate rollback plan for deployment risk.",
      "Produce stakeholder summary and technical changelog.",
      "Time-box every phase and track overruns.",
      "Run post-sprint retrospective with prompt updates."
    ],
    antiPatterns: [
      "Optimizing speed by skipping tests.",
      "Feature completion without rollout safeguards.",
      "Ignoring non-functional requirements.",
      "No sprint-level metrics captured.",
      "Treating release notes as optional."
    ],
    artifacts: [
      "One-day sprint protocol",
      "Feature #1 release package",
      "Feature #2 release package",
      "Release readiness checklist",
      "Velocity and quality report"
    ],
    scorecard: [
      { metric: "Spec-to-ship velocity", target: "2x baseline", failSignal: "No meaningful acceleration" },
      { metric: "Release readiness", target: "100% checklist", failSignal: "Incomplete rollout prep" },
      { metric: "Non-functional coverage", target: "All features", failSignal: "Perf/accessibility gaps" },
      { metric: "Post-release issues", target: "Low", failSignal: "Spike in hotfixes" }
    ],
    promptStack: [
      {
        title: "One-Day Feature Sprint",
        prompt:
          "Feature goal: [goal]\n" +
          "Acceptance criteria: [list]\n" +
          "Non-functional requirements: [perf/accessibility/reliability]\n" +
          "Execute full cycle:\n" +
          "1) Plan\n2) Implement\n3) Test\n4) Review\n5) Release notes + rollback"
      },
      {
        title: "Release Readiness",
        prompt:
          "Evaluate this feature for production release.\n" +
          "Return readiness checklist status, risks, blockers, and go/no-go recommendation."
      },
      {
        title: "Post-Sprint Retrospective",
        prompt:
          "Analyze sprint execution.\n" +
          "What slowed us down? What quality risks escaped?\n" +
          "Propose top 3 process/prompt changes for next sprint."
      }
    ],
    tasks: [
      { id: "l5_t1", label: "Design and document your one-day feature sprint protocol." },
      { id: "l5_t2", label: "Ship Feature Sprint #1 with tests and release notes." },
      { id: "l5_t3", label: "Run hardening pass on Feature #1 (monitoring, fallbacks, edge tests)." },
      { id: "l5_t4", label: "Ship Feature Sprint #2 with tighter schedule targets." },
      { id: "l5_t5", label: "Apply performance/accessibility checks to both features." },
      { id: "l5_t6", label: "Generate and review go/no-go release readiness checklist." },
      { id: "l5_t7", label: "Create rollback plan for each deployment." },
      { id: "l5_t8", label: "Publish technical changelog and stakeholder summary for each sprint." },
      { id: "l5_t9", label: "Measure spec-to-ship velocity against baseline." },
      { id: "l5_t10", label: "Run retrospective and update prompt system based on findings." }
    ],
    checkpoint: {
      passCriteria: [
        "Two end-to-end features shipped with full quality gates.",
        "Measured velocity >= 2x baseline.",
        "No major post-release regressions from sprint work."
      ],
      failureCriteria: [
        "Speed gains depend on skipping verification.",
        "Delivery artifacts incomplete (release/rollback notes missing).",
        "No quantified improvement over baseline."
      ],
      retakeProtocol: [
        "Rerun one feature sprint with stricter readiness gates.",
        "Address identified bottlenecks with revised prompts.",
        "Re-benchmark speed and quality after one additional week."
      ]
    }
  },
  {
    id: "level-6",
    level: "Level 6",
    title: "Elite Operator System",
    duration: "Weeks 7-8",
    summary:
      "Scale from individual task execution to full-system command: migrations, automation, operating playbooks, and leadership workflows.",
    operatingStandard:
      "Operate Codex as a force multiplier system with documented workflows, reliability controls, and measurable organizational impact.",
    outcomes: [
      "Run large-scope initiatives with staged plans and risk controls.",
      "Automate repeatable workflows and quality checks.",
      "Design personal and team operating manuals for Codex usage.",
      "Lead multi-step migrations with rollback confidence.",
      "Demonstrate sustained elite-level throughput and quality."
    ],
    weeklyPlan: [
      {
        day: "Day 1",
        focus: "Operating Model",
        objective: "Define your Codex command system.",
        sprint: "Design workflow map for build, review, release, and incident response.",
        deliverable: "Codex operating model v1."
      },
      {
        day: "Day 2",
        focus: "Large Migration Drill",
        objective: "Execute a multi-file migration safely.",
        sprint: "Plan staged rollout, compatibility strategy, and rollback.",
        deliverable: "Migration package with safeguards."
      },
      {
        day: "Day 3",
        focus: "Automation Layer",
        objective: "Automate recurring review and reporting tasks.",
        sprint: "Implement repeatable runbooks and checklist execution.",
        deliverable: "Automation play set."
      },
      {
        day: "Day 4",
        focus: "Leadership Communication",
        objective: "Translate technical execution into business confidence.",
        sprint: "Create executive and engineering reporting templates.",
        deliverable: "Dual-audience reporting pack."
      },
      {
        day: "Day 5",
        focus: "Final Certification",
        objective: "Prove elite operation under pressure.",
        sprint: "Complete one complex project simulation end-to-end.",
        deliverable: "Elite operator capstone dossier."
      }
    ],
    drills: [
      "Break large objectives into staged sub-deliverables.",
      "Require risk register and mitigation owner for each stage.",
      "Plan backwards from release and rollback requirements.",
      "Automate recurring review routines.",
      "Create command templates for incidents and hotfix windows.",
      "Generate dual reports: technical and executive.",
      "Track impact metrics across multiple weeks.",
      "Refine operating manual after each major run."
    ],
    antiPatterns: [
      "Running large migrations without staged validation.",
      "No risk register for complex initiatives.",
      "Ad-hoc communication that confuses stakeholders.",
      "No automation for repeated high-value workflows.",
      "No documented operating manual."
    ],
    artifacts: [
      "Codex operating model",
      "Migration package with rollback",
      "Automation play set",
      "Technical + executive reporting templates",
      "Elite operator capstone dossier"
    ],
    scorecard: [
      { metric: "Large-scope completion", target: "100% staged delivery", failSignal: "Unplanned scope failures" },
      { metric: "Automation coverage", target: ">= 5 recurring workflows", failSignal: "Manual repetition remains high" },
      { metric: "Stakeholder clarity", target: "High confidence updates", failSignal: "Frequent clarification loops" },
      { metric: "Sustained quality + speed", target: "Maintain Level 5 gains", failSignal: "Performance regression" }
    ],
    promptStack: [
      {
        title: "Large Scope Command Prompt",
        prompt:
          "Mission: [large objective]\n" +
          "Break into staged delivery plan with:\n" +
          "- Dependencies\n" +
          "- Risks + mitigations\n" +
          "- Validation gates\n" +
          "- Rollback strategy\n" +
          "- Reporting checkpoints"
      },
      {
        title: "Migration Execution Prompt",
        prompt:
          "Plan and execute migration for [system].\n" +
          "Provide compatibility plan, phased rollout, tests, rollback triggers, and release communication draft."
      },
      {
        title: "Operator Retrospective Prompt",
        prompt:
          "Review this week as Codex operator.\n" +
          "Return: wins, misses, root causes, system upgrades, and next-week operating priorities."
      }
    ],
    tasks: [
      { id: "l6_t1", label: "Design your Codex operating model for build/review/release/incident flows." },
      { id: "l6_t2", label: "Execute one staged multi-file migration with rollback plan." },
      { id: "l6_t3", label: "Build a risk register for migration stages with mitigation actions." },
      { id: "l6_t4", label: "Automate at least 5 recurring high-value workflows." },
      { id: "l6_t5", label: "Create technical and executive reporting templates." },
      { id: "l6_t6", label: "Run one complex end-to-end simulation under time pressure." },
      { id: "l6_t7", label: "Document decision logs and tradeoffs for major tasks." },
      { id: "l6_t8", label: "Measure sustained speed/quality against Level-5 benchmark." },
      { id: "l6_t9", label: "Publish personal Codex operator manual v1." },
      { id: "l6_t10", label: "Complete capstone dossier with evidence bundle." }
    ],
    checkpoint: {
      passCriteria: [
        "Capstone simulation completed with staged plan and evidence.",
        "Automation added for at least 5 recurring workflows.",
        "Operator manual published and used in live work."
      ],
      failureCriteria: [
        "Complex initiatives run without risk controls.",
        "No automation leverage despite repetition.",
        "No durable operating system documented."
      ],
      retakeProtocol: [
        "Repeat migration drill with tighter validation gates.",
        "Add missing automation workflows and verify usefulness.",
        "Re-run final simulation and update operator manual."
      ]
    }
  }
];

const initialState = {
  selectedModuleId: modules[0].id,
  completedTasks: {},
  notes: {},
  checkIns: [],
  lastCheckIn: null,
  streak: 0,
  longestStreak: 0
};

let state = loadState();
let timerRemaining = TIMER_DEFAULT_SECONDS;
let timerInterval = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...initialState };
    const parsed = JSON.parse(raw);
    return {
      selectedModuleId: parsed.selectedModuleId || modules[0].id,
      completedTasks: parsed.completedTasks || {},
      notes: parsed.notes || {},
      checkIns: parsed.checkIns || [],
      lastCheckIn: parsed.lastCheckIn || null,
      streak: parsed.streak || 0,
      longestStreak: parsed.longestStreak || 0
    };
  } catch (_error) {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function moduleProgress(module) {
  const total = module.tasks.length;
  const done = module.tasks.filter((task) => state.completedTasks[task.id]).length;
  return {
    total,
    done,
    percent: total ? Math.round((done / total) * 100) : 0
  };
}

function isUnlocked(index) {
  if (index === 0) return true;
  const previous = modules[index - 1];
  return moduleProgress(previous).percent === 100;
}

function allTaskStats() {
  const total = modules.reduce((sum, module) => sum + module.tasks.length, 0);
  const done = modules.reduce((sum, module) => sum + moduleProgress(module).done, 0);
  return {
    total,
    done,
    percent: total ? Math.round((done / total) * 100) : 0
  };
}

function modulesCompletedCount() {
  return modules.filter((module) => moduleProgress(module).percent === 100).length;
}

function computeXP() {
  const tasks = allTaskStats().done;
  const modulesDone = modulesCompletedCount();
  const checkIns = (state.checkIns || []).length;
  const taskXp = tasks * TASK_XP;
  const moduleXp = modulesDone * MODULE_BONUS_XP;
  const checkInXp = checkIns * CHECKIN_XP;
  return {
    tasks,
    modulesDone,
    checkIns,
    taskXp,
    moduleXp,
    checkInXp,
    total: taskXp + moduleXp + checkInXp
  };
}

function rankInfo(totalXp) {
  let current = RANK_TIERS[0];
  let next = null;
  for (let i = 0; i < RANK_TIERS.length; i += 1) {
    if (totalXp >= RANK_TIERS[i].minXp) {
      current = RANK_TIERS[i];
      next = RANK_TIERS[i + 1] || null;
    }
  }
  const progressPercent = next
    ? Math.min(
        100,
        Math.round(((totalXp - current.minXp) / (next.minXp - current.minXp)) * 100)
      )
    : 100;
  const xpToNext = next ? Math.max(0, next.minXp - totalXp) : 0;
  return {
    current,
    next,
    progressPercent,
    xpToNext
  };
}

function achievementList(xpData) {
  const stats = allTaskStats();
  const modulesDone = modulesCompletedCount();
  const streak = state.streak || 0;
  return [
    {
      id: "first-task",
      title: "First Blood",
      description: "Complete your first checklist task.",
      unlocked: stats.done >= 1
    },
    {
      id: "task-25",
      title: "Execution Streak",
      description: "Complete 25 tasks.",
      unlocked: stats.done >= 25
    },
    {
      id: "task-50",
      title: "High Throughput",
      description: "Complete 50 tasks.",
      unlocked: stats.done >= 50
    },
    {
      id: "level-1",
      title: "Foundation Certified",
      description: "Complete Level 1 in full.",
      unlocked: moduleProgress(modules[0]).percent === 100
    },
    {
      id: "module-3",
      title: "System Builder",
      description: "Complete 3 modules.",
      unlocked: modulesDone >= 3
    },
    {
      id: "streak-3",
      title: "Consistency Engine",
      description: "Hit a 3-day check-in streak.",
      unlocked: streak >= 3
    },
    {
      id: "streak-7",
      title: "Iron Discipline",
      description: "Hit a 7-day check-in streak.",
      unlocked: streak >= 7
    },
    {
      id: "all-modules",
      title: "Grand Completion",
      description: "Complete all 6 modules.",
      unlocked: modulesDone === modules.length
    },
    {
      id: "xp-5k",
      title: "Rank Surge",
      description: "Reach 5,000 XP.",
      unlocked: xpData.total >= 5000
    }
  ];
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayKey() {
  return localDateKey(new Date());
}

function selectedModule() {
  const found = modules.find((module) => module.id === state.selectedModuleId);
  if (found) return found;
  return modules[0];
}

function nextRequirementText() {
  const idx = modules.findIndex((module) => module.id === state.selectedModuleId);
  const selectedIdx = idx === -1 ? 0 : idx;
  const current = modules[selectedIdx];
  const currentProgress = moduleProgress(current);
  if (currentProgress.percent < 100) {
    return `Complete all ${current.level} checklist tasks to unlock the next level.`;
  }
  const next = modules[selectedIdx + 1];
  if (!next) {
    return "All modules unlocked. Maintain performance and iterate your operator manual.";
  }
  return `${next.level} is unlocked. Start it when ready.`;
}

function renderDashboard() {
  const stats = allTaskStats();
  const modulesDoneCount = modulesCompletedCount();
  const xpData = computeXP();
  const rank = rankInfo(xpData.total);
  const achievements = achievementList(xpData);
  const unlockedBadges = achievements.filter((item) => item.unlocked);

  document.getElementById("overallPercent").textContent = `${stats.percent}%`;
  document.getElementById("overallBar").style.width = `${stats.percent}%`;
  document.getElementById("modulesDone").textContent = `${modulesDoneCount} / ${modules.length}`;

  const current = selectedModule();
  document.getElementById("currentFocus").textContent = `${current.level}: ${current.title}`;
  document.getElementById("nextRequirement").textContent = nextRequirementText();

  document.getElementById("xpValue").textContent = `${xpData.total.toLocaleString()} XP`;
  document.getElementById("rankName").textContent = `Rank: ${rank.current.name}`;
  document.getElementById("rankBar").style.width = `${rank.progressPercent}%`;
  document.getElementById("xpToNext").textContent = rank.next
    ? `${rank.xpToNext.toLocaleString()} XP to ${rank.next.name}`
    : "Max rank achieved";

  document.getElementById("streakDays").textContent = `${state.streak || 0} days`;
  document.getElementById("longestStreak").textContent = `Longest: ${state.longestStreak || 0} days`;
  document.getElementById("badgeCount").textContent = `${unlockedBadges.length} / ${achievements.length}`;
  document.getElementById("badgePreview").textContent =
    unlockedBadges.length > 0
      ? unlockedBadges
          .slice(Math.max(0, unlockedBadges.length - 3))
          .map((item) => item.title)
          .join(" • ")
      : "No badges yet";

  document.getElementById("heroRank").textContent = rank.current.name;
  document.getElementById("heroXp").textContent = xpData.total.toLocaleString();
  document.getElementById("heroStreak").textContent = `${state.streak || 0} days`;
}

function renderModuleList() {
  const node = document.getElementById("moduleList");
  node.innerHTML = modules
    .map((module, index) => {
      const progress = moduleProgress(module);
      const unlocked = isUnlocked(index);
      const selected = module.id === state.selectedModuleId;
      const statusClass = unlocked ? "" : " locked";
      const selectedClass = selected ? " selected" : "";
      const lockLabel = unlocked ? "Unlocked" : "Locked";
      return `
        <button class="module-item${selectedClass}${statusClass}" data-module-id="${module.id}" type="button" ${unlocked ? "" : "disabled"}>
          <div class="module-item-top">
            <p>${module.level}</p>
            <span>${lockLabel}</span>
          </div>
          <h3>${module.title}</h3>
          <p class="module-item-meta">${module.duration}</p>
          <div class="meter small"><span style="width:${progress.percent}%"></span></div>
          <p class="module-item-meta">${progress.done}/${progress.total} tasks complete (${progress.percent}%)</p>
        </button>
      `;
    })
    .join("");

  node.querySelectorAll(".module-item:not(.locked)").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedModuleId = button.dataset.moduleId;
      saveState();
      renderAll();
    });
  });
}

function renderChallenges() {
  const challengeNode = document.getElementById("challengeList");
  if (!challengeNode) return;

  const current = selectedModule();
  const currentProgress = moduleProgress(current).percent;
  const xpData = computeXP();
  const rank = rankInfo(xpData.total);
  const streakTarget = 7;
  const streakProgress = Math.min(100, Math.round(((state.streak || 0) / streakTarget) * 100));
  const nextLevelIdx = modules.findIndex((item) => item.id === current.id) + 1;
  const nextLevel = modules[nextLevelIdx];
  const nextLevelStatus = nextLevel ? (isUnlocked(nextLevelIdx) ? 100 : currentProgress) : 100;

  const challengeItems = [
    {
      title: `Finish ${current.level}`,
      description: "Complete all mission checklist tasks in your current level.",
      progress: currentProgress
    },
    {
      title: "7-Day Discipline Streak",
      description: "Use daily check-in to maintain consistency and unlock streak badges.",
      progress: streakProgress
    },
    {
      title: rank.next ? `Reach ${rank.next.name}` : "Max Rank Locked In",
      description: rank.next
        ? `Earn ${rank.xpToNext.toLocaleString()} more XP to level up rank.`
        : "You reached the top rank. Sustain elite performance.",
      progress: rank.progressPercent
    },
    {
      title: nextLevel ? `Unlock ${nextLevel.level}` : "All Levels Unlocked",
      description: nextLevel
        ? "Complete the current level fully to open the next module."
        : "All modules unlocked. Focus on mastery quality.",
      progress: nextLevelStatus
    }
  ];

  challengeNode.innerHTML = challengeItems
    .map(
      (item) => `
      <article class="challenge-card">
        <div class="challenge-head">
          <h4>${escapeHtml(item.title)}</h4>
          <span>${item.progress}%</span>
        </div>
        <p>${escapeHtml(item.description)}</p>
        <div class="meter small"><span style="width:${item.progress}%"></span></div>
      </article>
    `
    )
    .join("");
}

function renderAchievements() {
  const node = document.getElementById("achievementsGrid");
  if (!node) return;
  const xpData = computeXP();
  const achievements = achievementList(xpData);
  node.innerHTML = achievements
    .map(
      (item) => `
      <article class="achievement-card ${item.unlocked ? "unlocked" : "locked"}">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.description)}</p>
        <p class="achievement-state">${item.unlocked ? "Unlocked" : "Locked"}</p>
      </article>
    `
    )
    .join("");
}

function renderDailyCheckInStatus() {
  const button = document.getElementById("dailyCheckInBtn");
  const status = document.getElementById("dailyCheckInStatus");
  if (!button || !status) return;
  const today = todayKey();
  const checkedInToday = state.lastCheckIn === today;
  button.disabled = checkedInToday;
  button.textContent = checkedInToday ? "Checked In Today" : "Daily Check-in (+40 XP)";
  status.textContent = checkedInToday
    ? `Checked in for ${today}. Keep your streak alive tomorrow.`
    : "Check in today to keep your streak alive.";
}

function listMarkup(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function weeklyPlanMarkup(items) {
  return `
    <div class="week-grid">
      ${items
        .map(
          (item) => `
          <article class="week-card">
            <p class="week-day">${escapeHtml(item.day)}</p>
            <h4>${escapeHtml(item.focus)}</h4>
            <p><strong>Objective:</strong> ${escapeHtml(item.objective)}</p>
            <p><strong>Sprint:</strong> ${escapeHtml(item.sprint)}</p>
            <p><strong>Deliverable:</strong> ${escapeHtml(item.deliverable)}</p>
          </article>
      `
        )
        .join("")}
    </div>
  `;
}

function scorecardMarkup(items) {
  return `
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Target</th>
          <th>Fail Signal</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
            <tr>
              <td>${escapeHtml(item.metric)}</td>
              <td>${escapeHtml(item.target)}</td>
              <td>${escapeHtml(item.failSignal)}</td>
            </tr>
          `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function promptMarkup(module) {
  return `
    <div class="prompt-list">
      ${module.promptStack
        .map(
          (item, index) => `
          <article class="prompt">
            <div class="prompt-head">
              <h4>${escapeHtml(item.title)}</h4>
              <button class="btn btn-ghost copy-prompt" type="button" data-module-id="${module.id}" data-prompt-index="${index}">Copy</button>
            </div>
            <pre><code>${escapeHtml(item.prompt)}</code></pre>
          </article>
      `
        )
        .join("")}
    </div>
  `;
}

function taskMarkup(module) {
  return `
    <ul class="task-list">
      ${module.tasks
        .map((task) => {
          const checked = state.completedTasks[task.id] ? "checked" : "";
          return `
            <li>
              <label>
                <input class="task-checkbox" type="checkbox" data-task-id="${task.id}" ${checked} />
                <span>${escapeHtml(task.label)}</span>
              </label>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

function checkpointMarkup(checkpoint) {
  return `
    <div class="checkpoint-grid">
      <article>
        <h4>Pass Criteria</h4>
        ${listMarkup(checkpoint.passCriteria)}
      </article>
      <article>
        <h4>Failure Criteria</h4>
        ${listMarkup(checkpoint.failureCriteria)}
      </article>
      <article>
        <h4>Retake Protocol</h4>
        ${listMarkup(checkpoint.retakeProtocol)}
      </article>
    </div>
  `;
}

function renderModuleContent() {
  const module = selectedModule();
  const progress = moduleProgress(module);
  const notes = state.notes[module.id] || "";

  document.getElementById("moduleContent").innerHTML = `
    <header class="module-header">
      <p class="card-tag">${module.level} • ${module.duration}</p>
      <h2>${escapeHtml(module.title)}</h2>
      <p>${escapeHtml(module.summary)}</p>
      <p class="module-standard"><strong>Operating Standard:</strong> ${escapeHtml(module.operatingStandard)}</p>
      <div class="module-progress-row">
        <p>Checklist Progress: ${progress.done}/${progress.total} (${progress.percent}%)</p>
        <div class="meter"><span style="width:${progress.percent}%"></span></div>
      </div>
    </header>

    <section class="module-section">
      <h3>Core Outcomes</h3>
      ${listMarkup(module.outcomes)}
    </section>

    <section class="module-section">
      <h3>5-Day Execution Plan</h3>
      ${weeklyPlanMarkup(module.weeklyPlan)}
    </section>

    <section class="module-section">
      <h3>Mission Checklist (Functional)</h3>
      <p class="module-note">Check tasks as you complete them. Progress is saved automatically.</p>
      ${taskMarkup(module)}
    </section>

    <section class="module-section">
      <h3>Deliberate Drills</h3>
      ${listMarkup(module.drills)}
    </section>

    <section class="module-section">
      <h3>Anti-Patterns To Eliminate</h3>
      ${listMarkup(module.antiPatterns)}
    </section>

    <section class="module-section">
      <h3>Required Artifacts</h3>
      ${listMarkup(module.artifacts)}
    </section>

    <section class="module-section">
      <h3>Prompt Stack</h3>
      ${promptMarkup(module)}
    </section>

    <section class="module-section">
      <h3>Performance Scorecard</h3>
      ${scorecardMarkup(module.scorecard)}
    </section>

    <section class="module-section">
      <h3>Checkpoint Gate</h3>
      ${checkpointMarkup(module.checkpoint)}
    </section>

    <section class="module-section">
      <h3>Module Notes</h3>
      <p class="module-note">Use this for insights, mistakes, and prompt revisions for this level.</p>
      <textarea id="moduleNotes" class="module-notes" rows="8" placeholder="Capture what worked, where Codex failed, and how you improved your requests.">${escapeHtml(notes)}</textarea>
    </section>
  `;

  document.querySelectorAll(".task-checkbox").forEach((input) => {
    input.addEventListener("change", () => {
      const taskId = input.dataset.taskId;
      if (!taskId) return;
      state.completedTasks[taskId] = input.checked;
      saveState();
      renderAll();
    });
  });

  document.querySelectorAll(".copy-prompt").forEach((button) => {
    button.addEventListener("click", async () => {
      const moduleId = button.dataset.moduleId;
      const promptIndex = Number(button.dataset.promptIndex);
      const sourceModule = modules.find((item) => item.id === moduleId);
      if (!sourceModule || Number.isNaN(promptIndex)) return;
      const prompt = sourceModule.promptStack[promptIndex];
      if (!prompt) return;

      try {
        await navigator.clipboard.writeText(prompt.prompt);
        const original = button.textContent;
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = original || "Copy";
        }, 900);
      } catch (_error) {
        button.textContent = "Copy failed";
      }
    });
  });

  const notesArea = document.getElementById("moduleNotes");
  notesArea.addEventListener("input", () => {
    state.notes[module.id] = notesArea.value;
    saveState();
  });
}

function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerUI() {
  document.getElementById("timerDisplay").textContent = formatTimer(timerRemaining);
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      return;
    }
    timerRemaining -= 1;
    updateTimerUI();
  }, 1000);
}

function pauseTimer() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timerRemaining = TIMER_DEFAULT_SECONDS;
  updateTimerUI();
}

function handleDailyCheckIn() {
  const today = todayKey();
  if (state.lastCheckIn === today) {
    renderDailyCheckInStatus();
    return;
  }

  if (!Array.isArray(state.checkIns)) {
    state.checkIns = [];
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = localDateKey(yesterday);

  if (state.lastCheckIn === yesterdayKey) {
    state.streak = (state.streak || 0) + 1;
  } else {
    state.streak = 1;
  }

  state.longestStreak = Math.max(state.longestStreak || 0, state.streak);
  state.lastCheckIn = today;
  if (!state.checkIns.includes(today)) {
    state.checkIns.push(today);
  }
  saveState();
  renderAll();
}

function jumpToDashboard() {
  const node = document.getElementById("masteryDashboard");
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
}

function exportProgress() {
  const xpData = computeXP();
  const rank = rankInfo(xpData.total);
  const payload = {
    generatedAt: new Date().toISOString(),
    state,
    gamification: {
      xp: xpData,
      rank: rank.current.name,
      streak: state.streak || 0,
      longestStreak: state.longestStreak || 0,
      achievements: achievementList(xpData)
    },
    moduleProgress: modules.map((module) => ({
      level: module.level,
      title: module.title,
      ...moduleProgress(module)
    }))
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateLabel = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `codex-progress-${dateLabel}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function resetProgress() {
  const ok = window.confirm("Reset all checklist progress and notes? This cannot be undone.");
  if (!ok) return;
  state = {
    ...initialState,
    selectedModuleId: modules[0].id,
    completedTasks: {},
    notes: {},
    checkIns: [],
    lastCheckIn: null,
    streak: 0,
    longestStreak: 0
  };
  saveState();
  renderAll();
}

function wireStaticEvents() {
  document.getElementById("startTimerBtn").addEventListener("click", startTimer);
  document.getElementById("pauseTimerBtn").addEventListener("click", pauseTimer);
  document.getElementById("resetTimerBtn").addEventListener("click", resetTimer);
  document.getElementById("exportProgressBtn").addEventListener("click", exportProgress);
  document.getElementById("resetProgressBtn").addEventListener("click", resetProgress);
  document.getElementById("dailyCheckInBtn").addEventListener("click", handleDailyCheckIn);
  document.getElementById("startTrackBtn").addEventListener("click", jumpToDashboard);
}

function ensureSelectedModuleIsValid() {
  const selectedIdx = modules.findIndex((module) => module.id === state.selectedModuleId);
  if (selectedIdx === -1) {
    state.selectedModuleId = modules[0].id;
    saveState();
    return;
  }
  if (!isUnlocked(selectedIdx)) {
    const firstUnlocked = modules.find((module, idx) => isUnlocked(idx));
    state.selectedModuleId = firstUnlocked ? firstUnlocked.id : modules[0].id;
    saveState();
  }
}

function renderAll() {
  ensureSelectedModuleIsValid();
  renderDashboard();
  renderDailyCheckInStatus();
  renderChallenges();
  renderAchievements();
  renderModuleList();
  renderModuleContent();
  updateTimerUI();
}

wireStaticEvents();
renderAll();
