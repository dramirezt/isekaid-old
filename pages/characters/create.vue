<template>
    <div class="view container">

        <div class="view-header">
            <div class="w-100 view-title">
                {{ $t('interface.characters.create_character') }}
            </div>
        </div>

        <!--<transition-group name="fade" tag="div" class="w-100"> -->
            <enter-name 
                :key="'enter-name'"
                v-show="currentStep == 1"
                @next="enterName($event)"
            />
            
            <select-class 
                :key="'select-class'"
                v-show="currentStep == 2"
                @back="currentStep = 1"
                @next="selectClass($event)"
            />
        <!--</transition-group>-->

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            currentStep: 1,
            newCharacter: {}
        }
    },
    computed: {
        ...mapState(['classes'])
    },
    methods: {
        enterName (event) {
            this.currentStep = 2
            this.newCharacter.name = event.name
        },
        selectClass (className) {
            this.newCharacter.class = className

            Object.keys(this.classes[className]).forEach(key => {
                this.newCharacter[key] = JSON.parse(JSON.stringify(this.classes[className][key]))
            })
                        
            this.$store.dispatch("createCharacter", this.newCharacter).then(
                () => {
                    this.$router.push(this.localePath({ name: 'characters' }))
                }
            )
            
        }
    },
    mounted () {
        this.newCharacter = {}
    }
}
</script>

<style lang="scss" scoped>
.view-header {
    margin-bottom: 100px;
}
</style>