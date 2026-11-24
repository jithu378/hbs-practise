document.querySelectorAll(".password-field").forEach((field) => {
    const password = field.querySelector('input[type="password"], input[type="text"]');
    const toggle = field.querySelector(".password-toggle");

    if (!password || !toggle) {
        return;
    }

    toggle.addEventListener("click", () => {
        const shouldShow = password.type === "password";
        password.type = shouldShow ? "text" : "password";
        toggle.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
        toggle.setAttribute("aria-pressed", String(shouldShow));
        toggle.classList.toggle("is-visible", shouldShow);
    });
});
