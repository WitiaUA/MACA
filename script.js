document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const maxValue = data.maxValue;
            const currentValue = data.currentValue;

            const progressElement = document.getElementById("progress");
            const collectedText = document.getElementById("collected");
            const neededText = document.getElementById("needed");
            const labelsContainer = document.getElementById("progress-labels");
            const scaleContainer = document.querySelector(".progress-scale");

            // Мітки для шкали
            const marks = [10, 100, 1000, 7000, maxValue];

            // Очищаємо попередні мітки
            labelsContainer.innerHTML = "";
            scaleContainer.innerHTML = '<div class="scale-line"></div>';

            marks.forEach(value => {
                let position = (value / maxValue) * 100;

                // Додаємо риску
                let mark = document.createElement("div");
                mark.classList.add("scale-mark");
                mark.style.left = position + "%";
                scaleContainer.appendChild(mark);

                // Додаємо підпис під міткою
                let label = document.createElement("div");
                label.classList.add("progress-label");
                label.style.width = "30px"; // Фіксований розмір, щоб не зміщувались
                label.style.textAlign = "center";
                label.textContent = value;
                label.style.position = "absolute";
                label.style.left = position + "%";
                label.style.transform = "translateX(-50%)";
                labelsContainer.appendChild(label);
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
