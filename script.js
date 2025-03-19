document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector(".progress-bar");
    const progressLabels = document.querySelector(".progress-labels");
    const rewardsList = document.getElementById("rewards-list");

    const labelValues = [
        20000, 19000, 18000, 17000, 16000, 15000, 14000, 13000, 12000, 11000, 10000,
        9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 0
    ];

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let currentProgress = data.currentValue;
            let maxProgress = data.maxValue;

            console.log("Поточний прогрес:", currentProgress);
            console.log("Максимальний прогрес:", maxProgress);

            if (isNaN(currentProgress) || isNaN(maxProgress) || maxProgress <= 0) {
                console.error("Неправильні дані!", { currentProgress, maxProgress });
                return;
            }

            // Оновлення висоти шкали прогресу без округлення
            progressBar.style.height = `${(currentProgress / maxProgress) * 100}%`;

            // Очищення попередніх міток
            progressLabels.innerHTML = "";

            // Додавання міток всередині шкали
            labelValues.forEach(value => {
                let label = document.createElement("div");
                label.classList.add("progress-label");
                label.textContent = value;

                let position = (1 - value / maxProgress) * 100;
                label.style.position = "absolute";
                label.style.top = `${position}%`;
                label.style.left = "0";
                label.style.width = "100%";
                label.style.textAlign = "center";
                label.style.color = "#000";
                label.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                label.style.padding = "2px 0";
                label.style.boxShadow = "0 0 3px rgba(0, 0, 0, 0.5)";

                progressLabels.appendChild(label); // Відновлюємо додавання до progressLabels
            });

            // Оновлення списку винагород
            rewardsList.innerHTML = "";
            Object.entries(data.rewards).forEach(([value, reward]) => {
                let listItem = document.createElement("li");
                listItem.textContent = `${value}: ${reward}`;
                if (currentProgress >= value) {
                    listItem.classList.add("received");
                }
                rewardsList.appendChild(listItem);
            });

            console.log("Мітки додано:", progressLabels.innerHTML);
        })
        .catch(error => console.error("Помилка завантаження даних:", error));
});
