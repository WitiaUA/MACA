document.addEventListener("DOMContentLoaded", function () {
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const rewardsList = document.getElementById("rewards-list");

    // Початковий список чисел на шкалі (без 1200 та 1600)
    const labelValues = [0, 200, 400, 600, 800, 1000, 1400, 1800, 2000];

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

    // Винагороди
    const rewards = {
        1200: "Алмаз",
        1400: "Елітри",
        1600: "Маяк",
        1800: "Зірка Незеру",
        2000: "Драконове яйце"
    };

    function updateProgress() {
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                let currentProgress = data.currentValue; // Наприклад, 700
                let maxProgress = data.maxValue; // Наприклад, 2000

                progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
                progressText.textContent = `${currentProgress} / ${maxProgress}`;

                // Оновлення списку винагород
                rewardsList.innerHTML = ""; // Очищення перед додаванням нових
                Object.keys(rewards).forEach(value => {
                    if (currentProgress >= value) {
                        let listItem = document.createElement("li");
                        listItem.textContent = `${value}: ${rewards[value]}`;
                        rewardsList.appendChild(listItem);
                    }
                });
            })
            .catch(error => console.error("Помилка завантаження даних:", error));
    }

    updateProgress();
    setInterval(updateProgress, 5000); // Оновлення кожні 5 секунд
});
