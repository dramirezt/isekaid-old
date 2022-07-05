<template>
    <div 
        class="flex flex-column flex-justify-center w-100 skill" 
        :class="{ 
            'clickable': clickable,
            'disabled': isDisabled
        }"
        v-if="skill"
        @click="handleClick"
    >
        <div class="flex flex-align-center w-100 skill-info">
            <CharacterSheetElement
                :element="{
                    icon: 'skills/' + skill.type + '.png',
                    text: skillType,
                    value: $t('skills.' + slug + '.name').toUpperCase()
                }"
            />
        </div>

        <div class="description" v-html="skill.description" />

        <div 
            class="flex flex-align-center flex-justify-center flex-wrap w-100 skill-details" 
            v-if="skill.type !== 'passive'"
        >
            <CharacterSheetElement
                v-for="(element, index) in skillDetails"
                :key="'element-' + index"
                :element="element"
                :id="element.id"
            />
        </div>
        <div class="flex flex-space-between flex-align-center flex-justify-start text-uppercase controls" v-if="level">
            <div class="flex flex-align-center">
                <button 
                    type="button"
                    class="btn-cta"
                    @click.stop="$emit('remove')"
                    v-if="deletable"
                >
                    {{ $t('interface.delete') }}
                </button>
            </div>
            <div class="flex flex-align-center level">
                <button 
                    type="button" 
                    class="btn-cta"
                    @click.stop="$emit('level-down', slug)"
                >
                    -
                </button>
                <span>
                    {{ $t('interface.skills.level') }} {{ level }}
                </span>
                <button 
                    type="button" 
                    class="btn-cta"
                    @click.stop="$emit('level-up', slug)"
                >
                    +
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        character: { type: Object, default: null },
        slug: { type: String, default: '' },
        level: { type: Number, default: null },
        simulateRoll: { type: Boolean, default: false },
        clickable: { type: Boolean, default: false },
        deletable: { type: Boolean, default: false }
    },
    data () {
        return {
            skill: null
        }
    },
    computed: {
        ...mapGetters(['getSkill', 'getStatBonus']),
        isDisabled () {
            return this.character && this.skill && this.skill.mana != undefined && this.skill.mana > this.character.combat.mana.current
        },
        skillDetails () {
            let elements = []

            if (this.skill.targets) {
                elements.push({
                    id: 'targets',
                    icon: 'skills/targets.png',
                    text: this.$t('interface.skills.targets'),
                    value: this.skill.targets,
                })
            }

            if (this.skill.range) {
                elements.push({
                    id: 'range',
                    icon: 'skills/range.png',
                    text: this.$t('interface.skills.range'),
                    value: this.skill.range
                })
            }
            
            if (this.skill.mana) {
                elements.push({
                    id: 'mana',
                    icon: 'combat/mana.png',
                    text: this.$t('interface.skills.mana_cost'),
                    value: this.skill.mana
                })
            }

            if (this.skill.type == 'attack') {
                elements.push({
                    id: 'damage_type',
                    icon: 'damage_types/' + this.skill.damage_type +'.png',
                    text: this.$t('interface.skills.damage') + ' ' + this.$t('damage_types.' + this.skill.damage_type),
                    value: this.skillValue
                })
            }

            const otherElements = ['shield', 'heal']

            if (this.skillValue && otherElements.indexOf(this.skill.type) > -1) {
                elements.push({
                    id: this.skill.type,
                    icon: 'skills/' + this.skill.type + '.png',
                    text: this.$t('interface.skills.' + this.skill.type),
                    value: this.skillValue
                })
            }

            return elements
        },
        skillType () {
            let text = this.$t('interface.skills.' + this.skill.type)
            if (this.skill.statistic) {
                text += ' - ' 
                //text += '<img src="/icons/statistics/' + this.skill.statistic + '.png" class="icon" />'
                text += this.$t('statistics.' + this.skill.statistic)
            }
            return text
        },
        skillValue () {
            let value = this.skill.type == 'attack' ? this.skill.damage : this.skill[this.skill.type]

            if (value !== undefined) {
                if (this.character) {
                    let skillStatistic = parseInt(this.getStatBonus(this.character, this.skill.statistic))
        
                    if (skillStatistic > 0) {
                        if (value == 0) {
                            value = skillStatistic
                        }
                        else if (value + 1 !== value + skillStatistic) {
                            value = (value + 1) + ' - ' + (value + skillStatistic)
                        }
                        else {
                            value += 1
                        }
                    }
                }
            }
            else {
                value = null
            }

            return value
        },
    },
    methods: {
        applyLevels () {
            if (this.skill.levels) {
                Object.keys(this.skill.levels).forEach(l => {
                    if ('level_' + this.level >= l) {
                        let skillLevel = this.skill.levels[l]

                        if (skillLevel.bonus) {
                            let bonusType = skillLevel.bonus.type
                            let bonusValue = skillLevel.bonus.value
                            switch (bonusType) {
                                case "description":
                                    this.skill.description += bonusValue
                                    break;
                                case "statistic":
                                    //this.skill[skillLevel.bonus.type] = skillLevel.bonus.value
                                    break;
                                case "type":
                                    this.skill.type = bonusValue
                                    break;
                                default:
                                    this.skill[bonusType] += bonusValue
                                    break
                            }
                        }
                    }
                })
            }
        },
        handleClick () {
            if (this.clickable) {
                if (this.simulateRoll) {
                    this.roll()
                }
                else {
                    this.$emit('click')
                }
            }
        },
        roll () {
            if (this.simulateRoll && this.skill.type !== 'passive') {
                this.$emit('select-skill', { skill: this.skill, value: this.skillValue })
            }
        },
        setDescription () {
            let description = this.$t('skills.' + this.slug + '.description')

            if (this.skill.levels && description.indexOf('[SKILLS]') > -1) {
                let skills = ''

                Object.keys(this.skill.levels).forEach(level => {
                    if (this.skill.levels[level].skills) {
                        this.skill.levels[level].skills.forEach((skill, key) => {
                            skills += '<li>' + this.$t('skills.' + skill + '.name') + '</li>'
                        })
                    }
                })
                
                description = description.replace('[SKILLS]', '<ul>' + skills + '</ul>')
            }

            if (this.character) {
                description = description.replaceAll('[STATISTIC]', parseInt(this.getStatBonus(this.character, this.skill.statistic)))
            }
            else if (this.skill.statistic) {
                description = description.replaceAll('[STATISTIC]', this.$t('statistics.' + this.skill.statistic))
            }

            if (this.skill.bonus) {
                description = description.replaceAll('[BONUS]', this.skill.bonus)
            }

            if (this.skill.range) {
                description = description.replaceAll('[RANGE]', this.skill.range)
            }

            if (this.skill.damage_type) {
                description = description.replaceAll(['[DAMAGE_TYPE]'], this.$t('damage_types.' + this.skill.damage_type))
            }


            let skillReplaceStart = description.indexOf('[SKILL_')

            while (skillReplaceStart > -1) {
                let skillReplaceEnd = description.indexOf(']', skillReplaceStart)
                let skillTag = description.substr(skillReplaceStart, skillReplaceEnd - skillReplaceStart + 1)
                let skillName = skillTag.replace('[SKILL_', '').replace(']', '')

                description = description.replaceAll(skillTag, this.$t('skills.' + skillName.toLowerCase() + '.name').toUpperCase())
                
                skillReplaceStart = description.indexOf('[SKILL_')
            }

            this.skill.description = description
        },
        setSkill () {
            this.skill = JSON.parse(JSON.stringify(this.getSkill(this.slug)))
            this.applyLevels()
            this.setDescription()
        }
    },
    watch: {
        level () {
            this.setSkill()
        },
        slug () {
            this.setSkill()
        }
    },
    mounted () {
        this.setSkill()
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.skill {
    padding: 15px 20px;

    &.clickable {
        cursor: pointer;
    }

    &.disabled {
        opacity: 0.5;
    }

    .skill-info {
        .element {
            margin: 0;
            width: 100%;
            justify-content: flex-start;

            ::v-deep {
                > div:first-child {
                    width: auto;
                }
            }
        }
    }

    /*.icon {
        width: 50px;
        height: auto;
        margin-right: 20px;
        align-self: flex-start;
    }

    .name {
        font-size: 22px;
    }*/

    .controls {
        margin-top: 10px;
        margin-bottom: 5px;

        .type {
            display: none;
        }

        .btn-cta {
            height: 30px;
            padding: 0 10px;
            font-size: 14px;
            margin: 0;
            border-radius: 5px;
        }
    }

    .level {
        font-size: 14px;
        font-weight: bold;

        .btn-cta {
            width: 25px;
            height: 25px;
            padding: 0;
            border-radius: 5px;
        }

        span {
            margin: 0 10px;
        }
    }

    .statistic {
        font-size: 10px;
        //padding-left: 65px;
        font-weight: bold;
        letter-spacing: 1.3px;

        .icon {
            width: 20px;
            margin-right: 5px;
        }
    }

    .description {
        margin-top: 10px;
        font-size: 14px;
        line-height: 1.8em;
        padding-left: 65px;
    }

    .skill-details {
        margin-top: 30px;
        margin-bottom: 20px;

        .element {
            flex-basis: calc(100% / 5);
        }
    }
}

@media only screen and (max-width: 767px) {
    .skill {
        .skill-info {
            flex-direction: column;

            .element {
                order: 2;

                ::v-deep {
                    .card-value {
                        font-size: 18px;
                    }
                }
            }

            .level {
                order: 1;
                width: 100%;
            }
        }
        .description {
            padding-left: 0;
        }
    }
}

@media only print {
    .skill {
        width: 2.5in;
        height: 3.5in;
        background-color: $black-light !important;
        justify-content: flex-start;
        padding: 15px 20px;

        .element {
            min-height: unset;
            min-width: unset;

            ::v-deep {
                > div {
                    width: auto;
                }

                .card-value {
                    font-size: 12px;
                }

                .card-icon {
                    width: 20px;
                    height: 20px;
                }
            }
        }

        .skill-info {
            .element {
                flex-direction: column;

                ::v-deep {
                    .card-icon {
                        margin: 0;
                    }

                    .card-data {
                        margin-top: 10px;
                        padding-left: 0;
                        text-align: center;

                        > div {
                            justify-content: center;
                        }

                        .card-text {
                            order: 2;
                            font-size: 6px;
                            margin: 5px 0 0;
                        }
                    }

                    .card-icon {
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }

        .skill-details {
            margin: 10px 0 0;

            .element {
                margin: 0 0 10px;
                flex-basis: calc(100% / 3);
                min-width: unset;
                min-height: unset;

                ::v-deep {
                    .card-text {
                        display: none;
                    }
                }
            }
        }

        .description {
            height: 100%;
            font-size: 10px;
            margin: 0;
            padding: 15px 0;
            line-height: 1.4em;  
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;

            ::v-deep {
                p {
                    margin-top: 0;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                ul {
                    margin: 0;
                    padding-left: 20px;
                    text-align: left;

                    li {
                        padding-left: 5px;
                    }
                }
            }
        }

        .controls {
            width: 100%;
            margin: 10px 0 0;
            justify-content: space-between;
            align-self: flex-end;
            width: 100%;

            .level {
                display: flex;
                justify-content: flex-end;
                font-size: 6px;
                width: 100%;

                .type {
                    display: block;
                }

                span {
                    margin: 0;
                }
            }
            
            .btn-cta {
                display: none;
            }
        }
    }

    #shield,
    #heal {
        display: none;
    }

    #damage_type {
        flex-basis: 100%;

        ::v-deep {
            .card-text {
                display: block;
            }

            .card-value {
                display: none;
            }
        }
    }
}
</style>