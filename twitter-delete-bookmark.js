(() => {
  const scrollIfNeeded = () => {
    const prevScroll = window.scrollY;
    window.scrollBy(0, 1200);
    return window.scrollY > prevScroll;
  };

  function removeBookmarks(batchSize = 5) {
    try {
      const unbookmarkButtons = document.querySelectorAll('button[data-testid="removeBookmark"]');
      if (unbookmarkButtons.length > 0) {
        for (let i = 0; i < Math.min(batchSize, unbookmarkButtons.length); i++) {
          unbookmarkButtons[i].click();
          console.log(`❌ Removed bookmark button ${i + 1}`);
        }
        const randomDelay = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(() => removeBookmarks(batchSize), randomDelay);
      } else if (scrollIfNeeded()) {
        console.log("🔄 Scrolling to load more bookmarks...");
        const randomDelay = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(() => removeBookmarks(batchSize), randomDelay);
      } else {
        console.log("✅ All bookmarks removed.");
      }
    } catch (error) {
      console.error("⚠️ Error during bookmark removal:", error);
      setTimeout(() => removeBookmarks(batchSize), 3000);
    }
  }

  console.log("🚀 Starting bookmark purge...");
  removeBookmarks();
})();
