document.addEventListener("DOMContentLoaded", function () {
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");

    // Ручний список чисел на шкалі
    const labelValues = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];

    // Визначаємо, чи користувач на мобільному
    const isMobile = window.innerWidth <= 600;

    // Фільтруємо мітки: на мобільних залишаємо кожне друге число
    const filteredLabels = isMobile ? labelValues.filter((_, i) => i % 2 === 0) : labelValues;

    filteredLabels.forEach(value => {
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

    // Завантаження даних із JSON
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let currentProgress = data.currentValue;
            let maxProgress = data.maxValue;

            progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
            progressText.textContent = `${currentProgress} / ${maxProgress}`;
        })
        .catch(error => console.error("Помилка завантаження даних:", error));
});
