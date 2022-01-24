<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";

import { defineComponent, ref, onMounted } from "vue";
import RecordForm from '@/components/RecordForm.vue'
import QrPayment from '@/components/QrPayment.vue'
import { useEmitter } from '@/emitter';
import { modal } from '@/helpers/summoners';


export default defineComponent({
    name: "App",
    components: {
        IonApp,
        IonRouterOutlet,
    },
    setup(){
        const emitter = useEmitter()
        const modalPresenter = ref<any>();
        
        // eslint-disable-next-line
        let recordFormModal: HTMLIonModalElement | null = null;
        // eslint-disable-next-line
        let qrPaymentModal: HTMLIonModalElement | null = null;

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

        return{}
    }
});
</script>