<template>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title class="ion-text-center">Add new record</ion-title>
                <ion-buttons slot="start">
                    <ion-button @click="close()">Close</ion-button>
                </ion-buttons>
                <ion-button type="submit" slot="end" color="tertiary" size="default" @click="submit()">
                    <ion-icon :icon="checkmarkOutline"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-toolbar>
                <segment-selector :disabled="!debtorsAsOptions.length" :options="formSegments" v-model="activeSegment"></segment-selector>
            </ion-toolbar>
            <template v-if="activeSegment == 'existing'">
                <ion-item>
                    <ion-label>
                        <ion-icon size="small" :icon="listOutline"></ion-icon>
                        <ion-text>Person</ion-text>
                    </ion-label>
                    <option-selector :options="debtorsAsOptions" placeholder="Select a person.." interface="action-sheet" v-model="formData.debtorId"></option-selector>
                </ion-item>
            </template>
            <template v-else-if="activeSegment == 'new'">
                <ion-item :class="{ 'error': errors.includes('name') }">
                    <ion-label>
                        <ion-icon size="small" :icon="personOutline"></ion-icon>
                        <ion-text>Name</ion-text>
                    </ion-label>
                    <ion-input :autocapitalize="true" placeholder="..." type="text" v-model="debtorName"></ion-input>
                </ion-item>
            </template>
            <ion-item>
                <ion-label>
                    <ion-icon size="small" :icon="chatboxOutline"></ion-icon>
                    <ion-text>Note</ion-text>
                </ion-label>
                <ion-input :autocapitalize="true" placeholder="..." type="text" v-model="formData.description"></ion-input>
            </ion-item>
            <ion-item :class="{ 'error': errors.includes('price') }">
                <ion-label>
                    <ion-icon size="small" :icon="cashOutline"></ion-icon>
                    <ion-text>Price</ion-text>
                </ion-label>
                <ion-input type="number" inputMode="numeric" :placeholder="389" v-model.number="formData.price" :required="true"></ion-input>
                <option-selector :options="currenciesAsOptions" placeholder="Currency" interface="action-sheet" v-model="formData.currency"></option-selector>
            </ion-item>
            <datetime-input @update="(value) => formData.datetime = value" :value="formData.datetime"></datetime-input>
        </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from "vue";
import { IonTitle, IonToolbar, IonText, IonButtons, IonButton, IonHeader, IonContent, IonItem, IonLabel, IonInput, IonIcon } from "@ionic/vue";

import SegmentSelector from "@/components/inputs/SegmentSelector.vue";
import OptionSelector from '@/components/inputs/OptionSelector.vue'
import DatetimeInput from '@/components/inputs/DatetimeInput.vue'

import { useStore } from '@/store'
import { RecordsActionTypes } from "@/store/records/actions";
import { DebtorsActionTypes } from "@/store/debtors/actions";

import { TSelectorOption, TRecord, TDebtor, TSegment } from '@/types'
import { Record, Debtor } from '@/classes'
import { convertToOptions, strArrayToOptions } from '@/helpers/convertor'
import { toast } from '@/helpers/summoners'
import { useEmitter } from '@/emitter'
import { listOutline, personOutline, checkmarkOutline, checkmarkDoneOutline, personCircleOutline, chatboxOutline, cashOutline, calendarOutline } from 'ionicons/icons';

export default defineComponent({
    components: {
        IonTitle,
        IonToolbar,
        IonButtons,
        IonButton,
        IonHeader,
        IonContent,
        IonItem,
        IonLabel,
        IonInput,
        IonIcon,
        IonText,
        DatetimeInput,
        SegmentSelector,
        OptionSelector
    },
    emits: ["close"],
    setup() {
        const emitter = useEmitter();
        const store = useStore();
        
        const debtorsAsOptions = computed(() => convertToOptions(store.getters.debtors, 'id', 'name'))
        const currenciesAsOptions: Array<TSelectorOption> = strArrayToOptions(store.getters.currencies)
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
            emitter.emit('close-record-form-modal')
            errors.value = []
        };

        const isFormValid = (): boolean => {
            errors.value = [];
            let valid = true

            if (debtorName.value === '' && activeSegment.value == formSegments[1].value){
                errors.value.push('name')
                valid = false
            }
            if (!formData.price || formData.price <= 0){
                errors.value.push('price')
                valid = false
            }
            return valid
        }

        const submit = async (): Promise<void> => {
            if (!isFormValid()) return

            if (activeSegment.value == 'new'){
                const newDebtor: TDebtor = new Debtor(debtorName.value);
                store.dispatch(DebtorsActionTypes.ADD_DEBTOR, newDebtor);
                formData.debtorId = newDebtor.id
            }
            store.dispatch(RecordsActionTypes.ADD_RECORD, { ...formData })
            close()
            await toast('Successfully added!', checkmarkDoneOutline) 
        }

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
            listOutline, personOutline, checkmarkOutline, checkmarkDoneOutline, personCircleOutline, chatboxOutline, cashOutline, calendarOutline
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
ion-content ion-icon{
    color: var(--ion-color-medium)
}
ion-label {
    display: flex !important;
    align-items: center;
    padding: 0.5rem 1rem;
    width: 125px;
}
ion-text{
    margin-left: 1rem;
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