import axios from 'axios'
import i18n from 'vue-i18n' 

export const state = () => ({
    apiURL: 'http://isekai-api.homestead/api/v1',
    classes: {
        explorer: { 
            type: "character",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 4, current: 3, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 2 },
                mana: { base: 4, current: 3, statistic: "mana", bonus: 0 },
                speed: { base: 4, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 0 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: 0 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 1,
                dexterity: 2,
                constitution: 1,
                magic: 1,
                faith: 0,
                mana: 1
            },
            skills: [
                { skill: "ranged-attack-pierce" },
                { skill: "melee-attack-cut" },
                { skill: "sixth-sense", level: 1 },
                { skill: "sense-danger", level: 1 },
                { skill: "focus-shot", level: 1 },
                { skill: "fast-cut", level: 1 }
            ]
        },
        mage: { 
            type: "character",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 4, current: 3, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 2 },
                mana: { base: 4, current: 3, statistic: "mana", bonus: 0 },
                speed: { base: 4, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 0 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: 0 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 0,
                dexterity: 1,
                constitution: 0,
                magic: 2,
                faith: 0,
                mana: 3
            },
            skills: [
                { skill: "melee-attack-magic" },
                { skill: "elemental-affinity", level: 1 },
                { skill: "elemental-projectile-earth", level: 1 },
                { skill: "elemental-projectile-fire", level: 1 },
                { skill: "elemental-projectile-water", level: 1 },
                { skill: "elemental-projectile-air", level: 1 }
            ]
        },
        priest: {
            type: "character",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 4, current: 3, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 2 },
                mana: { base: 4, current: 3, statistic: "mana", bonus: 0 },
                speed: { base: 4, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 0 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: 0 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 1,
                dexterity: 0,
                constitution: 1,
                magic: 0,
                faith: 2,
                mana: 2
            },
            skills: [
                { skill: "melee-attack-blunt" },
                { skill: "devotion", level: 1 },
                { skill: "holy-shield", level: 1 },
                { skill: "faith-blow", level: 1 },
                { skill: "healing-touch", level: 1 }
            ]
        },
        warrior: { 
            type: "character",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 4, current: 3, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 2 },
                mana: { base: 4, current: 3, statistic: "mana", bonus: 0 },
                speed: { base: 4, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 0 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: 0 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 2,
                dexterity: 1,
                constitution: 2,
                magic: 0,
                faith: 0,
                mana: 1
            },
            skills: [
                { skill: "melee-attack-cut" },
                { skill: "robustness", level: 1 },
                { skill: "draw-attention", level: 1 },
                { skill: "powerful-blow", level: 1 },
                { skill: "shield-blow", level: 1 },
            ]
        }
    },
    characters: [

    ],
    enemies: [
        {
            name: "forest-bandit",
            type: "enemy-regular",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 4, current: 5, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 1 },
                mana: { base: 4, current: 4, statistic: "mana", bonus: 0 },
                speed: { base: 4, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 0 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: 0 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 1,
                dexterity: 1,
                constitution: 0,
                magic: 0,
                faith: 0,
                mana: 1
            },
            skills: [
                { skill: "melee-attack-cut" },
                { skill: "ranged-attack-pierce" }
            ]
        },
        {
            name: "forest-patches",
            type: "enemy-boss",
            combat: {
                defense: { statistic: "dexterity", bonus: 2 },
                health: { base: 4, current: 5, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 0 },
                mana: { base: 4, current: 6, statistic: "mana", bonus: 0 },
                speed: { base: 4, bonus: 1 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 0 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: 0 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 2,
                dexterity: 2,
                constitution: 1,
                magic: 2,
                faith: 0,
                mana: 2
            },
            skills: [
                { skill: "melee-attack-cut" },
                { skill: "smoke-screen", level: 1},
                { skill: "double-attack", level: 2 },
                { skill: "vanish", level: 1 }
            ]
        },
        {
            name: "forest-guardian-cub",
            type: "enemy-regular",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 4, current: 5, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 1 },
                mana: { base: 4, current: 4, statistic: "mana", bonus: 0 },
                speed: { base: 5, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 3 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: -1 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 2,
                dexterity: 1,
                constitution: 1,
                magic: 0,
                faith: 0,
                mana: 0
            },
            skills: [
                { skill: "cleave-claw", level: 1 },
                { skill: "overwhelming-charge", level: 1 },
            ]
        },
        {
            name: "forest-guardian",
            type: "enemy-boss",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 6, current: 8, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 1 },
                mana: { base: 4, current: 4, statistic: "mana", bonus: 0 },
                speed: { base: 5, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 3 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: -1 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 2,
                dexterity: 2,
                constitution: 2,
                magic: 3,
                faith: 0,
                mana: 0
            },
            skills: [
                { skill: "cleave-claw", level: 2 },
                { skill: "overwhelming-charge", level: 2 },
                { skill: "fear-shout", level: 2 },
                { skill: "guardian-wrath" }
            ]
        },
        {
            name: "forest-spider-brood",
            type: "enemy-regular",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 3, current: 3, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 0 },
                mana: { base: 2, current: 2, statistic: "mana", bonus: 0 },
                speed: { base: 6, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 3 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: -2 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 1,
                dexterity: 3,
                constitution: 0,
                magic: 0,
                faith: 0,
                mana: 0
            },
            skills: [
                { skill: "melee-attack-blunt" },
                { skill: "poison-bite", level: 1 }
            ]
        },
        {
            name: "forest-giant-spider",
            type: "enemy-regular",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 4, current: 5, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 1 },
                mana: { base: 4, current: 4, statistic: "mana", bonus: 0 },
                speed: { base: 5, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 3 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: -1 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 2,
                dexterity: 1,
                constitution: 1,
                magic: 1,
                faith: 0,
                mana: 0
            },
            skills: [
                { skill: "melee-attack-blunt" },
                { skill: "poison-bite", level: 1 },
                { skill: "spiderweb", level: 1 }
            ]
        },
        {
            name: "forest-spider-queen",
            type: "enemy-boss",
            combat: {
                defense: { statistic: "dexterity", bonus: 0 },
                health: { base: 8, current: 12, statistic: "constitution", bonus: 0 },
                initiative: { statistic: "dexterity", bonus: 1 },
                mana: { base: 8, current: 10, statistic: "mana", bonus: 0 },
                speed: { base: 4, bonus: 0 },
                shield: 0
            },
            resistances: {
                physical: {
                    bleed: { statistic: "constitution", bonus: 0 },
                    blunt: { statistic: "strength", bonus: 0 },
                    poison: { statistic: "constitution", bonus: 10 },
                    pierce: { statistic: "strength", bonus: 0 },
                    cut: { statistic: "strength", bonus: 0 }
                },
                magical: {
                    earth: { statistic: "magic", bonus: 0 },
                    fire: { statistic: "magic", bonus: -1 },
                    ice: { statistic: "magic", bonus: 0 },
                    lightning: { statistic: "magic", bonus: 0 },
                    water: { statistic: "magic", bonus: 0 },
                    wind: { statistic: "magic", bonus: 0 },
                    demonic: { statistic: "faith", bonus: 0 },
                    magical: { statistic: "magic", bonus: 0 },
                    holy: { statistic: "faith", bonus: 0 },
                }
            },
            statistics: {
                strength: 3,
                dexterity: 2,
                constitution: 4,
                magic: 3,
                faith: 0,
                mana: 2
            },
            skills: [
                { skill: "melee-attack-blunt" },
                { skill: "poison-bite", level: 3 },
                { skill: "spiderweb", level: 3 },
                { skill: "call-brood", level: 3 },
                { skill: "devour-brood" }
            ]
        }
    ],
    /*statistics: [
        "strength",
        "dexterity",
        "constitution",
        "magic",
        "faith",
        "mana"
    ],
    damageTypes: [
        { name: "bleed", type: "physical" },
        { name: "blunt", type: "physical" },
        { name: "poison", type: "physical" },
        { name: "pierce", type: "physical" },
        { name: "cut", type: "physical" },
        { name: "earth", type: "magical" },
        { name: "fire", type: "magical" },
        { name: "ice", type: "magical" },
        { name: "lightning", type: "magical" },
        { name: "water", type: "magical" },
        { name: "wind", type: "magical" },
        { name: "demonic", type: "magical" },
        { name: "magical", type: "magical" },
        { name: "holy", type: "magical" }
    ],*/
    damageTypes: {
        physical: ["bleed", "blunt", "cut", "pierce", "poison"],
        magical: ["earth", "fire", "ice", "lightning", "water", "wind", "demonic", "magical", "holy"]
    },
    skills: [
        { 
            name: "fear-shout",
            statistic: "magic",
            type: "action",
            mana: 1,
            bonus: 1,
            range: 2,
            levels: {
                level_2: { bonus: { type: "bonus", value: 1 }},
                level_3: { bonus: { type: "range", value: 1 }}
            }
        },
        {
            name: "overwhelming-charge",
            statistic: "strength",
            type: "attack",
            damage: 1,
            damage_type: "blunt",
            mana: 2,
            range: 4,
            levels: {
                level_2: { bonus: { type: "range", value: 2 }},
                level_3: { bonus: { type: "damage", value: 1 }}
            }
        },
        { 
            name: "cleave-claw",
            statistic: "strength",
            type: "attack",
            damage: 1,
            damage_type: "cut",
            range: 1,
            targets: 1,
            bonus: 1,
            levels: {
                level_2: { bonus: { type: "damage", value: 1 }},
                level_3: { bonus: { type: "bonus", value: 1 }}
            }
        },
        {
            name: "guardian-wrath",
            type: "unique"
        },
        {
            name: "devour-brood",
            type: "unique"
        },
        {
            name: "poison-bite",
            statistic: "strength",
            type: "attack",
            mana: 1,
            damage: 1,
            damage_type: "pierce",
            range: 1,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "damage", value: 1 }},
                level_3: { bonus: { type: "description", value: "+1 al daño por Veneno" }}
            }
        },
        {
            name: "call-brood",
            statistic: "magic",
            type: "action",
            mana: 2,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "targets", value: 2 }},
                level_3: { bonus: { type: "type", value: "free-action" }}
            }
        },
        {
            name: "spiderweb",
            statistic: "magic",
            type: "action",
            mana: 2,
            range: 3,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "range", value: 2 }},
                level_3: { bonus: { type: "targets", value: 1 }}
            }
        },
        { 
            name: "melee-attack-blunt",
            statistic: "strength",
            type: "attack",
            damage: 0,
            damage_type: "blunt",
            range: 1,
            targets: 1
        },
        { 
            name: "ranged-attack-pierce",
            statistic: "dexterity",
            type: "attack",
            damage: 0,
            damage_type: "pierce",
            range: 3,
            targets: 1
        },
        { 
            name: "ranged-attack-magical",
            statistic: "magic",
            type: "attack",
            damage: 0,
            damage_type: "magical",
            range: 3,
            targets: 1
        },
        {
            name: "melee-attack-cut",
            statistic: "strength",
            type: "attack",
            damage: 0,
            damage_type: "cut",
            range: 1,
            targets: 1
        },
        {
            name: "sixth-sense",
            type: "passive",
            levels: {
                level_1: { skills: ["sense-danger", "focus-shot", "fast-cut"] },
                level_2: { statistics: { statistic: "dexterity|strength", value: 1 }},
                level_3: { statistics: { statistic: "magic|mana", value: 1 }}
            }
        },
        {
            name: "sense-danger",
            type: "action",
            levels: {
                level_2: { },
                level_3: { }
            }
        },
        {
            name: "focus-shot",
            statistic: "dexterity",
            type: "attack",
            bonus: 3,
            mana: 2,
            damage: 4,
            damage_type: "pierce",
            range: 5,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "statistic", value: 2 }},
                level_3: { bonus: { type: "damage", value: 2 }}
            },
            evolutions: ["double-shot", "power-shot"]
        },
        {
            name: "fast-cut",
            statistic: "dexterity",
            type: "attack",
            mana: 1,
            damage: 0,
            damage_type: "cut",
            range: 1,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "mana", value: -1 }},
                level_3: { bonus: { type: "targets", value: 1 }}
            },
            evolutions: ["bleed-cut", "sonic-cut"]
        },
        {
            name: "elemental-affinity",
            type: "passive",
            levels: {
                level_1: { skills: ["elemental-projectile-earth", "elemental-projectile-fire", "elemental-projectile-water",  "elemental-projectile-air"] },
                level_2: { statistics: { statistic: "magic", value: 1 }},
                level_3: { statistics: { statistic: "mana", value: 1 }}
            }
        },
        {
            name: "elemental-projectile-air",
            statistic: "magic",
            type: "attack",
            mana: 1,
            damage: 2,
            damage_type: "wind",
            range: 3,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "range", value: 1 }},
                level_3: { bonus: { type: "damage", value: 1 }}
            },
            evolutions: ["whirlwind", "wind-blow"]
        },
        {
            name: "elemental-projectile-earth",
            statistic: "magic",
            type: "attack",
            mana: 1,
            damage: 2,
            damage_type: "earth",
            range: 3,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "range", value: 1 }},
                level_3: { bonus: { type: "damage", value: 1 }}
            },
            evolutions: ["stone-wall", "rock-throw"]
        },
        {
            name: "elemental-projectile-fire",
            statistic: "magic",
            type: "attack",
            mana: 1,
            damage: 2,
            damage_type: "fire",
            range: 3,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "range", value: 1 }},
                level_3: { bonus: { type: "damage", value: 1 }}
            },
            evolutions: ["fire-ball", "flare"]
        },
        {
            name: "elemental-projectile-water",
            statistic: "magic",
            type: "attack",
            mana: 1,
            damage: 2,
            damage_type: "water",
            range: 3,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "range", value: 1 }},
                level_3: { bonus: { type: "damage", value: 1 }}
            },
            evolutions: ["surge", "water-cannon"]
        },
        {
            name: "devotion",
            type: "passive",
            levels: {
                level_1: { skills: ["holy-shield", "faith-blow", "healing-touch"] },
                level_2: { statistics: { statistic: "faith", value: 1 }},
                level_3: { statistics: { statistic: "mana", value: 1 }}
            }
        },
        {
            name: "holy-shield",
            statistic: "faith",
            type: "shield",
            mana: 1,
            shield: 1,
            range: 2,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "range", value: 1 }},
                level_3: { bonus: { type: "shield", value: 2 }}
            }
        },
        {
            name: "faith-blow",
            statistic: "faith",
            type: "attack",
            damage: 2,
            damage_type: "holy",
            mana: 1,
            range: 1,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "damage", value: 1 }},
                level_3: { bonus: { type: "damage", value: 1 }}
            },
            evolutions: ["holy-blow", "divine-lightning"]
        },
        {
            name: "healing-touch",
            statistic: "faith",
            type: "heal",
            heal: 1,
            mana: 2,
            range: 1,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "heal", value: 1 }},
                level_3: { bonus: { type: "mana", value: -1 }}
            },
            evolutions: ["healing-prayer", "healing-orison"]
        },
        {
            name: "robustness",
            type: "passive",
            levels: {
                level_1: { skills: ["draw-attention", "powerful-blow", "shield-blow"] },
                level_2: { statistics: { statistic: "strenth", value: 1 }},
                level_3: { statistics: { statistic: "constitution", value: 1 }}
            }
        },
        {
            name: "draw-attention",
            statistic: "constitution",
            type: "action",
            mana: 2,
            range: 4,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "range", value: 2 }},
                level_3: { bonus: { type: "targets", value: 1 }}
            },
            evolutions: ["taunt", "battlecry"]
        },
        {
            name: "powerful-blow",
            statistic: "strength",
            type: "attack",
            damage: 3,
            damage_type: "cut",
            mana: 3,
            range: 1,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "mana", value: -1 }},
                level_3: { bonus: { type: "damage", value: 1 }}
            },
            evolutions: ["colossal-blow", "blunt-blow"]
        },
        {
            name: "shield-blow",
            statistic: "strength",
            type: "attack",
            damage: 1,
            damage_type: "blunt",
            mana: 1,
            range: 1,
            targets: 1,
            levels: {
                level_2: { bonus: { type: "damage", value: 1 }},
                level_3: { bonus: { type: "description", value: "Si el ataque acierta, empujas al enemigo 1 casilla hacia atrás." }}
            },
            evolutions: ["counterattack", "block"]
        }
    ]
})

