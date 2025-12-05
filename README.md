# 🎮 Village Numérique Résistant

> Un jeu de stratégie sur les décisions numériques pour les écoles - Faire des choix éthiques face aux géants du numérique propriétaire

## 🎯 Vue d'ensemble

**Village Numérique Résistant** est un jeu de simulation décisionnel où vous prenez le rôle d'un responsable informatique dans un lycée. Pendant 21 tours, vous devez naviguer entre des choix technologiques éthiques et pragmatiques, en gérant 3 ressources principales:

- **💰 Budget** - Votre trésorerie pour les investissements
- **🦅 Autonomie** - Votre indépendance technologique face aux propriétaires
- **🌍 Écologie** - Votre impact environnemental et durabilité

### Objectifs
- Survivre aux 21 tours (années scolaires)
- Maximiser vos scores pour débloquer des achievements
- Accumuler des bonus via la boutique
- Faire des choix cohérents avec votre philosophie numérique

---

## 📖 Mécaniques de Jeu

### 1. **Système de Tours (21 Scénarios)**

Chaque tour présente un **dilemme numérique** réaliste avec 2-3 options:

```
Exemple:
🔹 Tour 1: RENTRÉE NUMÉRIQUE
   ├─ Achat Neuf (Goliath) 🔴 → Budget -20k€, Auto -10%, Éco -15
   └─ Reconditionnement (NIRD) ✅ → Budget 0€, Auto +20%, Éco +25
```

**Types de choix:**
- 🔴 **Goliath** - Propriétaire, facile, coûteux éthiquement
- 🟢 **David** - Semi-libre, équilibré
- 🟢 **NIRD** - Technique, complexe, éthique

### 2. **Système de Corrélations (Blocages/Déblocages)**

Vos choix ont des **conséquences à long terme**:

```javascript
Tour 1: Vous choisissez "Achat Neuf (propriétaire)"
  ↓
Tour 3: L'option "Nextcloud" devient BLOQUÉE
  Raison: "Vous avez choisi 'Achat Neuf' qui rend 
           cette option incompatible"
```

**Mécanique:**
- ✅ Certains choix **DÉBLOQUENT** des options futures (ex: Formation → Options avancées)
- 🔒 D'autres choix **BLOQUENT** les options incompatibles (ex: Propriétaire → Open Source impossible)
- 📊 L'état du blocage est **visible** avec badges et explications

### 3. **Événements Aléatoires (30% par tour)**

Chaque tour, il y a 30% de chance qu'un **événement aléatoire** se déclenche:

```
🔴 CYBERSÉCURITÉ: Un pirate trouve une faille
   Impact: Budget -3k€, Autonomie -5%

🟢 SUBVENTION: Région propose des fonds verts
   Impact: Budget +5k€, Écologie +10

⚠️ PANNE: Serveur principal down pendant 2 jours
   Impact: Autonomie -10%, But Budget ne bouge pas
```

**12 événements différents** avec impacts variés.

### 4. **Système d'Achievements 🏆**

7 achievements à débloquer selon votre **style de jeu**:

| Achievement | Condition | Débloque |
|-------------|-----------|----------|
| 🌍 Guerrier Écologique | Éco ≥ 80 | Duck, Stickers |
| 🦅 Maître Autonomie | Auto ≥ 80 | Café, Théories |
| 💰 Gestionnaire d'Or | Budget ≥ 30k | Poster |
| ⚖️ Voie Équilibrée | All ≥ 60 | **Friteuse** |
| 🤓 Maître NIRD | 5+ choix NIRD | Poster, Stickers |
| 🗽 Champion David | 5+ choix David | Café, Duck |
| 🕊️ Esprit Libre | Zéro Goliath | **Friteuse**, Théories, Café |

### 5. **Boutique de Bonus**

Utilisez votre budget pour acheter des bonus:

**Items Disponibles Immédiatement:**
- 🧑‍💼 Consultant Externe (2k€) → +10% Auto (Max: 2)
- 💾 Vente Vintage (Éco -5) → +3k€ Budget (Max: 3)
- 📜 Subvention Green IT (Éco > 80) → +5k€ (Max: 1)
- 🎓 Formation Intensive (4k€) → +20% Auto (Max: 2)

**Items Débloquables par Achievements:**
- 🍟 Friteuse Gamer LED (0.5k€) - Ironie : -2% Auto, -15 Éco
- ☕ Machine à Café Premium (1k€) - Ironie : +5% Auto, -20 Éco
- 🖼️ Poster Linus Torvalds (0.1k€) - +3% Auto (Max: 5)
- 🦆 Mascotte DuckDuckGo (0.2k€) - +5 Éco (Max: 3)
- 📺 Théories Conspirationnistes (0.3k€) - +10% Auto, -5 Éco (Max: 1)
- 🎨 Stickers Anarchistes (0.05k€) - +1% Auto (Max: 10)

### 6. **Visualisation Audio Réactive 🎵**

L'interface inclut un **analyseur audio en temps réel**:

