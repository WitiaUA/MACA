document.addEventListener("DOMContentLoaded", function () {
    const maxValue = 2000;
    const currentValue = 700; // Твоє поточне значення

    const progressElement = document.getElementById("progress");
    const collectedText = document.getElementById("collected");
    const neededText = document.getElementById("needed");
    const progressLabels = document.getElementById("progress-labels");

    let percentage = (currentValue / maxValue) * 100;
    progressElement.style.width = percentage + "%";

    // Оновлення чисел
    collectedText.textContent = currentValue;
    neededText.textContent = maxValue;

    // Очищення попередніх міток
    progressLabels.innerHTML = "";

    for (let i = 0; i <= maxValue; i += 200) {
        let tick = document.createElement("div");
        tick.classList.add("progress-tick");
        tick.style.left = (i / maxValue) * 100 + "%";

        let label = document.createElement("div");
        label.classList.add("progress-label");
        label.style.left = (i / maxValue) * 100 + "%";
        label.textContent = i;

        progressLabels.appendChild(tick);
        progressLabels.appendChild(label);
    }
});
