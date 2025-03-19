document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector(".progress-bar");
    const rewardsList = document.getElementById("rewards-list");
const labelValues = [

 

        20000, 19000, 18000, 17000, 16000, 15000, 14000, 13000, 12000, 11000, 10000,
 

        9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 0
 

    ];
 


 

    fetch("data.json")
 

        .then(response => response.json())
 

        .then(data => {
 

            let currentProgress = parseInt(data.currentValue);
 

            let maxProgress = parseInt(data.maxValue);
        console.log("Поточний прогрес:", currentProgress);
            console.log("Максимальний прогрес:", maxProgress);
 if (isNaN(currentProgress) || isNaN(maxProgress) || maxProgress <= 0) {

 

                console.error("Неправильні дані!", { currentProgress, maxProgress });
 

                return;
 

            }
// Оновлення висоти шкали прогресу

 

            const progressHeight = (currentProgress / maxProgress) * 100;
 

            if (progressBar) {
 

                progressBar.style.height = `${progressHeight}%`;
 

                console.log(`Шкала оновлена до ${progressHeight}%`);
 

            } else {
 

                console.error("Елемент progress-bar не знайдено!");
            }
 // Очищення попередніх міток

 

            progressContainer.querySelectorAll(".progress-label").forEach(label => label.remove());
 // Додавання міток всередині шкали

 

            labelValues.forEach(value => {
 

                let label = document.createElement("div");
 

                label.classList.add("progress-label");
 

                label.textContent = value;
 let position = (1 - value / maxProgress) * 100;

 

                label.style.position = "absolute";
 

                label.style.top = `${position}%`;
 

                label.style.left = "50%";
 

                label.style.transform = "translate(-50%, -50%)";
 

                label.style.width = "fit-content";
 

                label.style.textAlign = "center";
 

                label.style.color = "#000";
 

                label.style.backgroundColor = "transparent";
 

                label.style.padding = "0";
 

                label.style.boxShadow = "none";
 progressContainer.appendChild(label);

 

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
 console.log("Мітки додано:", progressContainer.innerHTML);

 

        })
 

        .catch(error => console.error("Помилка завантаження даних:", error));
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


 // Ініціалізація прогресу

 

    updateProgress();
 
});
