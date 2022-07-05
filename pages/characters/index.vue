<template>
    <div class="view container">

        <div class="view-header">
            
            <div class="flex flex-column w-100">
                <div class="flex flex-align-center flex-space-between">
                    <div class="view-title">
                        {{ $t('interface.characters.characters') }}
                    </div>
                    
                    <div class="buttons">
                        <nuxt-link :to="localePath({ name: 'characters-create' })" class="btn-cta">
                            {{ $t('interface.characters.create_character') }}
                        </nuxt-link>
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
                                        :src="'/icons/classes/' + filterType + '.png'"
                                        class="icon"
                                        v-if="filterType"
                                    >
                                    <span v-if="filterType">
                                        {{ $t('classes.' + filterType) }}
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
                                        v-for="(type, index) in characterClasses"
                                        :key="'type-' + index"
                                        class="flex flex-align-center text-uppercase text-bold option"
                                        @click="setFilter(type)"
                                    >
                                        <img 
                                            :src="'/icons/classes/' + type + '.png'"
                                            class="icon"
                                        >
                                        {{ $t('classes.' + type )}}
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
                    v-for="(character, index) in filteredCharacters"
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
            characterDetails: null,
            characterList: []
        }
    },
    computed: {
        ...mapState(['classes', 'characters']),
        ...mapGetters(['getCharacterTotalHealth', 'getCharacterTotalMana']),
        characterClasses () {
            return Object.keys(this.classes).sort((a, b) => {
                return this.$t('classes.' + a) > this.$t('classes.' + b) ? 1 : -1
            })
        },
        filteredCharacters () {
            let list = this.characterList

            list = list.filter(c => {
                let classMatch = true
                let nameMatch = true

                if (this.searchValue) {
                    let name = c.name.toLowerCase()
                    nameMatch = name.indexOf(this.searchValue.toLowerCase()) > -1
                }

                if (this.filterType) {
                    classMatch = c.class == this.filterType
                }

                return  classMatch && nameMatch
            })

            list.sort((a, b) => {
                return a.name > b.name ? 1 : -1
            })

            return list
        }
    },
    watch: {
        characters: function () {
            this.setCharacters()
        }
    },
    methods: {
        setFilter (value) {
            this.filterType = value
            this.showSelector = false
        },
        setCharacters () {
            this.characterList = JSON.parse(JSON.stringify(this.characters))
        }
    },
    mounted () {
        this.setCharacters()
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