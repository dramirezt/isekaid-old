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
                    text: this.$t('damage_types.water'),
                    icon: 'damage_types/water.png', 
                    value: this.getResistanceByType(this.character, "water")
                },
                { 
                    text: this.$t('damage_types.fire'),
                    icon: 'damage_types/fire.png', 
                    value: this.getResistanceByType(this.character, "fire")
                },
                { 
                    text: this.$t('damage_types.ice'),
                    icon: 'damage_types/ice.png', 
                    value: this.getResistanceByType(this.character, "ice")
                },
                { 
                    text: this.$t('damage_types.lightning'),
                    icon: 'damage_types/lightning.png', 
                    value: this.getResistanceByType(this.character, "lightning")
                },
                { 
                    text: this.$t('damage_types.earth'),
                    icon: 'damage_types/earth.png', 
                    value: this.getResistanceByType(this.character, "earth")
                },
                { 
                    text: this.$t('damage_types.wind'),
                    icon: 'damage_types/wind.png', 
                    value: this.getResistanceByType(this.character, "wind")
                },
                { 
                    text: this.$t('damage_types.demonic'),
                    icon: 'damage_types/demonic.png', 
                    value: this.getResistanceByType(this.character, "demonic")
                },
                { 
                    text: this.$t('damage_types.magical'),
                    icon: 'damage_types/magical.png', 
                    value: this.getResistanceByType(this.character, "magical")
                },
                { 
                    text: this.$t('damage_types.holy'),
                    icon: 'damage_types/holy.png', 
                    value: this.getResistanceByType(this.character, "holy")
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>