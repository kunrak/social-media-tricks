(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const waitForElement = async (selector, timeout = 3000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const el = document.querySelector(selector);
      if (el) return el;
      await delay(50); // faster check interval
    }
    throw new Error(`Element "${selector}" not found in ${timeout}ms`);
  };

  console.log("🚀 Faster unfollow script running...");

  while (true) {
    const buttons = Array.from(document.querySelectorAll('button[data-testid$="-unfollow"]'));

    if (buttons.length === 0) {
      console.log("🔄 Scrolling for more...");
      window.scrollBy(0, 1200);
      await delay(1000); // reduced wait for new content
      continue;
    }

    console.log(`🔍 Found ${buttons.length} to unfollow.`);

    for (let i = 0; i < buttons.length; i++) {
      try {
        buttons[i].click();
        const confirm = await waitForElement('button[data-testid="confirmationSheetConfirm"]', 2000);
        confirm.click();
        console.log(`✅ Unfollowed ${i + 1} of ${buttons.length}`);
        await delay(1000); // shorter delay
        window.scrollBy(0, 50); // subtle scroll
      } catch (err) {
        console.warn(`⚠️ Error at ${i + 1}:`, err);
      }
    }

    await delay(1000); // brief pause before next round
  }
})();
