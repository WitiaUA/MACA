document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const maxValue = data.maxValue;
            const currentValue = data.currentValue;

            const progressElement = document.getElementById("progress");
            const collectedText = document.getElementById("collected");
            const neededText = document.getElementById("needed");
            const rewardText = document.getElementById("reward-text");
            const progressScale = document.getElementById("progress-scale");

            let percentage = (currentValue / maxValue) * 100;
            progressElement.style.width = percentage + "%";

            collectedText.textContent = currentValue;
            neededText.textContent = maxValue;

            setTimeout(() => {
                progressElement.classList.add("animated");
            }, 100);

            // Очищаємо попередні мітки
            progressScale.innerHTML = "";

            // Додаємо нові мітки
            const marks = [10, 100, 400];
            marks.forEach(value => {
                if (value > maxValue) return; // Ігноруємо мітки, що перевищують maxValue

                let position = (value / maxValue) * 100;
                let markElement = document.createElement("span");
                markElement.classList.add("mark");
                markElement.style.left = position + "%";
                markElement.textContent = value;
                progressScale.appendChild(markElement);
            });

            // Логіка нагород
            let reward = "-";
            if (currentValue >= 400) reward = "💎 Діамантовий рівень!";
            else if (currentValue >= 100) reward = "🏆 Золотий рівень!";
            else if (currentValue >= 10) reward = "🥉 Бронзовий рівень!";

            rewardText.textContent = `Нагорода: ${reward}`;
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});
