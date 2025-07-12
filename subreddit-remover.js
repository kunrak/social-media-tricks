(async () => {
  console.log("🚀 Starting leave-all-subreddits script...");

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const MAX_TOTAL = 200;
  let leftCount = 0;

  const leaveOne = () => {
    const link = document.querySelector('a.option.active.remove.login-required');
    if (!link) return null;
    link.scrollIntoView({ behavior: "smooth", block: "center" });
    link.click();
    return true;
  };

  for (let i = 0; i < MAX_TOTAL; i++) {
    const success = leaveOne();
    if (!success) {
      console.log("✅ No more leave links found.");
      break;
    }

    leftCount++;
    console.log(`👋 Left subreddit #${leftCount}`);
    await delay(800); // Small pause for DOM update
  }

  console.log(`🏁 Finished. Left ${leftCount} subreddits.`);
})();
