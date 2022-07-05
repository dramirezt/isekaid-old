<template>
    <div class="flex flex-space-between" v-if="characters.length">
        <div class="flex-inline flex-column flex-align-start">
            <h2>
                Tarjetas personaje: CharacterCardExpandable
            </h2>
            <h3>Por defecto (con status, con estado):</h3>
            <CharacterCardExpandable
                :character="characters[0]"
            />
            <h3>Sin estado, expandible:</h3>
            <CharacterCardExpandable
                :character="characters[0]"
                :showStatus="false"
            />
            <h3>Con estado, no expandible</h3>
            <CharacterCardExpandable
                :character="characters[0]"
                :isExpandable="false"
            />
            <h3>Sin estado, no expandible</h3>
            <CharacterCardExpandable
                :character="characters[0]"
                :isExpandable="false"
                :showStatus="false"
            />
        </div>
        <div class="flex-inline flex-column flex-align-start">
            <h2>
                Tarjetas personaje: CharacterCardSimple
            </h2>
            <h3>Por defecto (con estado, vertical)</h3>
            <CharacterCardSimple
                :character="characters[0]"
            />
            <h3>Sin estado, vertical</h3>
            <CharacterCardSimple
                :character="characters[0]"
                :showStatus="false"
            />
            <h3>Con estado, horizontal</h3>
            <CharacterCardSimple
                :character="characters[0]"
                :direction="'horizontal'"
            />
            <h3>Sin estado, horizontal</h3>
            <CharacterCardSimple
                :character="characters[0]"
                :direction="'horizontal'"
                :showStatus="false"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['characters'])
    }    
}
</script>

<style lang="scss" scoped>

</style>