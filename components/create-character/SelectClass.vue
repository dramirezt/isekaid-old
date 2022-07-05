<template>
    <div class="w-100">
        <div class="view-body">
            <div 
                class="flex flex-column"
            >
                <div class="flex flex-justify-center text-uppercase text-bold title">
                    {{ $t('interface.create_characters.select_class') }}
                </div>

                <div class="flex flex-justify-center flex-wrap class-selector-container">
                    <div
                        v-for="(characterClass, index) in classesByName"
                        :key="'characterClass-' + index"
                    >
                        <class-card
                            :characterClass="characterClass"
                            :class="{ 'selected': characterClass == selectedClass }"
                            @click="selectClass(characterClass)"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="view-footer">
            <div class="flex flex-space-between w-100">
                <button type="button" class="btn-cta" @click="$emit('back')">
                    {{ $t('interface.back')}}
                </button>

                <button type="button" class="btn-cta" @click="$emit('next', selectedClass)">
                    {{ $t('interface.finish')}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            selectedClass: null
        }
    },
    computed: {
        ...mapState(['classes']),
        classesByName () {
            let sourceClasses = Object.keys(this.classes)
            return sourceClasses.sort((a, b) => {
                return this.$t('classes.' + a) >= this.$t('classes.' + b) ? 1 : -1
            })
        }
    },
    methods: {
        selectClass (characterClass) {
            this.selectedClass = this.selectedClass != characterClass ? characterClass : null
        }
    }
}
</script>

<style lang="scss" scoped>

.title {
    font-size: 30px;
    margin-bottom: 30px;
}

.class-selector-container {
    > div {
        margin: 0 10px 20px;
    }

    .class-card {
        flex-basis: calc(100% / 5);
        cursor: pointer;
        filter: grayscale(1);
        transform: scale(0.95);
        transition: all 0.3s linear;

        &:hover,
        &.selected {
            transform: scale(1);
            filter: grayscale(0);
        }
    }
}

</style>