<template>
    <ion-page>
        <ion-header collapse="fade">
            <ion-toolbar>
                <ion-title>You Owe Me</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title slot="start" size="large">You Owe Me</ion-title>
                    <ion-button slot="end" color="tertiary" @click="openModal()">
                        <ion-icon :icon="add"></ion-icon>
                    </ion-button>
                </ion-toolbar>
            </ion-header>
            <transition-group name="record">
                <record-card
                    class="record"
                    v-for="record in records"  :key="record.id"
                    :date="record.date"
                    :time="record.time"
                    :debtorName="debtors.find(debtor => debtor.id === record.debtorId).name"
                    :price="record.price"
                    :description="record.description"
                    :currency="record.currency"
                    @delete="removeRecord(record.id)"
                    @click="recordClicked()">
                </record-card>     
            </transition-group>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from "@ionic/vue";

import RecordCard from "@/components/RecordCard.vue";

import { useEmitter } from '@/emitter';
import { useStore } from '@/store';
import { RecordsActionTypes } from '@/store/records/actions'

import { add, cashOutline } from "ionicons/icons";

export default defineComponent({
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        IonIcon,
        IonButton,
        RecordCard,
    },

    setup() {
        const emitter = useEmitter()
        const store = useStore()
        const records = computed(() => store.getters.records)
        const debtors = computed(() => store.getters.debtors)

        const removeRecord = (id: string): void => {
            store.dispatch(RecordsActionTypes.REMOVE_RECORD, id)
        };

        const openModal = (): void => {
            emitter.emit('create-modal-open')
        };

        const recordClicked = (): void => {
            console.log("clicked box")
        }

        return {
            records,
            debtors,
            removeRecord,
            openModal,
            recordClicked,

            // icons
            add, cashOutline,
        };
    },

});
</script>

<style scoped>
.record {
    transition: opacity .2s, transform .3s;
    margin: .5rem 0;
}
.record-enter-from,
.record-leave-to {
    opacity: 0;
    transform: translate(-150px, 40px);
}
.record-leave-active {
    margin-left: -10px;
    position: absolute;
}

</style>