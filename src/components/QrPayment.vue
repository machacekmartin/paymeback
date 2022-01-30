<template>
    <ion-header :translucent="true" :collapse="true">
        <ion-toolbar>
            <ion-title class="ion-text-left ion-no-padding ion-padding-start">QR Payment</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="close()">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="false">
        <qrcode-vue class="qr" :value="qrString" renderAs="svg"></qrcode-vue>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonContent } from "@ionic/vue";
import { useEmitter } from '@/emitter';
import { useStore } from '@/store';
import QrcodeVue from 'qrcode.vue'


export default defineComponent({
    components: {
        IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonContent, QrcodeVue
    },
    props: {
        recordId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const emitter = useEmitter()
        const store = useStore()
        
        const qrString = ref<string>('')

        const close = () => {
            emitter.emit('close-qr-payment-modal')
        }
        
        //qrString.value = 'SPD*1.0*ACC:CZ2806000000000168540115*AM:450.00*CC:CZK*MSG:PLATBA ZA ZBOZI*X-VS:1234567890'

        onMounted(() => {
            const record = store.getters.records.find(record => record.id === props.recordId)
            qrString.value = 'SPD*1.0*ACC:CZ2806000000000168540115*AM:' + record?.price + '*CC:'+ record?.currency + '*MSG:' + record?.description + '*X-VS:123'
        })
        return {
            close,
            qrString
        } 
    },
})
</script>

<style>
.qr-modal{
    --background: rgba(var(--ion-background-color-rgb), .8);
}
.qr-modal .ion-page{
    width: 90%;
    height: 450px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: .5rem;
    background-color: var(--ion-color-step-100);
    overflow: hidden;
}
</style>
<style scoped>
.qr{
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 2rem;
    border-radius: 0 0 .5rem .5rem;
    background: var(--ion-color-dark);
}
</style>
