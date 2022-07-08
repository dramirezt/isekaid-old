<template>
    <div class="flex flex-column w-100">
        <div class="flex flex-align-center flex-space-between container">
            <div class="w-50">
                <button type="button" class="btn-cta" @click="previousCharacter()">
                    Anterior
                </button>
            </div>
            <div class="view-title flex-justify-center w-100">
                Turno {{ currentTurn }}
            </div>
            <div class="flex flex-justify-end w-50">
                <button type="button" class="btn-cta" @click="nextCharacter()">
                    Siguiente
                </button>
            </div>
        </div>

        <div 
            class="flex flex-align-start flex-justify-between w-100 initiative-bar-container"
            :class="[direction]"
        >
            <div 
                class="flex-inline w-100 initiative-display"
                ref="initiativeBar"
            >
                <div 
                    class="flex flex-align-start w-100 initiative-turn"
                    :class="{
                        'flex-column': direction == 'vertical' 
                    }"
                    ref="initiativeList"
                >
                    <CharacterInitiative 
                        v-for="(initiative, index) in initiativeOrder"
                        :character="initiative.character"
                        :initiative="initiative.roll"
                        :direction="initiativeCardDirection"
                        :key="'initiative-' + index"
                        :class="{
                            'post': currentIndex > index
                        }"
                        :forceDisplayInfo="index == currentIndex && currentDisplayInfo"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    props: {
        initiativeRolls: { type: Array, default: [] },
        direction: { type: String, default: 'horizontal' },
        currentInitiative: { type: Number, default: 0 }
    },
    data () {
        return {
            initiativeOrder: [],
            currentIndex: 0,
            currentTurn: 1,
            currentDisplayInfo: true,
            preventMovement: false
        }
    },
    computed: {
        ...mapState(["characters"]),
        ...mapGetters(["getCharacterInitiative"]),
        initiativeCardDirection () {
            return this.direction == 'horizontal' ? 'vertical' : 'horizontal'
        }
    },
    methods: {
        setupInitiatives () {
            let list = Array.from(this.$refs.initiativeList.children)
            list.forEach((c, index) => {
                c.style = null
                c.style.zIndex = (this.initiativeOrder.length - index)
                if (this.direction == 'horizontal') {
                    if (index > 0) {
                        c.style.left = "calc(10% - (60px * " + index + "))"
                    } 
                    else {
                        c.style.left = "50%";
                    }
                }
                else if (this.direction == 'vertical') {
                    if (index > 0) {
                        c.style.top = "calc(40% + (100px * " + index + "))"
                    }
                    else {
                        c.style.top = "5%"
                    }
                }
            })
        },
        nextCharacter () {
            if (!this.preventMovement) {
                this.preventMovement = true
                
                if ((this.currentIndex + 1) < this.initiativeOrder.length) {
                    Array.from(this.$refs.initiativeList.children).forEach((c, index) => {
                        if (this.direction == 'horizontal') {
                            if (index == this.currentIndex) {
                                c.style.left = "90%"
                                c.style.zIndex = this.currentIndex
                            }
                            else if (index == this.currentIndex + 1) {
                                c.style.left = "50%"
                            }
                            else {
                                c.style.left = "calc(60px + " + c.style.left + ")"
                            }
                        }
                        else if (this.direction == 'vertical') {
                            if (index == this.currentIndex) {
                                c.style.top = "-100%";
                                c.style.zIndex = this.currentIndex
                            }
                            else if (index == this.currentIndex + 1) {
                                c.style.top = "5%"
                            }
                            else if (index > this.currentIndex) {
                                c.style.top = "calc(" + c.style.top + " - 100px)"
                            }
                        }
                    })
                    setTimeout(() => {
                        this.currentIndex += 1
                    }, 200)
                }
                else {
                    this.setupInitiatives()
                    this.currentIndex = 0
                    this.currentTurn += 1
                }
            }
        },
        previousCharacter () {
            if (!this.preventMovement) {
                this.preventMovement = true

                if (this.currentIndex > 0) {
                    Array.from(this.$refs.initiativeList.children).forEach((c, index) => {
                        if (this.direction == 'horizontal') {
                            if (index == this.currentIndex) {
                                c.style.left = "10%"
                            }
                            else if (index == this.currentIndex - 1) {
                                c.style.left = "50%"
                            }
                            else {
                                c.style.left = "calc(" + c.style.left + " - 60px)"
                            }
                        }
                        else if (this.direction == 'vertical') {

                        }
                    })
                    setTimeout(() => {
                        this.currentIndex -= 1
                    }, 200)
                }
                else if (this.currentTurn > 1) {
                    this.currentIndex = this.initiativeRolls.length - 1
                    this.currentTurn -= 1

                    Array.from(this.$refs.initiativeList.children).forEach((c, index) => {
                        if(this.direction == 'horizontal') {
                            if (index == this.currentIndex) {
                                c.style.left = "50%"
                            }
                            else {
                                c.style.left = "calc(90% + (60px * " + (this.currentIndex - index) + "))"
                            }
                        }
                        else if (this.direction == 'vertical') {

                        }
                    })
                }
                else {
                    this.preventMovement = false
                }
            }
        },
        randomInitiative () {
            let turnInitiatives = []

            Array.from(this.characters).forEach(c => {
                let initiativeRoll = Math.floor(Math.random()*20) + parseInt(this.getCharacterInitiative(c))
                turnInitiatives.push({ character: c, roll: initiativeRoll })
            })

            this.updateInitiatives(turnInitiatives)
        },
        sortInitiative (rolls) {
            return rolls.sort((a, b) => {
                let aRoll = a.roll + parseInt(this.getCharacterInitiative(a.character))
                let bRoll = b.roll + parseInt(this.getCharacterInitiative(b.character))
                if (aRoll == bRoll) {
                    if (a.character.statistics.dexterity == b.character.statistics.dexterity) {
                        return Math.random() >= 0.5
                    }
                    else {
                        return a.character.statistics.dexterity > b.character.statistics.dexterity
                    }
                }
                else {
                    return aRoll > bRoll ? -1 : 1
                }
            })
        },
        updateInitiatives (initiatives) {
            this.initiativeOrder = this.sortInitiative(initiatives)
            this.$emit('updateOrder', this.initiativeOrder)
            this.currentIndex = 0
            this.$nextTick(() => {
                this.setupInitiatives()
            })
        }
    },
    watch: {
        currentTurn () {
            this.preventMovement = false
        },
        currentIndex(value) {
            this.currentDisplayInfo = false

            this.$emit('updateInitiative', { value: value })

            setTimeout(() => {
                this.currentDisplayInfo = true
                this.preventMovement = false
            }, 350)
        },
        initiativeRolls: {
            handler (value) {
                this.updateInitiatives(JSON.parse(JSON.stringify(value)))
            },
            deep: true
        }
    },
    mounted () {
        if (!this.initiativeRolls) {
            this.randomInitiative()
        }
        else {
            this.updateInitiatives(this.initiativeRolls)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.initiative-bar-container {
    height: 90vh;
    width: 450px;
    position: relative;
    margin-top: 60px;

    &::before {
        content: "";
        width: 5px;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.26);
        position: absolute;
        top: 50%;
        left: 50px;
        transform: translate(-50%, -50%);
    }

    &.horizontal {
        height: 400px;
        width: 100%;
        overflow: hidden;

        &::before {
            height: 5px;
            width: 100vw;
            top: 50px;
            left: 50%;
        }

        .initiative-display {
            .initiative-turn {
                .character-initiative-card {
                    top: 0;
                    transition: all 0.3s ease-in-out;
                    transform: translateX(-50%);

                    &.post:not(:hover) {
                        filter: grayscale(1)
                    }
                }
            }
        }
    }
}

.initiative-display {
    position: relative;
    transition: all 0.3s linear;
    height: 100%;

    .initiative-turn {
        position: relative;

        .character-initiative-card {
            transition: all 0.3s linear;
            left: 0;
            position: absolute;
            
            &:hover {
                z-index: 999 !important;
            }
        }
    }
}
</style>