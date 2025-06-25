const toggleButton = document.getElementById('toggleButton');
const statusText = document.getElementById('status');

function updateUI(isEnabled) {
  if (isEnabled) {
    statusText.textContent = 'Статус: Включен';
    toggleButton.textContent = 'Выключить';
  } else {
    statusText.textContent = 'Статус: Выключен';
    toggleButton.textContent = 'Включить';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  browser.storage.local.get('proxyEnabled').then((result) => {
    updateUI(result.proxyEnabled);
  });
});

toggleButton.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: "toggleProxy" }).then((response) => {
    if (response) {
      updateUI(response.enabled);
    }
  });
});
