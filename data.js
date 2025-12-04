// --- CONFIGURATION DE LA DIFFICULTÉ ---
// On récupère le paramètre 'diff' directement ici pour configurer les données
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
            : "> [SYSTEM] Le parc informatique est vieillissant. Une mise à niveau est requise.",
        options: [
            {
                type: "goliath", title: "Achat Neuf (Goliath)", 
                desc: "30 tablettes propriétaires. Rapide mais fermé.", 
                icon: "shopping_bag",
                stats: [ 
                    {l:"Budget", v:`-${(20 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Auto", v:"-10%", c:"text-danger"} 
                ],
                effect: () => { budget -= (20 * costMult); autonomie -= 10; ecologie -= 15; },
            },
            {
                type: "nird", title: "Reconditionnement (NIRD)", 
                desc: "Installer Linux sur l'existant. Durable.", 
                icon: "build",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(20 * rewardMult)}%`, c:"text-success"} 
                ],
                effect: () => { autonomie += (20 * rewardMult); ecologie += 25; },
            }
        ]
    },
    2: {
        title: "REQ_02: LA RÉTICENCE",
        desc: "> [ALERT] Les professeurs se plaignent de LibreOffice. 'C'était mieux Word'.",
        options: [
            {
                type: "goliath", title: "Acheter Licences", 
                desc: "Revenir aux standards payants pour avoir la paix.", 
                icon: "payment",
                stats: [ 
                    {l:"Budget", v:`-${(5 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Auto", v:"-5%", c:"text-danger"} 
                ],
                effect: () => { budget -= (5 * costMult); autonomie -= 5; },
            },
            {
                type: "nird", title: "Atelier Formation", 
                desc: "Organiser des ateliers d'entraide entre collègues.", 
                icon: "groups",
                stats: [ 
                    {l:"Budget", v:"0 €", c:"text-success"}, 
                    {l:"Auto", v:`+${Math.round(10 * rewardMult)}%`, c:"text-success"} 
                ],
                effect: () => { autonomie += (10 * rewardMult); },
            }
        ]
    },
    3: {
        title: "REQ_03: LE NUAGE",
        desc: "> [DATA] Où stocker les données scolaires ? Offre GAFAM vs Serveur local.",
        options: [
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
                type: "nird", title: "Serveur Local", 
                desc: "Installer un Nextcloud au lycée. Souverain.", 
                icon: "dns",
                stats: [ 
                    {l:"Budget", v:`-${(1 * costMult).toFixed(1)} k€`, c:"text-danger"}, 
                    {l:"Auto", v:`+${Math.round(25 * rewardMult)}%`, c:"text-success"} 
                ],
                effect: () => { budget -= (1 * costMult); autonomie += (25 * rewardMult); ecologie -= 5; },
            }
        ]
    },
    // Tour 4 : Obsolescence
    4: {
        title: "REQ_04: OBSOLESCENCE",
        desc: "> [HARDWARE] 10 écrans clignotent. Ils sont réparables mais c'est long.",
        options: [
            {
                type: "goliath", title: "Jeter et Racheter", desc: "Direction la déchetterie, commande Amazon.", icon: "delete_forever",
                stats: [ {l:"Budget", v:`-${(2 * costMult).toFixed(1)} k€`, c:"text-danger"}, {l:"Eco", v:`-${Math.round(10*ecoMult)} pts`, c:"text-danger"} ],
                effect: () => { budget -= (2 * costMult); ecologie -= (10 * ecoMult); },
            },
            {
                type: "nird", title: "Repair Café", desc: "Club réparation avec les élèves (condensateurs).", icon: "handyman",
                stats: [ {l:"Budget", v:"-0.1 k€", c:"text-success"}, {l:"Eco", v:`+${Math.round(10*ecoMult)} pts`, c:"text-success"} ],
                effect: () => { budget -= 0.1; ecologie += (10 * ecoMult); autonomie += 5; },
            }
        ]
    }
};

// --- AJOUTS SPÉCIAUX (Difficulté) ---

// En mode HARD, on remplace le tour 3 par une attaque Ransomware !
if (diff === 'hard') {
    scenarios[3] = {
        title: "ALERTE CRITIQUE : RANSOMWARE",
        desc: "> [SECURITY] Un cryptolocker a chiffré les données administratives ! Aucune sauvegarde récente.",
        options: [
            {
                type: "goliath", title: "Payer la Rançon", 
                desc: "Les hackers promettent la clé de déchiffrement.", 
                icon: "paid",
                stats: [ {l:"Budget", v:"-15 k€", c:"text-danger"}, {l:"Dignité", v:"-100%", c:"text-danger"} ],
                effect: () => { budget -= 15; autonomie -= 10; },
            },
            {
                type: "nird", title: "Tout Reconstruire", 
                desc: "Ne pas céder au chantage. On repart de zéro sous Linux.", 
                icon: "restart_alt",
                stats: [ {l:"Temps", v:"Perdu", c:"text-warning"}, {l:"Auto", v:"+10%", c:"text-success"} ],
                effect: () => { autonomie += 10; /* Pas de perte budget mais gros stress */ },
            }
        ]
    };
}