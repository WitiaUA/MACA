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

            // Визначаємо мітки для шкали (початок, 10, 100, 1000, 7000)
            const marks = [10, 100, 1000, 7000, maxValue];

            // Додаємо мітки на шкалу
            scaleContainer.innerHTML = "";
            marks.forEach(value => {
                let position = (value / maxValue) * 100;
                let mark = document.createElement("div");
                mark.classList.add("scale-mark");
                mark.style.left = position + "%";

                let label = document.createElement("span");
                label.textContent = value;
                mark.appendChild(label);

                scaleContainer.appendChild(mark);
            });

            // Оновлення шкали прогресу
            let percentage = (currentValue / maxValue) * 100;
            progressElement.style.width = percentage + "%";

            // Оновлення тексту
            collectedText.textContent = currentValue;
            neededText.textContent = maxValue;
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});
