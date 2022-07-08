<template>
    <div class="w-100">
        <div class="view-body">
            <InitiativeBar 
                :initiativeRolls="initiativeRolls"
                :currentInitiative="currentInitiative"
                @updateInitiative="setCurrentInitiative($event)"
                @updateOrder="initiativeOrder = $event"
            />
            
            <div class="flex flex-align-start flex-justify-center w-100 container combat-panel">

                <CharacterPanel
                    :title="currentStepText"
                    :characterClass="getCharacterClass(currentCharacter)"
                    :maxRowElements="1"
                    :autoMaxWidth="false"
                    class="character-panel w-100"
                    v-if="currentCharacter"
                >
                    <template v-slot:panel-data>
                        <div class="flex flex-justify-start w-100">
                            <div class="flex flex-column character-details">
                                <CharacterStatistics
                                    :character="currentCharacter"
                                    :maxRowElements="1"
                                />
                                
                                <CharacterCombat
                                    :character="currentCharacter"
                                    :maxRowElements="1"
                                />
                            </div>
                            
                            <div 
                                class="flex flex-column w-100 character-skills" 
                                v-if="currentStep == 'select-skill'"
                            >
                                <Skill 
                                    v-for="(characterSkill, index) in currentCharacterSkills"
                                    :key="'skill-' + index"
                                    :character="currentCharacter"
                                    :slug="characterSkill.skill"
                                    :level="characterSkill.level"
                                    :clickable="true"
                                    :simulateRoll="true"
                                    @select-skill="selectSkill($event)"
                                />
                            </div>

                            <div 
                                class="flex flex-column flex-space-between w-100 select-target" 
                                v-else-if="currentStep == 'select-target'"
                            >
                                <swiper 
                                    class="swiper characters"
                                    :options="swiperOptions"
                                    ref="swiper"
                                >
                                    <swiper-slide
                                        v-for="(roll, index) in initiativeOrder"
                                        :key="'objective-' + index"
                                        class="w-100"
                                    >
                                        <CharacterCardSimple
                                            :character="roll.character"
                                            @click="selectTarget(roll.character)"
                                        />
                                    </swiper-slide>
                                </swiper>

                                <div class="flex flex-space-between buttons">
                                    <button
                                        type="button"
                                        class="btn-cta"
                                        @click="currentStep = 'select-skill'"
                                    >
                                        {{ $t('interface.back') }}
                                    </button>
                                </div>
                            </div>

                            <div
                                class="flex flex-column flex-space-between w-100 set-roll"
                                v-else-if="currentStep == 'set-roll'"
                            >
                                <div class="flex flex-justify-start flex-align-center">
                                    <CharacterCardSimple
                                        :character="selectedTarget"
                                        :showStatus="true"
                                        :direction="'vertical'"
                                        class="w-100"
                                    />

                                    <div class="flex flex-column roll-modifiers">
                                        <div class="flex flex-align-center flex-space-between w-100">
                                            <label 
                                                for="roll-bonus" 
                                                class="text-uppercase text-bold"
                                            >
                                                Tirada
                                            </label>
                                            <input 
                                                id="roll-bonus" 
                                                type="number" 
                                                class="input-number"
                                                v-model="selectedSkillTargetRoll.roll"
                                            >
                                        </div>

                                        <div class="flex flex-align-center flex-space-between w-100">
                                            <label 
                                                for="roll-bonus" 
                                                class="text-uppercase text-bold"
                                            >
                                                Modificador tirada
                                            </label>
                                            <input 
                                                id="roll-bonus" 
                                                type="number" 
                                                class="input-number"
                                                v-model="selectedSkillTargetRoll.roll_bonus"
                                            >
                                        </div>

                                        <div 
                                            class="flex flex-align-center flex-space-between w-100"
                                            v-if="selectedSkill.skill.type == 'attack'"
                                        >
                                            <label 
                                                for="defense-modifier" 
                                                class="text-uppercase text-bold"
                                            >
                                                Modificador defensa
                                            </label>
                                            <input 
                                                id="defense-modifier" 
                                                type="number" 
                                                class="input-number"
                                                v-model="selectedSkillTargetRoll.defense_bonus"
                                            >
                                        </div>

                                        <div class="flex flex-align-center flex-space-between w-100">
                                            <label 
                                                for="normal" 
                                                class="flex flex-align-center text-uppercase text-bold w-100"
                                            >
                                                Normal
                                            </label>
                                            <input 
                                                id="normal"
                                                name="roll-type"
                                                type="radio" 
                                                class="input-checkbox"
                                                value="normal"
                                                v-model="selectedSkillTargetRoll.type"
                                            >
                                        </div>

                                        <div class="flex flex-align-center flex-space-between w-100">
                                            <label 
                                                for="advantage" 
                                                class="flex flex-align-center text-uppercase text-bold w-100"
                                            >
                                                Ventaja
                                            </label>
                                            <input 
                                                id="advantage"
                                                name="roll-type"
                                                type="radio" 
                                                class="input-checkbox"
                                                value="advantage"
                                                v-model="selectedSkillTargetRoll.type"
                                            >
                                        </div>

                                        <div class="flex flex-align-center flex-space-between w-100">
                                            <label 
                                                for="disadvantage" 
                                                class="flex flex-align-center text-uppercase text-bold w-100"
                                            >
                                                Desventaja
                                            </label>
                                            <input 
                                                id="disadvantage"
                                                name="roll-type"
                                                type="radio" 
                                                class="input-checkbox"
                                                value="disadvantage"
                                                v-model="selectedSkillTargetRoll.type"
                                            >
                                        </div>

                                    </div>
                                </div>

                                <div class="flex flex-space-between buttons">
                                    <button
                                        type="button"
                                        class="btn-cta"
                                        @click="currentStep = 'select-skill'"
                                    >
                                        {{ $t('interface.back') }}
                                    </button>
                                    
                                    <button
                                        type="button"
                                        class="btn-cta"
                                        @click="skillRoll()"
                                    >
                                        {{ $t('interface.next') }}
                                    </button>
                                </div>
                            </div>
                            
                            <div 
                                class="flex flex-column flex-align-center flex-space-between w-100 roll-results" 
                                v-else-if="currentStep == 'view-roll-results'"
                            >
                                <div class="flex flex-justify-center text-uppercase text-bold w-100">
                                    <span class="title">
                                        {{ $t('rolls.' + selectedSkillTargetRoll.result) }}
                                    </span>
                                </div>
                                <div class="flex flex-align-center w-100">
                                    <div class="flex flex-column w-100 rolls">
                                        <div class="flex flex-align-start w-100">
                                            <div>
                                                <D20 />
                                            </div>
                                            <div class="flex flex-column w-100 roll-data">
                                                <div class="flex flex-align-center flex-space-between">
                                                    <span class="text-uppercase">
                                                        {{ $t('interface.roll') }}
                                                    </span>

                                                    <span 
                                                        :class="{ 
                                                            'crit': selectedSkillTargetRoll.roll == 20, 
                                                            'fail': selectedSkillTargetRoll.roll == 1 
                                                        }"
                                                    >
                                                        {{ selectedSkillTargetRoll.roll }} 
                                                    </span>
                                                </div>

                                                <div class="flex flex-align-center flex-space-between" v-if="selectedSkill.skill.statistic">
                                                    <span class="text-uppercase">
                                                        Bonus {{ $t('statistics.' + selectedSkill.skill.statistic )}}
                                                    </span>

                                                    <span>
                                                        {{ getStatBonus(currentCharacter, selectedSkill.skill.statistic) }}
                                                    </span>
                                                </div>

                                                <div class="flex flex-align-center flex-space-between">
                                                    <span class="text-uppercase">
                                                        Modificador tirada
                                                    </span>
                                                    <span>
                                                        {{ selectedSkillTargetRoll.roll_bonus ? '+' + selectedSkillTargetRoll.roll_bonus : selectedSkillTargetRoll.roll_bonus }}
                                                    </span>
                                                </div>

                                                <div class="flex flex-align-center flex-space-between result">
                                                    <span class="text-uppercase">
                                                        Total
                                                    </span>
                                                    <span>
                                                        {{ selectedSkillTargetRoll.totalRoll }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div 
                                            class="flex flex-align-start flex-space-between w-100"
                                            v-if="selectedSkill.skill.type == 'attack'"
                                        >
                                            <img 
                                                src="icons/combat/defense.png" 
                                                class="icon"
                                            >

                                            <div class="flex flex-column w-100 roll-data">
                                                <div class="flex flex-align-center flex-space-between">
                                                    <span class="text-uppercase">
                                                        {{ $t('combat.defense')}}
                                                    </span>

                                                    <span>
                                                        {{ getCharacterDefense(selectedTarget) }}
                                                    </span>
                                                </div>

                                                <div class="flex flex-align-center flex-space-between">
                                                    <span class="text-uppercase">
                                                        Modificador defensa
                                                    </span>

                                                    <span>
                                                        {{ selectedSkillTargetRoll.defense_bonus > 0 ? '+' + selectedSkillTargetRoll.defense_bonus : selectedSkillTargetRoll.defense_bonus}}
                                                    </span>
                                                </div>

                                                <div class="flex flex-align-center flex-space-between result">
                                                    <span class="text-uppercase">
                                                        Total
                                                    </span>

                                                    <span>
                                                        {{ selectedSkillTargetRoll.totalDefense }}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                        <div 
                                            class="flex flex-align-start flex-space-between w-100"
                                        >
                                            <img :src="selectedSkillIcon" class="icon">

                                            <div class="flex flex-column w-100 roll-data">
                                                <div class="flex flex-align-center flex-space-between">
                                                    <span class="text-uppercase">
                                                        {{ selectedSkillText }}
                                                    </span>

                                                    <span v-html="selectedSkillTargetRoll.damageText" />
                                                </div>

                                                <div class="flex flex-align-center flex-space-between" v-if="selectedSkill.skill.type == 'attack'">
                                                    <span class="text-uppercase">
                                                        Resistencia a {{ $t('damage_types.' + selectedSkill.skill.damage_type) }}
                                                    </span>

                                                    <span>
                                                        {{ selectedSkillTargetRoll.damageResistance * -1 }}
                                                    </span>
                                                </div>

                                                <div class="flex flex-align-center flex-space-between result">
                                                    <span class="text-uppercase">
                                                        Total
                                                    </span>

                                                    <span>
                                                        {{ selectedSkillTargetRoll.damageTotal }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex flex-space-between w-100 buttons">
                                    <button
                                        type="button"
                                        class="btn-cta"
                                        @click="currentStep = 'set-roll'"
                                    >
                                        {{ $t('interface.back') }}
                                    </button>

                                    <button
                                        type="button"
                                        class="btn-cta"
                                        @click="apply"
                                    >
                                        {{ $t('interface.apply') }}
                                    </button>
                                </div>
                            </div>
                            
                            <div 
                                class="flex flex-column flex-align-center flex-space-between w-100 view-difference" 
                                v-else-if="currentStep == 'view-difference'"
                            >
                                <div class="flex flex-align-center flex-justify-center h-100">
                                    <div class="flex flex-column">
                                        <div class="text-uppercase text-bold title">
                                            ANTES
                                        </div>
                                        <CharacterCardSimple
                                            :character="selectedTargetBefore"
                                            :direction="'vertical'"
                                            :showStatus="true"
                                        />
                                    </div>

                                    <div class="flex flex-column">
                                        <div class="text-uppercase text-bold title">
                                            DESPUÉS
                                        </div>

                                        <CharacterCardSimple
                                            :character="selectedTarget"
                                            :direction="'vertical'"
                                            :showStatus="true"
                                        />
                                    </div>
                                </div>

                                <div class="flex flex-space-between w-100 buttons">
                                    <button
                                        type="button"
                                        class="btn-cta"
                                        @click="currentStep = 'view-roll-results'"
                                    >
                                        {{ $t('interface.back') }}
                                    </button>

                                    <button
                                        type="button"
                                        class="btn-cta"
                                        @click="finish"
                                    >
                                        {{ $t('interface.next') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </CharacterPanel>
            </div>
        </div>

        <div class="flex flex-justify-center w-100 characters-container">
            <swiper 
                class="swiper characters"
                :options="swiperOptions"
                ref="swiper"
            >
                <swiper-slide
                    v-for="(roll, index) in initiativeOrder"
                    :key="'objective-' + index"
                    class="w-100"
                >
                    <CharacterCardSimple
                        :character="roll.character"
                        @click="characterDetails = roll.character"
                    />
                </swiper-slide>
            </swiper>
        </div>

        <div class="view-footer container">
            <button type="button" class="btn-cta" @click="$emit('back')">
                {{ $t('interface.back')}}
            </button>
        </div>

        <CharacterModal
            :character="characterDetails"
            @close="characterDetails = null"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        initiativeRolls: { type: Array, default: [] }
    },
    data () {
        return {
            initiativeOrder: [],
            currentInitiative: 0,
            swiperOptions: {
                slidesPerView: 'auto',
                spaceBetween: 0,
                mousewheel: false,
                freeMode: true
            },
            characterDetails: null,
            selectedSkill: null,
            selectedTarget: null,
            selectedTargetBefore: null,
            selectedSkillTargetRoll: { 
                roll_bonus: 0, 
                defense_bonus: 0,
                type: 'normal',
                roll: null,
                result: null,
                totalRoll: null,
                totalDefense: null,
                damageText: null,
                damageTotal: null,
                damageResitance: null
            },
            currentSkillTarget: 1,
            currentStep: 'select-skill'
        }
    },
    computed: {
        ...mapGetters(['getCharacterClass', 'getCharacterDefense', 'getSkill', 'getStatBonus', 'getResistanceByType', 'getCharacterTotalHealth']),
        currentCharacter () {
            return this.initiativeOrder[this.currentInitiative] ? this.initiativeOrder[this.currentInitiative].character : null
        },
        currentCharacterName () {
            let name = ''

            if (this.currentCharacter) {
                if (this.currentCharacter.type == 'character') {
                    name = this.currentCharacter.name
                }
                else {
                    name = this.$t('enemies.' + this.currentCharacter.name)
                }
            }

            return name
        },
        currentStepText () {
            return this.$t('combat.' + this.currentStep)
        },
        currentCharacterSkills () {
            let skills = []

            if (this.currentCharacter) {
                skills = this.currentCharacter.skills.filter((s) => {
                    let skill = this.getSkill(s.skill)
                    return skill.type !== 'passive'
                })
            }

            return skills
        },
        selectedSkillIcon () {
            let iconPath = ''

            if (this.selectedSkill) {
                iconPath = 'icons/'

                switch(this.selectedSkill.skill.type) {
                    case "attack":
                        iconPath += 'damage_types/' + this.selectedSkill.skill.damage_type
                        break
                    default: 
                        iconPath += 'skills/' + this.selectedSkill.skill.type
                        break
                }

                iconPath += '.png'
            }

            return iconPath
        },
        selectedSkillText () {
            let text = ''

            if (this.selectedSkill) {
                switch(this.selectedSkill.skill.type) {
                    case "attack":
                        text = this.$t('interface.skills.damage') + ' ' + this.$t('damage_types.' + this.selectedSkill.skill.damage_type)
                        break
                    default: 
                        text = this.$t('interface.skills.' + this.selectedSkill.skill.type)
                        break
                }
            }

            return text
        }
    },
    methods: {
        apply () {
            if (!this.selectedTargetBefore) {
                this.selectedTargetBefore = JSON.parse(JSON.stringify(this.selectedTarget))
    
                if (this.selectedSkill.skill.type == 'attack') {
                    let newShield = this.selectedTarget.combat.shield - this.selectedSkillTargetRoll.damageTotal
    
                    if (newShield < 0) {
                        let newHealth = this.selectedTarget.combat.health.current - Math.abs(newShield)
    
                        if (newHealth < 0) {
                            newHealth = 0
                        }
    
                        this.selectedTarget.combat.shield = 0
                        this.selectedTarget.combat.health.current = newHealth
                    }
                    else {
                        this.selectedTarget.combat.shield -= this.selectedSkillTargetRoll.damageTotal
                    }
                }
                else if (this.selectedSkill.skill.type == 'heal') {
                    let newHealth = this.selectedTarget.combat.health.current + this.selectedSkillTargetRoll.damageTotal
                    let maxHealth = this.getCharacterTotalHealth(this.selectedTarget)
    
                    if (newHealth > maxHealth) {
                        newHealth = maxHealth
                    }
    
                    this.selectedTarget.combat.health.current = newHealth
                }
                else if (this.selectedSkill.skill.type == 'shield') {
                    this.selectedTarget.combat.shield += this.selectedSkillTargetRoll.damageTotal
                }
    
                if (this.selectedSkill.skill.mana) {
                    let newMana = this.currentCharacter.combat.mana.current - this.selectedSkill.skill.mana
    
                    if (newMana < 0) {
                        newMana = 0
                    }
    
                    this.currentCharacter.combat.mana.current = newMana
                }
            }

            this.currentStep = 'view-difference'
        },
        finish () {
            this.selectedTarget = null
            this.selectedTargetBefore = null
            this.selectedSkillTargetRoll = { 
                roll_bonus: 0, 
                defense_bonus: 0,
                type: 'normal',
                roll: null,
                result: null,
                totalRoll: null,
                totalDefense: null,
                damageText: null,
                damageTotal: 0,
                damageResitance: 0
            }

            if (this.currentSkillTarget < this.selectedSkill.skill.targets) {
                this.currentSkillTarget++
                this.currentStep = 'select-target'
            }
            else {
                this.currentSkillTarget = 1
                this.selectedSkill = null
                this.currentStep = 'select-skill'
            }
        },
        setCurrentInitiative (event) {
            this.currentInitiative = event.value
        },
        selectSkill (event) {
            if (event.skill.targets && (!event.skill.mana || event.skill.mana && event.skill.mana <= this.currentCharacter.combat.mana.current)) {
                this.selectedSkill = event
                this.currentStep = 'select-target'
            }
        },
        selectTarget (character) {
            this.selectedTarget = character
            this.currentStep = 'set-roll'
        },
        skillRoll () {
            let skillValue = null
            
            if (!this.selectedSkillTargetRoll.roll) {
                this.selectedSkillTargetRoll.roll =  this.rollD20(this.selectedSkillTargetRoll.type)
            }

            if (this.selectedSkill.value) {
                if (isNaN(this.selectedSkill.value)) {
                    let minMax = this.selectedSkill.value.split(' - ')
                    let min = parseInt(minMax[0])
                    let max = parseInt(minMax[1])
                    skillValue = Math.floor(Math.random() * (max - min + 1)) + min
                }
                else {
                    skillValue = this.selectedSkill.value
                }
            }

            this.selectedSkillTargetRoll.totalRoll = parseInt(this.selectedSkillTargetRoll.roll) + parseInt(this.selectedSkillTargetRoll.roll_bonus) + parseInt(this.getStatBonus(this.selectedTarget, this.selectedSkill.skill.statistic))
            
            if (this.selectedSkill.skill.type == 'attack') {
                this.selectedSkillTargetRoll.totalDefense = this.getCharacterDefense(this.selectedTarget) + parseInt(this.selectedSkillTargetRoll.defense_bonus)
                this.selectedSkillTargetRoll.result = this.rollResult(this.selectedSkillTargetRoll.roll, this.selectedSkillTargetRoll.totalRoll, this.selectedSkillTargetRoll.totalDefense)
            }
            else {
                this.selectedSkillTargetRoll.result = this.rollResult(this.selectedSkillTargetRoll.roll)
            }
            
            if (skillValue) {
                if (this.selectedSkill.skill.type == 'attack') {
                    this.selectedSkillTargetRoll.damageResistance = this.getResistanceByType(this.selectedTarget, this.selectedSkill.skill.damage_type)
                    this.selectedSkillTargetRoll.damageTotal -= this.selectedSkillTargetRoll.damageResistance
                }

                this.selectedSkillTargetRoll.damageTotal = parseInt(skillValue)
                this.selectedSkillTargetRoll.damageText = skillValue
                    
                if (this.selectedSkillTargetRoll.result == 'critical-success') {
                    let extraDamage = Math.floor(skillValue / 2)
                    if (extraDamage == 0) {
                        extraDamage = 1
                    }
                    this.selectedSkillTargetRoll.damageText += ' <span class="crit">+' + extraDamage + '</span>'
                    this.selectedSkillTargetRoll.damageTotal += extraDamage
                }
                else if (this.selectedSkillTargetRoll.result == 'critical-fail' || this.selectedSkillTargetRoll.result == 'fail') {
                    this.selectedSkillTargetRoll.damageTotal = 0
                    this.selectedSkillTargetRoll.damageText = 0
                }
            }

            this.currentStep = 'view-roll-results'
        },
        makeRoll (type = 'normal') {
            let baseRoll = this.rollD20()

            if (type == 'advantage') {
                let extraRoll = this.rollD20()

                if (extraRoll > baseRoll) {
                    baseRoll = extraRoll
                }
            }
            else if (type == 'disadvantage') {
                let extraRoll = this.rollD20()

                if (extraRoll < baseRoll) {
                    baseRoll = extraRoll
                }
            }

            return baseRoll
        },
        rollD20 () {
            return Math.floor(Math.random() * 20 + 1);
        },
        rollResult (baseRoll, roll = null, ca = null) {
            let result = 'miss'

            if (baseRoll == 20) {
                result = 'critical-success'
            }
            else if (baseRoll == 1) {
                result = 'critical-fail'
            }
            else if (!roll && !ca) {
                result = 'success'
            }
            else if (roll >= ca) {
                result = 'success'
            }
            else {
                result = 'fail'
            }

            return result
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.view {
    position: relative;
    justify-content: flex-start;
}

.combat-panel {
    padding-top: 40px;

    .character-panel {
        max-width: 1300px;
    }

    ::v-deep {
        .character-panel-body {
            padding: 0;
            justify-content: flex-start;
        }
    }

    .character-details {
        border-right: 1px solid rgba(255, 255, 255, 0.16);
        padding: 20px;
    }

    .title {
        text-align: center;
        font-size: 22px;
        margin-bottom: 20px;
    }

    .character-skills,
    .select-target,
    .roll-results,
    .set-roll,
    .view-difference {
        padding: 40px;
        height: 670px;
        overflow-y: scroll;
        width: calc(100% - 220px);
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.16) $black-light;
        

        &::-webkit-scrollbar {
            width: 8px;
            background: $black-light;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.16);
        }
    }

    .character-skills {
        padding: 0;

        > div {
            &:nth-child(even) {
                background-color: $black-dark;
            }
        }
    }

    .select-target {
        padding-left: 0;
        padding-right: 0;

        .characters{
            margin: 0;
            padding: 0 40px;
            width: 100%;

            &::before {
                background-image: linear-gradient(to right, $black-light, rgba(0, 0, 0, 0) 30%);
            }

            &::after {
                background-image: linear-gradient(to left, $black-light, rgba(0, 0, 0, 0) 30%);
            }
        }

        .buttons {
            padding: 0 40px;
        }
    }

    .roll-results {
        .title {
            margin: 0;
        }
        > div {
            &:not(:last-child) {
                margin-bottom: 40px;
            }
        }

        .skill-icon {
            width: 80px;
            height: auto;
            margin-bottom: 20px;
        }

        .title {
            font-size: 26px;
        }

        .rolls {
            > div:not(:last-child) {
                margin-bottom: 40px;
            }
        }

        .d20 {
            margin: 13px 5px 0;
        }

        .icon {
            width: 50px;
            height: auto;
        }

        .roll-data {
            padding-left: 20px;

            > div{
                &:not(:last-child) {
                    margin-bottom: 10px;
                }

                &.result {
                    border-top: 1px solid rgba(255, 255, 255, 0.16);
                    padding-top: 10px;
                }
            }

            span {
                font-size: 16px;
                font-weight: bold;
            }

            .result {
                span {
                    font-size: 24px;
                }
            }
        }

        .crit {
            color: $green;
        }

        .fail {
            color: $red;
        }
    }

    .set-roll {      
        .roll-modifiers {
            margin-left: 80px;

            > div {
                &:not(:last-child) {
                    margin-bottom: 20px;
                }

                label {
                    cursor: pointer;
                    height: 30px;
                }

                input[type="radio"] {
                    margin-right: 28px;
                }
            }
        }
    }

    .view-difference {
        > div {
            > div {
                &:not(:last-child) {
                    margin-right: 60px;
                }
            }
        }
    }
}

.element {
    margin-bottom: -20px;
    margin-top: 20px;
    margin-right: 5px;
}

.characters-container {
    padding-top: 0;
}

.characters {
    margin: 60px 0 0 0;
    position: relative;
    padding: 0 100px;
    width: calc(100% + 200px);
    align-items: center;

    &::before,
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 100%;
        background-image: linear-gradient(to right, $background-color, rgba(0, 0, 0, 0) 30%);
        content: "";
        z-index: 10;
    }

    &::after {
        left: unset;
        right: 0;
        background-image: linear-gradient(to left, $background-color, rgba(0, 0, 0, 0) 30%);
    }

    .swiper-wrapper {
        width: auto;
    }

    .swiper-slide {
        width: auto;
        cursor: pointer;

        > * {
            transform: scale(0.9);
            transition: all 0.3s linear;
            height: 100%;
            align-self: stretch;

            &:hover {
                transform: scale(1);
            }
        }
    }
}
</style>