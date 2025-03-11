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

    let maxValue = 100;
    let currentValue = 30;

    let collectedElement = document.getElementById("collected");
    let neededElement = document.getElementById("needed");
    let progressElement = document.getElementById("progress");

    collectedElement.innerText = currentValue;
    neededElement.innerText = maxValue;

    function updateProgress() {
        let progress = (currentValue / maxValue) * 100;
        progressElement.style.height = progress + "%";

        // Очищення логів перед оновленням
        logBox.innerHTML = "";

        // Додавання оновлених логів
        log("Максимальне значення: " + maxValue);
        log("Зібране значення: " + currentValue);
        log("Прогрес: " + progress.toFixed(2) + "%");
    }

    updateProgress();

    // Для тесту: збільшувати currentValue кожні 2 секунди
    setInterval(() => {
        if (currentValue < maxValue) {
            currentValue += 5; // або інше значення
            collectedElement.innerText = currentValue;
            updateProgress();
        }
    }, 2000);
});
