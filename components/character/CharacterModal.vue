<template>
    <div class="flex flex-justify-center flex-align-start character-modal" v-if="character">
        <div class="w-100 h-100 overlay" @click="$emit('close')" />
        <div class="container w-100">
            <CharacterSheet 
                :character="character" 
                @close="$emit('close')"
            />
        </div>
    </div>
</template>

<script>

export default {
    props: {
        display: { type: Boolean, default: false },
        character: { type: Object, default: null }
    },
    watch: {
        character () {
            document.getElementsByClassName('page')[0].style.overflow = this.character ? 'hidden' : null
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.character-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    overflow: auto;
    
    scrollbar-width: thin;
    scrollbar-color: $black-light $background-color;
    

    &::-webkit-scrollbar {
        width: 8px;
        background: $background-color;
    }

    &::-webkit-scrollbar-thumb {
        background: $black-light;
    }

    .overlay {
        position: fixed;
        left: 0;
        top: 0;
        background-color: $background-color;
        opacity: 0.9;
        z-index: 1;
        width: calc(100% - 8px);
    }

    .container {
        position: relative;
        z-index: 2;
    }
}
</style>
