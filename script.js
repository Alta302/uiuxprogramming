const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const editEmailButton = document.querySelector("#editEmailButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

let isSubscribed = false;

function showSubscribeMessage(message, result) {
    subscribeMessage.textContent = message;
    subscribeMessage.classList.remove("is-success", "is-error");

    if (result === "success") {
        subscribeMessage.classList.add("is-success");
    } else if (result === "error") {
        subscribeMessage.classList.add("is-error");
    }
}

function handleSubscribe(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    emailInput.value = email;

    if (isSubscribed === true) {
        showSubscribeMessage("이미 알림 신청을 완료했습니다.", "success");
        return;
    }

    if (email === "") {
        showSubscribeMessage("이메일 주소를 먼저 입력해 주세요.", "error");
        emailInput.focus();
        return;
    }

    if (!emailInput.checkValidity()) {
        showSubscribeMessage("올바른 이메일 주소를 입력해 주세요.", "error");
        emailInput.focus();
        return;
    }

    isSubscribed = true;
    showSubscribeMessage(
        `${email} 주소로 알림 신청이 완료되었습니다. (화면 시연용이며 실제 이메일은 발송되지 않습니다.)`,
        "success"
    );
    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;
    emailInput.readOnly = true;
    editEmailButton.hidden = false;
}

function handleEditEmail() {
    isSubscribed = false;
    emailInput.readOnly = false;
    subscribeButton.disabled = false;
    subscribeButton.textContent = "소비기한 알림 신청하기";
    editEmailButton.hidden = true;
    showSubscribeMessage("이메일 주소를 수정한 뒤 다시 신청해 주세요.");
    emailInput.focus();
}

subscribeForm.addEventListener("submit", handleSubscribe);
editEmailButton.addEventListener("click", handleEditEmail);
console.log("신선노트 JavaScript가 연결되었습니다.");

// 6주차: input과 change에서 준비 상태를 갱신하고 click으로 결과를 표시합니다.
const ingredientName = document.querySelector("#ingredientName");
const ingredientCount = document.querySelector("#ingredientCount");
const reminderCheck = document.querySelector("#reminderCheck");
const previewButton = document.querySelector("#previewButton");
const previewMessage = document.querySelector("#previewMessage");

function updatePreviewState() {
    const hasName = ingredientName.value.trim() !== "";
    const isReady = hasName && reminderCheck.checked;
    previewButton.disabled = !isReady;
    previewButton.textContent = "알림 미리보기";
    previewMessage.classList.remove("is-success");
    previewMessage.classList.toggle("is-ready", isReady);

    if (!hasName) {
        previewMessage.textContent = "식재료 이름을 입력하고 알림 옵션을 선택해 주세요.";
    } else if (!reminderCheck.checked) {
        previewMessage.textContent = "소비기한 3일 전 알림 옵션을 선택해 주세요.";
    } else {
        previewMessage.textContent = `${ingredientName.value.trim()}의 알림을 미리 볼 수 있습니다.`;
    }
}

function handleIngredientInput() {
    const length = ingredientName.value.length;
    const hasName = ingredientName.value.trim() !== "";
    ingredientCount.textContent = `${length} / 10자 · ${hasName ? "입력한 식재료로 안내합니다." : "식재료 이름을 입력해 주세요."}`;
    ingredientCount.classList.toggle("is-ready", hasName);
    updatePreviewState();
}

function handlePreviewClick() {
    if (ingredientName.value.trim() === "" || !reminderCheck.checked) {
        updatePreviewState();
        return;
    }
    previewMessage.textContent = `[미리보기] ${ingredientName.value.trim()}의 소비기한이 3일 남았습니다. 먼저 확인해 주세요. (실제 알림은 예약되지 않습니다.)`;
    previewMessage.classList.remove("is-ready");
    previewMessage.classList.add("is-success");
    previewButton.textContent = "미리보기 완료";
    previewButton.disabled = true;
}

ingredientName.addEventListener("input", handleIngredientInput);
reminderCheck.addEventListener("change", updatePreviewState);
previewButton.addEventListener("click", handlePreviewClick);
handleIngredientInput();

// 6주차: 선택한 탭과 연결된 패널만 활성화합니다.
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function activateTab(selectedTab) {
    tabs.forEach(function (tab) {
        const isSelected = tab === selectedTab;
        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
    });
    panels.forEach(function (panel) {
        const isSelected = `#${panel.id}` === selectedTab.dataset.target;
        panel.classList.toggle("is-active", isSelected);
        panel.hidden = !isSelected;
    });
}

function handleTabClick(event) {
    activateTab(event.currentTarget);
}

// 방향키와 Home/End로도 탭을 선택할 수 있습니다.
function handleTabKeydown(event) {
    const index = Array.from(tabs).indexOf(event.currentTarget);
    let nextIndex;
    if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
        nextIndex = 0;
    } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
    } else {
        return;
    }
    event.preventDefault();
    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
}

