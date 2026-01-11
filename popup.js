chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0].url;

  chrome.storage.local.get(url, (result) => {
    if (!result[url]) return;

    const { score, details } = result[url];

    document.getElementById("score").innerText = `Score: ${score}/ 100`;

    const list = document.getElementById("details");

    list.innerHTML = `<li>Fixed Elements: ${details.fixedElements}</li>
      <li>Iframes: ${details.iframeCount}</li>
      <li>Autoplay Videos: ${details.autoPlayVideoCount}</li>
      <li>Dialogs: ${details.dialogCount}</li>
      <li>Notification Prompt: ${
        details.notificationPrompt ? "Yes" : "No"
      }</li>`;
  });
});
