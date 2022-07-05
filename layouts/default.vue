<template>
    <div class="layout w-100">
        <nav class="flex flex-align-center w-100 navbar">
            <nuxt-link 
                v-for="(option, index) in menu"
                :key="'option-' + index"
                class="btn-cta"
                :class="{ 'active': $route.name.indexOf(option.route.name) > -1 }"
                :to="localePath(option.route)"
            >
                {{ $t(option.text) }}
            </nuxt-link>
        </nav>

        <div class="page">
            <nuxt />
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menu: [
                { text: 'interface.combat.start_combat', route: { name: 'combat' } },
                { text: 'interface.characters.characters', route: { name: 'characters' } },
                { text: 'interface.enemies.enemies', route: { name: 'enemies' } },
                { text: 'interface.skills.skills', route: { name: 'skills' } },
            ]
        }
    },
    mounted () {
        if (localStorage.characters) {
            try {
                this.$store.commit('setCharacters', JSON.parse(localStorage.characters))
            } catch (e) {
                localStorage.removeItem('characters')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 60px;
    border-bottom: 1px solid #212327;

    a {
        border: 0;
        border-radius: 0;
    }
}

@media only print {
    .navbar {
        display: none;
    }
}
</style>