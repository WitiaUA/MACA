document.addEventListener("DOMContentLoaded", function () {
    const progressContainer = document.querySelector(".progress-container");
    const progressBar = document.querySelector(".progress-bar");
    const progressLabels = document.querySelector(".progress-labels");
    const rewardsList = document.getElementById("rewards-list");

    // Фіксовані значення шкали
    const labelValues = [
        20000, 18000, 16000, 15000, 14000, 13000, 12000, 11000, 10000, 9000, 8000, 6969, 
        6000, 4949, 4500, 4000, 3500, 3000, 2500, 2000, 1750, 1488, 1250, 1000, 500, 250, 100, 49
    ];

    // Додаємо мітки до шкали
    labelValues.forEach(value => {
        let label = document.createElement("div");
        label.classList.add("progress-label");
        label.textContent = value;
        progressLabels.appendChild(label);
    });

    // Завантаження прогресу та винагород
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let currentProgress = data.currentValue;
            let maxProgress = Math.max(...labelValues);

            // Оновлення шкали прогресу
            progressBar.style.height = `${(currentProgress / maxProgress) * 100}%`;

            // Очищення та оновлення списку винагород
            rewardsList.innerHTML = "";
            Object.entries(data.rewards).forEach(([value, reward]) => {
                let listItem = document.createElement("li");
                listItem.textContent = `${value}: ${reward}`;

                // Виділення отриманих винагород
                if (currentProgress >= value) {
                    listItem.classList.add("received");
                }

                rewardsList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Помилка завантаження даних:", error));
});
