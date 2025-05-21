
export const state = {
  raidLog: [],            
  explosiveCounts: {},    
  materialsMap: {}        
};

const materialImages = document.getElementById("material-images");
const clearBtn = document.getElementById("clear-all-button");


let materials = [];     


export const items_cheapcost = {
  "Wood":                         [{ explosive: 'Molotov',      quantity: 4 }],
  "Stone":                        [{ explosive: 'C4',           quantity: 2 }],
  "Metal":                        [{ explosive: 'C4',           quantity: 4 }],
  "Armored":                      [{ explosive: 'C4',           quantity: 8 }],
  "Metal-Door":                   [{ explosive: 'Explosive_Ammo', quantity: 63 }],
  "Wooden-Door":                  [{ explosive: 'Molotov',      quantity: 2 }],
  "Shotgun-Trap":                 [{ explosive: 'HV_Rocket',    quantity: 1 }],
  "Garage-Door":                  [{ explosive: 'C4',           quantity: 1 }, { explosive: 'Explosive_Ammo', quantity: 40 }],
  "Armored-Door":                 [{ explosive: 'Explosive_Ammo', quantity: 250 }],
  "Auto-Turret":                  [{ explosive: 'HV_Rocket',    quantity: 3 }],
  "Ladder-Hatch":                 [{ explosive: 'Explosive_Ammo', quantity: 63 }],
  "High-External-Wooden-Wall":    [{ explosive: 'Molotov',      quantity: 7 }],
  "High-External-Stone-Wall":     [{ explosive: 'C4',           quantity: 2 }],
  "Vending-Machine":              [{ explosive: 'C4',           quantity: 3 }],
  "Wooden-Barricade":             [{ explosive: 'Molotov',      quantity: 1 }],
  "Barbed-Wooden-Barricade":      [{ explosive: 'Molotov',      quantity: 2 }],
  "Metal-Barricade":              [{ explosive: 'Satchel',      quantity: 4 }],
  "Metal-Shop-Front":             [{ explosive: 'C4',           quantity: 3 }],
  "Wooden-Window-Bars":           [{ explosive: 'Molotov',      quantity: 4 }],
  "Metal-Window-Bars":            [{ explosive: 'C4',           quantity: 2 }],
  "Strengthened-Glass-Window":    [{ explosive: 'Explosive_Ammo', quantity: 140 }],
  "Reinforced-Glass-Window":      [{ explosive: 'C4',           quantity: 2 }],
  "Metal-Embrasure":              [{ explosive: 'Incendiary_Rocket', quantity: 1 }],
  "Tool-Cupboard":                [{ explosive: 'Molotov',      quantity: 1 }],
  "Workbench-Level-1":            [{ explosive: 'Molotov',      quantity: 2 }],
  "Workbench-Level-2":            [{ explosive: 'Molotov',      quantity: 14 }],
  "Workbench-Level-3":            [{ explosive: 'Molotov',      quantity: 21 }]
};

