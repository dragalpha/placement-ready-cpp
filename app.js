const STORAGE_KEY = "placementReadyCppProgress";
const DEFAULT_PROGRESS = {
  xp: 0,
  completedProblemIds: [],
  currentProblemId: 1,
  settings: {
    confirmReset: false,
  },
};

const state = {
  currentView: "dashboard",
  selectedProblemId: 1,
  message: null,
  confirmReset: false,
};

const moduleOrder = [
  "Basics",
  "Patterns",
  "Functions",
  "Arrays",
  "Strings",
  "Pointers",
  "Recursion",
  "Sorting",
  "Binary Search",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graph",
  "Dynamic Programming",
  "Advanced Data Structures",
  "Bit Manipulation",
  "Advanced Arrays",
  "Placement Arena",
  "Competitive Programming",
  "Final Boss Preparation",
];

const progress = loadProgress();

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_PROGRESS };
    }

    const saved = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...saved,
      completedProblemIds: Array.isArray(saved.completedProblemIds) ? saved.completedProblemIds : [],
    };
  } catch (error) {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function normalizeProblemName(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function getProblemById(id) {
  const problemId = Number(id);
  return window.PROBLEMS.find((problem) => problem.id === problemId) || null;
}

function isProblemCompleted(problemId) {
  return progress.completedProblemIds.includes(Number(problemId));
}

function getProblemGroup(problem) {
  return problem ? problem.module : "Unknown";
}

function getModuleProblems(moduleName) {
  return window.PROBLEMS.filter((problem) => problem.module === moduleName);
}

function getCurrentMission() {
  const next = window.PROBLEMS.find((problem) => !isProblemCompleted(problem.id) && isProblemUnlocked(problem.id));
  return next || window.PROBLEMS[window.PROBLEMS.length - 1];
}

function getCompletedXpBefore(problemId) {
  const targetId = Number(problemId);
  return window.PROBLEMS
    .filter((problem) => problem.id < targetId && isProblemCompleted(problem.id))
    .reduce((sum, problem) => sum + Number(problem.xp), 0);
}

function getXpBefore(problemId) {
  const targetId = Number(problemId);
  if (!Number.isFinite(targetId)) {
    return 0;
  }

  return window.PROBLEMS
    .filter((problem) => problem.id < targetId)
    .reduce((sum, problem) => sum + Number(problem.xp), 0);
}

function getXpThrough(problemId) {
  const targetId = Number(problemId);
  if (!Number.isFinite(targetId)) {
    return 0;
  }

  return window.PROBLEMS
    .filter((problem) => problem.id <= targetId)
    .reduce((sum, problem) => sum + Number(problem.xp), 0);
}

function updateProblemHash(problemId) {
  const nextId = Number(problemId);
  if (!Number.isFinite(nextId)) return;
  window.history.replaceState({}, "", `#problem-${nextId}`);
}

function getProblemIdFromHash() {
  const hash = window.location.hash || "";
  const match = hash.match(/problem-(\d+)/i);
  return match ? Number(match[1]) : null;
}

function jumpToProblem(problemId) {
  const targetId = Number(problemId);
  if (!Number.isFinite(targetId) || !getProblemById(targetId)) {
    return { ok: false, message: "Enter a valid problem number." };
  }

  state.currentView = "mission";
  state.selectedProblemId = targetId;
  state.message = null;
  updateProblemHash(targetId);
  render();
  return { ok: true, message: "Opened mission." };
}

function isProblemUnlocked(problemId) {
  const problem = getProblemById(problemId);
  if (!problem) {
    return false;
  }

  const sameModule = getModuleProblems(problem.module);
  const index = sameModule.findIndex((item) => item.id === Number(problemId));

  if (index <= 0) {
    return true;
  }

  const previous = sameModule[index - 1];
  return isProblemCompleted(previous.id);
}

function getLevelSummary() {
  const completedCount = progress.completedProblemIds.length;

  if (completedCount === 0) {
    return { level: 1, label: "Programming Apprentice" };
  }

  const levelMap = [
    { start: 1, end: 42, level: 1, label: "Programming Apprentice" },
    { start: 43, end: 85, level: 2, label: "C++ Intermediate" },
    { start: 86, end: 108, level: 3, label: "DSA Beginner" },
    { start: 109, end: 135, level: 4, label: "Data Structures" },
    { start: 136, end: 159, level: 5, label: "Trees" },
    { start: 160, end: 175, level: 6, label: "Graph & Advanced Algorithms" },
    { start: 176, end: 205, level: 7, label: "Problem Solving Patterns" },
    { start: 206, end: 226, level: 8, label: "Backtracking & Dynamic Programming" },
    { start: 227, end: 237, level: 9, label: "Advanced Data Structures & Strings" },
    { start: 238, end: 252, level: 10, label: "Bit Manipulation & Advanced Arrays" },
    { start: 253, end: 269, level: 11, label: "Placement Arena" },
    { start: 270, end: 286, level: 12, label: "Competitive Programming" },
    { start: 287, end: 300, level: 13, label: "Final Boss Preparation" },
  ];

  const current = levelMap.find((item) => completedCount >= item.start && completedCount <= item.end) || levelMap[levelMap.length - 1];
  return { level: current.level, label: current.label };
}

function formatXp(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function getUnlockedNextProblem(problemId) {
  const problem = getProblemById(problemId);
  if (!problem) {
    return null;
  }

  const sameModule = getModuleProblems(problem.module);
  const currentIndex = sameModule.findIndex((item) => item.id === Number(problemId));

  if (currentIndex === -1) {
    return null;
  }

  const nextProblem = sameModule[currentIndex + 1];
  return nextProblem || null;
}

function completeProblem(problemId, enteredName) {
  const problem = getProblemById(problemId);
  if (!problem) {
    return { ok: false, message: "Problem not found." };
  }

  if (isProblemCompleted(problemId)) {
    return { ok: false, message: "This mission has already been completed." };
  }

  const normalizedInput = normalizeProblemName(enteredName);
  const canonicalName = normalizeProblemName(problem.name);

  if (normalizedInput !== canonicalName) {
    return {
      ok: false,
      message: "❌ Problem name doesn't match. Enter the problem name shown above.",
    };
  }

  progress.completedProblemIds = [...new Set([...progress.completedProblemIds, Number(problemId)])];
  progress.xp += Number(problem.xp);
  progress.currentProblemId = Number(problemId);

  saveProgress();

  const nextMission = getUnlockedNextProblem(problemId);
  if (nextMission) {
    state.selectedProblemId = nextMission.id;
  } else {
    state.selectedProblemId = Number(problemId);
  }

  return {
    ok: true,
    message: `🏆 Mission Complete! +${formatXp(problem.xp)} XP`,
  };
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(progress, { ...DEFAULT_PROGRESS });
  state.selectedProblemId = 1;
  state.confirmReset = false;
  state.message = null;
  saveProgress();
}

function renderNavButtons() {
  const buttons = document.querySelectorAll(".nav-button");
  buttons.forEach((button) => {
    const isActive = button.dataset.view === state.currentView;
    button.classList.toggle("active", isActive);
  });
}

function renderDashboard() {
  const completedCount = progress.completedProblemIds.length;
  const totalCount = window.PROBLEMS.length;
  const currentMission = getCurrentMission();
  const levelSummary = getLevelSummary();
  const percentage = Math.round((completedCount / totalCount) * 100);

  return `
    <section class="page dashboard-grid">
      <article class="card stats-card">
        <p class="label">XP</p>
        <p class="value highlight">${formatXp(progress.xp)} XP</p>
      </article>

      <article class="card stats-card">
        <p class="label">Problems</p>
        <p class="value">${completedCount} / ${totalCount}</p>
      </article>

      <article class="card stats-card">
        <p class="label">Current Mission</p>
        <p class="value" style="font-size: 1.2rem; line-height: 1.3;">${currentMission.id} — ${currentMission.name}</p>
      </article>

      <article class="card stats-card">
        <p class="label">Current Level</p>
        <p class="value" style="font-size: 1.25rem; line-height: 1.35;">Level ${levelSummary.level}</p>
      </article>

      <article class="card main-panel">
        <div class="panel-header">
          <h2>Mission Tracker</h2>
          <span class="meta-pill">${percentage}% complete</span>
        </div>

        <div class="progress-bar" aria-label="Overall progress">
          <span style="width: ${percentage}%"></span>
        </div>

        <div class="mission-card" style="margin-top: 20px;">
          <div class="mission-badge">Current Mission</div>
          <h3 class="mission-title">${currentMission.id} — ${currentMission.name}</h3>
          <div class="meta-row">
            <span class="meta-pill">⭐ ${currentMission.difficulty}</span>
            <span class="meta-pill">+${currentMission.xp} XP</span>
            <span class="meta-pill">${currentMission.module}</span>
          </div>
          <p class="mission-description">${currentMission.description}</p>
          <div class="action-row">
            <button class="primary-button" data-action="open-mission" data-problem-id="${currentMission.id}">Continue</button>
          </div>
        </div>
      </article>

      <aside class="card side-panel">
        <div class="panel-header">
          <h3>Journey</h3>
        </div>
        <div class="progress-bar"><span style="width: ${percentage}%"></span></div>
        <div class="warning-box" style="margin-top: 18px;">
          ⚠️ Don’t skip problems. If you mark a problem complete without solving it, you’re cheating yourself.
        </div>
      </aside>
    </section>
  `;
}

function renderSkillTree() {
  const groups = moduleOrder.map((moduleName) => {
    const moduleProblems = getModuleProblems(moduleName);
    const rows = moduleProblems
      .map((problem) => {
        const completed = isProblemCompleted(problem.id);
        const unlocked = isProblemUnlocked(problem.id);
        const current = state.selectedProblemId === problem.id || getCurrentMission().id === problem.id;

        let stateName = "locked";
        if (completed) stateName = "completed";
        else if (unlocked || current) stateName = "current";

        return `
          <button class="problem-node" data-action="open-mission" data-problem-id="${problem.id}" data-state="${stateName}">
            <div>
              <strong>${String(problem.id).padStart(2, "0")} — ${problem.name}</strong>
              <span>${problem.difficulty} • ${problem.xp} XP</span>
            </div>
            <span class="problem-state">${completed ? "✅" : unlocked ? "▶" : "🔒"}</span>
          </button>
        `;
      })
      .join("");

    return `
      <article class="card module-card">
        <h3>${moduleName}</h3>
        <div class="problem-list">${rows}</div>
      </article>
    `;
  });

  return `
    <section class="page">
      <div class="panel-header" style="margin-bottom: 20px;">
        <h2>Skill Tree</h2>
      </div>

      <div class="jump-bar">
        <input id="jump-problem-input" type="number" min="1" max="300" placeholder="Jump to problem #" aria-label="Jump to problem number" />
        <button class="secondary-button" type="button" data-action="jump-problem">Jump</button>
      </div>

      <div class="skill-grid">${groups.join("")}</div>
    </section>
  `;
}

function renderMission() {
  const problem = getProblemById(state.selectedProblemId) || getCurrentMission();
  const messageHtml = state.message
    ? `<div class="status-message ${state.message.type}">${state.message.text}</div>`
    : "";
  const previousXp = getXpBefore(problem.id);
  const xpToMission = getXpThrough(problem.id);
  const currentLevel = getLevelSummary();

  return `
    <section class="page">
      <article class="mission-card">
        <div class="mission-badge">Mission ${problem.id}</div>
        <h2 class="mission-title">${problem.name}</h2>

        <div class="meta-row">
          <span class="meta-pill">⭐ ${problem.difficulty}</span>
          <span class="meta-pill">+${problem.xp} XP</span>
          <span class="meta-pill">${problem.filename}</span>
          <span class="meta-pill">${problem.module}</span>
        </div>

        <div class="mission-meta-grid">
          <div class="metric-card">
            <span>XP before this</span>
            <strong>${formatXp(previousXp)}</strong>
          </div>
          <div class="metric-card">
            <span>XP to this mission</span>
            <strong>${formatXp(xpToMission)}</strong>
          </div>
          <div class="metric-card">
            <span>Current Level</span>
            <strong>Level ${currentLevel.level}</strong>
          </div>
        </div>

        <p class="mission-description">${problem.description}</p>

        <div class="warning-box">
          ⚠️ Don’t skip problems. Solve it yourself before marking it complete.
        </div>

        <form id="mission-form" class="form-wrap">
          <label for="problem-name-input">Have you solved this problem?</label>
          <input id="problem-name-input" name="problemName" type="text" autocomplete="off" placeholder="Enter the problem name" aria-label="Problem name input" />

          <div class="action-row">
            <button class="primary-button" type="submit">Mark Complete</button>
            <button class="inline-button" type="button" data-action="open-module" data-module="${problem.module}">Back to Module</button>
          </div>
        </form>

        ${messageHtml}
      </article>
    </section>
  `;
}

function renderProgress() {
  const completed = progress.completedProblemIds.length;
  const total = window.PROBLEMS.length;
  const percentage = Math.round((completed / total) * 100);
  const moduleSummary = moduleOrder.map((moduleName) => {
    const problems = getModuleProblems(moduleName);
    const completedCount = problems.filter((problem) => isProblemCompleted(problem.id)).length;
    const percent = Math.round((completedCount / problems.length) * 100);

    return `
      <div class="progress-row">
        <strong>${moduleName}</strong>
        <small>${completedCount}/${problems.length}</small>
        <div class="small-progress"><span style="width:${percent}%"></span></div>
      </div>
    `;
  });

  return `
    <section class="page progress-grid">
      <article class="card overall-card">
        <div class="panel-header">
          <h2>Your Journey</h2>
        </div>

        <p class="label">Problems completed</p>
        <p class="value" style="margin-top: 8px; font-size: 2rem;">${completed} / ${total}</p>

        <div class="progress-bar" style="margin-top: 14px;">
          <span style="width: ${percentage}%"></span>
        </div>

        <div class="meta-row" style="margin-top: 18px;">
          <span class="meta-pill">Total XP: ${formatXp(progress.xp)}</span>
          <span class="meta-pill">Current Level: ${getLevelSummary().level}</span>
        </div>
      </article>

      <aside class="card module-summary">
        <div class="panel-header">
          <h3>Module Progress</h3>
        </div>
        <div class="progress-list">${moduleSummary.join("")}</div>
      </aside>
    </section>
  `;
}

function renderSettings() {
  return `
    <section class="page">
      <article class="card settings-panel">
        <div class="panel-header">
          <h2>Settings</h2>
        </div>

        <div class="settings-card">
          <div>
            <strong>Reset Progress</strong>
            <p>This will erase your local XP and completed missions.</p>
          </div>

          ${state.confirmReset
            ? `
              <div class="action-row">
                <button class="danger-button" data-action="confirm-reset">Reset Progress</button>
                <button class="inline-button" data-action="cancel-reset">Cancel</button>
              </div>
            `
            : `<button class="danger-button" data-action="show-reset-confirmation">Reset Progress</button>`}
        </div>
      </article>
    </section>
  `;
}

function render() {
  const app = document.getElementById("app");

  renderNavButtons();

  let mainContent = "";

  switch (state.currentView) {
    case "dashboard":
      mainContent = renderDashboard();
      break;
    case "skill-tree":
      mainContent = renderSkillTree();
      break;
    case "progress":
      mainContent = renderProgress();
      break;
    case "settings":
      mainContent = renderSettings();
      break;
    case "mission":
      mainContent = renderMission();
      break;
    default:
      mainContent = renderDashboard();
  }

  const levelSummary = getLevelSummary();
  const levelFooter = `
    <div class="level-footer">
      <div class="level-footer-box">
        <span>Current Level</span>
        <strong>Level ${levelSummary.level}</strong>
        <small>${levelSummary.label}</small>
      </div>
    </div>
  `;

  app.innerHTML = `${mainContent}${levelFooter}`;

  const form = document.getElementById("mission-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("problem-name-input");
      const result = completeProblem(state.selectedProblemId, input.value);
      state.message = {
        type: result.ok ? "success" : "error",
        text: result.ok ? `${result.message} Next mission unlocked.` : result.message,
      };

      if (result.ok) {
        state.currentView = "mission";
      }

      render();
    });
  }
}

document.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-view]");
  if (navButton) {
    state.currentView = navButton.dataset.view;
    state.message = null;
    render();
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, problemId, module } = actionButton.dataset;

  if (action === "jump-problem") {
    const input = document.getElementById("jump-problem-input");
    const value = input ? input.value : "";
    const result = jumpToProblem(value);
    if (!result.ok) {
      state.message = { type: "error", text: result.message };
      render();
    }
    return;
  }

  if (action === "open-mission") {
    state.currentView = "mission";
    state.selectedProblemId = Number(problemId);
    updateProblemHash(state.selectedProblemId);
    state.message = null;
    render();
    return;
  }

  if (action === "open-module") {
    state.currentView = "skill-tree";
    state.message = null;
    render();
    return;
  }

  if (action === "show-reset-confirmation") {
    state.confirmReset = true;
    render();
    return;
  }

  if (action === "cancel-reset") {
    state.confirmReset = false;
    render();
    return;
  }

  if (action === "confirm-reset") {
    resetProgress();
    state.currentView = "dashboard";
    render();
    return;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const hashProblemId = getProblemIdFromHash();
  if (hashProblemId) {
    state.selectedProblemId = hashProblemId;
    state.currentView = "mission";
  } else {
    state.selectedProblemId = getCurrentMission().id;
  }
  render();
});
