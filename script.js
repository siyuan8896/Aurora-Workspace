// 纯前端演示：真实项目中不要把密码或校验逻辑放在前端。
console.log("[Aurora] script.js loaded");

const DEMO_ACCOUNT = "20090101";
const DEMO_PASSWORD = "159632";
const STORAGE_KEY = "aurora.friends.v1";
const TODO_STORAGE_KEY = "aurora.todos.v1";
const MEMORY_STORAGE_KEY = "aurora.memories.v1";
const MEMBERS_STORAGE_KEY = "aurora_members";
const EXPENSES_STORAGE_KEY = "aurora_expenses";
const WALLET_BUDGET_STORAGE_KEY = "aurora_budget";
const WALLET_CATEGORIES = {
  餐饮: "🍔",
  购物: "🛍️",
  美妆: "💄",
  交通: "🚗",
  娱乐: "🎬",
  其他: "📦",
};
const WALLET_DEFAULT_BUDGET = 3000;
const INSPIRATION_QUOTES = [
  "把复杂的事情，做简单。",
  "保持专注，保持好奇。",
  "今天先完成一件小事。",
  "清晰的界面，清晰的一天。",
  "好的工具，是安静的。",
  "把时间留给重要的事。",
  "先整理，再出发。",
  "慢一点，也是一种效率。",
];
const MEMORY_PASSWORD = "159632";
const ADMIN_ACCESS_PASSWORD = "159632";

const loginForm = document.getElementById("loginForm");
const loginCard = document.getElementById("loginCard");
const loginSuccess = document.getElementById("loginSuccess");
const loginSubmitButton = document.getElementById("loginSubmitButton");
const accountInput = document.getElementById("accountInput");
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const appShell = document.getElementById("appShell");
const contentArea = document.getElementById("main-content");
const statusAnnouncer = document.getElementById("statusAnnouncer");
const errorDialog = document.getElementById("errorDialog");
const closeErrorDialog = document.getElementById("closeErrorDialog");
const retryButton = document.getElementById("retryButton");

const navItems = Array.from(document.querySelectorAll(".nav-item[data-view]"));
const panels = {
  home: document.getElementById("homeView"),
  friends: document.getElementById("friendsView"),
  outfit: document.getElementById("outfitView"),
  todo: document.getElementById("todoView"),
  memory: document.getElementById("memoryView"),
  color: document.getElementById("colorView"),
  account: document.getElementById("accountView"),
  wallet: document.getElementById("walletView"),
};
const viewLabels = {
  home: "首页",
  friends: "朋友",
  outfit: "穿搭",
  todo: "待办任务",
  memory: "回忆",
  color: "调色",
  account: "账号管理",
  wallet: "小金库",
};
const currentSectionLabel = document.getElementById("currentSectionLabel");
const storageStatus = document.getElementById("storageStatus");
const storageStatusText = document.getElementById("storageStatusText");

const friendForm = document.getElementById("friendForm");
const friendName = document.getElementById("friendName");
const friendBirthday = document.getElementById("friendBirthday");
const friendPersonality = document.getElementById("friendPersonality");
const friendStatus = document.getElementById("friendStatus");
const friendList = document.getElementById("friendList");
const friendListMeta = document.getElementById("friendListMeta");
const friendCountPill = document.getElementById("friendCountPill");
const navFriendCount = document.getElementById("navFriendCount");
const homeAppAccount = document.getElementById("homeAppAccount");
const homeFriendCount = document.getElementById("homeFriendCount");
const homeTodoTotal = document.getElementById("homeTodoTotal");
const homeTodoCompleted = document.getElementById("homeTodoCompleted");
const inspirationText = document.getElementById("inspirationText");
const inspirationMeta = document.getElementById("inspirationMeta");
const inspirationRefresh = document.getElementById("inspirationRefresh");
const homeQuickTodoList = document.getElementById("homeQuickTodoList");
const homeQuickTodoToggle = document.getElementById("quickTodoToggle");
const homeQuickTodoForm = document.getElementById("homeQuickTodoForm");
const homeQuickTodoInput = document.getElementById("homeQuickTodoInput");
const homeQuickTodoStatus = document.getElementById("homeQuickTodoStatus");

const walletForm = document.getElementById("walletForm");
const walletAmount = document.getElementById("walletAmount");
const walletCategory = document.getElementById("walletCategory");
const walletNote = document.getElementById("walletNote");
const walletStatus = document.getElementById("walletStatus");
const walletTypeButtons = Array.from(document.querySelectorAll(".wallet-type"));
const walletBudgetButton = document.getElementById("walletBudgetButton");
const walletBudgetInput = document.getElementById("walletBudgetInput");
const walletMonthLabel = document.getElementById("walletMonthLabel");
const walletSpent = document.getElementById("walletSpent");
const walletRemaining = document.getElementById("walletRemaining");
const walletProgressFill = document.getElementById("walletProgressFill");
const walletProgressLabel = document.getElementById("walletProgressLabel");
const walletProgressTrack = document.getElementById("walletProgressTrack");
const walletCountPill = document.getElementById("walletCountPill");
const walletListMeta = document.getElementById("walletListMeta");
const walletList = document.getElementById("walletList");

const greetingText = document.getElementById("greetingText");
const clockHours = document.getElementById("clockHours");
const clockMinutes = document.getElementById("clockMinutes");
const clockSeconds = document.getElementById("clockSeconds");
const clockDate = document.getElementById("clockDate");

const outfitForm = document.getElementById("outfitForm");
const heightInput = document.getElementById("heightInput");
const weightInput = document.getElementById("weightInput");
const genderField = document.getElementById("genderField");
const genderInputs = Array.from(document.querySelectorAll('input[name="outfitGender"]'));
const outfitStatus = document.getElementById("outfitStatus");
const outfitResult = document.getElementById("outfitResult");
const makeupFaceOptions = document.getElementById("makeupFaceOptions");
const makeupTypeOptions = document.getElementById("makeupTypeOptions");
const makeupSummary = document.getElementById("makeupSummary");
const makeupTutorialLink = document.getElementById("makeupTutorialLink");
const makeupCtaText = document.getElementById("makeupCtaText");
const photoGuide = document.getElementById("photoGuide");
const photoGuideSceneTitle = document.getElementById("photoGuideSceneTitle");
const photoGuideEnvironment = document.getElementById("photoGuideEnvironment");
const photoGuideTimeTitle = document.getElementById("photoGuideTimeTitle");
const photoGuideTimeline = document.getElementById("photoGuideTimeline");
const photoGuideSummary = document.getElementById("photoGuideSummary");
const photoGuideCta = document.getElementById("photoGuideCta");
const photoGuideCustomScenery = document.getElementById("photoGuideCustomScenery");
const photoGuideCustomHint = document.getElementById("photoGuideCustomHint");
const photoGuideTimes = document.getElementById("photoGuideTimes");
const photoGuideLocations = document.getElementById("photoGuideLocations");

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoStatus = document.getElementById("todoStatus");
const todoList = document.getElementById("todoList");
const todoListMeta = document.getElementById("todoListMeta");
const todoCountPill = document.getElementById("todoCountPill");

const memoryGate = document.getElementById("memoryGate");
const memoryUnlockForm = document.getElementById("memoryUnlockForm");
const memoryPassword = document.getElementById("memoryPassword");
const memoryPasswordShell = document.getElementById("memoryPasswordShell");
const memoryGateStatus = document.getElementById("memoryGateStatus");
const memoryContent = document.getElementById("memoryContent");
const memoryForm = document.getElementById("memoryForm");
const memoryFile = document.getElementById("memoryFile");
const memoryFileDrop = document.getElementById("memoryFileDrop");
const memoryPendingPreview = document.getElementById("memoryPendingPreview");
const memoryCaption = document.getElementById("memoryCaption");
const memoryStatus = document.getElementById("memoryStatus");
const memoryList = document.getElementById("memoryList");
const memoryListMeta = document.getElementById("memoryListMeta");
const memoryCountPill = document.getElementById("memoryCountPill");

const navAccount = document.getElementById("navAccount");
const accountGate = document.getElementById("accountGate");
const accountUnlockForm = document.getElementById("accountUnlockForm");
const accountPassword = document.getElementById("accountPassword");
const accountPasswordShell = document.getElementById("accountPasswordShell");
const accountGateStatus = document.getElementById("accountGateStatus");
const accountContent = document.getElementById("accountContent");
const memberForm = document.getElementById("memberForm");
const memberName = document.getElementById("memberName");
const memberAccount = document.getElementById("memberAccount");
const memberPassword = document.getElementById("memberPassword");
const memberStatus = document.getElementById("memberStatus");
const accountList = document.getElementById("accountList");
const accountListMeta = document.getElementById("accountListMeta");
const accountCountPill = document.getElementById("accountCountPill");

const colorSourceFile = document.getElementById("colorSourceFile");
const colorSourceDrop = document.getElementById("colorSourceDrop");
const colorCanvas = document.getElementById("colorCanvas");
const colorSourceEmpty = document.getElementById("colorSourceEmpty");
const colorImageName = document.getElementById("colorImageName");
const colorBrightness = document.getElementById("colorBrightness");
const colorContrast = document.getElementById("colorContrast");
const colorSaturation = document.getElementById("colorSaturation");
const colorBlur = document.getElementById("colorBlur");
const colorTemperature = document.getElementById("colorTemperature");
const colorBrightnessValue = document.getElementById("colorBrightnessValue");
const colorContrastValue = document.getElementById("colorContrastValue");
const colorSaturationValue = document.getElementById("colorSaturationValue");
const colorBlurValue = document.getElementById("colorBlurValue");
const colorTemperatureValue = document.getElementById("colorTemperatureValue");
const colorFilters = document.getElementById("colorFilters");
const colorFilterButtons = Array.from(document.querySelectorAll(".color-filter-card"));
const colorFilterCurrent = document.getElementById("colorFilterCurrent");
const colorFilterStrengthInput = document.getElementById("colorFilterStrength");
const colorFilterStrengthValue = document.getElementById("colorFilterStrengthValue");
const colorFilterScrollIndicator = document.getElementById("colorFilterScrollIndicator");
const colorDepthToggle = document.getElementById("colorDepthToggle");
const colorDepthBlurInput = document.getElementById("colorDepthBlur");
const colorDepthBlurValue = document.getElementById("colorDepthBlurValue");
const colorDepthStatus = document.getElementById("colorDepthStatus");
const colorDepthLoading = document.getElementById("colorDepthLoading");
const colorDepthMessage = document.getElementById("colorDepthMessage");
const colorPolaroid = document.getElementById("colorPolaroid");
const colorPolaroidPanel = document.getElementById("colorPolaroidPanel");
const colorPolaroidText = document.getElementById("colorPolaroidText");
const colorPolaroidStyleButtons = Array.from(document.querySelectorAll(".color-polaroid-style"));
const colorPolaroidStyles = document.getElementById("colorPolaroidStyles");
const colorPolaroidColorButtons = Array.from(document.querySelectorAll(".color-polaroid-color"));
const colorPolaroidSubtextField = document.getElementById("colorPolaroidSubtextField");
const colorPolaroidSubtext = document.getElementById("colorPolaroidSubtext");
const colorPolaroidLayoutButtons = Array.from(document.querySelectorAll(".color-polaroid-layout"));
const colorPolaroidLetterSpacing = document.getElementById("colorPolaroidLetterSpacing");
const colorPolaroidLetterSpacingValue = document.getElementById("colorPolaroidLetterSpacingValue");
const colorPolaroidTilt = document.getElementById("colorPolaroidTilt");
const colorPolaroidTiltValue = document.getElementById("colorPolaroidTiltValue");
const colorPolaroidGlow = document.getElementById("colorPolaroidGlow");
const colorPolaroidGlowControls = document.getElementById("colorPolaroidGlowControls");
const colorPolaroidGlowBlur = document.getElementById("colorPolaroidGlowBlur");
const colorPolaroidGlowValue = document.getElementById("colorPolaroidGlowValue");
const colorPolaroidGlowColorButtons = Array.from(document.querySelectorAll(".color-polaroid-glow-color"));
const colorPolaroidFontSize = document.getElementById("colorPolaroidFontSize");
const colorPolaroidSizeValue = document.getElementById("colorPolaroidSizeValue");
const colorConsoleHint = document.getElementById("colorConsoleHint");
const colorSaveButton = document.getElementById("colorSaveButton");
const colorCopyButton = document.getElementById("colorCopyButton");
const colorCopyButtonText = document.getElementById("colorCopyButtonText");
const colorCopyToast = document.getElementById("colorCopyToast");
const colorStatus = document.getElementById("colorStatus");
const colorSourceClear = document.getElementById("colorSourceClear");
const colorCompareHint = document.getElementById("colorCompareHint");
const colorResetButton = document.getElementById("colorResetButton");
const colorCaptionInput = document.getElementById("colorCaptionInput");
const colorCaptionColor = document.getElementById("colorCaptionColor");
const colorStickerButtons = Array.from(document.querySelectorAll(".color-sticker-button"));
const colorStickerDelete = document.getElementById("colorStickerDelete");
const colorCompareButton = document.getElementById("colorCompareButton");
const colorAspectButtons = Array.from(document.querySelectorAll(".color-aspect-button"));
const colorWatermarkInput = document.getElementById("colorWatermarkInput");
const colorWatermarkSize = document.getElementById("colorWatermarkSize");
const colorWatermarkSizeValue = document.getElementById("colorWatermarkSizeValue");
const colorWatermarkColorButtons = Array.from(document.querySelectorAll(".color-signature-color"));
const colorWatermarkEmojiButtons = Array.from(document.querySelectorAll(".color-signature-emoji"));
const colorWatermarkStyleButtons = Array.from(document.querySelectorAll(".color-signature-style"));

const friendInputs = [friendName, friendBirthday, friendPersonality];
let friendStatusTimer = null;
let todoStatusTimer = null;
let memoryStatusTimer = null;
let colorStatusTimer = null;
let memberStatusTimer = null;
let quickTodoStatusTimer = null;
let walletStatusTimer = null;
let friends = loadFriends();
let todos = loadTodos();
let memories = loadMemories();
let members = loadMembers();
let expenses = loadExpenses();
let inspirationIndex = Math.floor(Math.random() * INSPIRATION_QUOTES.length);
let walletBudget = loadWalletBudget();
let walletEntryType = "expense";
let isLoggingIn = false;
let memoryUnlocked = false;
let accountUnlocked = false;
let isSuperAdmin = false;
let currentMemberName = "";
let pendingMemoryFile = null;
let selectedFaceShape = "";
let selectedMakeupType = "";
let currentGender = "";
let selectedPhotoTime = "";
let selectedPhotoLocation = "";
let colorSourceImage = null;
let activeColorFilter = "";
let colorFilterStrength = 100;
let colorFilterRenderFrame = null;
let colorFilterIndicatorFrame = null;
let colorDepthEnabled = false;
let colorDepthBlur = 10;
let colorDepthSegmenter = null;
let colorDepthSegmenterPromise = null;
let colorDepthMaskCanvas = null;
let colorDepthMaskSource = null;
let colorDepthMaskVersion = 0;
let colorDepthPersonCache = { key: "", canvas: null };
let colorDepthLoadToken = 0;
let colorDepthBusy = false;
let colorDepthRenderFrame = null;
let isComparingColorOriginal = false;
let activeStickers = [];
let isDraggingSticker = false;
let stickerDragOffset = { x: 0, y: 0 };
let stickerRenderFrame = null;
let colorCompareCanvas = null;
let selectedColorAspect = "original";
let watermarkColor = "white";
let selectedWatermarkEmoji = "";
let watermarkStyle = "bold";
let watermarkFontSize = 24;
let textPosition = { x: 0, y: 0 };
let isDraggingWatermark = false;
let watermarkDragOffset = { x: 0, y: 0 };
let watermarkRenderFrame = null;
let colorCopyToastTimer = null;
let colorCopyButtonTimer = null;
let polaroidCaptionText = "AURORA MOMENT";
let polaroidCaptionSubtext = "A MOMENT TO REMEMBER";
let polaroidCaptionLayout = "single";
let polaroidCaptionStyle = "minimal";
let polaroidCaptionColor = "#1A1A1A";
let polaroidCaptionFontSize = 24;
let polaroidCaptionLetterSpacing = 2;
let polaroidCaptionTilt = 0;
let polaroidGlowEnabled = false;
let polaroidGlowBlur = 15;
let polaroidGlowColor = "#FFFFFF";
let polaroidRenderFrame = null;

function createId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `friend-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeFriend(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const name = typeof value.name === "string" ? value.name.trim() : "";
  if (!name) {
    return null;
  }

  return {
    id: typeof value.id === "string" && value.id ? value.id : createId(),
    name: name.slice(0, 40),
    birthday: typeof value.birthday === "string" ? value.birthday : "",
    personality:
      typeof value.personality === "string" ? value.personality.trim().slice(0, 60) : "",
  };
}

function loadFriends() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeFriend).filter(Boolean);
  } catch {
    return [];
  }
}

function saveFriends() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(friends));
    return true;
  } catch {
    return false;
  }
}

function createTodoId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `todo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeTodo(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const text = typeof value.text === "string" ? value.text.trim() : "";
  if (!text) {
    return null;
  }

  return {
    id: typeof value.id === "string" && value.id ? value.id : createTodoId(),
    text: text.slice(0, 120),
    completed: value.completed === true,
  };
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(TODO_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeTodo).filter(Boolean);
  } catch {
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
}

function createMemoryId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `memory-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeMemory(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const text =
    typeof value.text === "string"
      ? value.text.trim().slice(0, 160)
      : typeof value.caption === "string"
        ? value.caption.trim().slice(0, 160)
        : "";
  const timestamp =
    typeof value.timestamp === "string" && value.timestamp
      ? value.timestamp
      : typeof value.createdAt === "string" && value.createdAt
        ? value.createdAt
        : "";

  if (!text && !timestamp) {
    return null;
  }

  return {
    id: createMemoryId(),
    url: "",
    text,
    type: "lost",
    fileName: "",
    timestamp: timestamp || new Date().toISOString(),
  };
}

function loadMemories() {
  try {
    const raw = localStorage.getItem(MEMORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeMemory).filter(Boolean);
  } catch {
    return [];
  }
}

function saveMemories() {
  try {
    // localStorage 只保存文字与时间戳，文件本身和 blob URL 永不落盘。
    const metadata = memories.map(({ text, timestamp }) => ({ text, timestamp }));
    localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(metadata));
    return true;
  } catch {
    return false;
  }
}

function loadMembers() {
  try {
    const raw = localStorage.getItem(MEMBERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const seen = new Set();
    return parsed.reduce((list, item) => {
      if (!item || typeof item !== "object") {
        return list;
      }

      const name = typeof item.name === "string" ? item.name.trim() : "";
      const account = typeof item.account === "string" ? item.account.trim() : "";
      const password = typeof item.password === "string" ? item.password : "";

      if (!name || !account || !password || account === DEMO_ACCOUNT || seen.has(account)) {
        return list;
      }

      seen.add(account);
      list.push({ name, account, password });
      return list;
    }, []);
  } catch {
    return [];
  }
}

function saveMembers(nextMembers = members) {
  try {
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(nextMembers));
    return true;
  } catch {
    return false;
  }
}

function checkStorage() {
  try {
    const testKey = "__aurora_storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function formatBirthday(value) {
  if (!value) {
    return "未填写";
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function isValidBirthday(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
}

function setFriendStatus(message, isError = false) {
  window.clearTimeout(friendStatusTimer);
  friendStatus.textContent = message;
  friendStatus.classList.toggle("is-error", isError);

  if (!isError && message) {
    friendStatusTimer = window.setTimeout(() => {
      friendStatus.textContent = "";
    }, 2800);
  }
}

function createEmptyState() {
  const empty = document.createElement("div");
  empty.className = "friend-empty";
  empty.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.2" r="3" stroke="currentColor" stroke-width="1.4"/>
      <path d="M3.5 19c.6-3.3 2.8-5.3 5.5-5.3s4.9 2 5.5 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M16.5 7v6M13.5 10h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
    <strong>还没有朋友记录</strong>
    <span>填写上方表单，添加第一位朋友。</span>
  `;
  return empty;
}

function createFriendCard(friend) {
  const card = document.createElement("article");
  card.className = "friend-card";

  const avatar = document.createElement("div");
  avatar.className = "friend-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = Array.from(friend.name)[0] || "?";

  const info = document.createElement("div");
  info.className = "friend-info";

  const name = document.createElement("div");
  name.className = "friend-name";
  name.textContent = friend.name;

  const personality = document.createElement("div");
  personality.className = "friend-personality";
  personality.textContent = friend.personality || "未填写性格";

  info.append(name, personality);

  const birthday = document.createElement("div");
  birthday.className = "friend-birthday";

  const birthdayLabel = document.createElement("span");
  birthdayLabel.textContent = "生日";

  const birthdayValue = document.createElement("time");
  birthdayValue.dateTime = friend.birthday;
  birthdayValue.textContent = formatBirthday(friend.birthday);

  birthday.append(birthdayLabel, birthdayValue);
  card.append(avatar, info, birthday);

  return card;
}

function renderFriends() {
  const count = friends.length;
  const countText = `${count} 位朋友`;

  navFriendCount.textContent = String(count);
  friendCountPill.textContent = `${count} 位`;
  friendListMeta.textContent = countText;
  updateHomeStats();
  friendList.replaceChildren();

  if (count === 0) {
    friendList.append(createEmptyState());
    return;
  }

  const fragment = document.createDocumentFragment();
  friends.forEach((friend) => {
    fragment.append(createFriendCard(friend));
  });
  friendList.append(fragment);
}

function setTodoStatus(message, isError = false) {
  window.clearTimeout(todoStatusTimer);
  todoStatus.textContent = message;
  todoStatus.classList.toggle("is-error", isError);

  if (!isError && message) {
    todoStatusTimer = window.setTimeout(() => {
      todoStatus.textContent = "";
    }, 2600);
  }
}

function updateTodoCounts() {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  todoCountPill.textContent = `${pending} 待办`;
  todoListMeta.textContent = total === 0 ? "0 项任务" : `${completed} / ${total} 已完成`;
}

