document.addEventListener("DOMContentLoaded", function () {
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const rewardsList = document.getElementById("rewards-list");

    // Ручний список чисел на шкалі
    const labelValues = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];

    labelValues.forEach(value => {
        let label = document.createElement("div");
        label.classList.add("progress-label");
        label.style.left = `${(value / 2000) * 100}%`;
        label.textContent = value;

        let tick = document.createElement("div");
        tick.classList.add("progress-tick");
        tick.style.left = `${(value / 2000) * 100}%`;

        progressLabels.appendChild(label);
        progressLabels.appendChild(tick);
    });

    // Підтягуємо значення з data.json
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let currentProgress = data.currentValue;
            let maxProgress = data.maxValue;
            let rewards = data.rewards; // Всі винагороди

            // Оновлення шкали прогресу
            progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
            progressText.textContent = `${currentProgress} / ${maxProgress}`;

            // Очищуємо список перед додаванням нових винагород
            rewardsList.innerHTML = "";

            // Додаємо всі винагороди у список
            Object.entries(rewards).forEach(([value, reward]) => {
                let listItem = document.createElement("li");
                listItem.textContent = `${value}: ${reward}`;

                // Додаємо клас "received", якщо винагорода вже отримана
                if (currentProgress >= value) {
                    listItem.classList.add("received");
                }

                rewardsList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Помилка завантаження даних:", error));
});
