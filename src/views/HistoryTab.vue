<template>
    <ion-page>
        <ion-header collapse="fade" :translucent="true" mode="ios">
            <ion-toolbar>
                <ion-title>History</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense"  class="ion-margin-bottom" >
                <ion-toolbar>
                    <ion-title size="large">History</ion-title>
                </ion-toolbar>
            </ion-header>

            <past-record-card 
                v-for="record in pastRecords" 
                :key="record.id"
                :debtorName="debtors.find(debtor => debtor.id === record.debtorId).name"
                :price="record.price"
                :description="record.description"
                :currency="record.currency"
                :datetime="record.datetime"
                :paybackDatetime="record.paybackDatetime">
            </past-record-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
} from "@ionic/vue";
import { defineComponent, computed } from "vue";
import PastRecordCard from '@/components/PastRecordCard.vue'
import { useStore } from '@/store'

export default defineComponent({
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        PastRecordCard
    },
    setup(){
        const store = useStore()
        const pastRecords = computed(() => store.getters.records.filter(record => record.paybackDatetime !== undefined))
        const debtors = computed(() => store.getters.debtors)

        return {
            pastRecords,
            debtors
        }
    }
});
</script>