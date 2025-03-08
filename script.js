// Початкові значення
let maxValue = 100; // Скільки потрібно
let currentValue = 30; // Скільки зібрано

// Встановлення початкових значень у текст
document.getElementById("collected").innerText = currentValue;
document.getElementById("needed").innerText = maxValue;

// Функція оновлення шкали
function updateProgress() {
    let progress = (currentValue / maxValue) * 100;
    document.getElementById("progress").style.height = progress + "%";
}

// Запускаємо оновлення
updateProgress();