export const getters = {
    getCharacterById: (state) => (id) => {
        let search = state.characters.filter(c => {
                            return c.id == id
                        })
        return search.length ? search[0] : null
    },
    getCharacterClass: () => (character) => {
        let className = ''

        if (character) {
            className = character.type == 'character' ? character.class : character.type
        }
        
        return className
    },
    getCharacterDefense: (state, getters) => (character) => {
        return 10 + parseInt(character.statistics[character.combat.defense.statistic]) + parseInt(character.combat.defense.bonus)
    },
    getCharacterInitiative: (state, getters) => (character) => {
        let value = parseInt(character.statistics[character.combat.initiative.statistic]) + parseInt(character.combat.initiative.bonus)
        if (value >= 0) {
            value = '+' + value
        }
        return value
    },
    getCharacterSpeed: (state) => (character) => {
        return parseInt(character.combat.speed.base) + parseInt(character.combat.speed.bonus)
    },
    getCharacterTotalHealth: (state) => (character) => {
        return parseInt(character.combat.health.base) + parseInt(character.statistics[character.combat.health.statistic]) + parseInt(character.combat.health.bonus)
    },
    getCharacterTotalMana: (state) => (character) => {
        return parseInt(character.combat.mana.base) + parseInt(character.statistics[character.combat.mana.statistic]) + parseInt(character.combat.mana.bonus)
    },
    getEnemyByName: (state) => (id) => {
        let search = state.enemies.filter(e => {
            return e.name == id
        })

        return search.length ? search[0] : null
    },
    getResistanceByType: (state, getters) => (character, resistance) => {
        let damageType = 'physical'
        
        if (state.damageTypes.physical.indexOf(resistance) == -1) {
            damageType = 'magical'
        }

        let res = character.resistances[damageType][resistance]
        let value = Math.floor(parseInt(getters.getStatBonus(character, res.statistic)) / 2) + parseInt(res.bonus)
        if (value > 0) {
            value = '+' + value
        }
        return value
    },
    getSkill: (state) => (skillSlug) => {
        let found = state.skills.filter(s => {
            return s.name == skillSlug
        })

        return found.length ? found[0] : {}
    },
    getStatBonus: (state) => (character, statistic) => {
        let bonus = character.statistics[statistic]
        if (bonus >= 0) {
            bonus = '+' + bonus
        }
        return bonus
    }
}

export const mutations = {
    addCharacter(state, character) {
        state.characters.push(character)
        localStorage.setItem('characters', JSON.stringify(state.characters))
    },
    setCharacters(state, characters) {
        state.characters = characters
    },
    setSkills(state, skills) {
        state.skills = skills
    },
    updateCharacter(state, data) {
        state.characters[data.characterIndex] = data.character
        localStorage.setItem('characters', JSON.stringify(state.characters))
    }
}

export const actions = {
    createCharacter ({ state, commit }, character) {
        character.id = state.characters.length + 1
        commit("addCharacter", character)
        return character
    },
    updateCharacter ({ state, getters, commit }, character) {
        let index = state.characters.indexOf(getters.getCharacterById(character.id))
        commit("updateCharacter", { character: character, characterIndex: index })
    }
    /*async nuxtServerInit ({ state, commit, dispatch, getters }) {
        // Actions before page is loaded (IE: request access token to API)
        // await axios.get(...)
    }*/
}