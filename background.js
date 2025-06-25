const proxyHost = "proxy.moddychat.com";
const proxyPort = 8888;

function setProxy() {
  browser.proxy.settings.set({
    value: {
      proxyType: "manual",
      http: proxyHost,
      httpPort: proxyPort,
      ssl: proxyHost,
      sslPort: proxyPort
    },
    scope: "regular"
  });
}

function clearProxy() {
  browser.proxy.settings.clear({});
}

browser.storage.local.get("proxyEnabled").then((result) => {
  if (result.proxyEnabled) {
    setProxy();
  } else {
    clearProxy();
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleProxy") {
    return browser.storage.local.get("proxyEnabled").then((result) => {
      const newState = !result.proxyEnabled;
      if (newState) {
        setProxy();
      } else {
        clearProxy();
      }
      return browser.storage.local.set({ proxyEnabled: newState }).then(() => {
        return Promise.resolve({ enabled: newState });
      });
    });
  }
});
