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

    // Функція для завантаження JSON
    function loadJSON(callback) {
        fetch("data.json")
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => log("❌ Помилка завантаження JSON: " + error));
    }

    // Функція для збереження JSON (працює лише на сервері)
    function saveJSON(data) {
        fetch("data.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => log("✅ Дані збережено!"))
        .catch(error => log("❌ Помилка збереження JSON: " + error));
    }

    loadJSON(function (data) {
        let maxValue = data.maxValue;
        let currentValue = data.currentValue;

        let collectedElement = document.getElementById("collected");
        let neededElement = document.getElementById("needed");
        let progressElement = document.getElementById("progress");

        collectedElement.innerText = currentValue;
        neededElement.innerText = maxValue;

        function updateProgress() {
            let progress = (currentValue / maxValue) * 100;
            progressElement.style.height = progress + "%";

            logBox.innerHTML = "";
            log("Максимальне значення: " + maxValue);
            log("Зібране значення: " + currentValue);
            log("Прогрес: " + progress.toFixed(2) + "%");
        }

        updateProgress();

        // Додаємо кнопку для редагування значень
        let editButton = document.createElement("button");
        editButton.innerText = "Змінити значення";
        editButton.style.position = "fixed";
        editButton.style.bottom = "50px";
        editButton.style.left = "10px";
        document.body.appendChild(editButton);

        editButton.addEventListener("click", function () {
            let newValue = parseInt(prompt("Введіть нове значення:"));
            if (!isNaN(newValue) && newValue <= maxValue) {
                currentValue = newValue;
                collectedElement.innerText = currentValue;
                updateProgress();
                saveJSON({ maxValue, currentValue });
            } else {
                log("❌ Некоректне значення!");
            }
        });
    });
});
