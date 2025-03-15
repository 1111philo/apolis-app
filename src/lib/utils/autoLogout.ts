import { logout } from "../api";

export const setAutoLogoutTimer = function (setAuthUser) {
  let time: number;
  resetTimer();

  // DOM Events that extend the session
  document.onmousemove = resetTimer;
  document.ontouchstart = resetTimer;
  document.onkeydown = resetTimer;
  document.addEventListener("scroll", resetTimer, true);

  async function autoLogout() {
    await logout();
    setAuthUser(null);
    window.location.href = "/";
  }

  function resetTimer() {
    clearTimeout(time);
    // 20 minutes in ms
    time = window.setTimeout(autoLogout, 20 * 60 * 1000);
  }
};