tabs.forEach(function (tab) {
    tab.addEventListener("click", handleTabClick);
    tab.addEventListener("keydown", handleTabKeydown);
});

const registrationForm = document.querySelector('#registrationForm');
const registrationFields = document.querySelector('#registrationFields');
const registrationSteps = document.querySelectorAll('.registration-step');
const registrationProgress = document.querySelector('#registrationProgress');
const registrationRestart = document.querySelector('#registrationRestart');
const registrationComplete = document.querySelector('#registrationComplete');
const registrationStatus = document.querySelector('#registrationStatus');
const foodName = document.querySelector('#foodName');
const expiryDate = document.querySelector('#expiryDate');
const reminderTiming = document.querySelector('#reminderTiming');
const addMemo = document.querySelector('#addMemo');
const storageMemo = document.querySelector('#storageMemo');
const registrationSummary = document.querySelector('#registrationSummary');
const registrationResult = document.querySelector('#registrationResult');
const registrationLabels = ['시작', '식재료 입력', '알림과 메모', '내용 확인', '완료'];
let registrationStep = 0;
let isSubmitting = false;
let lastSavedId = null;

const inventoryStorageKey = 'freshnote.inventory.v1';
let inventoryItems = [];
const inventory = document.querySelector('#inventory');
const storedFoodList = document.querySelector('#storedFoodList');
const consumedFoodList = document.querySelector('#consumedFoodList');
const inventoryFeedback = document.querySelector('#inventoryFeedback');

