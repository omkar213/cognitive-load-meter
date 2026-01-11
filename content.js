function scanCognitiveLoad() {
  // capture fixed elements
  const fixedElements = [...document.querySelectorAll("*")].filter(
    (el) => getComputedStyle(el).position === "fixed"
  );

  // capture iframes
  const iframes = document.querySelectorAll("iframe");

  // capture auto-play videos
  const autoPlayVideos = document.querySelectorAll("video[autoplay]");

  // capture dialogs
  const dialogs = document.querySelectorAll("dialog");

  // capture notification texts
  const notificationTexts = [
    "allow notifications",
    "turn on notifications",
    "enable notifications",
  ];

  // check if notification prompt is present
  const hasNotificationPrompt = notificationTexts.some((text) =>
    document.body.innerText.toLowerCase().includes(text.toLowerCase())
  );

  // this is receives by background.js
  return {
    fixedElements: fixedElements.length,
    iframeCount: iframes.length,
    autoPlayVideoCount: autoPlayVideos.length,
    dialogCount: dialogs.length,
    notificationPrompt: hasNotificationPrompt,
  };
}

const data = scanCognitiveLoad();

(async () => {
  await chrome.runtime.sendMessage({
    type: "COGNITIVE_LOAD_DATA",
    data,
  });
})();
