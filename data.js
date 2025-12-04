const events = [
  {
    id: 1,
    title: "L'attaque du Bloatware",
    description: "Les vieux PC rament à cause de la dernière mise à jour propriétaire.",
    image: "pc_rame.png", // Asset libre
    choices: [
      {
        text: "Acheter des nouveaux PC",
        effect: { budget: -5000, autonomy: -10, waste: -50, anger: 0 },
        message: "Ça marche, mais le budget a explosé et la benne est pleine."
      },
      {
        text: "Passer sous Linux (Opération NIRD)", //
        effect: { budget: -200, autonomy: +30, waste: 0, anger: 0 },
        message: "Les PC revivent ! Les élèves apprennent à coder."
      }
    ]
  },

  // --- Phase 1 : L'Attaque de l'Empire (Le début de la crise) ---

  {
    id: 2,
    title: "Le Couperet de Windows 10",
    description: "La fin du support de Windows 10 est annoncée. Vos PC fonctionnent encore, mais Microsoft dit qu'ils sont obsolètes.",
    image: "win10_eol.png",
    choices: [
      {
        text: "Tout jeter et racheter 50 PC compatibles Windows 11.",
        effect: { budget: -10000, autonomy: -10, waste: -50, anger: 0 },
        message: "Vous avez des PC neufs, mais vous êtes encore plus dépendants du fournisseur."
      },
      {
        text: "\"Non ! Ils marchent encore.\" Installer Linux Mint sur tout le parc (Opération NIRD).",
        effect: { budget: -200, autonomy: +20, waste: +10, anger: +15 },
        message: "Les PC ont une nouvelle vie, mais les profs râlent : \"C'est quoi ce menu ?\""
      }
    ]
  },
  {
    id: 3,
    title: "La Rançon du Logiciel",
    description: "L'abonnement annuel à la suite bureautique propriétaire arrive à échéance. Le prix a augmenté de 20%.",
    image: "licence_fee.png",
    choices: [
      {
        text: "Payer la facture sans discuter. C'est plus sûr.",
        effect: { budget: -3000, autonomy: -5, waste: 0, anger: 0 },
        message: "La facture est salée, mais tout le monde garde ses habitudes."
      },
      {
        text: "Migrer vers LibreOffice et utiliser la \"Forge des communs\".",
        effect: { budget: 0, autonomy: +15, waste: 0, anger: +10 },
        message: "Économie faite, mais un besoin de formation se fait sentir."
      }
    ]
  },
  {
    id: 4,
    title: "Le Stockage Nuageux",
    description: "On ne sait plus où stocker les notes des élèves. Une offre 'Gratuite' d'un géant américain se présente, mais les données partent hors UE.",
    image: "cloud_offer.png",
    choices: [
      {
        text: "Accepter l'offre \"Gratuite\" (Nos données sont le produit).",
        effect: { budget: +500, autonomy: -20, waste: 0, anger: 0 },
        message: "Un peu d'argent rentre, mais le danger RGPD est imminent."
      },
      {
        text: "Monter un serveur local Nextcloud au lycée.",
        effect: { budget: -500, autonomy: +25, waste: 0, anger: +5 },
        message: "Souveraineté des données assurée, mais il y a quelques bugs au début."
      }
    ]
  },

  // --- Phase 2 : La Résistance s'organise (Milieu de partie) ---

  {
    id: 5,
    title: "L'Armée des Éco-délégués",
    description: "Des élèves motivés veulent aider à gérer le parc informatique, mais l'administration hésite.",
    image: "student_tech_club.png",
    choices: [
      {
        text: "Refuser. \"C'est trop technique, laissez faire les pros certifiés Microsoft.\"",
        effect: { budget: 0, autonomy: -5, waste: 0, anger: +5 },
        message: "Le statu quo est maintenu, mais les élèves sont frustrés."
      },
      {
        text: "Créer un club \"Répar'Acteurs\" avec les éco-délégués.",
        effect: { budget: +1000, autonomy: +15, waste: +10, anger: 0 },
        message: "Économies de maintenance et un boost d'autonomie pour l'établissement."
      }
    ]
  },
  {
    id: 6,
    title: "La Panne Matérielle",
    description: "10 écrans sont tombés en panne simultanément. Obsolescence programmée ?",
    image: "broken_monitors.png",
    choices: [
      {
        text: "Commander du neuf sur Amazon.",
        effect: { budget: -1500, autonomy: 0, waste: -10, anger: 0 },
        message: "La solution est rapide mais coûteuse et génère du déchet."
      },
      {
        text: "Atelier soudure ! On change les condensateurs nous-mêmes.",
        effect: { budget: -50, autonomy: 0, waste: +20, anger: +5 },
        message: "Le matériel est sauvé pour un coût minime, mais l'opération prend du temps."
      }
    ]
  },
  {
    id: 7,
    title: "La Tentation des Tablettes",
    description: "Le département propose d'offrir des tablettes verrouillées à tous les élèves. C'est un 'cadeau' empoisonné.",
    image: "tablet_offer.png",
    choices: [
      {
        text: "Accepter. C'est moderne et brillant !",
        effect: { budget: 0, autonomy: -30, waste: 0, anger: -10 },
        message: "Les élèves adorent, mais l'établissement est enfermé dans un écosystème fermé."
      },
      {
        text: "Refuser et demander le budget pour reconditionner des vieux laptops d'entreprises.",
        effect: { budget: 0, autonomy: +20, waste: +20, anger: +10 },
        message: "C'est moins \"sexy\", mais c'est un grand pas pour la souveraineté et l'écologie."
      }
    ]
  },

  // --- Phase 3 : Vers l'Autonomie (Fin de partie) ---

  {
    id: 8,
    title: "La Formation des Rebelles",
    description: "Les profs sont perdus sous Linux. La grogne monte.",
    image: "teacher_training.png",
    choices: [
      {
        text: "Revenir sous Windows pour avoir la paix.",
        effect: { budget: -5000, autonomy: -50, waste: -20, anger: -20 },
        message: "La paix est revenue, mais vous avez gaspillé toutes vos économies et votre autonomie. (Game Over probable)"
      },
      {
        text: "Organiser une journée \"Linux c'est facile !\" animée par les élèves.",
        effect: { budget: -100, autonomy: +10, waste: 0, anger: -30 },
        message: "Une baisse drastique du mécontentement. Les profs reprennent la main."
      }
    ]
  },
  {
    id: 9,
    title: "L'Inspection Académique",
    description: "L'inspecteur demande pourquoi vous n'utilisez pas les logiciels standards du marché.",
    image: "inspector_visit.png",
    choices: [
      {
        text: "S'excuser et promettre de rentrer dans le rang.",
        effect: { budget: 0, autonomy: -10, waste: 0, anger: 0 },
        message: "L'inspecteur est satisfait, mais vous perdez votre crédibilité."
      },
      {
        text: "Lui montrer les stats : \"On a économisé 20 000€ et sauvé 2 tonnes de CO2\".",
        effect: { budget: +2000, autonomy: +30, waste: 0, anger: 0 },
        message: "L'inspecteur est impressionné ! Vous obtenez une subvention innovation."
      }
    ]
  },
  {
    id: 10,
    title: "Le Village Voisin",
    description: "Un autre collège veut copier votre démarche NIRD mais ne sait pas comment faire.",
    image: "neighbor_school.png",
    choices: [
      {
        text: "Garder nos secrets. Chacun pour soi.",
        effect: { budget: 0, autonomy: 0, waste: 0, anger: 0 },
        message: "Vous restez seuls dans votre coin."
      },
      {
        text: "Partager nos outils sur la Forge et mutualiser les ressources.",
        effect: { budget: 0, autonomy: +50, waste: 0, anger: 0 },
        message: "Le mouvement s'agrandit ! C'est une victoire communautaire."
      }
    ]
  },
  {
    id: 11,
    title: "Le Boss Final : La \"Mise à Jour Force\"",
    description: "Une faille de sécurité critique touche tous les systèmes mondiaux.",
    image: "critical_vulnerability.png",
    choices: [
      {
        text: "Les systèmes propriétaires sont bloqués en attendant le patch du fournisseur.",
        effect: { budget: 0, autonomy: -20, waste: 0, anger: 0 },
        message: "Vos systèmes sont à l'arrêt pendant une semaine en attendant la mise à jour officielle."
      },
      {
        text: "La communauté Open Source a déjà corrigé la faille. On déploie !",
        effect: { budget: 0, autonomy: +50, waste: 0, anger: 0 },
        message: "Le patch est appliqué en 1 heure grâce à la communauté. Vous êtes à l'abri ! (VICTOIRE)"
      }
    ]
  }
];