function createTodoEmptyState() {
  const empty = document.createElement("div");
  empty.className = "todo-empty";
  empty.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4.5" width="16" height="15" rx="3" stroke="currentColor" stroke-width="1.4"/>
      <path d="m7.8 11.8 1.7 1.7 3.2-3.4M7.8 16h4.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <strong>暂无待办任务</strong>
    <span>在上方添加一条新的任务。</span>
  `;
  return empty;
}

function createTodoItem(todo) {
  const item = document.createElement("div");
  item.className = "todo-item";
  item.dataset.id = todo.id;
  item.classList.toggle("is-completed", todo.completed);

  const main = document.createElement("label");
  main.className = "todo-main";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = todo.completed;

  const checkmark = document.createElement("span");
  checkmark.className = "todo-checkmark";
  checkmark.setAttribute("aria-hidden", "true");
  checkmark.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="m5.5 12.2 4.1 4.1L18.5 7.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const text = document.createElement("span");
  text.className = "todo-text";
  text.textContent = todo.text;

  main.append(checkbox, checkmark, text);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "todo-delete";
  deleteButton.setAttribute("aria-label", `删除任务：${todo.text}`);
  deleteButton.title = "删除任务";
  deleteButton.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 7h15M9 7V5.4A1.4 1.4 0 0 1 10.4 4h3.2A1.4 1.4 0 0 1 15 5.4V7M7 7l.8 12.1a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7M10 11v5M14 11v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    deleteTodo(todo.id);
  });

  item.append(main, deleteButton);
  return item;
}

function deleteTodo(todoId) {
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index === -1) {
    return;
  }

  const [removedTodo] = todos.splice(index, 1);

  if (!saveTodos()) {
    todos.splice(index, 0, removedTodo);
    setTodoStatus("删除失败：当前浏览器无法使用本地存储。", true);
    return;
  }

  renderTodos();
  setTodoStatus("任务已删除。");
}

function renderTodos() {
  updateTodoCounts();
  todoList.replaceChildren();
  renderHomeQuickTodos();
  updateHomeStats();

  if (todos.length === 0) {
    todoList.append(createTodoEmptyState());
    return;
  }

  const fragment = document.createDocumentFragment();
  todos.forEach((todo) => {
    fragment.append(createTodoItem(todo));
  });
  todoList.append(fragment);
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDateKey(value) {
  if (typeof value !== "string") {
    return null;
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (
    date.getFullYear() !== Number(match[1]) ||
    date.getMonth() !== Number(match[2]) - 1 ||
    date.getDate() !== Number(match[3])
  ) {
    return null;
  }
  return date;
}

function formatHomeDate(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
  }).format(date);
}

function updateHomeStats() {
  if (!homeFriendCount || !homeTodoTotal || !homeTodoCompleted) {
    return;
  }

  homeFriendCount.textContent = String(friends.length);
  homeTodoTotal.textContent = String(todos.length);
  homeTodoCompleted.textContent = String(todos.filter((todo) => todo.completed).length);
}

/* Removed romantic, mood, countdown, and cycle modules.
function loadHomeMood() {
  try {
    const raw = localStorage.getItem(MOOD_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.emoji !== "string" || parsed.date !== getLocalDateKey()) {
      return null;
    }
    return { emoji: parsed.emoji, date: parsed.date };
  } catch {
    return null;
  }
}

function saveHomeMood() {
  try {
    localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(homeMood));
    return true;
  } catch {
    return false;
  }
}

const HOME_MOOD_CAPTIONS = {
  "🥰": "今天被爱意包围。",
  "😊": "今天心情很好，适合贴贴。",
  "😌": "今天很安心，因为你在。",
  "😡": "今天有点生气，需要哄哄。",
  "😫": "今天有点累，想要抱抱。",
  "😭": "今天有点委屈，想被你看见。",
  "😴": "今天困困的，晚安要早点说。",
  "🥺": "今天很想你，比昨天多一点。",
};

function renderHomeMood() {
  const today = getLocalDateKey();
  const currentMood = homeMood && homeMood.date === today ? homeMood : null;

  homeMoodButtons.forEach((button) => {
    const isActive = Boolean(currentMood && button.dataset.mood === currentMood.emoji);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  homeMoodDate.textContent = formatHomeDate(new Date());
  homeMoodCaption.textContent = currentMood
    ? HOME_MOOD_CAPTIONS[currentMood.emoji] || "今天的心情已记录。"
    : "今天的心情，交给女王大人。";
}

function setHomeMood(emoji) {
  homeMood = { emoji, date: getLocalDateKey() };
  const saved = saveHomeMood();
  renderHomeMood();
  if (!saved) {
    homeMoodCaption.textContent = "已选中，但本地保存失败。";
  }
}

function getUpcomingWeekendDate() {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = (6 - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}

function loadCountdownTarget() {
  try {
    const raw = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
    if (!raw) {
      return "";
    }
    const parsed = JSON.parse(raw);
    const value = typeof parsed === "string" ? parsed : parsed && parsed.date;
    return parseLocalDateKey(value) ? value : "";
  } catch {
    return "";
  }
}

function saveCountdownTarget(value) {
  try {
    localStorage.setItem(COUNTDOWN_STORAGE_KEY, JSON.stringify({ date: value }));
    return true;
  } catch {
    return false;
  }
}

function updateHomeCountdown() {
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isCustom = Boolean(countdownTargetDate);
  let targetDate = isCustom ? parseLocalDateKey(countdownTargetDate) : getUpcomingWeekendDate();

  if (!targetDate) {
    countdownTargetDate = "";
    targetDate = getUpcomingWeekendDate();
  }

  const todayUtc = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  const targetUtc = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const rawDays = Math.round((targetUtc - todayUtc) / 86400000);
  const days = Math.max(0, rawDays);

  countdownDays.textContent = String(days);
  if (rawDays < 0) {
    countdownLabel.textContent = "见面日已经过去啦";
  } else if (days === 0) {
    countdownLabel.textContent = "今天就是见面日";
  } else {
    countdownLabel.textContent = "距离下一次见面还有";
  }

  countdownTarget.textContent = `${isCustom ? "见面日" : "本周六"} · ${formatHomeDate(targetDate)}`;
  countdownDate.value = getLocalDateKey(targetDate);
  countdownDate.min = getLocalDateKey(todayDate);
}

function loadLoveStartDate() {
  try {
    const value = localStorage.getItem(LOVE_START_STORAGE_KEY);
    return parseLocalDateKey(value) ? value : "";
  } catch {
    return "";
  }
}

function saveLoveStartDate(value) {
  try {
    localStorage.setItem(LOVE_START_STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

function updateLoveTimer() {
  if (!loveDaysValue) {
    return;
  }

  const today = new Date();
  const todayKey = getLocalDateKey(today);
  loveStartDateInput.max = todayKey;

  if (!loveStartDate) {
    loveTimerLabel.hidden = true;
    loveTimerValue.hidden = true;
    loveTimerWaiting.hidden = false;
    loveStartPick.hidden = false;
    loveStartReset.hidden = true;
    loveTimerNote.textContent = "等待我的女主角登场";
    return;
  }

  loveTimerLabel.hidden = false;
  loveTimerValue.hidden = false;
  loveTimerWaiting.hidden = true;
  loveStartPick.hidden = true;
  loveStartReset.hidden = false;

  const startKey = loveStartDate;
  const startDate = parseLocalDateKey(startKey) || new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const diff = Math.max(0, today.getTime() - start.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  loveDaysValue.textContent = String(days);
  loveHoursValue.textContent = String(hours).padStart(2, "0");
  loveMinutesValue.textContent = String(minutes).padStart(2, "0");
  loveSecondsValue.textContent = String(seconds).padStart(2, "0");
  if (loveStartDateInput.value !== startKey) {
    loveStartDateInput.value = startKey;
  }
  loveTimerNote.textContent = "我们的故事，从这天开始";
}

function renderLoveQuote() {
  if (!loveQuoteText || !LOVE_QUOTES.length) {
    return;
  }

  const index = ((loveQuoteIndex % LOVE_QUOTES.length) + LOVE_QUOTES.length) % LOVE_QUOTES.length;
  loveQuoteIndex = index;
  loveQuoteText.textContent = LOVE_QUOTES[index];
  loveQuoteMeta.textContent = `FOR MY LOVE · ${String(index + 1).padStart(2, "0")} / ${String(
    LOVE_QUOTES.length,
  ).padStart(2, "0")}`;
}

function nextLoveQuote() {
  if (LOVE_QUOTES.length < 2) {
    renderLoveQuote();
    return;
  }

  let next = loveQuoteIndex;
  while (next === loveQuoteIndex) {
    next = Math.floor(Math.random() * LOVE_QUOTES.length);
  }
  loveQuoteIndex = next;
  renderLoveQuote();
}

function loadMoonLastPeriod() {
  try {
    const value = localStorage.getItem(MOON_LAST_PERIOD_KEY);
    if (!parseLocalDateKey(value)) {
      return "";
    }
    return value > getLocalDateKey() ? "" : value;
  } catch {
    return "";
  }
}

function saveMoonLastPeriod(value) {
  try {
    localStorage.setItem(MOON_LAST_PERIOD_KEY, value);
    return true;
  } catch {
    return false;
  }
}

function loadMoonCycleLength() {
  try {
    const raw = localStorage.getItem(MOON_CYCLE_KEY);
    if (!raw) {
      return 28;
    }
    const value = Number(raw);
    return Number.isFinite(value) ? Math.min(45, Math.max(20, Math.round(value))) : 28;
  } catch {
    return 28;
  }
}

function saveMoonCycleLength(value) {
  try {
    localStorage.setItem(MOON_CYCLE_KEY, String(value));
    return true;
  } catch {
    return false;
  }
}

function loadMoonSymptoms() {
  try {
    const raw = localStorage.getItem(MOON_SYMPTOMS_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([, values]) => Array.isArray(values))
        .map(([key, values]) => [key, values.filter((value) => typeof value === "string")]),
    );
  } catch {
    return {};
  }
}

function saveMoonSymptoms() {
  try {
    localStorage.setItem(MOON_SYMPTOMS_KEY, JSON.stringify(moonSymptoms));
    return true;
  } catch {
    return false;
  }
}

function renderMoonHistory() {
  if (!moonHistory) {
    return;
  }

  const today = new Date();
  const fragment = document.createDocumentFragment();
  let hasAnyRecord = false;

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
    const key = getLocalDateKey(date);
    const symptoms = moonSymptoms[key] || [];
    const hasRecord = symptoms.length > 0;
    if (hasRecord) {
      hasAnyRecord = true;
    }

    const day = document.createElement("div");
    day.className = "moon-history-day";
    day.classList.toggle("is-today", offset === 0);
    day.classList.toggle("has-record", hasRecord);

    const dateLabel = document.createElement("span");
    dateLabel.className = "moon-history-date";
    dateLabel.textContent = offset === 0 ? "今天" : `${date.getMonth() + 1}.${date.getDate()}`;

    const emoji = document.createElement("span");
    emoji.className = "moon-history-emoji";
    emoji.textContent = hasRecord ? symptoms.join("") : "·";

    day.append(dateLabel, emoji);
    fragment.append(day);
  }

  moonHistory.replaceChildren(fragment);
  moonHistoryHint.hidden = hasAnyRecord;
}

function updateMoonView() {
  if (!moonLastPeriodInput || !moonStatusCard) {
    return;
  }

  const today = new Date();
  const todayKey = getLocalDateKey(today);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  moonLastPeriodInput.max = todayKey;
  moonLastPeriodInput.value = moonLastPeriod || "";
  moonCycleInput.value = String(moonCycleLength);
  moonTodayLabel.textContent = formatHomeDate(today);
  moonCheckinDate.textContent = formatHomeDate(today);

  const lastDate = parseLocalDateKey(moonLastPeriod);
  if (!lastDate) {
    moonPhasePill.textContent = "等待记录";
    moonPhaseLabel.textContent = "等待记录";
    moonStatusCard.classList.remove("is-period");
    moonStatusMessage.textContent = "记录上一次月经开始的日期，小月亮就会开始工作啦。";
    moonDaysUntil.textContent = "--";
    moonNextPeriod.textContent = "等待记录";
    moonOvulation.textContent = "等待记录";
    moonCareTips.innerHTML = "<p>记录之后，我会更懂怎么照顾你。</p>";
  } else {
    const lastStart = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    const cycle = moonCycleLength;
    const daysSince = Math.round((todayStart.getTime() - lastStart.getTime()) / 86400000);
    const isPeriod = daysSince >= 0 && daysSince <= 5;

    const next = new Date(lastStart);
    do {
      next.setDate(next.getDate() + cycle);
    } while (next < todayStart);

    const daysUntil = Math.max(0, Math.round((next.getTime() - todayStart.getTime()) / 86400000));
    const ovulation = new Date(next);
    ovulation.setDate(ovulation.getDate() - 14);
    const ovulationStart = new Date(ovulation);
    ovulationStart.setDate(ovulationStart.getDate() - 2);
    const ovulationEnd = new Date(ovulation);
    ovulationEnd.setDate(ovulationEnd.getDate() + 2);

    let phase = "luteal";
    if (isPeriod) {
      phase = "period";
    } else if (todayStart >= ovulationStart && todayStart <= ovulationEnd) {
      phase = "ovulation";
    } else if (todayStart < ovulationStart) {
      phase = "follicular";
    }

    const phaseLabel = {
      period: "经期",
      follicular: "卵泡期",
      ovulation: "排卵期",
      luteal: "黄体期",
    }[phase];

    moonPhasePill.textContent = phaseLabel;
    moonPhaseLabel.textContent = phaseLabel;
    moonStatusCard.classList.toggle("is-period", isPeriod);
    moonStatusMessage.textContent = isPeriod
      ? "正处于生理期，要好好照顾自己哦"
      : daysUntil === 0
        ? "预计今天会来生理期，记得准备好暖宝宝和红糖水。"
        : `距离下一次生理期还有 ${daysUntil} 天，小月亮正在慢慢靠近。`;
    moonDaysUntil.textContent = String(daysUntil);
    moonNextPeriod.textContent = formatHomeDate(next);
    moonOvulation.textContent = `${formatHomeDate(ovulation)} ± 2天`;

    const tips = MOON_CARE_TIPS[phase] || [];
    moonCareTips.replaceChildren();
    tips.forEach((tip) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = tip;
      moonCareTips.append(paragraph);
    });
  }

  const todaySymptoms = moonSymptoms[getLocalDateKey()] || [];
  moonSymptomButtons.forEach((button) => {
    const isActive = todaySymptoms.includes(button.dataset.symptom);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderMoonHistory();
}

function toggleMoonSymptom(symptom) {
  if (!symptom) {
    return;
  }

  const key = getLocalDateKey();
  const nextSymptoms = new Set(moonSymptoms[key] || []);

  if (nextSymptoms.has(symptom)) {
    nextSymptoms.delete(symptom);
  } else {
    if (symptom === "🌸") {
      nextSymptoms.clear();
    } else {
      nextSymptoms.delete("🌸");
    }
    nextSymptoms.add(symptom);
  }

  if (nextSymptoms.size) {
    moonSymptoms[key] = Array.from(nextSymptoms);
  } else {
    delete moonSymptoms[key];
  }

  saveMoonSymptoms();
  updateMoonView();
}

function loadHerProfile() {
  const defaultProfile = {
    birthday: "",
    shoeSize: "",
    favoriteColor: "",
    favoriteFood: "",
    taboo: "",
    lipstick: "",
  };

  try {
    const raw = localStorage.getItem(HER_PROFILE_KEY);
    if (!raw) {
      return defaultProfile;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return defaultProfile;
    }

    return Object.fromEntries(
      Object.keys(defaultProfile).map((key) => [key, typeof parsed[key] === "string" ? parsed[key] : ""]),
    );
  } catch {
    return defaultProfile;
  }
}

function saveHerProfile() {
  try {
    localStorage.setItem(HER_PROFILE_KEY, JSON.stringify(herProfile));
    return true;
  } catch {
    return false;
  }
}

function populateHerProfile() {
  const todayKey = getLocalDateKey();
  herProfileInputs.forEach((input) => {
    const field = input.dataset.herField;
    input.value = herProfile[field] || "";
    if (field === "birthday") {
      input.max = todayKey;
    }
  });
  herProfileStatus.textContent = "自动保存";
}

function handleHerProfileInput(event) {
  const input = event.target.closest("[data-her-field]");
  if (!input) {
    return;
  }

  const field = input.dataset.herField;
  let value = input.value;

  if (field === "birthday" && value) {
    if (!parseLocalDateKey(value) || value > getLocalDateKey()) {
      value = "";
      input.value = "";
    }
  }

  herProfile[field] = value;
  const saved = saveHerProfile();
  herProfileStatus.textContent = saved ? "已自动保存" : "本地保存失败";
  window.clearTimeout(herProfileStatusTimer);
  if (saved) {
    herProfileStatusTimer = window.setTimeout(() => {
      herProfileStatus.textContent = "自动保存";
    }, 1800);
  }
}

function formatCapsuleDate(value) {
  const date = parseLocalDateKey(value);
  if (!date) {
    return value;
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function loadTimeCapsules() {
  try {
    const raw = localStorage.getItem(TIME_CAPSULE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (capsule) =>
          capsule &&
          typeof capsule.content === "string" &&
          parseLocalDateKey(capsule.unlockDate) &&
          parseLocalDateKey(capsule.createdAt),
      )
      .map((capsule) => ({
        id: typeof capsule.id === "string" ? capsule.id : `capsule-${Math.random().toString(36).slice(2, 9)}`,
        content: capsule.content,
        unlockDate: capsule.unlockDate,
        createdAt: capsule.createdAt,
      }));
  } catch {
    return [];
  }
}

function saveTimeCapsules() {
  try {
    localStorage.setItem(TIME_CAPSULE_KEY, JSON.stringify(timeCapsules));
    return true;
  } catch {
    return false;
  }
}

function renderCapsules(animate = false) {
  if (!capsuleList) {
    return;
  }

  const todayKey = getLocalDateKey();
  const sortedCapsules = timeCapsules
    .slice()
    .sort((left, right) => (right.createdAt || "").localeCompare(left.createdAt || ""));

  let unlockedCount = 0;
  capsuleList.replaceChildren();

  const fragment = document.createDocumentFragment();
  sortedCapsules.forEach((capsule) => {
    const isUnlocked = capsule.unlockDate <= todayKey;
    if (isUnlocked) {
      unlockedCount += 1;
    }

    const letter = document.createElement("article");
    letter.className = "capsule-letter";
    letter.classList.toggle("is-open", isUnlocked);
    letter.classList.toggle("is-sealed", !isUnlocked);
    if (isUnlocked && animate) {
      letter.classList.add("is-opening");
    }

    const envelope = document.createElement("span");
    envelope.className = "capsule-envelope";
    const flap = document.createElement("span");
    flap.className = "capsule-flap";
    const seal = document.createElement("span");
    seal.className = "capsule-envelope-seal";
    seal.textContent = isUnlocked ? "💌" : "🔒";
    envelope.append(flap, seal);

    const body = document.createElement("div");
    body.className = "capsule-letter-body";

    const kicker = document.createElement("span");
    kicker.className = "capsule-letter-kicker";
    kicker.textContent = isUnlocked ? "OPENED WITH LOVE" : "SEALED WITH LOVE";

    const title = document.createElement("h4");
    title.textContent = "写给未来的你";

    const meta = document.createElement("p");
    meta.className = "capsule-letter-meta";
    meta.textContent = `封存于 ${formatCapsuleDate(capsule.createdAt)} · 解锁于 ${formatCapsuleDate(capsule.unlockDate)}`;

    body.append(kicker, title, meta);

    if (isUnlocked) {
      const content = document.createElement("p");
      content.className = "capsule-letter-content";
      content.textContent = capsule.content;
      body.append(content);
    } else {
      const locked = document.createElement("p");
      locked.className = "capsule-letter-locked";
      locked.textContent = "时间还没到，这封信还在安静地睡着。";
      body.append(locked);
    }

    letter.append(envelope, body);
    fragment.append(letter);
  });

  capsuleList.append(fragment);
  capsuleCountPill.textContent = `${timeCapsules.length} 封信`;
  capsuleListMeta.textContent = timeCapsules.length
    ? `${unlockedCount} 封已开启 · ${timeCapsules.length - unlockedCount} 封封印中`
    : "等待第一封信";
  capsuleEmpty.hidden = timeCapsules.length > 0;
}

function updateCapsuleView(animate = false) {
  if (capsuleUnlockDate) {
    capsuleUnlockDate.min = getLocalDateKey();
  }
  renderCapsules(animate);
}

function sealTimeCapsule(event) {
  event.preventDefault();

  const content = capsuleContent.value.trim();
  const unlockDate = capsuleUnlockDate.value;
  const todayKey = getLocalDateKey();

  if (!content) {
    capsuleStatus.textContent = "先写一点什么，再把这封信寄给未来吧。";
    capsuleStatus.classList.add("is-error");
    return;
  }

  if (!unlockDate || !parseLocalDateKey(unlockDate)) {
    capsuleStatus.textContent = "选一个解锁日期，未来才会有回信。";
    capsuleStatus.classList.add("is-error");
    return;
  }

  if (unlockDate < todayKey) {
    capsuleStatus.textContent = "解锁日期不能早于今天。";
    capsuleStatus.classList.add("is-error");
    return;
  }

  const capsule = {
    id: `capsule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    content,
    unlockDate,
    createdAt: todayKey,
  };

  timeCapsules.push(capsule);
  if (!saveTimeCapsules()) {
    timeCapsules.pop();
    capsuleStatus.textContent = "本地保存失败，这封信暂时无法封存。";
    capsuleStatus.classList.add("is-error");
    return;
  }

  capsuleContent.value = "";
  capsuleUnlockDate.value = "";
  capsuleStatus.textContent = `这封信已封存，将在 ${formatCapsuleDate(unlockDate)} 解锁。`;
  capsuleStatus.classList.remove("is-error");
  updateCapsuleView(false);
}

*/
function renderInspiration() {
  if (!inspirationText || !INSPIRATION_QUOTES.length) {
    return;
  }

  const index = ((inspirationIndex % INSPIRATION_QUOTES.length) + INSPIRATION_QUOTES.length) % INSPIRATION_QUOTES.length;
  inspirationIndex = index;
  inspirationText.textContent = INSPIRATION_QUOTES[index];
  inspirationMeta.textContent = `NOTE ${String(index + 1).padStart(2, "0")} / ${String(INSPIRATION_QUOTES.length).padStart(2, "0")}`;
}

function nextInspiration() {
  if (INSPIRATION_QUOTES.length < 2) {
    renderInspiration();
    return;
  }

  let next = inspirationIndex;
  while (next === inspirationIndex) {
    next = Math.floor(Math.random() * INSPIRATION_QUOTES.length);
  }
  inspirationIndex = next;
  renderInspiration();
}