function todayString() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function reminderDateString() {
    const date = new Date(`${expiryDate.value}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() - Number(reminderTiming.value));
    return date.toISOString().slice(0, 10);
}

function showRegistrationStep(step) {
    if (isSubmitting) return;
    registrationStep = step;
    registrationSteps.forEach(function (panel) {
        panel.hidden = Number(panel.dataset.step) !== step;
    });
    registrationProgress.textContent = `${step + 1} / 5 · ${registrationLabels[step]}`;
    registrationRestart.hidden = step === 0;
    document.querySelector(`.registration-step[data-step="${step}"] h3`).focus();
}

function setRegistrationError(field, message) {
    document.querySelector(`#${field.id}Error`).textContent = message;
    if (message) {
        field.setAttribute('aria-invalid', 'true');
        field.classList.remove('is-valid');
    } else {
        field.removeAttribute('aria-invalid');
    }
}

function getRegistrationError(field) {
    const value = field.value.trim();
    if (field === foodName) {
        if (!value) return '식재료 이름을 입력해 주세요. 예: 두부, 쌀';
        if (value.length > 20) return '식재료 이름을 20자 이내로 줄여 주세요.';
    } else if (field === expiryDate) {
        expiryDate.min = todayString();
        if (!value) return '포장에 적힌 소비기한을 선택해 주세요.';
        if (!field.validity.valid) return '소비기한을 오늘 또는 이후의 올바른 날짜로 선택해 주세요.';
    } else if (field === reminderTiming) {
        if (!['3', '1', '0'].includes(value)) return '3일 전, 1일 전, 당일 중 알림 시점을 선택해 주세요.';
        if (!getRegistrationError(expiryDate) && reminderDateString() < todayString()) {
            return '알림 날짜가 이미 지났습니다. 더 가까운 시점이나 소비기한 당일로 바꿔 주세요.';
        }
    } else if (field === storageMemo && !field.disabled) {
        if (!value) return '보관 메모를 입력하거나 ‘보관 메모 남기기’를 해제해 주세요.';
        if (value.length < 2) return '보관 위치나 주의할 점을 2자 이상 입력해 주세요.';
        if (value.length > 80) return '보관 메모를 80자 이내로 줄여 주세요.';
    }
    return '';
}

function updateFieldFeedback(field) {
    const error = getRegistrationError(field);
    const valid = !field.disabled && !!field.value.trim() && !error;
    field.classList.toggle('is-valid', valid);
    if (field.hasAttribute('aria-invalid')) setRegistrationError(field, error);
    if (field === foodName || field === storageMemo) {
        const limit = field === foodName ? 20 : 80;
        const hint = field === foodName ? '식재료 이름을 입력해 주세요.' : '메모를 2자 이상 입력해 주세요.';
        const status = document.querySelector(`#${field.id}Status`);
        status.textContent = `${field.value.length} / ${limit}자 · ${valid ? '입력 조건을 충족했습니다.' : hint}`;
        status.classList.toggle('is-valid', valid);
    }
}

function syncMemoField() {
    document.querySelector('#memoFields').hidden = !addMemo.checked;
    addMemo.setAttribute('aria-expanded', String(addMemo.checked));
    storageMemo.disabled = !addMemo.checked;
    storageMemo.required = addMemo.checked;
    setRegistrationError(storageMemo, '');
    updateFieldFeedback(storageMemo);
}

function validateFields(fields, step) {
    const errors = fields.map(function (field) {
        const message = getRegistrationError(field);
        setRegistrationError(field, message);
        updateFieldFeedback(field);
        return { field, message };
    });
    const firstError = errors.find(function (entry) { return entry.message; });
    if (firstError) {
        if (registrationStep !== step) showRegistrationStep(step);
        firstError.field.focus();
        return false;
    }
    return true;
}

function validateFood() {
    return validateFields([foodName, expiryDate], 1);
}

function validateTiming() {
    return validateFields([reminderTiming, storageMemo], 2);
}

function validateRegistration() {
    return validateFood() && validateTiming();
}

function collectRegistration() {
    const data = new FormData(registrationForm);
    return {
        name: data.get('foodName').trim(),
        expiryDate: data.get('expiryDate'),
        timingLabel: reminderTiming.selectedOptions[0].textContent,
        reminderDate: reminderDateString(),
        memo: (data.get('storageMemo') || '').trim()
    };
}

function renderRegistrationSummary(target, data) {
    const values = [
        ['식재료', data.name],
        ['소비기한', data.expiryDate],
        ['알림 시점', data.timingLabel],
        ['알림 예정일 (시연)', data.reminderDate],
        ['보관 메모', data.memo || '메모 없음']
    ];
    target.replaceChildren();
    values.forEach(function ([label, value]) {
        const term = document.createElement('dt');
        const detail = document.createElement('dd');
        term.textContent = label;
        detail.textContent = value;
        target.append(term, detail);
    });
}

function setSubmissionState(state, message = '') {
    isSubmitting = state === 'loading';
    registrationForm.setAttribute('aria-busy', String(isSubmitting));
    registrationFields.disabled = isSubmitting;
    registrationComplete.disabled = isSubmitting || state === 'success';
    registrationComplete.textContent = isSubmitting ? '저장 중…'
        : state === 'error' ? '다시 저장하기' : '확인한 내용으로 저장하기';
    registrationStatus.hidden = state === 'idle';
    registrationStatus.classList.toggle('is-error', state === 'error');
    registrationStatus.classList.toggle('is-success', state === 'success');
    registrationStatus.textContent = isSubmitting ? '식재료를 저장하고 있습니다. 잠시 기다려 주세요.'
        : state === 'success' ? '저장했습니다. 보관 목록에서 식재료를 확인해 보세요.' : message;
}

function goToTiming() {
    if (isSubmitting || registrationStep !== 1 || !validateFood()) return;
    showRegistrationStep(2);
}

function goToReview() {
    if (isSubmitting || registrationStep !== 2 || !validateRegistration()) return;
    renderRegistrationSummary(registrationSummary, collectRegistration());
    showRegistrationStep(3);
}

function readStoredInventory() {
    const raw = localStorage.getItem(inventoryStorageKey);
    const items = raw === null ? [] : JSON.parse(raw);
    const valid = Array.isArray(items) && items.every(function (item) {
        return item && Number.isSafeInteger(item.id) && item.id > 0
            && typeof item.name === 'string' && item.name.trim().length > 0
            && typeof item.expiryDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.expiryDate)
            && typeof item.timingLabel === 'string' && typeof item.reminderDate === 'string'
            && typeof item.memo === 'string' && typeof item.consumed === 'boolean';
    });
    if (!valid || new Set(items.map(function (item) { return item.id; })).size !== items.length) {
        throw new SyntaxError('Invalid inventory data');
    }
    return items;
}

