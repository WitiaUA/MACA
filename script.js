document.addEventListener("DOMContentLoaded", function () {
    let collected = 50; // Ти можеш змінити це значення
    const needed = 100;
    const progressElement = document.getElementById("progress");
    const collectedText = document.getElementById("collected");

    function updateProgress() {
        let percentage = (collected / needed) * 100;
        progressElement.style.width = percentage + "%";
        collectedText.textContent = collected;
    }

    updateProgress();
});
