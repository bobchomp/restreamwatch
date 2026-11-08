// The original Restream address is passed after the "#".
const target = location.hash.slice(1) || "https://restream.io/";
const proceed = document.getElementById("proceed");

proceed.addEventListener("click", () => {
  proceed.disabled = true;
  chrome.runtime.sendMessage({ type: "proceed", url: target });
});