function saveInventory(items) {
    localStorage.setItem(inventoryStorageKey, JSON.stringify(items));
    inventoryItems = items;
    renderInventory();
}

function storageFailureMessage(error) {
    if (error instanceof SyntaxError) {
        return '기존 보관 목록을 읽지 못했습니다. 입력 내용은 유지됩니다. 브라우저의 이 사이트 저장 데이터를 확인한 뒤 다시 시도해 주세요.';
    }
    return '브라우저에 저장하지 못했습니다. 입력 내용은 유지됩니다. 저장 허용 설정이나 남은 저장 공간을 확인한 뒤 다시 시도해 주세요.';
}

async function handleRegistrationSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    if (registrationStep === 1) return goToTiming();
    if (registrationStep === 2) return goToReview();
    if (registrationStep !== 3 || !validateRegistration()) return;
    const data = collectRegistration();
    setSubmissionState('loading');
    try {
        await new Promise(function (resolve) { setTimeout(resolve, 450); });
        const items = readStoredInventory();
        const id = items.reduce(function (max, item) { return Math.max(max, item.id); }, 0) + 1;
        const item = { ...data, id, consumed: false };
        saveInventory([...items, item]);
        lastSavedId = id;
        renderRegistrationSummary(registrationResult, data);
        setSubmissionState('success');
        showRegistrationStep(4);
        inventoryFeedback.classList.remove('is-error');
        inventoryFeedback.textContent = `보관 목록에 ‘${data.name}’ 항목을 저장했습니다.`;
    } catch (error) {
        setSubmissionState('error', storageFailureMessage(error));
    }
}

registrationForm.addEventListener('submit', handleRegistrationSubmit);
document.querySelector('#foodNext').addEventListener('click', goToTiming);
document.querySelector('#timingNext').addEventListener('click', goToReview);

document.querySelector('#registrationStart').addEventListener('click', function () {
    if (isSubmitting) return;
    expiryDate.min = todayString();
    setSubmissionState('idle');
    showRegistrationStep(1);
});

document.querySelectorAll('#registration [data-back]').forEach(function (button) {
    button.addEventListener('click', function () {
        if (isSubmitting) return;
        setSubmissionState('idle');
        showRegistrationStep(Number(button.dataset.back));
    });
});

[foodName, expiryDate, reminderTiming, storageMemo].forEach(function (field) {
    field.addEventListener(field === reminderTiming ? 'change' : 'input', function () {
        updateFieldFeedback(field);
        if (field === expiryDate) updateFieldFeedback(reminderTiming);
    });
});
addMemo.addEventListener('change', syncMemoField);

registrationRestart.addEventListener('click', function () {
    if (isSubmitting) return;
    registrationForm.reset();
    lastSavedId = null;
    [foodName, expiryDate, reminderTiming, storageMemo].forEach(function (field) {
        setRegistrationError(field, '');
        updateFieldFeedback(field);
    });
    syncMemoField();
    registrationSummary.replaceChildren();
    registrationResult.replaceChildren();
    setSubmissionState('idle');
    showRegistrationStep(0);
});

document.querySelector('#viewInventory').addEventListener('click', function () {
    focusInventoryItem(lastSavedId);
});

function expiryStatus(dateString) {
    const days = Math.round((Date.parse(dateString) - Date.parse(todayString())) / 86400000);
    if (days < 0) return `소비기한 ${Math.abs(days)}일 지남`;
    return days === 0 ? '오늘까지 · D-day' : `D-${days}`;
}

