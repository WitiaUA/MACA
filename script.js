document.addEventListener("DOMContentLoaded", function () {
    console.log("Скрипт завантажено!");

    // Логіка для шкали прогресу (тільки якщо вона є на сторінці)
    const progressLabels = document.querySelector(".progress-labels");
    if (progressLabels) {
        console.log("Знайдено елементи шкали прогресу, виконуємо відповідний код.");
        
        const progressBar = document.querySelector(".progress-bar");
        const progressText = document.querySelector(".progress-text");
        const rewardsList = document.getElementById("rewards-list");

        const labelValues = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];

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

        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                let currentProgress = data.currentValue;
                let maxProgress = data.maxValue;
                let rewards = data.rewards;

                progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
                progressText.innerHTML = `<span id="collected">${currentProgress}</span> / <span id="needed">${maxProgress}</span>`;

                rewardsList.innerHTML = "";
                Object.entries(rewards).forEach(([value, reward]) => {
                    let listItem = document.createElement("li");
                    listItem.textContent = `${value}: ${reward}`;

                    if (currentProgress >= value) {
                        listItem.classList.add("received");
                    }

                    rewardsList.appendChild(listItem);
                });

                console.log("Винагороди завантажено:", rewards);
            })
            .catch(error => console.error("Помилка завантаження даних:", error));
    } else {
        console.log("Шкали прогресу немає на цій сторінці.");
    }

    // Логіка для кнопки пожертви (тільки якщо вона є на сторінці)
    const donateButton = document.getElementById("donate-enz");
    if (donateButton) {
        console.log("Знайдено кнопку пожертви в е-нз.");
        
        donateButton.addEventListener("click", function (event) {
            event.preventDefault();
            let confirmDonate = confirm("Щоб здійснити пожертву, введіть команду /pay 123 123 у Telegram. Перейти до Telegram?");
            if (confirmDonate) {
                window.location.href = "https://t.me/quadrobank_bot?start";
            }
        });
    } else {
        console.log("Кнопки пожертви в е-нз немає на цій сторінці.");
    }
});
