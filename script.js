document.addEventListener("DOMContentLoaded", function () {
    let maxValue = 100;
    let currentValue = 30;

    // Логування значень
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

    log("Максимальне значення: " + maxValue);
    log("Зібране значення: " + currentValue);

    let collectedElement = document.getElementById("collected");
    let neededElement = document.getElementById("needed");
    let progressElement = document.getElementById("progress");

    collectedElement.innerText = currentValue;
    neededElement.innerText = maxValue;

    function updateProgress() {
        let progress = (currentValue / maxValue) * 100;
        console.log("Оновлення шкали: " + progress + "%");
        progressElement.style.height = progress + "%";
    }

    updateProgress();

    // Зчитуємо дані з JSON файлу
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            maxValue = data.maxValue;
            currentValue = data.currentValue;

            collectedElement.innerText = currentValue;
            neededElement.innerText = maxValue;
            updateProgress();
        })
        .catch(error => log("Помилка при завантаженні даних: " + error));
});
