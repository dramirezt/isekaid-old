<template>
    <div 
        class="flex flex-align-center margin-0 text-uppercase text-center w-100 text-outline character-name"
        :class="{ 
            'text-nowrap': wrapText, 
            'flex-space-between': character.enemy_copy
        }"
    >
        {{ name }}
        <span v-if="character.enemy_copy">
            #{{ character.enemy_copy }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        character: { type: Object, default: null },
        wrapText: { type: Boolean, default: true }
    },
    computed: {
        name () {
            let name = ''
            if (this.character.type == 'character') {
                name = this.character.name
            }
            else {
                name = this.$t('enemies.' + this.character.name)
            }

            return name
        }
    }
}
</script>

<style lang="scss" scoped>
.character-name {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;

    span {
        margin-left: 20px;
    }
}
</style>