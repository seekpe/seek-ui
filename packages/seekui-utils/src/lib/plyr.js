
const PLYR_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/plyr/3.7.2/plyr.min.css';

const PLYR_JS = 'https://cdnjs.cloudflare.com/ajax/libs/plyr/3.7.2/plyr.min.js';

export function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      resolve();
    };
    script.onerror = (error) => {
      reject(error);
    };
    document.head.appendChild(script);
  });
}
export function loadStylesheet(url) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = () => {
      resolve();
    };
    link.onerror = (error) => {
      reject(error);
    };
    document.head.appendChild(link);
  });
}

export default function loadPlyr() {
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all([
        loadScript(PLYR_JS),
        loadStylesheet(PLYR_CSS)
      ]);
      resolve();
    } catch (error) {
      console.error('Error al cargar la biblioteca Plyr y sus estilos:', error);
      reject(error);
    }
  });
}
