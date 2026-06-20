let isAdmin = false;
let editingIndex = null;
let currentOccasion = null;
let currentYear = null;

const GROUPS = [
  { key: "Father's Day", icon: '👔', label: "Father's Day" },
  { key: "Birthday",     icon: '🎂', label: "Birthday"     },
  { key: "Christmas",    icon: '🎄', label: "Christmas"    },
  { key: "Other",        icon: '🎁', label: "Other"        },
];

// ── Auth ──────────────────────────────────────────────────────────────────────

document.getElementById('unlock-btn').addEventListener('click', tryUnlock);
document.getElementById('password-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') tryUnlock();
});

function tryUnlock() {
  const val = document.getElementById('password-input').value;
  if (val === VIEW_PASSWORD || val === ADMIN_PASSWORD) {
    if (val === ADMIN_PASSWORD) {
      activateAdmin();
    } else {
      document.getElementById('admin-btn').classList.add('hidden');
    }
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    renderGallery();
  } else {
    document.getElementById('lock-error').classList.remove('hidden');
  }
}

document.getElementById('lock-btn').addEventListener('click', () => {
  isAdmin = false;
  document.getElementById('add-card-btn').classList.add('hidden');
  document.getElementById('admin-btn').textContent = 'Admin';
  document.getElementById('admin-btn').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
  document.getElementById('lock-screen').classList.remove('hidden');
  document.getElementById('password-input').value = '';
  document.getElementById('lock-error').classList.add('hidden');
  showHomeScreen();
});

// ── Admin ─────────────────────────────────────────────────────────────────────

document.getElementById('admin-btn').addEventListener('click', () => {
  if (isAdmin) { deactivateAdmin(); return; }
  showModal('admin-modal');
  setTimeout(() => document.getElementById('admin-password-input').focus(), 50);
});

document.getElementById('admin-cancel-btn').addEventListener('click', () => hideModal('admin-modal'));
document.getElementById('admin-password-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') confirmAdmin();
});
document.getElementById('admin-confirm-btn').addEventListener('click', confirmAdmin);

function confirmAdmin() {
  if (document.getElementById('admin-password-input').value === ADMIN_PASSWORD) {
    activateAdmin();
    hideModal('admin-modal');
  } else {
    document.getElementById('admin-error').classList.remove('hidden');
  }
}

function activateAdmin() {
  isAdmin = true;
  document.getElementById('add-card-btn').classList.remove('hidden');
  document.getElementById('admin-btn').textContent = 'Exit Admin';
  renderGallery();
}

function deactivateAdmin() {
  isAdmin = false;
  document.getElementById('add-card-btn').classList.add('hidden');
  document.getElementById('admin-btn').textContent = 'Admin';
  renderGallery();
}

// ── Screen navigation ─────────────────────────────────────────────────────────

function showHomeScreen() {
  document.getElementById('home-screen').classList.remove('hidden');
  document.getElementById('card-screen').classList.add('hidden');
  document.getElementById('back-btn').classList.add('hidden');
  currentOccasion = null;
  currentYear = null;
}

function showCardScreen(occasion) {
  currentOccasion = occasion;
  document.getElementById('home-screen').classList.add('hidden');
  document.getElementById('card-screen').classList.remove('hidden');
  document.getElementById('back-btn').classList.remove('hidden');
  renderCardScreen();
}

document.getElementById('back-btn').addEventListener('click', showHomeScreen);

// ── Gallery ───────────────────────────────────────────────────────────────────

function renderGallery() {
  const main = document.getElementById('main-content');
  const emptyMsg = document.getElementById('empty-msg');
  main.innerHTML = '';

  const hasAny = CARDS.length > 0;
  emptyMsg.classList.toggle('hidden', hasAny);
  if (!hasAny) return;

  GROUPS.forEach(group => {
    const cards = CARDS.filter(c => c.occasion === group.key);
    if (cards.length === 0 && !isAdmin) return;

    const section = document.createElement('section');
    section.className = 'group';

    section.innerHTML = `
      <div class="group-header">
        <span class="group-icon">${group.icon}</span>
        <h2 class="group-title">${group.label}</h2>
        <span class="group-count">${cards.length} card${cards.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="group-grid"></div>
      ${cards.length === 0 ? '<p class="empty-group">No cards yet.</p>' : ''}
    `;

    const grid = section.querySelector('.group-grid');
    const sorted = [...cards].sort((a, b) => b.year - a.year);

    sorted.forEach((card, i) => {
      const globalIndex = CARDS.indexOf(card);
      const tile = document.createElement('div');
      tile.className = 'card';

      const imgHtml = card.image
        ? `<img class="card-img" src="${card.image}" alt="" loading="lazy" />`
        : `<div class="card-placeholder">
             <span class="card-placeholder-icon">${group.icon}</span>
             <div class="card-placeholder-lines">
               <div class="card-placeholder-line"></div>
               <div class="card-placeholder-line"></div>
               <div class="card-placeholder-line"></div>
             </div>
           </div>`;

      tile.innerHTML = `
        ${imgHtml}
        <div class="card-body">
          ${isAdmin
            ? `<div class="card-year">${card.year}</div><div class="card-snippet">${card.message || ''}</div>`
            : `<div class="card-cta">CLICK TO VIEW</div>`
          }
        </div>
      `;

      tile.addEventListener('click', () => showCardScreen(group.key));
      grid.appendChild(tile);
    });

    main.appendChild(section);
  });
}

// ── Card view screen ──────────────────────────────────────────────────────────

