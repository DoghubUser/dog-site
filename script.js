const texts = {
  "pt-BR": {
    selectLanguageTitle: "Selecione seu idioma",
    loadingText: "Carregando dados",
    hubTitle: "Dog Hub",
    hubSubtitle: "Seu Hub de Scripts & Comunidade",
    scriptText: "Script Em Breve"
  },
  "en-US": {
    selectLanguageTitle: "Select your language",
    loadingText: "Loading data",
    hubTitle: "Dog Hub",
    hubSubtitle: "Your Scripts Hub & Community",
    scriptText: "Script Coming Soon"
  }
};

function detectDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/android|iphone|ipad|ipod|mobile/i.test(ua)) {
    document.body.classList.add('mobile');
  } else {
    document.body.classList.add('desktop');
  }
}

function selectLanguage(lang) {
  const langScreen = document.getElementById('language-screen');
  const loadingScreen = document.getElementById('loading-screen');
  const mainScreen = document.getElementById('main-screen');
  const loadingText = document.getElementById('loading-text');
  const dots = document.getElementById('dots');
  
  loadingText.textContent = texts[lang].loadingText;
  loadingText.appendChild(dots);
  
  document.getElementById('select-language-title').textContent = texts[lang].selectLanguageTitle;
  document.getElementById('hub-title').textContent = texts[lang].hubTitle;
  document.getElementById('hub-subtitle').textContent = texts[lang].hubSubtitle;
  document.getElementById('script-text').textContent = texts[lang].scriptText;
  
  langScreen.classList.remove('active');
  
  setTimeout(() => {
    langScreen.style.display = 'none';
    loadingScreen.classList.add('active');
    
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      dots.textContent = '.'.repeat(dotCount);
    }, 1000);
    
    setTimeout(() => {
      clearInterval(dotInterval);
      loadingScreen.classList.remove('active');
      loadingScreen.style.display = 'none';
      
      mainScreen.hidden = false;
      mainScreen.classList.add('active');
      
      document.body.style.overflow = 'auto';
      document.body.style.userSelect = 'auto';
    }, 9000);
  }, 500);
}

window.addEventListener('load', () => {
  detectDevice();
});