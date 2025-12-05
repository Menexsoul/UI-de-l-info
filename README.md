https://www.nuitdelinfo.com/inscription/defis/475
https://www.nuitdelinfo.com/inscription/defis/483
https://www.nuitdelinfo.com/inscription/defis/494
https://www.nuitdelinfo.com/inscription/defis/503
https://www.nuitdelinfo.com/inscription/defis/510


écrit ça en format readme de github : # 🎯 Web Cleaner VNR - Extension de Navigateur

**Défi Platon Formation - Nuit de l'Info 2025**

Une extension de navigateur cyberpunk pour nettoyer le web comme VOUS l'entendez !

## 🚀 Description

Web Cleaner VNR est une extension Chrome/Firefox qui permet aux utilisateurs de masquer définitivement les éléments indésirables (publicités, bannières, pop-ups, etc.) sur leurs sites web préférés. L'extension mémorise vos choix et applique automatiquement vos préférences lors de vos futures visites.

## ✨ Fonctionnalités

### Fonctionnalités principales

- **Mode Édition Interactif** : Survolez et cliquez sur n'importe quel élément pour le masquer
- **Persistance par Site** : Les éléments masqués restent cachés lors de vos prochaines visites
- **Gestion Centralisée** : Visualisez et gérez tous vos sites nettoyés depuis un panneau dédié
- **Statistiques en Temps Réel** : Suivez le nombre d'éléments masqués par site
- **Réinitialisation Flexible** : Réinitialisez un site spécifique ou tous les sites d'un coup

### Fonctionnalités bonus

- **Interface Cyberpunk** : Design dark mode avec effets néon et glitch
- **Indicateurs Visuels** : Overlay animé lors de la sélection d'éléments
- **Notifications** : Retour visuel lors du masquage d'éléments
- **Badge Dynamique** : Compteur du nombre de sites nettoyés sur l'icône de l'extension
- **Raccourcis Clavier** : Appuyez sur Échap pour quitter le mode édition

## 📦 Installation

### Chrome / Chromium / Edge

1. **Téléchargez l'extension**
   ```bash
   # Cloner le dépôt ou télécharger le ZIP
   git clone https://github.com/votre-repo/web-cleaner-vnr.git
   cd web-cleaner-vnr
   ```

2. **Ouvrez Chrome et accédez à** `chrome://extensions/`

3. **Activez le "Mode développeur"** (coin supérieur droit)

4. **Cliquez sur "Charger l'extension non empaquetée"**

5. **Sélectionnez le dossier de l'extension**

6. **L'extension est maintenant installée !** 🎉

## 🎮 Utilisation

### Masquer des éléments

1. **Cliquez sur l'icône de l'extension** dans la barre d'outils
2. **Cliquez sur "▶ ACTIVER MODE ÉDITION"**
3. **Survolez les éléments** de la page que vous souhaitez masquer
4. **Cliquez sur un élément** pour le masquer définitivement
5. **Appuyez sur Échap** ou cliquez sur "⏹ DÉSACTIVER MODE ÉDITION" pour quitter

### Gérer vos sites

1. **Ouvrez la popup de l'extension**
2. **Cliquez sur "📋 GÉRER LES SITES"**
3. **Consultez la liste** de tous vos sites nettoyés
4. **Cliquez sur ✕** pour supprimer un site de la liste

### Réinitialiser

- **Réinitialiser le site actuel** : Cliquez sur "⟲ RÉINITIALISER CE SITE"
- **Tout réinitialiser** : Cliquez sur "⚠ TOUT RÉINITIALISER" (avec confirmation)

## 🛠️ Structure du Projet

```
web-cleaner-vnr/
├── manifest.json           # Configuration de l'extension
├── popup.html             # Interface utilisateur (popup)
├── popup.js               # Logique de la popup
├── content.js             # Script injecté dans les pages
├── content.css            # Styles injectés
├── background.js          # Service worker
├── icons/                 # Icônes de l'extension
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # Ce fichier
```

## 💾 Stockage des Données

L'extension utilise `chrome.storage.local` pour stocker les éléments masqués :

```javascript
{
  "hiddenElements": {
    "example.com": [
      "#ad-banner",
      ".popup-overlay",
      "div.sidebar:nth-child(2)"
    ],
    "autre-site.fr": [
      ".cookie-banner"
    ]
  }
}
```

Les données sont stockées **localement** sur votre navigateur et ne sont **jamais** envoyées à un serveur externe.

## 🎨 Technologies Utilisées

- **Manifest V3** : Dernière version du système d'extensions Chrome
- **JavaScript Vanilla** : Aucune dépendance externe
- **CSS Custom** : Design cyberpunk avec animations
- **Chrome Storage API** : Persistance des données
- **Content Scripts** : Injection et manipulation du DOM

## 🔧 Développement

### Prérequis

- Navigateur Chrome/Chromium/Edge (version 88+) ou Firefox (version 109+)
- Éditeur de code (VS Code recommandé)

### Modifications

Pour modifier l'extension :

1. Éditez les fichiers sources
2. Rechargez l'extension dans `chrome://extensions/`
3. Testez les modifications sur différents sites

### Debugging

- **Console de la popup** : Clic droit sur la popup → Inspecter
- **Console du content script** : F12 sur la page web → Console
- **Service worker** : `chrome://extensions/` → Détails → Inspecter les vues

## 🐛 Problèmes Connus

- Les sélecteurs générés automatiquement peuvent parfois être trop spécifiques
- Certains sites avec du contenu dynamique peuvent nécessiter plusieurs sélections
- Les éléments ajoutés dynamiquement après le chargement ne sont pas détectés

## 🎯 Améliorations Futures

- [ ] Mode "avant/après" pour comparer
- [ ] Export/import de configurations
- [ ] Suggestions automatiques d'éléments à masquer
- [ ] Mode "agrandissement" d'éléments
- [ ] Support des expressions régulières pour les sélecteurs
- [ ] Synchronisation entre appareils

## 📝 Licence

Ce projet a été créé dans le cadre de la **Nuit de l'Info 2025** pour le défi **Platon Formation**.

## 👥 Auteurs

Projet réalisé pour le **Village Numérique Résistant (VNR)** - Équipe Nuit de l'Info 2025

## 🙏 Remerciements

- **Platon Formation** pour le défi
- **Nuit de l'Info 2025** pour l'événement
- La communauté open-source pour l'inspiration

---

**Nettoyez le web comme VOUS l'entendez !** 🚀✨