function renderCardScreen() {
  const group = GROUPS.find(g => g.key === currentOccasion);
  const cards = CARDS
    .map((c, i) => ({ ...c, _index: i }))
    .filter(c => c.occasion === currentOccasion)
    .sort((a, b) => b.year - a.year);

  // Build year bar
  const yearBar = document.getElementById('year-bar');
  yearBar.innerHTML = '';

  if (!currentYear || !cards.find(c => c.year === currentYear)) {
    currentYear = cards[0]?.year ?? null;
  }

  cards.forEach(card => {
    const pill = document.createElement('button');
    pill.className = 'year-pill' + (card.year === currentYear ? ' active' : '');
    pill.textContent = card.year;
    pill.addEventListener('click', () => {
      currentYear = card.year;
      renderCardScreen();
    });
    yearBar.appendChild(pill);
  });

  // Show selected card
  const selected = cards.find(c => c.year === currentYear);
  const img = document.getElementById('view-image');
  const msg = document.getElementById('view-message');
  const adminActions = document.getElementById('view-admin-actions');

  if (selected) {
    if (selected.image) {
      img.src = selected.image;
      img.classList.remove('hidden');
    } else {
      img.classList.add('hidden');
    }
    msg.textContent = selected.message || '';
    adminActions.classList.toggle('hidden', !isAdmin);

    // Wire up edit/delete
    document.getElementById('view-edit-btn').onclick = () => openCardModal(selected);
    document.getElementById('view-delete-btn').onclick = () => {
      if (!confirm(`Delete this ${selected.occasion} card from ${selected.year}?`)) return;
      CARDS.splice(selected._index, 1);
      const remaining = CARDS.filter(c => c.occasion === currentOccasion);
      if (remaining.length === 0) {
        showHomeScreen();
        renderGallery();
      } else {
        currentYear = null;
        renderCardScreen();
        renderGallery();
      }
    };
  } else {
    img.classList.add('hidden');
    msg.textContent = '';
    adminActions.classList.add('hidden');
  }
}

// ── Add / Edit card modal ─────────────────────────────────────────────────────

document.getElementById('add-card-btn').addEventListener('click', () => openCardModal(null));

function openCardModal(card) {
  editingIndex = card ? card._index : null;
  document.getElementById('card-modal-title').textContent = card ? 'Edit Card' : 'New Card';
  document.getElementById('card-occasion').value = card ? card.occasion : "Father's Day";
  document.getElementById('card-year').value = card ? card.year : new Date().getFullYear();
  document.getElementById('card-message').value = card ? card.message : '';
  document.getElementById('card-image').value = '';
  document.getElementById('card-error').classList.add('hidden');

  const previewWrap = document.getElementById('card-image-preview-wrap');
  if (card && card.image) {
    document.getElementById('card-image-preview').src = card.image;
    previewWrap.classList.remove('hidden');
  } else {
    previewWrap.classList.add('hidden');
  }

  showModal('card-modal');
  setTimeout(() => document.getElementById('card-message').focus(), 50);
}

document.getElementById('card-cancel-btn').addEventListener('click', () => hideModal('card-modal'));
document.getElementById('card-modal').addEventListener('click', e => {
  if (e.target.id === 'card-modal') hideModal('card-modal');
});

document.getElementById('card-image').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('card-image-preview').src = ev.target.result;
    document.getElementById('card-image-preview-wrap').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

document.getElementById('card-image-remove').addEventListener('click', () => {
  document.getElementById('card-image').value = '';
  document.getElementById('card-image-preview-wrap').classList.add('hidden');
});

document.getElementById('card-save-btn').addEventListener('click', saveCard);

function saveCard() {
  const occasion = document.getElementById('card-occasion').value;
  const year = parseInt(document.getElementById('card-year').value, 10);
  const message = document.getElementById('card-message').value.trim();
  const errEl = document.getElementById('card-error');

  if (!year || !message) {
    errEl.textContent = 'Please fill in the year and message.';
    errEl.classList.remove('hidden');
    return;
  }

  const imagePreview = document.getElementById('card-image-preview').src;
  const hasNewImage = document.getElementById('card-image').files[0];
  const image = hasNewImage ? imagePreview : (editingIndex !== null ? CARDS[editingIndex].image : null);

  const card = { occasion, year, message, image: hasNewImage ? imagePreview : image };

  if (editingIndex !== null) {
    CARDS[editingIndex] = card;
  } else {
    CARDS.push(card);
  }

  hideModal('card-modal');
  renderGallery();
  if (currentOccasion) renderCardScreen();
  showNotice('Saved in this session. Update cards.js and push to make it permanent.');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function showModal(id) { document.getElementById(id).classList.remove('hidden'); }
function hideModal(id) { document.getElementById(id).classList.add('hidden'); }

function showNotice(msg) {
  let notice = document.getElementById('notice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'notice';
    notice.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
      background:#1e2840; border:1px solid #c9a84c; color:#e8c96a;
      padding:12px 24px; border-radius:8px; font-size:0.82rem;
      font-family:-apple-system,sans-serif; z-index:999; letter-spacing:0.04em;
      box-shadow:0 4px 20px rgba(0,0,0,0.5); max-width:90vw; text-align:center;
    `;
    document.body.appendChild(notice);
  }
  notice.textContent = msg;
  notice.style.display = 'block';
  clearTimeout(notice._t);
  notice._t = setTimeout(() => { notice.style.display = 'none'; }, 5000);
}
