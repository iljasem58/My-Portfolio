  (function(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function(el){ el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function(el){ io.observe(el); });
  })();

  (function(){
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var dot = document.createElement('span');
    dot.className = 'dot';
    var label = document.createElement('span');
    btn.appendChild(dot);
    btn.appendChild(label);

    function currentTheme(){
      var stored = null;
      try { stored = localStorage.getItem('theme'); } catch(e){}
      if (stored === 'light' || stored === 'dark') return stored;
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
    }

    function paint(theme){
      btn.classList.toggle('is-light', theme === 'light');
      btn.classList.toggle('is-dark', theme === 'dark');
      label.textContent = theme;
    }

    paint(currentTheme());

    btn.addEventListener('click', function(){
      var next = currentTheme() === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch(e){}
      paint(next);
    });
  })();
