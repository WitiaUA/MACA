document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const maxValue = data.maxValue;
            const currentValue = data.currentValue;

            const progressElement = document.getElementById("progress");
            const collectedText = document.getElementById("collected");
            const neededText = document.getElementById("needed");
            const scaleContainer = document.getElementById("progress-scale");

            let percentage = (currentValue / maxValue) * 100;
            progressElement.style.width = percentage + "%";

            // Оновлюємо текст
            collectedText.textContent = currentValue;
            neededText.textContent = maxValue;

            // Додаємо клас анімації
            setTimeout(() => {
                progressElement.classList.add("animated");
            }, 100);

            // Очищення шкали перед вставкою міток
            scaleContainer.innerHTML = "";

            // Набір міток для 7000
            const marks = [
                { value: 10, label: "10 - Початок" },
                { value: 1000, label: "1K - Пістолет" },
                { value: 3000, label: "3K - Автомат" },
                { value: 5000, label: "5K - Кулемет" },
                { value: 7000, label: "7K - Зенітка" }
            ];

            marks.forEach(mark => {
                if (mark.value <= maxValue) {
                    let markElement = document.createElement("div");
                    markElement.classList.add("mark");
                    markElement.textContent = mark.label;
                    markElement.style.left = (mark.value / maxValue) * 100 + "%";
                    scaleContainer.appendChild(markElement);
                }
            });
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});
