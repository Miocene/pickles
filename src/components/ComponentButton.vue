<template>
    <a v-if="href" :href="href" class="button" :class="{ 'button_iconOnly': iconOnly, 
                                     'button_view-clear': props.view == 'clear',
                                     'button_view-primary': props.view == 'primary' }">
        <slot></slot>
        {{ props.text }}
    </a>
    <button v-else class="button" :class="{ 'button_iconOnly': iconOnly, 
                                            'button_view-clear': props.view == 'clear',
                                            'button_view-primary': props.view == 'primary' }"
            @click="$emit('onClick')">
        <slot></slot>
        {{ props.text }}
    </button>
</template>

<script setup>
    import { defineProps } from 'vue';
    
    const props = defineProps({ view: String, iconOnly: Boolean, text: String, href: String, icon: {} })
</script>

<style scoped>
    .button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: var(--size-control);
        padding: 0 var(--space-l);
        flex-shrink: 0;
        border: 0;
        border-radius: 99em;
        transition: background-color 0.25s ease;
        cursor: pointer;
        text-decoration: none;
        font-size: var(--size-text-m);
        line-height: var(--size-control);
    }
    .button_view-clear {
        background-color: transparent;
        color: var(--color-component-clear-text);
        fill: var(--color-component-clear-text);
    }
    .button_view-clear:hover {
        background-color: rgba(255, 255, 255, 0.152);
        color: var(--color-component-clear-hover-text);
        fill: var(--color-component-clear-hover-text);
    }
    .button_view-primary {
        background-color: var(--color-component-primary-bg);
        color: var(--color-component-primary-text);
        fill: var(--color-component-primary-text);
    }
    .button_view-primary:hover {
        background-color: var(--color-component-primary-hover-bg);
        color: var(--color-component-primary-hover-text);
        fill: var(--color-component-primary-hover-text);
    }
    .button_iconOnly {
        width: var(--size-control);
        padding: 0;
    }
    .button:not(.button_iconOnly) {
        gap: var(--space-2xs);
    }
</style>