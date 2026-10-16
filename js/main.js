/* B&G Avtomobili – skripta za meni, animacije in obrazce */
(function () {
  'use strict';

  /* Mobilni meni */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      closeLangs();
      var open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* Izbira jezika: zapri ob kliku drugam ali tipki Escape */
  function closeLangs() {
    document.querySelectorAll('details.lang[open]').forEach(function (d) { d.removeAttribute('open'); });
  }
  document.querySelectorAll('details.lang').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open && header && toggle && header.classList.contains('is-open')) {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('details.lang[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('details.lang[open]').forEach(function (d) {
      d.removeAttribute('open');
      var s = d.querySelector('summary'); if (s) s.focus();
    });
  });

  /* Nežen prikaz odsekov ob drsenju */
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Menjava fotografij v naslovni fotografiji (kot na stari strani, z več fotografijami) */
  var hero = document.querySelector('.photo-hero');
  var slides = hero ? [].slice.call(hero.querySelectorAll('.photo-hero__img')) : [];
  if (hero && slides.length > 1) {
    var dots = [].slice.call(hero.querySelectorAll('.hero-dots__btn'));
    var pauseBtn = hero.querySelector('.hero-dots__pause');
    var DUR = 6000, cur = 0, timer = null, userPaused = false;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    hero.style.setProperty('--hero-dur', DUR / 1000 + 's');

    var load = function (i) {
      var im = slides[(i + slides.length) % slides.length];
      if (im && !im.getAttribute('src') && im.getAttribute('data-src')) im.setAttribute('src', im.getAttribute('data-src'));
      return im;
    };
    var setActive = function (i) {
      slides[cur].classList.remove('is-active');
      if (dots[cur]) { dots[cur].classList.remove('is-active'); dots[cur].removeAttribute('aria-current'); }
      cur = i;
      slides[cur].classList.add('is-active');
      if (dots[cur]) {
        dots[cur].classList.add('is-active'); dots[cur].setAttribute('aria-current', 'true');
        void dots[cur].offsetWidth; /* znova zažene progresno črto */
      }
      load(cur + 1);
    };
    var pending = -1;
    var show = function (i) {
      i = (i + slides.length) % slides.length;
      if (i === cur || i === pending) return;
      var im = load(i);
      if (im.complete && im.naturalWidth) { pending = -1; setActive(i); return; }
      if (im.complete) return; /* slike ni bilo mogoče naložiti */
      pending = i; stop();
      var finish = function (ok) {
        im.removeEventListener('load', onLoad); im.removeEventListener('error', onError);
        if (pending !== i) return;
        pending = -1;
        if (ok) setActive(i);
        schedule();
      };
      var onLoad = function () { finish(true); }, onError = function () { finish(false); };
      im.addEventListener('load', onLoad); im.addEventListener('error', onError);
    };
    var stop = function () { clearTimeout(timer); timer = null; hero.classList.remove('is-playing'); };
    var schedule = function () {
      stop();
      if (pending >= 0 || userPaused || reduceMotion || document.hidden) return;
      hero.classList.add('is-playing');
      if (dots[cur]) { dots[cur].classList.remove('is-active'); void dots[cur].offsetWidth; dots[cur].classList.add('is-active'); }
      timer = setTimeout(function () { show(cur + 1); schedule(); }, DUR);
    };

    dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); schedule(); }); });
    if (pauseBtn) {
      if (reduceMotion) { pauseBtn.hidden = true; }
      pauseBtn.addEventListener('click', function () {
        userPaused = !userPaused;
        hero.classList.toggle('is-paused', userPaused);
        pauseBtn.setAttribute('aria-label', pauseBtn.getAttribute(userPaused ? 'data-label-play' : 'data-label-pause'));
        if (userPaused) stop(); else { show(cur + 1); schedule(); }
      });
    }
    document.addEventListener('visibilitychange', schedule);

    /* Poteg s prstom levo/desno na telefonu */
    var sx = 0, sy = 0, tracking = false;
    hero.addEventListener('touchstart', function (e) { if (e.touches.length !== 1) return; tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (!tracking) return; tracking = false;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { show(cur + (dx < 0 ? 1 : -1)); schedule(); }
    }, { passive: true });

    var start = function () { load(1); schedule(); };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  }

  /* Želeni datum: preteklih datumov ni mogoče izbrati */
  var now = new Date();
  var today = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    if (!input.min) input.min = today;
  });

  /* Obrazci: dokler niso povezani s strežnikom, prikažemo sporočilo namesto pošiljanja.
     Povezava s strežnikom: nastavite action="..." in method="post" na <form> ter odstranite data-demo. */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      if (msg) {
        msg.classList.add('is-visible');
        msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
})();
