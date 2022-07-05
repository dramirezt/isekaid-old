<template>
    <div 
        class="flex flex-justify-center view-container view-combat"
        :class="[
            { 'active': active}
        ]"
    >   
        <CharacterSheetElement
            v-for="(element, index) in elements"
            :key="'element-' + index"
            :element="element"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        active: { type: Boolean, default: true },
        character: { type: Object, default: null },
        maxRowElements: { type: Number, default: 3 }
    },
    computed: {
        ...mapGetters(["getCharacterInitiative", "getCharacterDefense", "getCharacterSpeed", "getSavingRollByType"]),
        elements() {
            return [
                { 
                    text: this.$t('combat.defense'),
                    icon: 'combat/defense.png', 
                    value: this.getCharacterDefense(this.character)
                },
                { 
                    text: this.$t('combat.initiative'),
                    icon: 'combat/initiative.png', 
                    value: this.getCharacterInitiative(this.character)
                },
                { 
                    text: this.$t('combat.speed'),
                    icon: 'combat/speed.png', 
                    value: this.getCharacterSpeed(this.character)
                },
                /*{ 
                    text: 'savings.fortitude',
                    icon: 'savings/fortitude.png', 
                    value: this.getSavingRollByType(this.character, "fortitude")
                },
                { 
                    text: 'savings.reflexes',
                    icon: 'savings/reflexes.png', 
                    value: this.getSavingRollByType(this.character, "reflexes")
                },
                { 
                    text: 'savings.will',
                    icon: 'savings/will.png', 
                    value: this.getSavingRollByType(this.character, "will")
                }*/
            ]
        }
    },
    mounted () {
        this.$el.style.maxWidth = (180 * this.maxRowElements + 40) + 'px'
    }
}
</script>

<style lang="scss" scoped>

</style>