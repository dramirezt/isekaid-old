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
                                    :src="'/icons/enemies/' + filterType + '.png'"
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
                                        :src="'/icons/enemies/' + type + '.png'"
                                        class="icon"
                                    >
                                    {{ $t('enemies.' + type )}}
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
            </div>
        </div>

        <div class="view-body">
            <div
                class="flex flex-justify-center flex-wrap character-list"
                ref="characterList"
            >
                <div 
                    v-for="(character, index) in enemySelectionList"
                    :key="'character-' + index"
                    class="flex flex-column flex-align-center character"
                    :class="{ 'active': character.selected_amount }"
                    v-show="character.display"
                >
                    <CharacterCardSimple
                        :character="character"
                        :direction="'vertical'"
                        @click="character.selected_amount += 1"
                    />
                    <div class="flex flex-align-center flex-space-between amount-selector">
                        <button
                            type="button"
                            class="btn-cta minus"
                            @click="character.selected_amount > 0 ? character.selected_amount -= 1 : character.selected_amount = 0"
                        >
                            <span>-</span>
                        </button>
                        <input 
                            type="number"
                            class="input-number"
                            min="0"
                            v-model="character.selected_amount"
                        >
                        <button
                            type="button"
                            class="btn-cta plus"
                            @click="character.selected_amount += 1"
                        >
                            <span>+</span>
                        </button>                            
                    </div>
                </div>
            </div>
        </div>

        <div class="view-footer">
            <div class="flex flex-space-between w-100">
                <button 
                    type="button" 
                    class="btn-cta" 
                    @click="$emit('back')"
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

<script>
import { mapState } from "vuex"

export default {
    data () {
        return {
            enemySelectionList: [],
            searchValue: null,
            filterType: null,
            showSelector: false,
            enemyTypes: ['enemy-regular', 'enemy-boss']
        }
    },
    computed: {
        ...mapState(["enemies", "classes"]),
        characterClasses () {
            return this.enemyTypes.sort((a, b) => {
                return this.$t('enemies.' + a) > this.$t('enemies.' + b) ? 1 : -1
            })
        }
    },
    methods: {
        finish () {
            let onlySelected = this.enemySelectionList.filter(e => {
                return e.selected_amount > 0
            })

            let selection = []

            onlySelected.forEach(e => {
                for (let i = 1; i <= e.selected_amount; i++) {
                    let enemy = JSON.parse(JSON.stringify(e))
                    //if (e.selected_amount > 1) {
                        enemy.enemy_copy = i
                    //}
                    delete(enemy.selected_amount)
                    selection.push(enemy)
                }
            })

            this.$emit("finish", { selected: selection })
        },
        removeAll () {
            this.enemySelectionList.forEach(e => {
                e.selected_amount = 0
            })
        },
        setFilterType (value) {
            this.filterType = value
            this.showSelector = false
        },
        characterMatchesFilters (character) {
            let name = this.$t('enemies.' + character.name).toLowerCase()

            let typeMatch = !this.filterType || character.type == this.filterType
            let nameMatch = !this.searchValue || name.indexOf(this.searchValue.toLowerCase()) > -1

            return nameMatch && typeMatch
        },
        setEnemySelectionList () {
            let list = JSON.parse(JSON.stringify(this.enemies))

            list.forEach(e => {
                e.selected_amount = 0
                e.display = true
            })

            list.sort((a, b) => {
                return this.$t('enemies.' + a.name) > this.$t('enemies.' + b.name) ? 1 : -1
            })

            this.enemySelectionList = list
        }
    },
    watch: {
        enemies: function () {
            this.setEnemySelectionList()
        },
        filterType: function () {
            this.enemySelectionList.forEach(e => {
                e.display = this.characterMatchesFilters(e)
            })
        },
        searchValue: function () {
            this.enemySelectionList.forEach(e => {
                e.display = this.characterMatchesFilters(e)
            })
        }
    },
    mounted () {
        this.setEnemySelectionList()
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.character {
    flex-basis: calc(20% - 10px);
    padding: 0 5px 10px;
    transform: scale(0.95);

    &.active {
        transform: scale(1);

        .character-card-simple {
            filter: grayscale(0);
        }
    }
}

.character-card-simple {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    height: 100%;
    justify-content: space-between;
    width: 100%;
    min-width: 300px;
    filter: grayscale(1);
}

.amount-selector {
    width: calc(100% - 60px);
    background-color: $black-dark;
    border: 1px solid $black-light;
    border-top: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;

    .btn-cta {
        font-size: 24px;
        width: 100%;
        max-width: 60px;
        padding: 0;
        border: 0;
        border-radius: 0;

        span {
            transition: all 0.3s linear;
            font-size: 36px;
            line-height: 36px;
            transform: scale(0.8);
        }

        &.minus {
            background-color: $red;
        }

        &.plus {
            background-color: $green;
        }

        &:hover {
            color: $white;

            span {
                transform: scale(1.2);
            }
        }
    }

    .input-number {
        margin-left: 0;
        border-radius: 0;
        width: 100%;
        border: 0;
        outline: none;
    }
}
</style>