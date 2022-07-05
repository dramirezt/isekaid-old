<template>
    <div 
        class="flex-inline flex-align-center text-no-select character-card-simple"
        :class="[
            'bg-' + getCharacterClass(character),
            {
                'loaded': displayCardData,
                'show-status': showStatus,
                'small': direction == 'horizontal' && !showStatus
            },
            direction
        ]"
        @click="$emit('click')"
    >
        <CharacterPortrait 
            :character="character" 
            :animateBorder="false" 
            :small="direction == 'horizontal' && !showStatus"
            @avatar-loaded="displayData"
        />
        <div class="flex flex-column flex-space-between h-100 w-100">
            <div class="flex flex-column flex-justify-center h-100">
                <CharacterName 
                    :character="character" 
                    :wrapText="direction == 'horizontal'"
                />
                <CharacterClass 
                    :character="character" 
                    :direction="'vertical'" 
                />
            </div>
            <div>
                <slot name="extra-data" />
                <CharacterStatusBars 
                    :character="character" 
                    :display="displayCardData"
                    :showBarTags="false"
                    v-if="showStatus"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        character: { type: Object, default: null },
        direction: { type: String, default: 'vertical' },
        showStatus: { type: Boolean, default: true }
    },
    data () {
        return {
            displayCardData: true,
            fillStatusBar: false
        }
    },
    computed: {
        ...mapGetters(['getCharacterClass'])
    },
    methods: {
        displayData () {
            setTimeout(() => {
                this.displayCardData = true
            }, 300)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.character-card-simple {
    padding: 30px 30px 35px 30px;
    border-radius: 20px;

    > div {
        position: relative;
        z-index: 2;
    }

    &.loaded {
        .character-name,
        .character-classes {
            opacity: 1;
            animation: slide-up 0.3s linear;
        }
    }

    &.horizontal {
        padding: 30px 50px 35px 40px;
        
        &.small {
            padding: 15px 25px 15px 20px;

            .character-portrait {
                margin-right: 20px;
            }
        }

        .character-portrait {
            margin-bottom: 0;
            margin-right: 45px;
        }

        .character-name {
            font-size: 20px;
        }

        .character-status {
            margin-top: 20px;
        }
    }

    &.vertical {
        flex-direction: column;
        width: 300px;
        
        .character-name,
        .character-classes {
            text-align: center;
        }

        .character-name {
            flex-direction: column;
            justify-self: flex-start;

            ::v-deep {
                span {
                    margin-left: 0;
                }
            }
        }

        /*.card-info {
            //display: flex;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            //justify-content: space-between;
        }*/
    }

    .character-portrait {
        margin-bottom: 40px;
    }

    .character-name {
        margin-bottom: 10px;
        font-size: 24px;
        opacity: 0;
    }

    .character-classes {
        font-size: 13px;
        opacity: 0;
    }

    .character-status {
        margin-top: 40px;
        min-width: 240px;
    }
}


@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>