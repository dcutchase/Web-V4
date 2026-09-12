(() => {
  const data = window.DCUT;
  const framesEl = document.getElementById('frames');
  const labelsEl = document.getElementById('labels');
  const reel = document.getElementById('reel');
  const reelWrap = document.getElementById('reelWrap');

  const frameRows = [];
  let frameIndex = 0;

  function addBlankFrame() {
    const frame = document.createElement('div');
    frame.className = 'film-frame blank-frame';
    frame.dataset.frameIndex = frameIndex++;
    frame.innerHTML = '<div class="dust"></div>';
    framesEl.appendChild(frame);
    frameRows.push(frame);
    return frame;
  }

  function addCategoryFrame(category, categoryIndex) {
    const frame = document.createElement('button');
    frame.className = `film-frame category-frame ${category.thumbClass}`;
    frame.dataset.frameIndex = frameIndex++;
    frame.dataset.category = category.id;
    frame.setAttribute('aria-label', category.title);
    frame.innerHTML = `
      <div class="thumb-media" aria-hidden="true">
        <div class="thumb-pixel-grid"></div>
        <div class="thumb-glare"></div>
      </div>
    `;
    frame.addEventListener('click', () => {
      frame.classList.toggle('selected');
    });
    framesEl.appendChild(frame);
    frameRows.push(frame);

    const label = document.createElement('div');
    label.className = `category-label ${categoryIndex % 2 === 0 ? 'left' : 'right'}`;
    label.dataset.category = category.id;
    label.innerHTML = `
      <div class="connector"></div>
      <div class="label-copy">
        <h2>${category.title}</h2>
        <p>${category.lines.map(line => `<span>${line}</span>`).join('')}</p>
      </div>
    `;
    labelsEl.appendChild(label);
    category._label = label;
    category._frame = frame;
    return frame;
  }

  for (let i = 0; i < data.framesBeforeFirstCategory; i++) addBlankFrame();

  data.categories.forEach((category, index) => {
    addCategoryFrame(category, index);
    if (index < data.categories.length - 1) {
      for (let i = 0; i < data.spacerFramesBetweenCategories; i++) addBlankFrame();
    }
  });

  for (let i = 0; i < data.framesAfterLastCategory; i++) addBlankFrame();

  function positionLabels() {
    data.categories.forEach(category => {
      const frame = category._frame;
      const label = category._label;
      if (!frame || !label) return;
      const trackRect = framesEl.getBoundingClientRect();
      const frameTop = frame.offsetTop;
      label.style.top = `${frameTop + frame.offsetHeight / 2}px`;
    });
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('category-frame')) {
        const id = entry.target.dataset.category;
        const label = labelsEl.querySelector(`[data-category="${id}"]`);
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          label?.classList.add('active');
        } else {
          entry.target.classList.remove('active');
          label?.classList.remove('active');
        }
      }
    });
  }, { root: null, threshold: 0.55 });

  framesEl.querySelectorAll('.category-frame').forEach(el => io.observe(el));

  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? scrollY / max : 0;
    const turns = progress * 10;
    reel.style.transform = `rotate(${turns * 360}deg)`;
    reelWrap.style.transform = `translateX(-50%) translateY(${Math.sin(progress * Math.PI) * 2}px)`;
    document.documentElement.style.setProperty('--scroll', progress.toFixed(4));
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', positionLabels);
  addEventListener('load', () => {
    positionLabels();
    onScroll();
  });

  requestAnimationFrame(positionLabels);
})();
