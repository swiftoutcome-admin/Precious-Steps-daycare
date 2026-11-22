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

  /**
   * Scroll reveals and the staircase build.
   *
   * Only switched on when the visitor has not asked for reduced motion and
   * the browser has IntersectionObserver. The .motion-ok class is what
   * hides elements before they animate, so if this never runs, nothing is
   * ever hidden.
   */
  function initReveals() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || !("IntersectionObserver" in window)) return;

    var targets = document.querySelectorAll(".reveal, [data-stairs]");
    if (!targets.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });

    document.documentElement.classList.add("motion-ok");

    // If the visitor switches reduced motion on mid-visit, show everything.
    reduce.addEventListener("change", function (event) {
      if (!event.matches) return;
      document.documentElement.classList.remove("motion-ok");
      observer.disconnect();
    });
  }

  /**
   * The mobile call sheet is a native <details>. Close it on Escape and on
   * a tap anywhere else, which is what a parent expects from a pop-up.
   */
  function initCallSheet() {
    var sheet = document.querySelector(".callbar__call");
    if (!sheet) return;

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !sheet.open) return;
      sheet.open = false;
      var summary = sheet.querySelector("summary");
      if (summary) summary.focus();
    });

    document.addEventListener("click", function (event) {
      if (sheet.open && !sheet.contains(event.target)) sheet.open = false;
    });
  }

  /**
   * Liquid buttons: the rim brightens nearest the pointer, as light would
   * catch the edge of a lens. Only on devices with a fine pointer and only
   * when the visitor has not asked for reduced motion. Positions are set as
   * custom properties through style.setProperty, never as a style string,
   * so the strict CSP holds.
   */
  function initLiquid() {
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    var selector = ".button, .ticket__call, .phone-chip, .callbar__button, .nav-toggle";
    var frame = 0;

    document.addEventListener(
      "pointermove",
      function (event) {
        var el = event.target.closest ? event.target.closest(selector) : null;
        if (!el) return;
        var rect = el.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
          el.style.setProperty("--mx", x + "px");
          el.style.setProperty("--my", y + "px");
        });
      },
      { passive: true }
    );

    document.addEventListener("pointerout", function (event) {
      var el = event.target.closest ? event.target.closest(selector) : null;
      if (!el || el.contains(event.relatedTarget)) return;
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    });
  }

  function init() {
    document.documentElement.classList.remove("no-js");
    initNavToggle();
    initFormGuard();
    initReveals();
    initCallSheet();
    initLiquid();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
