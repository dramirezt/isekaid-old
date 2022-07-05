<template>
    <div class="view container">

        <div class="view-header">
            
            <div class="flex flex-column w-100">           
                <div class="flex flex-align-center flex-space-between">
                    <div class="view-title">
                        {{ $t('interface.enemies.enemies') }}
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
                                        :src="'icons/enemies/' + filterType + '.png'"
                                        class="icon"
                                        v-if="filterType"
                                    >
                                    <span v-if="filterType">
                                        {{ $t('enemies.' + filterType) }}
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
                                        v-for="(type, index) in enemyTypesByName"
                                        :key="'type-' + index"
                                        class="flex flex-align-center text-uppercase text-bold option"
                                        @click="setFilter(type)"
                                    >
                                        <img 
                                            :src="'icons/enemies/' + type + '.png'"
                                            class="icon"
                                        >
                                        {{ $t('enemies.' + type )}}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <div class="view-body">

            <div class="flex flex-wrap flex-justify-center">
                <CharacterCardSimple
                    v-for="(character, index) in filteredEnemies"
                    :key="'character-' + index"
                    :character="character"
                    :direction="'vertical'"
                    @click="characterDetails = character"
                />
            </div>
            
            <CharacterModal
                :character="characterDetails"
                @close="characterDetails = null"
            />
            
        </div>

    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data () {
        return {
            searchValue: null,
            filterType: null,
            showSelector: false,
            enemyTypes: ['enemy-regular', 'enemy-boss'],
            enemyList: [],
            characterDetails: null
        }
    },
    computed: {
        ...mapState(['enemies']),
        ...mapGetters(['getCharacterTotalHealth', 'getCharacterTotalMana']),
        filteredEnemies () {
            let list = JSON.parse(JSON.stringify(this.enemies))


            list = list.filter(e => {
                let typeMatch = true
                let nameMatch = true

                if (this.filterType) {
                    typeMatch = e.type == this.filterType
                }

                if (this.searchValue) {
                    let name = this.$t('enemies.' + e.name).toLowerCase()
                    nameMatch = name.indexOf(this.searchValue.toLowerCase()) > -1
                }
                
                return typeMatch && nameMatch
            })

            list.sort((a, b) => {
                return this.$t('enemies.' + a.name) > this.$t('enemies.' + b.name) ? 1 : -1
            })
            
            return list
        },
        enemyTypesByName () {
            return this.enemyTypes.sort((a, b) => {
                return this.$t('enemies.' + a) > this.$t('enemies.' + b) ? 1 : -1
            })
        }
    },
    watch: {
        enemies: function () {
            this.setEnemies()
        }
    },
    methods: {
        setFilter (value) {
            this.filterType = value
            this.showSelector = false
        },
        setEnemies () {
            this.enemyList = JSON.parse(JSON.stringify(this.enemies))
        }
    },
    mounted () {
        this.setEnemies()
    }
}
</script>

<style lang="scss" scoped>
.view-body {
    .character-card-simple {
        transition: all 0.3s ease-in-out;
        flex-basis: calc(100% / 5);
        transform: scale(0.95);
        align-self: stretch;
        cursor: pointer;

        &:hover {
            transform: scale(1);
        }

        .character-card-simple {
            height: 100%;
            justify-content: space-between;
        }
    }
}
</style>