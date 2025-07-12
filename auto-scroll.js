// Just change the delay to increase or decrease the speed of scrolling

(function () {
  const scrollControl = {
    id: null,
    active: false,
    delay: 1,
    start: function () {
      if (!this.active) {
        this.active = true;
        this.scroll();
        updateOverlay("🟢 Scrolling");
      }
    },
    scroll: function () {
      if (!this.active) return;
      window.scrollBy(0, 1);
      this.id = setTimeout(() => this.scroll(), this.delay);
    },
    stop: function () {
      clearTimeout(this.id);
      this.active = false;
      updateOverlay("🔴 Stopped");
    },
    toggle: function () {
      this.active ? this.stop() : this.start();
    }
  };

  // 🖱️ Mouse control overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.bottom = "20px";
  overlay.style.right = "20px";
  overlay.style.padding = "8px 12px";
  overlay.style.background = "#333";
  overlay.style.color = "#fff";
  overlay.style.fontSize = "14px";
  overlay.style.borderRadius = "6px";
  overlay.style.boxShadow = "0 0 6px rgba(0,0,0,0.3)";
  overlay.style.zIndex = "9999";
  overlay.style.cursor = "pointer";
  overlay.textContent = "🔴 Stopped";
  overlay.onclick = () => scrollControl.toggle();
  document.body.appendChild(overlay);

  function updateOverlay(text) {
    overlay.textContent = text;
  }

  window.scrollControl = scrollControl;
})();
