// تاریخ هدف رویداد را اینجا تنظیم کن
const targetDate = new Date("2025-10-27T00:00:00").getTime();

function toPersian(num) {
  return num.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

const timer = setInterval(() => {
  const now = new Date().getTime();
  const gap = targetDate - now;

  if (gap < 0) {
    clearInterval(timer);
    document.querySelector(".timer").innerHTML = "<h3>رویداد آغاز شد! 🎉</h3>";
    return;
  }

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((gap / (1000 * 60)) % 60);
  const seconds = Math.floor((gap / 1000) % 60);

  document.getElementById("days").textContent = toPersian(days);
  document.getElementById("hours").textContent = toPersian(hours);
  document.getElementById("minutes").textContent = toPersian(minutes);
  document.getElementById("seconds").textContent = toPersian(seconds);
}, 1000);
