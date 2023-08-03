<template>
    <component-header />
    <main class="content content__main">
        <ul class="picklesList">
            <component-pickle-preview v-for="pickle in pickles" :key="pickle.id" :pickle="pickle" />
        </ul>
    </main>
    <div class="controlPanelWrapper">
        <div class="controlPanel">
            <component-button view="clear" iconOnly>
                <icon-tutorial size="m" />
            </component-button>
                
            <div class="controlPanel_divider"></div>
            <fieldset class="choiceGroup">
                <label class="choiceGroup_item" for="difficultyAll">
                    <input class="choiceGroup_input" type="radio" id="difficultyAll" value="all" name="difficulty" v-model="checkedDifficulty" checked />
                    all
                </label>

                <label class="choiceGroup_item" for="difficultyEasy">
                    <input class="choiceGroup_input" type="radio" id="difficultyEasy" value="easy" name="difficulty" v-model="checkedDifficulty" />
                    easy
                </label>

                <label class="choiceGroup_item" for="difficultyMedium">
                    <input class="choiceGroup_input" type="radio" id="difficultyMedium" value="medium" name="difficulty" v-model="checkedDifficulty" />
                    medium
                </label>
                
                <label class="choiceGroup_item" for="difficultyHard">
                    <input class="choiceGroup_input" type="radio" id="difficultyHard" value="hard" name="difficulty" v-model="checkedDifficulty" />
                    hard
                </label>
            </fieldset>
            <div class="controlPanel_divider"></div>
            <fieldset class="choiceGroup">
                <label class="choiceGroup_item" for="typeAll">
                    <input class="choiceGroup_input" type="radio" id="typeAll" value="all" name="type" v-model="checkedType" checked />
                    all
                </label>

                <label class="choiceGroup_item" for="typeColor">
                    <input class="choiceGroup_input" type="radio" id="typeColor" value="color" name="type" v-model="checkedType" />
                    color
                </label>

                <label class="choiceGroup_item" for="typeBW">
                    <input class="choiceGroup_input" type="radio" id="typeBW" value="bW" name="type" v-model="checkedType" />
                    black&white
                </label>
            </fieldset>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref, watch } from 'vue'
    // import { useStorage } from '@vueuse/core'
    
    import ComponentHeader from '@/components/ComponentHeader'
    import ComponentPicklePreview from '@/components/ComponentPicklePreview'
    import IconTutorial from '@/components/icons/IconTutorial'
    
    import { useUserStore } from '@/stores/UserStore';
    import { usePicklesStore } from '@/stores/PicklesStore';
    
    const picklesStore = usePicklesStore()
    picklesStore.fill()
    
    const userStore = useUserStore()
    userStore.fill()
    
    const usersPickles = reactive(picklesStore.pickles.filter(pickle => pickle.published == true))
    let pickles = usersPickles

    const checkedDifficulty = ref(localStorage.getItem('difficulty') || 'all')
    const checkedType = ref(localStorage.getItem('type') || 'all')
    
    const filterPickleList = (checkedDifficulty, checkedType, newDifficulty, newType) => {
        let difficulty = newDifficulty || checkedDifficulty || localStorage.getItem('difficulty') || 'all'
        let type = newType || checkedType || localStorage.getItem('type') || 'all'
        
        pickles = usersPickles
        localStorage.setItem('difficulty', difficulty)
        localStorage.setItem('type', type)

        if(difficulty === 'easy') pickles = reactive(pickles.filter(pickle => pickle.difficulty < 3))
        else if(difficulty === 'medium') pickles = reactive(pickles.filter(pickle => pickle.difficulty == 3))
        else if(difficulty === 'hard') pickles = reactive(pickles.filter(pickle => pickle.difficulty > 3))

        if(type === 'color') pickles = reactive(pickles.filter(pickle => pickle.color == true))
        else if(type === 'bw') pickles = reactive(pickles.filter(pickle => pickle.color == false))
    }

    watch([checkedDifficulty, checkedType], ([newDifficulty, newType]) => {
        filterPickleList(checkedDifficulty, checkedType, newDifficulty, newType)
    })

    filterPickleList()
</script>

<style scoped>
    .picklesList {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        align-items: start;
        gap: var(--space-m);
        padding: 0;
        list-style: none;
    }
    @media screen and (max-width: 1000px) {
        .picklesList {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
    @media screen and (max-width: 700px) {
        .picklesList {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media screen and (max-width: 600px) {
        .picklesList {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media screen and (max-width: 400px) {
        .picklesList {
            grid-template-columns: 1fr;
        }
    }
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
    .picklePreview_name {
        margin-bottom: var(--space-s);
    }
    .picklePreview_matrix {
        aspect-ratio: var(--width) / var(--height);
        box-shadow: 0 0 0 1px var(--color-border-primary);
        border-radius: 2px;
        background: linear-gradient(-90deg, var(--color-border-primary) 1px, transparent 1px) 0 0 / calc((100% + 1px) / var(--width)) 100%,
                    linear-gradient(180deg, var(--color-border-primary) 1px, transparent 1px) 0 -1px / 100% calc((100% + 1px) / var(--height));
    }
    .picklePreview_footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--space-s);
    }
    .picklePreview_rating {
        display: flex;
        align-items: center;
        gap: var(--space-2xs);
        color: var(--color-text-primary);
        font-size: var(--size-text-s);
    }
    .picklePreview_link {
        position: absolute;
        top: 0; left: 0;
        display: block;
        width: 100%; height: 100%;
    }
    .content__main {
        padding: var(--space-m) var(--space-xl) var(--space-3xl);
    }
    .controlPanelWrapper {
        position: sticky;
        bottom: var(--space-l); left: 50%;
        display: flex;
        justify-content: center;
    }
    .controlPanel {
        display: flex;
        width: fit-content;
        align-items: center;
        gap: var(--space-2xs);
        padding: var(--space-2xs);
        border-radius: 99em;
        border: 1px solid var(--color-border-secondary);
        background: color(var(--color-bg-primary) / .2);
        backdrop-filter: blur(20px);
    }
    .controlPanel_divider {
        height: 20px; width: 1px;
        background-color: var(--color-border-primary);
    }
</style>