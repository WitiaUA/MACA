document.addEventListener("DOMContentLoaded", function () {
    // ======== Налаштування шкали прогресу ========
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const rewardsList = document.getElementById("rewards-list");

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

    // ======== Налаштування кнопки "Пожертвувати в е-нз" ========
    const donateButton = document.getElementById("donate-enz");

    if (donateButton) {
        donateButton.addEventListener("click", function (event) {
            event.preventDefault(); // Запобігає переходу за посиланням

            alert("Щоб зробити пожертву:\n1. Натисни 'OK', щоб перейти в бот.\n2. У Telegram введи команду: /pay 123 123\n3. Підтвердь оплату.");

            window.open("https://t.me/quadrobank_bot", "_blank"); // Просто відкриває бота
        });

        console.log("Кнопка для пожертви знайдена та обробник додано.");
    } else {
        console.error("Кнопку для пожертви не знайдено!");
    }
});
