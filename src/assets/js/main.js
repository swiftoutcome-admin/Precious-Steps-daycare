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
   * Programs page: mark the age-group link for the programme being read.
   * The links stay plain in-page links (they are not converted to ARIA
   * tabs); aria-current says which one matches what is on screen, and the
   * CSS draws it pressed in with a bar under the name. Without JavaScript
   * the links simply all look the same and still jump to each programme.
   */
  function initLadder() {
    var links = document.querySelectorAll(".ladder__link");
    if (!links.length) return;

    var items = [];
    links.forEach(function (link) {
      var section = document.getElementById(link.getAttribute("href").slice(1));
      if (section) items.push({ link: link, section: section });
    });
    if (!items.length) return;

    // The programme whose section has crossed 40% of the way down the
    // screen is the one being read. Above the first, the first is marked.
    function update() {
      var line = window.innerHeight * 0.4;
      var current = items[0];
      items.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= line) current = item;
      });
      items.forEach(function (item) {
        if (item === current) item.link.setAttribute("aria-current", "true");
        else item.link.removeAttribute("aria-current");
      });
    }

    var queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        update();
      });
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    update();
  }

  function init() {
    document.documentElement.classList.remove("no-js");
    initNavToggle();
    initFormGuard();
    initReveals();
    initCallSheet();
    initLadder();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
