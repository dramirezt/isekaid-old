<template>
    <div 
        class="flex-inline flex-column flex-align-center text-no-select character-card-expandable"
        :class="{
                    'display-header': displayHeader,
                    'expandable': isExpandable,
                    'loaded': displayCardData,
                    'show-status': showStatus
                }"
        ref="card"
        v-if="character"
    >
        <div 
            class="flex flex-align-center flex-justify-start w-100 character-card-header"
            ref="header"
        >
            <CharacterPortrait 
                :character="character" 
                @avatar-click="toggleCard"
                @avatar-loaded="avatarLoaded"
            />
            <div 
                class="flex flex-align-center w-100 character-info-container"
                :class="['bg-' + getCharacterClass(character)]"
                @click="toggleCard()"
            >
                <div class="flex flex-column flex-align-center flex-justify-center w-100 character-info">
                    <CharacterName :character="character" />
                    <CharacterClass :character="character" />
                </div>
                <div class="flex flex-column w-100" v-if="showStatus">
                    <CharacterStatusBars 
                        :character="character" 
                        :display="displayHeader"
                        :fill="fillStatusBar" 
                    />
                </div>
            </div>
        </div>

        <div 
            class="flex flex-column flex-align-start character-card-body"
            :class="['view-' + currentView ]"
            ref="body"
            v-if="isExpandable"
        >
            <div 
                class="flex flex-align-center flex-justify-center card-content w-100" 
                ref="content"
            >
                <CharacterCombat 
                    :character="character"
                    :active="currentView == 'combat'"
                />
                <CharacterStatistics
                    :character="character"
                    :active="currentView == 'statistics'"
                />
                <CharacterPhysicalResistances
                    :character="character"
                    :active="currentView == 'physical-resistances'"
                />
                <CharacterMagicalResistances
                    :character="character"
                    :active="currentView == 'magical-resistances'"
                />
            </div>
            
            <div class="flex w-100 card-buttons" ref="buttons">
                <span 
                    ref="buttonDecorator" 
                    class="active-button-decorator" 
                    :class="['bg-' + getCharacterClass(character)]"
                />
                <button 
                    v-for="(option, index) in options"
                    :key="'option-' + index"
                    type="button" 
                    class="flex flex-column flex-align-center flex-justify-center btn-option w-100" 
                    :class="[
                        { 'active': currentView == option.view }, 
                        'btn-' + option.view
                    ]"
                    @click="changeView(option.view, index)"
                >
                    <img 
                        :src="'icons/' + option.icon"
                        class="button-icon"
                    >
                    <span class="text-uppercase text-outline">
                        {{ $t(option.text)}}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        character: { type: Object, default: null },
        showStatus: { type: Boolean, default: true },
        isExpandable: { type: Boolean, default: true },
        expandedDefault: { type: Boolean, default: false }
    },
    data () {
        return {
            currentView: 'statistics',
            displayCardData: false,
            isExpanded: false,
            displayHeader: false,
            fillStatusBar: false,
            options: [
                { text: 'statistics.name', icon: 'statistics.png', view: 'statistics' },
                { text: 'combat.name', icon: 'combat.png', view: 'combat' },
                { text: 'physical_res', icon: 'physical-resistances.png', view: 'physical-resistances' },
                { text: 'magical_res', icon: 'elemental-resistances.png', view: 'magical-resistances' }
            ],
            cardBodyHeight: 0,
            cardHeaderHeight: 0,
            maxCardContentHeight: 0
        }
    },
    computed: {
        ...mapGetters(['getCharacterClass'])
    },
    methods: {
        avatarLoaded () {
            this.displayHeader = true
            this.displayCardData = true

            if (this.expandedDefault) {
                setTimeout(() => {
                    this.toggleCard()
                }, 300)
            }
        },
        changeView (view, index) {
            this.currentView = view
            this.$refs.buttonDecorator.style.left = 'calc(25% * ' + index + ')'
        },
        setCardContentMaxHeight () {
            if (this.isExpandable) {
                Array.from(this.$refs.content.children).forEach(e => {
                    let elementHeight = e.getBoundingClientRect().height
                    if (elementHeight > this.maxCardContentHeight) {
                        this.maxCardContentHeight = elementHeight
                    }
                })
                this.$refs.content.style.height = this.maxCardContentHeight + 50 + 'px'
            }
        },
        setCardHeight () {
            if (this.isExpandable) {
                this.cardHeaderHeight = this.$refs.header.getBoundingClientRect().height
                this.cardBodyHeight = this.$refs.body.getBoundingClientRect().height

                if (this.isExpanded) {
                    this.$refs.card.style.height = (
                        this.cardHeaderHeight + this.cardBodyHeight
                    ) + 'px'
                } else {
                    this.$refs.card.style.height = this.cardHeaderHeight + 'px'
                }
            }
        },
        toggleCard () {
            if (this.isExpandable) {
                this.isExpanded = !this.isExpanded
                this.setCardHeight()
            }
        }
    },
    mounted() {
        this.setCardHeight()
        this.setCardContentMaxHeight()
    }
}
</script>

<style lang="scss" scoped>

@import "~/assets/css/variables.scss";

