const BRAND_CONFIG = {
  whatsappNumber: "919876543210", // TODO: Replace with Vijay Vikram Singh team's official WhatsApp number, country code only.
  apiEndpoint: "/api/lead"
};

function qs(selector, root = document) { return root.querySelector(selector); }
function qsa(selector, root = document) { return [...root.querySelectorAll(selector)]; }

function initMenu() {
  const toggle = qs(".menu-toggle");
  const nav = qs(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function buildLeadMessage(data) {
  const lines = [
    "New enquiry from vijayvikramsingh.com",
    "",
    `Name: ${data.fullName || ""}`,
    `Phone: ${data.phone || ""}`,
    `Email: ${data.email || ""}`,
    `Company: ${data.company || ""}`,
    `City: ${data.city || ""}`,
    `Service: ${data.enquiryType || ""}`,
    `Preferred format: ${data.serviceFormat || ""}`,
    `Budget: ${data.budget || ""}`,
    `Date: ${data.projectDate || ""}`,
    `Team/Audience: ${data.audienceSize || ""}`,
    `Voice-over detail: ${data.voiceDetail || ""}`,
    `Acting class detail: ${data.actingDetail || ""}`,
    `Corporate training detail: ${data.trainingDetail || ""}`,
    "",
    `Message: ${data.message || ""}`,
    "",
    `Needs: ${data.needs || "None selected"}`
  ];
  return lines.filter(Boolean).join("\n");
}

function openWhatsApp(message) {
  const url = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function getFormData(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  data.needs = qsa("input[name='needs']:checked", form).map(i => i.value).join(", ");
  return data;
}

function initLeadForm() {
  const form = qs("#leadForm");
  if (!form) return;
  const status = qs("#formStatus");
  const typeSelect = qs("#enquiryType", form);
  const detailBlocks = qsa("[data-detail-block]", form);

  function refreshDetails() {
    const value = typeSelect.value;
    detailBlocks.forEach(block => {
      const match = block.dataset.detailBlock === value || block.dataset.detailBlock === "all";
      block.style.display = match ? "block" : "none";
    });
  }
  if (typeSelect) {
    typeSelect.addEventListener("change", refreshDetails);
    refreshDetails();
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = getFormData(form);
    const message = buildLeadMessage(data);
    if (status) status.textContent = "Preparing your enquiry...";

    try {
      await fetch(BRAND_CONFIG.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, whatsappMessage: message })
      });
      if (status) status.textContent = "Enquiry captured. WhatsApp will open for instant confirmation.";
    } catch (error) {
      if (status) status.textContent = "Opening WhatsApp with your enquiry details.";
    }

    openWhatsApp(message);
  });
}

function initWhatsAppBot() {
  const bot = qs("#whatsappBot");
  if (!bot) return;
  const panel = qs(".bot-panel", bot);
  const float = qs(".bot-float", bot);
  const input = qs("#botMessage", bot);
  const send = qs("#botSend", bot);
  const options = qsa(".bot-option", bot);

  float.addEventListener("click", () => panel.classList.toggle("open"));
  options.forEach(button => {
    button.addEventListener("click", () => openWhatsApp(button.dataset.message));
  });
  send.addEventListener("click", () => {
    const text = input.value.trim() || "Hi, I want to enquire about Vijay Vikram Singh's services.";
    openWhatsApp(text);
  });
}

initMenu();
initLeadForm();
initWhatsAppBot();
