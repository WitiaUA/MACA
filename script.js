document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".progress-bar");
    const rewardsList = document.getElementById("rewards-list");

    // Сума цілі та поточна сума
    const goalAmount = 8000;
    let currentAmount = 0;

    // Масив винагород
    const rewards = [
        { amount: 500, text: "Доступ до секретного чату" },
        { amount: 1000, text: "Унікальна роль у Discord" },
        { amount: 2000, text: "Іменна подяка на сайті" },
        { amount: 4000, text: "Підписка на ексклюзивний контент" },
        { amount: 8000, text: "Запрошення на закритий івент" },
    ];

    // Оновлення прогрес-бара
    function updateProgress() {
        const progressPercent = (currentAmount / goalAmount) * 100;
        progressBar.style.height = `${progressPercent}%`;

        // Відзначаємо винагороди
        rewards.forEach((reward, index) => {
            const rewardItem = rewardsList.children[index];
            if (currentAmount >= reward.amount) {
                rewardItem.classList.add("received");
            }
        });
    }

    // Додаємо мітки до шкали
    const labelsContainer = document.querySelector(".progress-labels");
    for (let i = 0; i <= goalAmount; i += 1000) {
        const label = document.createElement("div");
        label.textContent = i;
        label.dataset.value = i;

        // Перевірка на ключові мітки
        if ([500, 1000, 2000, 4000, 8000].includes(i)) {
            label.classList.add("highlight-label");
        }

        labelsContainer.prepend(label);
    }

    // Обробка кнопки пожертви
    document.querySelector(".donate-button").addEventListener("click", () => {
        const donation = parseInt(prompt("Введіть суму пожертви:", "100"), 10);
        if (!isNaN(donation) && donation > 0) {
            currentAmount += donation;
            if (currentAmount > goalAmount) currentAmount = goalAmount;
            updateProgress();
        }
    });

    // Додаємо винагороди в список
    rewards.forEach(reward => {
        const rewardItem = document.createElement("li");
        rewardItem.textContent = `${reward.amount} — ${reward.text}`;
        rewardsList.appendChild(rewardItem);
    });

    // Ініціалізація прогресу
    updateProgress();
});
