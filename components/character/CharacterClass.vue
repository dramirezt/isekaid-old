<template>
    <div 
        class="flex w-100 character-classes"
    >
        <div class="text-uppercase text-outline class w-100">
            {{ classText }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        character: { type: Object, default: null }
    },
    computed: {
        ...mapGetters(['getCharacterClass']),
        classText () {
            let classText = ''

            if (this.character.type == 'character') {
                classText = 'classes'
            }
            else {
                classText = 'enemies'
            }
            
            return this.$t(classText + '.' + this.getCharacterClass(this.character))
        }
    }
}
</script>

<style lang="scss" scoped>
.character-classes {
    font-size: 11px;
    font-weight: bold;

    &.vertical {
        flex-direction: column;
        align-items: center;

        .class {
            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }
    }

    &.horizontal {
        .class {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            &:not(:last-child) {
                margin-right: 20px;

                &::after {
                    content: "";
                    width: 4px;
                    height: 4px;
                    border-radius: 4px;
                    background-color: #fff;
                    position: absolute;
                    right: -12px;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }
    .class {
        position: relative;
    }
}
</style>