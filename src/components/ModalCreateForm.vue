<template>
    <ion-modal
        :isOpen="active"
        :swipeToClose="true"
        :presentingElement="modalPresenter"
        @didDismiss="close"
    >
        <ion-header :translucent="true" :collapse="true">
            <ion-toolbar>
                <ion-title>Add new debtor</ion-title>
                <ion-buttons slot="start">
                    <ion-button @click="close()">Close</ion-button>
                </ion-buttons>
                <ion-button slot="end" @click="close()">Add</ion-button>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-toolbar>
                <segment-selector :options="formSegments" @changed="(value) => activeSegment = value"></segment-selector>
            </ion-toolbar>

            <template v-if="activeSegment == 'existing'">
                <ion-item>
                    <ion-label position="fixed">Person</ion-label>
                    <option-selector :options="debtorsAsOptions" placeholder="Select a person.." type="action-sheet"></option-selector>
                </ion-item>
            </template>

            <template v-else-if="activeSegment == 'new'">
                <ion-item>
                    <ion-label position="fixed">Name</ion-label>
                    <ion-input placeholder="Martin Macháček" type="text"></ion-input>
                </ion-item>
            </template>

            <ion-item>
                <ion-label position="fixed">Note</ion-label>
                <ion-input placeholder="IDK.. type anything here" type="text"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label position="fixed">Amount</ion-label>
                <ion-input :clearInput="true" type="number" inputMode="numeric" placeholder="1490"></ion-input>
                <option-selector :options="currenciesAsOptions" placeholder="Select a person.." type="action-sheet"></option-selector>
            </ion-item>

            <date-time-input type="date" label="Date" @update="null"></date-time-input>
            <date-time-input type="time" label="Time" @update="null"></date-time-input>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts">
import {
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonModal,
    IonItem,
    IonLabel,
    IonInput,

} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { listOutline, personOutline } from "ionicons/icons";

import DateTimeInput from "@/components/inputs/DateTimeInput.vue";
import SegmentSelector from "@/components/inputs/SegmentSelector.vue";
import OptionSelector from '@/components/inputs/OptionSelector.vue'

import { ISelectorOption } from '@/interfaces'
import { currencies, debtors, formSegments } from '@/store'
import { convertToOptions } from '@/helpers/convertor'

export default defineComponent({
    components: {
        IonModal,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonButton,
        IonHeader,
        IonContent,
        IonItem,
        IonLabel,
        IonInput,

        DateTimeInput,
        SegmentSelector,
        OptionSelector
    },
    emits: ["close"],
    props: {
        active: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, context) {
        const currenciesAsOptions: Array<ISelectorOption> = convertToOptions(currencies, 'id', 'short')
        const debtorsAsOptions: Array<ISelectorOption> = convertToOptions(debtors, 'id', 'name')

        const activeSegment = ref<string>(formSegments[0].value)
        const modalPresenter = ref<HTMLElement | null>();

        const close = (): void => {
            context.emit("close");
        };

        onMounted(() => {
            modalPresenter.value = document.getElementById("router");
        });

        return {
            currenciesAsOptions,
            debtorsAsOptions,
            formSegments,
            
            modalPresenter,
            activeSegment,
            close,

            // icons
            listOutline, personOutline
        };
    },
});
</script>

<style scoped>
ion-content {
    --padding-bottom: 100px;
}
ion-item {
    --padding-start: 0;
    --background: transparent;
    --inner-padding-end: 0px;
}
ion-label {
    padding: 0.5rem 1rem;
    font-weight: bold;
}
ion-segment {
    margin: 0.5rem auto;
}
ion-segment-button {
    padding: 0.25rem;
}
</style>