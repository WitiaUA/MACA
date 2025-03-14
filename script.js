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
            const rewardsList = document.getElementById("rewards-list");

            let percentage = (currentValue / maxValue) * 100;
            progressElement.style.width = percentage + "%";

            // Оновлюємо текст
            collectedText.textContent = currentValue;
            neededText.textContent = maxValue;

            // Очищаємо попередні мітки та шкалу
            labelsContainer.innerHTML = "";
            scaleContainer.innerHTML = "";

            // Створюємо мітки кожні 200 одиниць
            for (let value = 0; value <= maxValue; value += 200) {
                let position = (value / maxValue) * 100;

                // Додаємо числові мітки над шкалою
                let label = document.createElement("div");
                label.className = "progress-label";
                label.style.left = `calc(${position}% - 10px)`;
                label.textContent = value;
                labelsContainer.appendChild(label);

                // Додаємо риски на шкалі
                let tick = document.createElement("div");
                tick.className = "progress-tick";
                tick.style.left = `${position}%`;
                scaleContainer.appendChild(tick);
            }

            // Додаємо список нагород
            const rewards = {
                100: "Початок досліджень",
                300: "Алмазний блок",
                600: "Залізний меч",
                1000: "Золотий пікель",
                2000: "Маяк"
            };

            rewardsList.innerHTML = "";
            for (let key in rewards) {
                let rewardItem = document.createElement("li");
                rewardItem.textContent = `${key}: ${rewards[key]}`;
                rewardsList.appendChild(rewardItem);
            }
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});
