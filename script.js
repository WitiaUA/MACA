document.addEventListener("DOMContentLoaded", function () {
    console.log("Скрипт завантажено!");

    // Отримуємо елементи шкали прогресу
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const rewardsList = document.getElementById("rewards-list");

    // Перевіряємо, чи знайдено елементи
    if (!progressLabels || !progressBar || !progressText || !rewardsList) {
        console.error("Не знайдено один або кілька елементів прогресу!");
        return;
    }

    // Фіксовані значення поділок
    const labelValues = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];

    // Додаємо мітки та поділки
    labelValues.forEach(value => {
        let labelWrapper = document.createElement("div");
        labelWrapper.classList.add("progress-label-wrapper");
        labelWrapper.style.left = `${(value / 2000) * 100}%`;

        let label = document.createElement("div");
        label.classList.add("progress-label");
        label.textContent = value;

        let tick = document.createElement("div");
        tick.classList.add("progress-tick");

        labelWrapper.appendChild(label);
        labelWrapper.appendChild(tick);
        progressLabels.appendChild(labelWrapper);
    });

    console.log("Мітки шкали додано!");

    // Завантаження даних із JSON
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let currentProgress = data.currentValue;
            let maxProgress = data.maxValue;
            let rewards = data.rewards;

            // Оновлення шкали прогресу
            progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
            progressText.innerHTML = `<span id="collected">${currentProgress}</span> / <span id="needed">${maxProgress}</span>`;

            // Очищення списку перед додаванням винагород
            rewardsList.innerHTML = "";

            // Додавання винагород у список
            Object.entries(rewards).forEach(([value, reward]) => {
                let listItem = document.createElement("li");
                listItem.textContent = `${value}: ${reward}`;

                // Виділення досягнутих винагород
                if (currentProgress >= value) {
                    listItem.classList.add("received");
                }

                rewardsList.appendChild(listItem);
            });

            console.log("Винагороди завантажено:", rewards);
        })
        .catch(error => console.error("Помилка завантаження даних:", error));

    // Функція для показу інструкцій перед пожертвою в е-нз
    function showDonationInstructions(event) {
        event.preventDefault();

        let confirmDonate = confirm("Щоб здійснити пожертву, введіть команду /pay 123 123 у Telegram. Перейти до Telegram?");
        if (confirmDonate) {
            window.location.href = "https://t.me/quadrobank_bot";
        }
    }

    // Прив'язка до кнопки
    const donateButton = document.getElementById("donate-enz");
    if (donateButton) {
        donateButton.addEventListener("click", showDonationInstructions);
        console.log("Кнопка пожертви в е-нз підключена!");
    } else {
        console.error("Кнопку пожертви в е-нз не знайдено!");
    }
});
