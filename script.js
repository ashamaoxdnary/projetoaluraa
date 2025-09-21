// script.js — pequenas melhorias de acessibilidade
(function(){
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    if (expanded){
      nav.hidden = true;
    } else {
      nav.hidden = false;
      nav.querySelector('a')?.focus();
    }
  });

  // keyboard: close menu with Escape
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape'){
      nav.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });

  // text size controls (persist in localStorage)
  const inc = document.getElementById('increaseText');
  const dec = document.getElementById('decreaseText');
  const root = document.documentElement;
  function setScale(s){
    root.style.fontSize = (16 * s) + 'px';
    localStorage.setItem('textScale', String(s));
  }
  let scale = Number(localStorage.getItem('textScale') || 1);
  setScale(scale);
  inc.addEventListener('click', ()=>{ scale = Math.min(1.5, scale + 0.1); setScale(scale); });
  dec.addEventListener('click', ()=>{ scale = Math.max(0.8, scale - 0.1); setScale(scale); });

  // ensure focus styles visible when navigating by keyboard
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();