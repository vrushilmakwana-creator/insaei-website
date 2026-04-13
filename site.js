(function () {
  var doc = document;
  var win = window;
  var currentPage = win.location.pathname.split("/").pop() || "index.html";
  var reducedMotion = win.matchMedia && win.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function addNavShadow() {
    var nav = doc.getElementById("nav");
    if (!nav) {
      return;
    }
    var sync = function () {
      nav.classList.toggle("raised", win.scrollY > 40);
    };
    sync();
    win.addEventListener("scroll", sync, { passive: true });
  }

  function revealOnScroll() {
    var items = doc.querySelectorAll(".r, .rl, .rr");
    if (!items.length) {
      return;
    }
    if (reducedMotion || !("IntersectionObserver" in win)) {
      items.forEach(function (item) { item.classList.add("on"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("on");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (item) { observer.observe(item); });
  }

  function animateCounters() {
    var counters = doc.querySelectorAll(".counter[data-to]");
    if (!counters.length) {
      return;
    }
    counters.forEach(function (counter) {
      var target = Number(counter.getAttribute("data-to")) || 0;
      if (reducedMotion || !("IntersectionObserver" in win)) {
        counter.textContent = Math.floor(target).toLocaleString();
        return;
      }
      var played = false;
      var observer = new IntersectionObserver(function (entries) {
        if (played || !entries[0].isIntersecting) {
          return;
        }
        played = true;
        var start = performance.now();
        var duration = 1400;
        var tick = function (now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(target * eased).toLocaleString();
          if (progress < 1) {
            win.requestAnimationFrame(tick);
          }
        };
        win.requestAnimationFrame(tick);
        observer.disconnect();
      }, { threshold: 0.65 });
      observer.observe(counter);
    });
  }

  function initTestimonials() {
    var track = doc.getElementById("tt");
    if (!track) {
      return;
    }
    var slides = doc.querySelectorAll(".testi-slide");
    var dots = doc.querySelectorAll(".testi-dot");
    var prev = doc.getElementById("tp");
    var next = doc.getElementById("tn");
    var total = slides.length;
    var index = 0;
    var autoId = null;

    function render() {
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      dots.forEach(function (dot) {
        dot.classList.toggle("on", Number(dot.getAttribute("data-i")) === index);
      });
    }

    function go(step) {
      index = (index + step + total) % total;
      render();
    }

    win.ts = go;
    render();

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        index = Number(dot.getAttribute("data-i")) || 0;
        render();
      });
    });

    if (prev) {
      prev.addEventListener("click", function () { go(-1); });
    }
    if (next) {
      next.addEventListener("click", function () { go(1); });
    }

    if (!reducedMotion && total > 1) {
      autoId = win.setInterval(function () { go(1); }, 7000);
      track.addEventListener("mouseenter", function () { win.clearInterval(autoId); });
      track.addEventListener("mouseleave", function () {
        autoId = win.setInterval(function () { go(1); }, 7000);
      });
    }
  }

  function initProgress() {
    var wrapper = doc.createElement("div");
    var bar = doc.createElement("span");
    wrapper.className = "site-progress";
    bar.className = "site-progress-bar";
    wrapper.appendChild(bar);
    doc.body.appendChild(wrapper);

    var update = function () {
      var scrollTop = win.scrollY || doc.documentElement.scrollTop;
      var maxScroll = Math.max(doc.documentElement.scrollHeight - win.innerHeight, 1);
      var progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      bar.style.transform = "scaleX(" + progress + ")";
    };

    update();
    win.addEventListener("scroll", update, { passive: true });
    win.addEventListener("resize", update);
  }

  function initFloatingDock() {
    var dock = doc.createElement("div");
    dock.className = "floating-dock";

    var links = [];
    if (currentPage === "index.html" || currentPage === "services.html") {
      links.push({ href: "our-services.html", label: "Services Story", primary: true });
    } else if (currentPage === "about.html" || currentPage === "about-ceo.html") {
      links.push({ href: "about-ceo.html", label: "Leadership Page", primary: true });
    } else {
      links.push({ href: "contact.html", label: "Start a Project", primary: true });
    }
    links.push({ href: "contact.html", label: "Contact" });

    links.forEach(function (item) {
      var link = doc.createElement("a");
      link.className = "dock-chip" + (item.primary ? " dock-chip-primary" : "");
      link.href = item.href;
      link.textContent = item.label;
      dock.appendChild(link);
    });

    var button = doc.createElement("button");
    button.type = "button";
    button.className = "dock-button";
    button.textContent = "Back to Top";
    button.addEventListener("click", function () {
      win.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
    dock.appendChild(button);

    doc.body.appendChild(dock);
  }

  function armSpotlight(selector, extraClass) {
    var nodes = doc.querySelectorAll(selector);
    nodes.forEach(function (node) {
      node.classList.add(extraClass);
      node.addEventListener("pointermove", function (event) {
        var bounds = node.getBoundingClientRect();
        node.style.setProperty("--spot-x", ((event.clientX - bounds.left) / bounds.width) * 100 + "%");
        node.style.setProperty("--spot-y", ((event.clientY - bounds.top) / bounds.height) * 100 + "%");
      });
      node.addEventListener("pointerenter", function () {
        node.classList.add("is-armed");
      });
      node.addEventListener("pointerleave", function () {
        node.classList.remove("is-armed");
      });
    });
  }

  function initSpotlights() {
    armSpotlight(".proc-step, .val, .sector-cell, .service-pillar, .job-row, .bridge-card, .showcase-panel, .showcase-side-card, .promise-card, .lane-card, .leader-quote-card, .leader-stat-card, .guide-card, .milestone", "interactive-panel");
    armSpotlight(".btn-primary, .btn-nav, .btn-cta-a, .btn-cta-b, .btn-line, .filter-btn, .showcase-tab, .dock-chip, .dock-button", "interactive-button");
  }

  function initServiceShowcase() {
    var tabs = Array.prototype.slice.call(doc.querySelectorAll("[data-showcase-tab]"));
    var panels = Array.prototype.slice.call(doc.querySelectorAll("[data-showcase-panel]"));
    if (!tabs.length || !panels.length) {
      return;
    }
    var current = tabs[0].getAttribute("data-showcase-tab");
    var autoId = null;

    function render(target) {
      current = target;
      tabs.forEach(function (tab) {
        tab.classList.toggle("is-active", tab.getAttribute("data-showcase-tab") === current);
      });
      panels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.getAttribute("data-showcase-panel") === current);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        render(tab.getAttribute("data-showcase-tab"));
      });
    });

    render(current);

    if (!reducedMotion && tabs.length > 1) {
      var index = 0;
      autoId = win.setInterval(function () {
        index = (index + 1) % tabs.length;
        render(tabs[index].getAttribute("data-showcase-tab"));
      }, 6500);

      var stage = doc.querySelector(".showcase-split");
      if (stage) {
        stage.addEventListener("mouseenter", function () { win.clearInterval(autoId); });
        stage.addEventListener("mouseleave", function () {
          autoId = win.setInterval(function () {
            index = (index + 1) % tabs.length;
            render(tabs[index].getAttribute("data-showcase-tab"));
          }, 6500);
        });
      }
    }
  }

  function initPreloader() {
    var loader = doc.getElementById("preloader");
    if (!loader) return;
    
    // Fallback: hide if it takes too long
    var timeout = setTimeout(function() {
      loader.classList.add("loaded");
    }, 3500);

    win.addEventListener("load", function() {
      clearTimeout(timeout);
      setTimeout(function() {
        loader.classList.add("loaded");
      }, 400); // Tiny delay for smooth feel
    });
  }

  addNavShadow();
  revealOnScroll();
  animateCounters();
  initTestimonials();
  initProgress();
  initFloatingDock();
  initSpotlights();
  initServiceShowcase();
  initPreloader();
})();

// ─── HAMBURGER MENU ──────────────────────────────────────
(function () {
  var btn     = document.getElementById('hamburger');
  var menu    = document.getElementById('mobileMenu');
  var overlay = document.getElementById('mobileOverlay');

  if (!btn || !menu || !overlay) return;

  function openMenu() {
    btn.classList.add('is-open');
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('is-open');
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function () {
    btn.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', function (e) {
    // Temporarily lift pointer-events so we can detect the element underneath
    overlay.style.pointerEvents = 'none';
    var underEl = document.elementFromPoint(e.clientX, e.clientY);
    overlay.style.pointerEvents = '';
    closeMenu();
    // If the tap landed over a footer link, follow it now that the menu is closed
    if (underEl) {
      var link = underEl.closest ? underEl.closest('a') : (underEl.tagName === 'A' ? underEl : null);
      if (link && link.href && link.closest && link.closest('footer')) {
        window.location.href = link.href;
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when a link in the menu is tapped
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Close menu if window is resized back to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeMenu();
  });
})();
