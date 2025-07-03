export function initCommands() {
  chrome.commands.onCommand.addListener((command) => {
    if (command === "open-options") {
      chrome.runtime.openOptionsPage();
    }
  });
}
