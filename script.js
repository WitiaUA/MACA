document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector(".progress-bar");
    const progressLabels = document.querySelector(".progress-labels");
    const rewardsList = document.getElementById("rewards-list");

    const labelValues = [
        20000, 18000, 16000, 15000, 14000, 13000, 12000, 11000, 10000, 9000, 8000, 6969, 
        6000, 4949, 4500, 4000, 3500, 3000, 2500, 2000, 1750, 1488, 1250, 1000, 500, 250, 100, 49
    ];

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let currentProgress = data.currentValue;
            let maxProgress = data.maxValue;

            // Оновлення висоти шкали прогресу
            progressBar.style.height = `${(currentProgress / maxProgress) * 100}%`;

            // Очищення попередніх міток
            progressLabels.innerHTML = "";

            // Додавання міток до шкали
            labelValues.forEach((value, index) => {
                let label = document.createElement("div");
                label.classList.add("progress-label");
                label.textContent = value;

                let position = (1 - value / maxProgress) * 100;
                label.style.bottom = `${position}%`;

                // Перевірка на перетин міток
                if (index > 0) {
                    const prevLabel = progressLabels.lastChild;
                    const prevRect = prevLabel.getBoundingClientRect();
                    const currentRect = label.getBoundingClientRect();
                    if (currentRect.top - prevRect.bottom < 5) {
                        label.style.display = "none";
                    }
                }

                progressLabels.appendChild(label);
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
