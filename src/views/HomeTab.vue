<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-align-items-center">
                    <ion-icon :icon="cashOutline" style="color: red"></ion-icon>
                    You Owe Me
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">You Owe Me</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col class="ion-padding">
                        <div>
                            <span>Current Balance</span>
                            <h1 class="ion-no-margin">1,500€</h1>
                        </div>
                    </ion-col>
                    <ion-col size="auto" class="ion-padding">
                        <option-selector
                            :options="currenciesAsOptions"
                            placeholder="Currency"
                            type="action-sheet"
                        ></option-selector>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <transition-group name="records">
                <ion-row v-for="(record, index) in records" :key="record.id" class="debtor">
                    <ion-col class="ion-no-margin ion-margin-top ion-margin-horizontal">
                        <record-card
                            :date="record.date"
                            :debtorName="debtors.find(debtor => debtor.id === record.debtorId).name"
                            :price="record.price"
                            :description="record.description"
                            :currency="currencies.find(currency => currency.id === record.currencyId).short"
                            :id="record.id"
                            @delete="removeRecord(index)">
                        </record-card>
                    </ion-col>
                </ion-row>
            </transition-group>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button color="primary" @click="openModal()">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
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
    IonFab,
    IonFabButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
} from "@ionic/vue";
import OptionSelector from "@/components/inputs/OptionSelector.vue";
import RecordCard from "@/components/RecordCard.vue";
import ModalCreateForm from "@/components/ModalCreateForm.vue";
import { add, cashOutline } from "ionicons/icons";
import { ref, defineComponent } from "vue";

import { records, currencies, debtors } from '@/store'
import { convertToOptions } from '@/helpers/convertor'

export default defineComponent({
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        IonFab,
        IonFabButton,
        IonGrid,
        IonRow,
        IonCol,
        IonIcon,

        OptionSelector,
        RecordCard,
        ModalCreateForm,
    },

    setup() {
        const currenciesAsOptions = convertToOptions(currencies, 'id', 'short')

        const removeRecord = (index: number): void => {
            records.splice(index, 1);
        };

        let isModalOpen = ref<boolean>(false);
        const closeModal = (): void => {
            isModalOpen.value = false;
        };
        const openModal = (): void => {
            isModalOpen.value = true;
        };

        return {
            records,
            debtors,
            currencies,
            currenciesAsOptions,
            isModalOpen,

            removeRecord,
            closeModal,
            openModal,

            // icons
            add,
            cashOutline,
        };
    },
});
</script>

<style scoped>
.records {
    transition: opacity 0.2s, transform 0.3s;
}
.records-enter,
.records-leave-to {
    opacity: 0;
    transform: translate(-150px, 40px);
}
.records-leave-active {
    margin-left: 10px;
    position: absolute;
}
</style>