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
            progressBar.style.height = getProgressHeight(currentProgress) + "%";

            // Очищення попередніх міток
            progressLabels.innerHTML = "";

            // Додавання міток до шкали
            labelValues.forEach(value => {
                let label = document.createElement("div");
                label.classList.add("progress-label");
                label.textContent = value;

                let position = getProgressHeight(value);
                label.style.bottom = position + "%";

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

    // Функція для коригування висоти шкали
    function getProgressHeight(value) {
        if (value >= labelValues[0]) return 100; // Найвище значення = 100%
        if (value <= labelValues[labelValues.length - 1]) return 0; // Найнижче значення = 0%

        for (let i = 0; i < labelValues.length - 1; i++) {
            if (value >= labelValues[i + 1] && value <= labelValues[i]) {
                let minVal = labelValues[i + 1];
                let maxVal = labelValues[i];

                let minHeight = (i + 1) / (labelValues.length - 1) * 100;
                let maxHeight = i / (labelValues.length - 1) * 100;

                let relativePosition = (value - minVal) / (maxVal - minVal);
                return minHeight + relativePosition * (maxHeight - minHeight);
            }
        }
        return 0; // Якщо значення не знайдено (теоретично неможливо)
    }

    // Логіка для кнопки пожертви (тільки якщо вона є на сторінці)
    const donateButton = document.getElementById("donate-enz");

    if (donateButton) {
        console.log("Знайдено кнопку пожертви в е-нз.");
        donateButton.addEventListener("click", function (event) {
            event.preventDefault();
            let confirmDonate = confirm("Щоб здійснити пожертву, введіть команду /pay Maliyo 123 у телеграм-бота. Перейти до нього?");
            if (confirmDonate) {
                window.location.href = "https://t.me/quadrobank_bot?start";
            }
        });
    } else {
        console.log("Кнопки пожертви в е-нз немає на цій сторінці.");
    }
});
