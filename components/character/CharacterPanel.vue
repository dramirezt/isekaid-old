<template>
    <div 
        class="flex flex-column character-panel"
    >
        <div 
            class="flex flex-align-center flex-justify-center text-outline character-panel-header"
            :class="['bg-' + characterClass]"
            v-if="title"
        >
            {{ title }}
        </div>
        <div class="flex flex-justify-center flex-wrap character-panel-body" ref="body">
            <slot name="panel-data" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: { type: String, default: null },
        characterClass: { type: String, default: '' },
        maxRowElements: { type: Number, default: 3 },
        autoMaxWidth: { type: Boolean, default: true }
    },
    methods: {
        setPanelMaxWidth () {
            if (this.autoMaxWidth) {
                let children = this.$refs.body.children
                let childWidth = 0
                Array.from(children).forEach(c => {
                    let cWidth = c.getBoundingClientRect().width
                    if (childWidth < cWidth) {
                        childWidth = cWidth
                    }
                })
                if (childWidth > 0) {
                    let padding = window.getComputedStyle(this.$el, null).getPropertyValue('padding-left').replace('px', '')
                    padding = padding * 2
                    this.$el.style.maxWidth = ((childWidth * this.maxRowElements) + padding) + "px"
                }
                else {
                    this.$el.style.maxWidth = null
                }
            }
        }
    },
    watch: {
        maxRowElements () {
            this.setPanelMaxWidth()
        }
    },
    mounted () {
        this.setPanelMaxWidth()
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.character-panel {
    .character-panel-header {
        font-size: 16px;
        text-transform: uppercase;
        padding: 0 40px;
        height: 40px;
        font-weight: bold;
        transition: all 0.3s linear;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
    
    .character-panel-body {
        background-color: $black-light;
        padding: 20px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        overflow: hidden;

        .view-container {
            flex-wrap: wrap;
        }
    }
}
</style>