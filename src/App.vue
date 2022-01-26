<template>
    <ion-app>
        <ion-router-outlet v-if="introPassed" />
    </ion-app>
    <transition name="fade">
        <intro-slides v-if="!introPassed"></intro-slides>  
    </transition>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { useEmitter } from '@/emitter';
import { modal } from '@/helpers/summoners';

import RecordForm from '@/components/RecordForm.vue'
import QrPayment from '@/components/QrPayment.vue'
import IntroSlides from '@/components/IntroSlides.vue'

export default defineComponent({
    name: "App",
    components: {
        IonApp,
        IntroSlides,
        IonRouterOutlet,
    },
    setup(){
        const emitter = useEmitter()
        const modalPresenter = ref<any>();
        const introPassed = ref<boolean>(false)
        
        // eslint-disable-next-line
        let recordFormModal: HTMLIonModalElement | null = null;
        // eslint-disable-next-line
        let qrPaymentModal: HTMLIonModalElement | null = null;

        emitter.on('complete-intro', async () => {
            introPassed.value = true
        })
        emitter.on('open-record-form-modal', async () => {
            recordFormModal = await modal({ component: RecordForm, swipeToClose: true, presentingElement: modalPresenter.value })
        })
        emitter.on('close-record-form-modal', () => {
            recordFormModal?.dismiss()
        })
        emitter.on('open-qr-payment-modal', async (recordId: string) => {
            qrPaymentModal = await modal({ component: QrPayment, componentProps: { recordId: recordId }, cssClass: 'qr-modal', swipeToClose: true })
        })
        emitter.on('close-qr-payment-modal', () => {
            qrPaymentModal?.dismiss()
        })

        onMounted(() => {
            modalPresenter.value = document.getElementById("router")
        })

        return{
            introPassed
        }
    }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: .5s;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
    transform: translateY(-5%)
}
</style>

