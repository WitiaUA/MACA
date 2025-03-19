// Завантажуємо дані з data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const maxValue = data.maxValue;
        const currentValue = data.currentValue;
        const rewards = data.rewards;

        const progressBar = document.querySelector('.progress-bar');
        const rewardsList = document.getElementById('rewards-list');
        const labelsContainer = document.querySelector('.progress-labels');

        // Встановлюємо висоту прогрес-бару відповідно до поточного значення
        const progressPercent = (currentValue / maxValue) * 100;
        progressBar.style.height = `${progressPercent}%`;

        // Додаємо мітки шкали
        for (let i = 0; i <= maxValue; i += 1000) {
            const label = document.createElement('div');
            label.textContent = i;
            label.style.opacity = "0.4";
            label.style.position = "absolute";
            label.style.bottom = `${(i / maxValue) * 100}%`;
            labelsContainer.appendChild(label);

            // Додаємо кольорові смужки на ключові мітки
            if ([500, 1000, 2000, 4000, 8000].includes(i)) {
                const mark = document.createElement('div');
                mark.classList.add('progress-mark');
                mark.style.position = "absolute";
                mark.style.width = "100%";
                mark.style.height = "2px";
                mark.style.backgroundColor = "red";
                mark.style.bottom = `${(i / maxValue) * 100}%`;
                labelsContainer.appendChild(mark);
            }
        }

        // Показуємо список винагород
        for (const [value, reward] of Object.entries(rewards)) {
            const rewardItem = document.createElement('li');
            rewardItem.textContent = `${value} — ${reward}`;
            if (currentValue >= value) rewardItem.classList.add('received');
            rewardsList.appendChild(rewardItem);
        }

        
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

    })
    .catch(error => console.error('Помилка завантаження даних:', error));