.character-card-expandable {
    overflow: hidden;
    position: relative;
    transition: height 0.3s linear;
    justify-content: flex-start;
    background-color: $background-color;

    &.expandable {
        min-width: calc(150px * 4 + 130px);

        .character-card-header {
            > * {
                cursor: pointer;
            }
        }
    }

    &:not(.expandable) {
        .character-card-header {
            .character-info-container {
                border-bottom-right-radius: 10px;
            }
        }
    }

    &:not(.show-status) {
        .character-card-header {
            .character-info-container {
                .character-info {
                    padding-right: 0;
                }
            }
        }
    }

    &.display-header {
        .character-card-header {
            .character-info-container {
                &::before {
                    width: 0;
                }
            }
        }
    }

    &.loaded {
        .character-card-header {
            .character-info-container {
                $name-animation-duration: 0.3s;

                &::before {
                    width: 0;
                }
                
                .character-info {
                    .character-name {
                        opacity: 1;
                        animation: name-animation $name-animation-duration linear;
                    }

                    .character-classes {                        
                        opacity: 1;
                        animation: classes-animation $name-animation-duration*2 linear;
                    }
                }
            }
        }
    }
}

.character-card-header {
    position: relative;
    z-index: 3;
    width: 100%;
    height: 130px;
    z-index: 10;

    &::before {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0px;
        left: 0;
        background-color: $background-color;
        content: "";
    }

    .character-info-container {
        background-color: $background-color;
        border-bottom: 0;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        height: 80px;
        position: relative;
        z-index: 2;
        background-color: inherit;
            padding-right: 25px;

        &::before {
            width: 150%;
            height: calc(100% + 2px);
            position: absolute;
            right: -1px;
            top: -1px;
            background-color: $background-color;
            content: "";
            z-index: 10;
            animation: display-character-info 0.6s ease-out;
            animation-delay: 0.3s;
            transform-origin: right;
        }

        .character-info {
            margin-left: -25px;
            padding: 15px 20px 15px 40px;
            position: relative;
            z-index: 2;
            height: 80px;
            letter-spacing: 2.5px;
            background-color: inherit;
            width: calc(100% + 25px);
            overflow: hidden;

            .character-name {
                opacity: 0;
            }

            .character-classes {
                opacity: 0;
            }
        }

        .character-status {
            padding-left: 40px;
            min-width: 240px;
        }
    }
}

.character-card-body {
    align-self: flex-end;
    border: 1px solid $black-light;
    border-top: 0;
    //border-bottom-left-radius: 10px;
    //border-bottom-right-radius: 10px;
    background-color: $black-dark;
    align-items: flex-start !important;
    justify-content: flex-start !important;
    transition: all 0.6s ease-in-out;
    padding-top: 0;
    overflow: hidden;
    position: relative;
    position: absolute;
    right: 0;
    bottom: 25px;
    width: calc(100% - 65px);

    .card-content {
        position: relative;

        &::before,
        &::after {
            width: 100%;
            height: 50px;
            background: linear-gradient(to bottom, $black-dark 0, transparent 80% );
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            z-index: 2;
        }

        &::after {
            top: unset;
            bottom: 0;
            background: linear-gradient(to bottom, transparent 0%, $black-dark 80%);
        }

        .view-container {
            flex-wrap: wrap;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 100%;
            max-width: calc(180px * 3 + 40px);
            transform: translate(-50%, -50%);
            overflow: hidden;
            opacity: 1;
            padding: 0 20px;
            animation: view-slide-in 0.3s cubic-bezier(1, 0, 0.5, 1);
            z-index: 1;

            &:not(.active) {
                //left: 150%;
                top: 150%;
                animation: view-slide-out 0.3s cubic-bezier(1, 0, 0.5, 1);
            }
        }
    }
    
    .card-buttons {
        position: relative;
        z-index: 3;

        .active-button-decorator {
            width: 25%;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 4px;
            background: #fff;
            content: "";
            transition: all 0.15s linear;
        }

        .btn-option {
            outline: none;
            background-color: $black-light;
            padding: 10px 0;
            height: 80px;
            border: 0;
            transition: all 0.15s linear;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;

            &.active {
                background-color: $black-dark;

                .button-icon {
                    filter: grayscale(0);
                }
            }

            .button-icon {
                width: 40px;
                height: 40px;
                margin-bottom: 5px;
                filter: grayscale(1);
                transition: all 0.3s linear;
            }

            span {
                color: #fff;
                font-size: 10px;
                letter-spacing: 1.3px;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .character-card-expandable {
        &:not(.expandable) {
            .character-card-header {
                height: auto;
                flex-direction: column;
        
                .character-info-container {
                    border-bottom-left-radius: 10px;
                    padding-left: 25px;
                    padding-top: 30px;
                    height: auto;
                    margin-top: -40px;
        
                    .character-info {
                        padding-left: 0;
                        margin-left: 0;
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                        text-align: center;
                    }
                }
            }
        }
    }
}


@keyframes classes-animation {
    0% {
        transform: translateY(-150%);
        opacity: 0;
    }
    50% {
        transform: translateY(-150%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes display-character-info {
    from {
        width: 150%;
    }
    to {
        width: 0;
    }
}

@keyframes name-animation {
    from {
        transform: translateX(-150%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes view-slide-in {
    from {
        top: -300%;
    }
    to {
        top: 50%;
    }
}

@keyframes view-slide-out {
    from {
        top: 50%;
    }
    to {
        top: 300%;
    }
}
</style>
