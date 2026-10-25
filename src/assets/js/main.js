/* ===========================================================================
   Progressive enhancement only. The site is fully usable with this file
   blocked or failed.

   Deliberate constraints, so the build passes a static HTML security scan
   and the strict CSP in netlify.toml holds:
     - no innerHTML, outerHTML, insertAdjacentHTML, document.write or eval
     - no inline event handlers and no inline <script>
     - DOM is created with createElement and filled with textContent
     - no third-party requests
   =========================================================================== */

(function () {
  "use strict";

  /**
   * Mobile navigation toggle.
   * The nav is visible by default and hidden by CSS only at small widths,
   * so a JS failure leaves the links reachable.
   */
  function initNavToggle() {
    var toggle = document.querySelector("[data-nav-toggle]");
    if (!toggle) return;

    var navId = toggle.getAttribute("aria-controls");
    var nav = navId ? document.getElementById(navId) : null;
    if (!nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu on Escape and return focus to the toggle.
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (!nav.classList.contains("is-open")) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    });
  }

  /**
   * Guard against a double submit on the contact form, and give the parent
   * visible feedback that the request is on its way.
   */
  function initFormGuard() {
    var form = document.querySelector("[data-guarded-form]");
    if (!form) return;

    form.addEventListener("submit", function () {
      var submit = form.querySelector("[type='submit']");
      if (!submit) return;
      submit.disabled = true;
      submit.textContent = submit.getAttribute("data-sending-label") || "Sending...";
    });
  }

  function init() {
    initNavToggle();
    initFormGuard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
