// ==========================================
// ▼ ここを設定してください
// ==========================================
const BIRTH_DATE = "1971-11-20T02:39:00"; // スクリーンショットの日付を入れました
const LIFE_YEARS = 79;                    // スクリーンショットの設定に合わせました
const SLEEP_HOURS_PER_DAY = 8;            // 1日あたり睡眠時間（活動時間から除外）
// ==========================================

function updateCountdown() {
  const start = new Date(BIRTH_DATE).getTime();
  const end = new Date(BIRTH_DATE).getTime() + (LIFE_YEARS * 365.25 * 24 * 60 * 60 * 1000);
  const now = new Date().getTime();

  const total = end - start;
  const passed = now - start;
  const remaining = end - now;

  // 1. パーセンテージと円グラフの更新
  const percentRemaining = Math.max(0, (remaining / total) * 100);
  const percentPassed = 100 - percentRemaining;

  const percentDisplay = document.getElementById('percent-display');
  if (percentDisplay) {
    percentDisplay.innerText = percentRemaining.toFixed(4) + "%";
  }

  const chart = document.getElementById('chart');
  if (chart) {
    chart.style.background = `conic-gradient(
        #333333 0% ${percentPassed}%, 
        #eeeeee ${percentPassed}% 100%
      )`;
  }

  // 2. カウントダウン表示の更新
  const countdownDisplay = document.getElementById('countdown-display');
  if (!countdownDisplay) return;

  if (remaining <= 0) {
    countdownDisplay.innerText = "Time's up";
    return;
  }

  // 活動できる残り時間 = 残り時間 - 睡眠時間（残り日数 × 8時間/日）
  const msPerDay = 24 * 60 * 60 * 1000;
  const remainingDays = remaining / msPerDay;
  const sleepMs = remainingDays * (SLEEP_HOURS_PER_DAY * 60 * 60 * 1000);
  const activeRemaining = Math.max(0, remaining - sleepMs);

  const years = Math.floor(activeRemaining / (1000 * 60 * 60 * 24 * 365.25));
  const days = Math.floor((activeRemaining % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((activeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((activeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((activeRemaining % (1000 * 60)) / 1000);

  const pad = (n) => n.toString().padStart(2, '0');
  const pad3 = (n) => n.toString().padStart(3, '0');

  // 活動残り時間を時間・秒で換算（xxxxh yyyy sec）
  const totalSeconds = Math.floor(activeRemaining / 1000);
  const totalHours = Math.floor(totalSeconds / 3600);
  const secsPart = totalSeconds % 3600;

  countdownDisplay.innerHTML =
    `${pad(years)} Years  ${pad3(days)} Days  ${pad(hours)}:${pad(minutes)}:${pad(seconds)}<br>` +
    `<span class="time-in-hours">${totalHours.toLocaleString()}h ${secsPart} sec</span>`;
}

// 1秒ごとに更新
setInterval(updateCountdown, 1000);
updateCountdown(); // 初回実行