<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-align-items-center">
                    <ion-icon :icon="cashOutline" style="color: red"></ion-icon>
                    You Owe Me
                </ion-title>
                <ion-button class="ion-margin-horizontal md-only" slot="end" color="tertiary" @click="openModal()">
                    <ion-icon :icon="add"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header collapse="condense" class="ion-margin-bottom">
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
                    :currency="currencies.find(currency => currency.id === record.currencyId).short"
                    @delete="removeRecord(record.id)">
                </record-card>     
            </transition-group>
        </ion-content>
        <modal-create-form
            @close="closeModal()"
            :active="isModalOpen"
        ></modal-create-form>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
} from "@ionic/vue";

import RecordCard from "@/components/RecordCard.vue";
import ModalCreateForm from "@/components/ModalCreateForm.vue";
import { add, cashOutline } from "ionicons/icons";
import { ref, defineComponent, computed } from "vue";
import { useStore } from '@/store';
import { RecordsActionTypes } from '@/store/records/actions'
import { currencies } from '@/store'
import { convertToOptions } from '@/helpers/convertor'


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
        ModalCreateForm,
    },

    setup() {
        const store = useStore()
        const currenciesAsOptions = convertToOptions(currencies, 'id', 'short')

        const removeRecord = (id: string): void => {
            store.dispatch(RecordsActionTypes.REMOVE_RECORD, id)
            
        };

        let isModalOpen = ref<boolean>(false);
        const closeModal = (): void => {
            isModalOpen.value = false;
        };
        const openModal = (): void => {
            isModalOpen.value = true;
            console.log()
        };

        return {
            currencies,
            currenciesAsOptions,
            isModalOpen,

            removeRecord,
            closeModal,
            openModal,

            // icons
            add,
            cashOutline,

            records: computed(() => store.getters.records),
            debtors: computed(() => store.getters.debtors),
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
ion-toolbar.ios .md-only{
    display: none;
}


</style>