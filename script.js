document.addEventListener("DOMContentLoaded", function () {
    const progressContainer = document.querySelector(".progress-container");
    const progressBar = document.querySelector(".progress-bar");
    const progressLabels = document.querySelector(".progress-labels");
    const rewardsList = document.getElementById("rewards-list");

    // Значення для шкали
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

            // Оновлення списку винагород
            rewardsList.innerHTML = "";
            Object.entries(data.rewards).forEach(([value, reward]) => {
                let listItem = document.createElement("li");
                listItem.textContent = `${value}: ${reward}`;
                
                // Якщо поточний прогрес досяг позначки — підсвічуємо
                if (currentProgress >= value) {
                    listItem.classList.add("received");
                }

                rewardsList.appendChild(listItem);
            });

            // Оновлення міток шкали
            progressLabels.innerHTML = "";
            labelValues.forEach(value => {
                let label = document.createElement("div");
                label.classList.add("progress-label");
                label.textContent = value;

                // Позиціонуємо мітку на відповідному рівні шкали
                let position = (value / maxProgress) * 100;
                label.style.bottom = `calc(${position}% - 10px)`; // -10px для центрування

                progressLabels.appendChild(label);
            });
        })
        .catch(error => console.error("Помилка завантаження даних:", error));
});
