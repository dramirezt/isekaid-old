<template>
    <div class="container">
        <div class="view-header">
            <div class="w-100 view-title">
                Tiradas de iniciativa
            </div>
        </div>
        <div class="view-body">
            <div class="flex flex-justify-end w-100">
                <div class="flex flex-align-center flex-space-between w-100 dice">
                    <D20 />
                    <span>+ Mod</span>
                </div>
            </div>
            <div 
                class="flex flex-align-center w-100 character-roll"
                v-for="(roll, index) in rolls"
                :key="'roll-' + index"
            >
                <CharacterCardExpandable
                    :character="roll.character"
                    :showStatus="false"
                    :isExpandable="false"
                    class="w-100"
                />
                <input 
                    type="number"
                    class="input-initiative"
                    v-model="rolls[index].roll"
                >
                <div class="flex flex-column text-center bonus">
                    <span>{{ getCharacterInitiative(roll.character) }}</span>
                </div>
            </div>
        </div>
        <div class="view-footer">
            <button type="button" class="btn-cta" @click="$emit('back')">
                {{ $t('interface.back') }}
            </button>
            <button type="button" class="btn-cta" @click="finish">
                {{ $t('interface.combat.start_combat') }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        characters: { type: Array, default: [] }
    },
    data () {
        return {
            rolls: []
        }
    },
    computed: {
        ...mapGetters(['getCharacterInitiative'])
    },
    methods: {
        finish () {
            let finalRolls = this.rolls
            finalRolls.forEach(r => {
                if (r.roll) {
                    r.roll = parseInt(r.roll)
                }
                else {
                    r.roll = Math.floor(Math.random() * 20 + 1)
                }

                //r.roll += parseInt(this.getCharacterInitiative(r.character))
            })
            this.$emit('finish', { initiativeRolls: finalRolls })
        },
        setup () {
            //this.rolls = []
            if (this.rolls.length) {
                Array.from(this.characters).forEach(c => {
                    let found = this.rolls.filter(r => {
                        if (c.id) {
                            return r.character.id == c.id
                        }
                        else {
                            return r.character.name == c.name && r.character.enemy_copy == c.enemy_copy
                        }
                    }).length > 0

                    if (!found) {
                        this.rolls.push({ character: c, roll: null })
                    }
                })
            }
            else {
                Array.from(this.characters).forEach(c => {
                    this.rolls.push({ character: c, roll: null })
                })
            }
        }
    },
    watch: {
        characters () {
            this.setup()
        }
    },
    mounted () {
        this.setup()
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.character-roll {
    &:not(:last-child) {
        margin-bottom: 30px;
    }
}

.dice {
    width: 125px;
    
    span {
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;
    }
}

.input-initiative {
    width: 80px;
    height: 60px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 10px;
    background-color: $black-light;
    margin-left: 60px;
    padding: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
}

.bonus {
    width: 50px;
    margin-left: 20px;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 1.2px;
}

.actions-container {
    margin-top: 60px;
}
</style>
