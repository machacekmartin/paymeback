<template>
    <ion-page>
        <ion-header collapse="fade" :translucent="true" mode="ios">
            <ion-toolbar>
                <ion-title slot="start">You Owe Me</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">You Owe Me</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="content">
                <transition-group name="record">
                    <record-card
                        class="record"
                        v-for="record in currentRecords" :key="record.id"
                        :debtorName="debtors.find(debtor => debtor.id === record.debtorId)?.name || 'unknown'"
                        :price="record.price || 0"
                        :description="record.description"
                        :currency="record.currency"
                        :datetime="record.datetime"
                        @delete="removeRecord(record.id)"
                        @activate="showQR(record.id)">
                    </record-card>
                </transition-group>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";

import RecordCard from "@/components/RecordCard.vue";

import { useEmitter } from '@/emitter'
import { useStore } from '@/store'
import { RecordsActionTypes } from '@/store/records/actions'
import { toast } from '@/helpers/summoners'

import { add, cashOutline, trashOutline, warning} from "ionicons/icons";

export default defineComponent({
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        RecordCard,
    },

    setup() {
        const emitter = useEmitter()
        const store = useStore()
        const currentRecords = computed(() => store.getters.records.filter(record => record.paybackDatetime === undefined))
        const debtors = computed(() => store.getters.debtors)

        const removeRecord = async (id: string): Promise<void> => {
            store.dispatch(RecordsActionTypes.PAYBACK_RECORD, id)
            await toast('Succesfully deleted', trashOutline)
        };

        const showQR = (recordId: string): void => {
            if (store.getters.iban == null) {
                toast('Please set your IBAN first (in settings)', warning)
                return
            }

            emitter.emit('open-qr-payment-modal', recordId)
        }

        return {
            currentRecords,
            debtors,
            removeRecord,
            showQR,

            // icons
            add, cashOutline,
        };
    },

});
</script>

<style scoped>
.content{
    position: relative;
    margin: 1rem .5rem 0;
}
.record {
    width: 100%;
    margin-bottom: .5rem;
    transition: opacity .3s, transform .5s;
}
.record-enter-from,
.record-leave-to {
    opacity: 0;
    transform: translate(-150px, 40px);
}
.record-leave-active {
    position: absolute;
}

</style>
