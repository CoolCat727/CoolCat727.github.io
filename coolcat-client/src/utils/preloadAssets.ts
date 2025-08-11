export function preloadImage (src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    const timeout = setTimeout(() => {
      console.error(`Image preload timeout: ${src}`)
      reject(new Error(`Image preload timeout: ${src}`));
    }, 10000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve();
    };
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(`Image failed to load: ${src}`));
    };
    img.src = src;
  });
}

export function preloadVideo (src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'auto';

    video.style.position = 'fixed';
    video.style.width = '0px';
    video.style.height = '0px';
    video.style.opacity = '0';
    video.style.pointerEvents = 'none';
    document.body.appendChild(video);

    const timeout = setTimeout(() => {
      cleanup();
      console.error(`Video preload timeout: ${src}`);
      reject(new Error(`Video preload timeout: ${src}`));
    }, 10000);

    function cleanup () {
      clearTimeout(timeout);
      video.onloadeddata = null;
      video.onerror = null;
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
    }

    video.onloadeddata = () => {
      cleanup();
      resolve();
    };

    video.onerror = () => {
      cleanup();
      reject(new Error(`Video failed to load: ${src}`));
    };

    video.src = src;
  });
}

export function preloadAssets (sources: string[]): Promise<void> {
  const preloaders = sources.map(src => {
    if (src.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return preloadImage(src);
    if (src.match(/\.(mp4|webm|ogg)$/i)) return preloadVideo(src);
    return Promise.resolve();
  });

  return Promise.all(preloaders).then(() => { });
}
