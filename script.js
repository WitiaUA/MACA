document.addEventListener("DOMContentLoaded", function () {
    let maxValue = 100;
    let currentValue = 0;

    let collectedElement = document.getElementById("collected");
    let neededElement = document.getElementById("needed");
    let progressElement = document.getElementById("progress");

    if (!collectedElement || !neededElement || !progressElement) {
        return;
    }

    collectedElement.innerText = currentValue;
    neededElement.innerText = maxValue;

    function updateProgress() {
        let progress = (currentValue / maxValue) * 100;
        progressElement.style.height = progress + "%";
        progressElement.style.backgroundColor = "green";
    }
<link rel="stylesheet" href="style.css?v=123">
<script src="script.js?v=123"></script>
<script>
    let script = document.createElement("script");
    script.src = "script.js?v=" + Date.now();
    document.head.appendChild(script);
</script>
    updateProgress();
});
