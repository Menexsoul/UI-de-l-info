// --- CONFIGURATION DE LA DIFFICULTÉ ---
// On récupère le paramètre 'diff' depuis l'URL (passé par decision.html)
const urlParamsData = new URLSearchParams(window.location.search);
const diff = urlParamsData.get('diff') || 'normal';

// Définition des multiplicateurs selon la difficulté
let costMult = 1;      // Multiplicateur de coût (Budget)
let rewardMult = 1;    // Multiplicateur de gain (Autonomie)
let ecoMult = 1;       // Impact écologique

if (diff === 'easy') {
    console.log("Mode: INITIÉ (Facile)");
    costMult = 0.8;    // Tout est 20% moins cher
    rewardMult = 1.2;  // On gagne 20% d'autonomie en plus
} else if (diff === 'hard') {
    console.log("Mode: HACKER (Difficile)");
    costMult = 1.5;    // Tout est 50% plus cher !
    rewardMult = 0.8;  // On gagne moins d'autonomie
    ecoMult = 1.2;     // L'impact écologique est plus sévère
}

// --- BOUTIQUE ADAPTATIVE ---
const shopItems = [
    {
        id: 'consultant',
        name: "Consultant Externe",
        desc: "Expert en conduite du changement pour accélérer l'adoption du libre.",
        // Le texte du coût s'adapte automatiquement
        costDesc: `${(2 * costMult).toFixed(1)} k€`, 
        effectDesc: `+${Math.round(10 * rewardMult)}% Auto`,
        icon: "support_agent",
        color: "neon-blue",
        canBuy: () => budget >= (2 * costMult),
        buy: () => { 
            budget -= (2 * costMult); 
            autonomie += (10 * rewardMult); 
            return "Consultant engagé. L'équipe gagne en compétence."; 
        }
    },
    {
        id: 'vente_matos',
        name: "Vente 'Vintage'",
        desc: "Revendre les vieux PC non reconditionnés à des brocanteurs.",
        costDesc: `-${Math.round(5 * ecoMult)} pts Écologie`,
        effectDesc: `+${(3 * (diff === 'easy' ? 1.5 : 1)).toFixed(1)} k€ Budget`, // Rapporte plus en facile
        icon: "sell",
        color: "warning",
        canBuy: () => ecologie >= (10 * ecoMult),
        buy: () => { 
            ecologie -= (5 * ecoMult); 
            budget += (3 * (diff === 'easy' ? 1.5 : 1)); 
            return "Vieux matériel liquidé. La trésorerie respire, mais pas la planète."; 
        }
    },
    {
        id: 'subvention',
        name: "Subvention Green IT",
        desc: "Demander une aide régionale pour la transition écologique.",
        costDesc: `Score Éco > ${diff === 'hard' ? 90 : 80} requis`, // Plus dur à avoir en hard
        effectDesc: "+5 k€ Budget",
        icon: "verified",
        color: "neon-green",
        canBuy: () => ecologie >= (diff === 'hard' ? 90 : 80),
        buy: () => { 
            budget += 5; 
            return "Dossier accepté ! La région soutient votre démarche vertueuse."; 
        }
    },
    {
        id: 'formation',
        name: "Formation Intensive",
        desc: "Stage commando Linux pour toute l'administration.",
        costDesc: `${(4 * costMult).toFixed(1)} k€`,
        effectDesc: `+${Math.round(20 * rewardMult)}% Auto`,
        icon: "school",
        color: "neon-blue",
        canBuy: () => budget >= (4 * costMult),
        buy: () => { 
            budget -= (4 * costMult); 
            autonomie += (20 * rewardMult); 
            return "Formation validée. Le personnel est prêt à résister."; 
        }
    }
];