function renderHomeQuickTodos() {
  if (!homeQuickTodoList) {
    return;
  }

  const recent = todos.filter((todo) => !todo.completed).slice(0, 3);
  homeQuickTodoList.replaceChildren();

  if (recent.length === 0) {
    const empty = document.createElement("div");
    empty.className = "home-quick-todo-empty";
    const title = document.createElement("strong");
    title.textContent = "今天没有安排";
    const hint = document.createElement("span");
    hint.textContent = "点右上角 +，添加一条待办。";
    empty.append(title, hint);
    homeQuickTodoList.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  recent.forEach((todo) => {
    const item = document.createElement("div");
    item.className = "home-quick-todo-item";
    const dot = document.createElement("span");
    dot.className = "home-quick-todo-dot";
    dot.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.className = "home-quick-todo-text";
    text.textContent = todo.text;
    item.append(dot, text);
    fragment.append(item);
  });
  homeQuickTodoList.append(fragment);
}

function setHomeQuickTodoStatus(message, isError = false) {
  window.clearTimeout(quickTodoStatusTimer);
  homeQuickTodoStatus.textContent = message;
  homeQuickTodoStatus.classList.toggle("is-error", isError);
  if (!isError && message) {
    quickTodoStatusTimer = window.setTimeout(() => {
      homeQuickTodoStatus.textContent = "";
    }, 2600);
  }
}

function toggleHomeQuickTodoForm() {
  const willShow = homeQuickTodoForm.hidden;
  homeQuickTodoForm.hidden = !willShow;
  homeQuickTodoToggle.setAttribute("aria-expanded", String(willShow));
  if (willShow) {
    homeQuickTodoInput.focus();
  } else {
    homeQuickTodoInput.value = "";
  }
}

function createWalletId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `expense-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeWalletEntry(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const amountCents = Math.round(parseFloat(value.amount) * 100);
  if (!Number.isFinite(amountCents) || amountCents <= 0) {
    return null;
  }

  const category =
    typeof value.category === "string" && Object.prototype.hasOwnProperty.call(WALLET_CATEGORIES, value.category)
      ? value.category
      : "其他";
  const note = typeof value.note === "string" ? value.note.slice(0, 60) : "";
  const type = value.type === "income" ? "income" : "expense";
  const date = new Date(value.time);
  const time = Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  const id = typeof value.id === "string" && value.id ? value.id : createWalletId();

  return {
    id,
    amount: amountCents / 100,
    category,
    note,
    time,
    type,
  };
}

function loadExpenses() {
  try {
    const raw = localStorage.getItem(EXPENSES_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeWalletEntry).filter(Boolean);
  } catch {
    return [];
  }
}

function saveExpenses() {
  try {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch {
    return false;
  }
}

function loadWalletBudget() {
  try {
    const raw = localStorage.getItem(WALLET_BUDGET_STORAGE_KEY);
    const value = parseFloat(raw);
    if (!Number.isFinite(value) || value < 0) {
      return WALLET_DEFAULT_BUDGET;
    }
    return Math.round(value * 100) / 100;
  } catch {
    return WALLET_DEFAULT_BUDGET;
  }
}

function saveWalletBudget() {
  try {
    localStorage.setItem(WALLET_BUDGET_STORAGE_KEY, String(walletBudget));
    return true;
  } catch {
    return false;
  }
}

function formatWalletAmount(value) {
  return `¥${Math.abs(Number(value) || 0).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatWalletTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function isCurrentMonth(value, now = new Date()) {
  const date = new Date(value);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

function setWalletStatus(message, isError = false) {
  window.clearTimeout(walletStatusTimer);
  walletStatus.textContent = message;
  walletStatus.classList.toggle("is-error", isError);

  if (!isError && message) {
    walletStatusTimer = window.setTimeout(() => {
      walletStatus.textContent = "";
    }, 2800);
  }
}

function syncWalletTypeButtons() {
  walletTypeButtons.forEach((button) => {
    const isActive = button.dataset.walletType === walletEntryType;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function createWalletEmptyState() {
  const empty = document.createElement("div");
  empty.className = "wallet-empty";
  empty.innerHTML = `
    <svg class="wallet-empty-piggy" viewBox="0 0 120 104" fill="none" aria-hidden="true">
      <ellipse cx="58" cy="92" rx="37" ry="5" fill="rgba(0,122,255,.08)"/>
      <path d="M23 53c0-16 14-29 36-29 21 0 35 10 37 25l7 2v12l-7 1c-2 7-7 12-14 15v8H69v-6c-5 1-10 1-15 0v6H40v-9c-10-5-17-14-17-25Z" fill="#ffffff" stroke="#ffb6c8" stroke-width="3" stroke-linejoin="round"/>
      <path d="M31 37c-4-7-1-12 5-13 4 0 7 3 8 7" fill="#ffe4ea" stroke="#ffb6c8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="72" cy="46" r="2.6" fill="#1d1d1f"/>
      <path d="M84 51c5 0 7 3 7 5s-2 5-7 5" fill="#ffd3dd" stroke="#ffb6c8" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="86.5" cy="54" r="1" fill="#1d1d1f"/>
      <circle cx="86.5" cy="58" r="1" fill="#1d1d1f"/>
      <path d="M45 71c7 3 15 3 22 0" stroke="#ffb6c8" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="92" cy="29" r="8" fill="#fff1b8" stroke="#f0c84b" stroke-width="2.5"/>
      <path d="M92 24.5v9M88.5 27h6.5M88.5 31h6.5" stroke="#e5b93b" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M33 54c2-2 5-3 8-3" stroke="#ffd3dd" stroke-width="2.4" stroke-linecap="round"/>
    </svg>
    <strong>钱包鼓鼓，今天还没花钱哦~</strong>
    <span>记下第一笔，让每一分钱都有迹可循。</span>
  `;
  return empty;
}

function createWalletEntry(entry) {
  const item = document.createElement("article");
  item.className = "wallet-entry";
  item.dataset.id = entry.id;

  const icon = document.createElement("span");
  icon.className = "wallet-entry-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = WALLET_CATEGORIES[entry.category] || WALLET_CATEGORIES["其他"];

  const main = document.createElement("div");
  main.className = "wallet-entry-main";

  const note = document.createElement("strong");
  note.className = "wallet-entry-note";
  note.textContent = entry.note || entry.category;

  const meta = document.createElement("span");
  meta.className = "wallet-entry-meta";
  meta.textContent = `${entry.category} · ${formatWalletTime(entry.time)}`;

  const amount = document.createElement("strong");
  amount.className = `wallet-entry-amount${entry.type === "income" ? " is-income" : ""}`;
  amount.textContent = `${entry.type === "income" ? "+" : "-"}${formatWalletAmount(entry.amount)}`;

  const deleteButton = document.createElement("button");
  deleteButton.className = "wallet-entry-delete";
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `删除账单：${entry.note || entry.category}`);
  deleteButton.title = "删除账单";
  deleteButton.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 7h15M9 7V5.4A1.4 1.4 0 0 1 10.4 4h3.2A1.4 1.4 0 0 1 15 5.4V7M7 7l.8 12.1a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7M10 11v5M14 11v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  main.append(note, meta);
  item.append(icon, main, amount, deleteButton);
  return item;
}

function renderWalletList() {
  const sorted = [...expenses].sort((a, b) => new Date(b.time) - new Date(a.time));
  walletList.replaceChildren();

  if (sorted.length === 0) {
    walletList.append(createWalletEmptyState());
    return;
  }

  const fragment = document.createDocumentFragment();
  sorted.forEach((entry) => {
    fragment.append(createWalletEntry(entry));
  });
  walletList.append(fragment);
}

function renderWallet() {
  const now = new Date();
  const monthEntries = expenses.filter((entry) => isCurrentMonth(entry.time, now));
  const monthExpenses = monthEntries.filter((entry) => entry.type !== "income");
  const monthIncomes = monthEntries.filter((entry) => entry.type === "income");

  const expensesCents = monthExpenses.reduce((sum, entry) => sum + Math.round(entry.amount * 100), 0);
  const incomeCents = monthIncomes.reduce((sum, entry) => sum + Math.round(entry.amount * 100), 0);
  const budgetCents = Math.round(walletBudget * 100);
  const remainingCents = budgetCents - expensesCents + incomeCents;
  const progress = budgetCents > 0 ? Math.min(100, Math.max(0, (expensesCents / budgetCents) * 100)) : 0;

  walletMonthLabel.textContent = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
  }).format(now);
  walletBudgetButton.textContent = formatWalletAmount(walletBudget);
  walletSpent.textContent = formatWalletAmount(expensesCents / 100);
  walletRemaining.textContent = `${remainingCents < 0 ? "-" : ""}${formatWalletAmount(remainingCents / 100)}`;
  walletRemaining.classList.toggle("is-negative", remainingCents < 0);
  walletCountPill.textContent = `本月 ${monthEntries.length} 笔`;
  walletListMeta.textContent = `${expenses.length} 笔账单`;
  walletProgressFill.style.width = `${progress.toFixed(1)}%`;
  walletProgressLabel.textContent = budgetCents > 0 ? `预算使用 ${Math.round(progress)}%` : "尚未设置预算";
  walletProgressTrack.setAttribute("aria-valuenow", String(Math.round(progress)));
  renderWalletList();
}

function openWalletBudgetEditor() {
  if (!walletBudgetInput.hidden) {
    return;
  }

  walletBudgetInput.value = walletBudget.toFixed(2);
  walletBudgetButton.hidden = true;
  walletBudgetInput.hidden = false;
  walletBudgetInput.focus();
  walletBudgetInput.select();
}

function closeWalletBudgetEditor() {
  walletBudgetInput.hidden = true;
  walletBudgetButton.hidden = false;
}

function commitWalletBudget() {
  if (walletBudgetInput.hidden) {
    return;
  }

  const value = parseFloat(walletBudgetInput.value);
  if (Number.isFinite(value) && value >= 0) {
    walletBudget = Math.round(value * 100) / 100;
    saveWalletBudget();
    renderWallet();
  }
  closeWalletBudgetEditor();
}

function deleteWalletEntry(entryId) {
  const index = expenses.findIndex((entry) => entry.id === entryId);
  if (index === -1) {
    return;
  }

  const [removed] = expenses.splice(index, 1);
  if (!saveExpenses()) {
    expenses.splice(index, 0, removed);
    setWalletStatus("删除失败：本地存储不可用。", true);
    return;
  }

  renderWallet();
  setWalletStatus("已删除一笔账单。");
}

const MEMORY_TYPE_LABELS = {
  image: "图片",
  video: "视频",
  audio: "音乐",
  text: "文字",
  lost: "回忆",
};

function formatMemoryDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function setMemoryStatus(message, isError = false) {
  window.clearTimeout(memoryStatusTimer);
  memoryStatus.textContent = message;
  memoryStatus.classList.toggle("is-error", isError);

  if (!isError && message) {
    memoryStatusTimer = window.setTimeout(() => {
      memoryStatus.textContent = "";
    }, 2800);
  }
}

function getMemoryMediaType(file) {
  if (!file) {
    return null;
  }

  const mime = typeof file.type === "string" ? file.type : "";
  if (mime.startsWith("image/")) {
    return "image";
  }
  if (mime.startsWith("video/")) {
    return "video";
  }
  if (mime.startsWith("audio/")) {
    return "audio";
  }

  const extension = typeof file.name === "string" ? file.name.split(".").pop().toLowerCase() : "";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "heic", "avif"].includes(extension)) {
    return "image";
  }
  if (["mp4", "webm", "mov", "m4v", "avi", "mkv", "ogv"].includes(extension)) {
    return "video";
  }
  if (["mp3", "wav", "ogg", "m4a", "aac", "flac"].includes(extension)) {
    return "audio";
  }

  return null;
}

function renderPendingMemoryPreview() {
  memoryPendingPreview.replaceChildren();

  if (!pendingMemoryFile) {
    memoryPendingPreview.hidden = true;
    memoryFileDrop.classList.remove("has-file");
    return;
  }

  memoryPendingPreview.hidden = false;
  memoryFileDrop.classList.add("has-file");

  const head = document.createElement("div");
  head.className = "memory-pending-head";

  const name = document.createElement("span");
  name.className = "memory-pending-name";
  name.textContent = pendingMemoryFile.name;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "memory-pending-remove";
  removeButton.textContent = "移除";
  removeButton.addEventListener("click", () => {
    resetPendingMemoryFile(true);
    setMemoryStatus("已移除待保存的媒体文件。");
  });

  head.append(name, removeButton);

  const media = document.createElement("div");
  media.className = "memory-pending-media";

  if (pendingMemoryFile.type === "image") {
    const image = document.createElement("img");
    image.src = pendingMemoryFile.url;
    image.alt = pendingMemoryFile.name;
    media.append(image);
  } else if (pendingMemoryFile.type === "video") {
    const video = document.createElement("video");
    video.src = pendingMemoryFile.url;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    media.append(video);
  } else if (pendingMemoryFile.type === "audio") {
    const audio = document.createElement("audio");
    audio.src = pendingMemoryFile.url;
    audio.controls = true;
    audio.preload = "metadata";
    media.append(audio);
  }

  memoryPendingPreview.append(head, media);
}

function resetPendingMemoryFile(revokeUrl = true) {
  if (pendingMemoryFile && revokeUrl) {
    URL.revokeObjectURL(pendingMemoryFile.url);
  }

  pendingMemoryFile = null;
  memoryFile.value = "";
  memoryPendingPreview.replaceChildren();
  memoryPendingPreview.hidden = true;
  memoryFileDrop.classList.remove("has-file", "is-invalid", "is-dragover");
}

function acceptMemoryFile(file) {
  const type = getMemoryMediaType(file);
  memoryFileDrop.classList.remove("is-invalid");

  if (!type) {
    memoryFileDrop.classList.add("is-invalid");
    setMemoryStatus("仅支持图片、视频或音乐文件。", true);
    return;
  }

  let url = "";
  try {
    url = URL.createObjectURL(file);
  } catch {
    setMemoryStatus("无法读取媒体文件，请重新选择。", true);
    return;
  }

  if (pendingMemoryFile) {
    URL.revokeObjectURL(pendingMemoryFile.url);
  }

  pendingMemoryFile = {
    file,
    type,
    url,
    name: (file.name || "粘贴的图片").slice(0, 160),
  };

  memoryCaption.classList.remove("is-invalid");
  renderPendingMemoryPreview();
  setMemoryStatus(`已获取文件「${pendingMemoryFile.name}」，点击“保存这段回忆”添加到列表。`);
}

function createMemoryEmptyState() {
  const empty = document.createElement("div");
  empty.className = "memory-empty";
  empty.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" stroke-width="1.4"/>
      <path d="m4.8 17 4.4-4 3 2.7 2.4-2.2 4.6 3.9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <strong>还没有回忆记录</strong>
    <span>添加一张照片、一段视频、一首音乐，或只留下一段文字。</span>
  `;
  return empty;
}

function createMemoryMediaPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "memory-media-missing";
  placeholder.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" stroke-width="1.4"/>
      <path d="m4.8 17 4.4-4 3 2.7 2.4-2.2 4.6 3.9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.8 17.5h4.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
    <strong>媒体文件已失效</strong>
    <span>刷新页面后仅保留文字与时间记录</span>
  `;
  return placeholder;
}

function createMemoryCard(memory) {
  const card = document.createElement("article");
  card.className = "memory-card";
  if (memory.type === "text") {
    card.classList.add("memory-card--text");
  }

  if (memory.type !== "text") {
    const media = document.createElement("div");
    media.className = "memory-card-media";
    const objectUrl = memory.url;

    if (objectUrl && memory.type === "image") {
      const image = document.createElement("img");
      image.src = objectUrl;
      image.alt = memory.text || memory.fileName || "回忆图片";
      image.loading = "lazy";
      media.append(image);
    } else if (objectUrl && memory.type === "video") {
      const video = document.createElement("video");
      video.src = objectUrl;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      media.append(video);
    } else if (objectUrl && memory.type === "audio") {
      const audioWrap = document.createElement("div");
      audioWrap.className = "memory-audio-wrap";
      audioWrap.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 17.3V6.8l8-2v10.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <ellipse cx="6.6" cy="17.4" rx="2.6" ry="2.2" stroke="currentColor" stroke-width="1.5"/>
          <ellipse cx="14.6" cy="15.4" rx="2.6" ry="2.2" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      `;
      const audio = document.createElement("audio");
      audio.src = objectUrl;
      audio.controls = true;
      audio.preload = "metadata";
      audioWrap.append(audio);
      media.append(audioWrap);
    } else {
      media.append(createMemoryMediaPlaceholder());
    }

    card.append(media);
  }

  const body = document.createElement("div");
  body.className = "memory-card-body";

  if (memory.text) {
    const caption = document.createElement("p");
    caption.className = "memory-card-caption";
    caption.textContent = memory.text;
    body.append(caption);
  }

  const meta = document.createElement("div");
  meta.className = "memory-card-meta";

  const typeLabel = document.createElement("span");
  const typeName = MEMORY_TYPE_LABELS[memory.type] || "回忆";
  typeLabel.textContent = memory.fileName
    ? `${typeName} · ${memory.fileName}`
    : typeName;

  const time = document.createElement("time");
  time.dateTime = memory.timestamp;
  time.textContent = formatMemoryDate(memory.timestamp);

  meta.append(typeLabel, time);
  body.append(meta);
  card.append(body);

  return card;
}

function renderMemories() {
  const count = memories.length;
  memoryCountPill.textContent = `${count} 条`;
  memoryListMeta.textContent = `${count} 条回忆`;
  memoryList.replaceChildren();

  if (count === 0) {
    memoryList.append(createMemoryEmptyState());
    return;
  }

  const fragment = document.createDocumentFragment();
  memories.forEach((memory) => {
    fragment.append(createMemoryCard(memory));
  });
  memoryList.append(fragment);
}

function setMemberStatus(message, isError = false) {
  window.clearTimeout(memberStatusTimer);
  memberStatus.textContent = message;
  memberStatus.classList.toggle("is-error", isError);

  if (!isError && message) {
    memberStatusTimer = window.setTimeout(() => {
      memberStatus.textContent = "";
    }, 3200);
  }
}

function renderAccountMembers() {
  const count = members.length;
  accountCountPill.textContent = `${count} 位`;
  accountListMeta.textContent = `${count} 位成员`;
  accountList.replaceChildren();

  if (count === 0) {
    const empty = document.createElement("div");
    empty.className = "account-empty";
    const title = document.createElement("strong");
    title.textContent = "暂无成员";
    const hint = document.createElement("span");
    hint.textContent = "添加成员后，他们可以使用账号密码登录工作台。";
    empty.append(title, hint);
    accountList.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = "account-member";

    const info = document.createElement("div");
    info.className = "account-member-info";

    const name = document.createElement("strong");
    name.className = "account-member-name";
    name.textContent = member.name;

    const account = document.createElement("span");
    account.className = "account-member-account";
    account.textContent = `账号：${member.account}`;

    const password = document.createElement("span");
    password.className = "account-member-account account-member-password";
    password.textContent = `密码：${member.password}`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "account-delete";
    deleteButton.type = "button";
    deleteButton.textContent = "删除";
    deleteButton.setAttribute("aria-label", `删除成员 ${member.name}`);
    deleteButton.addEventListener("click", () => {
      deleteMember(member.account);
    });

    info.append(name, account, password);
    card.append(info, deleteButton);
    fragment.append(card);
  });
  accountList.append(fragment);
}

function deleteMember(account) {
  if (!accountUnlocked) {
    return;
  }

  const target = members.find((member) => member.account === account);
  if (!target) {
    return;
  }

  const nextMembers = members.filter((member) => member.account !== account);
  if (!saveMembers(nextMembers)) {
    setMemberStatus("删除失败，本地存储不可用。", true);
    return;
  }

  members = nextMembers;
  renderAccountMembers();
  setMemberStatus(`已删除成员 ${target.name}。`);
}

function applyRoleVisibility() {
  navAccount.hidden = false;
  homeAppAccount.hidden = false;
  accountUnlocked = false;
  accountGate.hidden = false;
  accountContent.hidden = true;
}

function resetAccountAccess() {
  accountUnlocked = false;
  accountGate.hidden = false;
  accountContent.hidden = true;
  accountPassword.value = "";
  accountGateStatus.textContent = "";
  accountGateStatus.classList.remove("is-error");
  accountPasswordShell.classList.remove("is-invalid");
}

function resetMemoryAccess() {
  memoryUnlocked = false;
  memoryGate.hidden = false;
  memoryContent.hidden = true;
  memoryPassword.value = "";
  memoryPasswordShell.classList.remove("is-invalid");
  memoryPassword.removeAttribute("aria-invalid");
  memoryGateStatus.textContent = "";
}

function switchView(view) {
  if (!panels[view]) {
    return;
  }

  navItems.forEach((item) => {
    const isActive = item.dataset.view === view;
    item.classList.toggle("is-active", isActive);

    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  Object.entries(panels).forEach(([panelName, panel]) => {
    panel.hidden = panelName !== view;
  });

  if (view === "memory" && !memoryUnlocked) {
    memoryGate.hidden = false;
    memoryContent.hidden = true;
  }

  if (view === "account") {
    accountGate.hidden = accountUnlocked;
    accountContent.hidden = !accountUnlocked;

    if (!accountUnlocked) {
      accountGateStatus.textContent = "";
      accountGateStatus.classList.remove("is-error");
      accountPasswordShell.classList.remove("is-invalid");
      accountPassword.value = "";
      window.setTimeout(() => {
        accountPassword.focus({ preventScroll: true });
      }, 0);
    } else {
      renderAccountMembers();
    }
  }

  currentSectionLabel.textContent = viewLabels[view];

  if (contentArea) {
    contentArea.classList.remove("animate-slide-in");
    void contentArea.offsetWidth;
    contentArea.classList.add("animate-slide-in");
  }
}

function getGreeting(hour) {
  if (hour >= 5 && hour < 9) {
    return "早上好";
  }
  if (hour >= 9 && hour < 12) {
    return "上午好";
  }
  if (hour >= 12 && hour < 14) {
    return "中午好";
  }
  if (hour >= 14 && hour < 18) {
    return "下午好";
  }
  if (hour >= 18 && hour < 23) {
    return "晚上好";
  }
  return "夜深了，注意休息";
}

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

  clockHours.textContent = hours;
  clockMinutes.textContent = minutes;
  clockSeconds.textContent = seconds;
  clockDate.textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 · 星期${weekdays[now.getDay()]}`;
  greetingText.textContent = getGreeting(now.getHours());
}

function setPasswordVisibility(isVisible) {
  passwordInput.type = isVisible ? "text" : "password";
  togglePassword.setAttribute("aria-pressed", String(isVisible));
  togglePassword.setAttribute("aria-label", isVisible ? "隐藏密码" : "显示密码");
}

function openErrorDialog() {
  statusAnnouncer.textContent = "登录失败，账号或密码不正确。";

  if (typeof errorDialog.showModal === "function") {
    if (!errorDialog.open) {
      errorDialog.showModal();
    }
    retryButton.focus();
  } else {
    window.alert("账号或密码不正确，请重新输入。");
  }
}

function enterWorkspace() {
  isLoggingIn = false;
  loginSuccess.hidden = true;
  loginSubmitButton.disabled = false;
  loginSubmitButton.removeAttribute("aria-busy");
  loginForm.removeAttribute("aria-busy");
  loginForm.reset();
  setPasswordVisibility(false);
  loginCard.hidden = true;
  document.body.classList.remove("login-page");
  document.body.classList.add("workspace-page");
  appShell.hidden = false;
  applyRoleVisibility();
  renderAccountMembers();
  switchView("home");
  statusAnnouncer.textContent = `登录成功，欢迎 ${currentMemberName || (isSuperAdmin ? "超级管理员" : "成员")}。`;
  window.scrollTo({ top: 0, behavior: "smooth" });
  appShell.focus({ preventScroll: true });
}

// 登录校验：超级管理员或已添加成员
loginSubmitButton.addEventListener("click", () => {
  console.log("登录按钮被点击了！");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("登录表单已提交");

  if (isLoggingIn) {
    return;
  }

  const account = accountInput.value.trim();
  const password = passwordInput.value;
  console.log("输入的账号:", account, "密码:", password);
  const member = members.find(
    (item) => item.account === account && item.password === password,
  );
  const isAdminLogin = account === DEMO_ACCOUNT && password === DEMO_PASSWORD;
  console.log("管理员账号密码是否匹配:", isAdminLogin);

  if (isAdminLogin || member) {
    isSuperAdmin = isAdminLogin;
    currentMemberName = isAdminLogin ? "超级管理员" : member.name;
    accountUnlocked = false;
    memoryUnlocked = false;
    isLoggingIn = true;
    setPasswordVisibility(false);
    loginSuccess.hidden = false;
    loginSubmitButton.disabled = true;
    loginSubmitButton.setAttribute("aria-busy", "true");
    loginForm.setAttribute("aria-busy", "true");
    window.setTimeout(enterWorkspace, 1500);
    return;
  }

  loginSuccess.hidden = true;
  setPasswordVisibility(false);
  passwordInput.value = "";
  openErrorDialog();
});

accountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    passwordInput.focus();
  }
});

togglePassword.addEventListener("click", () => {
  setPasswordVisibility(passwordInput.type === "password");
  passwordInput.focus();
});

closeErrorDialog.addEventListener("click", () => {
  errorDialog.close();
});

retryButton.addEventListener("click", () => {
  errorDialog.close();
});

errorDialog.addEventListener("close", () => {
  passwordInput.value = "";
  if (!loginCard.hidden) {
    passwordInput.focus();
  }
});

// 左侧导航切换
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.dataset.view === "memory") {
      resetMemoryAccess();
    }
    if (item.dataset.view === "account") {
      resetAccountAccess();
    }
    switchView(item.dataset.view);
  });
});

// 账号管理门禁
accountUnlockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (accountPassword.value === ADMIN_ACCESS_PASSWORD) {
    accountUnlocked = true;
    accountGate.hidden = true;
    accountContent.hidden = false;
    accountPassword.value = "";
    accountGateStatus.textContent = "";
    accountGateStatus.classList.remove("is-error");
    accountPasswordShell.classList.remove("is-invalid");
    renderAccountMembers();
    accountContent.focus({ preventScroll: true });
    return;
  }

  accountGateStatus.textContent = "密码错误，请重新输入。";
  accountGateStatus.classList.add("is-error");
  accountPasswordShell.classList.add("is-invalid");
  accountPassword.value = "";
  accountPassword.focus();
});

accountPassword.addEventListener("input", () => {
  accountPasswordShell.classList.remove("is-invalid");
  if (accountGateStatus.classList.contains("is-error")) {
    accountGateStatus.textContent = "";
    accountGateStatus.classList.remove("is-error");
  }
});

// 添加成员
const memberInputs = [memberName, memberAccount, memberPassword];

memberInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("is-invalid");
    if (memberStatus.classList.contains("is-error")) {
      memberStatus.textContent = "";
      memberStatus.classList.remove("is-error");
    }
  });
});

memberForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!accountUnlocked) {
    return;
  }

  const name = memberName.value.trim();
  const account = memberAccount.value.trim();
  const password = memberPassword.value;
  memberInputs.forEach((input) => input.classList.remove("is-invalid"));

  if (!name) {
    memberName.classList.add("is-invalid");
    setMemberStatus("请输入成员姓名。", true);
    memberName.focus();
    return;
  }

  if (!account) {
    memberAccount.classList.add("is-invalid");
    setMemberStatus("请输入成员账号。", true);
    memberAccount.focus();
    return;
  }

  if (!password.trim()) {
    memberPassword.classList.add("is-invalid");
    setMemberStatus("请输入成员密码。", true);
    memberPassword.focus();
    return;
  }

  if (account === DEMO_ACCOUNT) {
    memberAccount.classList.add("is-invalid");
    setMemberStatus("该账号为超级管理员保留账号。", true);
    memberAccount.focus();
    return;
  }

  if (members.some((member) => member.account === account)) {
    memberAccount.classList.add("is-invalid");
    setMemberStatus("该成员账号已存在。", true);
    memberAccount.focus();
    return;
  }

  const nextMembers = [...members, { name, account, password }];
  if (!saveMembers(nextMembers)) {
    setMemberStatus("本地存储失败，请检查浏览器存储权限。", true);
    return;
  }

  members = nextMembers;
  renderAccountMembers();
  memberForm.reset();
  setMemberStatus(`已添加成员 ${name}。`);
  memberName.focus();
});

// 主界面小组件快捷入口
document.querySelectorAll(".home-app[data-widget-target]").forEach((app) => {
  app.addEventListener("click", () => {
    const target = document.getElementById(app.dataset.widgetTarget);
    if (!target || target.hidden) {
      return;
    }

    target.click();
    target.focus({ preventScroll: true });
  });
});

document.querySelectorAll("[data-nav-target]").forEach((card) => {
  card.addEventListener("click", () => {
    const target = document.getElementById(card.dataset.navTarget);
    if (target && !target.hidden) {
      target.click();
      target.focus({ preventScroll: true });
    }
  });
});

inspirationRefresh.addEventListener("click", nextInspiration);

homeQuickTodoToggle.addEventListener("click", toggleHomeQuickTodoForm);

homeQuickTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = homeQuickTodoInput.value.trim();
  if (!text) {
    setHomeQuickTodoStatus("请输入任务内容。", true);
    homeQuickTodoInput.focus();
    return;
  }

  const todo = {
    id: createTodoId(),
    text: text.slice(0, 120),
    completed: false,
  };

  todos.unshift(todo);
  if (!saveTodos()) {
    todos.shift();
    setHomeQuickTodoStatus("保存失败，请检查本地存储。", true);
    return;
  }

  renderTodos();
  homeQuickTodoForm.reset();
  setHomeQuickTodoStatus("已添加任务。");
  homeQuickTodoInput.focus();
});

homeQuickTodoInput.addEventListener("input", () => {
  if (homeQuickTodoStatus.classList.contains("is-error")) {
    setHomeQuickTodoStatus("");
  }
});

walletTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    walletEntryType = button.dataset.walletType === "income" ? "income" : "expense";
    syncWalletTypeButtons();
  });
});

walletForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawAmount = walletAmount.value.trim();
  const amountCents = Math.round(parseFloat(rawAmount) * 100);
  if (!rawAmount || !Number.isFinite(amountCents) || amountCents <= 0) {
    setWalletStatus("请输入大于 0 的金额。", true);
    walletAmount.focus();
    return;
  }

  const category = Object.prototype.hasOwnProperty.call(WALLET_CATEGORIES, walletCategory.value)
    ? walletCategory.value
    : "其他";
  const note = walletNote.value.trim().slice(0, 60);
  const savedType = walletEntryType;
  const entry = {
    id: createWalletId(),
    amount: amountCents / 100,
    category,
    note,
    time: new Date().toISOString(),
    type: savedType,
  };

  expenses.unshift(entry);
  if (!saveExpenses()) {
    expenses.shift();
    setWalletStatus("保存失败：本地存储不可用。", true);
    return;
  }

  renderWallet();
  walletForm.reset();
  walletEntryType = "expense";
  syncWalletTypeButtons();
  setWalletStatus(savedType === "income" ? "已记一笔收入。" : "已记一笔支出。");
  walletAmount.focus();
});

walletAmount.addEventListener("input", () => {
  if (walletStatus.classList.contains("is-error")) {
    setWalletStatus("");
  }
});

walletBudgetButton.addEventListener("click", openWalletBudgetEditor);

walletBudgetInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    commitWalletBudget();
  } else if (event.key === "Escape") {
    closeWalletBudgetEditor();
  }
});

walletBudgetInput.addEventListener("blur", commitWalletBudget);

walletList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".wallet-entry-delete");
  if (!deleteButton) {
    return;
  }

  event.stopPropagation();
  const item = deleteButton.closest(".wallet-entry");
  if (item) {
    deleteWalletEntry(item.dataset.id);
  }
});

let walletPressTimer = null;

walletList.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".wallet-entry-delete")) {
    return;
  }

  const item = event.target.closest(".wallet-entry");
  if (!item) {
    return;
  }

  window.clearTimeout(walletPressTimer);
  walletList.querySelectorAll(".wallet-entry.is-delete-visible").forEach((entry) => {
    entry.classList.remove("is-delete-visible");
  });
  walletPressTimer = window.setTimeout(() => {
    item.classList.add("is-delete-visible");
  }, 520);
});

["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
  walletList.addEventListener(eventName, () => {
    window.clearTimeout(walletPressTimer);
  });
});

walletList.addEventListener("contextmenu", (event) => {
  if (event.target.closest(".wallet-entry")) {
    event.preventDefault();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".wallet-entry")) {
    walletList.querySelectorAll(".wallet-entry.is-delete-visible").forEach((entry) => {
      entry.classList.remove("is-delete-visible");
    });
  }
});

// 添加朋友
friendForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = friendName.value.trim();
  const birthday = friendBirthday.value.trim();
  const personality = friendPersonality.value.trim();
  const missingInputs = [];

  if (!name) {
    missingInputs.push(friendName);
  }
  if (!birthday) {
    missingInputs.push(friendBirthday);
  }
  if (!personality) {
    missingInputs.push(friendPersonality);
  }

  friendInputs.forEach((input) => input.classList.remove("is-invalid"));

  if (missingInputs.length > 0) {
    missingInputs.forEach((input) => input.classList.add("is-invalid"));
    setFriendStatus("请完整填写名字、生日和性格。", true);
    missingInputs[0].focus();
    return;
  }

  if (!isValidBirthday(birthday)) {
    friendBirthday.classList.add("is-invalid");
    setFriendStatus("生日格式不正确，请按 YYYY-MM-DD 格式输入，例如 2000-01-01。", true);
    friendBirthday.focus();
    return;
  }

  const friend = {
    id: createId(),
    name: name.slice(0, 40),
    birthday,
    personality: personality.slice(0, 60),
  };

  friends.unshift(friend);

  if (!saveFriends()) {
    friends.shift();
    setFriendStatus("保存失败：当前浏览器无法使用本地存储。", true);
    return;
  }

  renderFriends();
  friendForm.reset();
  setFriendStatus(`已添加「${friend.name}」，资料已保存到本地。`);
  friendName.focus();
});

friendInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("is-invalid");
    if (friendStatus.classList.contains("is-error")) {
      setFriendStatus("");
    }
  });
});

// 待办任务
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  todoInput.classList.remove("is-invalid");

  if (!text) {
    todoInput.classList.add("is-invalid");
    setTodoStatus("请输入任务内容。", true);
    todoInput.focus();
    return;
  }

  const todo = {
    id: createTodoId(),
    text: text.slice(0, 120),
    completed: false,
  };

  todos.unshift(todo);

  if (!saveTodos()) {
    todos.shift();
    setTodoStatus("保存失败：当前浏览器无法使用本地存储。", true);
    return;
  }

  renderTodos();
  todoForm.reset();
  setTodoStatus("任务已添加，并保存到本地。");
  todoInput.focus();
});

todoInput.addEventListener("input", () => {
  todoInput.classList.remove("is-invalid");
  if (todoStatus.classList.contains("is-error")) {
    setTodoStatus("");
  }
});

todoList.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".todo-checkbox");
  if (!checkbox) {
    return;
  }

  const item = checkbox.closest(".todo-item");
  const todo = todos.find((entry) => entry.id === item.dataset.id);
  if (!todo) {
    return;
  }

  const previousCompleted = todo.completed;
  todo.completed = checkbox.checked;
  item.classList.toggle("is-completed", todo.completed);

  item.classList.remove("is-toggling");
  void item.offsetWidth;
  item.classList.add("is-toggling");
  window.setTimeout(() => {
    item.classList.remove("is-toggling");
  }, 320);

  updateTodoCounts();

  if (!saveTodos()) {
    todo.completed = previousCompleted;
    checkbox.checked = previousCompleted;
    item.classList.toggle("is-completed", previousCompleted);
    updateTodoCounts();
    setTodoStatus("保存失败：任务状态未更新。", true);
    return;
  }

  setTodoStatus(todo.completed ? "任务已完成。" : "任务已恢复为待办。");
});

// 回忆保险箱
memoryUnlockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (memoryPassword.value === MEMORY_PASSWORD) {
    memoryUnlocked = true;
    memoryPassword.value = "";
    memoryPasswordShell.classList.remove("is-invalid");
    memoryPassword.removeAttribute("aria-invalid");
    memoryGateStatus.textContent = "";
    memoryGate.hidden = true;
    memoryContent.hidden = false;
    memoryContent.focus({ preventScroll: true });
    return;
  }

  memoryPassword.value = "";
  memoryPasswordShell.classList.add("is-invalid");
  memoryPassword.setAttribute("aria-invalid", "true");
  memoryGateStatus.textContent = "密码错误";
  memoryPassword.focus();
});

memoryPassword.addEventListener("input", () => {
  if (memoryPasswordShell.classList.contains("is-invalid")) {
    memoryPasswordShell.classList.remove("is-invalid");
    memoryPassword.removeAttribute("aria-invalid");
    memoryGateStatus.textContent = "";
  }
});

memoryFile.addEventListener("change", () => {
  const file = memoryFile.files[0];
  if (file) {
    acceptMemoryFile(file);
  }
});

["dragenter", "dragover"].forEach((eventName) => {
  memoryFileDrop.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
    memoryFileDrop.classList.add("is-dragover");
  });
});

memoryFileDrop.addEventListener("dragleave", (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (!event.relatedTarget || !memoryFileDrop.contains(event.relatedTarget)) {
    memoryFileDrop.classList.remove("is-dragover");
  }
});

