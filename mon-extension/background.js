// Service Worker pour l'extension

// Installation de l'extension
chrome.runtime.onInstalled.addListener(() => {
    console.log('Web Cleaner VNR installé avec succès !');
    
    // Initialiser le storage si nécessaire
    chrome.storage.local.get(['hiddenElements'], (result) => {
        if (!result.hiddenElements) {
            chrome.storage.local.set({ hiddenElements: {} });
        }
    });
});

// Écouter les messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateStats') {
        // Mettre à jour le badge de l'extension
        updateBadge();
    }
    return true;
});

// Mettre à jour le badge avec le nombre de sites nettoyés
function updateBadge() {
    chrome.storage.local.get(['hiddenElements'], (result) => {
        const hiddenElements = result.hiddenElements || {};
        const count = Object.keys(hiddenElements).length;
        
        if (count > 0) {
            chrome.action.setBadgeText({ text: count.toString() });
            chrome.action.setBadgeBackgroundColor({ color: '#00ff66' });
        } else {
            chrome.action.setBadgeText({ text: '' });
        }
    });
}

// Mettre à jour le badge au démarrage
updateBadge();