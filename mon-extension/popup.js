// ============================================
// WEB CLEANER VNR - POPUP SCRIPT
// Version finale avec gestion d'erreurs
// ============================================

// Récupération des éléments DOM
const toggleModeBtn = document.getElementById('toggleMode');
const modeText = document.getElementById('modeText');
const statusText = document.getElementById('statusText');
const viewSitesBtn = document.getElementById('viewSites');
const resetCurrentBtn = document.getElementById('resetCurrent');
const resetAllBtn = document.getElementById('resetAll');
const currentSiteSpan = document.getElementById('currentSite');
const hiddenCountSpan = document.getElementById('hiddenCount');
const sitesCountSpan = document.getElementById('sitesCount');
const sitesList = document.getElementById('sitesList');

let currentDomain = '';
let isEditMode = false;

// ============================================
// INITIALISATION AU CHARGEMENT
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    await updateStats();
    loadSitesList();
});

// ============================================
// ACTIVER/DÉSACTIVER LE MODE ÉDITION
// ============================================

toggleModeBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Vérifier que l'onglet est valide
    if (!tab || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        statusText.textContent = '⚠ Page non compatible';
        setTimeout(() => statusText.textContent = 'SYSTÈME PRÊT', 2000);
        return;
    }
    
    chrome.tabs.sendMessage(tab.id, { action: 'toggleEditMode' }, (response) => {
        // Vérifier les erreurs de connexion
        if (chrome.runtime.lastError) {
            console.log('Erreur de connexion:', chrome.runtime.lastError.message);
            statusText.textContent = '⚠ Rechargez la page (F5)';
            setTimeout(() => statusText.textContent = 'SYSTÈME PRÊT', 3000);
            return;
        }
        
        if (response && response.isActive !== undefined) {
            isEditMode = response.isActive;
            updateModeUI(isEditMode);
        }
    });
});

// ============================================
// METTRE À JOUR L'INTERFACE DU MODE
// ============================================

function updateModeUI(active) {
    if (active) {
        modeText.textContent = '⏹ DÉSACTIVER MODE ÉDITION';
        toggleModeBtn.classList.add('active');
        statusText.textContent = 'MODE ÉDITION ACTIF';
    } else {
        modeText.textContent = '▶ ACTIVER MODE ÉDITION';
        toggleModeBtn.classList.remove('active');
        statusText.textContent = 'SYSTÈME PRÊT';
    }
}

// ============================================
// VOIR/MASQUER LA LISTE DES SITES
// ============================================

viewSitesBtn.addEventListener('click', () => {
    sitesList.classList.toggle('show');
    loadSitesList();
});

// ============================================
// RÉINITIALISER LE SITE ACTUEL
// ============================================

resetCurrentBtn.addEventListener('click', async () => {
    if (!currentDomain) return;
    
    if (confirm(`Voulez-vous réinitialiser tous les éléments masqués sur ${currentDomain} ?`)) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        chrome.storage.local.get(['hiddenElements'], (result) => {
            const hiddenElements = result.hiddenElements || {};
            delete hiddenElements[currentDomain];
            
            chrome.storage.local.set({ hiddenElements }, () => {
                // Essayer de recharger la page
                if (tab && tab.id && !tab.url.startsWith('chrome://')) {
                    chrome.tabs.sendMessage(tab.id, { action: 'reloadPage' }, () => {
                        if (chrome.runtime.lastError) {
                            // Si ça ne marche pas, recharger directement
                            chrome.tabs.reload(tab.id);
                        }
                    });
                }
                updateStats();
                statusText.textContent = 'SITE RÉINITIALISÉ';
                setTimeout(() => statusText.textContent = 'SYSTÈME PRÊT', 2000);
            });
        });
    }
});

// ============================================
// RÉINITIALISER TOUS LES SITES
// ============================================

resetAllBtn.addEventListener('click', () => {
    if (confirm('⚠ ATTENTION : Voulez-vous vraiment supprimer TOUS les éléments masqués sur TOUS les sites ?')) {
        chrome.storage.local.set({ hiddenElements: {} }, async () => {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (tab && tab.id && !tab.url.startsWith('chrome://')) {
                chrome.tabs.sendMessage(tab.id, { action: 'reloadPage' }, () => {
                    if (chrome.runtime.lastError) {
                        // Si ça ne marche pas, recharger directement
                        chrome.tabs.reload(tab.id);
                    }
                });
            }
            
            updateStats();
            loadSitesList();
            statusText.textContent = 'TOUT RÉINITIALISÉ';
            setTimeout(() => statusText.textContent = 'SYSTÈME PRÊT', 2000);
        });
    }
});

// ============================================
// METTRE À JOUR LES STATISTIQUES
// ============================================

async function updateStats() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url) return;
    
    try {
        const url = new URL(tab.url);
        currentDomain = url.hostname;
        currentSiteSpan.textContent = currentDomain;
    } catch (e) {
        currentDomain = 'Unknown';
        currentSiteSpan.textContent = '--';
    }
    
    chrome.storage.local.get(['hiddenElements'], (result) => {
        const hiddenElements = result.hiddenElements || {};
        const sitesCount = Object.keys(hiddenElements).length;
        const currentHidden = hiddenElements[currentDomain]?.length || 0;
        
        sitesCountSpan.textContent = sitesCount;
        hiddenCountSpan.textContent = currentHidden;
    });
}

// ============================================
// CHARGER LA LISTE DES SITES
// ============================================

function loadSitesList() {
    chrome.storage.local.get(['hiddenElements'], (result) => {
        const hiddenElements = result.hiddenElements || {};
        
        if (Object.keys(hiddenElements).length === 0) {
            sitesList.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Aucun site nettoyé</div>';
            return;
        }
        
        let html = '';
        for (const [domain, selectors] of Object.entries(hiddenElements)) {
            html += `
                <div class="site-item">
                    <span class="site-url" title="${domain}">${domain}</span>
                    <span class="site-count">${selectors.length} élément(s)</span>
                    <button class="site-remove" data-domain="${domain}">✕</button>
                </div>
            `;
        }
        
        sitesList.innerHTML = html;
        
        // Ajouter les événements de suppression
        document.querySelectorAll('.site-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const domain = e.target.dataset.domain;
                removeSite(domain);
            });
        });
    });
}

// ============================================
// SUPPRIMER UN SITE
// ============================================

function removeSite(domain) {
    chrome.storage.local.get(['hiddenElements'], (result) => {
        const hiddenElements = result.hiddenElements || {};
        delete hiddenElements[domain];
        
        chrome.storage.local.set({ hiddenElements }, () => {
            loadSitesList();
            updateStats();
        });
    });
}

// ============================================
// ÉCOUTER LES MESSAGES DU CONTENT SCRIPT
// ============================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateStats') {
        updateStats();
    }
    return true; // Important pour les réponses asynchrones
});