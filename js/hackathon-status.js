(function () {
  var EVENT_END = new Date("2026-09-30T23:59:59+00:00");
  var REG_DEADLINE = new Date("2026-09-20T23:59:59+00:00");
  var EVENT_START = new Date("2026-09-28T00:00:00+00:00");

  function getStatus(now) {
    if (now.getTime() > EVENT_END.getTime()) {
      return "ended";
    }
    if (now.getTime() >= EVENT_START.getTime()) {
      return "live";
    }
    if (now.getTime() > REG_DEADLINE.getTime()) {
      return "closed";
    }
    return "open";
  }

  function applyStatus(root, status) {
    root.setAttribute("data-hackathon-state", status);

    root.querySelectorAll("[data-hackathon-badge]").forEach(function (badge) {
      if (status === "ended") {
        badge.textContent = "Ended";
      } else if (status === "live") {
        badge.textContent = "Happening Now";
      } else if (status === "closed") {
        badge.textContent = "Registration Closed";
      } else {
        badge.textContent = "Registration Open";
      }
    });

    root.querySelectorAll("[data-hackathon-register]").forEach(function (btn) {
      if (status === "ended") {
        btn.textContent = "Event Ended";
        btn.removeAttribute("href");
        btn.setAttribute("aria-disabled", "true");
        btn.classList.add("is-disabled");
      } else if (status === "closed" || status === "live") {
        btn.textContent = "Registration Closed";
        btn.removeAttribute("href");
        btn.setAttribute("aria-disabled", "true");
        btn.classList.add("is-disabled");
      } else {
        btn.textContent = "Register Now";
        btn.classList.remove("is-disabled");
        btn.removeAttribute("aria-disabled");
      }
    });
  }

  function init() {
    var now = new Date();
    var status = getStatus(now);
    document
      .querySelectorAll("[data-hackathon]")
      .forEach(function (root) {
        applyStatus(root, status);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
