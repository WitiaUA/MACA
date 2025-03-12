document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")  // Завантажуємо JSON-файл
        .then(response => response.json())
        .then(data => {
            const maxValue = data.maxValue;
            const currentValue = data.currentValue;

            const progressElement = document.getElementById("progress");
            const collectedText = document.getElementById("collected");
            const neededText = document.getElementById("needed");

            let percentage = (currentValue / maxValue) * 100;
            progressElement.style.width = percentage + "%";
            collectedText.textContent = currentValue;
            neededText.textContent = maxValue;
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});
