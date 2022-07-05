<template>
    <div 
        class="character-portrait"
        :class="{
            'portrait-small': small
        }"
    >
        <svg 
            class="loading-decorator" 
            :class="{ 'loaded': borderLoaded }"
            viewBox="0 0 105 105" 
            xmlns="http://www.w3.org/2000/svg"
            v-show="showBorder"
            v-if="small"
        >
            <circle ref="border" cx="50" cy="53" r="35"></circle>
        </svg>
        <svg 
            class="loading-decorator" 
            :class="{ 'loaded': borderLoaded }"
            viewBox="0 0 150 150" 
            xmlns="http://www.w3.org/2000/svg"
            v-show="showBorder"
            v-else
        >
            <circle ref="border" cx="75" cy="75" r="69.5"></circle>
        </svg>
        <div 
            class="flex flex-align-center character-portrait-container w-100"
            :class="['border-' + getCharacterClass(character)]"
            @click="$emit('avatar-click')"
        >
            <img 
                :src="characterImage"
                class="portrait"
                :class="{ 'loaded': imageLoaded && borderLoaded }"
                @load="imageLoaded = true"
                @error="imageLoaded = true"
            >
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        character: { type: Object, default: null },
        animateBorder: { type: Boolean, default: true },
        small: { type: Boolean, default: false }
    },
    data () {
        return {
            imageLoaded: false,
            borderLoaded: false,
            showBorder: true
        }
    },
    computed: {
        ...mapGetters(['getCharacterClass']),
        characterImage () {
            let src = 'icons/'

            if (this.character.type == "character") {
                src += 'classes/' + this.character.class
            }
            else {
                src += 'enemies/' + this.character.name
            }

            src += '.png'

            return src
        }
    },
    methods: {
        portraitBorderAnimation() {
            let angle = 460
            let increment = 6
            let timer = window.setInterval(function () {
                this.$refs.border.setAttribute("stroke-dasharray", angle + ", 20000");

                if (angle <= 0) {
                    window.clearInterval(timer)
                    this.showBorder = false
                    this.borderLoaded = true
                }

                angle -= increment;
            }.bind(this), 5);
        }
    },
    watch: {
        borderLoaded (value) {
            if (value && this.imageLoaded) {
                setTimeout(() => {
                    this.$emit('avatar-loaded')
                }, 300)
            }
        },
        imageLoaded (value) {
            if (value && this.borderLoaded) {
                setTimeout(() => {
                    this.$emit('avatar-loaded')
                }, 300)
            }
        }
    },
    created () {
        this.showBorder = this.animateBorder
        this.borderLoaded = !this.animateBorder
    },
    mounted () {
        if (this.animateBorder) {
            this.portraitBorderAnimation()
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.character-portrait {
    width: 130px;
    height: 130px;
    position: relative;
    z-index: 999;

    &.portrait-small {
        width: 100px;
        height: 100px;

        .character-portrait-container {
            width: 95px;
            height: 95px;
        }
    }
}

.loading-decorator {
    width: 135px;
    height: 135px;
    stroke-width: 10px;
    stroke: $background-color;
    fill: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    z-index: 10;
    stroke-dasharray: 430 20000;
    z-index: 11;

    &.loaded {
        stroke-dasharray: 0 20000;
    }
}

.character-portrait-container {
    width: 130px;
    height: 130px;
    border: 5px solid $background-color;
    background-color: $background-color;
    border-radius: 100%;
    overflow: hidden;
    z-index: 10;

    .portrait {
        width: 100%;
        position: relative;
        z-index: 2;
        transform: translateY(10px);
        opacity: 0;
        transition: all 0.3s linear;

        &.loaded {
            opacity: 1;
            animation: image-animation 0.3s linear;
        }
    }
}

@keyframes image-animation {
    from {
        opacity: 0;
        transform: translate(-100%, 10px);
    }
    to {
        opacity: 1;
        transform: translateX(0, 10px);
    }
}
</style>