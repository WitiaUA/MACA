// Початкові значення
let maxValue = 100; // Максимальне значення
let currentValue = 30; // Поточне значення

// Функція оновлення шкали
function updateProgress() {
    let progress = (currentValue / maxValue) * 100;
    document.getElementById("progress").style.height = progress + "%";
}

// Запускаємо оновлення
updateProgress();