memoryFileDrop.addEventListener("drop", (event) => {
  event.preventDefault();
  event.stopPropagation();
  memoryFileDrop.classList.remove("is-dragover");

  const file = event.dataTransfer?.files?.[0];
  if (file) {
    acceptMemoryFile(file);
  }
});

// 防止拖放落点偏离放置区时，浏览器直接打开文件。
["dragover", "drop"].forEach((eventName) => {
  document.addEventListener(eventName, (event) => {
    const hasFiles =
      event.dataTransfer && Array.from(event.dataTransfer.types || []).includes("Files");
    if (!panels.memory.hidden && !memoryContent.hidden && hasFiles) {
      event.preventDefault();
    }
  });
});

document.addEventListener("paste", (event) => {
  if (panels.memory.hidden || memoryContent.hidden) {
    return;
  }

  const clipboard = event.clipboardData;
  if (!clipboard) {
    return;
  }

  let files = Array.from(clipboard.items || [])
    .filter((item) => item.kind === "file")
    .map((item) => item.getAsFile())
    .filter(Boolean);

  if (files.length === 0 && clipboard.files) {
    files = Array.from(clipboard.files);
  }

  const file =
    files.find((item) => getMemoryMediaType(item) === "image") ||
    files.find((item) => getMemoryMediaType(item));
  if (!file) {
    return;
  }

  event.preventDefault();
  acceptMemoryFile(file);
});

memoryCaption.addEventListener("input", () => {
  memoryCaption.classList.remove("is-invalid");
  if (memoryStatus.classList.contains("is-error")) {
    setMemoryStatus("");
  }
});

memoryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = memoryCaption.value.trim();
  memoryFileDrop.classList.remove("is-invalid");
  memoryCaption.classList.remove("is-invalid");

  if (!pendingMemoryFile && !text) {
    memoryFileDrop.classList.add("is-invalid");
    memoryCaption.classList.add("is-invalid");
    setMemoryStatus("请选择媒体文件或填写文字描述。", true);
    memoryCaption.focus();
    return;
  }

  const pending = pendingMemoryFile;
  const memory = {
    id: createMemoryId(),
    url: pending ? pending.url : "",
    text: text.slice(0, 160),
    type: pending ? pending.type : "text",
    fileName: pending ? pending.name : "",
    timestamp: new Date().toISOString(),
  };

  // 先追加到当前会话数组并立即渲染，保证界面立刻反馈。
  memories.unshift(memory);
  renderMemories();
  memoryForm.reset();

  // URL 所有权已转移给 memory，这里清理待上传状态时不能 revoke。
  resetPendingMemoryFile(false);
  memoryCaption.focus();

  const saved = saveMemories();
  setMemoryStatus(
    saved
      ? "回忆已添加。媒体文件仅在本次页面会话中可预览。"
      : "已添加到当前列表，但本地文字记录保存失败。",
    !saved,
  );
});

/* Legacy color lab (disabled after the Color Studio refactor).
// 调色工作台
function isImageFile(file) {
  if (!file) {
    return false;
  }

  if (typeof file.type === "string" && file.type.startsWith("image/")) {
    return true;
  }

  const extension =
    typeof file.name === "string" ? file.name.split(".").pop().toLowerCase() : "";
  return ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "heic", "avif"].includes(extension);
}

const COLOR_STYLE_FILTERS = {
  氛围感: "brightness(106%) saturate(114%) contrast(104%)",
  电影感: "contrast(130%) saturate(110%)",
  胶片: "sepia(40%) contrast(120%) saturate(80%)",
  日系: "brightness(110%) contrast(90%) saturate(80%)",
  港风: "contrast(130%) saturate(130%) sepia(20%)",
  黑白: "grayscale(100%)",
  青橙: "contrast(120%)",
  莫兰迪: "saturate(50%) brightness(90%) contrast(80%)",
};

function setColorStatus(message, isError = false) {
  window.clearTimeout(colorStatusTimer);
  colorStatus.textContent = message;
  colorStatus.classList.toggle("is-error", isError);

  if (!isError && message) {
    colorStatusTimer = window.setTimeout(() => {
      colorStatus.textContent = "";
    }, 3200);
  }
}

function updateColorValueLabels() {
  colorBrightnessValue.textContent = `${colorBrightness.value}%`;
  colorContrastValue.textContent = `${colorContrast.value}%`;
  colorSaturationValue.textContent = `${colorSaturation.value}%`;
}

function syncColorButtons() {
  const hasSource = Boolean(colorSourceImage);
  const hasReference = Boolean(colorReferenceImage);

  colorBrightness.disabled = !hasSource;
  colorContrast.disabled = !hasSource;
  colorSaturation.disabled = !hasSource;
  colorSaveButton.disabled = !hasSource;
  colorMapButton.disabled = !(hasSource && hasReference);
  colorStyleButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
}

function resetColorAdjustments() {
  colorBrightness.value = "100";
  colorContrast.value = "100";
  colorSaturation.value = "100";
  updateColorValueLabels();
}

function renderColorCanvas() {
  if (!colorSourceImage) {
    return;
  }

  const ctx = colorCanvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const baseFilter = `brightness(${colorBrightness.value}%) contrast(${colorContrast.value}%) saturate(${colorSaturation.value}%)`;
  const styleFilter = COLOR_STYLE_FILTERS[activeColorStyle] || "";

  ctx.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
  ctx.save();
  ctx.filter = `${baseFilter} ${styleFilter}`.trim();
  ctx.drawImage(colorSourceImage, 0, 0, colorCanvas.width, colorCanvas.height);
  ctx.restore();

  if (colorMappedTint && activeColorStyle !== "黑白") {
    ctx.save();
    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = `rgba(${colorMappedTint.r}, ${colorMappedTint.g}, ${colorMappedTint.b}, 0.32)`;
    ctx.fillRect(0, 0, colorCanvas.width, colorCanvas.height);
    ctx.restore();
  }

  drawColorStyleOverlay(ctx, activeColorStyle, colorCanvas.width, colorCanvas.height);
}

function drawColorStyleOverlay(ctx, style, width, height) {
  if (!style) {
    return;
  }

  ctx.save();

  if (style === "氛围感") {
    ctx.globalCompositeOperation = "soft-light";
    ctx.fillStyle = "rgba(255, 168, 94, 0.18)";
    ctx.fillRect(0, 0, width, height);
  } else if (style === "电影感") {
    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.2,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.72,
    );
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.42)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  } else if (style === "胶片") {
    ctx.globalCompositeOperation = "soft-light";
    ctx.fillStyle = "rgba(255, 194, 120, 0.1)";
    ctx.fillRect(0, 0, width, height);
  } else if (style === "日系") {
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "rgba(176, 218, 255, 0.1)";
    ctx.fillRect(0, 0, width, height);
  } else if (style === "港风") {
    ctx.globalCompositeOperation = "soft-light";
    ctx.fillStyle = "rgba(255, 118, 128, 0.08)";
    ctx.fillRect(0, 0, width, height);
  } else if (style === "青橙") {
    const splitTone = ctx.createLinearGradient(0, height, width, 0);
    splitTone.addColorStop(0, "rgba(0, 174, 206, 0.3)");
    splitTone.addColorStop(0.5, "rgba(0, 0, 0, 0)");
    splitTone.addColorStop(1, "rgba(255, 132, 44, 0.3)");
    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = splitTone;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

function syncColorStyleButtons() {
  colorStyleButtons.forEach((button) => {
    const isActive = button.dataset.style === activeColorStyle;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  colorStyleCurrent.textContent = activeColorStyle || "原图";
}

function applyColorStyle(style) {
  if (!colorSourceImage) {
    setColorStatus("请先上传原图。", true);
    return;
  }

  activeColorStyle = activeColorStyle === style ? "" : style;
  syncColorStyleButtons();
  renderColorCanvas();
  setColorStatus(
    activeColorStyle ? `已应用「${activeColorStyle}」风格。` : "已恢复原图风格。",
  );
}

function loadColorImage(file, target) {
  if (!isImageFile(file)) {
    setColorStatus("请选择图片文件。", true);
    return;
  }

  const url = URL.createObjectURL(file);
  const image = new Image();

  image.onload = () => {
    if (target === "source") {
      URL.revokeObjectURL(url);
      colorSourceImage = image;
      const maxSide = 1400;
      const scale = Math.min(
        1,
        maxSide / Math.max(image.naturalWidth || 1, image.naturalHeight || 1),
      );
      colorCanvas.width = Math.max(1, Math.round((image.naturalWidth || 1) * scale));
      colorCanvas.height = Math.max(1, Math.round((image.naturalHeight || 1) * scale));
      colorSourceDrop.classList.add("has-image");
      colorSourceEmpty.hidden = true;
      colorSourceClear.hidden = false;
      colorImageName.textContent = file.name || "原图";
      colorMappedTint = null;
      colorMappingInfo.hidden = true;
      activeColorStyle = "";
      resetColorAdjustments();
      syncColorButtons();
      syncColorStyleButtons();
      renderColorCanvas();
      setColorStatus("原图已载入，可以拖动滑块或选择风格滤镜。");
    } else {
      if (colorReferenceUrl) {
        URL.revokeObjectURL(colorReferenceUrl);
      }
      colorReferenceUrl = url;
      colorReferenceImage = image;
      colorReferencePreview.src = url;
      colorReferenceDrop.classList.add("has-image");
      colorReferenceEmpty.hidden = true;
      colorReferenceClear.hidden = false;
      colorMappedTint = null;
      colorMappingInfo.hidden = true;
      syncColorButtons();
      setColorStatus("样板图已载入，点击下方按钮应用氛围映射。");
    }
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    setColorStatus("图片读取失败，请重新选择。", true);
  };

  image.src = url;
}

function getAverageColor(image) {
  const sample = document.createElement("canvas");
  sample.width = 16;
  sample.height = 16;
  const ctx = sample.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return null;
  }

  ctx.drawImage(image, 0, 0, 16, 16);
  const data = ctx.getImageData(0, 0, 16, 16).data;
  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;

  for (let index = 0; index < data.length; index += 4) {
    if (data[index + 3] < 16) {
      continue;
    }
    red += data[index];
    green += data[index + 1];
    blue += data[index + 2];
    count += 1;
  }

  if (!count) {
    return null;
  }

  return {
    r: Math.round(red / count),
    g: Math.round(green / count),
    b: Math.round(blue / count),
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function mapReferenceColor() {
  if (!colorSourceImage) {
    setColorStatus("请先上传原图。", true);
    return;
  }
  if (!colorReferenceImage) {
    setColorStatus("请先上传样板参考图。", true);
    return;
  }

  const tint = getAverageColor(colorReferenceImage);
  if (!tint) {
    setColorStatus("无法读取样板图颜色，请更换图片重试。", true);
    return;
  }

  colorMappedTint = tint;
  const hex = rgbToHex(tint);
  colorSwatch.style.background = `rgb(${tint.r}, ${tint.g}, ${tint.b})`;
  colorTintLabel.textContent = hex;
  colorMappingInfo.hidden = false;
  renderColorCanvas();
  setColorStatus(`已映射样板主色 ${hex}。`);
}

function saveColorImage() {
  if (!colorSourceImage) {
    setColorStatus("请先上传原图。", true);
    return;
  }

  const dataUrl = colorCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `aurora-color-${Date.now()}.png`;
  document.body.append(link);
  link.click();
  link.remove();
  setColorStatus("调色图片已保存。");
}

function clearColorSource() {
  colorSourceImage = null;
  activeColorStyle = "";
  colorMappedTint = null;
  colorCanvas.width = 960;
  colorCanvas.height = 720;
  colorSourceDrop.classList.remove("has-image");
  colorSourceEmpty.hidden = false;
  colorSourceClear.hidden = true;
  colorImageName.textContent = "未加载原图";
  colorMappingInfo.hidden = true;
  colorSwatch.style.background = "";
  colorTintLabel.textContent = "";
  colorBrightness.value = "100";
  colorContrast.value = "100";
  colorSaturation.value = "100";
  updateColorValueLabels();
  colorSourceFile.value = "";
  syncColorButtons();
  syncColorStyleButtons();
  setColorStatus("已清除原图，滤镜与调色参数已重置。");
}

function clearColorReference() {
  if (colorReferenceUrl) {
    URL.revokeObjectURL(colorReferenceUrl);
    colorReferenceUrl = "";
  }
  colorReferenceImage = null;
  colorMappedTint = null;
  colorReferenceDrop.classList.remove("has-image");
  colorReferenceEmpty.hidden = false;
  colorReferencePreview.removeAttribute("src");
  colorReferenceClear.hidden = true;
  colorMappingInfo.hidden = true;
  colorSwatch.style.background = "";
  colorTintLabel.textContent = "";
  colorReferenceFile.value = "";
  syncColorButtons();

  if (colorSourceImage) {
    renderColorCanvas();
  }

  setColorStatus("已清除样板参考图。");
}

function setColorTarget(target) {
  colorLastTarget = target;
  colorSourceDrop.classList.toggle("is-paste-target", target === "source");
  colorReferenceDrop.classList.toggle("is-paste-target", target === "reference");
}

function bindColorDrop(drop, fileInput, target) {
  ["dragenter", "dragover"].forEach((eventName) => {
    drop.addEventListener(eventName, (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
      drop.classList.add("is-dragover");
      setColorTarget(target);
    });
  });

  drop.addEventListener("dragleave", (event) => {
    event.preventDefault();
    if (!event.relatedTarget || !drop.contains(event.relatedTarget)) {
      drop.classList.remove("is-dragover");
    }
  });

  drop.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    drop.classList.remove("is-dragover");
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      loadColorImage(file, target);
    } else {
      setColorStatus("请拖入一张图片。", true);
    }
  });

  drop.addEventListener("pointerenter", () => setColorTarget(target));
  drop.addEventListener("focus", () => setColorTarget(target));
  drop.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInput.click();
    }
  });
}

function getColorClipboardImage(event) {
  const clipboard = event.clipboardData;
  if (!clipboard) {
    return null;
  }

  let files = Array.from(clipboard.items || [])
    .filter((item) => item.kind === "file")
    .map((item) => item.getAsFile())
    .filter(Boolean);

  if (!files.length && clipboard.files) {
    files = Array.from(clipboard.files);
  }

  return files.find(isImageFile) || null;
}

function handleColorPaste(event) {
  if (panels.color.hidden) {
    return;
  }

  const file = getColorClipboardImage(event);
  if (!file) {
    return;
  }

  let target = colorLastTarget;
  const activeElement = document.activeElement;
  if (activeElement && colorSourceDrop.contains(activeElement)) {
    target = "source";
  } else if (activeElement && colorReferenceDrop.contains(activeElement)) {
    target = "reference";
  }

  if (!target) {
    target = !colorSourceImage
      ? "source"
      : !colorReferenceImage
        ? "reference"
        : "source";
  }

  event.preventDefault();
  loadColorImage(file, target);
}

colorSourceFile.addEventListener("change", () => {
  const file = colorSourceFile.files[0];
  if (file) {
    loadColorImage(file, "source");
  }
  colorSourceFile.value = "";
});

colorReferenceFile.addEventListener("change", () => {
  const file = colorReferenceFile.files[0];
  if (file) {
    loadColorImage(file, "reference");
  }
  colorReferenceFile.value = "";
});

[colorBrightness, colorContrast, colorSaturation].forEach((slider) => {
  slider.addEventListener("input", () => {
    updateColorValueLabels();
    renderColorCanvas();
  });
});

colorStyleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyColorStyle(button.dataset.style || "");
  });
});

colorMapButton.addEventListener("click", mapReferenceColor);
colorSaveButton.addEventListener("click", saveColorImage);
colorSourceClear.addEventListener("click", clearColorSource);
colorReferenceClear.addEventListener("click", clearColorReference);
document.addEventListener("paste", handleColorPaste);

bindColorDrop(colorSourceDrop, colorSourceFile, "source");
bindColorDrop(colorReferenceDrop, colorReferenceFile, "reference");

updateColorValueLabels();
syncColorButtons();
syncColorStyleButtons();

Legacy color lab end */

// ===== Color Studio =====
const COLOR_STUDIO_FILTERS = {
  "冷白皮": {
    filter: "brightness(108%) contrast(96%) saturate(88%)",
    tint: "rgba(198, 228, 255, 0.11)",
    blend: "soft-light",
  },
  "奶油肌": {
    filter: "brightness(106%) contrast(94%) saturate(108%)",
    tint: "rgba(255, 219, 186, 0.13)",
    blend: "soft-light",
  },
  "日系清透": {
    filter: "brightness(112%) contrast(90%) saturate(86%)",
    tint: "rgba(176, 228, 242, 0.1)",
    blend: "screen",
  },
  "复古CCD": {
    filter: "sepia(16%) contrast(116%) saturate(92%) brightness(103%)",
    tint: "rgba(243, 183, 132, 0.1)",
    blend: "soft-light",
    vignette: true,
  },
  "法式电影": {
    filter: "contrast(126%) saturate(104%) brightness(98%)",
    tint: "rgba(75, 142, 142, 0.1)",
    blend: "overlay",
    vignette: true,
  },
  "黑白高级": {
    filter: "grayscale(100%) contrast(114%) brightness(102%)",
    tint: "",
    blend: "soft-light",
  },
  "美拉德风": {
    filter: "sepia(50%) saturate(120%) contrast(110%)",
    tint: "rgba(112, 70, 42, 0.17)",
    blend: "soft-light",
    vignette: true,
  },
  "多巴胺": {
    filter: "saturate(180%) contrast(120%) brightness(105%)",
    tint: "rgba(255, 126, 182, 0.06)",
    blend: "screen",
  },
  "富士胶片": {
    filter: "sepia(20%) saturate(90%) contrast(125%) hue-rotate(10deg)",
    tint: "rgba(86, 128, 100, 0.09)",
    blend: "soft-light",
    vignette: true,
  },
  "千禧Y2K": {
    filter: "contrast(150%) brightness(90%) saturate(150%) hue-rotate(20deg)",
    tint: "rgba(74, 196, 255, 0.1)",
    blend: "screen",
  },
  "清冷感": {
    filter: "saturate(70%) brightness(95%) contrast(105%)",
    tint: "rgba(138, 183, 222, 0.13)",
    blend: "soft-light",
  },
  "纯欲粉": {
    filter: "brightness(110%) contrast(90%)",
    tint: "rgba(255, 168, 195, 0.14)",
    blend: "screen",
  },
  "韩系ins风": {
    filter: "brightness(108%) contrast(94%) saturate(88%) sepia(8%)",
    tint: "rgba(255, 236, 220, 0.09)",
    blend: "soft-light",
  },
  "蓝调风": {
    filter: "brightness(95%) contrast(115%) saturate(110%) hue-rotate(15deg)",
    tint: "rgba(90, 150, 220, 0.09)",
    blend: "soft-light",
    vignette: true,
  },
  "忧郁风": {
    filter: "brightness(90%) contrast(85%) saturate(60%)",
    tint: "rgba(100, 120, 135, 0.08)",
    blend: "soft-light",
    vignette: true,
  },
  "赛博朋克": {
    filter: "contrast(140%) saturate(150%) hue-rotate(-15deg)",
    tint: "rgba(190, 80, 220, 0.08)",
    blend: "screen",
  },
  "日系暗调": {
    filter: "brightness(85%) contrast(90%) saturate(75%)",
    tint: "rgba(80, 95, 88, 0.06)",
    blend: "soft-light",
    vignette: true,
  },
};

const COLOR_STUDIO_MAX_SIDE = 1400;

function interpolateColorFilter(filter, strength) {
  if (!filter) {
    return "";
  }

  const ratio = Math.max(0, Math.min(1, strength / 100));
  if (ratio >= 1) {
    return filter;
  }
  if (ratio <= 0) {
    return "";
  }

  return filter.replace(/([a-zA-Z-]+)\(([-\d.]+)(%|deg|px)?\)/g, (match, name, value, unit) => {
    const current = parseFloat(value);
    if (!Number.isFinite(current)) {
      return match;
    }

    const lowerName = name.toLowerCase();
    const identity = ["sepia", "grayscale", "hue-rotate", "blur"].includes(lowerName)
      ? 0
      : 100;
    const mixed = identity + (current - identity) * ratio;
    const rounded = Math.round(mixed * 10) / 10;
    return `${name}(${rounded}${unit || ""})`;
  });
}

