chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "COGNITIVE_LOAD_DATA") {
    const score = calculateScore(message.data);

    chrome.action.setBadgeText({
      tabId: sender.tab.id,
      text: String(score),
    });

    chrome.action.setBadgeBackgroundColor({
      color: score > 70 ? "red" : score > 40 ? "orange" : "green",
    });

    chrome.storage.local.set({
      [sender.tab.url]: {
        score,
        details: message.data,
      },
    });
  }
});

function calculateScore(data) {
  let score = 0;

  score += Math.min(data.fixedElements * 5, 30);
  score += Math.min(data.iframeCount * 4, 20);
  score += Math.min(data.autoPlayVideoCount * 10, 20);
  score += Math.min(data.dialogCount * 8, 20);

  if (data.notificationPrompt) score += 10;

  return Math.min(score, 100);
}
