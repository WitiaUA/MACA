document.addEventListener("DOMContentLoaded", function () {
    let logBox = document.createElement("div");
    logBox.style.position = "fixed";
    logBox.style.bottom = "10px";
    logBox.style.left = "10px";
    logBox.style.backgroundColor = "white";
    logBox.style.padding = "10px";
    logBox.style.border = "1px solid black";
    logBox.style.zIndex = "1000";
    document.body.appendChild(logBox);

    function log(message) {
        logBox.innerHTML += message + "<br>";
    }

    log("Скрипт запущено!");

    let maxValue = 100;
    let currentValue = 30;

    log("Максимальне: " + maxValue);
    log("Зібране: " + currentValue);

    document.getElementById("collected").innerText = currentValue;
    document.getElementById("needed").innerText = maxValue;

    function updateProgress() {
        let progress = (currentValue / maxValue) * 100;
        document.getElementById("progress").style.height = progress + "%";
        log("Оновлено шкалу: " + progress + "%");
    }

    updateProgress();
});
