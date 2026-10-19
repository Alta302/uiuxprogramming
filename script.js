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
