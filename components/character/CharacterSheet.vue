<template>
    <div class="w-100 character-sheet" v-if="character">

        <div class="flex flex-space-between sheet-buttons">
            <button 
                type="button" 
                class="btn-cta"
                :class="[
                    'btn-' + getCharacterClass(character),
                    { 'active': display == 'add-skills' }
                ]"
                @click="display = display != 'add-skills' ? 'add-skills' : 'skills'"
            >
                + {{ $t('interface.characters.add_skill') }}
            </button>

            <button type="button" class="btn-cta" @click="updateCharacter">
                {{ $t('interface.save_and_exit') }}
            </button>
        </div>

        <CharacterCardExpandable 
            :character="character" 
            :isExpandable="false"
            :showStatus="false"
            class="w-100"
        />

        <div class="flex flex-justify-center w-100 view-buttons" v-show="display != 'add-skills'">
            <button 
                type="button" 
                class="btn-cta" 
                :class="[
                    'btn-' + getCharacterClass(character),
                    { 'active': display == 'sheet' }
                ]"
                @click="display = 'sheet'"
            >
                {{ $t('interface.characters.sheet') }}
            </button>
            
            <button 
                type="button" 
                class="btn-cta" 
                :class="[
                    'btn-' + getCharacterClass(character),
                    { 'active': display == 'skills' }
                ]"
                @click="display = 'skills'"
            >
                {{ $t('interface.skills.skills') }}
            </button>
        </div>

        <div class="flex flex-column view-sheet" v-show="display == 'sheet'">

            <div class="flex flex-justify-center w-100 data">

                <div class="flex flex-column flex-align-center">

                    <CharacterPanel
                        :title="$t('combat.status')"
                        :characterClass="getCharacterClass(character)"
                        :maxRowElements="1"
                        :autoMaxWidth="false"
                    >
                        <template v-slot:panel-data>
                            <div class="flex flex-column w-100 character-status">
                                <div class="flex flex-column w-100">
                                    <span class="text-uppercase text-bold text-center">
                                        {{ $t('combat.shield') }}
                                    </span>

                                    <div class="flex flex-align-center bar-container">
                                        <button
                                            type="button"
                                            class="btn-cta"
                                            @click="changeValue('shield', -1)"
                                        >
                                            -
                                        </button>

                                        <div class="bar bar-shield">
                                            <span 
                                                class="point active" 
                                                v-for="point in character.combat.shield"
                                                :key="'shield-' + point"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            class="btn-cta"
                                            @click="changeValue('shield', 1)"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div class="flex flex-column w-100">
                                    <span class="text-uppercase text-bold text-center">
                                        {{ $t('combat.health_current') }}
                                    </span>

                                    <div class="flex flex-align-center bar-container">
                                        <button
                                            type="button"
                                            class="btn-cta"
                                            @click="changeValue('health', -1)"
                                        >
                                            -
                                        </button>
                                
                                        <div class="bar bar-health">
                                            <span 
                                                class="point" 
                                                v-for="point in getCharacterTotalHealth(character)"
                                                :key="'hp-' + point"
                                                :class="{ 'active': point <= character.combat.health.current }"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            class="btn-cta"
                                            @click="changeValue('health', 1)"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div class="flex flex-column w-100">
                                    <span class="text-uppercase text-bold text-center">
                                        {{ $t('combat.mana_current') }}
                                    </span>

                                    <div class="flex flex-align-center bar-container">
                                        <button
                                            type="button"
                                            class="btn-cta"
                                            @click="changeValue('mana', -1)"
                                        >
                                            -
                                        </button>
                                
                                        <div class="bar bar-mana">
                                            <span 
                                                class="point" 
                                                v-for="point in getCharacterTotalMana(character)"
                                                :key="'hp-' + point"
                                                :class="{ 'active': point <= character.combat.mana.current }"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            class="btn-cta"
                                            @click="changeValue('mana', 1)"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CharacterPanel>

                    <CharacterPanel
                        :title="$t('statistics.name')"
                        :characterClass="getCharacterClass(character)"
                        :maxRowElements="1"
                        :autoMaxWidth="false"
                    >
                        <template v-slot:panel-data>
                            <div 
                                v-for="(statistic, index) in Object.keys(character.statistics)"
                                :key="'statistic-' + index"
                                class="flex flex-align-center flex-space-between w-100 panel"
                            >
                                <div class="flex flex-align-center name">
                                    <img :src="'icons/statistics/' + statistic + '.png'" class="icon">
                                    <span>
                                        {{ $t('statistics.' + statistic) }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center">
                                    <input 
                                        type="number" 
                                        class="input-number" 
                                        v-model="character.statistics[statistic]"
                                        @keypress="allowOnlyNumbers($event)"
                                    >
                                </div>
                            </div>
                        </template>
                    </CharacterPanel>

                    <CharacterPanel
                        :title="$t('combat.name')"
                        :characterClass="getCharacterClass(character)"
                        :maxRowElements="1"
                        :autoMaxWidth="false"
                    >
                        <template v-slot:panel-data>
                            <div class="flex flex-align-center flex-space-between panel panel-doubleline">
                                <div class="flex flex-align-center name">
                                    <img 
                                        :src="'icons/combat/health.png'" 
                                        class="icon"
                                    >
                                    <span>
                                        {{ $t('combat.hp') }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center">
                                    <div class="flex flex-align-center">
                                        <input 
                                            type="number" 
                                            class="input-number" 
                                            v-model="character.combat.health.bonus"
                                            @keypress="allowOnlyNumbers($event)"
                                        >
                                    </div>
                                    <div class="flex flex-align-center flex-justify-center combat-base-bonus">
                                        <span class="bonus">{{ getStatBonus(character, character.combat.health.statistic) }}</span>
                                        <img src="icons/statistics/constitution.png" class="bonus-icon">
                                        <span class="bonus">
                                            + {{ character.combat.health.base }}
                                        </span>
                                    </div>
                                    <div class="flex flex-align-center total">
                                        <span class="bonus">
                                            = {{ getCharacterTotalHealth(character) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-align-center flex-space-between panel panel-doubleline">
                                <div class="flex flex-align-center name">
                                    <img 
                                        :src="'icons/combat/mana.png'" 
                                        class="icon"
                                    >
                                    <span>
                                        {{ $t('combat.mp') }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center">
                                    <div class="flex flex-align-center">
                                        <input 
                                            type="number" 
                                            class="input-number" 
                                            v-model="character.combat.mana.bonus"
                                            @keypress="allowOnlyNumbers($event)"
                                        >
                                    </div>
                                    <div class="flex flex-align-center flex-justify-center combat-base-bonus">
                                        <span class="bonus">{{ getStatBonus(character, character.combat.mana.statistic) }}</span>
                                        <img src="icons/statistics/mana.png" class="bonus-icon">
                                        <span class="bonus">
                                            + {{ character.combat.mana.base }}
                                        </span>
                                    </div>
                                    <div class="flex flex-align-center total">
                                        <span class="bonus">
                                            = {{ getCharacterTotalMana(character) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-align-center flex-space-between panel panel-doubleline ">
                                <div class="flex flex-align-center name">
                                    <img 
                                        :src="'icons/combat/defense.png'" 
                                        class="icon"
                                    >
                                    <span>
                                        {{ $t('combat.defense') }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center">
                                    <div class="flex flex-align-center">
                                        <input 
                                            type="number" 
                                            class="input-number" 
                                            v-model="character.combat.defense.bonus"
                                            @keypress="allowOnlyNumbers($event)"
                                        >
                                    </div>
                                    <div class="flex flex-align-center flex-justify-center combat-base-bonus">
                                        <span class="bonus">{{ getStatBonus(character, character.combat.defense.statistic) }}</span>
                                        <img :src="'icons/statistics/' + character.combat.defense.statistic + '.png'" class="bonus-icon">
                                        <span class="bonus">+ 10</span>
                                    </div>
                                    <div class="flex flex-align-center total">
                                        <span class="bonus">
                                            = {{ getCharacterDefense(character) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-align-center flex-space-between panel panel-doubleline">
                                <div class="flex flex-align-center name">
                                    <img 
                                        :src="'icons/combat/speed.png'" 
                                        class="icon"
                                    >
                                    <span>
                                        {{ $t('combat.speed') }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center">
                                    <div class="flex flex-align-center">
                                        <input 
                                            type="number" 
                                            class="input-number" 
                                            v-model="character.combat.speed.bonus"
                                            @keypress="allowOnlyNumbers($event)"
                                        >
                                    </div>
                                    <div class="flex flex-align-center flex-justify-center combat-base-bonus">
                                        <span class="bonus">+ {{ character.combat.speed.base }}</span>
                                    </div>
                                    <div class="flex flex-align-center total">
                                        <span class="bonus">
                                            = {{ getCharacterSpeed(character) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex flex-align-center flex-space-between panel panel-doubleline">
                                <div class="flex flex-align-center name">
                                    <img 
                                        :src="'icons/combat/initiative.png'" 
                                        class="icon"
                                    >
                                    <span>
                                        {{ $t('combat.initiative') }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center">
                                    <div class="flex flex-align-center">
                                        <input 
                                            type="number" 
                                            class="input-number" 
                                            v-model="character.combat.initiative.bonus"
                                            @keypress="allowOnlyNumbers($event)"
                                        >
                                    </div>
                                    <div class="flex flex-align-center flex-justify-center combat-base-bonus">
                                        <span class="bonus">{{ getStatBonus(character, character.combat.initiative.statistic) }}</span>
                                        <img :src="'icons/statistics/' + character.combat.initiative.statistic + '.png'" class="bonus-icon">
                                    </div>
                                    <div class="flex flex-align-center total">
                                        <span class="bonus">
                                            = {{ getCharacterInitiative(character) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CharacterPanel>
                    
                </div>  
                
                <div class="flex flex-column flex-align-center">

                    <CharacterPanel
                        :title="$t('physical_resistances')"
                        :characterClass="getCharacterClass(character)"
                        :maxRowElements="1"
                        :autoMaxWidth="false"
                    >
                        <template v-slot:panel-data>
                            <div 
                                v-for="(res, key) in physicalResistancesByName"
                                :key="'phy-' + key"
                                class="flex flex-align-center flex-space-between panel panel-doubleline"
                            >
                                <div class="flex flex-align-center name">
                                    <img 
                                        :src="'icons/damage_types/' + key + '.png'" 
                                        class="icon"
                                    >
                                    <span>
                                        {{ $t('damage_types.' + key) }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center">
                                    <div class="flex flex-align-center">
                                        <input 
                                            type="number" 
                                            class="input-number" 
                                            v-model="character.resistances.physical[key].bonus"
                                            @keypress="allowOnlyNumbers($event)"
                                        >
                                    </div>
                                    <div class="flex flex-align-center flex-justify-center base-bonus">
                                        <span class="bonus">{{ getResistanceStatBonus(res.statistic) }}</span>
                                        <img :src="'icons/statistics/' + res.statistic + '.png'" class="bonus-icon">
                                    </div>
                                    <div class="flex flex-align-center total">
                                        <span class="bonus">
                                            = {{ getResistanceByType(character, key) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CharacterPanel>
                    
                    <CharacterPanel
                        :title="$t('magical_resistances')"
                        :characterClass="getCharacterClass(character)"
                        :maxRowElements="1"
                        :autoMaxWidth="false"
                    >
                        <template v-slot:panel-data>
                            <div 
                                v-for="(res, key) in magicalResistancesByName"
                                :key="'phy-' + key"
                                class="flex flex-align-center flex-space-between panel panel-doubleline"
                            >
                                <div class="flex flex-align-center name">
                                    <img 
                                        :src="'icons/damage_types/' + key + '.png'" 
                                        class="icon"
                                    >
                                    <span>
                                        {{ $t('damage_types.' + key) }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center">
                                    <div class="flex flex-align-center">
                                        <input 
                                            type="number" 
                                            class="input-number" 
                                            v-model="character.resistances.magical[key].bonus"
                                            @keypress="allowOnlyNumbers($event)"
                                        >
                                    </div>
                                    <div class="flex flex-align-center flex-justify-center base-bonus">
                                        <span class="bonus">{{ getResistanceStatBonus(res.statistic) }}</span>
                                        <img :src="'icons/statistics/' + res.statistic + '.png'" class="bonus-icon">
                                    </div>
                                    <div class="flex flex-align-center total">
                                        <span class="bonus">
                                            = {{ getResistanceByType(character, key) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </CharacterPanel>

                </div>
            </div>

        </div>

        <div class="flex flex-column flex-align-center view-skills" v-show="display == 'skills'">

            <CharacterPanel
                :title="$t('interface.skills.skills')"
                :characterClass="getCharacterClass(character)"
                :maxRowElements="1"
                :autoMaxWidth="false"
            >
                <template v-slot:panel-data>
                    <div
                        v-for="(skill, index) in orderedSkills"
                        :key="'skill-' + index"
                        class="flex flex-align-center w-100 panel"
                    >
                        <Skill 
                            :character="character"
                            :level="skill.level" 
                            :slug="skill.skill"
                            :deletable="true"
                            @level-down="levelSkill($event, -1)"
                            @level-up="levelSkill($event, 1)"
                            @remove="removeSkill(skill.skill)"
                        />
                    </div>
                </template>
            </CharacterPanel>

        </div>

        <div class="flex flex-column flex-align-center w-100 add-skills" v-if="display == 'add-skills'">
                <AddSkillSelector 
                    @select-skill="addSkill($event)"
                />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        character: { type: Object, default: null }
    },
    data () {
        return {
            display: 'sheet'
        }
    },
    computed: {
        ...mapGetters([
            'getCharacterClass',
            'getCharacterDefense', 
            'getCharacterInitiative',
            'getCharacterSpeed', 
            'getCharacterTotalHealth',
            'getCharacterTotalMana',
            'getResistanceByType', 
            'getStatBonus',
        ]),
        physicalResistancesByName () {
            return Object.keys(this.character.resistances.physical).sort((a, b) => {
                return this.$t('damage_types.' + a) > this.$t('damage_types.' + b) ? 1 : -1
            }).reduce(
                (obj, key) => {
                    obj[key] = this.character.resistances.physical[key]
                    return obj
                },
                {}
            )
        },
        magicalResistancesByName () {
            return Object.keys(this.character.resistances.magical).sort((a, b) => {
                return this.$t('damage_types.' + a) > this.$t('damage_types.' + b) ? 1 : -1
            }).reduce(
                (obj, key) => {
                    obj[key] = this.character.resistances.magical[key]
                    return obj
                },
                {}
            )
        },
        orderedSkills () {
            return this.character.skills.sort((a, b) => {
                return this.$t('skills.' + a.skill + '.name') > this.$t('skills.' + b.skill + '.name') ? 1 : -1
            })
        }
    },
    methods: {
        addSkill (skill) {
            let found = this.character.skills.filter(s => {
                return s.skill == skill.skill
            }).length > 0

            if (!found) {
                this.character.skills.push(skill)
            }

            this.display = 'skills'
        },
        allowOnlyNumbers (event) {
            if (event.key.length === 1 && /\D/.test(event.key)) {
                event.preventDefault()
            }
        },
        changeValue (property, value) {
            if (property == 'shield') {
                if (this.character.combat.shield > 0 || value > 0) {
                    this.character.combat.shield += value
                }
            }
            else {
                let currentValue = this.character.combat[property].current
                let total = property == 'health' ? this.getCharacterTotalHealth(this.character) : this.getCharacterTotalMana(this.character)
                
                if ((value > 0 && currentValue < total) || (value < 0 && currentValue > 0)) {
                    this.character.combat[property].current += value
                }
            }
        },
        getResistanceStatBonus (stat) {
            let value = Math.floor(this.getStatBonus(this.character, stat) / 2)
            
            if (value >= 0) {
                value = '+' + value
            }

            return value
        },
        levelSkill (event, increment) {
            let skillSlug = event

            let skill = this.character.skills.filter(s => {
                return s.skill == skillSlug
            })[0]
            
            if ((increment < 0 && skill.level > 1) || (increment > 0 && skill.level < 3)) {
                skill.level += increment
            }
        },
        removeSkill (skill) {
            let skillRemovedList = this.character.skills.filter(s => {
                return s.skill != skill
            })

            this.character.skills = skillRemovedList
        },
        updateCharacter () {
            if (this.character.type == 'character') {
                this.$store.dispatch('updateCharacter', this.character)
            }
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.icon {
    width: 50px;
    height: auto;
}

.character-panel {
    margin: 0 15px 30px 15px;
    width: 100%;

    ::v-deep {
        .character-panel-body {
            padding: 0;
        }
    }
}

.view-buttons {
    margin: 30px 0 50px;

    .btn-cta {
        width: 300px;

        &:not(:last-child) {
            margin-right: 40px;
        }
    }
}

.sheet-buttons {
    margin: 0 0 10px 0;
    padding-left: 140px;
}

.view-sheet {
    align-items: center;

    .character-panel {
        max-width: 620px;
    }
}

.view-skills {
    .character-panel {
        max-width: 1270px;
        margin: 0 0 30px;
    }
}

.skill-selector {
    max-width: 1270px;
}

.panel {
    padding: 15px 20px;

    &:nth-child(even) {
        background-color: $black-dark;
    }

    .name {
        position: relative;
        width: 230px;

        span {
            text-transform: uppercase;
            font-weight: bold;
            margin-left: 20px;
        }
    }

    .input-number {
        margin: 0;
        margin-left: 30px;
    }

    .stat-bonus {
        font-size: 24px;
        font-weight: bold;
        margin-left: 20px;
        width: 3em;
    }

    .bonus {
        font-size: 24px;
        font-weight: bold;
        margin-left: 10px;
    }

    .bonus-icon {
        width: 30px;
        margin-left: 5px;
    }

    .base-bonus,
    .combat-base-bonus {
        width: 160px;
    }

    .total {
        width: 5em;
    }
}

.character-status {
    padding: 20px;

    > div {
        &:not(:last-child) {
            margin-bottom: 20px;
        }

        > span {
            margin-bottom: 10px;
        }
    }

    .btn-cta {
        width: 100%;
        max-width: 40px;
        height: 40px;
        font-size: 30px;
        font-weight: normal;
        padding: 0;
    }

    .bar {
        margin: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        width: 100%;
        color: #fff;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        border: 2px solid rgba(0, 0, 0, 1);
    
        &.bar-shield {
            .point.active {
                background-color: $shield-color;
            }
        }
    
        &.bar-health {
            .point.active {
                background-color: $health-color;
            }
        }
    
        &.bar-mana {
            .point.active {
                background-color: $mana-color;
            }
        }
    
        .point {
            width: 100%;
            height: 20px;
            min-width: 20px;
            border-right: 1px solid rgba(0, 0, 0, 1);
            border-left: 1px solid rgba(0, 0, 0, 1);
            background-color: rgba(0, 0, 0, 0.26);
    
            &:first-child {
                border-left: 0;
            }
    
            &:last-child {
                border-right: 0;
            }
        }
    }
}

@media only screen and (max-width: 1400px) {
    .view-sheet {
        .data {
            flex-direction: column;
        }
    }

    .view-skills {
        .character-panel {
            max-width: 620px;
        }
    }
}

@media only screen and (max-width: 767px) {
    .view-buttons {
        flex-direction: column;
        align-items: center;

        .btn-cta {
            width: 300px;
            margin-left: 0;

            &:not(:last-child) {
                margin-right: 0;
                margin-bottom: 20px;
            }
        }
    }

    .character-panel {
        width: 100%;
        max-width: unset !important;
    }

    .panel-doubleline {
        flex-direction: column;
        width: 100%;

        > *:first-child {
            margin-bottom: 20px;
        }

        ::v-deep {
            .name {
                justify-content: center;
            }

            .input-number {
                margin-left: 0;
            }
        }
    }
}
</style>