<template>
    <div 
        class="flex flex-column w-100 character-status"
        :class="[barClass]"
    >
        <div 
            class="flex flex-align-center character-status-bar"
            :class="{ 'display': display }"
            v-if="character.combat.shield > 0"
        >
            <div class="text-outline margin-0 bar-tag" v-if="showBarTags">
                {{ $t('combat.shield') }}
            </div>
            <div class="bar bar-shield">
                <span 
                    class="point active" 
                    v-for="point in character.combat.shield"
                    :key="'shield-' + point"
                />
            </div>
        </div>

        <div 
            class="flex flex-align-center character-status-bar"
            :class="{ 'display': display }"
            v-else
        >
            <div class="text-outline margin-0 bar-tag" v-if="showBarTags">
                {{ $t('combat.hp') }}
            </div>
            <div class="bar bar-health">
                <span 
                    class="point" 
                    v-for="point in totalHealth"
                    :key="'hp-' + point"
                    :class="{ 'active': point <= currentHealth }"
                />
            </div>
        </div>

        <div 
            class="flex flex-align-center character-status-bar"
            :class="{ 'display': display }"
        >
            <div class="text-outline margin-0 bar-tag" v-if="showBarTags">
                {{ $t('combat.mp') }}
            </div>
            <div class="bar bar-mana">
                <span 
                    class="point" 
                    v-for="point in totalMana"
                    :key="'hp-' + point"
                    :class="{ 'active': point <= currentMana }"
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
        display: { type: Boolean, default: false },
        fill: { type: Boolean, default: true },
        showBarTags: { type: Boolean, default: false },
        barClass: { type: String, default: '' }
    },
    computed: {
        ...mapGetters(['getCharacterTotalHealth', 'getCharacterTotalMana']),
        currentHealth () {
            return this.character.combat.health.current
        },
        currentMana () {
            return this.character.combat.mana.current
        },
        totalHealth () {
            return this.getCharacterTotalHealth(this.character)
        },
        totalMana () {
            return this.getCharacterTotalMana(this.character)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.character-status {
    &.large {
        .character-status-bar {
            &:not(:last-child) {
                margin-bottom: 30px;
            }

            .bar-tag {
                font-size: 16px;
            }

            .bar {
                height: 40px;

                .bar-data {
                    font-size: 18px;
                }
            }
        }
    }
}

.character-status-bar {
    position: relative;
    opacity: 0;

    &.display {
        opacity: 1;

        &:first-child {
            transform: translateY(0);
            animation: status-health 0.9s linear;
        }

        &:last-child {
            transform: translateY(0);
            animation: status-mana 0.9s linear;
        }
    }

    &:first-child {
        transform: translateY(-100%);
    }

    &:last-child {
        transform: translateY(100%);
    }

    &:not(:last-child) {
        margin-bottom: 10px;
    }

    .bar-tag {
        width: 2.5em;
        text-align: right;
        letter-spacing: 1.3px;
        font-size: 12px;
        z-index: 2;
        margin-right: 10px;
        font-weight: bold;
    }

    .bar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        width: 100%;
        color: #fff;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        border: 2px solid rgba(0, 0, 0, 1);

        &.bar-shield {
            .point.active {
                background-color: $shield-color;
            }
        }

        &.bar-health {
            .point.active {
                background-color: $health-color;
            }
        }

        &.bar-mana {
            .point.active {
                background-color: $mana-color;
            }
        }

        .point {
            width: 100%;
            height: 20px;
            min-width: 20px;
            border-right: 1px solid rgba(0, 0, 0, 1);
            border-left: 1px solid rgba(0, 0, 0, 1);
            background-color: rgba(0, 0, 0, 0.26);

            &:first-child {
                border-left: 0;
            }

            &:last-child {
                border-right: 0;
            }
        }
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