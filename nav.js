(function () {

  /* ═══════════════════════════════════════════
     EDIT HERE — add new pages & branches below
  ═══════════════════════════════════════════ */
  const PAGES = {
    dashboard:       'https://worldlab-club.github.io/dashboard/',
    chineseWriting:  'https://worldlab-club.github.io/comm-lab/chinese-writing.html',
    thaiWriting:     'https://worldlab-club.github.io/comm-lab/thai-writing',
    worldMap:        'https://worldlab-club.github.io/world-map/',
    familyTree:      'https://worldlab-club.github.io/family-tree/',
    chess:           'https://worldlab-club.github.io/chess/',
    pixelPainter:    'https://worldlab-club.github.io/pixel-painter/',
  };

  const BRANCHES = [
    {
      id: 'inner', label: 'Inner World', color: '#9A9A9A',
      tint: '#F0EFEF', textTint: '#6A6A6A',
      comingSoon: true, children: [],
    },
    {
      id: 'comm', label: 'Comm Lab', color: '#E8522A',
      tint: '#FDF0EB', textTint: '#B83A10',
      comingSoon: false,
      children: [
        { label: 'Chinese Writing', emoji: '汉', url: PAGES.chineseWriting, comingSoon: false },
        { label: 'Thai Writing',    emoji: 'ก',  url: PAGES.thaiWriting,    comingSoon: false },
      ],
    },
    {
      id: 'logic', label: 'Logic Lab', color: '#F5B731',
      tint: '#FEF8E7', textTint: '#B88200',
      comingSoon: true,
      children: [
        { label: 'Abacus',      emoji: '🧮', url: null, comingSoon: true },
        { label: 'Finger Math', emoji: '✋', url: null, comingSoon: true },
        { label: 'Fraction',    emoji: '½',  url: null, comingSoon: true },
      ],
    },
    {
      id: 'system', label: 'System Lab', color: '#4A6FD4',
      tint: '#EEF2FC', textTint: '#2E4FA8',
      comingSoon: false,
      children: [
        { label: 'World Map',        emoji: '🗺', url: PAGES.worldMap,   comingSoon: false },
        { label: 'Family Tree',      emoji: '🌳', url: PAGES.familyTree, comingSoon: false },
        { label: 'Timeline',         emoji: '📅', url: null,             comingSoon: true  },
        { label: 'Animal Evolution', emoji: '🦕', url: null,             comingSoon: true  },
      ],
    },
    {
      id: 'growth', label: 'Growth Lab', color: '#4E8B61',
      tint: '#EEF6F1', textTint: '#2E6242',
      comingSoon: false,
      children: [
        { label: 'Pixel Painter', emoji: '🎨', url: PAGES.pixelPainter, comingSoon: false },
        { label: 'Chess',         emoji: '♟',  url: PAGES.chess,        comingSoon: false },
      ],
    },
  ];
  /* ═══════════════════════════════════════════
     END EDITABLE SECTION
  ═══════════════════════════════════════════ */

  const currentUrl = window.location.href;
  function isActive(url) { return url && currentUrl.startsWith(url); }
  function getActiveBranch() {
    for (const b of BRANCHES)
      for (const c of b.children)
        if (isActive(c.url)) return b.id;
    if (isActive(PAGES.dashboard)) return 'dashboard';
    return null;
  }
  const activeBranch = getActiveBranch();

  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Sanchez&display=swap');
    #wl-nav * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Sanchez', Georgia, serif; }

    #wl-trigger {
      position: fixed; bottom: 28px; right: 28px; z-index: 9998;
      width: 48px; height: 48px; border-radius: 14px;
      background: #2A2A2A; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 18px rgba(0,0,0,0.26);
      transition: transform .15s, background .15s;
    }
    #wl-trigger:hover { background: #3d3d3d; transform: scale(1.07); }
    #wl-trigger svg { width: 22px; height: 22px; }

    #wl-backdrop {
      display: none; position: fixed; inset: 0; z-index: 9997;
      background: rgba(15,12,8,0.32);
    }
    #wl-backdrop.open { display: block; }

    #wl-panel {
      position: fixed; bottom: 88px; right: 28px; z-index: 9999;
      width: 288px; background: #FFFFFF; border-radius: 20px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.06);
      overflow: hidden;
      transform: scale(0.93) translateY(14px);
      transform-origin: bottom right;
      opacity: 0; pointer-events: none;
      transition: transform .24s cubic-bezier(.34,1.46,.64,1), opacity .18s ease;
    }
    #wl-panel.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: auto; }

    #wl-header {
      display: flex; align-items: center; gap: 12px;
      padding: 18px 18px 16px;
    }
    #wl-logo { width: 30px; height: 30px; flex-shrink: 0; }
    #wl-header-titles { flex: 1; }
    #wl-header-title { font-size: 0.88rem; color: #2A2A2A; letter-spacing: 0.01em; }
    #wl-header-sub   { font-size: 0.66rem; color: #AAAAAA; margin-top: 2px; }
    #wl-close {
      width: 28px; height: 28px; border-radius: 50%;
      background: #F5F2ED; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: #AAAAAA; font-size: 17px; flex-shrink: 0;
      transition: background .12s, color .12s;
    }
    #wl-close:hover { background: #EDEBE6; color: #2A2A2A; }

    #wl-dashboard-row {
      display: flex; align-items: center; gap: 12px;
      padding: 13px 18px; cursor: pointer; text-decoration: none;
      margin: 0 10px 4px; border-radius: 10px;
      transition: background .12s;
    }
    #wl-dashboard-row:hover { background: #F5F2ED; }
    #wl-dashboard-row.active { background: #F0EFEF; }
    .wl-dash-pip {
      width: 8px; height: 8px; border-radius: 50%;
      background: #CCCCCC; flex-shrink: 0; transition: background .12s;
    }
    #wl-dashboard-row.active .wl-dash-pip { background: #9A9A9A; }
    .wl-dash-label { flex: 1; font-size: 0.82rem; color: #555; }
    #wl-dashboard-row.active .wl-dash-label { color: #2A2A2A; font-weight: 700; }

    .wl-divider { height: 1px; background: #F0EDE8; margin: 4px 18px 8px; }

    #wl-list { padding: 0 10px 12px; }

    .wl-branch { margin-bottom: 4px; border-radius: 12px; overflow: hidden; }

    .wl-branch-row {
      display: flex; align-items: center; gap: 10px;
      padding: 11px 14px; cursor: pointer; border: none;
      width: 100%; text-align: left; border-radius: 12px;
      background: transparent; transition: background .14s;
    }
    .wl-branch-row:hover:not(.coming-soon) { filter: brightness(0.97); }
    .wl-branch-row.coming-soon { cursor: default; }

    .wl-branch-pill {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 4px 12px; border-radius: 20px;
      font-size: 0.78rem; font-weight: 700; letter-spacing: 0.01em;
      color: #fff; flex-shrink: 0; transition: opacity .12s;
    }
    .wl-branch-row.coming-soon .wl-branch-pill { opacity: 0.55; }
    .wl-branch-spacer { flex: 1; }
    .wl-soon-tag { font-size: 0.62rem; color: #CCCCCC; font-style: italic; }
    .wl-branch-arrow {
      font-size: 12px; color: #CCCCCC;
      transition: transform .2s ease; flex-shrink: 0;
    }
    .wl-branch-row.expanded .wl-branch-arrow { transform: rotate(90deg); }

    .wl-children {
      overflow: hidden; max-height: 0;
      transition: max-height .26s ease;
      border-radius: 0 0 12px 12px;
    }
    .wl-children.open { max-height: 500px; }

    .wl-child-row {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px 10px 16px;
      text-decoration: none; transition: background .12s;
      position: relative;
    }
    .wl-child-row:last-child { border-radius: 0 0 10px 10px; }
    .wl-child-row:not(.coming-soon):hover { filter: brightness(0.96); }
    .wl-child-row.coming-soon { opacity: 0.45; pointer-events: none; }
    .wl-child-row.active-page::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%;
      width: 3px; border-radius: 0 3px 3px 0;
    }

    .wl-child-emoji { font-size: 15px; width: 22px; text-align: center; flex-shrink: 0; opacity: 0.85; }
    .wl-child-label { flex: 1; font-size: 0.78rem; }
    .wl-child-label.active-label { font-weight: 700; }
    .wl-child-soon { font-size: 0.6rem; color: #C8C8C8; font-style: italic; flex-shrink: 0; }

    #wl-footer {
      padding: 10px 18px 14px; font-size: 0.6rem; color: #DDDDDD;
      text-align: center; border-top: 1px solid #F5F2ED; margin-top: 4px;
    }

    @media (max-width: 360px) {
      #wl-panel { width: calc(100vw - 32px); right: 16px; }
    }
  `;
  document.head.appendChild(style);

  const trigger = document.createElement('button');
  trigger.id = 'wl-trigger';
  trigger.setAttribute('aria-label', 'Open World Lab navigation');
  trigger.innerHTML = `<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="5.5"  x2="19" y2="5.5"  stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="3" y1="11"   x2="19" y2="11"   stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="3" y1="16.5" x2="19" y2="16.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  const backdrop = document.createElement('div');
  backdrop.id = 'wl-backdrop';

  const panel = document.createElement('div');
  panel.id = 'wl-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'World Lab navigation');

  const header = document.createElement('div');
  header.id = 'wl-header';
  header.innerHTML = `
    <svg id="wl-logo" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.5"  cy="9.5"  r="6.5" fill="#4E8B61"/>
      <circle cx="20.5" cy="9.5"  r="6.5" fill="#F5B731"/>
      <circle cx="9.5"  cy="20.5" r="6.5" fill="#E8522A"/>
      <circle cx="20.5" cy="20.5" r="6.5" fill="#4A6FD4"/>
      <circle cx="15"   cy="15"   r="5"   fill="#fff"/>
      <text x="15" y="18" text-anchor="middle"
        font-family="Sanchez,serif" font-size="4.5" fill="#2A2A2A">WL</text>
    </svg>
    <div id="wl-header-titles">
      <div id="wl-header-title">World Lab</div>
      <div id="wl-header-sub">Homeschool · Bangkok</div>
    </div>
    <button id="wl-close" aria-label="Close">&times;</button>`;
  panel.appendChild(header);

  const dashRow = document.createElement('a');
  dashRow.id = 'wl-dashboard-row';
  dashRow.href = PAGES.dashboard;
  if (activeBranch === 'dashboard') dashRow.classList.add('active');
  dashRow.innerHTML = `
    <span class="wl-dash-pip"></span>
    <span class="wl-dash-label">Dashboard</span>`;
  panel.appendChild(dashRow);

  const divider = document.createElement('div');
  divider.className = 'wl-divider';
  panel.appendChild(divider);

  const list = document.createElement('div');
  list.id = 'wl-list';

  BRANCHES.forEach(branch => {
    const isExpandable   = branch.children.length > 0;
    const isBranchActive = activeBranch === branch.id;

    const branchEl = document.createElement('div');
    branchEl.className = 'wl-branch';
    branchEl.style.background = branch.tint;

    const branchRow = document.createElement('button');
    branchRow.className = 'wl-branch-row'
      + (branch.comingSoon && !isExpandable ? ' coming-soon' : '');
    branchRow.innerHTML = `
      <span class="wl-branch-pill" style="background:${branch.color}">${branch.label}</span>
      <span class="wl-branch-spacer"></span>
      ${branch.comingSoon && !isExpandable
        ? '<span class="wl-soon-tag">coming soon</span>'
        : isExpandable ? '<span class="wl-branch-arrow">›</span>' : ''}`;
    branchEl.appendChild(branchRow);

    if (isExpandable) {
      const children = document.createElement('div');
      children.className = 'wl-children';
      children.style.background = branch.tint;

      if (isBranchActive) {
        branchRow.classList.add('expanded');
        children.classList.add('open');
      }

      branch.children.forEach(child => {
        const childActive = isActive(child.url);
        const row = document.createElement('a');
        row.className = 'wl-child-row'
          + (child.comingSoon ? ' coming-soon' : '')
          + (childActive ? ' active-page' : '');
        row.href = child.comingSoon ? '#' : child.url;
        row.style.background = branch.tint;
        row.style.color = branch.textTint;

        if (childActive) {
          const barStyle = document.createElement('style');
          barStyle.textContent = `
            #wl-nav .wl-child-row.active-page[data-branch="${branch.id}"]::before {
              background: ${branch.color};
            }`;
          document.head.appendChild(barStyle);
          row.setAttribute('data-branch', branch.id);
        }

        row.innerHTML = `
          <span class="wl-child-emoji">${child.emoji}</span>
          <span class="wl-child-label${childActive ? ' active-label' : ''}"
            style="color:${branch.textTint}">${child.label}</span>
          ${child.comingSoon ? '<span class="wl-child-soon">coming soon</span>' : ''}`;
        children.appendChild(row);
      });

      branchEl.appendChild(children);

      branchRow.addEventListener('click', () => {
        const isOpen = children.classList.contains('open');
        list.querySelectorAll('.wl-children.open').forEach(c => c.classList.remove('open'));
        list.querySelectorAll('.wl-branch-row.expanded').forEach(r => r.classList.remove('expanded'));
        if (!isOpen) {
          children.classList.add('open');
          branchRow.classList.add('expanded');
        }
      });
    }

    list.appendChild(branchEl);
  });

  panel.appendChild(list);

  const footer = document.createElement('div');
  footer.id = 'wl-footer';
  footer.textContent = 'World Lab · Bangkok 2026';
  panel.appendChild(footer);

  function openPanel()  { panel.classList.add('open');    backdrop.classList.add('open');    }
  function closePanel() { panel.classList.remove('open'); backdrop.classList.remove('open'); }

  trigger.addEventListener('click', () =>
    panel.classList.contains('open') ? closePanel() : openPanel());
  backdrop.addEventListener('click', closePanel);
  panel.querySelector('#wl-close').addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  const root = document.createElement('div');
  root.id = 'wl-nav';
  root.appendChild(backdrop);
  root.appendChild(trigger);
  root.appendChild(panel);
  document.body.appendChild(root);
})();
