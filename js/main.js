(function () {
  var WHATSAPP = '38762919010';

  // Header pozadina pri skrolanju
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobilni meni
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  function setMenu(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Zatvori meni' : 'Otvori meni');
    toggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  }
  toggle.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  // Aktivni link u navigaciji
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll('a:not(.btn)'));
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navAnchors.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObs.observe(s); });

    // Animacija pojavljivanja
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Forma za rezervaciju
  var form = document.getElementById('rezervacija');
  var carSelect = document.getElementById('f-car');
  var from = document.getElementById('f-from');
  var to = document.getElementById('f-to');
  var errorBox = document.getElementById('formError');

  var today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  var todayStr = today.toISOString().slice(0, 10);
  from.min = todayStr;
  to.min = todayStr;
  from.addEventListener('change', function () {
    to.min = from.value || todayStr;
    if (to.value && to.value < from.value) to.value = from.value;
  });

  // "Pošalji upit" na kartici vozila popunjava formu
  document.querySelectorAll('[data-car]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-car');
      for (var i = 0; i < carSelect.options.length; i++) {
        if (carSelect.options[i].text === name) { carSelect.selectedIndex = i; break; }
      }
    });
  });

  function formatDate(value) {
    var p = value.split('-');
    return p[2] + '.' + p[1] + '.' + p[0] + '.';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('f-name');
    var note = document.getElementById('f-note').value.trim();
    var missing = [name, from, to].filter(function (el) { return !el.value.trim(); });
    [name, from, to].forEach(function (el) { el.classList.toggle('invalid', missing.indexOf(el) !== -1); });

    if (missing.length) {
      errorBox.textContent = 'Molimo unesite ime i datume preuzimanja i povrata.';
      errorBox.hidden = false;
      missing[0].focus();
      return;
    }
    if (to.value < from.value) {
      errorBox.textContent = 'Datum povrata ne može biti prije datuma preuzimanja.';
      errorBox.hidden = false;
      to.classList.add('invalid');
      to.focus();
      return;
    }
    errorBox.hidden = true;

    var msg = 'Pozdrav, želim rezervisati vozilo.\n' +
      'Ime: ' + name.value.trim() + '\n' +
      'Vozilo: ' + carSelect.value + '\n' +
      'Preuzimanje: ' + formatDate(from.value) + '\n' +
      'Povrat: ' + formatDate(to.value) +
      (note ? '\nNapomena: ' + note : '');
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
