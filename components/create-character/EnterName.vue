<template>
    <div class="w-100">
        <div class="view-body">
            <div 
                class="flex flex-column flex-align-center"
            >
                <div class="flex flex-justify-center text-uppercase text-bold w-100 title">
                    {{ $t('interface.create_characters.enter_your_name') }}
                </div>

                <input 
                    type="text" 
                    class="w-100 text-center character-name" 
                    maxlength="20"
                    v-model="playerName"
                >
            </div>
        </div>

        <div class="view-footer">
            <div class="flex flex-space-between w-100">
                <nuxt-link :to="localePath({ name: 'characters' })" class="btn-cta">
                    {{ $t('interface.back') }}
                </nuxt-link>

                <button type="button" class="btn-cta" @click="$emit('next', { name: playerName })">
                    {{ $t('interface.next')}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            playerName: null
        }
    }
}
</script>

<style lang="scss" scoped>

.title {
    font-size: 30px;
    margin-bottom: 30px;
}

.character-name {
    max-width: 22em;
}

</style>