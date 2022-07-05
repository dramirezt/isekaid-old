<template>
    <div class="view container">

        <div class="view-header">

            <div class="flex flex-column w-100">           
                <div class="flex flex-align-center flex-space-between">
                    <div class="view-title">
                        {{ $t('interface.skills.skills') }}
                    </div>
                </div>

                <div class="flex flex-align-center view-actions">

                    <div class="flex flex-align-center flex-justify-end w-100 filters">

                        <span class="text-bold text-uppercase">
                            {{ $t('interface.filter_by') }}:
                        </span>

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
                                        :src="'icons/skills/' + filterType + '.png'"
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
                                            :src="'icons/skills/' + type + '.png'"
                                            class="icon"
                                        >
                                        {{ $t('interface.skills.' + type )}}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <div class="view-body">
            <Skill
                v-for="(skill, index) in filteredSkills"
                :key="'skill-' + index"
                :slug="skill.name"
                :level="1"
                @level-down="levelSkill($event, -1)"
                @level-up="levelSkill($event, 1)"
            />
            <!--<Skill
                v-for="(skill, index) in filteredSkills"
                :key="'skill2-' + index"
                :slug="skill.name"
                :level="2"
                @level-down="levelSkill($event, -1)"
                @level-up="levelSkill($event, 1)"
            />
            <Skill
                v-for="(skill, index) in filteredSkills"
                :key="'skill3-' + index"
                :slug="skill.name"
                :level="3"
                @level-down="levelSkill($event, -1)"
                @level-up="levelSkill($event, 1)"
            />-->
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

.skill {
    background-color: $black-light;
    max-width: 1300px;
    margin-bottom: 40px;
    border-radius: 10px;

    &:nth-child(even) {
        background-color: $black-dark;
    }
}

@media only print {
    .view-header {
        display: none;
    }

    .view-body {
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .skill {
        margin: 0 10px 10px;
        
        &:nth-child(10n) {
            //page-break-before: always;
        }
    }
}
</style>