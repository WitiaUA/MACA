document.addEventListener("DOMContentLoaded", function () {
    let collectedElement = document.getElementById("collected");
    let neededElement = document.getElementById("needed");
    let progressElement = document.getElementById("progress");

    function updateProgress(currentValue, maxValue) {
        let progress = (currentValue / maxValue) * 100;
        progressElement.style.height = progress + "%";
    }

    function loadJSON(callback) {
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                collectedElement.innerText = data.currentValue;
                neededElement.innerText = data.maxValue;
                updateProgress(data.currentValue, data.maxValue);
            })
            .catch(error => console.error("Помилка завантаження JSON:", error));
    }

    // Завантаження при старті
    loadJSON();

    // Автоматичне оновлення кожні 5 секунд
    setInterval(loadJSON, 5000);
});
