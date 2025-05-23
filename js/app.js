import { initWipe }    from './wipe.js';
import { initRaid, renderCraft } from './raid.js';
import { initCommits } from './commits.js';
import { state } from './raid.js';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

if (isMobile) {
  document.getElementById('targets-grid').style.gridTemplateColumns = 'repeat(auto-fill, minmax(80px, 1fr))';
}

const tabs     = document.querySelectorAll('.tab-button');
const sections = document.querySelectorAll('.tab-content');

let lastMouseX = 0;
let lastMouseY = 0;

document.addEventListener("mousemove", (e) => {
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

function showCopyPopup(text, x, y, backgroundColor = "#38c03f") {
  console.log("Popup triggered at", x, y, "with text:", text);
  
  const popup = document.createElement("div");
  popup.className = "copy-popup";
  popup.textContent = text;
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  popup.style.backgroundColor = backgroundColor;
  popup.style.position = "fixed";
  popup.style.zIndex = "9999";
  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    popup.style.opacity = "0";
    popup.style.transform = "translateY(-40px)";
  });

  setTimeout(() => {
    popup.remove();
  }, 1000);
}

document.getElementById("copy-explosives-button").addEventListener("click", () => {
  const explosiveIds = [
    "rocket", "c4", "explosive-ammo", "molotov",
    "beancan-grenade", "satchel-charge", "hv-rocket", 
    "f1-grenade", "incendiary-rocket"
  ];

  const copyText = explosiveIds
    .map(id => {
      const quantity = parseInt(document.getElementById(`${id}-quantity`).innerText, 10);
      const name = document.querySelector(`#${id}-holder img`).alt || id;
      return quantity > 0 ? `${name}: ${quantity}` : null;
    })
    .filter(Boolean)
    .join('\n');

  if (copyText.length === 0) {
    showCopyPopup("No explosives to copy!", lastMouseX, lastMouseY, "#e46969");
    return;
  }

  showCopyPopup("Copied to clipboard! 📋", lastMouseX, lastMouseY);

  navigator.clipboard.writeText(copyText).catch(err => {
    console.error("Clipboard error", err);
    showCopyPopup("Copy failed ❌", lastMouseX, lastMouseY, "#e46969");
  });
});

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

function animatePopEffect(elementId) {
  const element = document.querySelector(`#${elementId} img`);
  if (!element) return;

  element.classList.remove('pop-effect');
  void element.offsetWidth; 
  element.classList.add('pop-effect');
}

window.addEventListener('DOMContentLoaded', () => {
  showTab('raid');
  initWipe();
  initRaid();
  renderCraft();
});
