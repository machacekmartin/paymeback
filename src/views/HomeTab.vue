<template>
    <ion-page>
        <ion-header collapse="fade" :translucent="true" mode="ios">
            <ion-toolbar>
                <ion-title slot="start">You Owe Me</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header class="ion-margin-top ion-padding-top" collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">You Owe Me</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="content">
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
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";

import RecordCard from "@/components/RecordCard.vue";

import { useStore } from '@/store';
import { RecordsActionTypes } from '@/store/records/actions'
import { toast } from '@/helpers/toast-summoner'

import { add, cashOutline, trashOutline } from "ionicons/icons";

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
        const store = useStore()
        const records = computed(() => store.getters.records)
        const debtors = computed(() => store.getters.debtors)

        const removeRecord = async (id: string): Promise<void> => {
            store.dispatch(RecordsActionTypes.REMOVE_RECORD, id)
            await toast('Succesfully deleted', trashOutline)

        };

        const recordClicked = (): void => {
            console.log("clicked box")
        }

        return {
            records,
            debtors,
            removeRecord,
            recordClicked,

            // icons
            add, cashOutline,
        };
    },

});
</script>

<style scoped>
.content{
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    padding: 1rem .5rem 0;
}
.record {
    width: 100%;
    margin-bottom: .5rem;
    transition: opacity .2s, transform .3s;
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