const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

let isSubscribed = false;

function handleSubscribe(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    emailInput.value = email;

    if (isSubscribed === true) {
        subscribeMessage.textContent = "이미 알림 신청을 완료했습니다.";
        return;
    }

    if (email === "") {
        subscribeMessage.textContent = "이메일 주소를 먼저 입력해 주세요.";
        emailInput.focus();
        return;
    }

    if (!emailInput.checkValidity()) {
        subscribeMessage.textContent = "올바른 이메일 주소를 입력해 주세요.";
        emailInput.focus();
        return;
    }

    isSubscribed = true;
    subscribeMessage.textContent = `${email} 주소로 알림 신청이 완료되었습니다. (화면 시연용이며 실제 이메일은 발송되지 않습니다.)`;
}

subscribeForm.addEventListener("submit", handleSubscribe);
console.log("신선노트 JavaScript가 연결되었습니다.");
