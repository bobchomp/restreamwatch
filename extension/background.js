// RTMP Web Player Reminder: sends any visit to restream.io (or a subdomain) to the
// extension's notice page, and lets one visit through when "Proceed" is clicked.

const REDIRECT_RULE_ID = 1;
// Session "allow" rules use id = ALLOW_RULE_BASE + tabId.
const ALLOW_RULE_BASE = 1000;

const RESTREAM_HOST = /(^|\.)restream\.io$/i;

function isRestreamUrl(url) {
  try {
    const u = new URL(url);
    return (u.protocol === "http:" || u.protocol === "https:") && RESTREAM_HOST.test(u.hostname);
  } catch {
    return false;
  }
}

async function installRedirectRule() {
  const warningUrl = chrome.runtime.getURL("warning.html");
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [REDIRECT_RULE_ID],
    addRules: [
      {
        id: REDIRECT_RULE_ID,
        priority: 1,
        action: {
          type: "redirect",
          // The original address goes after the "#" so "Proceed" can return to it.
          redirect: { regexSubstitution: warningUrl + "#\\0" }
        },
        condition: {
          regexFilter: "^https?://([a-z0-9-]+\\.)*restream\\.io([:/?#].*)?$",
          resourceTypes: ["main_frame"]
        }
      }
    ]
  });
}

chrome.runtime.onInstalled.addListener(installRedirectRule);
chrome.runtime.onStartup.addListener(installRedirectRule);

async function removeAllowRule(tabId) {
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [ALLOW_RULE_BASE + tabId]
  });
}

// "Proceed" clicked: allow Restream in this tab until the person leaves the site.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type !== "proceed" || !sender.tab || !isRestreamUrl(msg.url)) return;
  const tabId = sender.tab.id;
  (async () => {
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [ALLOW_RULE_BASE + tabId],
      addRules: [
        {
          id: ALLOW_RULE_BASE + tabId,
          priority: 2,
          action: { type: "allow" },
          condition: {
            tabIds: [tabId],
            requestDomains: ["restream.io"],
            resourceTypes: ["main_frame"]
          }
        }
      ]
    });
    await chrome.tabs.update(tabId, { url: msg.url });
    sendResponse({ ok: true });
  })();
  return true;
});

// Leaving Restream ends the visit, so the notice shows again next time.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!changeInfo.url) return;
  const warningUrl = chrome.runtime.getURL("warning.html");
  if (!isRestreamUrl(changeInfo.url) && !changeInfo.url.startsWith(warningUrl)) {
    removeAllowRule(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => removeAllowRule(tabId));
