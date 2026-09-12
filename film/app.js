// Keep the page intentionally minimal: nine embedded films inside 8-bit CRT shells.
// Add a tiny irregular power flicker without obscuring the YouTube controls.
const sets = document.querySelectorAll('.crt');
sets.forEach((tv, i) => {
  const power = tv.querySelector('.power');
  if (!power) return;
  const pulse = () => {
    power.style.opacity = Math.random() > .2 ? '1' : '.35';
    setTimeout(pulse, 900 + Math.random()*2600 + i*35);
  };
  setTimeout(pulse, 400 + i*140);
});
