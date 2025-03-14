document.addEventListener("DOMContentLoaded", function () {
    const progressLabels = document.querySelector(".progress-labels");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");

    // Ручний список чисел на шкалі
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

    // Симуляція підключення даних
    setTimeout(() => {
        let data = {
            current: 700,  // Наприклад, 700
            max: 2000      // Наприклад, 2000
        };

        if (data && data.current !== undefined && data.max !== undefined) {
            progressBar.style.width = `${(data.current / data.max) * 100}%`;
            progressText.textContent = `${data.current} / ${data.max}`;
        } else {
            progressText.textContent = "Помилка завантаження!";
        }
    }, 500); // Імітація затримки
});
