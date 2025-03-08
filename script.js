document.addEventListener("DOMContentLoaded", function () {
    let logBox = document.createElement("div");
    logBox.style.position = "fixed";
    logBox.style.bottom = "10px";
    logBox.style.left = "10px";
    logBox.style.backgroundColor = "white";
    logBox.style.padding = "10px";
    logBox.style.border = "1px solid black";
    logBox.style.zIndex = "1000";
    document.body.appendChild(logBox);

    function log(message) {
        logBox.innerHTML += message + "<br>";
    }

    log("Скрипт запущено!");

    let maxValue = 100;
    let currentValue = 30;

    log("Максимальне значення: " + maxValue);
    log("Зібране значення: " + currentValue);

    let collectedElement = document.getElementById("collected");
    let neededElement = document.getElementById("needed");
    let progressElement = document.getElementById("progress");

    if (!collectedElement || !neededElement || !progressElement) {
        log("❌ Помилка: не знайдено один з елементів шкали!");
        return;
    }

    collectedElement.innerText = currentValue;
    neededElement.innerText = maxValue;

    function updateProgress() {
        let progress = (currentValue / maxValue) * 100;
        progressElement.style.height = progress + "%";
        progressElement.style.backgroundColor = "green"; // Робимо смугу видимою
        log("✅ Оновлено шкалу: " + progress + "%");
    }

    updateProgress();
});
