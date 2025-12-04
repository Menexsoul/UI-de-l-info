// --- DONNÉES DE JEU (Adaptées avec style) ---
const scenarios = {
  1: {
    title: "DECISION_REQ_01: L'ATTAQUE DU BLOATWARE",
    desc: "> [SYSTEM] Les vieux PC rament à cause de la dernière mise à jour propriétaire. Une intervention est nécessaire.",
    options: [
      {
        type: "goliath",
        title: "Option A: Acheter des nouveaux PC",
        desc: "// ERROR: Achat de nouveaux PC. Solution immédiate mais coûteuse et génère beaucoup de déchets.",
        icon: "warning",
        stats_display: [
          { label: "Budget", val: "- 5 000 €", icon: "arrow_downward", color: "text-danger" },
          { label: "Autonomie", val: "- 10 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "- 50 pts", icon: "delete", color: "text-danger" }
        ],
        effect: () => { budget -= 5; autonomie -= 10; ecologie -= 50; },
        percent: 65
      },
      {
        type: "nird",
        title: "Option B: Passer sous Linux (Opération NIRD)",
        desc: "// SUCCESS: Réinstallation de Linux sur les anciens PC. Les PC revivent et les élèves apprennent à coder.",
        icon: "recycling",
        stats_display: [
          { label: "Budget", val: "- 200 €", icon: "arrow_downward", color: "text-warning" },
          { label: "Autonomie", val: "+ 30 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-success" }
        ],
        effect: () => { budget -= 0.2; autonomie += 30; },
        percent: 35
      }
    ]
  },
  2: {
    title: "DECISION_REQ_02: LE COUPERET DE WINDOWS 10",
    desc: "> [SYSTEM] La fin du support de Windows 10 est annoncée. Vos PC fonctionnent encore, mais Microsoft dit qu'ils sont obsolètes.",
    options: [
      {
        type: "goliath",
        title: "Option A: Tout jeter et racheter 50 PC compatibles Windows 11",
        desc: "// ALERT: Achat massif de PC neufs. Solution coûteuse renforçant la dépendance au fournisseur.",
        icon: "shopping_cart",
        stats_display: [
          { label: "Budget", val: "- 10 000 €", icon: "arrow_downward", color: "text-danger" },
          { label: "Autonomie", val: "- 10 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "- 50 pts", icon: "delete", color: "text-danger" }
        ],
        effect: () => { budget -= 10; autonomie -= 10; ecologie -= 50; },
        percent: 58
      },
      {
        type: "nird",
        title: "Option B: Installer Linux Mint sur tout le parc",
        desc: "// INFO: \"Non ! Ils marchent encore.\" Les PC ont une nouvelle vie, mais les profs râlent : \"C'est quoi ce menu ?\"",
        icon: "computer",
        stats_display: [
          { label: "Budget", val: "- 200 €", icon: "arrow_downward", color: "text-warning" },
          { label: "Autonomie", val: "+ 20 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "+ 10 pts", icon: "eco", color: "text-success" }
        ],
        effect: () => { budget -= 0.2; autonomie += 20; ecologie += 10; },
        percent: 42
      }
    ]
  },
  3: {
    title: "DECISION_REQ_03: LA RANÇON DU LOGICIEL",
    desc: "> [SYSTEM] L'abonnement annuel à la suite bureautique propriétaire arrive à échéance. Le prix a augmenté de 20%.",
    options: [
      {
        type: "goliath",
        title: "Option A: Payer la facture sans discuter",
        desc: "// ERROR: Payer le renouvellement. C'est plus sûr mais la facture est salée.",
        icon: "credit_card",
        stats_display: [
          { label: "Budget", val: "- 3 000 €", icon: "arrow_downward", color: "text-danger" },
          { label: "Autonomie", val: "- 5 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-text-dark" }
        ],
        effect: () => { budget -= 3; autonomie -= 5; },
        percent: 71
      },
      {
        type: "nird",
        title: "Option B: Migrer vers LibreOffice",
        desc: "// SUCCESS: Utiliser la \"Forge des communs\". Économie faite, mais un besoin de formation se fait sentir.",
        icon: "description",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-success" },
          { label: "Autonomie", val: "+ 15 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-success" }
        ],
        effect: () => { autonomie += 15; },
        percent: 29
      }
    ]
  },
  4: {
    title: "DECISION_REQ_04: LE STOCKAGE NUAGEUX",
    desc: "> [SYSTEM] On ne sait plus où stocker les notes des élèves. Une offre 'Gratuite' d'un géant américain se présente, mais les données partent hors UE.",
    options: [
      {
        type: "goliath",
        title: "Option A: Accepter l'offre \"Gratuite\"",
        desc: "// ALERT: Nos données sont le produit. Un peu d'argent rentre, mais le danger RGPD est imminent.",
        icon: "cloud_upload",
        stats_display: [
          { label: "Budget", val: "+ 500 €", icon: "arrow_upward", color: "text-success" },
          { label: "Autonomie", val: "- 20 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-text-dark" }
        ],
        effect: () => { budget += 0.5; autonomie -= 20; },
        percent: 54
      },
      {
        type: "nird",
        title: "Option B: Monter un serveur local Nextcloud",
        desc: "// SUCCESS: Souveraineté des données assurée, mais il y a quelques bugs au début.",
        icon: "cloud_done",
        stats_display: [
          { label: "Budget", val: "- 500 €", icon: "arrow_downward", color: "text-warning" },
          { label: "Autonomie", val: "+ 25 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-success" }
        ],
        effect: () => { budget -= 0.5; autonomie += 25; },
        percent: 46
      }
    ]
  },
  5: {
    title: "DECISION_REQ_05: L'ARMÉE DES ÉCO-DÉLÉGUÉS",
    desc: "> [SYSTEM] Des élèves motivés veulent aider à gérer le parc informatique, mais l'administration hésite.",
    options: [
      {
        type: "goliath",
        title: "Option A: Refuser leur aide",
        desc: "// ERROR: \"C'est trop technique, laissez faire les pros certifiés Microsoft.\" Le statu quo est maintenu.",
        icon: "block",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-text-dark" },
          { label: "Autonomie", val: "- 5 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-text-dark" }
        ],
        effect: () => { autonomie -= 5; },
        percent: 62
      },
      {
        type: "nird",
        title: "Option B: Créer un club \"Répar'Acteurs\"",
        desc: "// SUCCESS: Avec les éco-délégués. Économies de maintenance et un boost d'autonomie pour l'établissement.",
        icon: "groups",
        stats_display: [
          { label: "Budget", val: "+ 1 000 €", icon: "arrow_upward", color: "text-success" },
          { label: "Autonomie", val: "+ 15 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "+ 10 pts", icon: "eco", color: "text-success" }
        ],
        effect: () => { budget += 1; autonomie += 15; ecologie += 10; },
        percent: 38
      }
    ]
  },
  6: {
    title: "DECISION_REQ_06: LA PANNE MATÉRIELLE",
    desc: "> [SYSTEM] 10 écrans sont tombés en panne simultanément. Obsolescence programmée ?",
    options: [
      {
        type: "goliath",
        title: "Option A: Commander du neuf sur Amazon",
        desc: "// ERROR: Solution rapide mais coûteuse et génère du déchet.",
        icon: "shopping_bag",
        stats_display: [
          { label: "Budget", val: "- 1 500 €", icon: "arrow_downward", color: "text-danger" },
          { label: "Autonomie", val: "0 %", icon: "horizontal_rule", color: "text-text-dark" },
          { label: "Écologie", val: "- 10 pts", icon: "delete", color: "text-danger" }
        ],
        effect: () => { budget -= 1.5; ecologie -= 10; },
        percent: 73
      },
      {
        type: "nird",
        title: "Option B: Atelier soudure !",
        desc: "// SUCCESS: On change les condensateurs nous-mêmes. Le matériel est sauvé pour un coût minime.",
        icon: "handyman",
        stats_display: [
          { label: "Budget", val: "- 50 €", icon: "arrow_downward", color: "text-warning" },
          { label: "Autonomie", val: "0 %", icon: "horizontal_rule", color: "text-success" },
          { label: "Écologie", val: "+ 20 pts", icon: "eco", color: "text-success" }
        ],
        effect: () => { budget -= 0.05; ecologie += 20; },
        percent: 27
      }
    ]
  },
  7: {
    title: "DECISION_REQ_07: LA TENTATION DES TABLETTES",
    desc: "> [SYSTEM] Le département propose d'offrir des tablettes verrouillées à tous les élèves. C'est un 'cadeau' empoisonné.",
    options: [
      {
        type: "goliath",
        title: "Option A: Accepter les tablettes",
        desc: "// ALERT: C'est moderne et brillant ! Les élèves adorent, mais l'établissement est enfermé dans un écosystème fermé.",
        icon: "tablet",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-text-dark" },
          { label: "Autonomie", val: "- 30 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-text-dark" }
        ],
        effect: () => { autonomie -= 30; },
        percent: 68
      },
      {
        type: "nird",
        title: "Option B: Reconditionner des vieux laptops",
        desc: "// SUCCESS: Demander le budget pour reconditionner des vieux laptops d'entreprises. C'est moins \"sexy\", mais souverain.",
        icon: "laptop",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-success" },
          { label: "Autonomie", val: "+ 20 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "+ 20 pts", icon: "eco", color: "text-success" }
        ],
        effect: () => { autonomie += 20; ecologie += 20; },
        percent: 32
      }
    ]
  },
  8: {
    title: "DECISION_REQ_08: LA FORMATION DES REBELLES",
    desc: "> [SYSTEM] Les profs sont perdus sous Linux. La grogne monte. Action immédiate requise.",
    options: [
      {
        type: "goliath",
        title: "Option A: Revenir sous Windows",
        desc: "// CRITICAL: Pour avoir la paix. La paix est revenue, mais vous avez gaspillé toutes vos économies. (Game Over probable)",
        icon: "undo",
        stats_display: [
          { label: "Budget", val: "- 5 000 €", icon: "arrow_downward", color: "text-danger" },
          { label: "Autonomie", val: "- 50 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "- 20 pts", icon: "delete", color: "text-danger" }
        ],
        effect: () => { budget -= 5; autonomie -= 50; ecologie -= 20; },
        percent: 44
      },
      {
        type: "nird",
        title: "Option B: Journée \"Linux c'est facile !\"",
        desc: "// SUCCESS: Animée par les élèves. Une baisse drastique du mécontentement. Les profs reprennent la main.",
        icon: "school",
        stats_display: [
          { label: "Budget", val: "- 100 €", icon: "arrow_downward", color: "text-warning" },
          { label: "Autonomie", val: "+ 10 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-success" }
        ],
        effect: () => { budget -= 0.1; autonomie += 10; },
        percent: 56
      }
    ]
  },
  9: {
    title: "DECISION_REQ_09: L'INSPECTION ACADÉMIQUE",
    desc: "> [SYSTEM] L'inspecteur demande pourquoi vous n'utilisez pas les logiciels standards du marché.",
    options: [
      {
        type: "goliath",
        title: "Option A: S'excuser et promettre de rentrer dans le rang",
        desc: "// ERROR: L'inspecteur est satisfait, mais vous perdez votre crédibilité.",
        icon: "sentiment_dissatisfied",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-text-dark" },
          { label: "Autonomie", val: "- 10 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-text-dark" }
        ],
        effect: () => { autonomie -= 10; },
        percent: 52
      },
      {
        type: "nird",
        title: "Option B: Montrer les stats",
        desc: "// SUCCESS: \"On a économisé 20 000€ et sauvé 2 tonnes de CO2\". L'inspecteur est impressionné ! Subvention innovation obtenue.",
        icon: "trending_up",
        stats_display: [
          { label: "Budget", val: "+ 2 000 €", icon: "arrow_upward", color: "text-success" },
          { label: "Autonomie", val: "+ 30 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-success" }
        ],
        effect: () => { budget += 2; autonomie += 30; },
        percent: 48
      }
    ]
  },
  10: {
    title: "DECISION_REQ_10: LE VILLAGE VOISIN",
    desc: "> [SYSTEM] Un autre collège veut copier votre démarche NIRD mais ne sait pas comment faire.",
    options: [
      {
        type: "goliath",
        title: "Option A: Garder nos secrets",
        desc: "// INFO: Chacun pour soi. Vous restez seuls dans votre coin.",
        icon: "lock",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-text-dark" },
          { label: "Autonomie", val: "0 %", icon: "horizontal_rule", color: "text-text-dark" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-text-dark" }
        ],
        effect: () => { },
        percent: 33
      },
      {
        type: "nird",
        title: "Option B: Partager nos outils sur la Forge",
        desc: "// SUCCESS: Mutualiser les ressources. Le mouvement s'agrandit ! C'est une victoire communautaire.",
        icon: "share",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-success" },
          { label: "Autonomie", val: "+ 50 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-success" }
        ],
        effect: () => { autonomie += 50; },
        percent: 67
      }
    ]
  },
  11: {
    title: "DECISION_REQ_11: LE BOSS FINAL - LA \"MISE À JOUR FORCE\"",
    desc: "> [CRITICAL] Une faille de sécurité critique touche tous les systèmes mondiaux. Réponse immédiate nécessaire.",
    options: [
      {
        type: "goliath",
        title: "Option A: Attendre le patch du fournisseur",
        desc: "// ERROR: Les systèmes propriétaires sont bloqués. Vos systèmes sont à l'arrêt pendant une semaine.",
        icon: "hourglass_empty",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-text-dark" },
          { label: "Autonomie", val: "- 20 %", icon: "arrow_downward", color: "text-danger" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-text-dark" }
        ],
        effect: () => { autonomie -= 20; },
        percent: 59
      },
      {
        type: "nird",
        title: "Option B: Déployer le patch communautaire",
        desc: "// VICTORY: La communauté Open Source a déjà corrigé la faille. Le patch est appliqué en 1 heure. Vous êtes à l'abri !",
        icon: "verified",
        stats_display: [
          { label: "Budget", val: "0 €", icon: "horizontal_rule", color: "text-success" },
          { label: "Autonomie", val: "+ 50 %", icon: "arrow_upward", color: "text-success" },
          { label: "Écologie", val: "0 pts", icon: "horizontal_rule", color: "text-success" }
        ],
        effect: () => { autonomie += 50; },
        percent: 41
      }
    ]
  }
};