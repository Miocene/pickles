<template>
    <header class="header">
        <a href="/" class="header_logo"><img src="../assets/logo.svg" /></a>
        <div class="header_controls">
            <component-button view="clear" iconOnly>
                <icon-sun size="m"/>
            </component-button>
            <a href="" class="user"><img :src="userStore.$state.photo" /></a>
        </div>
    </header>
</template>

<script setup>
    import { useUserStore } from '@/stores/UserStore'
    import ComponentButton from '@/components/ComponentButton'
    import IconSun from '@/components/icons/IconSun'
    
    const userStore = useUserStore()
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