export const items_altcost = {
  "Wood":                         [{ explosive: 'Explosive_Ammo', quantity: 49 }],
  "Stone":                        [{ explosive: 'Rocket',        quantity: 4 }],
  "Metal":                        [{ explosive: 'Rocket',        quantity: 8 }],
  "Armored":                      [{ explosive: 'Rocket',        quantity: 15 }],
  "Metal-Door":                   [{ explosive: 'Rocket',        quantity: 1 }, { explosive: 'Explosive_Ammo', quantity: 10 }],
  "Wooden-Door":                  [{ explosive: 'Explosive_Ammo', quantity: 19 }],
  "Shotgun-Trap":                 [{ explosive: 'F1_Grenade',    quantity: 5 }],
  "Garage-Door":                  [{ explosive: 'Rocket',        quantity: 3 }],
  "Armored-Door":                 [{ explosive: 'C4',           quantity: 3 }],
  "Auto-Turret":                  [{ explosive: 'Incendiary_Rocket', quantity: 1 }],
  "Ladder-Hatch":                 [{ explosive: 'Rocket',        quantity: 1 }, { explosive: 'Explosive_Ammo', quantity: 10 }],
  "High-External-Wooden-Wall":    [{ explosive: 'Incendiary_Rocket', quantity: 1 }],
  "High-External-Stone-Wall":     [{ explosive: 'Rocket',        quantity: 4 }],
  "Vending-Machine":              [{ explosive: 'Satchel',       quantity: 15 }],
  "Wooden-Barricade":             [{ explosive: 'Satchel',       quantity: 1 }],
  "Barbed-Wooden-Barricade":      [{ explosive: 'Satchel',       quantity: 1 }],
  "Metal-Barricade":              [{ explosive: 'C4',           quantity: 1 }],
  "Metal-Shop-Front":             [{ explosive: 'Rocket',        quantity: 6 }],
  "Wooden-Window-Bars":           [{ explosive: 'Explosive_Ammo', quantity: 49 }],
  "Metal-Window-Bars":            [{ explosive: 'Rocket',        quantity: 4 }],
  "Strengthened-Glass-Window":    [{ explosive: 'Rocket',        quantity: 3 }],
  "Reinforced-Glass-Window":      [{ explosive: 'Rocket',        quantity: 4 }],
  "Metal-Embrasure":              [{ explosive: 'C4',           quantity: 2 }],
  "Tool-Cupboard":                [{ explosive: 'Explosive_Ammo', quantity: 10 }],
  "Workbench-Level-1":            [{ explosive: 'Satchel',       quantity: 1 }],
  "Workbench-Level-2":            [{ explosive: 'Incendiary_Rocket', quantity: 2 }],
  "Workbench-Level-3":            [{ explosive: 'Incendiary_Rocket', quantity: 2 }]
};

const iconFiles = {
  "Wood":                      "WoodWall.webp",
  "Stone":                     "StoneWall.webp",
  "Metal":                     "SheetMetalWall.webp",
  "Armored":                   "ArmoredWall.webp",
  "Wooden-Door":               "WoodenDoor.webp",
  "Metal-Door":                "SheetMetalDoor.webp",
  "Ladder-Hatch":              "LadderHatch.webp",
  "Garage-Door":               "Garage-Door.webp",
  "Armored-Door":              "ArmoredDoor.webp",
  "Metal-Shop-Front":          "MetalShopFront.webp",
  "Auto-Turret":               "AutoTurret.webp",
  "Shotgun-Trap":              "ShotgunTrap.webp",
  "High-External-Wooden-Wall": "HighExternalWoodenWall.webp",
  "High-External-Stone-Wall":  "HighExternal-StoneWall.webp",
  "Wooden-Barricade":          "WoodenBarricade.webp",
  "Barbed-Wooden-Barricade":   "BarbedWoodenBarricade.webp",
  "Metal-Barricade":           "MetalBarricade.webp",
  "Wooden-Window-Bars":        "WoodenWindowBars.webp",
  "Metal-Window-Bars":         "MetalWindowBars.webp",
  "Metal-Embrasure":           "MetalEmbrasure.webp",
  "Strengthened-Glass-Window": "StrengthenedGlassWindow.webp",
  "Reinforced-Glass-Window":   "ReinforcedGlassWindow.webp",
  "Tool-Cupboard":             "ToolCupboard.webp",
  "Vending-Machine":           "VendingMachine.webp",
  "Workbench-Level-1":         "WorkbenchLevel1.webp",
  "Workbench-Level-2":         "WorkbenchLevel2.webp",
  "Workbench-Level-3":         "WorkbenchLevel3.webp"
};

