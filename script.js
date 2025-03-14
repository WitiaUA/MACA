document.addEventListener("DOMContentLoaded", function () {
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const rewardsList = document.getElementById("rewards-list");

    // Ручний список чисел на шкалі
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
        1800: "Золоте яблуко",
        2000: "Незеритова броня"
    };

    // Підтягуємо значення з data файлу (імітація)
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let currentProgress = data.currentValue; // Наприклад, 1500
            let maxProgress = data.maxValue; // Наприклад, 2000

            progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
            progressText.textContent = `${currentProgress} / ${maxProgress}`;

            // Оновлення списку винагород
            rewardsList.innerHTML = ""; // Очистка перед додаванням
            for (let value in rewards) {
                let rewardItem = document.createElement("li");
                rewardItem.textContent = `${value}: ${rewards[value]}`;
                
                // Виділяємо отримані винагороди
                if (currentProgress >= value) {
                    rewardItem.style.fontWeight = "bold";
                    rewardItem.style.color = "gold";
                } else {
                    rewardItem.style.color = "white";
                }
                
                rewardsList.appendChild(rewardItem);
            }
        })
        .catch(error => console.error("Помилка завантаження даних:", error));
});