// --- LISTE DES SCÉNARIOS (Adaptative) ---
const scenarios = {
    1: {
        title: "REQ_01: RENTRÉE NUMÉRIQUE",
        desc: diff === 'hard' 
            ? "> [CRITICAL] Le parc est obsolète. Le budget est serré. Les GAFAM font pression." 
            : diff === 'easy'
            ? "> [INFO] Le parc informatique vieillit légèrement. Une petite mise à niveau suffira."
            : "> [SYSTEM] Le parc informatique est vieillissant. Une mise à niveau est requise.",
        options: [
            {
                type: "goliath", title: "Achat Neuf (Goliath)", 
                desc: "30 tablettes propriétaires. Rapide mais fermé.", 
                icon: "shopping_bag",
                stats: [ 
                    {l:"Budget", v:`-${(20 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Auto", v:"-10%", c:"text-danger"}, 
                    {l:"Eco", v:`-${Math.round(15*ecoMult)} pts`, c:"text-danger"} 
                ],
                effect: () => { budget -= (20 * costMult); autonomie -= 10; ecologie -= (15 * ecoMult); },
            },
            {
                type: "nird", title: "Reconditionnement (NIRD)", 
                desc: "Installer Linux sur l'existant. Durable.", 
                icon: "build",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(20 * rewardMult)}%`, c:"text-success"},
                    {l:"Eco", v:"+25 pts", c:"text-success"} 
                ],
                effect: () => { autonomie += (20 * rewardMult); ecologie += 25; },
            }
        ]
    },
    2: {
        title: "REQ_02: LE COUPERET DE WINDOWS 10",
        desc: diff === 'hard' 
            ? "> [CRITICAL] Fin de support Windows 10. Les menaces se multiplient. Deadline en 3 mois."
            : diff === 'easy'
            ? "> [NOTICE] Windows 10 atteint sa fin de vie. Migrer tranquillement est possible."
            : "> [SYSTEM] Fin du support de Windows 10 annoncée. Migration nécessaire.",
        options: [
            {
                type: "goliath", title: "Tout Jeter pour Windows 11", 
                desc: "Commander 50 PC neufs compatibles Windows 11.", 
                icon: "shopping_cart",
                stats: [ 
                    {l:"Budget", v:`-${(10 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Auto", v:"-10%", c:"text-danger"},
                    {l:"Eco", v:`-${Math.round(50*ecoMult)} pts`, c:"text-danger"} 
                ],
                effect: () => { budget -= (10 * costMult); autonomie -= 10; ecologie -= (50 * ecoMult); },
            },
            {
                type: "nird", title: "Linux Mint pour Tous", 
                desc: "Les PC ont une nouvelle vie, mais les profs râlent.", 
                icon: "computer",
                stats: [ 
                    {l:"Budget", v:"-0.2 k€", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(20 * rewardMult)}%`, c:"text-success"},
                    {l:"Eco", v:"+10 pts", c:"text-success"} 
                ],
                effect: () => { budget -= 0.2; autonomie += (20 * rewardMult); ecologie += 10; },
            }
        ]
    },
    3: {
        title: diff === 'hard' ? "ALERTE CRITIQUE : RANSOMWARE" : "REQ_03: LE NUAGE PROPRIÉTAIRE",
        desc: diff === 'hard' 
            ? "> [SECURITY] Cryptolocker ! Les données administratives sont chiffrées. Aucune sauvegarde."
            : diff === 'easy'
            ? "> [INFO] Petite offre cloud gratuite : confortable mais risquée pour vos données."
            : "> [DATA] Où stocker les données scolaires ? Offre GAFAM vs Serveur local.",
        options: diff === 'hard' ? [
            {
                type: "goliath", title: "Payer la Rançon", 
                desc: "Les hackers promettent la clé de déchiffrement.", 
                icon: "paid",
                stats: [ {l:"Budget", v:"-15 k€", c:"text-danger"}, {l:"Dignité", v:"-100%", c:"text-danger"} ],
                effect: () => { budget -= 15; autonomie -= 10; ecologie -= 5; },
            },
            {
                type: "nird", title: "Reconstruire sous Linux", 
                desc: "Ne pas céder. Repart de zéro, mais on gagne en sécurité.", 
                icon: "restart_alt",
                stats: [ {l:"Temps", v:"Perdu", c:"text-warning"}, {l:"Auto", v:"+10%", c:"text-success"} ],
                effect: () => { autonomie += 10; ecologie += 5; },
            }
        ] : [
            {
                type: "goliath", title: "Cloud GAFAM", 
                desc: "Gratuit, illimité, mais les données partent hors UE.", 
                icon: "cloud_upload",
                stats: [ 
                    {l:"Budget", v:"+1 k€", c:"text-success"}, 
                    {l:"Auto", v:"-20%", c:"text-danger"} 
                ],
                effect: () => { budget += 1; autonomie -= 20; },
            },
            {
                type: "nird", title: "Serveur Nextcloud Local", 
                desc: "Installer un Nextcloud au lycée. Souverain et sûr.", 
                icon: "dns",
                stats: [ 
                    {l:"Budget", v:`-${(1 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Auto", v:`+${Math.round(25 * rewardMult)}%`, c:"text-success"},
                    {l:"Eco", v:"-5 pts", c:"text-danger"} 
                ],
                effect: () => { budget -= (1 * costMult); autonomie += (25 * rewardMult); ecologie -= 5; },
            }
        ]
    },
    4: {
        title: "REQ_04: OBSOLESCENCE PROGRAMMÉE",
        desc: diff === 'hard' 
            ? "> [CRITICAL] 20 écrans tombent en panne simultanément. Industrie contre nous ?"
            : diff === 'easy'
            ? "> [NOTICE] 5 écrans clignotent. Facilement réparables en atelier."
            : "> [HARDWARE] 10 écrans clignotent. Ils sont réparables mais c'est long.",
        options: [
            {
                type: "goliath", title: "Jeter et Racheter", 
                desc: "Direction la déchetterie, commande Amazon.", 
                icon: "delete_forever",
                stats: [ 
                    {l:"Budget", v:`-${(2 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Eco", v:`-${Math.round(10*ecoMult)} pts`, c:"text-danger"} 
                ],
                effect: () => { budget -= (2 * costMult); ecologie -= (10 * ecoMult); },
            },
            {
                type: "nird", title: "Repair Café Communautaire", 
                desc: "Club réparation avec les élèves. Condensateurs et passion.", 
                icon: "handyman",
                stats: [ 
                    {l:"Budget", v:"-0.1 k€", c:"text-success"}, 
                    {l:"Eco", v:`+${Math.round(10*ecoMult)} pts`, c:"text-success"},
                    {l:"Auto", v:"+5%", c:"text-success"} 
                ],
                effect: () => { budget -= 0.1; ecologie += (10 * ecoMult); autonomie += 5; },
            }
        ]
    },
    5: {
        title: "REQ_05: L'ARMÉE DES ÉCO-DÉLÉGUÉS",
        desc: diff === 'hard'
            ? "> [ADMIN] Les éco-délégués exigent le pouvoir. Trop jeunes ? Trop ambitieux ?"
            : diff === 'easy'
            ? "> [INFO] Les élèves proposent leur aide bénévole. Une belle opportunité."
            : "> [SYSTEM] Des élèves motivés veulent gérer le parc informatique.",
        options: [
            {
                type: "goliath", title: "Refuser Poliment", 
                desc: "Trop technique pour les ados. Seuls les certifiés Microsoft suffisent.", 
                icon: "block",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-text-dark"}, 
                    {l:"Auto", v:"-5%", c:"text-danger"},
                    {l:"Moral", v:"↓", c:"text-danger"} 
                ],
                effect: () => { autonomie -= 5; ecologie -= 2; },
            },
            {
                type: "nird", title: "Club Répar'Acteurs", 
                desc: "Créer un vrai club d'entraide. Économies et cohésion.", 
                icon: "groups",
                stats: [ 
                    {l:"Budget", v:"+1 k€", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(15 * rewardMult)}%`, c:"text-success"},
                    {l:"Eco", v:"+10 pts", c:"text-success"} 
                ],
                effect: () => { budget += 1; autonomie += (15 * rewardMult); ecologie += 10; },
            }
        ]
    },
    6: {
        title: "REQ_06: LA RANÇON DU LOGICIEL",
        desc: diff === 'hard'
            ? "> [FINANCE] Renouvellement licences : +30% de coût ! La facture explose."
            : diff === 'easy'
            ? "> [NOTICE] Renouvellement licences : seul +5% cette année."
            : "> [BILLING] Renouvellement licences : +20% d'augmentation annoncée.",
        options: [
            {
                type: "goliath", title: "Payer la Facture", 
                desc: "Renouveler tous les abonnements propriétaires. C'est plus sûr.", 
                icon: "credit_card",
                stats: [ 
                    {l:"Budget", v:`-${(3 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Auto", v:"-5%", c:"text-danger"} 
                ],
                effect: () => { budget -= (3 * costMult); autonomie -= 5; },
            },
            {
                type: "nird", title: "LibreOffice Forever", 
                desc: "Migrer vers les Forges du Commun. Gratuit et libre.", 
                icon: "description",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(15 * rewardMult)}%`, c:"text-success"} 
                ],
                effect: () => { autonomie += (15 * rewardMult); ecologie += 3; },
            }
        ]
    },
    7: {
        title: "REQ_07: LA TENTATION DES TABLETTES",
        desc: diff === 'hard'
            ? "> [OFFER] Un géant propose 200 iPad verrouillés 'GRATUITS'. C'est un piège évident."
            : diff === 'easy'
            ? "> [OFFER] Une tablette gratuite par élève. Trop beau pour être vrai ?"
            : "> [OFFER] Tablettes propriétaires verrouillées comme 'cadeau' marketing.",
        options: [
            {
                type: "goliath", title: "Accepter les Tablettes", 
                desc: "Moderne, brillant, et les élèves adorent l'écran.", 
                icon: "tablet",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Auto", v:"-30%", c:"text-danger"},
                    {l:"Liberté", v:"-100%", c:"text-danger"} 
                ],
                effect: () => { autonomie -= 30; ecologie -= 20; },
            },
            {
                type: "nird", title: "Laptops Reconditionnés", 
                desc: "Demander le budget pour reconditionner de vieux laptops d'entreprises.", 
                icon: "laptop",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(20 * rewardMult)}%`, c:"text-success"},
                    {l:"Eco", v:"+20 pts", c:"text-success"} 
                ],
                effect: () => { autonomie += (20 * rewardMult); ecologie += 20; },
            }
        ]
    },
    8: {
        title: "REQ_08: LES PROFS PERDUS",
        desc: diff === 'hard'
            ? "> [CRISIS] 60% des enseignants refusent Linux. Ils menacent de grève pédagogique."
            : diff === 'easy'
            ? "> [NOTICE] Quelques profs trouvent LibreOffice déroutant. Une petite formation suffit."
            : "> [ALERT] Les profs sont perdus sous Linux. La grogne monte.",
        options: [
            {
                type: "goliath", title: "Revenir à Windows", 
                desc: "Pour la paix, on retourne aux vieux habitudes rassurantes.", 
                icon: "undo",
                stats: [ 
                    {l:"Budget", v:`-${(5 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Auto", v:"-50%", c:"text-danger"},
                    {l:"Eco", v:"-20 pts", c:"text-danger"} 
                ],
                effect: () => { budget -= (5 * costMult); autonomie -= 50; ecologie -= 20; },
            },
            {
                type: "nird", title: "Journée 'Linux c'est Facile'", 
                desc: "Atelier participatif animé par les élèves experts.", 
                icon: "school",
                stats: [ 
                    {l:"Budget", v:"-0.1 k€", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(10 * rewardMult)}%`, c:"text-success"},
                    {l:"Moral", v:"↑↑", c:"text-success"} 
                ],
                effect: () => { budget -= 0.1; autonomie += (10 * rewardMult); ecologie += 2; },
            }
        ]
    },
    9: {
        title: "REQ_09: L'INSPECTION ACADÉMIQUE",
        desc: diff === 'hard'
            ? "> [AUTHORITY] L'inspecteur exige justification : pourquoi ce bordel NIRD ?"
            : diff === 'easy'
            ? "> [ROUTINE] Visite de contrôle standard de l'académie."
            : "> [AUDIT] L'inspecteur demande justification de votre démarche atypique.",
        options: [
            {
                type: "goliath", title: "S'Excuser et Rentrer en Rang", 
                desc: "Promettre de revenir aux standards ministériels.", 
                icon: "sentiment_dissatisfied",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-text-dark"}, 
                    {l:"Auto", v:"-10%", c:"text-danger"},
                    {l:"Crédo", v:"-100%", c:"text-danger"} 
                ],
                effect: () => { autonomie -= 10; ecologie -= 5; },
            },
            {
                type: "nird", title: "Montrer les Résultats", 
                desc: "\"Nous avons économisé 20k€ et sauvé 2 tonnes de CO2. Voici les chiffres.\"", 
                icon: "trending_up",
                stats: [ 
                    {l:"Budget", v:"+2 k€", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(30 * rewardMult)}%`, c:"text-success"},
                    {l:"Respect", v:"++", c:"text-success"} 
                ],
                effect: () => { budget += 2; autonomie += (30 * rewardMult); ecologie += 5; },
            }
        ]
    },
    10: {
        title: "REQ_10: LE VILLAGE VOISIN",
        desc: diff === 'hard'
            ? "> [COMPETITION] Trois écoles rivales veulent copier votre modèle. Garder le secret ?"
            : diff === 'easy'
            ? "> [COLLABORATION] Un collège ami demande votre aide pour débuter."
            : "> [NETWORK] Un autre collège veut copier votre démarche NIRD.",
        options: [
            {
                type: "goliath", title: "Garder nos Secrets", 
                desc: "Chacun pour soi. Avantage compétitif préservé.", 
                icon: "lock",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-text-dark"}, 
                    {l:"Auto", v:"0%", c:"text-text-dark"},
                    {l:"Impact", v:"Nul", c:"text-text-dark"} 
                ],
                effect: () => { },
            },
            {
                type: "nird", title: "Partager sur la Forge", 
                desc: "Open Source partage. Le mouvement s'agrandit exponentiellement.", 
                icon: "share",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(50 * rewardMult)}%`, c:"text-success"},
                    {l:"Influence", v:"NATIONALE", c:"text-success"} 
                ],
                effect: () => { autonomie += (50 * rewardMult); ecologie += 10; },
            }
        ]
    },
    11: {
        title: "REQ_11: LE BOSS FINAL - FAILLE 0-DAY",
        desc: diff === 'hard'
            ? "> [CRITICAL] Faille de sécurité globale. Tous les systèmes touchés. 24h avant l'attaque."
            : diff === 'easy'
            ? "> [NOTICE] Faille détectée, mais délai de 2 semaines pour corriger."
            : "> [CRITICAL] Faille de sécurité mondiale. Les systèmes sont vulnérables.",
        options: [
            {
                type: "goliath", title: "Attendre le Patch Officiel", 
                desc: "Les systèmes propriétaires bloqueront jusqu'à la correction du fournisseur.", 
                icon: "hourglass_empty",
                stats: [ 
                    {l:"Temps", v:`${diff === 'hard' ? '1 SEMAINE' : '3 jours'}`, c:"text-danger"}, 
                    {l:"Auto", v:"-20%", c:"text-danger"},
                    {l:"Pertes", v:"Importantes", c:"text-danger"} 
                ],
                effect: () => { budget -= (diff === 'hard' ? 5 : 2); autonomie -= 20; ecologie -= 10; },
            },
            {
                type: "nird", title: "Patch Communautaire 1h", 
                desc: "La communauté open source a déjà corrigé. Déploiement immédiat.", 
                icon: "verified",
                stats: [ 
                    {l:"Temps", v:"1 HEURE", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(50 * rewardMult)}%`, c:"text-success"},
                    {l:"Victoire", v:"TOTALE", c:"text-success"} 
                ],
                effect: () => { autonomie += (50 * rewardMult); ecologie += 5; },
            }
        ]
    },
    12: {
        title: "REQ_12: ACCREDITATION ISO 27001",
        desc: diff === 'hard'
            ? "> [COMPLIANCE] Audit de sécurité externe prévu. Normes strictes imposées."
            : diff === 'easy'
            ? "> [INFO] Certification simple : votre infrastructure libre est déjà conforme."
            : "> [AUDIT] Audit ISO 27001 obligatoire pour les données scolaires.",
        options: [
            {
                type: "goliath", title: "Solution Propriétaire Certifiée", 
                desc: "Acheter une solution 'clé en main' ISO. Coûteux mais garanti.", 
                icon: "verified_user",
                stats: [ 
                    {l:"Budget", v:`-${(8 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Confiance", v:"++", c:"text-success"},
                    {l:"Auto", v:"-15%", c:"text-danger"} 
                ],
                effect: () => { budget -= (8 * costMult); autonomie -= 15; ecologie -= 10; },
            },
            {
                type: "nird", title: "Documentation NIRD", 
                desc: "Documenter et certifier votre infrastructure existante.", 
                icon: "description",
                stats: [ 
                    {l:"Budget", v:"-0.5 k€", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(15 * rewardMult)}%`, c:"text-success"},
                    {l:"Confiance", v:"+", c:"text-success"} 
                ],
                effect: () => { budget -= 0.5; autonomie += (15 * rewardMult); ecologie += 2; },
            }
        ]
    },
    13: {
        title: "REQ_13: PARTENARIAT STARTUPS EDTECH",
        desc: diff === 'hard'
            ? "> [BUSINESS] Des startups exigent d'installer leurs suites propriétaires. Chantage au financement."
            : diff === 'easy'
            ? "> [OPPORTUNITY] Une startup propose une intégration facile avec votre pile libre."
            : "> [PROPOSAL] Startup EdTech propose un partenariat exclusif.",
        options: [
            {
                type: "goliath", title: "Contrat d'Exclusivité", 
                desc: "Tout est compatible avec leur écosystème payant.", 
                icon: "trending_up",
                stats: [ 
                    {l:"Financement", v:`+${(6 * (diff==='hard' ? 1.5 : 1)).toFixed(1)} k€`, c:"text-success"}, 
                    {l:"Auto", v:"-25%", c:"text-danger"},
                    {l:"Liberté", v:"Perdue", c:"text-danger"} 
                ],
                effect: () => { budget += (6 * (diff==='hard' ? 1.5 : 1)); autonomie -= 25; ecologie -= 5; },
            },
            {
                type: "nird", title: "Intégration Open Source", 
                desc: "Utiliser des APIs ouvertes. Partenaire devient contributeur.", 
                icon: "hub",
                stats: [ 
                    {l:"Financement", v:`+${(2 * costMult).toFixed(1)} k€`, c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(20 * rewardMult)}%`, c:"text-success"},
                    {l:"Écosystème", v:"Enrichi", c:"text-success"} 
                ],
                effect: () => { budget += (2 * costMult); autonomie += (20 * rewardMult); ecologie += 3; },
            }
        ]
    },
    14: {
        title: "REQ_14: CRISE PEDAGOGIQUE - LES PROFS RETRAITES",
        desc: diff === 'hard'
            ? "> [HR_CRISIS] Les anciens profs fidèles à Windows 7 veulent partir en retraite. Ils refusent la formation."
            : diff === 'easy'
            ? "> [RETIREMENT] Quelques retraites planifiées. Transition naturelle possible."
            : "> [TRANSITION] Certains profs historiques arrivent en fin de carrière.",
        options: [
            {
                type: "goliath", title: "Rester sur Windows", 
                desc: "Garder Windows pour les vieux profs. Deux systèmes cohabitent.", 
                icon: "people",
                stats: [ 
                    {l:"Budget", v:`-${(3 * costMult).toFixed(1)} k€/an`, c:"text-danger"}, 
                    {l:"Complexité", v:"++", c:"text-danger"},
                    {l:"Transition", v:"Bloquée", c:"text-danger"} 
                ],
                effect: () => { budget -= (3 * costMult); autonomie -= 10; ecologie -= 5; },
            },
            {
                type: "nird", title: "Investir dans la Jeunesse", 
                desc: "Former les nouveaux entrants sur Linux. Nouvelle génération native.", 
                icon: "auto_awesome",
                stats: [ 
                    {l:"Budget", v:"-1 k€", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(25 * rewardMult)}%`, c:"text-success"},
                    {l:"Avenir", v:"Sécurisé", c:"text-success"} 
                ],
                effect: () => { budget -= 1; autonomie += (25 * rewardMult); ecologie += 2; },
            }
        ]
    },
    15: {
        title: "REQ_15: ELECTIONS - NOUVEAU RECTEUR",
        desc: diff === 'hard'
            ? "> [POLITICS] Le nouveau recteur est un ancien patron de Microsoft France. Pression politique extrême."
            : diff === 'easy'
            ? "> [POLITICS] Le nouveau recteur est un fervent supporter de l'open source."
            : "> [POLITICS] Changement d'administration. Politique numérique à redéfinir.",
        options: [
            {
                type: "goliath", title: "Se Plier aux Ordres", 
                desc: "Tout abandonner pour les demandes du recteur. Carrière sauvée.", 
                icon: "check_circle",
                stats: [ 
                    {l:"Sécurité", v:"+++", c:"text-success"}, 
                    {l:"Convictions", v:"Vendues", c:"text-danger"},
                    {l:"Auto", v:"-40%", c:"text-danger"} 
                ],
                effect: () => { autonomie -= 40; budget += 3; ecologie -= 15; },
            },
            {
                type: "nird", title: "Présenter les Résultats", 
                desc: "Montrer que NIRD fonctionne mieux et coûte moins. Convaincre le recteur.", 
                icon: "trending_up",
                stats: [ 
                    {l:"Risque", v:"Modéré", c:"text-warning"}, 
                    {l:"Auto", v:`+${Math.round(30 * rewardMult)}%`, c:"text-success"},
                    {l:"Liberté", v:"Préservée", c:"text-success"} 
                ],
                effect: () => { autonomie += (30 * rewardMult); budget += 2; ecologie += 5; },
            }
        ]
    },
    16: {
        title: "REQ_16: INCIDENT SERVEUR - PANNE DISQUE",
        desc: diff === 'hard'
            ? "> [CRITICAL] Le serveur Nextcloud tombe en panne disque. Données à récupérer d'urgence. Silence radio."
            : diff === 'easy'
            ? "> [NOTICE] Disque dupliqué en RAID. Remplacement simple et rapide."
            : "> [ALERT] Panne disque sur le serveur de stockage. Données en danger.",
        options: [
            {
                type: "goliath", title: "Appeler Hotline Support Payante", 
                desc: "Service premium 24/7. Coûteux mais rapide.", 
                icon: "support_agent",
                stats: [ 
                    {l:"Budget", v:`-${(5 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Temps", v:"2h", c:"text-success"},
                    {l:"Auto", v:"-5%", c:"text-danger"} 
                ],
                effect: () => { budget -= (5 * costMult); autonomie -= 5; },
            },
            {
                type: "nird", title: "Équipe Interne NIRD", 
                desc: "Les admins Linux maison récupèrent les données eux-mêmes.", 
                icon: "engineering",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Temps", v:"4h", c:"text-warning"},
                    {l:"Auto", v:`+${Math.round(10 * rewardMult)}%`, c:"text-success"} 
                ],
                effect: () => { autonomie += (10 * rewardMult); ecologie += 1; },
            }
        ]
    },
    17: {
        title: "REQ_17: APPEL D'OFFRE EUROPEEN",
        desc: diff === 'hard'
            ? "> [EU_REGULATION] Appel d'offre européen : seules les solutions certifiées IBM/Microsoft sont acceptées."
            : diff === 'easy'
            ? "> [EU_REGULATION] Appel d'offre européen : Linux et Open Source sont favorisés."
            : "> [EU_REGULATION] Appel d'offre européen : pour le système d'information du réseau scolaire.",
        options: [
            {
                type: "goliath", title: "Soumissionner avec Microsoft", 
                desc: "Passer par un intégrateur certifié Microsoft.", 
                icon: "business",
                stats: [ 
                    {l:"Chances", v:"++", c:"text-success"}, 
                    {l:"Budget", v:`-${(10 * costMult).toFixed(1)} k€`, c:"text-danger"},
                    {l:"Auto", v:"-20%", c:"text-danger"} 
                ],
                effect: () => { budget -= (10 * costMult); autonomie -= 20; ecologie -= 10; },
            },
            {
                type: "nird", title: "Dossier Open Source Européen", 
                desc: "Montrer la conformité RGPD et souveraineté numérique.", 
                icon: "public",
                stats: [ 
                    {l:"Chances", v:`${diff === 'easy' ? '+++' : '+'}`, c:"text-success"}, 
                    {l:"Budget", v:`+${(7 * rewardMult).toFixed(1)} k€`, c:"text-success"},
                    {l:"Éco", v:"+15 pts", c:"text-success"} 
                ],
                effect: () => { budget += (7 * rewardMult); autonomie += (20 * rewardMult); ecologie += 15; },
            }
        ]
    },
    18: {
        title: "REQ_18: CIBERATTAQUE RANSOMWARE (2nd Vague)",
        desc: diff === 'hard'
            ? "> [CRITICAL] 2ème vague de ransomware. Les attaquants sont plus organisés et ciblent les écoles."
            : diff === 'easy'
            ? "> [ALERT] Tentative de ransomware détectée. Système en quarantaine, données sauvegardées."
            : "> [ALERT] Nouvelle attaque ransomware détectée sur le réseau.",
        options: [
            {
                type: "goliath", title: "Payer la Rançon (Encore)", 
                desc: "Ils promettent que c'est la dernière fois. Naïveté ?", 
                icon: "money",
                stats: [ 
                    {l:"Budget", v:`-${(12 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Données", v:"Récupérées", c:"text-success"},
                    {l:"Morale", v:"Détruite", c:"text-danger"} 
                ],
                effect: () => { budget -= (12 * costMult); autonomie -= 15; ecologie -= 10; },
            },
            {
                type: "nird", title: "Restore depuis Backup Linux", 
                desc: "Les sauvegardes en RAID décentralisées ont sauvé la mise.", 
                icon: "backup",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Données", v:"Restaurées", c:"text-success"},
                    {l:"Sécurité", v:`+${Math.round(20 * rewardMult)}%`, c:"text-success"} 
                ],
                effect: () => { autonomie += (20 * rewardMult); ecologie += 3; },
            }
        ]
    },
    19: {
        title: "REQ_19: DEMANDE D'INTEGRATION IA GENERATIVE",
        desc: diff === 'hard'
            ? "> [TECH_TREND] GAFAM proposent d'intégrer ChatGPT 4 Turbo dans Classroom. Gratuit 'temporairement'."
            : diff === 'easy'
            ? "> [TECH_TREND] Des outils IA open source existent. Intégration facile et souveraine."
            : "> [TECH_TREND] IA générative demandée. Plusieurs solutions disponibles.",
        options: [
            {
                type: "goliath", title: "ChatGPT Propriétaire", 
                desc: "Intégration facile mais dépendance et données envoyées aux USA.", 
                icon: "smart_toy",
                stats: [ 
                    {l:"Praticité", v:"+++", c:"text-success"}, 
                    {l:"RGPD", v:"Violé", c:"text-danger"},
                    {l:"Données", v:"Aux USA", c:"text-danger"} 
                ],
                effect: () => { autonomie -= 30; ecologie -= 8; budget += 2; },
            },
            {
                type: "nird", title: "LLaMa 2 / Mistral Souverain", 
                desc: "Déployer un modèle open source en local. Plus lent mais souverain.", 
                icon: "memory",
                stats: [ 
                    {l:"Budget", v:`-${(4 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Souveraineté", v:"+++", c:"text-success"},
                    {l:"Auto", v:`+${Math.round(20 * rewardMult)}%`, c:"text-success"} 
                ],
                effect: () => { budget -= (4 * costMult); autonomie += (20 * rewardMult); ecologie += 5; },
            }
        ]
    },
    20: {
        title: "REQ_20: FESTIVAL EDUCATIF - SHOWCASE NIRD",
        desc: diff === 'hard'
            ? "> [VISIBILITY] Festival régional des innovations éducatives. Opportunité rare de montrer votre succès."
            : diff === 'easy'
            ? "> [VISIBILITY] Festival national : votre projet NIRD est invité comme modèle."
            : "> [VISIBILITY] Festival educatif régional : proposez votre retour d'expérience NIRD.",
        options: [
            {
                type: "goliath", title: "Ignorer et Rester Discret", 
                desc: "Pourquoi s'exposer ? Laisser les autres innover.", 
                icon: "lock",
                stats: [ 
                    {l:"Visibilité", v:"Zéro", c:"text-danger"}, 
                    {l:"Influence", v:"Nulle", c:"text-danger"},
                    {l:"Budget", v:"0 €", c:"text-text-dark"} 
                ],
                effect: () => { },
            },
            {
                type: "nird", title: "Présentation + Atelier", 
                desc: "Montrer comment vous avez économisé 50k€ et sauvé la planète.", 
                icon: "stage",
                stats: [ 
                    {l:"Visibilité", v:"NATIONALE", c:"text-success"}, 
                    {l:"Influence", v:`+${Math.round(40 * rewardMult)}%`, c:"text-success"},
                    {l:"Budget", v:"+3 k€", c:"text-success"} 
                ],
                effect: () => { autonomie += (40 * rewardMult); budget += 3; ecologie += 8; },
            }
        ]
    },
    21: {
        title: "REQ_21: FINAL LAYER - INDEPENDENCE DAY",
        desc: diff === 'hard'
            ? "> [FINALE] Vous avez survécu aux 5 années les plus difficiles. Les GAFAM ont perdu leur emprise sur vous."
            : diff === 'easy'
            ? "> [FINALE] Vous avez atteint l'indépendance technologique. Bienvenue en 2030."
            : "> [FINALE] Bilan final : où en êtes-vous ? Quel héritage laissez-vous ?",
        options: [
            {
                type: "goliath", title: "Status Quo GAFAM", 
                desc: "Vous êtes retombé sous la dépendance. Cycle infernal recommence.", 
                icon: "trending_down",
                stats: [ 
                    {l:"Autonomie", v:`${Math.max(0, autonomie)}%`, c:"text-danger"}, 
                    {l:"Avenir", v:"Incertain", c:"text-danger"},
                    {l:"Héritage", v:"Perdu", c:"text-danger"} 
                ],
                effect: () => { autonomie = Math.max(0, autonomie); },
            },
            {
                type: "nird", title: "Indépendance NIRD Totale", 
                desc: "Vous avez construit un modèle pérenne, open source, souverain et écologique.", 
                icon: "emoji_events",
                stats: [ 
                    {l:"Autonomie", v:"100%", c:"text-success"}, 
                    {l:"Héritage", v:"LEGACY", c:"text-success"},
                    {l:"Planète", v:"Sauvée", c:"text-success"} 
                ],
                effect: () => { autonomie = 100; ecologie = Math.min(100, ecologie + 20); },
            }
        ]
    }
};