const explosives = {
  Molotov:           { cloth:10,  gun_powder:0,    low_grade_fuel:50,  metal_fragments:0, pipes:0, rope:0, sulfur:0, tech_trash:0 },
  Beancan:           { cloth:0,   gun_powder:60,   low_grade_fuel:0,   metal_fragments:20,pipes:0, rope:0, sulfur:0, tech_trash:0 },
  Satchel:           { cloth:10,  gun_powder:240,  low_grade_fuel:0,   metal_fragments:0, pipes:0, rope:1, sulfur:0, tech_trash:0 },
  Explosive_Ammo:    { cloth:0,   gun_powder:10,   low_grade_fuel:0,   metal_fragments:5, pipes:0, rope:0, sulfur:5, tech_trash:0 },
  Rocket:            { cloth:0,   gun_powder:650,  low_grade_fuel:30,  metal_fragments:0, pipes:2, rope:0, sulfur:0, tech_trash:0 },
  HV_Rocket:         { cloth:0,   gun_powder:100,  low_grade_fuel:0,   metal_fragments:0, pipes:1, rope:0, sulfur:0, tech_trash:0 },
  C4:                { cloth:5,   gun_powder:1000, low_grade_fuel:60,  metal_fragments:200,pipes:0, rope:0, sulfur:200, tech_trash:2 },
  F1_Grenade:        { cloth:0,   gun_powder:30,   low_grade_fuel:0,   metal_fragments:25,pipes:0, rope:0, sulfur:0, tech_trash:0 },
  Incendiary_Rocket: { cloth:0,   gun_powder:300,  low_grade_fuel:253, metal_fragments:10,pipes:2, rope:0, sulfur:10, tech_trash:0 }
};

const structureNames = Object.keys(iconFiles);

function displayMaterialImage(name) {
  const div = document.createElement('div');
  div.className = 'material-image';
  div.dataset.material = name;
  div.style.backgroundImage = `url(images/${iconFiles[name]})`;
  div.addEventListener('click', () => removeFromMaterials(name));
  
  document.getElementById('material-images').appendChild(div);
}

function removeMaterialImage(name) {
  const el = document.querySelector(`.material-image[data-material="${name}"]`);
  if (el) el.remove();
}

function updateClearAllButtonVisibility() {
  const imagesContainer = document.getElementById('material-images');
  const placeholder = document.getElementById('no-materials-placeholder');
  const clearBtn = document.getElementById('clear-all-button');

  const hasMaterials = imagesContainer.querySelectorAll('.material-image').length > 0;

  if (placeholder) {
    placeholder.style.display = hasMaterials ? 'none' : 'block';
  }

  if (clearBtn) {
    clearBtn.style.display = hasMaterials ? 'inline-block' : 'none';
  }
}

function calculateMaterialsAndExplosivesForWall(item) {
  const table = item.costType === 'Alt' ? items_altcost : items_cheapcost;
  const list = table[item.name] || [];
  const mats = {}, used = {};
  list.forEach(({ explosive, quantity }) => {
    used[explosive] = (used[explosive] || 0) + quantity;
    const rec = explosives[explosive] || {};
    Object.entries(rec).forEach(([m, q]) => mats[m] = (mats[m] || 0) + q * quantity);
  });
  return { materials: mats, usedExplosives: used };
}

function triggerPopEffect(holderId) {
  const holder = document.getElementById(holderId);
  if (!holder) return;

  holder.classList.remove('pop-effect');
  void holder.offsetWidth;
  holder.classList.add('pop-effect');
}

