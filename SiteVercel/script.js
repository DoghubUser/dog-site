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

function selectLanguage(lang) {
  const langScreen = document.getElementById('language-screen');
  const loadingScreen = document.getElementById('loading-screen');
  const mainScreen = document.getElementById('main-screen');
  const loadingText = document.getElementById('loading-text');
  const dots = document.getElementById('dots');
  
  // Ajustar textos da tela de seleção de idioma antes de sumir (não mais necessário porque vai sumir)
  // Ajustar texto da tela de carregamento
  loadingText.textContent = texts[lang].loadingText;
  loadingText.appendChild(dots);
  
  // Ajustar textos da tela principal para quando for exibida
  document.getElementById('hub-title').textContent = texts[lang].hubTitle;
  document.getElementById('hub-subtitle').textContent = texts[lang].hubSubtitle;
  document.getElementById('script-text').textContent = texts[lang].scriptText;
  
  langScreen.classList.remove('active');
  
  setTimeout(() => {
    langScreen.style.display = 'none';
    loadingScreen.classList.add('active');
    
    // Animação dos pontinhos com intervalo de 1s
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      dots.textContent = '.'.repeat(dotCount);
    }, 1000);
    
    setTimeout(() => {
      clearInterval(dotInterval);
      loadingScreen.classList.remove('active');
      
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainScreen.classList.add('active');
        
        document.body.style.overflow = 'auto';
        document.body.style.userSelect = 'auto';
      }, 500);
    }, 8500);
  }, 500);
}