<template>
    <ion-app>
        <ion-router-outlet />
        <modal-create-form :active="isCreateModalOpen"></modal-create-form>
    </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import ModalCreateForm from '@/components/ModalCreateForm.vue'

import { useEmitter } from '@/emitter';

export default defineComponent({
    name: "App",
    components: {
        IonApp,
        IonRouterOutlet,
        ModalCreateForm
    },
    setup(){
        const emitter = useEmitter()
        const isCreateModalOpen = ref<boolean>(false)

        emitter.on('create-modal-close', () => {
            isCreateModalOpen.value = false
        })
        emitter.on('create-modal-open', () => {
            isCreateModalOpen.value = true
        })

        return{
            isCreateModalOpen
        }
    }
});
</script>