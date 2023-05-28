<template>
    <header class="header">
        <a href="/" class="header_logo"><img src="../assets/logo.svg" /></a>
        <div class="header_controls">
            <component-button view="clear" iconOnly>
                <icon-sun size="m"/>
            </component-button>
            <a href="" class="user"><img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" /></a>
        </div>
    </header>
</template>

<script setup>
    // import {reactive} from 'vue'
    import ComponentButton from '@/components/ComponentButton'
    import IconSun from '@/components/icons/IconSun'
    
</script>

<style scoped>
    .header {
        position: sticky; top: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-s) var(--space-l);
        background-color: var(--color-bg-primary);
        z-index: 1;
    }
    .header_controls {
        display: flex;
        align-items: center;
        gap: var(--space-s);
    }
    .header_logo {
        border-radius: 50%;
    }
    .header_logo img {
        display: block;
        margin: 0;
    }
</style>