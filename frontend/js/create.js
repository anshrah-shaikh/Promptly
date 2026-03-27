function format(cmd) {
  document.execCommand(cmd, false, null);
}


document.addEventListener("selectionchange", () => {
  document.querySelectorAll(".toolbar button").forEach(btn => {
    const cmd = btn.getAttribute("data-cmd");
    if (!cmd) return;

    try {
      if (document.queryCommandState(cmd)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    } catch {}
  });
});

window.onload = () => {
  document.getElementById("editor").focus();
};