<template>
    <div 
        class="flex-inline flex-align-center flex-justify-center element"
    >
        <div class="flex flex-justify-end w-50">
            <img 
                :src="'/icons/' + element.icon"
                class="card-icon"
            >
        </div>
        <div class="flex flex-column w-100 card-data">
            <div 
                class="flex flex-align-center text-uppercase text-outline card-text" 
                v-if="element.text"
                v-html="element.text"
            />
            <div 
                class="flex flex-align-center text-outline card-value"
                v-html="element.value" 
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        element: { type: Object, default: null }
    }
}
</script>

<style lang="scss" scoped>
.element {
    min-width: 180px;
    min-height: 50px;
    margin: 10px 0;
    letter-spacing: 1.3px;

    .card-icon {
        width: 50px;
        height: auto;
    }

    .card-data {
        padding-left: 15px;
        font-size: 24px;
        font-weight: bold;

        .card-text {
            font-size: 10px;
            letter-spacing: 1.3px;

            ::v-deep {
                .icon {
                    width: 20px;
                    margin: 0 10px;
                }
            }
        }

        .card-value {
            ::v-deep span {
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }
}
</style>