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

    function updateProgress() {
        let cacheBuster = new Date().getTime(); // Унікальний параметр для уникнення кешу
        fetch(`data.json?t=${cacheBuster}`)
            .then(response => response.json())
            .then(data => {
                let currentProgress = data.currentValue;
                let maxProgress = data.maxValue;

                progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`;
                progressText.textContent = `${currentProgress} / ${maxProgress}`;
            })
            .catch(error => console.error("Помилка завантаження даних:", error));
    }

    updateProgress(); // Викликаємо одразу при завантаженні
    setInterval(updateProgress, 20000); // Оновлюємо кожні 5 секунд
});
