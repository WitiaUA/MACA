document.addEventListener("DOMContentLoaded", function () {
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const rewardsList = document.getElementById("rewards-list");
    const errorMessage = document.getElementById("error-message"); // Блок для помилок

    const labelValues = [0, 200, 400, 600, 800, 1000, 1400, 1800, 2000];

    labelValues.forEach(value => {
        let label = document.createElement("div");
        label.classList.add("progress-label");
        label.style.left = `${(value / 2000) * 100}%`;
        label.textContent = value;

        let tick = document.createElement("div");
        tick.classList.add("progress-tick");
        tick.style.left = `${(value / 2000) * 100}%`;

        progressLabels.appendChild(label);
        progressLabels.appendChild(tick);
    });

    const rewards = {
        1200: "Алмаз",
        1400: "Елітри",
        1600: "Маяк",
        1800: "Зірка Незеру",
        2000: "Драконове яйце"
    };

    function showError(message) {
        errorMessage.textContent = "Помилка: " + message;
    }

    function updateProgress() {
        fetch("data.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Не вдалося завантажити data.json (код " + response.status + ")");
                }
                return response.json();
            })
            .then(data => {
                let currentProgress = data.currentValue; 
                let maxProgress = data.maxValue;

                progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
                progressText.textContent = `${currentProgress} / ${maxProgress}`;

                rewardsList.innerHTML = "";

                Object.keys(rewards).forEach(value => {
                    if (currentProgress >= value) {
                        let listItem = document.createElement("li");
                        listItem.textContent = `${value}: ${rewards[value]}`;
                        rewardsList.appendChild(listItem);
                    }
                });

                errorMessage.textContent = ""; // Очищуємо помилку, якщо все добре
            })
            .catch(error => showError(error.message));
    }

    updateProgress();
    setInterval(updateProgress, 5000);
});
