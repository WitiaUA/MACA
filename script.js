document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const progressLabels = document.querySelectorAll(".progress-labels span");
    const progressTicks = document.querySelectorAll(".progress-tick");

    function updateProgress(value) {
        // Обмеження значення від 0 до 100
        value = Math.max(0, Math.min(100, value));

        // Оновлення ширини шкали
        progressBar.style.width = value + "%";
        progressText.textContent = `Прогрес: ${value}%`;

        // Виділення досягнутих позначок
        progressLabels.forEach((label, index) => {
            let stepValue = index * (100 / (progressLabels.length - 1)); // Визначаємо значення для кожної позначки
            if (value >= stepValue) {
                label.classList.add("reached");
            } else {
                label.classList.remove("reached");
            }
        });

        // Виділення досягнутих міток
        progressTicks.forEach((tick, index) => {
            let stepValue = index * (100 / (progressTicks.length - 1));
            if (value >= stepValue) {
                tick.classList.add("reached");
            } else {
                tick.classList.remove("reached");
            }
        });
    }

    // Симуляція оновлення (замінити на ваш реальний механізм)
    let progressValue = 0;
    setInterval(() => {
        if (progressValue <= 100) {
            updateProgress(progressValue);
            progressValue += 10;
        }
    }, 1000);
});