function calculateRaidCost() {
  const mats = { cloth: 0, gun_powder: 0, low_grade_fuel: 0, metal_fragments: 0, pipes: 0, rope: 0, sulfur: 0, tech_trash: 0 };
  const ex = {};

  materials.forEach(item => {
    const { materials: mm, usedExplosives } = calculateMaterialsAndExplosivesForWall(item);
    Object.entries(mm).forEach(([k, v]) => mats[k] += v);
    Object.entries(usedExplosives).forEach(([e, v]) => ex[e] = (ex[e] || 0) + v);
  });

  state.materialsMap = mats;
  state.explosiveCounts = ex;

  [
    ['Rocket', 'rocket'],
    ['C4', 'c4'],
    ['Explosive_Ammo', 'explosive-ammo'],
    ['Molotov', 'molotov'],
    ['Beancan', 'beancan-grenade'],
    ['Satchel', 'satchel-charge'],
    ['HV_Rocket', 'hv-rocket'],
    ['F1_Grenade', 'f1-grenade'],
    ['Incendiary_Rocket', 'incendiary-rocket']
  ].forEach(([key, id]) => {
    const qty = ex[key] || 0;
    const qEl = document.getElementById(`${id}-quantity`);
    const hEl = document.getElementById(`${id}-holder`);
    if (qEl && hEl) {
      if (qEl.textContent != qty) {
        qEl.textContent = qty;
        triggerPopEffect(`${id}-holder`);
      }
      hEl.style.display = 'inline-block';
    }
  });

  [
    ['cloth', 'cloth'],
    ['gun_powder', 'gun-powder'],
    ['low_grade_fuel', 'low-grade-fuel'],
    ['metal_fragments', 'metal-fragments'],
    ['pipes', 'metal-pipe'],
    ['rope', 'rope'],
    ['sulfur', 'sulfur'],
    ['tech_trash', 'tech-trash']
  ].forEach(([k, id]) => {
    const qty = mats[k] || 0;
    const qEl = document.getElementById(`${id}-quantity`);
    const hEl = document.getElementById(`${id}-holder`);
    if (qEl && hEl) {
      if (qEl.textContent != qty) {
        qEl.textContent = qty;
        triggerPopEffect(`${id}-holder`);
      }
      hEl.style.display = 'inline-block';
    }
  });

  const only = (mats.sulfur || 0) + (mats.gun_powder || 0) * 2;
  const osEl = document.getElementById('only-sulfur-quantity');
  const osH = document.getElementById('only-sulfur-holder');
  const nc = document.getElementById('node-counter');

  if (osEl && osH && nc) {
    if (osEl.textContent != only) {
      osEl.textContent = only;
      triggerPopEffect('only-sulfur-holder');
    }
    osH.style.display = only > 0 ? 'inline-block' : 'none';
    nc.textContent = `On Vanilla servers: ~${Math.ceil(only / 300)} sulfur nodes.`;
  }
}


const altAllowed = new Set([
  'Wood','Stone','Metal','Armored','Garage-Door'
]);

export function renderGrid() {
  const grid = document.getElementById('targets-grid');
  if (!grid) return;
  grid.innerHTML = '';

  structureNames.forEach(name => {
    const cell = document.createElement('div');
    cell.className = 'grid-item';

    const btn = document.createElement('button');
    btn.className = 'structure-btn';
    btn.innerHTML = `
      <img src="images/${iconFiles[name]}" alt="${name}">
    `;
    btn.onclick = () => addToMaterials(name, 'Cheap');
    cell.appendChild(btn);

    if (altAllowed.has(name)) {
      const alt = document.createElement('button');
      alt.className = 'alt-btn';
      alt.textContent = 'Splash';
      alt.onclick = () => addToMaterials(name, 'Alt');
      cell.appendChild(alt);
    }

    grid.appendChild(cell);
  });
}

export function renderPath() {
  const ul = document.getElementById('path-log');
  if (!ul) return;
  ul.innerHTML = state.raidLog.map(n => `<li>${n}</li>`).join('');
}

export function renderCraft() {
  const ul = document.getElementById('craft-list');
  if (!ul) return;
  const mats = state.materialsMap || {};
  ul.innerHTML = Object.entries(mats)
    .map(([m, q]) => `<li>${m.replace(/_/g,' ')}: ${q}</li>`)
    .join('');
}

function addToMaterials(name, costType) {
  materials.push({ name, costType });
  displayMaterialImage(name);
  updateClearAllButtonVisibility();
  calculateRaidCost();
  state.raidLog.push(name);
  renderPath();
}

function removeFromMaterials(name) {
  for (let i = materials.length - 1; i >= 0; i--) {
    if (materials[i].name === name) {
      materials.splice(i, 1);
      break;
    }
  }
  removeMaterialImage(name);
  updateClearAllButtonVisibility();
  calculateRaidCost();

  const j = state.raidLog.lastIndexOf(name);
  if (j > -1) state.raidLog.splice(j, 1);
}

function clearAllMaterials() {
  materials = [];
  document.getElementById('material-images').innerHTML = '';
  updateClearAllButtonVisibility();
  calculateRaidCost();
  state.raidLog = [];
}

function undo() {
  const last = materials.pop();
  if (last) removeMaterialImage(last.name);
  updateClearAllButtonVisibility();
  calculateRaidCost();
  state.raidLog.pop();
}

export function initRaid() {
  renderGrid();
  calculateRaidCost();
  renderPath();
  updateClearAllButtonVisibility();

  const clearBtn = document.getElementById('clear-all-button');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllMaterials);
  }
}