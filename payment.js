const PAYMENT_CONFIG = {
  stripe: {
    starter: "https://buy.stripe.com/REPLACE_ME_STARTER",
    pro: "https://buy.stripe.com/REPLACE_ME_PRO",
    team: "https://buy.stripe.com/REPLACE_ME_TEAM"
  },
  paypal: {
    starter: "https://paypal.me/REPLACE_ME_STARTER",
    pro: "https://paypal.me/REPLACE_ME_PRO",
    team: "https://paypal.me/REPLACE_ME_TEAM"
  }
};

function isConfigured(url) {
  return Boolean(url) && !url.includes("REPLACE_ME");
}

function planLink(plan, provider) {
  const providerMap = PAYMENT_CONFIG[provider] || {};
  return providerMap[plan] || "";
}

function providerLabel(provider) {
  if (provider === "stripe") return "Stripe";
  if (provider === "paypal") return "PayPal";
  return provider;
}

function configureStatus() {
  const status = document.getElementById("paymentStatus");
  if (!status) return;

  const urls = [
    PAYMENT_CONFIG.stripe.starter,
    PAYMENT_CONFIG.stripe.pro,
    PAYMENT_CONFIG.stripe.team,
    PAYMENT_CONFIG.paypal.starter,
    PAYMENT_CONFIG.paypal.pro,
    PAYMENT_CONFIG.paypal.team
  ];

  const configured = urls.filter((url) => isConfigured(url)).length;
  if (configured === urls.length) {
    status.textContent = "Payment links are fully configured for all plans.";
    return;
  }

  status.textContent = `Payment links configured: ${configured}/${urls.length}. Update placeholders in payment.js before launch.`;
}

function wireCheckoutButtons() {
  document.querySelectorAll(".checkout-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan;
      const provider = button.dataset.provider;
      if (!plan || !provider) return;

      const url = planLink(plan, provider);
      if (!isConfigured(url)) {
        window.alert(
          `${providerLabel(provider)} checkout for the ${plan} plan is not configured yet. Replace placeholder links in payment.js.`
        );
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

configureStatus();
wireCheckoutButtons();
