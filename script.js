document.getElementById("rewards-list").innerHTML
document.addEventListener("DOMContentLoaded", function () {
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const rewardsList = document.getElementById("rewards-list"); // Список винагород

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

    // Завантаження прогресу та винагород
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let currentProgress = data.currentValue;
            let maxProgress = data.maxValue;

            // Оновлення шкали прогресу
            progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
            progressText.textContent = `${currentProgress} / ${maxProgress}`;

            // Оновлення списку винагород
            rewardsList.innerHTML = ""; // Очистити перед оновленням
            data.rewards.forEach(reward => {
                let listItem = document.createElement("li");
                listItem.innerHTML = `<b>${reward.name}</b> - ${reward.description}<br>`;

                if (currentProgress >= reward.threshold) {
                    listItem.innerHTML += `✅ <i>Отримано!</i>`;
                    listItem.style.color = "gold";
                } else {
                    listItem.innerHTML += `❌ <i>Не досягнуто</i>`;
                    listItem.style.color = "gray";
                }

                rewardsList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Помилка завантаження даних:", error));
});
