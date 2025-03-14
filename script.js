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

            // Очищення шкали перед вставкою нових елементів
            scaleContainer.innerHTML = "";

            // Набір міток для 7000
            const marks = [
                { value: 10, label: "10 - Бронза" },
                { value: 1000, label: "1K - Початківець" },
                { value: 3000, label: "3K - Досвідчений" },
                { value: 5000, label: "5K - Майстер" },
                { value: 7000, label: "7K - Легенда" }
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

            // Додаємо риски кожні 500 одиниць
            for (let i = 0; i <= maxValue; i += 500) {
                let tick = document.createElement("div");
                tick.classList.add("tick");
                tick.style.left = (i / maxValue) * 100 + "%";
                scaleContainer.appendChild(tick);
            }
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});
