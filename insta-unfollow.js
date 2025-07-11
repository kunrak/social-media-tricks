(async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const unfollowLoop = async () => {
    const buttons = [...document.querySelectorAll('button')];
    const targets = buttons.filter(btn => {
      const text = btn.innerText.trim();
      return text === 'Following' || text === 'Requested';
    });

    if (targets.length === 0) {
      console.log('✅ All users unfollowed.');
      return;
    }

    for (const btn of targets) {
      btn.click();
      await delay(200);

      const confirmBtn = [...document.querySelectorAll('button')]
        .find(b => b.innerText.trim() === 'Unfollow');

      if (confirmBtn) confirmBtn.click();
      await delay(500);
    }

    // Wait a moment for UI refresh and loop again
    await delay(1000);
    await unfollowLoop();
  };

  await unfollowLoop();
})();
