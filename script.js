(function () {
  var CONFIG = {
    /** Email that receives service requests (mailto). Change to your real inbox. */
    requestEmail: "vacruzzin@gmail.com",
    /** Subject line for outgoing mailto messages */
    requestSubject: "Job quote request — website",
  };

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var emailLink = document.getElementById("contact-email-link");
  if (emailLink) {
    emailLink.href = "mailto:" + CONFIG.requestEmail;
    emailLink.textContent = CONFIG.requestEmail;
  }

  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  var form = document.getElementById("service-form");
  var success = document.getElementById("form-success");
  var successEmail = document.getElementById("success-email");

  function buildMailtoBody(data) {
    var lines = [
      "New job quote request from the website",
      "",
      "Name: " + data.name,
      "Company / job name: " + (data.company || "(not provided)"),
      "Email: " + data.email,
      "Phone: " + (data.phone || "(not provided)"),
      "Service: " + data.service,
      "",
      "Message:",
      data.message,
    ];
    return lines.join("\n");
  }

  if (form && success && successEmail) {
    successEmail.textContent = CONFIG.requestEmail;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) {
        return;
      }

      var fd = new FormData(form);
      var data = {
        name: String(fd.get("name") || "").trim(),
        company: String(fd.get("company") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        service: String(fd.get("service") || "").trim(),
        message: String(fd.get("message") || "").trim(),
      };

      var body = buildMailtoBody(data);
      var url =
        "mailto:" +
        encodeURIComponent(CONFIG.requestEmail) +
        "?subject=" +
        encodeURIComponent(CONFIG.requestSubject) +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = url;

      form.hidden = true;
      success.hidden = false;
      success.focus();
    });
  }
})();
