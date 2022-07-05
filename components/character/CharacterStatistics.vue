<template>
    <div 
        class="flex flex-justify-center view-container view-stats"
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
export default {
    props: {
        active: { type: Boolean, default: true },
        character: { type: Object, default: null },
        maxRowElements: { type: Number, default: 3 }
    },
    computed: {
        elements() {
            return [
                {
                    text: this.$t('statistics.strength'),
                    icon: 'statistics/strength.png', 
                    value: this.character.statistics.strength
                },
                { 
                    text: this.$t('statistics.dexterity'),
                    icon: 'statistics/dexterity.png', 
                    value: this.character.statistics.dexterity
                },
                { 
                    text: this.$t('statistics.constitution'),
                    icon: 'statistics/constitution.png', 
                    value: this.character.statistics.constitution
                },
                { 
                    text: this.$t('statistics.magic'),
                    icon: 'statistics/magic.png', 
                    value: this.character.statistics.magic
                },
                { 
                    text: this.$t('statistics.faith'),
                    icon: 'statistics/faith.png', 
                    value: this.character.statistics.faith
                },
                { 
                    text: this.$t('statistics.mana'),
                    icon: 'statistics/mana.png', 
                    value: this.character.statistics.mana
                }
            ]
        },
    },
    mounted () {
        this.$el.style.maxWidth = (180 * this.maxRowElements + 40) + 'px'
    }
}
</script>

<style lang="scss" scoped>

</style>