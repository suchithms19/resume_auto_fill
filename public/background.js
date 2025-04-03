chrome.action.onClicked.addListener(async (tab) => {
  // Toggle the side panel
  await chrome.sidePanel.open({ windowId: tab.windowId });
}); 