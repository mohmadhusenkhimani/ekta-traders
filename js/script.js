/* =========================================================
   EKTA TRADERS - JAVASCRIPT
   IMPORTANT: Replace the WhatsApp number below with your
   business number. Use country code, without + or spaces.
   Example India: 919876543210
   ========================================================= */

// 1. BUSINESS SETTINGS
const WHATSAPP_NUMBER = "919909260935"; // CHANGE THIS NUMBER

// 2. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// 3. PRODUCT FILTER
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow =
        selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// 4. PRODUCT ENQUIRY LINKS
document.querySelectorAll(".product-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productName = link.dataset.product;
    const productSelect = document.getElementById("productType");
    const matchingOption = [...productSelect.options].find(
      (option) => option.text === productName
    );

    if (matchingOption) productSelect.value = matchingOption.value;
  });
});

// 5. WHATSAPP ENQUIRY FORM
const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Please add your business WhatsApp number in js/script.js first.");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const product = document.getElementById("productType").value;
  const quantity = document.getElementById("quantity").value.trim();
  const size = document.getElementById("boxSize").value.trim();
  const details = document.getElementById("message").value.trim();

  const whatsappMessage = [
    "Hello EKTA Traders!",
    "",
    "I would like to enquire about packaging.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Product: ${product}`,
    `Quantity: ${quantity || "Not specified"}`,
    `Box Size: ${size || "Not specified"}`,
    `Additional Details: ${details || "None"}`,
    "",
    "Please share the price and available options. Thank you."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// 6. FOOTER YEAR
document.getElementById("currentYear").textContent = new Date().getFullYear();

// 7. ACTIVE NAVIGATION LINK WHILE SCROLLING
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