**Deux sources audio:**
1. 🎤 **Microphone** - Capture votre environnement physique
2. 🔊 **Audio Système** - Capture l'audio de votre écran

**Visualisation:**
- Graphique FFT en temps réel (256 points)
- Dégradé de couleurs neon (bleu→vert→rouge)
- Réagit instantanément aux bruits

### 7. **Statistiques de Fin de Partie**

À la fin des 21 tours, consultez vos stats:

```
📊 RÉSUMÉ FINAL
Scores Finaux:
  💰 Budget: 45.2k€
  🦅 Autonomie: 78%
  🌍 Écologie: 92/100

Choix Effectués:
  🤓 NIRD: 8 choix
  🟢 David: 7 choix
  🔴 Goliath: 6 choix

Achievements: 5/7 débloqués
```

**Graphique:**
- Histogramme montrant la répartition NIRD/David/Goliath
- Permet d'analyser votre style de jeu

---

## 🎮 Modes de Difficulté

### 📍 Mode Normal (Par défaut)
- Budget: 50k€, Auto: 15%, Éco: 65/100
- Équilibre entre challenge et accessibilité

### 😎 Mode Initié (Facile)
- Budget: 70k€, Auto: 20%, Éco: 65/100
- Coûts réduits 20%, Récompenses +20%
- Parfait pour apprendre

### 🔥 Mode Hacker (Difficile)
- Budget: 20k€, Auto: 5%, Éco: 50/100
- Coûts augmentés 50%, Récompenses réduites 20%
- L'écologie est plus sévère
- Challenge extrême!

**Accès:** `decision.html?diff=easy` ou `?diff=hard`

---

## 🗂️ Structure du Projet

```
├── index.html          # Page d'accueil
├── decision.html       # Interface de jeu (PRINCIPAL)
├── klub.html          # Animation de chargement
├── snake.html         # Mini-jeu Snake (bonus)
├── 404.html           # Page d'erreur
├── data.js            # Données du jeu (scenarios, items, events)
├── README.md          # Cette documentation
├── ACHIEVEMENTS.md    # Guide des achievements
└── home.html          # Écran de sélection
```

### Fichiers Clés

**data.js** (~1156 lignes)
- Définition des 21 scénarios avec 2-3 choix chacun
- Liste des 4 items de base + 6 items bonus
- 12 événements aléatoires
- 7 achievements avec conditions

**decision.html** (~1140 lignes)
- Interface graphique (Tailwind CSS + Material Symbols)
- Logique du jeu (tour, corrélations, achievements)
- Visualisation audio réactive
- Écran de statistiques

---

## 🎨 Design & Technologie

### Stack Technique
- **Frontend:** HTML5 + CSS3 (Tailwind) + JavaScript ES6+
- **Audio:** Web Audio API (getUserMedia, getDisplayMedia, FFT)
- **Visualisation:** Canvas API pour le graphique audio
- **Styling:** Tailwind CSS avec thème custom neon

### Palette de Couleurs (Neon Terminal Theme)
```css
--neon-red:   #ff3333   /* Goliath, danger *)
--neon-green: #00ff66   /* David/NIRD, success *)
--neon-blue:  #00ccff   /* Interface, info *)
--warning:    #ffff00   /* Attention *)
```

### Design Responsif
- 📱 Mobile-first avec Tailwind
- 🖥️ Optimisé pour desktop (1920px+)
- ⚡ Animations smooth (fade-in, pulse, shake)

---

## 🚀 Comment Jouer

### 1. **Lancer le Jeu**
```bash
# Option A: Ouvrir directement
open decision.html

# Option B: Serveur local (Python)
python -m http.server 8000
# Accès: http://localhost:8000/decision.html

# Option C: Avec serveur Node
npx http-server
```

### 2. **Sélectionner la Difficulté**
```
🎮 ÉCRAN TITRE
Normal     → decision.html
Initié     → decision.html?diff=easy
Hacker     → decision.html?diff=hard
```

### 3. **Jouer les 21 Tours**
```
Pour chaque tour:
1. Lire le scénario
2. Analyser les 2-3 options
3. Cliquer sur votre choix
4. Voir l'impact immédiat
5. Continuer vers le tour suivant
```

### 4. **Utiliser la Boutique**
```
En n'importe quel moment:
- Clic "Achats / Bonus"
- Voir les achievements débloqués
- Acheter les items disponibles
- Retour au jeu
```

### 5. **Fin de Partie**
```
Après 21 tours:
- Affichage des scores finaux
- Statistiques détaillées
- Graphique des choix
- Relancer pour une nouvelle partie
```

---

## 💡 Stratégies Recommandées

### 🌍 Chemin Écologique
1. Choisir TOUJOURS les options green
2. Viser le score Éco ≥ 80 (Achievement)
3. Débloquer Duck & Stickers
4. Sacrifice possible: Autonomie faible

### 🦅 Chemin Technique (NIRD)
1. Favoriser les choix techniques complexes
2. Faire 5+ choix NIRD (Achievement)
3. Débloquer Poster & Stickers
4. Résultat: Très autonome

