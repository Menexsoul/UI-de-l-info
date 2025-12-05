// ============================================
// WEB CLEANER VNR - CONTENT SCRIPT
// Version corrigée et testée
// ============================================

// État de l'extension
let isEditMode = false;
let hoveredElement = null;
let overlay = null;
let infoBox = null;

// Récupérer le domaine actuel
const currentDomain = window.location.hostname;

// ============================================
// INITIALISATION
// ============================================

// Attendre que le DOM soit prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM déjà chargé
    init();
}

function init() {
    console.log('🚀 Web Cleaner VNR - Initialisation sur:', currentDomain);
    
    // Attendre que le body soit disponible
    if (!document.body) {
        console.log('⏳ Attente du body...');
        setTimeout(init, 100);
        return;
    }
    
    injectStyles();
    createOverlay();
    applyHiddenElements();
    
    console.log('✅ Initialisation terminée');
}

// ============================================
// INJECTER LES STYLES CSS
// ============================================

function injectStyles() {
    // Éviter les doublons
    if (document.getElementById('vnr-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'vnr-styles';
    style.textContent = `
        /* Masquer les éléments marqués */
        [data-vnr-hidden="true"] {
            display: none !important;
        }
        
        /* Animations */
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        /* Animation pour l'overlay */
        #vnr-overlay {
            animation: vnr-pulse 1.5s infinite;
        }
        
        @keyframes vnr-pulse {
            0%, 100% {
                box-shadow: 0 0 20px rgba(0, 255, 102, 0.5);
            }
            50% {
                box-shadow: 0 0 30px rgba(0, 255, 102, 0.8);
            }
        }
    `;
    
    (document.head || document.documentElement).appendChild(style);
    console.log('🎨 Styles injectés');
}

// ============================================
// APPLIQUER LES ÉLÉMENTS MASQUÉS AU CHARGEMENT
// ============================================

function applyHiddenElements() {
    chrome.storage.local.get(['hiddenElements'], (result) => {
        const hiddenElements = result.hiddenElements || {};
        const selectors = hiddenElements[currentDomain] || [];
        
        console.log(`📂 ${selectors.length} sélecteur(s) à appliquer sur ${currentDomain}`);
        
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = 'none';
                    el.setAttribute('data-vnr-hidden', 'true');
                });
                
                if (elements.length > 0) {
                    console.log(`✅ Appliqué: ${selector} (${elements.length} élément(s))`);
                }
            } catch (e) {
                console.error(`❌ Erreur avec le sélecteur: ${selector}`, e);
            }
        });
    });
}

// ============================================
// CRÉER L'OVERLAY DE SÉLECTION
// ============================================

function createOverlay() {
    // Éviter les doublons
    if (document.getElementById('vnr-overlay')) {
        overlay = document.getElementById('vnr-overlay');
        infoBox = document.getElementById('vnr-info-box');
        return;
    }
    
    // Overlay de surbrillance
    overlay = document.createElement('div');
    overlay.id = 'vnr-overlay';
    overlay.style.cssText = `
        position: absolute;
        pointer-events: none;
        border: 3px solid #00ff66;
        background: rgba(0, 255, 102, 0.1);
        z-index: 999999;
        display: none;
        box-shadow: 0 0 20px rgba(0, 255, 102, 0.5);
        transition: all 0.1s ease;
    `;
    document.body.appendChild(overlay);
    
    // Boîte d'information
    infoBox = document.createElement('div');
    infoBox.id = 'vnr-info-box';
    infoBox.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #121212;
        color: #00ff66;
        padding: 15px 20px;
        border: 2px solid #00ff66;
        font-family: 'Roboto Mono', monospace;
        font-size: 12px;
        z-index: 1000000;
        display: none;
        box-shadow: 0 0 30px rgba(0, 255, 102, 0.5);
        max-width: 300px;
        border-radius: 4px;
    `;
    document.body.appendChild(infoBox);
    
    console.log('🎯 Overlay créé');
}

// ============================================
// ACTIVER/DÉSACTIVER LE MODE ÉDITION
// ============================================

function toggleEditMode() {
    isEditMode = !isEditMode;
    
    if (isEditMode) {
        enableEditMode();
    } else {
        disableEditMode();
    }
    
    console.log(`🎮 Mode édition: ${isEditMode ? 'ACTIVÉ' : 'DÉSACTIVÉ'}`);
    
    return isEditMode;
}

// ============================================
// ACTIVER LE MODE ÉDITION
// ============================================

function enableEditMode() {
    infoBox.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px; text-shadow: 0 0 10px #00ff66;">
            🎯 MODE ÉDITION ACTIF
        </div>
        <div style="font-size: 11px; color: #e0e0e0; line-height: 1.5;">
            • Survolez un élément<br>
            • Cliquez pour masquer<br>
            • Échap pour quitter
        </div>
    `;
    infoBox.style.display = 'block';
    
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown);
    
    document.body.style.cursor = 'crosshair';
}

// ============================================
// DÉSACTIVER LE MODE ÉDITION
// ============================================

function disableEditMode() {
    infoBox.style.display = 'none';
    overlay.style.display = 'none';
    
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeyDown);
    
    document.body.style.cursor = 'default';
}

// ============================================
// GÉRER LE SURVOL
// ============================================

function handleMouseOver(e) {
    if (!isEditMode) return;
    
    // Ignorer l'overlay et l'infoBox
    if (e.target.id === 'vnr-overlay' || 
        e.target.id === 'vnr-info-box' || 
        e.target.closest('#vnr-info-box') ||
        e.target.closest('#vnr-overlay')) {
        return;
    }
    
    hoveredElement = e.target;
    highlightElement(hoveredElement);
}

