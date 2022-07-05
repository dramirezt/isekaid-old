<template>
    <div 
        class="flex-inline flex-justify-center flex-align-center text-no-select class-card"
        :class="[
            'bg-' + characterClass
        ]"
        @click="$emit('click')"
    >
        <div class="flex flex-column flex-align-center text-center class-portrait">
            <img 
                :src="'/icons/classes/' + characterClass + '.png'"
                class="class-image"
            >

            <div 
                class="class-name text-uppercase"
                v-if="!showStats"
            >
                {{ $t('classes.' + characterClass )}}
            </div>
        </div>

        <div 
            class="flex-inline flex-column class-info text-center"
            v-if="showStats"
        >
            <div class="class-name text-uppercase">
                {{ $t('classes.' + characterClass )}}
            </div>

            <div 
                class="class-stats"
            >
                <character-statistics
                    :character="characterClass"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        characterClass: { type: String, default: null },
        showStats: { type: Boolean, default: false }
    }
}
</script>

<style lang="scss" scoped>

.class-card {
    border-radius: 20px;
    padding: 20px;
    //width: 300px;

    .class-name {
        font-size: 20px;
        font-weight: bold;
    }

    .class-portrait {
        .class-image {
            width: 200px;
            height: auto;
        }

        .class-name {
            margin-top: 20px;
        }
    }

    .class-stats {
        padding-left: 40px;

        .class-name {
            margin-bottom: 20px;
        }

        .view-stats {
            flex-wrap: wrap;
            max-width: calc(180px * 3);

            ::v-deep {
                .element {
                    flex-basis: 33%;
                }
            }
        }
    }
}

</style>