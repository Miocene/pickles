<template>
    <header class="picklePage__header">

        <!-- pickle info -->
        <div class="picklePage__leftHeaderPart">
            <component-button view="clear" iconOnly @on-click="router.go(-1)">
                <icon-back size="m" />
            </component-button>
            <h3 class="text text_size-m text_view-primary text_weight-bold picklePreview__name">#{{ pickleStore.$state.id }}</h3>
            <div v-if="pickleStore.$state.difficulty == '1'" class="text text_size_s text_view-easy">easy-peasy</div>
            <div v-else-if="pickleStore.$state.difficulty == '2'" class="text text_size_s text_view-easy">easy</div>
            <div v-else-if="pickleStore.$state.difficulty == '3'" class="text text_size_s text_view-medium">medium</div>
            <div v-else-if="pickleStore.$state.difficulty == '4'" class="text text_size_s text_view-hard">hard</div>
            <div v-else-if="pickleStore.$state.difficulty >= '5'" class="text text_size_s text_view-hard">really hard</div>
        </div>

        <!-- color palette for color pickle -->
        <fieldset v-if="pickleStore.$state.color" class="picklePage__centerHeaderPart">
            <label v-for="(item, i) in pickleStore.$state.colors" :key="i" class="color" :for="'color' + (i + 1)">
                <input type="radio" :value="i+1" name="color" :id="'color' + (i + 1)" v-model="pickleStore.$state.colorChecked" v-bind:checked="i === 0" />
            </label>
            <div class="colorSkip"></div>
            <p class="text text_size_s text_view_primary"> — shift + click</p>
        </fieldset>

        <!-- color palette for b&w pickle -->
        <fieldset v-if="!pickleStore.$state.color" class="picklePage__centerHeaderPart">
            <div class="colorChecked"></div>
            <p class="text text_size_s text_view_primary"> — click</p>
            <div class="colorSkip"></div>
            <p class="text text_size_s text_view_primary"> — shift + click</p>
        </fieldset>



        <div class="picklePage__rightHeaderPart">
            <component-button v-if="userStore.$state.admin" view="clear" iconOnly>
                <icon-edit size="m" />
            </component-button>
            <div class="buttonGroup">
                <component-button view="clear" iconOnly @click="decreaseCellSize">
                    <icon-minus size="m" />
                </component-button>
                <component-button view="clear" iconOnly @click="increaseCellSize">
                    <icon-plus size="m" />
                </component-button>
            </div>
            <div class="buttonGroup">
                <component-button view="clear" iconOnly>
                    <icon-undo size="m" />
                </component-button>
                <component-button view="clear" iconOnly>
                    <icon-restart size="m" />
                </component-button>
                <component-button view="clear" iconOnly>
                    <icon-redo size="m" />
                </component-button>
            </div>
            <a href="" class="user"><img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" /></a>
        </div>
    </header>
</template>

<script setup>
    import router from '@/router'

    import { useUserStore } from '@/stores/UserStore'
    import { usePickleStore } from '@/stores/PickleStore'
    import IconBack from '@/components/icons/IconBack'
    import IconPlus from '@/components/icons/IconPlus'
    import IconMinus from '@/components/icons/IconMinus'
    import IconUndo from '@/components/icons/IconUndo'
    import IconRedo from '@/components/icons/IconRedo'
    import IconRestart from '@/components/icons/IconRestart'
    import IconEdit from '@/components/icons/IconEdit'
    
    const pickleStore = usePickleStore()
    const userStore = useUserStore()

    const increaseCellSize = () => {
        if(pickleStore.$state.cellSize < 34) pickleStore.$state.cellSize = pickleStore.$state.cellSize + 2
    }
    const decreaseCellSize = () => {
        if(pickleStore.$state.cellSize > 16) pickleStore.$state.cellSize = pickleStore.$state.cellSize - 2
    }
</script>

<style scoped>
    .picklePage__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-s) var(--space-m);
        background-color: var(--color-bg-secondary);
    }
    .picklePage__leftHeaderPart {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-s);
    }
    .picklePage__rightHeaderPart {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-s);
    }
    .picklePage__centerHeaderPart {
        display: flex;
        margin: 0;
        padding: 0;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-xs);
        border: 0;
    }

    .color {
        position: relative;
        width: 20px; height: 20px;
        font-size: var(--size-text-s);
        line-height: var(--cellSize);
        text-align: center;
        border-radius: 2px;
        border: 1px solid var(--color-bg-cell-primary);
        overflow: hidden;
        cursor: pointer;
        translate: transform 0.3s ease-in;
    }
    .color:has(input:checked) {
        box-shadow: 0 0 0 2px var(--color-bg-cell-primary);
        transform: scale(1.1);
    }
    .color::before {
        filter: contrast(999) grayscale() invert();
    }
    .color:nth-child(1) { 
        background-color: var(--color-1);
        color: var(--color-1);
    }
    .color:nth-child(1)::before { content: '1'; }
    .color:nth-child(2) {
        background-color: var(--color-2);
        color: var(--color-2);
    }
    .color:nth-child(2)::before { content: '2'; }
    .color:nth-child(3) {
        background-color: var(--color-3);
        color: var(--color-3);
    }
    .color:nth-child(3)::before { content: '3'; }
    .color:nth-child(4) {
        background-color: var(--color-4);
        color: var(--color-4);
    }
    .color:nth-child(4)::before { content: '4'; }
    .color:nth-child(5) {
        background-color: var(--color-5);
        color: var(--color-5);
    }
    .color:nth-child(5)::before { content: '5'; }
    .color:nth-child(6) {
        background-color: var(--color-6);
        color: var(--color-6);
    }
    .color:nth-child(6)::before { content: '6'; }
    .color:nth-child(7) {
        background-color: var(--color-7);
        color: var(--color-7);
    }
    .color:nth-child(7)::before { content: '7'; }
    .color:nth-child(8) {
        background-color: var(--color-8);
        color: var(--color-8);
    }
    .color:nth-child(8)::before { content: '8'; }
    .color:nth-child(9) {
        background-color: var(--color-9);
        color: var(--color-9);
    }
    .color:nth-child(9)::before { content: '9'; }
    .colorSkip {
        width: 20px; height: 20px;
        margin-left: var(--space-s);
        border-radius: 2px;
        border: 1px solid var(--color-bg-cell-primary);
        translate: transform 0.3s ease-in;
        background: linear-gradient(-45deg, transparent calc(50% - 0.5px), var(--color-border-primary) calc(50% - 0.5px), var(--color-border-primary) calc(50% + 0.5px), transparent calc(50% + 0.5px)) 4px / calc(100% - 8px) no-repeat,
                    linear-gradient(45deg, transparent calc(50% - 0.5px), var(--color-border-primary) calc(50% - 0.5px), var(--color-border-primary) calc(50% + 0.5px), transparent calc(50% + 0.5px)) 4px / calc(100% - 8px) no-repeat;
    }
    .colorChecked {
        width: 20px; height: 20px;
        margin-left: var(--space-s);
        border-radius: 2px;
        border: 1px solid var(--color-bg-cell-primary);
        translate: transform 0.3s ease-in;
        background: var(--color-bg-cell-checked);
    }
    .color > input {
        position: absolute;
        opacity: 0;
    }

    .buttonGroup {
        display: flex;
        border-radius: 99em;
        transition: box-shadow 0.2s ease;
    }
    .buttonGroup:hover {
        box-shadow: 0 0 0 1px var(--color-border-secondary);
    }
</style>