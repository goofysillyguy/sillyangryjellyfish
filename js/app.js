import { initWipe }    from './wipe.js';
import { initRaid, renderCraft } from './raid.js';
import { initCommits } from './commits.js';

const tabs     = document.querySelectorAll('.tab-button');
const sections = document.querySelectorAll('.tab-content');

function showTab(name) {
  sections.forEach(sec => sec.style.display = sec.id === name ? 'block' : 'none');
  tabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));
}

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.dataset.tab;
    showTab(t);
    if (t === 'raid') {
      initWipe();
      initRaid();
      renderCraft();
    } else if (t === 'commits') {
      initCommits();
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  showTab('raid');
  initWipe();
  initRaid();
  renderCraft();
});
