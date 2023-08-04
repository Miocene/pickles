<template>
    <div class="gridView">
        <component-header />
        <main class="notFound">
            <h1 class="notFound__title">4<svg class="notFound__logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="var(--color-text-primary)"/><rect x="19" y="8" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="19" y="9.33337" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="17.6666" y="9.33337" width="1.33333" height="1.33333" fill="#06D6D6"/><rect x="16.3334" y="12" width="1.33333" height="1.33333" fill="#06D6D6"/><rect x="15" y="13.3334" width="1.33333" height="1.33333" fill="#06D6D6"/><rect x="13.6666" y="14.6666" width="1.33333" height="1.33333" fill="#06D6D6"/><rect x="12.3334" y="16" width="1.33333" height="1.33333" fill="#06D6D6"/><rect x="9.66663" y="17.3334" width="1.33333" height="1.33333" fill="#06D6D6"/><rect x="19" y="10.6666" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="17.6666" y="10.6666" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="17.6666" y="13.3334" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="16.3334" y="13.3334" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="16.3334" y="14.6666" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="15" y="14.6666" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="13.6666" y="16" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="13.6666" y="17.3334" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="11" y="17.3334" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="11" y="18.6666" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="9.66663" y="18.6666" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="8.33337" y="18.6666" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="7" y="18.6666" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="7" y="20" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="7" y="21.3334" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="9.66663" y="20" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="20.3334" y="8" width="1.33333" height="1.33333" fill="#05B3B3"/><rect x="21.6666" y="8" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="21.6666" y="9.33337" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="23" y="9.33337" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="23" y="10.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="20.3334" y="9.33337" width="1.33333" height="1.33333" fill="#025555"/><rect x="17.6666" y="12" width="1.33333" height="1.33333" fill="#025555"/><rect x="19" y="14.6666" width="1.33333" height="1.33333" fill="#025555"/><rect x="15" y="16" width="1.33333" height="1.33333" fill="#025555"/><rect x="13.6666" y="20" width="1.33333" height="1.33333" fill="#025555"/><rect x="8.33337" y="20" width="1.33333" height="1.33333" fill="#025555"/><rect x="12.3334" y="17.3334" width="1.33333" height="1.33333" fill="#025555"/><rect x="23" y="12" width="1.33333" height="1.33333" fill="#025555"/><rect x="23" y="13.3334" width="1.33333" height="1.33333" fill="#025555"/><rect x="12.3334" y="22.6666" width="1.33333" height="1.33333" fill="#025555"/><rect x="21.6666" y="10.6666" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="20.3334" y="10.6666" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="20.3334" y="12" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="19" y="12" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="19" y="13.3334" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="17.6666" y="14.6666" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="17.6666" y="16" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="16.3334" y="16" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="16.3334" y="17.3334" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="15" y="17.3334" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="13.6666" y="18.6666" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="12.3334" y="18.6666" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="12.3334" y="20" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="11" y="20" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="9.66663" y="21.3334" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="8.33337" y="21.3334" width="1.33333" height="1.33333" fill="#049A9A"/><rect x="21.6666" y="12" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="21.6666" y="13.3334" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="20.3334" y="13.3334" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="20.3334" y="14.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="21.6666" y="14.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="20.3334" y="16" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="19" y="16" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="19" y="17.3334" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="17.6666" y="17.3334" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="17.6666" y="18.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="16.3334" y="18.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="15" y="18.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="15" y="20" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="15" y="21.3334" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="13.6666" y="21.3334" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="11" y="21.3334" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="11" y="22.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="9.66663" y="22.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="8.33337" y="22.6666" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="12.3334" y="21.3334" width="1.33333" height="1.33333" fill="#037C7C"/><rect x="16.3334" y="20" width="1.33333" height="1.33333" fill="#037C7C"/></svg>4</h1>
            <p class="notFound__description">It looks you're lost. We don't know what are you looking for, but you can go back or home</p>
            <div class="notFound__controls">
                <component-button view="primary" text="go back" @on-click="router.go(-1)" />
                <component-button view="primary" text="go home" href="/" />
            </div>
        </main>
    </div>
</template>

<script setup>
    import router from '@/router'
    
    import ComponentHeader from '@/components/ComponentHeader'
    import ComponentButton from '@/components/ComponentButton'
</script>

<style scoped>
.notFound {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.notFound__title {
    display: flex;
    gap: var(--space-xs);
    margin-bottom: var(--space-xs);
    font-size: var(--size-text-5xl);
}

.notFound__description {
    margin-bottom: var(--space-xl);
    font-size: var(--size-text-l);
    text-align: center;
    max-width: 30ch;
}

.notFound__logo {
    width: var(--size-text-5xl);
    aspect-ratio: 1/1;
}

.notFound__controls {
    display: flex;
    gap: var(--space-m);
}
</style>