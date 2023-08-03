<template>
    <router-view />
</template>

<script setup>

</script>

<style>
    .theme-dark {
        --color-bg-primary: #141414;
        --color-bg-secondary: #1c1c1c;
        --color-bg-cell-checked: rgb(255 255 255 / 1);
        --color-bg-cell-primary: rgb(255 255 255 / .2);
        --color-bg-cell-secondary: rgb(255 255 255 / .1);
        
        --color-component-outline: #049a9a;
        --color-component-clear-bg: transparent;
        --color-component-clear-hover-bg: rgba(255, 255, 255, 0.1);
        --color-component-clear-text: #FFFFFF;
        --color-component-clear-hover-text: #FFFFFF;
        --color-component-primary-bg: #FFFFFF;
        --color-component-primary-hover-bg: rgba(255, 255, 255, 0.8);
        --color-component-primary-text: #141414;
        --color-component-primary-hover-text: #141414;
        
        --color-border-primary: #8A8A8A;
        --color-border-secondary: #434343;
        
        --color-text-primary: #FFFFFF;
        --color-text-secondary: rgb(255 255 255 / .5);
        --color-text-easy: #049a9a;
        --color-text-medium: #F4AC32;
        --color-text-hard: #EF6351;

        --size-control: 40px;

        --space-3xs: 2px;
        --space-2xs: 4px;
        --space-xs: 8px;
        --space-s: 12px;
        --space-m: 16px;
        --space-l: 24px;
        --space-xl: 28px;
        --space-2xl: 32px;
        --space-3xl: 40px;

        /* font sizes */
        --size-text-2xs: 8px;
        --size-text-xs:  10px;
        --size-text-s:   12px;
        --size-text-m:   16px;
        --size-text-l:   20px;
        --size-text-xl:  24px;
        --size-text-2xl: 32px;
        --size-text-3xl: 60px;
        --size-text-4xl: 80px;

        /* line heights */
        --line-height-text-2xs: 1.1em;
        --line-height-text-xs: 1.2em;
        --line-height-text-s: 1.4em;
        --line-height-text-m: 1.5em;
        --line-height-text-l: 1.6em;
    }
    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
    }

    .text {
        font-family: 'Outfit', sans-serif;
        font-weight: 400;
        transition: color 0.25s ease;
    }

    .text_size-2xs {
        font-size: var(--size-text-2xs);
    }
    .text_size-xs {
        font-size: var(--size-text-xs);
    }
    .text_size-s {
        font-size: var(--size-text-s);
    }
    .text_size-m {
        font-size: var(--size-text-m);
    }
    .text_size-l {
        font-size: var(--size-text-l);
    }
    .text_size-xl {
        font-size: var(--size-text-xl);
    }
    .text_size-2xl {
        font-size: var(--size-text-2xl);
    }
    .text_size-3xl {
        font-size: var(--size-text-3xl);
    }
    .text_size-4xl {
        font-size: var(--size-text-4xl);
    }

    .text_lineHeight-2xs {
        line-height: var(--line-height-text-2xs);
    }
    .text_lineHeight-xs {
        line-height: var(--line-height-text-xs);
    }
    .text_lineHeight-s {
        line-height: var(--line-height-text-s);
    }
    .text_lineHeight-m {
        line-height: var(--line-height-text-m);
    }
    .text_lineHeight-l {
        line-height: var(--line-height-text-l);
    }

    .text_view-primary {
        color: var(--color-text-primary);
    }
    .text_view-secondary {
        color: var(--color-text-secondary);
    }
    .text_view-link {
        color: var(--color-text-link);
        text-decoration: none;
        transition: color 0.3s ease;
    }
    .text_view-link:hover {
        color: var(--color-text-link-hover);
    }
    .text_view-easy {
        color: var(--color-text-easy);
    }
    .text_view-medium {
        color: var(--color-text-medium);
    }
    .text_view-hard {
        color: var(--color-text-hard);
    }

    .text_align-right {
        text-align: right;
    }
    .text_align-center {
        text-align: center;
    }

    .text_weight-bold {
        font-weight: 700;
    }
    .text_weight-normal {
        font-weight: 300;
    }
    .text_weight-light {
        font-weight: 200;
    }

    #app {

    }
    html {
        min-height: 100vh;
    }
    body {
        min-height: 100vh;
        margin: 0;
        background-color: var(--color-bg-primary);
        color: var(--color-text-primary);
        font-family: 'Outfit', sans-serif;
        font-weight: 400;
    }
    *:focus-visible {
        outline-color: var(--color-component-outline);
    }
    .user {
        display: block;
        width: 40px; height: 40px;
        border-radius: 50%;
        contain: content;
    }
    .user img {
        width: 100%;
    }

    .choiceGroup {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        border: 0;
    }
    .choiceGroup_input {
        position: absolute;
        top: -100%; left: -100%;
        visibility: hidden;
    }
    .choiceGroup_item {
        position: relative;
        height: var(--size-control);
        padding: 0 var(--space-m);
        line-height: var(--size-control);
        color: var(--color-component-clear-text);
        border-radius: 99em;
        background-color: var(--color-component-clear-bg);
        cursor: pointer;
        transition: background-color 0.25s ease, color 0.25s ease;
    }
    .choiceGroup_item:hover, .choiceGroup_item:has(.choiceGroup_input:checked) {
        color: var(--color-component-clear-hover-text);
        background-color: var(--color-component-clear-hover-bg);
    }
</style>
