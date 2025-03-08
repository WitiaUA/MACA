// Початкові значення
let maxValue = 100; // Скільки потрібно
let currentValue = 30; // Скільки зібрано

// Функція оновлення шкали
function updateProgress() {
    let progress = (currentValue / maxValue) * 100;
    document.getElementById("progress").style.height = progress + "%";
    
    // Оновлення чисел
    document.getElementById("collected").innerText = currentValue;
    document.getElementById("needed").innerText = maxValue;
}

// Запускаємо оновлення
updateProgress();