// ============================================
// GÉRER LA SORTIE DU SURVOL
// ============================================

function handleMouseOut(e) {
    if (!isEditMode) return;
    overlay.style.display = 'none';
}

// ============================================
// SURLIGNER UN ÉLÉMENT
// ============================================

function highlightElement(element) {
    try {
        const rect = element.getBoundingClientRect();
        
        overlay.style.display = 'block';
        overlay.style.top = `${rect.top + window.scrollY}px`;
        overlay.style.left = `${rect.left + window.scrollX}px`;
        overlay.style.width = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
    } catch (e) {
        console.error('Erreur lors de la surbrillance:', e);
    }
}

// ============================================
// GÉRER LE CLIC
// ============================================

function handleClick(e) {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Ignorer l'overlay et l'infoBox
    if (e.target.id === 'vnr-overlay' || 
        e.target.id === 'vnr-info-box' || 
        e.target.closest('#vnr-info-box') ||
        e.target.closest('#vnr-overlay')) {
        return;
    }
    
    console.log('🖱️ Clic sur:', e.target.tagName, e.target.className);
    hideElement(e.target);
}

// ============================================
// GÉRER LES TOUCHES CLAVIER
// ============================================

function handleKeyDown(e) {
    if (e.key === 'Escape') {
        console.log('⌨️ Échap pressé');
        isEditMode = false;
        disableEditMode();
        
        // Informer la popup
        try {
            chrome.runtime.sendMessage({ action: 'editModeDisabled' });
        } catch (e) {
            console.log('Impossible d\'informer la popup');
        }
    }
}

// ============================================
// MASQUER UN ÉLÉMENT
// ============================================

function hideElement(element) {
    // Générer un sélecteur CSS unique
    const selector = generateSelector(element);
    console.log('📝 Sélecteur généré:', selector);
    
    // Masquer l'élément visuellement
    element.style.display = 'none';
    element.setAttribute('data-vnr-hidden', 'true');
    
    // Sauvegarder dans le storage
    chrome.storage.local.get(['hiddenElements'], (result) => {
        const hiddenElements = result.hiddenElements || {};
        
        if (!hiddenElements[currentDomain]) {
            hiddenElements[currentDomain] = [];
        }
        
        // Éviter les doublons
        if (!hiddenElements[currentDomain].includes(selector)) {
            hiddenElements[currentDomain].push(selector);
        }
        
        chrome.storage.local.set({ hiddenElements }, () => {
            console.log('💾 Élément sauvegardé');
            showNotification(`✓ Élément masqué`);
            
            // Mettre à jour les stats
            try {
                chrome.runtime.sendMessage({ action: 'updateStats' });
            } catch (e) {
                console.log('Impossible de mettre à jour les stats');
            }
        });
    });
    
    overlay.style.display = 'none';
}

// ============================================
// GÉNÉRER UN SÉLECTEUR CSS UNIQUE
// ============================================

function generateSelector(element) {
    // Stratégie : utiliser l'ID, sinon la classe, sinon la position dans le DOM
    
    // 1. Essayer l'ID
    if (element.id) {
        return `#${CSS.escape(element.id)}`;
    }
    
    // 2. Essayer la classe (première classe seulement)
    if (element.className && typeof element.className === 'string') {
        const firstClass = element.className.split(' ')[0].trim();
        if (firstClass && firstClass.length > 0) {
            return `.${CSS.escape(firstClass)}`;
        }
    }
    
    // 3. Utiliser le chemin depuis le body
    const path = [];
    let current = element;
    
    while (current && current !== document.body && current !== document.documentElement) {
        let selector = current.tagName.toLowerCase();
        
        if (current.id) {
            selector += `#${CSS.escape(current.id)}`;
            path.unshift(selector);
            break;
        } else if (current.className && typeof current.className === 'string') {
            const classes = current.className.split(' ')
                .filter(c => c.trim())
                .map(c => `.${CSS.escape(c.trim())}`)
                .join('');
            if (classes) {
                selector += classes;
            }
        }
        
        // Ajouter nth-child si nécessaire
        if (current.parentElement) {
            const siblings = Array.from(current.parentElement.children).filter(
                child => child.tagName === current.tagName
            );
            if (siblings.length > 1) {
                const index = siblings.indexOf(current) + 1;
                selector += `:nth-child(${index})`;
            }
        }
        
        path.unshift(selector);
        current = current.parentElement;
    }
    
    return path.length > 0 ? path.join(' > ') : element.tagName.toLowerCase();
}

// ============================================
// AFFICHER UNE NOTIFICATION
// ============================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 10px;
        background: #121212;
        color: #00ff66;
        padding: 12px 20px;
        border: 2px solid #00ff66;
        font-family: 'Roboto Mono', monospace;
        font-size: 13px;
        z-index: 1000001;
        box-shadow: 0 0 20px rgba(0, 255, 102, 0.5);
        animation: slideIn 0.3s ease;
        border-radius: 4px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ============================================
// ÉCOUTER LES MESSAGES DE LA POPUP
// ============================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('📨 Message reçu:', message);
    
    if (message.action === 'toggleEditMode') {
        const active = toggleEditMode();
        sendResponse({ isActive: active });
    } else if (message.action === 'reloadPage') {
        window.location.reload();
    }
    
    return true;
});

console.log('🚀 Web Cleaner VNR - Content Script chargé sur:', currentDomain);