<template>
    <div class="view">
        <transition-group name="fade" tag="div" class="flex flex-justify-center w-100">
            <CharacterSelector 
                key="view-select-characters"
                @finish="selectEnemies($event)"
                v-show="currentStep == 'select-characters'"
            />

            <EnemySelector
                key="view-select-enemies"
                @back="currentStep = 'select-characters'"
                @finish="generateCharacterInitiatives($event)"
                v-show="currentStep == 'select-enemies'"
            />

            <InitiativeGenerator
                key="view-character-initiatives"
                :characters="combatParticipants"
                @back="currentStep = 'select-enemies'"
                @finish="generateInitiativeBar($event)"
                v-show="currentStep == 'generate-character-initiatives'"
            />

            <CombatView
                key="view-combat"
                :initiativeRolls="initiativeRolls"
                @back="currentStep = 'generate-character-initiatives'"
                v-show="currentStep == 'combat'"
            />
        </transition-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            currentStep: "select-characters",
            selectedCharacters: [],
            selectedEnemies: [],
            initiativeRolls: []
        }
    },
    computed: {
        combatParticipants () {
            return this.selectedCharacters.concat(this.selectedEnemies)
        }
    },
    methods: {
        selectEnemies (event) {
            this.selectedCharacters = Array.from(event.selected)
            this.currentStep = "select-enemies"
        },
        generateCharacterInitiatives (event) {
            this.selectedEnemies = Array.from(event.selected)
            this.currentStep = "generate-character-initiatives"
        },
        generateInitiativeBar (event) {
            this.initiativeRolls = event.initiativeRolls
            this.currentStep = "combat"
        }
    }
}
</script>

<style lang="scss" scoped>
/*.combat-view {
    > div {
        width: 100%;
        display: flex;
        justify-content: center;
    }
}*/
</style>