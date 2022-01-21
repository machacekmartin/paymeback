<template>
    <ion-modal
        :isOpen="active"
        :swipeToClose="true"
        :presentingElement="modalPresenter"
        @didDismiss="close"
    >
        <ion-header :translucent="true" :collapse="true">
            <ion-toolbar>
                <ion-title class="ion-text-center">Add new debtor</ion-title>
                <ion-buttons slot="start">
                    <ion-button @click="close()">Close</ion-button>
                </ion-buttons>
                <ion-button type="submit" slot="end" @click="submit()">Add</ion-button>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-toolbar>
                <segment-selector :disabled="!debtorsAsOptions.length" :options="formSegments" v-model="activeSegment"></segment-selector>
            </ion-toolbar>

            <template v-if="activeSegment == 'existing'">
                <ion-item>
                    <ion-label position="fixed">Person</ion-label>
                    <option-selector :options="debtorsAsOptions" placeholder="Select a person.." type="action-sheet" v-model="formData.debtorId"></option-selector>
                </ion-item>
            </template>

            <template v-else-if="activeSegment == 'new'">
                <ion-item :class="{ 'error': errors.includes('name') }">
                    <ion-label position="fixed">Name</ion-label>
                    <ion-input :autocapitalize="true" placeholder="His / Her name" type="text" v-model="debtorName"></ion-input>
                </ion-item>
            </template>

            <ion-item>
                <ion-label position="fixed">Note</ion-label>
                <ion-input :autocapitalize="true" placeholder="Some description" type="text" v-model="formData.description"></ion-input>
            </ion-item>

            <ion-item :class="{ 'error': errors.includes('price') }">
                <ion-label position="fixed">Amount</ion-label>
                <ion-input  type="number" inputMode="numeric" :placeholder="389" v-model.number="formData.price" :required="true"></ion-input>
                <option-selector :options="currenciesAsOptions" placeholder="Select a person.." type="action-sheet"  v-model="formData.currencyId"></option-selector>
            </ion-item>

            <date-time-input type="date" label="Date" @update="(value) => formData.date = value" :value="formData.date"></date-time-input>
            <date-time-input type="time" label="Time" @update="(value) => formData.time = value" :value="formData.time"></date-time-input>
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
import { defineComponent, ref, onMounted, reactive, watch, computed } from "vue";
import DateTimeInput from "@/components/inputs/DateTimeInput.vue";
import SegmentSelector from "@/components/inputs/SegmentSelector.vue";
import OptionSelector from '@/components/inputs/OptionSelector.vue'

import { useStore, currencies } from '@/store'
import { RecordsActionTypes } from "@/store/records/actions";
import { DebtorsActionTypes } from "@/store/debtors/actions";

import { TSelectorOption, TRecord, TDebtor, TSegment } from '@/types'
import { Record, Debtor } from '@/classes'
import { convertToOptions } from '@/helpers/convertor'

import { listOutline, personOutline } from 'ionicons/icons';

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
        const store = useStore();
        
        const debtorsAsOptions = computed(() => convertToOptions(store.getters.debtors, 'id', 'name'))
        const currenciesAsOptions: Array<TSelectorOption> = convertToOptions(currencies, 'id', 'short')
        const formSegments: Array<TSegment> = [
            {
                text: 'Existing person',
                value: 'existing',
                icon: listOutline
            },
            {   
                text: 'New person',
                value: 'new',
                icon: personOutline
            }
        ];

        const modalPresenter = ref<HTMLElement | null>();
        const activeSegment = ref<string>(debtorsAsOptions.value.length > 0 ? formSegments[0].value : formSegments[1].value)

        const debtorName = ref<string>('')
        const formData = reactive<TRecord>(new Record)

        const errors = ref<Array<string>>([])
        
        const close = (): void => {
            context.emit("close");
            errors.value = []
        };

        const isFormValid = (): boolean => {
            errors.value = [];
            let valid = true

            if (debtorName.value === '' && activeSegment.value == formSegments[1].value){
                errors.value.push('name')
                valid = false
            }
            if (!formData.price){
                errors.value.push('price')
                valid = false
            }

            return valid
        }

        const submit = (): void => {
            if (!isFormValid())
                return

            if (activeSegment.value == 'new'){
                const debtor: TDebtor = new Debtor(debtorName.value);
                store.dispatch(DebtorsActionTypes.ADD_DEBTOR, debtor);
                formData.debtorId = debtor.id
            }
            store.dispatch(RecordsActionTypes.ADD_RECORD, { ...formData })
            context.emit("close")
        }

        watch(() => props.active, () => {
            if (props.active) {
                Object.assign(formData, new Record)
                activeSegment.value = debtorsAsOptions.value.length > 0 ? formSegments[0].value : formSegments[1].value
                debtorName.value = ''
            }
        })
        onMounted(() => {
            modalPresenter.value = document.getElementById("router");
        });

        return {
            modalPresenter,
            currenciesAsOptions,
            debtorsAsOptions,
            formSegments,
            
            activeSegment,
            debtorName,
            formData,
            errors,
            submit,
            close,         
            
            //icons
            listOutline, personOutline,
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
    border: solid 1px transparent;
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

.error{
    transition: .15s ease-in-out;
    border: solid 1px rgba(var(--ion-color-danger-rgb), .3);
    background-color: rgba(var(--ion-color-danger-rgb), .15);
}
</style>