function scaleColorTint(tint, strength) {
  if (!tint) {
    return "";
  }

  const ratio = Math.max(0, Math.min(1, strength / 100));
  if (ratio >= 1) {
    return tint;
  }
  if (ratio <= 0) {
    return "";
  }

  const match = tint.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/,
  );
  if (!match) {
    return tint;
  }

  const alpha = Math.max(0, Math.min(1, parseFloat(match[4] || "1") * ratio));
  return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha.toFixed(3)})`;
}

function isImageFile(file) {
  if (!file) {
    return false;
  }

  if (typeof file.type === "string" && file.type.startsWith("image/")) {
    return true;
  }

  const extension =
    typeof file.name === "string" ? file.name.split(".").pop().toLowerCase() : "";
  return ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "heic", "avif"].includes(extension);
}

function setColorStatus(message, isError = false) {
  window.clearTimeout(colorStatusTimer);
  colorStatus.textContent = message;
  colorStatus.classList.toggle("is-error", isError);

  if (!isError && message) {
    colorStatusTimer = window.setTimeout(() => {
      colorStatus.textContent = "";
    }, 3200);
  }
}

function updateColorValueLabels() {
  colorBrightnessValue.textContent = `${colorBrightness.value}%`;
  colorContrastValue.textContent = `${colorContrast.value}%`;
  colorSaturationValue.textContent = `${colorSaturation.value}%`;
  colorBlurValue.textContent = `${Number(colorBlur.value).toFixed(1)}px`;
  const temperature = Number(colorTemperature.value);
  colorTemperatureValue.textContent = temperature > 0 ? `+${temperature}` : `${temperature}`;
}

function syncColorControls() {
  const hasSource = Boolean(colorSourceImage);
  [colorBrightness, colorContrast, colorSaturation, colorBlur, colorTemperature].forEach((input) => {
    input.disabled = !hasSource;
  });
  colorPolaroid.disabled = !hasSource;
  colorPolaroidText.disabled = !hasSource;
  colorPolaroidSubtext.disabled = !hasSource;
  colorPolaroidLayoutButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorPolaroidLetterSpacing.disabled = !hasSource;
  colorPolaroidTilt.disabled = !hasSource;
  colorPolaroidStyleButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorPolaroidColorButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorPolaroidGlow.disabled = !hasSource;
  colorPolaroidGlowBlur.disabled = !hasSource || !polaroidGlowEnabled;
  colorPolaroidGlowColorButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorPolaroidFontSize.disabled = !hasSource;
  updatePolaroidPanel();
  colorSaveButton.disabled = !hasSource;
  colorCopyButton.disabled = !hasSource;
  colorResetButton.disabled = !hasSource;
  colorCaptionInput.disabled = !hasSource;
  colorCaptionColor.disabled = !hasSource;
  colorCompareButton.disabled = !hasSource;
  colorFilterButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorFilterStrengthInput.disabled = !hasSource;
  colorDepthToggle.disabled = !hasSource;
  colorDepthBlurInput.disabled = !hasSource;
  updateColorDepthUI();
  colorStickerButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorAspectButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorWatermarkInput.disabled = !hasSource;
  colorWatermarkSize.disabled = !hasSource;
  colorWatermarkColorButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorWatermarkEmojiButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorWatermarkStyleButtons.forEach((button) => {
    button.disabled = !hasSource;
  });
  colorConsoleHint.textContent = hasSource ? "实时预览 · 所见即所得" : "先上传一张照片";
}

function syncColorFilterButtons() {
  colorFilterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeColorFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  colorFilterCurrent.textContent = activeColorFilter || "原图";
}

function syncColorStickerButtons() {
  const hasSelection = activeStickers.some((sticker) => sticker.isSelected);
  colorStickerDelete.hidden = !hasSelection;
  colorStickerButtons.forEach((button) => {
    button.classList.remove("is-active");
    button.removeAttribute("aria-pressed");
  });
}

function syncColorAspectButtons() {
  colorAspectButtons.forEach((button) => {
    const isActive = button.dataset.aspect === selectedColorAspect;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function syncColorWatermarkButtons() {
  colorWatermarkColorButtons.forEach((button) => {
    const isActive = button.dataset.watermarkColor === watermarkColor;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  colorWatermarkEmojiButtons.forEach((button) => {
    const isActive = button.dataset.watermarkEmoji === selectedWatermarkEmoji;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  colorWatermarkStyleButtons.forEach((button) => {
    const isActive = button.dataset.watermarkStyle === watermarkStyle;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function resetColorWatermark() {
  colorWatermarkInput.value = "";
  watermarkColor = "white";
  selectedWatermarkEmoji = "";
  watermarkStyle = "bold";
  watermarkFontSize = 24;
  colorWatermarkSize.value = "24";
  colorWatermarkSizeValue.textContent = "24px";
  textPosition = getDefaultTextPosition();
  isDraggingWatermark = false;
  colorCanvas.style.cursor = "";
  syncColorWatermarkButtons();
}

function getDefaultTextPosition() {
  if (!colorSourceImage) {
    return { x: 0, y: 0 };
  }

  const { width, height } = getColorPhotoDimensions();
  return {
    x: width / 2,
    y: height - Math.max(26, Math.round(watermarkFontSize * 0.9)),
  };
}

function resetPolaroidCaption() {
  polaroidCaptionText = "AURORA MOMENT";
  polaroidCaptionSubtext = "A MOMENT TO REMEMBER";
  polaroidCaptionLayout = "single";
  polaroidCaptionStyle = "minimal";
  polaroidCaptionColor = "#1A1A1A";
  polaroidCaptionFontSize = 24;
  polaroidCaptionLetterSpacing = 2;
  polaroidCaptionTilt = 0;
  polaroidGlowEnabled = false;
  polaroidGlowBlur = 15;
  polaroidGlowColor = "#FFFFFF";
  colorPolaroid.checked = false;
  colorPolaroidText.value = polaroidCaptionText;
  colorPolaroidSubtext.value = polaroidCaptionSubtext;
  colorPolaroidFontSize.value = "24";
  colorPolaroidSizeValue.textContent = "24px";
  colorPolaroidLetterSpacing.value = "2";
  colorPolaroidLetterSpacingValue.textContent = "2px";
  colorPolaroidTilt.value = "0";
  colorPolaroidTiltValue.textContent = "0°";
  colorPolaroidGlowBlur.value = "15";
  colorPolaroidGlowValue.textContent = "15";
  syncPolaroidCaptionControls();
}

function syncPolaroidCaptionControls() {
  colorPolaroidText.value = polaroidCaptionText;
  colorPolaroidSubtext.value = polaroidCaptionSubtext;
  colorPolaroidSubtextField.hidden = polaroidCaptionLayout !== "dual";
  colorPolaroidLayoutButtons.forEach((button) => {
    const isActive = button.dataset.polaroidLayout === polaroidCaptionLayout;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  colorPolaroidStyleButtons.forEach((button) => {
    const isActive = button.dataset.polaroidStyle === polaroidCaptionStyle;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  colorPolaroidColorButtons.forEach((button) => {
    const isActive = button.dataset.polaroidColor === polaroidCaptionColor;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  colorPolaroidGlow.checked = polaroidGlowEnabled;
  colorPolaroidGlowBlur.value = String(polaroidGlowBlur);
  colorPolaroidGlowValue.textContent = String(polaroidGlowBlur);
  colorPolaroidGlowColorButtons.forEach((button) => {
    const isActive = button.dataset.polaroidGlowColor === polaroidGlowColor;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  colorPolaroidFontSize.value = String(polaroidCaptionFontSize);
  colorPolaroidSizeValue.textContent = `${polaroidCaptionFontSize}px`;
  colorPolaroidLetterSpacing.value = String(polaroidCaptionLetterSpacing);
  colorPolaroidLetterSpacingValue.textContent = `${polaroidCaptionLetterSpacing}px`;
  colorPolaroidTilt.value = String(polaroidCaptionTilt);
  colorPolaroidTiltValue.textContent = `${polaroidCaptionTilt}°`;
  updatePolaroidPanel();
}

function updatePolaroidPanel() {
  colorPolaroidPanel.hidden = !colorPolaroid.checked;
  colorPolaroidGlowControls.hidden = !polaroidGlowEnabled;
  colorPolaroidGlowBlur.disabled = !colorSourceImage || !polaroidGlowEnabled;
}

function schedulePolaroidRender() {
  if (polaroidRenderFrame) {
    return;
  }

  polaroidRenderFrame = window.requestAnimationFrame(() => {
    polaroidRenderFrame = null;
    renderColorCanvas();
  });
}

function hasColorWatermark() {
  return Boolean(colorWatermarkInput.value.trim() || selectedWatermarkEmoji);
}

function resetColorMood() {
  colorCaptionInput.value = "";
  colorCaptionColor.value = "white";
  activeStickers = [];
  isDraggingSticker = false;
  stickerDragOffset = { x: 0, y: 0 };
  syncColorStickerButtons();
}

function invalidateColorCompare() {
  colorCompareCanvas = null;
  colorCompareButton.classList.remove("is-ready");
  colorCompareButton.setAttribute("aria-pressed", "false");
}

function resetColorAdjustments() {
  colorBrightness.value = "100";
  colorContrast.value = "100";
  colorSaturation.value = "100";
  colorBlur.value = "0";
  colorTemperature.value = "0";
  resetColorFilterStrength();
  updateColorValueLabels();
}

function resetColorFilterStrength() {
  colorFilterStrength = 100;
  colorFilterStrengthInput.value = "100";
  colorFilterStrengthValue.textContent = "100%";
}

function updateColorDepthUI() {
  const hasSource = Boolean(colorSourceImage);
  colorDepthToggle.disabled = !hasSource;
  colorDepthBlurInput.disabled = !hasSource;
  colorDepthBlurInput.value = String(colorDepthBlur);
  colorDepthBlurValue.textContent = `${colorDepthBlur}px`;
  colorDepthLoading.hidden = !colorDepthBusy;
  colorDepthStatus.textContent = !hasSource
    ? "等待照片"
    : colorDepthBusy
      ? "AI 识别中"
      : colorDepthEnabled
        ? "已开启"
        : "未开启";
}

function resetColorDepth() {
  colorDepthLoadToken += 1;
  colorDepthEnabled = false;
  colorDepthBusy = false;
  colorDepthToggle.checked = false;
  colorDepthBlur = 10;
  colorDepthBlurInput.value = "10";
  colorDepthBlurValue.textContent = "10px";
  colorDepthMaskCanvas = null;
  colorDepthMaskSource = null;
  colorDepthMaskVersion += 1;
  colorDepthPersonCache = { key: "", canvas: null };
  colorDepthLoading.hidden = true;
  colorDepthMessage.textContent = "";
  updateColorDepthUI();
}

function scheduleColorDepthRender() {
  if (colorDepthRenderFrame) {
    return;
  }

  colorDepthRenderFrame = window.requestAnimationFrame(() => {
    colorDepthRenderFrame = null;
    renderColorCanvas();
  });
}

async function ensureColorDepthSegmenter() {
  if (colorDepthSegmenter) {
    return colorDepthSegmenter;
  }

  if (!window.bodySegmentation || !window.tf) {
    await new Promise((resolve, reject) => {
      const startedAt = Date.now();
      const check = () => {
        if (window.bodySegmentation && window.tf) {
          resolve();
          return;
        }
        if (Date.now() - startedAt > 12000) {
          reject(new Error("AI 组件未加载成功，请检查网络后刷新页面。"));
          return;
        }
        window.setTimeout(check, 120);
      };
      check();
    });
  }

  if (!colorDepthSegmenterPromise) {
    colorDepthSegmenterPromise = (async () => {
      if (typeof window.tf.ready === "function") {
        await window.tf.ready();
      }
      return window.bodySegmentation.createSegmenter(
        window.bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation,
        { runtime: "tfjs", modelType: "general" },
      );
    })();
  }

  try {
    colorDepthSegmenter = await colorDepthSegmenterPromise;
  } catch (error) {
    colorDepthSegmenterPromise = null;
    throw error;
  }

  return colorDepthSegmenter;
}

async function startColorDepthSegmentation() {
  const image = colorSourceImage;
  if (!image) {
    colorDepthEnabled = false;
    colorDepthToggle.checked = false;
    updateColorDepthUI();
    return;
  }

  const token = ++colorDepthLoadToken;
  colorDepthBusy = true;
  colorDepthMessage.textContent = "";
  updateColorDepthUI();

  try {
    const segmenter = await ensureColorDepthSegmenter();
    const segmentations = await segmenter.segmentPeople(image, { flipHorizontal: false });

    if (token !== colorDepthLoadToken || image !== colorSourceImage || !colorDepthEnabled) {
      return;
    }

    const maskData = await window.bodySegmentation.toBinaryMask(
      segmentations,
      { r: 255, g: 255, b: 255, a: 255 },
      { r: 0, g: 0, b: 0, a: 0 },
    );

    if (!maskData) {
      throw new Error("没有检测到可用的人像区域。");
    }

    if (token !== colorDepthLoadToken || image !== colorSourceImage) {
      return;
    }

    const mask = document.createElement("canvas");
    mask.width = maskData.width;
    mask.height = maskData.height;
    mask.getContext("2d").putImageData(maskData, 0, 0);

    colorDepthMaskCanvas = mask;
    colorDepthMaskSource = image;
    colorDepthMaskVersion += 1;
    colorDepthPersonCache = { key: "", canvas: null };
    colorDepthBusy = false;
    updateColorDepthUI();
    invalidateColorCompare();
    renderColorCanvas();
  } catch (error) {
    if (token !== colorDepthLoadToken) {
      return;
    }

    colorDepthBusy = false;
    colorDepthEnabled = false;
    colorDepthToggle.checked = false;
    colorDepthMaskCanvas = null;
    colorDepthMaskSource = null;
    colorDepthMaskVersion += 1;
    colorDepthPersonCache = { key: "", canvas: null };
    colorDepthMessage.textContent = `AI 人像识别失败：${error && error.message ? error.message : "请检查网络后重试。"}`;
    updateColorDepthUI();
    colorDepthStatus.textContent = "识别失败";
    invalidateColorCompare();
    renderColorCanvas();
  }
}

function getColorAspectRatio() {
  if (selectedColorAspect === "16:9") {
    return 16 / 9;
  }
  if (selectedColorAspect === "3:4") {
    return 3 / 4;
  }
  if (selectedColorAspect === "9:16") {
    return 9 / 16;
  }
  return null;
}

function getColorPhotoDimensions() {
  const image = colorSourceImage;
  const naturalWidth = image.naturalWidth || image.width || 1;
  const naturalHeight = image.naturalHeight || image.height || 1;
  const maxSide = Math.min(
    COLOR_STUDIO_MAX_SIDE,
    Math.max(naturalWidth, naturalHeight),
  );
  const targetRatio = getColorAspectRatio();

  if (!targetRatio) {
    return {
      width: Math.max(1, Math.round((naturalWidth / Math.max(naturalWidth, naturalHeight)) * maxSide)),
      height: Math.max(1, Math.round((naturalHeight / Math.max(naturalWidth, naturalHeight)) * maxSide)),
    };
  }

  if (targetRatio >= 1) {
    return {
      width: maxSide,
      height: Math.max(1, Math.round(maxSide / targetRatio)),
    };
  }

  return {
    width: Math.max(1, Math.round(maxSide * targetRatio)),
    height: maxSide,
  };
}

function clipRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));

  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, r);
    return;
  }

  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.arcTo(x + width, y, x + width, y + r, r);
  ctx.lineTo(x + width, y + height - r);
  ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
  ctx.lineTo(x + r, y + height);
  ctx.arcTo(x, y + height, x, y + height - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawRoundedImage(ctx, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, radius) {
  clipRoundedRect(ctx, dx, dy, dWidth, dHeight, radius);
  ctx.clip();
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

function getColorDepthPersonCanvas(image, naturalWidth, naturalHeight, width, height, filter) {
  if (!colorDepthMaskCanvas || colorDepthMaskSource !== image) {
    return null;
  }

  const targetWidth = Math.max(1, Math.round(width));
  const targetHeight = Math.max(1, Math.round(height));
  const key = `${colorDepthMaskVersion}|${targetWidth}x${targetHeight}|${filter}`;

  if (colorDepthPersonCache.key === key && colorDepthPersonCache.canvas) {
    return colorDepthPersonCache.canvas;
  }

  const person = document.createElement("canvas");
  person.width = targetWidth;
  person.height = targetHeight;
  const personCtx = person.getContext("2d");
  if (!personCtx) {
    return null;
  }

  personCtx.save();
  personCtx.imageSmoothingEnabled = true;
  personCtx.imageSmoothingQuality = "high";
  personCtx.filter = filter || "none";
  personCtx.drawImage(
    image,
    0,
    0,
    naturalWidth,
    naturalHeight,
    0,
    0,
    targetWidth,
    targetHeight,
  );
  personCtx.filter = "none";
  personCtx.globalCompositeOperation = "destination-in";
  personCtx.filter = "blur(1px)";
  personCtx.drawImage(
    colorDepthMaskCanvas,
    0,
    0,
    colorDepthMaskCanvas.width,
    colorDepthMaskCanvas.height,
    0,
    0,
    targetWidth,
    targetHeight,
  );
  personCtx.restore();

  colorDepthPersonCache = { key, canvas: person };
  return person;
}

function drawColorImageLayer(ctx, image, naturalWidth, naturalHeight, dx, dy, width, height, filter, useDepth) {
  const radius = 12;
  const blur = Math.max(0, Math.min(20, colorDepthBlur));

  ctx.save();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  clipRoundedRect(ctx, dx, dy, width, height, radius);
  ctx.clip();

  if (useDepth && colorDepthMaskCanvas && blur > 0) {
    ctx.filter = `${filter} blur(${blur}px)`;
    ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight, dx, dy, width, height);
    ctx.filter = "none";

    const person = getColorDepthPersonCanvas(image, naturalWidth, naturalHeight, width, height, filter);
    if (person) {
      ctx.drawImage(person, dx, dy);
    }
  } else {
    ctx.filter = filter;
    ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight, dx, dy, width, height);
  }

  ctx.restore();
}

function drawImageCover(ctx, image, dx, dy, dWidth, dHeight) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const imgRatio = imageWidth / imageHeight;
  const canvasRatio = dWidth / dHeight;
  let sx = 0;
  let sy = 0;
  let sWidth = imageWidth;
  let sHeight = imageHeight;

  if (imgRatio > canvasRatio) {
    sHeight = imageHeight;
    sWidth = sHeight * canvasRatio;
    sx = (imageWidth - sWidth) / 2;
  } else if (imgRatio < canvasRatio) {
    sWidth = imageWidth;
    sHeight = sWidth / canvasRatio;
    sy = (imageHeight - sHeight) / 2;
  }

  ctx.drawImage(
    image,
    sx,
    sy,
    sWidth,
    sHeight,
    dx,
    dy,
    dWidth,
    dHeight,
  );
}

function getColorRenderMetrics() {
  const { width: photoWidth, height: photoHeight } = getColorPhotoDimensions();
  const framed = Boolean(colorPolaroid.checked);
  const margin = framed ? Math.max(20, Math.round(photoWidth * 0.06)) : 0;
  const bottom = framed ? Math.max(54, Math.round(photoHeight * 0.16)) : 0;

  return {
    photoWidth,
    photoHeight,
    margin,
    bottom,
    framed,
    width: photoWidth + margin * 2,
    height: photoHeight + margin + bottom,
  };
}

function drawSpacedText(ctx, text, centerX, y, spacing) {
  const chars = Array.from(text);
  if (!chars.length) {
    return;
  }

  const widths = chars.map((char) => ctx.measureText(char).width);
  const total = widths.reduce((sum, width) => sum + width, 0) + spacing * (chars.length - 1);
  let x = centerX - total / 2;
  ctx.textAlign = "left";
  chars.forEach((char, index) => {
    ctx.fillText(char, x, y);
    x += widths[index] + spacing;
  });
}

const POLAROID_CAPTION_STYLES = {
  minimal: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    weight: 600,
  },
  song: {
    fontFamily: '"Songti SC", "SimSun", "STSong", serif',
    weight: 600,
  },
  handwritten: {
    fontFamily: '"Kaiti SC", "KaiTi", "STKaiti", serif',
    weight: 500,
  },
  rounded: {
    fontFamily: '"Arial Rounded MT Bold", "Yuanti SC", "Hiragino Sans GB", sans-serif',
    weight: 700,
  },
  serif: {
    fontFamily: '"Times New Roman", Georgia, serif',
    weight: 600,
  },
  modern: {
    fontFamily: '"Avenir Next", "PingFang SC", "Helvetica Neue", sans-serif',
    weight: 500,
  },
  didot: {
    fontFamily: '"Didot", "Bodoni 72", "Times New Roman", serif',
    weight: 500,
  },
  typewriter: {
    fontFamily: '"Courier New", Courier, monospace',
    weight: 600,
  },
  impact: {
    fontFamily: 'Impact, "Arial Black", "Helvetica Neue", sans-serif',
    weight: 700,
  },
  light: {
    fontFamily: '"Helvetica Neue", "PingFang SC", Arial, sans-serif',
    weight: 300,
  },
  doodle: {
    fontFamily: '"Long Cang", "Kaiti SC", "KaiTi", cursive',
    weight: 400,
    loadFont: '400 24px "Long Cang"',
  },
  caveat: {
    fontFamily: '"Caveat", "Segoe Script", cursive',
    weight: 600,
    loadFont: '600 24px "Caveat"',
  },
};

async function ensurePolaroidCaptionFontLoaded(styleKey = polaroidCaptionStyle) {
  const style = POLAROID_CAPTION_STYLES[styleKey];
  if (!style || !style.loadFont || !document.fonts || typeof document.fonts.load !== "function") {
    return;
  }

  try {
    await document.fonts.load(style.loadFont);
  } catch {
    // Fallback family will be used if the remote font cannot be loaded.
  }
}

async function applyPolaroidCaptionStyle(styleKey) {
  polaroidCaptionStyle = styleKey;
  syncPolaroidCaptionControls();
  invalidateColorCompare();
  await ensurePolaroidCaptionFontLoaded(styleKey);
  renderColorCanvas();
}

function measureSpacedTextWidth(ctx, text, spacing) {
  const chars = Array.from(text);
  if (!chars.length) {
    return 0;
  }

  const widths = chars.map((char) => ctx.measureText(char).width);
  return widths.reduce((sum, width) => sum + width, 0) + spacing * (chars.length - 1);
}

function drawPolaroidCaptionLine(ctx, text, centerX, centerY, fontSize, spacing, color, style) {
  ctx.save();
  ctx.font = `${style.weight} ${fontSize}px ${style.fontFamily}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;

  if (polaroidGlowEnabled) {
    ctx.shadowColor = polaroidGlowColor;
    ctx.shadowBlur = polaroidGlowBlur;
  } else {
    ctx.shadowBlur = 0;
  }

  drawSpacedText(ctx, text, centerX, centerY, spacing);
  ctx.restore();
}

function drawPolaroidCaption(ctx, metrics) {
  const text = polaroidCaptionText.trim();
  if (!text) {
    return;
  }

  const style = POLAROID_CAPTION_STYLES[polaroidCaptionStyle] || POLAROID_CAPTION_STYLES.minimal;
  const maxWidth = Math.max(40, metrics.width - metrics.margin * 2 - 16);
  const availableHeight = Math.max(12, metrics.bottom - 12);
  const centerX = metrics.width / 2;
  const centerY = metrics.margin + metrics.photoHeight + metrics.bottom * 0.5;
  const baseSize = Math.max(12, Math.min(72, polaroidCaptionFontSize));
  const letterSpacing = Math.max(0, Math.min(12, polaroidCaptionLetterSpacing));
  const tilt = (Math.max(-15, Math.min(15, polaroidCaptionTilt)) * Math.PI) / 180;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(tilt);

  if (polaroidCaptionLayout === "dual") {
    const subtext = polaroidCaptionSubtext.trim() || "A MOMENT TO REMEMBER";
    let mainSize = Math.max(8, Math.min(baseSize, availableHeight));
    let subSize = Math.max(8, Math.round(mainSize * 0.42));
    let gap = Math.max(4, Math.round(mainSize * 0.18));
    let totalHeight = mainSize + gap + subSize;

    if (totalHeight > availableHeight) {
      const scale = availableHeight / totalHeight;
      mainSize = Math.max(8, Math.floor(mainSize * scale));
      subSize = Math.max(7, Math.floor(subSize * scale));
      gap = Math.max(3, Math.round(gap * scale));
    }

    const mainSpacing = letterSpacing;
    const subSpacing = Math.max(0, Math.round(letterSpacing * 0.5));

    for (let attempt = 0; attempt < 3; attempt += 1) {
      ctx.font = `${style.weight} ${mainSize}px ${style.fontFamily}`;
      const mainWidth = measureSpacedTextWidth(ctx, text, mainSpacing);
      ctx.font = `${style.weight} ${subSize}px ${style.fontFamily}`;
      const subWidth = measureSpacedTextWidth(ctx, subtext, subSpacing);
      const widest = Math.max(mainWidth, subWidth);

      if (widest <= maxWidth) {
        break;
      }

      const scale = maxWidth / widest;
      mainSize = Math.max(6, Math.floor(mainSize * scale));
      subSize = Math.max(6, Math.floor(subSize * scale));
      gap = Math.max(2, Math.round(gap * scale));
    }

    totalHeight = mainSize + gap + subSize;
    drawPolaroidCaptionLine(
      ctx,
      text,
      0,
      -totalHeight / 2 + mainSize / 2,
      mainSize,
      mainSpacing,
      polaroidCaptionColor,
      style,
    );
    drawPolaroidCaptionLine(
      ctx,
      subtext,
      0,
      totalHeight / 2 - subSize / 2,
      subSize,
      subSpacing,
      "#96969b",
      style,
    );
    ctx.restore();
    return;
  }

  if (polaroidCaptionLayout === "subtitle") {
    const decorated = `— ${text} —`;
    let fontSize = Math.max(8, Math.min(availableHeight, Math.round(baseSize * 0.66)));

    for (let attempt = 0; attempt < 3; attempt += 1) {
      ctx.font = `${style.weight} ${fontSize}px ${style.fontFamily}`;
      const width = measureSpacedTextWidth(ctx, decorated, letterSpacing);

      if (width <= maxWidth) {
        break;
      }
      fontSize = Math.max(6, Math.floor((fontSize * maxWidth) / width));
    }

    drawPolaroidCaptionLine(
      ctx,
      decorated,
      0,
      0,
      fontSize,
      letterSpacing,
      polaroidCaptionColor,
      style,
    );
    ctx.restore();
    return;
  }

  let fontSize = Math.max(8, Math.min(baseSize, availableHeight));

  for (let attempt = 0; attempt < 3; attempt += 1) {
    ctx.font = `${style.weight} ${fontSize}px ${style.fontFamily}`;
    const width = measureSpacedTextWidth(ctx, text, letterSpacing);

    if (width <= maxWidth) {
      break;
    }
    fontSize = Math.max(6, Math.floor((fontSize * maxWidth) / width));
  }

  drawPolaroidCaptionLine(ctx, text, 0, 0, fontSize, letterSpacing, polaroidCaptionColor, style);
  ctx.restore();
}

function drawColorTemperature(ctx, metrics) {
  const temperature = Number(colorTemperature.value);
  if (!temperature) {
    return;
  }

  const strength = Math.min(0.24, (Math.abs(temperature) / 100) * 0.24);
  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  ctx.fillStyle =
    temperature > 0
      ? `rgba(255, 170, 92, ${strength})`
      : `rgba(122, 178, 255, ${strength})`;
  ctx.fillRect(metrics.margin, metrics.margin, metrics.photoWidth, metrics.photoHeight);
  ctx.restore();
}

function drawColorVignette(ctx, metrics) {
  const x = metrics.margin;
  const y = metrics.margin;
  const width = metrics.photoWidth;
  const height = metrics.photoHeight;
  const gradient = ctx.createRadialGradient(
    x + width / 2,
    y + height / 2,
    Math.min(width, height) * 0.24,
    x + width / 2,
    y + height / 2,
    Math.max(width, height) * 0.72,
  );
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.28)");

  ctx.save();
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);
  ctx.restore();
}

function getColorCaptionPalette() {
  if (colorCaptionColor.value === "black") {
    return {
      fill: "#111111",
      shadow: "rgba(255, 255, 255, 0.62)",
    };
  }
  if (colorCaptionColor.value === "pink") {
    return {
      fill: "#ff9fba",
      shadow: "rgba(0, 0, 0, 0.42)",
    };
  }
  return {
    fill: "#ffffff",
    shadow: "rgba(0, 0, 0, 0.42)",
  };
}

function wrapColorCaption(ctx, text, maxWidth) {
  const chars = Array.from(text);
  const lines = [];
  let line = "";

  chars.forEach((char) => {
    const candidate = `${line}${char}`;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = char;
    } else {
      line = candidate;
    }
  });

  if (line) {
    lines.push(line);
  }

  return lines.slice(0, 3);
}

function drawColorCaption(ctx, x, y, width, height) {
  const text = colorCaptionInput.value.trim();
  if (!text) {
    return;
  }

  const palette = getColorCaptionPalette();
  const fontSize = Math.max(20, Math.round(width * 0.045));
  const lineHeight = fontSize * 1.24;
  const bottomPadding =
    Math.max(24, Math.round(height * 0.06)) + (hasColorWatermark() ? 34 : 0);

  ctx.save();
  ctx.font = `600 ${fontSize}px "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif`;
  const lines = wrapColorCaption(ctx, text, width * 0.82);
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillStyle = palette.fill;
  ctx.shadowColor = palette.shadow;
  ctx.shadowBlur = Math.max(7, Math.round(fontSize * 0.32));
  ctx.shadowOffsetY = Math.max(2, Math.round(fontSize * 0.1));

  lines.forEach((line, index) => {
    const lineY = y + height - bottomPadding - (lines.length - 1 - index) * lineHeight;
    ctx.fillText(line, x + width / 2, lineY);
  });

  ctx.restore();
}

const STICKER_SIZE = 40;

function drawActiveStickers(ctx) {
  if (!activeStickers.length) {
    return;
  }

  ctx.save();
  ctx.font = '40px Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  activeStickers.forEach((sticker) => {
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = "#111111";
    ctx.fillText(sticker.emoji, sticker.x, sticker.y);
    ctx.restore();

    if (sticker.isSelected) {
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(0, 122, 255, 0.9)";
      ctx.strokeRect(
        sticker.x - STICKER_SIZE / 2,
        sticker.y - STICKER_SIZE / 2,
        STICKER_SIZE,
        STICKER_SIZE,
      );
      ctx.restore();
    }
  });

  ctx.restore();
}

function getColorCanvasDisplayPoint(clientX, clientY) {
  const rect = colorCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return null;
  }

  return {
    x: (clientX - rect.left) * (colorCanvas.width / rect.width),
    y: (clientY - rect.top) * (colorCanvas.height / rect.height),
  };
}

function findStickerAtPoint(point) {
  if (!point) {
    return null;
  }

  const half = STICKER_SIZE / 2;
  for (let index = activeStickers.length - 1; index >= 0; index -= 1) {
    const sticker = activeStickers[index];
    if (Math.abs(point.x - sticker.x) <= half && Math.abs(point.y - sticker.y) <= half) {
      return sticker;
    }
  }
  return null;
}

function selectSticker(sticker) {
  activeStickers.forEach((item) => {
    item.isSelected = item === sticker;
  });
  syncColorStickerButtons();
}