function createInventoryCard(item) {
    const card = document.createElement('li');
    card.className = item.consumed ? 'inventory-card is-consumed' : 'inventory-card';
    const details = document.createElement('div');
    details.className = 'inventory-details';
    const name = document.createElement('h4');
    name.textContent = item.name;
    const expiry = document.createElement('p');
    expiry.textContent = `소비기한: ${item.expiryDate}`;
    const timing = document.createElement('p');
    timing.textContent = `알림: ${item.timingLabel} · ${item.reminderDate} (시연)`;
    const status = document.createElement('span');
    status.className = 'inventory-status';
    status.textContent = item.consumed ? '소비 완료' : expiryStatus(item.expiryDate);
    details.append(name, expiry, timing);
    if (item.memo) {
        const memo = document.createElement('p');
        memo.className = 'inventory-note';
        memo.textContent = `보관 메모: ${item.memo}`;
        details.append(memo);
    }
    details.append(status);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = item.consumed ? 'secondary-button' : 'primary-button';
    button.dataset.foodId = item.id;
    button.dataset.action = item.consumed ? 'restore' : 'consume';
    button.textContent = item.consumed ? '보관 목록으로 되돌리기' : '소비 완료';
    button.setAttribute('aria-label', `${item.name} ${button.textContent}`);
    card.append(details, button);
    return card;
}

function renderInventory() {
    storedFoodList.replaceChildren();
    consumedFoodList.replaceChildren();
    const sorted = inventoryItems.slice().sort(function (a, b) {
        return a.expiryDate.localeCompare(b.expiryDate) || a.id - b.id;
    });
    sorted.forEach(function (item) {
        const list = item.consumed ? consumedFoodList : storedFoodList;
        list.append(createInventoryCard(item));
    });
    const storedCount = storedFoodList.children.length;
    const consumedCount = consumedFoodList.children.length;
    document.querySelector('#inventoryCount').textContent = `보관 중 ${storedCount}개 · 소비 완료 ${consumedCount}개`;
    const storedEmpty = document.querySelector('#storedEmpty');
    storedEmpty.hidden = storedCount > 0;
    storedEmpty.textContent = consumedCount > 0
        ? '보관 중인 식재료를 모두 소비했습니다. 새 식재료를 등록하거나 소비 완료 목록에서 되돌릴 수 있습니다.'
        : '아직 저장한 식재료가 없습니다. 식재료를 입력하고 확인 화면에서 저장해 주세요.';
    document.querySelector('#consumedEmpty').hidden = consumedCount > 0;
}

function focusInventoryItem(id) {
    const button = inventory.querySelector(`button[data-food-id="${id}"]`);
    (button || inventory.querySelector('.inventory-register-link')).focus();
}

inventory.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-food-id]');
    if (!button) return;
    const id = Number(button.dataset.foodId);
    try {
        const items = readStoredInventory();
        const item = items.find(function (food) { return food.id === id; });
        if (!item) {
            inventoryItems = items;
            renderInventory();
            inventoryFeedback.textContent = '해당 식재료가 목록에 없습니다. 목록을 확인하거나 새 식재료를 등록해 주세요.';
        } else {
            const consumed = button.dataset.action === 'consume';
            const updated = items.map(function (food) {
                return food.id === id ? { ...food, consumed } : food;
            });
            saveInventory(updated);
            inventoryFeedback.textContent = consumed
                ? `‘${item.name}’ 항목을 소비 완료로 변경했습니다. 잘못 눌렀다면 보관 목록으로 되돌릴 수 있습니다.`
                : `‘${item.name}’ 항목을 보관 목록으로 되돌렸습니다.`;
        }
        inventoryFeedback.classList.remove('is-error');
        focusInventoryItem(id);
    } catch (error) {
        inventoryFeedback.classList.add('is-error');
        inventoryFeedback.textContent = '소비 상태를 저장하지 못했습니다. 기존 상태는 유지됩니다. 저장 설정과 남은 공간을 확인한 뒤 다시 눌러 주세요.';
    }
});

expiryDate.min = todayString();
updateFieldFeedback(foodName);
syncMemoField();
try {
    inventoryItems = readStoredInventory();
    renderInventory();
} catch (error) {
    document.querySelector('#inventoryCount').textContent = '목록을 불러오지 못했습니다.';
    document.querySelector('#storedEmpty').hidden = true;
    document.querySelector('#consumedEmpty').hidden = true;
    inventoryFeedback.classList.add('is-error');
    inventoryFeedback.textContent = storageFailureMessage(error);
}
