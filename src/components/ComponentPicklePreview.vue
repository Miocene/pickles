<template>
    <li class="picklePreview">
        <h3 class="text text_size-m text_view-primary text_weight-bold picklePreview__name">{{ pickle.id }}</h3>
        <div class="picklePreview__matrix" :style="{ '--width': pickle.solution[0].length, '--height': pickle.solution.length }"></div>
        <div class="picklePreview__footer">
            <div class="picklePreview__rating">
                <icon-heart size="s" />
                {{ props.pickle.likes }}
            </div>
            <div v-if="props.pickle.difficulty == '1'" class="text text_size_s text_view-easy">easy-peasy</div>
            <div v-else-if="props.pickle.difficulty == '2'" class="text text_size_s text_view-easy">easy</div>
            <div v-else-if="props.pickle.difficulty == '3'" class="text text_size_s text_view-medium">medium</div>
            <div v-else-if="props.pickle.difficulty == '4'" class="text text_size_s text_view-hard">hard</div>
            <div v-else-if="props.pickle.difficulty >= '5'" class="text text_size_s text_view-hard">really hard</div>
        </div>
        <a :href="`/pickle/${pickle.id}`" class="picklePreview__link"></a>
    </li>
</template>

<script setup>
    import { defineProps } from 'vue';
    import IconHeart from '@/components/icons/IconHeart'
    
    const props = defineProps({ pickle: Object })
</script>

<style scoped>
    .picklePreview {
        position: relative;
        padding: var(--space-m);
        border-radius: 12px;
        background-color: var(--color-bg-secondary);
        transition: translate 0.25s ease;
        overflow: hidden;
    }
    .picklePreview:hover {
        translate: 0 -8px;
    }
    .picklePreview:has(a:focus) {
        translate: 0 -8px;
        box-shadow: inset 0 0 0 2px var(--color-component-outline);
    }
    .picklePreview__name {
        margin-bottom: var(--space-s);
    }
    .picklePreview__matrix {
        aspect-ratio: var(--width) / var(--height);
        box-shadow: 0 0 0 1px var(--color-border-primary);
        border-radius: 2px;
        background: linear-gradient(-90deg, var(--color-border-primary) 1px, transparent 1px) 0 0 / calc((100% + 1px) / var(--width)) 100%,
                    linear-gradient(180deg, var(--color-border-primary) 1px, transparent 1px) 0 -1px / 100% calc((100% + 1px) / var(--height));
    }
    .picklePreview__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--space-s);
    }
    .picklePreview__rating {
        display: flex;
        align-items: center;
        gap: var(--space-2xs);
        color: var(--color-text-primary);
        font-size: var(--size-text-s);
    }
    .picklePreview__link {
        position: absolute;
        top: 0; left: 0;
        display: block;
        width: 100%; height: 100%;
    }
</style>