### 🕊️ Chemin Liberté (Esprit Libre)
1. **Refuser TOUS les Goliath**
2. Débloquer Friteuse + Théories + Café (les meilleurs items!)
3. Challenge maximum: Zéro compromis
4. Reward: 3 items inutiles mais hilarants

### ⚖️ Chemin Équilibré
1. Maintenir tous les scores ≥ 60
2. Débloquer Achievement + Friteuse
3. Style: Pas de risque, équilibre constant

### 💰 Chemin Riche
1. Maximiser le budget dès le départ
2. Faire des choix rentables (Vente Vintage)
3. Viser Achievement Gestionnaire (Budget ≥ 30k)
4. S'acheter des trucs inutiles

---

## 🔊 Fonctionnalité Audio Détaillée

### Activation
- Clic sur bouton 🎤 pour microphone
- Clic sur bouton 🔊 pour audio système
- Auto-demande de permission au chargement

### Visualisation
- **Graphique FFT:** 256 barres de fréquence
- **Couleurs:** Gradient en fonction de l'intensité
- **Réactivité:** Mise à jour ~50 fois par seconde
- **Arrêt automatique:** À la fin du jeu

### Détails Techniques
```javascript
// Dual audio source
- getUserMedia()      // Microphone via NAV API
- getDisplayMedia()   // Audio système via Screen Share API
- AnalyserNode       // FFT analysis (256 points)
- Canvas API         // Rendu graphique
```

---

## 🏆 Système d'Achievements Complet

Voir **ACHIEVEMENTS.md** pour plus de détails.

```
🏆 7 achievements à débloquer:
- Guerrier Écologique (Éco 80+)
- Maître Autonomie (Auto 80+)
- Gestionnaire d'Or (Budget 30k)
- Voie Équilibrée (All ≥ 60)
- Maître NIRD (5+ NIRD)
- Champion David (5+ David)
- Esprit Libre (Zéro Goliath) ← LA PLUS DURE
```

**Système de déblocage:**
- Vérification automatique après chaque choix
- Notifications visuelles (banner animée)
- Déblocage des items de shop
- Persistance pendant toute la partie

---

## 🎓 Contexte Pédagogique

Ce jeu illustre:

1. **Choix technologiques réels** - Dilemmes authentiques face aux GAFAM
2. **Conséquences à long terme** - Un choix aujourd'hui bloque demain
3. **Gestion de ressources** - Équilibrer budget, autonomie, éthique
4. **Prise de décision** - Compromis vs principes
5. **Aléatoire** - Gérer l'imprévu dans la stratégie
6. **Gamification** - Achievements et objectives pour motiver

**Idéal pour:**
- Étudiants en informatique
- Administrateurs système
- Décideurs IT
- Débat sur la souveraineté numérique

---

## 🐛 Notes Techniques

### Navigateurs Supportés
- ✅ Chrome/Chromium 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Permissions Requises
- 🎤 Accès au microphone (audio)
- 🔊 Accès à l'audio système (optionnel)

### Pas de Dépendances Externes
- Tailwind CSS (CDN)
- Material Symbols (CDN)
- Tout le reste: Vanilla JavaScript

---

## 📊 Statistiques du Jeu

- **21 Tours** de gameplay
- **2-3 Options** par scénario
- **12 Événements Aléatoires** possibles
- **10 Items** de shop
- **7 Achievements** à débloquer
- **3 Niveaux de Difficulté**

---

## 🎮 Exemples de Scénarios

### Tour 1: RENTRÉE NUMÉRIQUE
```
Le parc informatique vieillit. Que faire?
❌ Achat Neuf (propriétaire)  → -20k€, -10% Auto, -15 Éco
✅ Reconditionnement Linux    → 0€, +20% Auto, +25 Éco
```

### Tour 5: CLOUD COLLABORATION
```
Les profs demandent Google Workspace. Vous proposez:
❌ Accepter Google            → +2k€, -30% Auto
🟡 Office 365 (moins pire)   → Équilibré
✅ Nextcloud Perso            → +15% Auto, +10 Éco
```

### Tour 12: PRESSION GAFAM
```
Microsoft offre des licences gratuites. Tentant?
❌ Accepter (vendor lock-in)  → +10k€ MAIS -40% Auto futur
✅ Refuser                    → +5% Auto, +20 Éco
```

---

## 🔗 Ressources Externes

**Défis originaux (Nuit de l'Info 2024):**
- https://www.nuitdelinfo.com/inscription/defis/475
- https://www.nuitdelinfo.com/inscription/defis/483
- https://www.nuitdelinfo.com/inscription/defis/494
- https://www.nuitdelinfo.com/inscription/defis/503
- https://www.nuitdelinfo.com/inscription/defis/510

---

## 📝 Licence & Crédits

Jeu développé pour la **Nuit de l'Info 2024**
Thème: Souveraineté et indépendance numérique

---

**Prêt à sauver votre école du numérique propriétaire?** 🚀
