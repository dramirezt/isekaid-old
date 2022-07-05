<template>
    <div class="container">
        <div class="view-header">
            <div class="w-100 view-title">
                {{ $t("interface.combat.select_characters") }}
            </div>
        </div>

        <div class="flex flex-column flex-align-end view-options">
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
                                    @click="setFilterType(null)"
                                >
                                    {{ $t('interface.any') }}
                                </div>
                                <div 
                                    v-for="(type, index) in characterClasses"
                                    :key="'type-' + index"
                                    class="flex flex-align-center text-uppercase text-bold option"
                                    @click="setFilterType(type)"
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
            <div class="flex flex-align-center flex-justify-end">
                <button 
                    type="button"
                    class="btn-view-option"
                    @click="removeAll"
                >
                    {{ $t('interface.unselect_all') }}
                </button>
                <button 
                    type="button"
                    class="btn-view-option"
                    @click="addAll"
                >
                    {{ $t('interface.select_all') }}
                </button>
            </div>
        </div>

        <div class="view-body">
            <div
                class="flex flex-justify-center flex-wrap character-list"
                ref="characterList"
            >
                <div 
                    v-for="(character, index) in characterSelectionList"
                    :key="'character-' + index"
                    class="flex flex-justify-center character"
                    :class="{ 'active': character.selected }"
                    v-show="character.display"
                >
                    <CharacterCardSimple
                        :character="character"
                        :direction="'vertical'"
                        @click="character.selected = !character.selected"
                    />
                </div>
            </div>
        </div>

        <div class="view-footer">
            <div class="flex flex-justify-end w-100">
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

<script>
import { mapState } from "vuex"

export default {
    data () {
        return {
            characterSelectionList: [],
            searchValue: null,
            filterType: null,
            showSelector: false
        }
    },
    computed: {
        ...mapState(["characters", "classes"]),
        characterClasses () {
            return Object.keys(this.classes).sort((a, b) => {
                return this.$t('classes.' + a) > this.$t('classes.' + b) ? 1 : -1
            })
        }
    },
    methods: {
        addAll () {
            this.characterSelectionList.forEach(c => {
                c.selected = true
            })
        },
        characterMatchesFilters (character) {
            let name = character.name.toLowerCase()

            let typeMatch = !this.filterType || character.class == this.filterType
            let nameMatch = !this.searchValue || name.indexOf(this.searchValue.toLowerCase()) > -1

            return nameMatch && typeMatch
        },
        finish () {
            let onlySelected = this.characterSelectionList.filter(c => {
                return c.selected === true
            })

            let selected = []

            onlySelected.forEach(c => {
                let character = JSON.parse(JSON.stringify(c))

                delete(character.selected)
                delete(character.display)

                selected.push(character)
            })

            this.$emit("finish", { selected: selected })
        },
        removeAll () {
            this.characterSelectionList.forEach(c => {
                c.selected = false
            })
        },
        setFilterType (value) {
            this.filterType = value
            this.showSelector = false
        },
        setCharacterSelectionList () {
            let list = JSON.parse(JSON.stringify(this.characters))

            list.forEach(e => {
                e.selected = false
                e.display = true
            })

            list.sort((a, b) => {
                return a.name > b.name ? 1 : -1
            })

            this.characterSelectionList = list
        }
    },
    watch: {
        characters: function () {
            this.setCharacterSelectionList()
        },
        filterType: function () {
            this.characterSelectionList.forEach(c => {
                c.display = this.characterMatchesFilters(c)
            })
        },
        searchValue: function () {
            this.characterSelectionList.forEach(c => {
                c.display = this.characterMatchesFilters(c)
            })
        }
    },
    mounted () {
        this.setCharacterSelectionList()
    }
}
</script>

<style lang="scss" scoped>
.character {
    flex-basis: calc(20% - 10px);
    padding: 0 5px 10px;

    &.active {
        .character-card-simple {
            filter: grayscale(0);
            transform: scale(1);
        }
    }
}

.character-card-simple {
    transition: all 0.3s ease-in-out;
    transform: scale(0.95);
    filter: grayscale(1);
    cursor: pointer;
    height: 100%;
    justify-content: space-between;
    width: 100%;
    min-width: 300px;

    &:hover {
        filter: grayscale(0);
        transform: scale(1);
    }
}
</style>