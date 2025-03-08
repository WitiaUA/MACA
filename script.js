document.addEventListener("DOMContentLoaded", function () {
    function fetchData() {
        fetch("get_data.php?t=" + new Date().getTime())  
            .then(response => response.json())  
            .then(data => updateProgress(data.value))
            .catch(error => console.error("Помилка завантаження даних:", error));
    }

    function updateProgress(value) {
    let maxValue = 100;
    let progressElement = document.getElementById("progress");

    let progress = (value / maxValue) * 100;
    progressElement.style.height = progress + "%";
    progressElement.style.backgroundColor = "#d4af37"; // Робимо смугу видимою
    }

    fetchData();
    setInterval(fetchData, 5000); // Оновлення кожні 5 секунд
});
