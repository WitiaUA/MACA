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

            // Встановлюємо висоту шкали на 100% висоти контейнера
            progressBar.style.height = `100%`;

            // Створюємо і додаємо внутрішній блок заповнення шкали
            const progressFill = document.createElement("div");
            progressFill.classList.add("progress-fill");
            progressFill.style.height = `${(currentProgress / maxProgress) * 100}%`;
            progressBar.innerHTML = "";
            progressBar.appendChild(progressFill);

            // Очищаємо попередні мітки
            progressLabels.innerHTML = "";

            // Додаємо мітки рівномірно за значеннями
            labelValues.forEach((value) => {
                let label = document.createElement("div");
                label.classList.add("progress-label");
                label.textContent = value;

                // Розміщуємо мітки пропорційно до їхнього значення відносно maxProgress
                let position = (1 - value / Math.max(...labelValues)) * 100;
                label.style.top = `${position}%`;

                progressLabels.appendChild(label);
            });

            // Оновлення списку винагород
            rewardsList.innerHTML = "";
            Object.entries(data.rewards).forEach(([value, reward]) => {
                let listItem = document.createElement("li");
                listItem.textContent = `${value}: ${reward}`;
                rewardsList.appendChild(listItem);
            });
        });

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
