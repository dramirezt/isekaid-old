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
        character: { type: Object, default: null }
    },
    computed: {
        ...mapGetters(["getResistanceByType"]),
        elements() {
            return [
                { 
                    text: this.$t('damage_types.blunt'),
                    icon: 'damage_types/blunt.png', 
                    value: this.getResistanceByType(this.character, "blunt")
                },
                { 
                    text: this.$t('damage_types.cut'),
                    icon: 'damage_types/cut.png', 
                    value: this.getResistanceByType(this.character, "cut")
                },
                { 
                    text: this.$t('damage_types.pierce'),
                    icon: 'damage_types/pierce.png', 
                    value: this.getResistanceByType(this.character, "pierce")
                },
                { 
                    text: this.$t('damage_types.bleed'),
                    icon: 'damage_types/bleed.png', 
                    value: this.getResistanceByType(this.character, "bleed")
                },
                { 
                    text: this.$t('damage_types.poison'),
                    icon: 'damage_types/poison.png', 
                    value: this.getResistanceByType(this.character, "poison")
                }
            ]
        },
    }
}
</script>

<style lang="scss" scoped>

</style>