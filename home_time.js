/**
 * 時刻用の文字列を出力
 * @param {number} num - 1文字または2文字の時間または分
 * @returns {string}
 */
const formatTime = (num) => (num < 10 ? "0" + num : "" + num);

/**
 * #clockに時刻を表示させる
 * @returns {void}
 */
const displayClock = () => {
  const now = new Date();

  let hours = formatTime(now.getHours());
  let Minutes = formatTime(now.getMinutes());

  document.getElementById("clock").textContent = hours + ":" + Minutes;
};

displayClock();
setInterval(displayClock, 1000);
