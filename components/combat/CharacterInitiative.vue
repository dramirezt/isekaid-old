<template>
    <div 
        class="flex flex-align-center text-no-select character-initiative-card"
        :class="[direction]"
        @mouseenter="toggleDetails(true)"
        @mouseleave="toggleDetails(false)"
    >
        <div class="flex flex-column flex-align-center character-portrait-container">
            <CharacterPortrait 
                :character="character" 
                @avatar-loaded="avatarLoaded"
                :small="true"
            />
            <div 
                class="flex flex-justify-center flex-align-center character-initiative"
                :class="[
                    'bg-' + getCharacterClass(character),
                    {
                        'loaded': displayInitiative
                    }
                ]"
            >
                {{ initiative + parseInt(getCharacterInitiative(character)) }}
            </div>
        </div>
        <div 
            class="flex flex-align-center character-info"
            :class="[
                'bg-' + getCharacterClass(character),
                { 
                    'display': displayDetails,
                    'flex-column': direction == 'vertical'
                }
            ]"
            v-show="displayDetails"
        >
            <span 
                class="decorator" 
                :class="['bg-' + getCharacterClass(character)]"
            />
            <div class="flex flex-column text-center w-100">
                <CharacterName :character="character" />
                <CharacterClass :character="character" />
            </div>
            <CharacterStatusBars 
                :character="character" 
                :display="displayDetails" 
                :fill="fillStatusBar" 
                :showBarTags="false"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        character: { type: Object, default: null },
        initiative: { type: Number, default: 10 },
        direction: { type: String, default: 'horizontal' },
        forceDisplayInfo: { type: Boolean, default: false }
    },
    data () {
        return {
            displayInitiative: false,
            displayDetails: false,
            fillStatusBar: false,
            statusBarTimeout: null
        }
    },
    computed: {
        ...mapGetters(['getCharacterClass', 'getCharacterInitiative'])
    },
    methods: {
        avatarLoaded () {
            this.displayInitiative = true
        },
        toggleDetails (value) {
            if (value) {
                this.displayDetails = true
                this.statusBarTimeout = setTimeout(() => {
                    this.fillStatusBar = true
                }, 300)
            } else {
                if (!this.forceDisplayInfo) {
                    window.clearTimeout(this.statusBarTimeout)
                    this.displayDetails = false
                    this.fillStatusBar = false
                }
            }
        }
    },
    watch: {
        forceDisplayInfo(value) {
            if (value) {
                this.toggleDetails(true)
            } else {
                this.toggleDetails(false)
            }
        }
    },
    mounted () {
        if (this.forceDisplayInfo) {
            this.toggleDetails(true)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.character-initiative-card {
    position: relative;
    margin: 0 20px 0 0;

    &:hover {
        z-index: 999;
    }

    &.vertical {
        margin: 0 0 20px 0;

        .character-info {
            top: calc(100% + 30px);
            left: 50%;
            transform: translateX(-50%);
            width: 350px;

            .character-name {
                align-items: center;
                white-space: normal;
                flex-direction: column;

                ::v-deep {
                    span {
                        margin-left: 0;
                    }
                }
            }

            .decorator {
                top: -30px;
                left: 50%;
                transform: translateX(-50%) rotate(90deg);
            }

            .character-status {
                //margin-top: 0;
                margin-top: 20px;
            }
        }
    }
}

.character-portrait-container {
    position: relative;
    z-index: 2;

    .character-initiative {
        font-size: 20px;
        font-weight: bold;
        padding: 20px 15px 5px 15px;
        margin-top: -25px;
        border-radius: 10px;
        position: relative;
        opacity: 0;
        transform: translateY(-100%);
        width: 50px;

        &.loaded {
            transform: translateY(0);
            opacity: 1;
            animation: initiative 0.3s linear;
        }
    }
}

.character-info {
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    left: calc(100% + 20px);
    top: 20px;
    opacity: 0;
    z-index: 1;
    min-width: 300px;

    &.display {
        opacity: 1;
        animation: fade 0.3s linear;
    }

    .decorator {
        border-top: 15px solid $background-color;
        border-left: 15px solid $background-color;
        border-bottom: 15px solid $background-color;
        border-right: 15px solid transparent;
        position: absolute;
        left: -30px;
        top: 17.5px;
        display: block;
    }

    .character-status {
        margin-top: 20px;

        ::v-deep {
            .character-status-bar {
                &.display {
                    &:first-child {
                        animation-duration: 0.3s;
                    }

                    &:last-child {
                        animation-duration: 0.3s;
                    }
                }
            }
        }
    }
}

@keyframes initiative {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes status-health {
    0% {
        transform: translateY(-50%);
        opacity: 0;
    }
    66% {
        transform: translateY(-50%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes status-mana {
    0% {
        transform: translateY(50%);
        opacity: 0;
    }
    66% {
        transform: translateY(50%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