function addFruitSticker(emoji) {
  if (!colorSourceImage || !emoji) {
    return;
  }

  const metrics = getColorRenderMetrics();
  activeStickers.push({
    id: `sticker-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    emoji,
    x: metrics.margin + metrics.photoWidth / 2,
    y: metrics.margin + metrics.photoHeight / 2,
    isSelected: false,
  });
  syncColorStickerButtons();
  invalidateColorCompare();
  renderColorCanvas();
}

function scheduleStickerRender() {
  if (stickerRenderFrame) {
    return;
  }

  stickerRenderFrame = window.requestAnimationFrame(() => {
    stickerRenderFrame = null;
    renderColorCanvas();
  });
}

function startStickerDrag(clientX, clientY) {
  const point = getColorCanvasDisplayPoint(clientX, clientY);
  const sticker = findStickerAtPoint(point);
  if (!sticker) {
    return false;
  }

  selectSticker(sticker);
  isDraggingSticker = true;
  stickerDragOffset = {
    x: point.x - sticker.x,
    y: point.y - sticker.y,
  };
  colorCanvas.style.cursor = "grabbing";
  invalidateColorCompare();
  renderColorCanvas();
  return true;
}

function moveStickerDrag(clientX, clientY) {
  if (!isDraggingSticker) {
    return;
  }

  const point = getColorCanvasDisplayPoint(clientX, clientY);
  const sticker = activeStickers.find((item) => item.isSelected);
  if (!point || !sticker) {
    return;
  }

  const half = STICKER_SIZE / 2;
  sticker.x = Math.max(half, Math.min(colorCanvas.width - half, point.x - stickerDragOffset.x));
  sticker.y = Math.max(half, Math.min(colorCanvas.height - half, point.y - stickerDragOffset.y));
  scheduleStickerRender();
}

function endStickerDrag() {
  if (!isDraggingSticker) {
    return;
  }

  isDraggingSticker = false;
  colorCanvas.style.cursor = "";
  if (stickerRenderFrame) {
    window.cancelAnimationFrame(stickerRenderFrame);
    stickerRenderFrame = null;
  }
  renderColorCanvas();
}

function deleteSelectedSticker() {
  if (!activeStickers.some((sticker) => sticker.isSelected)) {
    return;
  }

  activeStickers = activeStickers.filter((sticker) => !sticker.isSelected);
  isDraggingSticker = false;
  syncColorStickerButtons();
  invalidateColorCompare();
  renderColorCanvas();
}

function clearStickerSelectionForExport() {
  if (!activeStickers.some((sticker) => sticker.isSelected)) {
    return;
  }

  activeStickers.forEach((sticker) => {
    sticker.isSelected = false;
  });
  syncColorStickerButtons();
  renderColorCanvas();
}

function getColorWatermarkLayout(ctx) {
  const text = colorWatermarkInput.value.trim();
  const emoji = selectedWatermarkEmoji;
  if (!text && !emoji) {
    return null;
  }

  const fontSize = watermarkFontSize;
  const emojiSize = Math.max(18, Math.round(fontSize * 1.05));
  const gap = Math.max(5, Math.round(fontSize * 0.3));
  const isRetro = watermarkStyle === "retro";
  const fontFamily = isRetro
    ? '"KaiTi", "STKaiti", "Kaiti SC", cursive'
    : '"Helvetica Neue", Arial, sans-serif';
  const textFont = `${isRetro ? 500 : 700} ${fontSize}px ${fontFamily}`;
  const emojiFont = `${emojiSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;

  ctx.save();
  ctx.font = textFont;
  const textWidth = text ? ctx.measureText(text).width : 0;
  ctx.font = emojiFont;
  const emojiWidth = emoji ? ctx.measureText(emoji).width : 0;
  ctx.restore();

  return {
    text,
    emoji,
    fontSize,
    emojiSize,
    gap,
    isRetro,
    isOutline: watermarkStyle === "outline",
    isGlow: watermarkStyle === "glow",
    fontFamily,
    textFont,
    emojiFont,
    textWidth,
    emojiWidth,
    totalWidth: textWidth + emojiWidth + (text && emoji ? gap : 0),
    height: Math.max(fontSize, emojiSize),
  };
}

function clampTextPosition(width, height, layout) {
  if (!layout) {
    return;
  }

  const padding = 8;
  const halfWidth = Math.min(layout.totalWidth / 2 + padding, width / 2);
  const halfHeight = Math.min(layout.height / 2 + padding, height / 2);
  textPosition.x = Math.max(halfWidth, Math.min(width - halfWidth, textPosition.x));
  textPosition.y = Math.max(halfHeight, Math.min(height - halfHeight, textPosition.y));
}

function drawColorWatermark(ctx, width, height) {
  const layout = getColorWatermarkLayout(ctx);
  if (!layout) {
    return;
  }

  clampTextPosition(width, height, layout);

  const watermarkFill = watermarkColor === "black" ? "#111111" : "#ffffff";

  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.translate(textPosition.x, textPosition.y);
  if (layout.isRetro) {
    ctx.rotate((-4 * Math.PI) / 180);
  }

  let startX = -layout.totalWidth / 2;

  if (layout.text) {
    ctx.font = layout.textFont;

    if (layout.isOutline) {
      ctx.strokeStyle = watermarkFill;
      ctx.lineWidth = Math.max(1.5, Math.round(layout.fontSize * 0.08));
      ctx.lineJoin = "round";
      ctx.strokeText(layout.text, startX, 0);
    } else {
      if (layout.isGlow) {
        ctx.shadowColor = "white";
        ctx.shadowBlur = Math.max(10, Math.round(layout.fontSize * 0.6));
      }
      ctx.fillStyle = watermarkFill;
      ctx.fillText(layout.text, startX, 0);
    }

    startX += layout.textWidth + (layout.emoji ? layout.gap : 0);
  }

  if (layout.emoji) {
    ctx.font = layout.emojiFont;
    ctx.fillStyle = watermarkFill;
    ctx.shadowBlur = 0;
    ctx.fillText(layout.emoji, startX, 0);
  }

  ctx.restore();
}

function getColorCanvasPhotoPoint(clientX, clientY) {
  const rect = colorCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return null;
  }

  const metrics = getColorRenderMetrics();
  const scaleX = colorCanvas.width / rect.width;
  const scaleY = colorCanvas.height / rect.height;
  const x = (clientX - rect.left) * scaleX - metrics.margin;
  const y = (clientY - rect.top) * scaleY - metrics.margin;

  return {
    x,
    y,
    width: metrics.photoWidth,
    height: metrics.photoHeight,
  };
}

function isColorWatermarkHit(clientX, clientY) {
  if (!colorSourceImage) {
    return false;
  }

  const point = getColorCanvasPhotoPoint(clientX, clientY);
  if (!point || point.x < 0 || point.y < 0 || point.x > point.width || point.y > point.height) {
    return false;
  }

  const ctx = colorCanvas.getContext("2d");
  const layout = ctx ? getColorWatermarkLayout(ctx) : null;
  if (!layout) {
    return false;
  }

  const padding = Math.max(10, Math.round(layout.fontSize * 0.25));
  return (
    Math.abs(point.x - textPosition.x) <= layout.totalWidth / 2 + padding &&
    Math.abs(point.y - textPosition.y) <= layout.height / 2 + padding
  );
}

function updateColorCanvasCursor(clientX, clientY) {
  if (isDraggingSticker) {
    colorCanvas.style.cursor = "grabbing";
    return;
  }

  if (isDraggingWatermark) {
    colorCanvas.style.cursor = "grabbing";
    return;
  }

  const displayPoint = getColorCanvasDisplayPoint(clientX, clientY);
  if (findStickerAtPoint(displayPoint)) {
    colorCanvas.style.cursor = "grab";
    return;
  }

  colorCanvas.style.cursor = isColorWatermarkHit(clientX, clientY) ? "grab" : "default";
}

function startColorWatermarkDrag(clientX, clientY) {
  if (!isColorWatermarkHit(clientX, clientY)) {
    return false;
  }

  const point = getColorCanvasPhotoPoint(clientX, clientY);
  if (!point) {
    return false;
  }

  isDraggingWatermark = true;
  watermarkDragOffset = {
    x: point.x - textPosition.x,
    y: point.y - textPosition.y,
  };
  colorCanvas.style.cursor = "grabbing";
  invalidateColorCompare();

  if (isComparingColorOriginal) {
    isComparingColorOriginal = false;
    colorCanvas.classList.remove("is-comparing");
    colorCompareHint.textContent = "长按图片对比原图";
  }

  return true;
}

function scheduleColorCanvasRender() {
  if (watermarkRenderFrame) {
    return;
  }

  watermarkRenderFrame = window.requestAnimationFrame(() => {
    watermarkRenderFrame = null;
    renderColorCanvas();
  });
}

function moveColorWatermarkDrag(clientX, clientY) {
  if (!isDraggingWatermark) {
    return;
  }

  const point = getColorCanvasPhotoPoint(clientX, clientY);
  if (!point) {
    return;
  }

  textPosition.x = point.x - watermarkDragOffset.x;
  textPosition.y = point.y - watermarkDragOffset.y;
  scheduleColorCanvasRender();
}

function endColorWatermarkDrag() {
  if (!isDraggingWatermark) {
    return;
  }

  isDraggingWatermark = false;
  colorCanvas.style.cursor = "default";

  if (watermarkRenderFrame) {
    window.cancelAnimationFrame(watermarkRenderFrame);
    watermarkRenderFrame = null;
  }
  renderColorCanvas();
}

function renderColorPhotoCanvas(edited) {
  const { width, height } = getColorPhotoDimensions();
  const naturalWidth = colorSourceImage.naturalWidth || colorSourceImage.width || 1;
  const naturalHeight = colorSourceImage.naturalHeight || colorSourceImage.height || 1;
  const targetRatio = getColorAspectRatio();
  const photo = document.createElement("canvas");
  photo.width = width;
  photo.height = height;
  const ctx = photo.getContext("2d");

  if (!ctx) {
    return photo;
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const preset = edited ? COLOR_STUDIO_FILTERS[activeColorFilter] : null;
  const filterStrength = Math.max(0, Math.min(100, colorFilterStrength));
  const presetFilter =
    edited && preset ? interpolateColorFilter(preset.filter, filterStrength) : "";
  const filterTint = edited && preset ? scaleColorTint(preset.tint, filterStrength) : "";
  const blurValue = Number(colorBlur.value) || 0;
  const blurFilter = blurValue > 0 ? ` blur(${blurValue}px)` : "";
  const baseFilter = `brightness(${colorBrightness.value}%) contrast(${colorContrast.value}%) saturate(${colorSaturation.value}%)${blurFilter}`;
  const colorFilter = edited
    ? `${baseFilter} ${presetFilter}`.trim()
    : "none";
  const useDepth =
    edited &&
    colorDepthEnabled &&
    Boolean(colorDepthMaskCanvas) &&
    colorDepthMaskSource === colorSourceImage &&
    colorDepthBlur > 0;

  const applyTone = () => {
    if (!edited) {
      return;
    }

    const metrics = { margin: 0, photoWidth: width, photoHeight: height };
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.clip();

    if (preset && filterTint) {
      ctx.save();
      ctx.globalCompositeOperation = preset.blend || "soft-light";
      ctx.fillStyle = filterTint;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    drawColorTemperature(ctx, metrics);

    if (preset && preset.vignette && filterStrength > 0) {
      ctx.save();
      ctx.globalAlpha = filterStrength / 100;
      drawColorVignette(ctx, metrics);
      ctx.restore();
    }

    ctx.restore();
  };

  if (!targetRatio) {
    drawColorImageLayer(
      ctx,
      colorSourceImage,
      naturalWidth,
      naturalHeight,
      0,
      0,
      width,
      height,
      colorFilter,
      useDepth,
    );
    applyTone();

    if (edited) {
      drawColorCaption(ctx, 0, 0, width, height);
      drawColorWatermark(ctx, width, height);
    }

    return photo;
  }

  // Blurred ambient background, with the current color filter applied.
  ctx.save();
  ctx.filter = colorFilter === "none" ? "blur(30px)" : `${colorFilter} blur(30px)`;
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  drawImageCover(ctx, colorSourceImage, 0, 0, width, height);
  ctx.restore();
  ctx.filter = "none";

  // Complete foreground image, contained and centered with breathing room.
  const margin = Math.max(18, Math.round(Math.min(width, height) * 0.045));
  const maxWidth = Math.max(1, width - margin * 2);
  const maxHeight = Math.max(1, height - margin * 2);
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
  const foregroundWidth = Math.max(1, Math.round(naturalWidth * scale));
  const foregroundHeight = Math.max(1, Math.round(naturalHeight * scale));
  const foregroundX = Math.round((width - foregroundWidth) / 2);
  const foregroundY = Math.round((height - foregroundHeight) / 2);

  drawColorImageLayer(
    ctx,
    colorSourceImage,
    naturalWidth,
    naturalHeight,
    foregroundX,
    foregroundY,
    foregroundWidth,
    foregroundHeight,
    colorFilter,
    useDepth,
  );

  applyTone();

  if (edited) {
    drawColorCaption(ctx, foregroundX, foregroundY, foregroundWidth, foregroundHeight);
    drawColorWatermark(ctx, width, height);
  }

  return photo;
}

function renderColorCanvas() {
  if (!colorSourceImage) {
    return;
  }

  const metrics = getColorRenderMetrics();
  colorCanvas.width = metrics.width;
  colorCanvas.height = metrics.height;
  colorCanvas.style.aspectRatio = `${metrics.width} / ${metrics.height}`;

  const ctx = colorCanvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, metrics.width, metrics.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, metrics.width, metrics.height);

  const photo = renderColorPhotoCanvas(!isComparingColorOriginal);
  ctx.save();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(photo, metrics.margin, metrics.margin);
  ctx.restore();

  if (metrics.framed) {
    drawPolaroidCaption(ctx, metrics);
  }

  drawActiveStickers(ctx);
}

function loadColorImage(file) {
  if (!isImageFile(file)) {
    setColorStatus("请选择一张图片文件。", true);
    return;
  }

  const url = URL.createObjectURL(file);
  const image = new Image();

  image.onload = () => {
    URL.revokeObjectURL(url);
    colorSourceImage = image;
    colorSourceDrop.classList.add("has-image");
    colorSourceEmpty.hidden = true;
    colorSourceClear.hidden = false;
    colorCompareHint.hidden = false;
    colorCompareHint.textContent = "长按图片对比原图";
    isComparingColorOriginal = false;
    colorCanvas.classList.remove("is-comparing");
    colorImageName.textContent = file.name || "我的照片";
    activeColorFilter = "";
    colorPolaroid.checked = false;
    resetPolaroidCaption();
    selectedColorAspect = "original";
    resetColorMood();
    resetColorWatermark();
    resetColorDepth();
    invalidateColorCompare();
    resetColorAdjustments();
    syncColorControls();
    syncColorFilterButtons();
    syncColorAspectButtons();
    syncColorWatermarkButtons();
    renderColorCanvas();
    setColorStatus("照片已就位，选择一个滤镜。");
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    setColorStatus("图片读取失败，请重新选择。", true);
  };

  image.src = url;
}

function applyColorFilter(filter) {
  if (!colorSourceImage) {
    setColorStatus("请先上传一张照片。", true);
    return;
  }

  activeColorFilter = activeColorFilter === filter ? "" : filter;
  invalidateColorCompare();
  syncColorFilterButtons();
  syncColorControls();
  renderColorCanvas();
  setColorStatus(activeColorFilter ? `「${activeColorFilter}」已上线。` : "已回到原图色彩。");
}

function setColorCompare(active) {
  if (!colorSourceImage) {
    return;
  }

  const next = Boolean(active);
  if (next === isComparingColorOriginal) {
    return;
  }

  isComparingColorOriginal = next;
  colorCanvas.classList.toggle("is-comparing", next);
  colorCompareHint.textContent = next ? "松开恢复" : "长按图片对比原图";
  renderColorCanvas();
}

function endColorCompare() {
  setColorCompare(false);
}

function scheduleColorFilterRender() {
  if (colorFilterRenderFrame) {
    return;
  }

  colorFilterRenderFrame = window.requestAnimationFrame(() => {
    colorFilterRenderFrame = null;
    renderColorCanvas();
  });
}

function resetColorStudio() {
  if (!colorSourceImage) {
    return;
  }

  activeColorFilter = "";
  isComparingColorOriginal = false;
  colorCanvas.classList.remove("is-comparing");
  colorCompareHint.textContent = "长按图片对比原图";
  invalidateColorCompare();
  resetColorAdjustments();
  syncColorFilterButtons();
  syncColorControls();
  renderColorCanvas();
  setColorStatus("滤镜与微调已重置。");
}

function clearColorSource() {
  colorSourceImage = null;
  activeColorFilter = "";
  colorPolaroid.checked = false;
  resetPolaroidCaption();
  colorCanvas.width = 960;
  colorCanvas.height = 720;
  colorSourceDrop.classList.remove("has-image");
  colorSourceEmpty.hidden = false;
  colorSourceClear.hidden = true;
  colorCompareHint.hidden = true;
  colorCompareHint.textContent = "长按图片对比原图";
  isComparingColorOriginal = false;
  colorCanvas.classList.remove("is-comparing");
  colorImageName.textContent = "未加载原图";
  colorSourceFile.value = "";
  selectedColorAspect = "original";
  resetColorMood();
  resetColorWatermark();
  resetColorDepth();
  invalidateColorCompare();
  resetColorAdjustments();
  syncColorControls();
  syncColorFilterButtons();
  syncColorAspectButtons();
  syncColorWatermarkButtons();
  setColorStatus("已清空，换一张照片继续吧。");
}

async function saveColorImage() {
  if (!colorSourceImage) {
    setColorStatus("请先上传一张照片。", true);
    return;
  }

  await ensurePolaroidCaptionFontLoaded();
  clearStickerSelectionForExport();
  renderColorCanvas();

  const isCompare = Boolean(colorCompareCanvas);
  const exportCanvas = colorCompareCanvas || colorCanvas;
  const dataUrl = exportCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = isCompare
    ? `aurora-compare-${Date.now()}.png`
    : `aurora-${activeColorFilter || "soft-glow"}-${Date.now()}.png`;
  document.body.append(link);
  link.click();
  link.remove();
  setColorStatus(isCompare ? "对比图已保存，去分享吧。" : "保存成功，去收藏这份氛围感吧。");
}

async function generateColorCompare() {
  if (!colorSourceImage) {
    setColorStatus("请先上传一张照片。", true);
    return;
  }

  await ensurePolaroidCaptionFontLoaded();

  const { width, height } = getColorPhotoDimensions();
  const originalPhoto = renderColorPhotoCanvas(false);
  const editedPhoto = renderColorPhotoCanvas(true);
  const labelHeight = Math.max(58, Math.round(height * 0.1));
  const compare = document.createElement("canvas");
  compare.width = width * 2;
  compare.height = height + labelHeight;

  const ctx = compare.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, compare.width, compare.height);
  ctx.drawImage(originalPhoto, 0, 0, width, height);
  ctx.drawImage(editedPhoto, width, 0, width, height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(width - 1, 0, 2, height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.fillRect(0, height, compare.width, 1);

  const labelSize = Math.max(16, Math.round(width * 0.023));
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `500 ${labelSize}px "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = "#8a8a8a";
  ctx.fillText("原图", width / 2, height + labelHeight / 2);
  ctx.font = `600 ${labelSize}px "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = "#111111";
  ctx.fillText("AURORA 调色", width + width / 2, height + labelHeight / 2);

  colorCompareCanvas = compare;
  colorCompareButton.classList.add("is-ready");
  colorCompareButton.setAttribute("aria-pressed", "true");
  setColorStatus("对比图已生成，点击保存下载。");
}

function getColorClipboardImage(event) {
  const clipboard = event.clipboardData;
  if (!clipboard) {
    return null;
  }

  let files = Array.from(clipboard.items || [])
    .filter((item) => item.kind === "file")
    .map((item) => item.getAsFile())
    .filter(Boolean);

  if (!files.length && clipboard.files) {
    files = Array.from(clipboard.files);
  }

  return files.find(isImageFile) || null;
}

function bindColorDrop() {
  ["dragenter", "dragover"].forEach((eventName) => {
    colorSourceDrop.addEventListener(eventName, (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
      colorSourceDrop.classList.add("is-dragover");
    });
  });

  colorSourceDrop.addEventListener("dragleave", (event) => {
    event.preventDefault();
    if (!event.relatedTarget || !colorSourceDrop.contains(event.relatedTarget)) {
      colorSourceDrop.classList.remove("is-dragover");
    }
  });

  colorSourceDrop.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    colorSourceDrop.classList.remove("is-dragover");
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      loadColorImage(file);
    } else {
      setColorStatus("请拖入一张图片。", true);
    }
  });

  colorSourceDrop.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      colorSourceFile.click();
    }
  });
}

function handleColorPaste(event) {
  if (panels.color.hidden) {
    return;
  }
  if (event.target === colorCaptionInput) {
    return;
  }
  if (event.target === colorWatermarkInput) {
    return;
  }

  const file = getColorClipboardImage(event);
  if (!file) {
    return;
  }

  event.preventDefault();
  loadColorImage(file);
}

colorSourceFile.addEventListener("change", () => {
  const file = colorSourceFile.files[0];
  if (file) {
    loadColorImage(file);
  }
  colorSourceFile.value = "";
});

[colorBrightness, colorContrast, colorSaturation, colorBlur, colorTemperature].forEach((slider) => {
  slider.addEventListener("input", () => {
    updateColorValueLabels();
    invalidateColorCompare();
    renderColorCanvas();
  });
});

colorFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyColorFilter(button.dataset.filter || "");
  });
});

colorFilterStrengthInput.addEventListener("input", () => {
  const value = Number(colorFilterStrengthInput.value);
  colorFilterStrength = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 100;
  colorFilterStrengthValue.textContent = `${colorFilterStrength}%`;
  invalidateColorCompare();
  scheduleColorFilterRender();
});

function updateColorFilterScrollIndicator() {
  if (!colorFilterScrollIndicator) {
    return;
  }

  const maxScroll = colorFilters.scrollWidth - colorFilters.clientWidth;
  if (maxScroll <= 1) {
    colorFilterScrollIndicator.style.width = "100%";
    colorFilterScrollIndicator.style.opacity = "0.35";
    return;
  }

  const progress = Math.max(
    0,
    Math.min(1, (colorFilters.scrollLeft + colorFilters.clientWidth) / colorFilters.scrollWidth),
  );
  colorFilterScrollIndicator.style.opacity = "1";
  colorFilterScrollIndicator.style.width = `${Math.max(10, progress * 100)}%`;
}

function scheduleColorFilterIndicator() {
  if (colorFilterIndicatorFrame) {
    return;
  }

  colorFilterIndicatorFrame = window.requestAnimationFrame(() => {
    colorFilterIndicatorFrame = null;
    updateColorFilterScrollIndicator();
  });
}

colorFilters.addEventListener("scroll", scheduleColorFilterIndicator);

window.addEventListener("resize", scheduleColorFilterIndicator);

if (typeof ResizeObserver === "function") {
  const filterResizeObserver = new ResizeObserver(scheduleColorFilterIndicator);
  filterResizeObserver.observe(colorFilters);
}

function enableHorizontalDragScroll(container) {
  if (!container) {
    return;
  }

  let dragActive = false;
  let dragPointerId = null;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let dragMoved = false;
  let clickSuppressed = false;
  let clickSuppressTimer = null;

  container.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" || event.button !== 0) {
      return;
    }

    dragActive = true;
    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartScroll = container.scrollLeft;
    dragMoved = false;
  });

  window.addEventListener("pointermove", (event) => {
    if (!dragActive || event.pointerId !== dragPointerId) {
      return;
    }

    const deltaX = event.clientX - dragStartX;
    if (!dragMoved && Math.abs(deltaX) < 6) {
      return;
    }

    dragMoved = true;
    container.classList.add("is-dragging");
    container.scrollLeft = dragStartScroll - deltaX;
    event.preventDefault();
  });

  const finishDrag = (event, canceled = false) => {
    if (!dragActive || (event && event.pointerId !== dragPointerId)) {
      return;
    }

    const moved = dragMoved;
    dragActive = false;
    dragPointerId = null;
    dragMoved = false;
    container.classList.remove("is-dragging");

    if (moved && !canceled) {
      clickSuppressed = true;
      window.clearTimeout(clickSuppressTimer);
      clickSuppressTimer = window.setTimeout(() => {
        clickSuppressed = false;
      }, 180);
    }
  };

  window.addEventListener("pointerup", (event) => {
    finishDrag(event);
  });
  window.addEventListener("pointercancel", (event) => {
    finishDrag(event, true);
  });

  container.addEventListener(
    "click",
    (event) => {
      if (!clickSuppressed) {
        return;
      }

      clickSuppressed = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );
}

enableHorizontalDragScroll(colorFilters);
enableHorizontalDragScroll(colorPolaroidStyles);

scheduleColorFilterIndicator();

colorDepthToggle.addEventListener("change", () => {
  if (!colorSourceImage) {
    colorDepthEnabled = false;
    colorDepthToggle.checked = false;
    updateColorDepthUI();
    return;
  }

  colorDepthEnabled = colorDepthToggle.checked;
  colorDepthMessage.textContent = "";
  invalidateColorCompare();

  if (!colorDepthEnabled) {
    colorDepthLoadToken += 1;
    colorDepthBusy = false;
    colorDepthLoading.hidden = true;
    updateColorDepthUI();
    renderColorCanvas();
    return;
  }

  if (colorDepthMaskCanvas && colorDepthMaskSource === colorSourceImage) {
    updateColorDepthUI();
    renderColorCanvas();
    return;
  }

  startColorDepthSegmentation();
});

colorDepthBlurInput.addEventListener("input", () => {
  const value = Number(colorDepthBlurInput.value);
  colorDepthBlur = Number.isFinite(value) ? Math.min(20, Math.max(0, value)) : 10;
  colorDepthBlurValue.textContent = `${colorDepthBlur}px`;
  invalidateColorCompare();
  scheduleColorDepthRender();
});

colorPolaroid.addEventListener("change", () => {
  if (!colorSourceImage) {
    return;
  }
  updatePolaroidPanel();
  invalidateColorCompare();
  renderColorCanvas();
  setColorStatus(colorPolaroid.checked ? "拍立得相框已打开。" : "拍立得相框已关闭。");
});

colorPolaroidText.addEventListener("input", () => {
  polaroidCaptionText = colorPolaroidText.value;
  invalidateColorCompare();
  renderColorCanvas();
});

colorPolaroidStyleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const style = button.dataset.polaroidStyle || "minimal";
    if (style === polaroidCaptionStyle) {
      return;
    }
    applyPolaroidCaptionStyle(style);
  });
});

colorPolaroidColorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.dataset.polaroidColor || "#1A1A1A";
    if (color === polaroidCaptionColor) {
      return;
    }
    polaroidCaptionColor = color;
    syncPolaroidCaptionControls();
    invalidateColorCompare();
    renderColorCanvas();
  });
});

colorPolaroidGlow.addEventListener("change", () => {
  polaroidGlowEnabled = colorPolaroidGlow.checked;
  updatePolaroidPanel();
  invalidateColorCompare();
  renderColorCanvas();
});

colorPolaroidGlowBlur.addEventListener("input", () => {
  const value = Number(colorPolaroidGlowBlur.value);
  polaroidGlowBlur = Number.isFinite(value) ? Math.min(30, Math.max(0, value)) : 15;
  colorPolaroidGlowValue.textContent = String(polaroidGlowBlur);
  invalidateColorCompare();
  renderColorCanvas();
});

colorPolaroidFontSize.addEventListener("input", () => {
  const value = Number(colorPolaroidFontSize.value);
  polaroidCaptionFontSize = Number.isFinite(value) ? Math.min(72, Math.max(12, value)) : 24;
  colorPolaroidSizeValue.textContent = `${polaroidCaptionFontSize}px`;
  invalidateColorCompare();
  schedulePolaroidRender();
});

colorPolaroidGlowColorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.dataset.polaroidGlowColor || "#FFFFFF";
    if (color === polaroidGlowColor) {
      return;
    }
    polaroidGlowColor = color;
    syncPolaroidCaptionControls();
    invalidateColorCompare();
    schedulePolaroidRender();
  });
});

colorPolaroidSubtext.addEventListener("input", () => {
  polaroidCaptionSubtext = colorPolaroidSubtext.value;
  invalidateColorCompare();
  schedulePolaroidRender();
});

colorPolaroidLayoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const layout = button.dataset.polaroidLayout || "single";
    if (layout === polaroidCaptionLayout) {
      return;
    }
    polaroidCaptionLayout = layout;
    syncPolaroidCaptionControls();
    invalidateColorCompare();
    renderColorCanvas();
  });
});

colorPolaroidLetterSpacing.addEventListener("input", () => {
  const value = Number(colorPolaroidLetterSpacing.value);
  polaroidCaptionLetterSpacing = Number.isFinite(value) ? Math.min(12, Math.max(0, value)) : 2;
  colorPolaroidLetterSpacingValue.textContent = `${polaroidCaptionLetterSpacing}px`;
  invalidateColorCompare();
  schedulePolaroidRender();
});

colorPolaroidTilt.addEventListener("input", () => {
  const value = Number(colorPolaroidTilt.value);
  polaroidCaptionTilt = Number.isFinite(value) ? Math.min(15, Math.max(-15, value)) : 0;
  colorPolaroidTiltValue.textContent = `${polaroidCaptionTilt}°`;
  invalidateColorCompare();
  schedulePolaroidRender();
});

colorCaptionInput.addEventListener("input", () => {
  invalidateColorCompare();
  renderColorCanvas();
});

colorCaptionColor.addEventListener("change", () => {
  invalidateColorCompare();
  renderColorCanvas();
});

colorStickerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sticker = button.dataset.sticker || "";
    if (sticker) {
      addFruitSticker(sticker);
    }
  });
});

colorStickerDelete.addEventListener("click", deleteSelectedSticker);

colorAspectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const aspect = button.dataset.aspect || "original";
    if (!colorSourceImage || aspect === selectedColorAspect) {
      return;
    }
    selectedColorAspect = aspect;
    syncColorAspectButtons();
    invalidateColorCompare();
    renderColorCanvas();
    setColorStatus(
      aspect === "original" ? "已恢复原始比例。" : `已切换为 ${button.textContent.trim()}。`,
    );
  });
});

colorWatermarkInput.addEventListener("input", () => {
  invalidateColorCompare();
  renderColorCanvas();
});

colorWatermarkColorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.dataset.watermarkColor || "white";
    if (color === watermarkColor) {
      return;
    }
    watermarkColor = color;
    syncColorWatermarkButtons();
    invalidateColorCompare();
    renderColorCanvas();
  });
});

colorWatermarkEmojiButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const emoji = button.dataset.watermarkEmoji || "";
    if (!emoji) {
      return;
    }
    selectedWatermarkEmoji = selectedWatermarkEmoji === emoji ? "" : emoji;
    syncColorWatermarkButtons();
    invalidateColorCompare();
    renderColorCanvas();
  });
});

colorWatermarkStyleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const style = button.dataset.watermarkStyle || "bold";
    if (style === watermarkStyle) {
      return;
    }
    watermarkStyle = style;
    syncColorWatermarkButtons();
    invalidateColorCompare();
    renderColorCanvas();
  });
});

colorSourceDrop.addEventListener("click", (event) => {
  if (!colorSourceImage) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
});

colorCanvas.addEventListener("mousedown", (event) => {
  if (event.button !== 0 || !colorSourceImage) {
    return;
  }

  event.preventDefault();
  if (startStickerDrag(event.clientX, event.clientY)) {
    return;
  }

  if (startColorWatermarkDrag(event.clientX, event.clientY)) {
    return;
  }

  setColorCompare(true);
});

colorCanvas.addEventListener("mousemove", (event) => {
  if (!isDraggingWatermark && !isDraggingSticker) {
    updateColorCanvasCursor(event.clientX, event.clientY);
  }
});

colorCanvas.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  if (!touch || !colorSourceImage) {
    return;
  }

  if (startStickerDrag(touch.clientX, touch.clientY)) {
    event.preventDefault();
    return;
  }

  if (startColorWatermarkDrag(touch.clientX, touch.clientY)) {
    event.preventDefault();
    return;
  }

  setColorCompare(true);
}, { passive: false });

window.addEventListener("mousemove", (event) => {
  if (isDraggingSticker) {
    moveStickerDrag(event.clientX, event.clientY);
  } else if (isDraggingWatermark) {
    moveColorWatermarkDrag(event.clientX, event.clientY);
  }
});

window.addEventListener("mouseup", (event) => {
  if (isDraggingSticker) {
    endStickerDrag();
    updateColorCanvasCursor(event.clientX, event.clientY);
  } else if (isDraggingWatermark) {
    endColorWatermarkDrag();
    updateColorCanvasCursor(event.clientX, event.clientY);
  }
  endColorCompare();
});

window.addEventListener("touchmove", (event) => {
  if (!isDraggingSticker && !isDraggingWatermark) {
    return;
  }

  const touch = event.touches[0];
  if (!touch) {
    return;
  }

  event.preventDefault();
  if (isDraggingSticker) {
    moveStickerDrag(touch.clientX, touch.clientY);
  } else {
    moveColorWatermarkDrag(touch.clientX, touch.clientY);
  }
}, { passive: false });

colorCanvas.addEventListener("mouseleave", () => {
  if (!isDraggingWatermark && !isDraggingSticker) {
    endColorCompare();
    colorCanvas.style.cursor = "default";
  }
});

colorCanvas.addEventListener("contextmenu", (event) => {
  if (colorSourceImage) {
    event.preventDefault();
  }
});

window.addEventListener("touchend", () => {
  endStickerDrag();
  endColorWatermarkDrag();
  endColorCompare();
});
window.addEventListener("touchcancel", () => {
  endStickerDrag();
  endColorWatermarkDrag();
  endColorCompare();
});
window.addEventListener("blur", () => {
  endStickerDrag();
  endColorWatermarkDrag();
  endColorCompare();
});

colorWatermarkSize.addEventListener("input", () => {
  const value = Number(colorWatermarkSize.value);
  watermarkFontSize = Number.isFinite(value) ? Math.min(72, Math.max(12, value)) : 24;
  colorWatermarkSizeValue.textContent = `${watermarkFontSize}px`;
  invalidateColorCompare();
  renderColorCanvas();
});

colorSourceClear.addEventListener("click", clearColorSource);
colorResetButton.addEventListener("click", resetColorStudio);
function showColorCopyToast(message, isError = false) {
  window.clearTimeout(colorCopyToastTimer);
  colorCopyToast.textContent = message;
  colorCopyToast.classList.toggle("is-error", isError);
  colorCopyToast.classList.add("is-visible");
  colorCopyToastTimer = window.setTimeout(() => {
    colorCopyToast.classList.remove("is-visible");
  }, 2000);
}

async function copyColorImage() {
  if (!colorSourceImage) {
    setColorStatus("请先上传一张照片。", true);
    return;
  }

  if (
    !navigator.clipboard ||
    typeof navigator.clipboard.write !== "function" ||
    typeof window.ClipboardItem !== "function"
  ) {
    const message = "当前浏览器不支持一键复制，请使用保存按钮下载。";
    setColorStatus(message, true);
    showColorCopyToast(message, true);
    return;
  }

  if (isComparingColorOriginal) {
    endColorCompare();
  }

  await ensurePolaroidCaptionFontLoaded();
  clearStickerSelectionForExport();
  renderColorCanvas();
  colorCopyButton.disabled = true;

  try {
    const blob = await new Promise((resolve, reject) => {
      colorCanvas.toBlob((result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("无法生成 PNG 图片"));
        }
      }, "image/png");
    });

    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);

    setColorStatus("图片已复制到剪贴板，去粘贴吧。");
    showColorCopyToast("✅ 图片已复制到剪贴板");

    window.clearTimeout(colorCopyButtonTimer);
    colorCopyButtonText.textContent = "✅ 已复制";
    colorCopyButtonTimer = window.setTimeout(() => {
      colorCopyButtonText.textContent = "复制图片";
      colorCopyButton.disabled = !colorSourceImage;
    }, 2000);
  } catch {
    const message = "当前浏览器不支持一键复制，请使用保存按钮下载。";
    setColorStatus(message, true);
    showColorCopyToast(message, true);
    colorCopyButton.disabled = !colorSourceImage;
  }
}

colorCompareButton.addEventListener("click", generateColorCompare);
colorSaveButton.addEventListener("click", saveColorImage);
colorCopyButton.addEventListener("click", copyColorImage);
document.addEventListener("paste", handleColorPaste);
bindColorDrop();

updateColorValueLabels();
syncColorControls();
syncColorFilterButtons();
syncColorStickerButtons();
syncColorAspectButtons();
syncColorWatermarkButtons();

// 穿搭助手：根据性别与 BMI 生成建议
const OUTFIT_SCENES = [
  { icon: "💼", label: "上班通勤", keyword: "上班", bodyKeyword: "通勤", bloggerContext: "职场" },
  { icon: "✈️", label: "旅游度假", keyword: "旅游", bodyKeyword: "旅游", bloggerContext: "旅行" },
  { icon: "🥂", label: "约会聚会", keyword: "约会", bodyKeyword: "约会", bloggerContext: "约会" },
  { icon: "🏃", label: "运动休闲", keyword: "运动", bodyKeyword: "运动", bloggerContext: "运动" },
];

const OUTFIT_STYLES = [
  { label: "日常基础类", keyword: "日常基础", trait: "日常风" },
  { label: "甜美温柔类", keyword: "甜美温柔", trait: "甜美风" },
  { label: "通勤气质类", keyword: "通勤气质", trait: "通勤气质风" },
  { label: "潮流个性类", keyword: "潮流个性", trait: "潮流个性风" },
  { label: "文艺复古类", keyword: "文艺复古", trait: "文艺复古风" },
];

const OUTFIT_COLOR_PALETTES = {
  "日常基础": [
    { name: "云朵白", hex: "#F5F5F7" },
    { name: "雾霾蓝", hex: "#A7B8C8" },
    { name: "燕麦色", hex: "#D9C7B8" },
    { name: "炭灰", hex: "#4A4A4A" },
  ],
  "甜美温柔": [
    { name: "奶油白", hex: "#FFFDD0" },
    { name: "樱花粉", hex: "#FFB7C5" },
    { name: "香芋紫", hex: "#D8BFD8" },
    { name: "浅鹅黄", hex: "#FFFACD" },
  ],
  "通勤气质": [
    { name: "经典黑", hex: "#1A1A1A" },
    { name: "珍珠白", hex: "#F8F8FF" },
    { name: "高级灰", hex: "#808080" },
    { name: "卡其色", hex: "#C3B091" },
  ],
  "文艺复古": [
    { name: "复古红", hex: "#8B0000" },
    { name: "墨绿", hex: "#2F4F4F" },
    { name: "焦糖色", hex: "#D2691E" },
    { name: "藏青", hex: "#191970" },
  ],
  "潮流个性": [
    { name: "克莱因蓝", hex: "#002FA7" },
    { name: "荧光绿", hex: "#39FF14" },
    { name: "金属银", hex: "#C0C0C0" },
    { name: "极光紫", hex: "#B57BFF" },
  ],
};

const OUTFIT_COLOR_PAIRINGS = {
  云朵白: {
    pairs: [
      { name: "雾霾蓝", hex: "#A7B8C8" },
      { name: "燕麦色", hex: "#D9C7B8" },
      { name: "炭灰", hex: "#4A4A4A" },
    ],
    formula: "云朵白上衣 + 雾霾蓝下装 + 炭灰鞋包",
  },
  雾霾蓝: {
    pairs: [
      { name: "米白色", hex: "#F5F1E8" },
      { name: "卡其色", hex: "#C3B091" },
      { name: "深海军蓝", hex: "#1F3A5F" },
    ],
    formula: "雾霾蓝针织 + 米白长裤 + 卡其风衣",
  },
  燕麦色: {
    pairs: [
      { name: "云朵白", hex: "#F5F5F7" },
      { name: "雾霾蓝", hex: "#A7B8C8" },
      { name: "焦糖色", hex: "#D2691E" },
    ],
    formula: "燕麦色外套 + 云朵白内搭 + 焦糖色腰带",
  },
  炭灰: {
    pairs: [
      { name: "云朵白", hex: "#F5F5F7" },
      { name: "克莱因蓝", hex: "#002FA7" },
      { name: "樱花粉", hex: "#FFB7C5" },
    ],
    formula: "炭灰西装 + 云朵白衬衫 + 克莱因蓝配饰",
  },
  奶油白: {
    pairs: [
      { name: "焦糖色", hex: "#D2691E" },
      { name: "浅灰", hex: "#C8C8C8" },
      { name: "雾霾蓝", hex: "#A7B8C8" },
    ],
    formula: "奶油白上衣 + 焦糖色下装 + 浅灰配饰",
  },
  樱花粉: {
    pairs: [
      { name: "香芋紫", hex: "#D8BFD8" },
      { name: "奶油白", hex: "#FFFDD0" },
      { name: "浅灰色", hex: "#D9D9D9" },
    ],
    formula: "樱花粉上衣 + 奶油白半裙 + 香芋紫配饰",
  },
  香芋紫: {
    pairs: [
      { name: "奶白色", hex: "#FFFDD0" },
      { name: "浅灰色", hex: "#D9D9D9" },
      { name: "复古红", hex: "#8B0000" },
    ],
    formula: "香芋紫针织 + 奶白长裤 + 复古红包包",
  },
  浅鹅黄: {
    pairs: [
      { name: "奶油白", hex: "#FFFDD0" },
      { name: "雾霾蓝", hex: "#A7B8C8" },
      { name: "燕麦色", hex: "#D9C7B8" },
    ],
    formula: "浅鹅黄衬衫 + 奶油白下装 + 雾霾蓝鞋",
  },
  经典黑: {
    pairs: [
      { name: "珍珠白", hex: "#F8F8FF" },
      { name: "高级灰", hex: "#808080" },
      { name: "克莱因蓝", hex: "#002FA7" },
    ],
    formula: "经典黑西装 + 珍珠白内搭 + 高级灰裤装",
  },
  珍珠白: {
    pairs: [
      { name: "高级灰", hex: "#808080" },
      { name: "卡其色", hex: "#C3B091" },
      { name: "经典黑", hex: "#1A1A1A" },
    ],
    formula: "珍珠白衬衫 + 卡其色长裤 + 高级灰包",
  },
  高级灰: {
    pairs: [
      { name: "克莱因蓝", hex: "#002FA7" },
      { name: "亮橙色", hex: "#FF8A3D" },
      { name: "纯白", hex: "#FFFFFF" },
    ],
    formula: "高级灰大衣 + 纯白内搭 + 克莱因蓝围巾",
  },
  卡其色: {
    pairs: [
      { name: "珍珠白", hex: "#F8F8FF" },
      { name: "经典黑", hex: "#1A1A1A" },
      { name: "焦糖色", hex: "#D2691E" },
    ],
    formula: "卡其色风衣 + 珍珠白衬衫 + 经典黑靴",
  },
  复古红: {
    pairs: [
      { name: "墨绿", hex: "#2F4F4F" },
      { name: "奶油白", hex: "#FFFDD0" },
      { name: "焦糖色", hex: "#D2691E" },
    ],
    formula: "复古红唇色 + 墨绿上衣 + 奶油白下装",
  },
  墨绿: {
    pairs: [
      { name: "复古红", hex: "#8B0000" },
      { name: "焦糖色", hex: "#D2691E" },
      { name: "珍珠白", hex: "#F8F8FF" },
    ],
    formula: "墨绿外套 + 珍珠白内搭 + 焦糖色包",
  },
  焦糖色: {
    pairs: [
      { name: "奶油白", hex: "#FFFDD0" },
      { name: "墨绿", hex: "#2F4F4F" },
      { name: "藏青", hex: "#191970" },
    ],
    formula: "焦糖色风衣 + 奶油白针织 + 墨绿裤装",
  },
  藏青: {
    pairs: [
      { name: "珍珠白", hex: "#F8F8FF" },
      { name: "焦糖色", hex: "#D2691E" },
      { name: "复古红", hex: "#8B0000" },
    ],
    formula: "藏青西装 + 珍珠白衬衫 + 焦糖色皮鞋",
  },
  克莱因蓝: {
    pairs: [
      { name: "金属银", hex: "#C0C0C0" },
      { name: "纯白", hex: "#FFFFFF" },
      { name: "亮橙色", hex: "#FF8A3D" },
    ],
    formula: "克莱因蓝外套 + 纯白内搭 + 金属银配饰",
  },
  荧光绿: {
    pairs: [
      { name: "经典黑", hex: "#1A1A1A" },
      { name: "金属银", hex: "#C0C0C0" },
      { name: "荧光粉", hex: "#FF4FA3" },
    ],
    formula: "荧光绿上衣 + 经典黑下装 + 金属银鞋",
  },
  金属银: {
    pairs: [
      { name: "克莱因蓝", hex: "#002FA7" },
      { name: "经典黑", hex: "#1A1A1A" },
      { name: "极光紫", hex: "#B57BFF" },
    ],
    formula: "金属银外套 + 经典黑内搭 + 克莱因蓝配饰",
  },
  极光紫: {
    pairs: [
      { name: "金属银", hex: "#C0C0C0" },
      { name: "荧光绿", hex: "#39FF14" },
      { name: "纯白", hex: "#FFFFFF" },
    ],
    formula: "极光紫上衣 + 金属银半裙 + 纯白鞋",
  },
};

const OUTFIT_PAIRING_SCENES = {
  日常基础: {
    default: ["周末早午餐", "城市漫步", "日常出行"],
    colors: {
      云朵白: ["周末咖啡", "城市漫步", "轻松约会"],
      雾霾蓝: ["通勤路上", "周末看展", "海边散步"],
      燕麦色: ["文艺市集", "周末野餐", "日常出行"],
      炭灰: ["城市通勤", "朋友聚会", "夜间散步"],
    },
  },
  甜美温柔: {
    default: ["甜蜜约会", "闺蜜下午茶", "春日野餐"],
    colors: {
      奶油白: ["温柔约会", "咖啡馆拍照", "日常出行"],
      樱花粉: ["浪漫约会", "樱花野餐", "闺蜜下午茶"],
      香芋紫: ["梦幻约会", "艺术展打卡", "下午茶"],
      浅鹅黄: ["春日野餐", "公园散步", "甜蜜约会"],
    },
  },
  通勤气质: {
    default: ["商务会议", "日常办公", "下班约会"],
    colors: {
      经典黑: ["商务会议", "日常办公", "下班约会"],
      珍珠白: ["商务会议", "客户提案", "日常办公"],
      高级灰: ["商务会议", "日常办公", "城市出差"],
      卡其色: ["客户提案", "城市通勤", "周末看展"],
    },
  },
  潮流个性: {
    default: ["街拍打卡", "音乐节", "夜间派对"],
    colors: {
      克莱因蓝: ["艺术展打卡", "街头拍摄", "夜间派对"],
      荧光绿: ["音乐节", "运动街区", "夜跑"],
      金属银: ["潮流派对", "品牌快闪", "街拍"],
      极光紫: ["音乐节", "夜间派对", "艺术展"],
    },
  },
  文艺复古: {
    default: ["美术馆漫步", "复古咖啡馆", "书店约会"],
    colors: {
      复古红: ["老电影约会", "复古咖啡馆", "画廊开幕"],
      墨绿: ["书店漫步", "森系野餐", "复古市集"],
      焦糖色: ["秋日漫步", "复古市集", "咖啡馆"],
      藏青: ["美术馆", "书店约会", "深夜电影"],
    },
  },
};

function getOutfitPairingScenes(styleKeyword, colorName) {
  const group = OUTFIT_PAIRING_SCENES[styleKeyword];
  if (!group) {
    return ["日常出行", "周末咖啡", "轻松约会"];
  }
  return group.colors?.[colorName] || group.default;
}

let currentOutfitSelection = {
  gender: "",
  height: 0,
  weight: 0,
  sceneKeyword: "日常",
  sceneLabel: "日常",
  sceneBodyKeyword: "日常",
  sceneBloggerContext: "日常",
  customScene: "",
  styleKeyword: "",
  styleLabel: "",
  styleTrait: "",
};

function buildDouyinSearchUrl(query) {
  return `https://www.douyin.com/search/${encodeURIComponent(query)}`;
}

