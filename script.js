// Прогрес
const progressBar = document.querySelector('.progress-bar');
const rewardsList = document.getElementById('rewards-list');

// Встановлюємо початковий прогрес (відсоток)
let progress = 0;
progressBar.style.height = `${progress}%`;

// Додаємо кольорові мітки (500, 1000, 2000, 4000, 8000)
const keyMarks = [500, 1000, 2000, 4000, 8000];
keyMarks.forEach(mark => {
    const markDiv = document.createElement('div');
    markDiv.className = 'mark';
    markDiv.style.bottom = `${(mark / 8000) * 100}%`;
    document.querySelector('.progress-container').appendChild(markDiv);
});

// Додаємо тонкі лінії на кожну тисячу
for (let i = 1000; i < 8000; i += 1000) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'thin-line';
    lineDiv.style.bottom = `${(i / 8000) * 100}%`;
    document.querySelector('.progress-container').appendChild(lineDiv);
}

// Оновлення прогресу
function updateProgress(amount) {
    progress += amount;
    if (progress > 8000) progress = 8000;
    const percentage = (progress / 8000) * 100;
    progressBar.style.height = `${percentage}%`;

    // Додаємо перевірку та підсвічування нагород
    const rewards = [
        { value: 500, text: "🏅 Досягнуто 500!" },
        { value: 1000, text: "🎉 Досягнуто 1000!" },
        { value: 2000, text: "🥳 Вау, 2000!" },
        { value: 4000, text: "🔥 Півдороги — 4000!" },
        { value: 8000, text: "🏆 Ціль досягнуто — 8000!" }
    ];

    rewards.forEach(reward => {
        if (progress >= reward.value && !document.querySelector(`#reward-${reward.value}`)) {
            const rewardItem = document.createElement('li');
            rewardItem.id = `reward-${reward.value}`;
            rewardItem.textContent = reward.text;
            rewardItem.classList.add('received');
            rewardsList.appendChild(rewardItem);
        }
    });
}

// Прив'язка до кнопок
document.querySelector('.donate-button').addEventListener('click', () => updateProgress(500));
