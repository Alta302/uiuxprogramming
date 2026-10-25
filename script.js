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

const registrationSteps = document.querySelectorAll('.registration-step');
const registrationProgress = document.querySelector('#registrationProgress');
const registrationRestart = document.querySelector('#registrationRestart');
const foodForm = document.querySelector('#foodForm');
const timingForm = document.querySelector('#timingForm');
const foodName = document.querySelector('#foodName');
const expiryDate = document.querySelector('#expiryDate');
const reminderTiming = document.querySelector('#reminderTiming');
const registrationSummary = document.querySelector('#registrationSummary');
const registrationResult = document.querySelector('#registrationResult');
const registrationLabels = ['시작', '식재료 입력', '알림 선택', '내용 확인', '완료'];
let registrationStep = 0;

function todayString() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function reminderDateString() {
    const [year, month, day] = expiryDate.value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() - Number(reminderTiming.value));
    return date.toISOString().slice(0, 10);
}

function showRegistrationStep(step) {
    registrationStep = step;
    registrationSteps.forEach(function (panel) {
        panel.hidden = Number(panel.dataset.step) !== step;
    });
    registrationProgress.textContent = `${step + 1} / 5 · ${registrationLabels[step]}`;
    registrationRestart.hidden = step === 0;
    const heading = document.querySelector(`.registration-step[data-step="${step}"] h3`);
    heading.focus();
}

function setRegistrationError(field, message) {
    document.querySelector(`#${field.id}Error`).textContent = message;
    if (message) {
        field.setAttribute('aria-invalid', 'true');
    } else {
        field.removeAttribute('aria-invalid');
    }
}

function validateFood() {
    expiryDate.min = todayString();
    const nameError = !foodName.value.trim()
        ? '식재료 이름을 입력해 주세요. 예: 두부'
        : foodName.value.trim().length > 20 ? '식재료 이름을 20자 이내로 줄여 주세요.' : '';
    const dateError = !expiryDate.value || !expiryDate.validity.valid
        ? '소비기한을 오늘 또는 이후의 올바른 날짜로 선택해 주세요.' : '';
    setRegistrationError(foodName, nameError);
    setRegistrationError(expiryDate, dateError);
    const invalidField = nameError ? foodName : dateError ? expiryDate : null;
    if (invalidField) {
        if (registrationStep !== 1) showRegistrationStep(1);
        invalidField.focus();
    }
    return !invalidField;
}

function validateTiming() {
    let message = '';
    if (!['3', '1', '0'].includes(reminderTiming.value)) {
        message = '알림 시점을 선택해 주세요. 3일 전, 1일 전, 당일 중 고를 수 있습니다.';
    } else if (reminderDateString() < todayString()) {
        message = '선택한 알림 날짜가 이미 지났습니다. 더 가까운 시점이나 소비기한 당일로 바꿔 주세요.';
    }
    setRegistrationError(reminderTiming, message);
    if (message) {
        if (registrationStep !== 2) showRegistrationStep(2);
        reminderTiming.focus();
    }
    return !message;
}

function renderRegistrationSummary(target) {
    const values = [
        ['식재료', foodName.value.trim()],
        ['소비기한', expiryDate.value],
        ['알림 시점', reminderTiming.selectedOptions[0].textContent],
        ['알림 예정일 (시연)', reminderDateString()]
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

function validateRegistration() {
    if (!validateFood()) return false;
    return validateTiming();
}

document.querySelector('#registrationStart').addEventListener('click', function () {
    expiryDate.min = todayString();
    showRegistrationStep(1);
});

foodForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (registrationStep !== 1 || !validateFood()) return;
    showRegistrationStep(2);
});

timingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (registrationStep !== 2 || !validateRegistration()) return;
    renderRegistrationSummary(registrationSummary);
    showRegistrationStep(3);
});

document.querySelectorAll('[data-back]').forEach(function (button) {
    button.addEventListener('click', function () {
        showRegistrationStep(Number(button.dataset.back));
    });
});

[foodName, expiryDate, reminderTiming].forEach(function (field) {
    field.addEventListener(field === reminderTiming ? 'change' : 'input', function () {
        setRegistrationError(field, '');
    });
});

document.querySelector('#registrationComplete').addEventListener('click', function () {
    if (registrationStep !== 3 || !validateRegistration()) return;
    renderRegistrationSummary(registrationResult);
    showRegistrationStep(4);
});

registrationRestart.addEventListener('click', function () {
    foodForm.reset();
    timingForm.reset();
    [foodName, expiryDate, reminderTiming].forEach(function (field) {
        setRegistrationError(field, '');
    });
    registrationSummary.replaceChildren();
    registrationResult.replaceChildren();
    expiryDate.min = todayString();
    showRegistrationStep(0);
});

expiryDate.min = todayString();
