// script.js

// Variáveis globais
const languageScreen = document.getElementById('language-screen');
const loadingScreen = document.getElementById('loading-screen');
const mainScreen = document.getElementById('main-screen');

const loadingText = document.getElementById('loading-text');
const progressBar = loadingScreen.querySelector('.progress-bar');

let dotsInterval;
let progressInterval;

// Traduções
const translations = {
  'pt-BR': {
    selectLanguageTitle: 'Selecione seu idioma',
    loadingTextBase: 'Carregando dados',
    hubTitle: 'Dog Hub',
    hubSubtitle: 'Seu Hub de Scripts & Comunidade',
    scriptBoxText: 'Script Em Breve',
  },
  'en-US': {
    selectLanguageTitle: 'Select your language',
    loadingTextBase: 'Loading data',
    hubTitle: 'Dog Hub',
    hubSubtitle: 'Your Scripts & Community Hub',
    scriptBoxText: 'Script Coming Soon',
  },
};

// Detecta dispositivo móvel (simples)
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

// Ajusta classe no body para estilos específicos (se quiser usar)
function adjustBodyClass() {
  if (isMobileDevice()) {
    document.body.classList.add('mobile');
  } else {
    document.body.classList.remove('mobile');
  }
}

// Controla animação dos pontinhos depois do texto "Carregando dados"
function startDotsAnimation(baseText) {
  let count = 0;
  dotsInterval = setInterval(() => {
    count = (count + 1) % 4;
    loadingText.textContent = baseText + '.'.repeat(count);
  }, 600); // 600ms para ser mais relaxante
}

// Para animação dos pontinhos
function stopDotsAnimation() {
  clearInterval(dotsInterval);
}

// Animação da barra de progresso simulada
function startProgressBar(duration = 10000) {
  progressBar.style.width = '0%';
  let start = null;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min((elapsed / duration) * 100, 100);
    progressBar.style.width = progress + '%';
    
    if (progress < 100) {
      progressInterval = requestAnimationFrame(step);
    } else {
      showMainScreen();
    }
  }
  
  progressInterval = requestAnimationFrame(step);
}

function cancelProgressBar() {
  if (progressInterval) {
    cancelAnimationFrame(progressInterval);
  }
}

// Mostra a tela principal e esconde as outras
function showMainScreen() {
  loadingScreen.classList.remove('active');
  mainScreen.hidden = false;
  mainScreen.classList.add('active');
  stopDotsAnimation();
  // Foca a tela principal para acessibilidade
  mainScreen.focus();
}

// Função executada ao selecionar idioma
function selectLanguage(lang) {
  // Atualiza traduções
  const t = translations[lang] || translations['pt-BR'];
  
  // Atualiza textos da seleção de idioma
  document.getElementById('select-language-title').textContent = t.selectLanguageTitle;
  
  // Atualiza textos da tela principal
  document.getElementById('hub-title').textContent = t.hubTitle;
  document.getElementById('hub-subtitle').textContent = t.hubSubtitle;
  document.getElementById('script-text').textContent = t.scriptBoxText;
  
  // Esconde seleção idioma
  languageScreen.classList.remove('active');
  languageScreen.setAttribute('aria-hidden', 'true');
  
  // Mostra tela de carregamento
  loadingScreen.classList.add('active');
  loadingScreen.setAttribute('aria-hidden', 'false');
  loadingScreen.focus();
  
  // Inicia animações da tela de carregamento
  startDotsAnimation(t.loadingTextBase);
  startProgressBar(10000); // duração 10s, você pode ajustar
  
  // Salvar preferência no localStorage para futura melhoria (opcional)
  localStorage.setItem('preferredLang', lang);
}

// Inicialização: detectar dispositivo e idioma salvo
function init() {
  adjustBodyClass();
  
  // Se quiser usar idioma salvo e pular seleção:
  const savedLang = localStorage.getItem('preferredLang');
  if (savedLang && translations[savedLang]) {
    selectLanguage(savedLang);
    // Oculta tela de seleção imediatamente
    languageScreen.classList.remove('active');
    languageScreen.setAttribute('aria-hidden', 'true');
  } else {
    languageScreen.classList.add('active');
    languageScreen.setAttribute('aria-hidden', 'false');
    languageScreen.focus();
  }
}

// Previne zoom com ctrl+wheel, pinch e toque (extra)
// Também inibe seleção e clique no fundo (no CSS já bloqueia pointer-events)
function preventZoom(event) {
  if (event.ctrlKey || event.touches?.length > 1) {
    event.preventDefault();
  }
}

window.addEventListener('wheel', preventZoom, { passive: false });
window.addEventListener('touchmove', preventZoom, { passive: false });
window.addEventListener('gesturestart', preventZoom, { passive: false });

// Inicia tudo ao carregar o DOM
window.addEventListener('DOMContentLoaded', init);