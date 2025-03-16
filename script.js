document.addEventListener("DOMContentLoaded", function () {
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const rewardsList = document.getElementById("rewards-list");
    const refreshButton = document.getElementById("refresh-button");

    const labelValues = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];

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

    function loadProgress() {
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                let currentProgress = data.currentValue;
                let maxProgress = data.maxValue;
                let rewards = data.rewards;

                progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
                progressText.textContent = `${currentProgress} / ${maxProgress}`;

                rewardsList.innerHTML = "";

                Object.entries(rewards).forEach(([value, reward]) => {
                    let listItem = document.createElement("li");
                    listItem.textContent = `${value}: ${reward}`;

                    if (currentProgress >= Number(value)) {
                        listItem.classList.add("received");
                    }

                    rewardsList.appendChild(listItem);
                });

                console.log("Дані оновлено:", data);
            })
            .catch(error => console.error("Помилка завантаження даних:", error));
    }

    refreshButton.addEventListener("click", loadProgress);

    loadProgress();
});
