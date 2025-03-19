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
                label.style.top = `${position}%`; // Точне позиціонування без зсуву
                label.style.left = "50%"; // По центру всередині шкали
                label.style.transform = "translateX(-50%)"; // Центрування по горизонталі
                label.style.position = "absolute";
                label.style.color = "#000"; // Чорний текст для контрасту всередині

                progressBar.appendChild(label); // Мітки всередині шкали
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