function syncMakeupOptions(container, selectedValue) {
  container.querySelectorAll(".makeup-option").forEach((button) => {
    const isActive = button.dataset.value === selectedValue;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateMakeupSelection() {
  syncMakeupOptions(makeupFaceOptions, selectedFaceShape);
  syncMakeupOptions(makeupTypeOptions, selectedMakeupType);

  if (selectedFaceShape && selectedMakeupType) {
    const query = `${selectedFaceShape}${selectedMakeupType}教程`;
    makeupTutorialLink.setAttribute("href", `https://www.douyin.com/search/${query}`);
    makeupTutorialLink.classList.remove("is-disabled");
    makeupTutorialLink.classList.add("is-ready");
    makeupTutorialLink.setAttribute("aria-disabled", "false");
    makeupTutorialLink.tabIndex = 0;
    makeupCtaText.textContent = "去抖音看教程";
    makeupSummary.textContent = `${selectedFaceShape} · ${selectedMakeupType} · 搜索「${query}」`;
    makeupSummary.classList.add("is-ready");
    return;
  }

  makeupTutorialLink.setAttribute("href", "#");
  makeupTutorialLink.classList.remove("is-ready");
  makeupTutorialLink.classList.add("is-disabled");
  makeupTutorialLink.setAttribute("aria-disabled", "true");
  makeupTutorialLink.tabIndex = -1;
  makeupCtaText.textContent = "选择脸型与妆容";
  makeupSummary.classList.remove("is-ready");

  if (selectedFaceShape) {
    makeupSummary.textContent = `已选脸型：${selectedFaceShape} · 请选择妆容类型`;
  } else if (selectedMakeupType) {
    makeupSummary.textContent = `已选妆容：${selectedMakeupType} · 请选择脸型`;
  } else {
    makeupSummary.textContent = "请选择脸型与妆容类型";
  }
}

function getPhotoEnvironment(sceneLabel, isCustom = false) {
  if (isCustom) {
    return {
      title: `${sceneLabel} · 标志性入口 · 特色场景`,
      description: `围绕「${sceneLabel}」选择有辨识度的地标、色彩或装置，用环境元素强化画面主题。`,
      locationWord: "标志性入口",
    };
  }

  if (sceneLabel === "上班通勤") {
    return {
      title: "极简写字楼 · 咖啡厅 · 街角斑马线",
      description: "用玻璃幕墙、干净店面和斑马线的纵深感，拍出利落克制的城市通勤感。",
      locationWord: "写字楼",
    };
  }

  if (sceneLabel === "旅游度假") {
    return {
      title: "海边 · 自然风景区 · 特色街道",
      description: "让海风、自然光与在地街景进入画面，适合松弛、有呼吸感的环境人像。",
      locationWord: "海边",
    };
  }

  if (sceneLabel === "约会聚会") {
    return {
      title: "氛围餐厅 · 城市夜景 · 花店门口",
      description: "暖光与精致细节会自然放大约会气氛，适合半身近景和略带故事感的构图。",
      locationWord: "氛围餐厅",
    };
  }

  if (sceneLabel === "运动休闲") {
    return {
      title: "操场 · 公园跑道 · 城市天台",
      description: "用开阔场地、跑道线条和自然风制造轻盈感，适合抓拍与低机位构图。",
      locationWord: "公园跑道",
    };
  }

  return {
    title: "街角咖啡店 · 自然光窗边 · 城市步道",
    description: "选择干净背景与自然光，保留日常感，适合极简、不刻意的出片方式。",
    locationWord: "街角咖啡店",
  };
}

function getPhotoTimeline(sceneLabel, makeupType) {
  if (makeupType === "素颜") {
    return {
      title: "09:00–11:00 或 15:00–17:00 · 自然光",
      description: "上午 9:00–11:00 或 下午 15:00–17:00 的自然光最显皮肤通透，避开正午硬光。",
    };
  }

  if (makeupType === "浓妆") {
    if (sceneLabel === "上班通勤") {
      return {
        title: "18:00 之后 · 城市霓虹",
        description: "下班后的玻璃幕墙、车流与霓虹灯会强化浓妆轮廓，适合夜景人像与逆光轮廓。",
      };
    }
    if (sceneLabel === "旅游度假") {
      return {
        title: "18:00 之后 · 夜色街区",
        description: "夜市、灯光招牌与蓝调天空能让浓妆更有氛围，适合高对比夜景。",
      };
    }
    if (sceneLabel === "约会聚会") {
      return {
        title: "18:30 之后 · 夜景灯光",
        description: "餐厅暖光与城市霓虹叠加，突出眼妆和唇色，适合近景氛围照。",
      };
    }
    if (sceneLabel === "运动休闲") {
      return {
        title: "18:30 之后 · 蓝调时刻",
        description: "日落后天空呈蓝调，和城市灯光形成冷暖对比，浓妆也能保持精致。",
      };
    }
    return {
      title: "18:00 之后 · 夜景霓虹",
      description: "天色变暗后霓虹与车灯成为天然背景，浓妆在低光环境里更有存在感。",
    };
  }

  if (makeupType === "淡妆") {
    if (sceneLabel === "上班通勤") {
      return {
        title: "08:00–10:00 · 晨光通勤",
        description: "晨光柔和、街上人少，写字楼与咖啡厅的干净背景更适合淡妆。",
      };
    }
    if (sceneLabel === "旅游度假") {
      return {
        title: "16:00–18:00 · 黄金时刻",
        description: "侧逆光带来柔和金色轮廓，海边和自然风景在这个时段最出片。",
      };
    }
    if (sceneLabel === "约会聚会") {
      return {
        title: "16:00–18:00 · 黄昏暖调",
        description: "黄昏暖光能柔化妆面，餐厅与街景的灯刚亮起，氛围最自然。",
      };
    }
    if (sceneLabel === "运动休闲") {
      return {
        title: "08:00–10:00 · 清爽晨光",
        description: "清晨光线通透，操场和公园色彩干净，适合轻盈运动感。",
      };
    }
    return {
      title: "08:00–10:00 或 16:00–18:00 · 柔和光线",
      description: "晨光与黄昏都能柔化淡妆，选择低角度自然光，皮肤质感会更通透。",
    };
  }

  return {
    title: "建议补充妆容类型",
    description: "选择淡妆或浓妆后，会生成更准确的光线时间建议。",
  };
}

function getDefaultPhotoTimeWord(timeline) {
  const text = `${timeline.title} ${timeline.description}`;

  if (
    text.includes("夜景") ||
    text.includes("霓虹") ||
    text.includes("18:00 之后") ||
    text.includes("18:30 之后")
  ) {
    return "晚上";
  }
  if (
    text.includes("黄昏") ||
    text.includes("16:00") ||
    text.includes("15:00") ||
    text.includes("下午")
  ) {
    return "下午";
  }
  if (text.includes("中午") || text.includes("12:00")) {
    return "中午";
  }
  if (
    text.includes("早晨") ||
    text.includes("晨光") ||
    text.includes("08:00") ||
    text.includes("09:00")
  ) {
    return "早晨";
  }
  return "下午";
}

function syncPhotoTimeButtons() {
  photoGuideTimes.querySelectorAll(".photo-guide-time").forEach((button) => {
    const isActive = button.dataset.time === selectedPhotoTime;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function syncPhotoLocationButtons() {
  photoGuideLocations.querySelectorAll(".photo-guide-location").forEach((button) => {
    const isActive = button.dataset.location === selectedPhotoLocation;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updatePhotoGuide() {
  const activeScene = outfitResult.querySelector(".outfit-scene-button.is-active");
  const activeStyle = outfitResult.querySelector(".outfit-style-tag.is-active");
  const customScene = currentOutfitSelection.customScene.trim();
  const sceneLabel = customScene || (activeScene ? activeScene.dataset.sceneLabel : "");
  const genderLabel = currentGender || currentOutfitSelection.gender;

  syncPhotoTimeButtons();
  syncPhotoLocationButtons();

  if (!genderLabel || !sceneLabel || !activeStyle || !selectedFaceShape || !selectedMakeupType) {
    photoGuide.hidden = true;
    photoGuideCta.setAttribute("href", "#");
    photoGuideCta.classList.add("is-disabled");
    photoGuideCta.setAttribute("aria-disabled", "true");
    photoGuideCta.tabIndex = -1;
    return;
  }

  const styleLabel = activeStyle.dataset.styleLabel || "日常";
  const environment = getPhotoEnvironment(sceneLabel, Boolean(customScene));
  const timeline = getPhotoTimeline(sceneLabel, selectedMakeupType);
  const customScenery = photoGuideCustomScenery.value.trim();
  const finalLocation = selectedPhotoLocation || customScenery || environment.locationWord;
  const timeWord = selectedPhotoTime || getDefaultPhotoTimeWord(timeline);
  const searchQuery = `${genderLabel}${sceneLabel}${selectedMakeupType}${finalLocation}${timeWord}拍照出片`;

  photoGuideSceneTitle.textContent = environment.title;
  photoGuideEnvironment.textContent = environment.description;
  photoGuideTimeTitle.textContent = timeline.title;
  photoGuideTimeline.textContent = timeline.description;
  photoGuideSummary.textContent = `当前组合：${genderLabel} · ${sceneLabel} × ${styleLabel} · ${selectedFaceShape} / ${selectedMakeupType} · ${finalLocation} · ${timeWord} · 出片建议已同步更新。`;
  photoGuideCustomScenery.classList.toggle("has-value", Boolean(customScenery));
  photoGuideCustomHint.hidden = !customScenery;
  photoGuideCta.setAttribute("href", `https://www.douyin.com/search/${searchQuery}`);
  photoGuideCta.classList.remove("is-disabled");
  photoGuideCta.setAttribute("aria-disabled", "false");
  photoGuideCta.tabIndex = 0;
  photoGuide.hidden = false;
}

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return { key: "lean", label: "偏瘦" };
  }
  if (bmi < 24) {
    return { key: "normal", label: "匀称" };
  }
  if (bmi < 28) {
    return { key: "overweight", label: "微胖" };
  }
  return { key: "high", label: "偏胖" };
}

function buildOutfitAdvice(gender, bmi) {
  let title = "";
  let advice = "";
  let tags = [];

  if (gender === "male") {
    if (bmi < 18.5) {
      title = "轻量叠穿 · 增加量感";
      advice = "偏瘦身形适合用叠穿增加上半身量感。可以尝试衬衫叠穿 T 恤、挺括夹克搭配直筒裤，选择浅色或有纹理的面料，避开过于贴身的版型。";
      tags = ["叠穿层次", "浅色上衣", "直筒裤"];
    } else if (bmi < 24) {
      title = "城市休闲 · 干净利落";
      advice = "你的比例比较匀称，干净利落的城市休闲风最合适。基础 T 恤、衬衫搭配直筒牛仔裤或工装裤，再叠加一件质感外套，黑、灰、藏蓝都很稳。";
      tags = ["城市休闲", "质感外套", "基础色"];
    } else if (bmi < 28) {
      title = "深色纵向 · 利落显瘦";
      advice = "微胖身形适合深色系与直线条剪裁。V 领上衣、微宽松衬衫和直筒长裤能弱化横向视觉，尽量避开紧身款与过多口袋装饰。";
      tags = ["深色系", "V 领上衣", "直线条"];
    } else {
      title = "极简深色 · 合身有型";
      advice = "建议用低饱和深色打造纵向线条，选择垂坠感衬衫、轻薄外套和直筒裤。版型要合身而不紧绷，避免过厚面料和夸张廓形。";
      tags = ["低饱和", "纵向剪裁", "合身版型"];
    }
  } else if (gender === "female") {
    if (bmi < 18.5) {
      title = "层次配饰 · 轻法式";
      advice = "偏瘦身形适合用层次和配饰增加视觉分量。可以尝试短上衣叠穿、针织开衫配高腰阔腿裤，再用包袋或耳饰把整体造型丰富起来。";
      tags = ["短上衣", "高腰下装", "配饰点缀"];
    } else if (bmi < 24) {
      title = "高腰简约 · 通勤感";
      advice = "匀称身形适合突出腰线的简约风格。高腰直筒裤、A 字裙搭配合身上衣，外搭短款西装或风衣，奶油白、灰蓝与黑色都很耐看。";
      tags = ["强调腰线", "A 字裙", "简约通勤"];
    } else if (bmi < 28) {
      title = "深色收腰 · 纵向显瘦";
      advice = "微胖身形适合深色系和纵向线条。V 领、收腰连衣裙、高腰直筒裤与同色系搭配都能拉长比例，避免过紧、过短和堆积感强的设计。";
      tags = ["深色系", "收腰设计", "纵向线条"];
    } else {
      title = "垂坠长线 · 极简优雅";
      advice = "建议选择垂坠感好、剪裁干净的深色单品，用长线条外套和高腰下装构造纵向比例。避免繁复装饰和紧绷面料，简约合身最重要。";
      tags = ["垂坠面料", "长线条", "低饱和"];
    }
  }

  return { title, advice, tags };
}

function formatMeasurement(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(1)));
}

function renderOutfitPalette(styleKeyword = "", styleLabel = "") {
  const grid = outfitResult.querySelector("#outfitPaletteGrid");
  const label = outfitResult.querySelector("#outfitPaletteStyleLabel");
  const pairCard = outfitResult.querySelector("#outfitColorPairCard");
  if (!grid || !label) {
    return;
  }

  const colors = OUTFIT_COLOR_PALETTES[styleKeyword];

  if (!colors) {
    label.textContent = "等待选择风格";
    if (pairCard) {
      pairCard.hidden = true;
      pairCard.classList.remove("is-visible");
    }
    grid.innerHTML = `
      <div class="outfit-palette-empty">
        <span class="outfit-palette-empty-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span>选择一种风格，生成今日配色</span>
      </div>
    `;
    return;
  }

  label.textContent = `${styleLabel || styleKeyword} · ${colors.length} 色`;
  if (pairCard) {
    pairCard.hidden = false;
    pairCard.classList.remove("is-visible");
  }

  const pairColor = outfitResult.querySelector("#outfitColorPairColor");
  const pairContent = outfitResult.querySelector("#outfitColorPairContent");
  const pairHint = outfitResult.querySelector("#outfitColorPairHint");
  const pairDots = outfitResult.querySelector("#outfitColorPairDots");

  if (pairColor) {
    pairColor.textContent = "尚未选择色块";
  }
  if (pairContent) {
    pairContent.hidden = true;
  }
  if (pairHint) {
    pairHint.hidden = false;
    pairHint.textContent = "悬浮或点击色块，查看最佳搭配。";
  }
  if (pairDots) {
    pairDots.replaceChildren();
  }
  const pairSceneTags = outfitResult.querySelector("#outfitColorPairSceneTags");
  if (pairSceneTags) {
    pairSceneTags.replaceChildren();
  }

  grid.innerHTML = colors
    .map(
      (color, index) => `
        <button
          type="button"
          class="outfit-color-card"
          style="--palette-index: ${index}"
          data-color-name="${color.name}"
          data-color-hex="${color.hex}"
          aria-label="${color.name} ${color.hex}，查看最佳搭配"
          aria-controls="outfitColorPairCard"
        >
          <span class="outfit-color-swatch" style="--swatch-color: ${color.hex}">
            <span class="outfit-color-hex">${color.hex}</span>
          </span>
          <span class="outfit-color-name">${color.name}</span>
        </button>
      `,
    )
    .join("");

  grid.querySelectorAll(".outfit-color-card").forEach((card) => {
    const showPair = () => showOutfitColorPair(card);
    card.addEventListener("pointerenter", showPair);
    card.addEventListener("focus", showPair);
    card.addEventListener("click", showPair);
  });
}

function showOutfitColorPair(card) {
  const pairCard = outfitResult.querySelector("#outfitColorPairCard");
  const pairColor = outfitResult.querySelector("#outfitColorPairColor");
  const pairContent = outfitResult.querySelector("#outfitColorPairContent");
  const pairNames = outfitResult.querySelector("#outfitColorPairNames");
  const pairDots = outfitResult.querySelector("#outfitColorPairDots");
  const pairFormula = outfitResult.querySelector("#outfitColorPairFormula");
  const pairScenes = outfitResult.querySelector("#outfitColorPairSceneTags");
  const pairDouyin = outfitResult.querySelector("#outfitColorPairDouyin");
  const pairHint = outfitResult.querySelector("#outfitColorPairHint");

  const colorName = card.dataset.colorName;
  const colorHex = card.dataset.colorHex;
  const pairing = OUTFIT_COLOR_PAIRINGS[colorName];

  if (
    !pairCard ||
    !pairColor ||
    !pairContent ||
    !pairNames ||
    !pairDots ||
    !pairFormula ||
    !pairScenes ||
    !pairDouyin ||
    !pairHint
  ) {
    return;
  }

  if (!pairing) {
    pairContent.hidden = true;
    pairHint.hidden = false;
    pairHint.textContent = "这个颜色暂时没有搭配建议，换一个色块试试。";
    return;
  }

  outfitResult.querySelectorAll(".outfit-color-card").forEach((item) => {
    item.classList.toggle("is-pair-selected", item === card);
  });

  const sceneNames = getOutfitPairingScenes(currentOutfitSelection.styleKeyword, colorName);
  const searchQuery = `${colorName}${pairing.pairs.map((pair) => pair.name).join("")}女穿搭`;

  pairCard.hidden = false;
  pairCard.classList.add("is-visible");
  pairColor.textContent = `${colorName} ${colorHex}`;
  pairNames.textContent = `搭配推荐：${pairing.pairs.map((pair) => pair.name).join(" + ")}`;
  pairDots.innerHTML = pairing.pairs
    .map((pair) => `<i style="--pair-color: ${pair.hex}" title="${pair.name} ${pair.hex}"></i>`)
    .join("");
  pairFormula.textContent = `穿搭公式：${pairing.formula}`;
  pairScenes.innerHTML = sceneNames
    .map((scene) => `<span class="outfit-color-pair-scene">${scene}</span>`)
    .join("");
  pairDouyin.href = buildDouyinSearchUrl(searchQuery);
  pairContent.hidden = false;
  pairHint.hidden = true;
}

function renderOutfitResult({ bmi, category, gender, height, weight, title, advice, tags }) {
  const genderLabel = gender === "male" ? "男生" : "女生";
  currentGender = genderLabel;
  const tagMarkup = tags.map((tag) => `<span>${tag}</span>`).join("");

  currentOutfitSelection = {
    gender: genderLabel,
    height,
    weight,
    sceneKeyword: "日常",
    sceneLabel: "日常",
    sceneBodyKeyword: "日常",
    sceneBloggerContext: "日常",
    customScene: "",
    styleKeyword: "",
    styleLabel: "",
    styleTrait: "",
  };

  const sceneMarkup = OUTFIT_SCENES.map(
    (scene) => `
      <button
        type="button"
        class="outfit-scene-button"
        data-scene-keyword="${scene.keyword}"
        data-scene-label="${scene.label}"
        data-scene-body-keyword="${scene.bodyKeyword}"
        data-scene-blogger-context="${scene.bloggerContext}"
        aria-pressed="false"
      >
        <span class="outfit-scene-emoji" aria-hidden="true">${scene.icon}</span>
        <span class="outfit-scene-name">${scene.label}</span>
        <span class="outfit-scene-indicator" aria-hidden="true"></span>
      </button>
    `,
  ).join("");

  const styleMarkup = OUTFIT_STYLES.map(
    (style) => `
      <button
        type="button"
        class="outfit-style-tag"
        data-style-keyword="${style.keyword}"
        data-style-label="${style.label}"
        data-style-trait="${style.trait}"
        aria-pressed="false"
      >${style.label}</button>
    `,
  ).join("");

  outfitResult.innerHTML = `
    <article class="outfit-advice-card outfit-advice-card--${category.key}">
      <div class="outfit-advice-top">
        <div class="bmi-badge">
          <span>BMI</span>
          <strong>${bmi.toFixed(1)}</strong>
        </div>
        <div class="outfit-advice-heading">
          <p class="eyebrow">STYLE BRIEF</p>
          <h3>${title}</h3>
          <p class="outfit-advice-meta">${genderLabel} · ${formatMeasurement(height)}cm / ${formatMeasurement(weight)}kg · ${category.label}</p>
        </div>
      </div>
      <p class="outfit-advice-text">${advice}</p>

      <section class="outfit-palette-block" aria-labelledby="outfitPaletteTitle">
        <div class="outfit-palette-head">
          <div>
            <p class="eyebrow">DAILY COLOR</p>
            <h4 id="outfitPaletteTitle">今日色彩美学</h4>
          </div>
          <span class="outfit-palette-style" id="outfitPaletteStyleLabel">等待选择风格</span>
        </div>
        <div class="outfit-palette-grid" id="outfitPaletteGrid"></div>
        <div class="outfit-color-pair-card" id="outfitColorPairCard" aria-live="polite" hidden>
          <div class="outfit-color-pair-head">
            <span class="outfit-color-pair-kicker">PAIRING IDEA</span>
            <span class="outfit-color-pair-color" id="outfitColorPairColor">尚未选择色块</span>
          </div>
          <div class="outfit-color-pair-content" id="outfitColorPairContent" hidden>
            <p class="outfit-color-pair-names" id="outfitColorPairNames"></p>
            <div class="outfit-color-pair-dots" id="outfitColorPairDots" aria-hidden="true"></div>
            <p class="outfit-color-pair-formula" id="outfitColorPairFormula"></p>
            <div class="outfit-color-pair-scenes">
              <span class="outfit-color-pair-scenes-label">✨ 适合场景：</span>
              <div class="outfit-color-pair-scene-tags" id="outfitColorPairSceneTags"></div>
            </div>
            <a
              class="outfit-color-pair-douyin"
              id="outfitColorPairDouyin"
              href="https://www.douyin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >📱 去抖音看博主真实搭配</a>
          </div>
          <p class="outfit-color-pair-hint" id="outfitColorPairHint">悬浮或点击色块，查看最佳搭配。</p>
        </div>
      </section>

      <div class="outfit-tags">${tagMarkup}</div>

      <div class="outfit-scene-block">
        <p class="outfit-scene-title">第一步 · 选择场景</p>
        <div class="outfit-scenes">${sceneMarkup}</div>
        <input
          class="outfit-custom-scene"
          id="outfitCustomScene"
          type="text"
          maxlength="24"
          autocomplete="off"
          placeholder="或者输入自定义场景（如：游乐园、看演唱会）"
          aria-label="自定义场景"
        />
      </div>

      <div class="outfit-style-block">
        <p class="outfit-scene-title">第二步 · 选择风格</p>
        <div class="outfit-style-tags">${styleMarkup}</div>
        <p class="outfit-style-hint" role="status" aria-live="polite">先选择场景，再选择风格；未选场景时默认「日常」。选择完成后将在下方生成匹配结果。</p>
      </div>

      <p class="outfit-advice-foot">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.4"/>
          <path d="M12 11.2v5M12 8.1v.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        建议由 BMI = 体重 ÷ 身高² 计算生成，仅供日常穿搭参考。
      </p>
    </article>

    <div class="outfit-match-container" id="outfitMatchContainer">
      <div class="outfit-match-empty">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3.5 13.9 8.1 18.5 10l-4.6 1.9L12 16.5l-1.9-4.6L5.5 10l4.6-1.9L12 3.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
          <path d="M18.5 15.5v4M16.5 17.5h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <p>选择场景和风格后，这里会生成 3 个匹配的抖音搜索入口。</p>
      </div>
    </div>
  `;

  renderOutfitPalette("", "");
}

outfitForm.addEventListener("submit", (event) => {
  event.preventDefault();

  heightInput.classList.remove("is-invalid");
  weightInput.classList.remove("is-invalid");
  genderField.classList.remove("is-invalid");
  outfitStatus.classList.remove("is-error");

  const height = Number.parseFloat(heightInput.value);
  const weight = Number.parseFloat(weightInput.value);
  const selectedGender = document.querySelector('input[name="outfitGender"]:checked');
  const messages = [];
  let firstInvalid = null;

  if (!Number.isFinite(height) || height < 80 || height > 250) {
    heightInput.classList.add("is-invalid");
    messages.push("身高请填写 80–250 cm 之间的数值。");
    firstInvalid = firstInvalid || heightInput;
  }

  if (!Number.isFinite(weight) || weight < 20 || weight > 300) {
    weightInput.classList.add("is-invalid");
    messages.push("体重请填写 20–300 kg 之间的数值。");
    firstInvalid = firstInvalid || weightInput;
  }

  if (!selectedGender) {
    genderField.classList.add("is-invalid");
    messages.push("请选择性别。");
  }

  if (messages.length > 0) {
    outfitStatus.textContent = messages.join(" ");
    outfitStatus.classList.add("is-error");
    if (firstInvalid) {
      firstInvalid.focus();
    } else {
      genderInputs[0].focus();
    }
    return;
  }

  const bmi = weight / Math.pow(height / 100, 2);
  const category = getBmiCategory(bmi);
  const { title, advice, tags } = buildOutfitAdvice(selectedGender.value, bmi);

  renderOutfitResult({
    bmi,
    category,
    gender: selectedGender.value,
    height,
    weight,
    title,
    advice,
    tags,
  });

  outfitStatus.textContent = "";
  outfitStatus.classList.remove("is-error");

  if (window.matchMedia("(max-width: 760px)").matches) {
    outfitResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

[heightInput, weightInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("is-invalid");
    if (outfitStatus.classList.contains("is-error")) {
      outfitStatus.textContent = "";
      outfitStatus.classList.remove("is-error");
    }
  });
});

genderInputs.forEach((input) => {
  input.addEventListener("change", () => {
    currentGender = input.value === "female" ? "女生" : "男生";
    genderField.classList.remove("is-invalid");
    if (outfitStatus.classList.contains("is-error")) {
      outfitStatus.textContent = "";
      outfitStatus.classList.remove("is-error");
    }
    updatePhotoGuide();
  });
});

function setOutfitStyleHint(message) {
  const hint = outfitResult.querySelector(".outfit-style-hint");
  if (hint) {
    hint.textContent = message;
  }
}

function renderOutfitMatch() {
  const container = outfitResult.querySelector(".outfit-match-container");
  if (!container || !currentOutfitSelection.styleKeyword) {
    return;
  }

  const {
    gender,
    height,
    weight,
    sceneKeyword,
    sceneLabel,
    sceneBodyKeyword,
    sceneBloggerContext,
    styleKeyword,
    styleTrait,
  } = currentOutfitSelection;

  const sceneDisplay = sceneKeyword === "日常" ? "日常（默认）" : sceneLabel;
  const heightText = formatMeasurement(height);
  const weightText = formatMeasurement(weight);
  const matchItems = [
    {
      number: "01",
      title: "场景 × 风格",
      query: `${sceneLabel} ${styleKeyword} 穿搭`,
    },
    {
      number: "02",
      title: "身材数据",
      query: `${heightText}cm ${weightText}kg ${gender} ${sceneBodyKeyword}穿搭`,
    },
    {
      number: "03",
      title: "风格博主",
      query: `${styleTrait} ${sceneBloggerContext} 博主`,
    },
  ];

  const linksMarkup = matchItems
    .map(
      (item) => `
        <a
          class="outfit-match-link"
          href="${buildDouyinSearchUrl(item.query)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在抖音搜索${item.query}（新标签页打开）"
        >
          <span class="outfit-match-index">${item.number}</span>
          <span class="outfit-match-copy">
            <strong>${item.title}</strong>
            <small>${item.query}</small>
          </span>
          <svg class="outfit-match-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      `,
    )
    .join("");

  container.innerHTML = `
    <section class="outfit-match" aria-labelledby="outfitMatchTitle">
      <div class="outfit-match-head">
        <div>
          <p class="eyebrow">MATCH RESULT</p>
          <h4 id="outfitMatchTitle">匹配结果</h4>
        </div>
        <span>03 SEARCHES</span>
      </div>
      <p class="outfit-match-summary">
        ${gender} · ${sceneDisplay} × ${styleKeyword} · ${heightText}cm / ${weightText}kg
      </p>
      <div class="outfit-match-links">${linksMarkup}</div>
      <p class="outfit-match-note">
        基于当前选择与身体数据生成，点击任意搜索按钮将在新标签页打开抖音。
      </p>
    </section>
  `;

  updatePhotoGuide();
}

outfitResult.addEventListener("click", (event) => {
  const sceneButton = event.target.closest(".outfit-scene-button");

  if (sceneButton) {
    event.preventDefault();
    currentOutfitSelection.customScene = "";

    const customSceneInput = outfitResult.querySelector("#outfitCustomScene");
    if (customSceneInput) {
      customSceneInput.value = "";
      customSceneInput.classList.remove("has-value");
    }

    currentOutfitSelection.sceneKeyword = sceneButton.dataset.sceneKeyword;
    currentOutfitSelection.sceneLabel = sceneButton.dataset.sceneLabel;
    currentOutfitSelection.sceneBodyKeyword = sceneButton.dataset.sceneBodyKeyword;
    currentOutfitSelection.sceneBloggerContext = sceneButton.dataset.sceneBloggerContext;

    outfitResult.querySelectorAll(".outfit-scene-button").forEach((button) => {
      const isActive = button === sceneButton;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    const activeStyle = outfitResult.querySelector(".outfit-style-tag.is-active");

    if (activeStyle) {
      currentOutfitSelection.styleKeyword = activeStyle.dataset.styleKeyword;
      currentOutfitSelection.styleLabel = activeStyle.dataset.styleLabel;
      currentOutfitSelection.styleTrait = activeStyle.dataset.styleTrait;
      renderOutfitMatch();
      setOutfitStyleHint(
        `已更新为：${currentOutfitSelection.sceneLabel} × ${currentOutfitSelection.styleLabel} · 匹配结果已生成。`,
      );
    } else {
      setOutfitStyleHint(
        `当前场景：${currentOutfitSelection.sceneLabel} · 下一步选择风格。`,
      );
    }
    updatePhotoGuide();
    return;
  }

  const styleTag = event.target.closest(".outfit-style-tag");
  if (!styleTag) {
    return;
  }

  currentOutfitSelection.styleKeyword = styleTag.dataset.styleKeyword;
  currentOutfitSelection.styleLabel = styleTag.dataset.styleLabel;
  currentOutfitSelection.styleTrait = styleTag.dataset.styleTrait;

  renderOutfitPalette(currentOutfitSelection.styleKeyword, currentOutfitSelection.styleLabel);

  outfitResult.querySelectorAll(".outfit-style-tag").forEach((tag) => {
    const isActive = tag === styleTag;
    tag.classList.toggle("is-active", isActive);
    tag.setAttribute("aria-pressed", String(isActive));
  });

  renderOutfitMatch();

  const sceneDisplay =
    currentOutfitSelection.sceneKeyword === "日常"
      ? "日常（默认）"
      : currentOutfitSelection.sceneLabel;
  setOutfitStyleHint(
    `已生成匹配结果：${sceneDisplay} × ${currentOutfitSelection.styleLabel}。`,
  );
  updatePhotoGuide();
});

outfitResult.addEventListener("input", (event) => {
  if (!event.target.matches("#outfitCustomScene")) {
    return;
  }

  const customValue = event.target.value.trim();
  event.target.classList.toggle("has-value", Boolean(customValue));
  currentOutfitSelection.customScene = customValue;
  currentOutfitSelection.sceneKeyword = customValue || "日常";
  currentOutfitSelection.sceneLabel = customValue || "日常";
  currentOutfitSelection.sceneBodyKeyword = customValue || "日常";
  currentOutfitSelection.sceneBloggerContext = customValue || "日常";

  if (customValue) {
    outfitResult.querySelectorAll(".outfit-scene-button").forEach((button) => {
      button.classList.remove("is-active");
      button.setAttribute("aria-pressed", "false");
    });
  }

  const activeStyle = outfitResult.querySelector(".outfit-style-tag.is-active");

  if (activeStyle) {
    currentOutfitSelection.styleKeyword = activeStyle.dataset.styleKeyword;
    currentOutfitSelection.styleLabel = activeStyle.dataset.styleLabel;
    currentOutfitSelection.styleTrait = activeStyle.dataset.styleTrait;
    renderOutfitMatch();

    setOutfitStyleHint(
      customValue
        ? `已切换为自定义场景：${customValue} × ${currentOutfitSelection.styleLabel} · 匹配结果已更新。`
        : "已清空自定义场景，当前使用默认「日常」场景。",
    );
  } else if (customValue) {
    setOutfitStyleHint(`已使用自定义场景：${customValue} · 下一步选择风格。`);
  } else {
    setOutfitStyleHint("已清空自定义场景 · 请选择场景或输入自定义场景。");
  }

  updatePhotoGuide();
});

makeupFaceOptions.addEventListener("click", (event) => {
  const option = event.target.closest(".makeup-option");
  if (!option) {
    return;
  }

  selectedFaceShape = option.dataset.value || "";
  updateMakeupSelection();
  updatePhotoGuide();
});

makeupTypeOptions.addEventListener("click", (event) => {
  const option = event.target.closest(".makeup-option");
  if (!option) {
    return;
  }

  selectedMakeupType = option.dataset.value || "";
  updateMakeupSelection();
  updatePhotoGuide();
});

makeupTutorialLink.addEventListener("click", (event) => {
  if (!selectedFaceShape || !selectedMakeupType) {
    event.preventDefault();
  }
});

photoGuideCta.addEventListener("click", (event) => {
  if (photoGuideCta.classList.contains("is-disabled")) {
    event.preventDefault();
  }
});

photoGuideCustomScenery.addEventListener("input", () => {
  const customValue = photoGuideCustomScenery.value.trim();

  if (customValue) {
    selectedPhotoLocation = "";
  }

  syncPhotoLocationButtons();
  updatePhotoGuide();
});

photoGuideLocations.addEventListener("click", (event) => {
  const button = event.target.closest(".photo-guide-location");
  if (!button) {
    return;
  }

  selectedPhotoLocation = button.dataset.location || "";
  photoGuideCustomScenery.value = "";
  photoGuideCustomScenery.classList.remove("has-value");
  photoGuideCustomHint.hidden = true;
  syncPhotoLocationButtons();
  updatePhotoGuide();
});

photoGuideTimes.addEventListener("click", (event) => {
  const button = event.target.closest(".photo-guide-time");
  if (!button) {
    return;
  }

  selectedPhotoTime = button.dataset.time || "";
  syncPhotoTimeButtons();
  updatePhotoGuide();
});

// 弹窗外点击关闭
function closeOnBackdropClick(dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) {
      return;
    }

    const rect = dialog.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside) {
      dialog.close();
    }
  });
}

// 初始化本地存储状态与列表数据
if (!checkStorage()) {
  storageStatus.classList.add("status--error");
  storageStatusText.textContent = "本地存储不可用";
}

renderFriends();
renderTodos();
renderMemories();
renderAccountMembers();
updateHomeStats();
inspirationIndex = Math.floor(Math.random() * INSPIRATION_QUOTES.length);
renderInspiration();
renderWallet();
updateMakeupSelection();
updatePhotoGuide();
updateClock();
window.setInterval(updateClock, 1000);
switchView("home");
closeOnBackdropClick(errorDialog);

window.addEventListener("beforeunload", () => {
  memories.forEach((memory) => {
    if (memory.url && memory.url.startsWith("blob:")) {
      URL.revokeObjectURL(memory.url);
    }
  });

  if (pendingMemoryFile) {
    URL.revokeObjectURL(pendingMemoryFile.url);
  }
});

// 多个标签页之间同步朋友、待办与回忆元数据
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) {
    friends = loadFriends();
    renderFriends();
  }

  if (event.key === TODO_STORAGE_KEY) {
    todos = loadTodos();
    renderTodos();
  }

  if (event.key === MEMORY_STORAGE_KEY) {
    memories.forEach((memory) => {
      if (memory.url && memory.url.startsWith("blob:")) {
        URL.revokeObjectURL(memory.url);
      }
    });
    memories = loadMemories();
    renderMemories();
  }

  if (event.key === MEMBERS_STORAGE_KEY) {
    members = loadMembers();
    renderAccountMembers();
  }

  if (event.key === EXPENSES_STORAGE_KEY) {
    expenses = loadExpenses();
    renderWallet();
  }

  if (event.key === WALLET_BUDGET_STORAGE_KEY) {
    walletBudget = loadWalletBudget();
    renderWallet();
  }
});

// 清理已移除的音乐模块遗留数据，不影响其他本地存储。
(function cleanupRemovedMusicData() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("aurora.music."))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Local storage can be unavailable in restricted browser contexts.
  }

  try {
    if ("indexedDB" in window) {
      indexedDB.deleteDatabase("aurora.music.v1");
    }
  } catch {
    // Nothing to remove when IndexedDB is unavailable.
  }
})();

// 清理已删除的恋爱与周期模块遗留数据，不影响核心工作台数据。
(function cleanupRemovedRomanticData() {
  const removedKeys = [
    "aurora.mood.v1",
    "aurora.countdown.v1",
    "aurora.love.start.v1",
    "aurora.moon.lastPeriod.v1",
    "aurora.moon.cycle.v1",
    "aurora.moon.symptoms.v1",
    "aurora.herProfile.v1",
    "aurora.timeCapsules.v1",
  ];

  try {
    removedKeys.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Local storage can be unavailable in restricted browser contexts.
  }
})();


