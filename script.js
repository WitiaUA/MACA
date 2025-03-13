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

            // Додаємо мітки на шкалу
            const marks = [
                { value: 10, label: "10 - Бронза" },
                { value: 100, label: "100 - Срібло" },
                { value: 400, label: "400 - Золото" }
            ];

            scaleContainer.innerHTML = ""; // Очистка перед додаванням міток

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
