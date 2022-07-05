<template>
    <div class="flex flex-column skill-selector">
        <div class="flex flex-align-center flex-justify-end filters">
            <input 
                type="text" 
                class="search-box" 
                placeholder="Nombre" 
                v-model="searchValue" 
            />

            <div class="selector-expandable">
                <div class="selector">

                    <button 
                        type="button" 
                        class="btn-cta" 
                        :class="{ 'active': showSelector }"
                        @click="showSelector = !showSelector"
                    >
                        {{ $t('interface.type') }}:
                        <img 
                            :src="'/icons/skills/' + filterType + '.png'"
                            class="icon"
                            v-if="filterType"
                        >
                        <span v-if="filterType">
                            {{ $t('interface.skills.' + filterType) }}
                        </span>
                        <span v-else>
                            {{ $t('interface.any') }}
                        </span>
                    </button>

                    <div class="options" v-show="showSelector">
                        <div
                            class="flex flex-align-center text-uppercase text-bold option"
                            @click="setFilter(null)"
                        >
                            {{ $t('interface.any') }}
                        </div>
                        <div 
                            v-for="(type, index) in skillTypesByName"
                            :key="'type-' + index"
                            class="flex flex-align-center text-uppercase text-bold option"
                            @click="setFilter(type)"
                        >
                            <img 
                                :src="'/icons/skills/' + type + '.png'"
                                class="icon"
                            >
                            {{ $t('interface.skills.' + type )}}
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="flex flex-column skills">
            <Skill
                v-for="(skill, index) in filteredSkills"
                :key="'skill-' + index"
                :slug="skill.name"
                :level="skill.level"
                :clickable="true"
                @level-down="levelSkill($event, -1)"
                @level-up="levelSkill($event, 1)"
                @click="$emit('select-skill', { skill: skill.name, level: skill.level })"
            />
        </div>
    </div>    
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            searchValue: '',
            filterType: null,
            showSelector: false,
            skillTypes: ['passive', 'attack', 'heal', 'shield', 'action', 'free-action', 'unique'],
            skillList: []
        }
    },
    computed: {
        ...mapState(['skills']),
        filteredSkills () {
            let list = this.skillList

            list = list.filter(s => {
                let matchName = true
                let matchType = true

                if (this.filterType) {
                    matchType = s.type == this.filterType
                }

                if (this.searchValue) {
                    let name = this.$t('skills.' + s.name + '.name').toLowerCase()
                    matchName = name.indexOf(this.searchValue.toLowerCase()) > -1
                }

                return matchName && matchType
            })

            list.sort((a, b) => {
                return this.$t('skills.' + a.name + '.name') > this.$t('skills.' + b.name + '.name')
            })

            return list;
        },
        skillTypesByName () {
            return this.skillTypes.sort((a, b) => {
                return this.$t('interface.skills.' + a) > this.$t('interface.skills.' + b) ? 1 : -1
            })
        }
    },
    watch: {
        skills: function () {
            this.setSkills()
        }
    },
    methods: {
        levelSkill (event, increment) {
            let skillSlug = event

            let skill = this.skillList.filter(s => {
                return s.name == skillSlug
            })[0]
            
            let skillIndex = this.skillList.indexOf(skill)
            if ((increment < 0 && skill.level > 1) || (increment > 0 && skill.level < 3)) {
                skill = JSON.parse(JSON.stringify(skill))
                skill.level += increment
                this.$set(this.skillList, skillIndex, skill)
            }
        },
        setFilter (value) {
            this.filterType = value
            this.showSelector = false
        },
        setSkills () {
            this.skillList = JSON.parse(JSON.stringify(this.skills))

            this.skillList.forEach(s => {
                s.level = 1
            });
        }
    },
    mounted () {
        this.setSkills()
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.filters {
    margin: 30px 0 50px;

    .search-box {
        margin-left: 0;
    }
}

.skills {
    min-height: 650px;
}

.skill {
    background-color: $black-light;
    margin-bottom: 40px;
    border-radius: 10px;

    &:nth-child(even) {
        background-color: $black-dark;
    }
}
</style>