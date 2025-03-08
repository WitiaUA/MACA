document.addEventListener("DOMContentLoaded", function () {
    let maxValue = 100;
    let currentValue = 30;

    let progressElement = document.getElementById("progress");
    let progressText = document.getElementById("progress-text");

    function updateProgress(value) {
        let progress = (value / maxValue) * 100;
        progressElement.style.height = progress + "%";
        progressText.innerText = value + " / " + maxValue;
    }

    updateProgress(currentValue);
});
