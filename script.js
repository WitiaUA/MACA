document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const maxValue = data.maxValue;
            const currentValue = data.currentValue;

            const progressElement = document.getElementById("progress");
            const collectedText = document.getElementById("collected");
            const neededText = document.getElementById("needed");

            let percentage = (currentValue / maxValue) * 100;
            progressElement.style.width = percentage + "%";

            // Оновлюємо текст
            collectedText.textContent = currentValue;
            neededText.textContent = maxValue;

            // Додаємо клас анімації після встановлення початкової ширини
            setTimeout(() => {
                progressElement.classList.add("animated");
            }, 100);
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});
