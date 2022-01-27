<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Settings</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Settings</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-item>
                <ion-label>
                    <ion-icon size="large" :icon="qrCodeOutline"></ion-icon>
                    <ion-text>IBAN</ion-text>
                </ion-label>
                <ion-input :autocapitalize="true" placeholder="Your account's IBAN number" type="text"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>
                    <ion-icon size="large" :icon="globeOutline"></ion-icon>
                    <ion-text>Currencies</ion-text>
                </ion-label>
                <option-selector :multiple="true" :options="availableCurrenciesAsOptions" v-model="activeCurrencies" ></option-selector>
            </ion-item>
            <ion-item>
                <ion-label>
                    <ion-icon size="large" :icon="clipboardOutline"></ion-icon>
                    <ion-text>Default currency</ion-text>
                </ion-label>
                <option-selector :options="availableCurrenciesAsOptions" v-model="defaultCurrency" interface="action-sheet"></option-selector>
            </ion-item>
            <ion-item>
                <ion-label>
                    <ion-icon size="large" :icon="refreshOutline"></ion-icon>
                    <ion-text>Reset to factory defaults</ion-text>
                </ion-label>
                <ion-button size="small" color="light" class="ion-margin-end">
                    <ion-icon size="small" :icon="chevronForwardOutline"></ion-icon>
                </ion-button>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonIcon,
    IonText,
    IonButton
} from "@ionic/vue";
import OptionSelector from '@/components/inputs/OptionSelector.vue'
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from '@/store';
import { listOutline, qrCodeOutline, cashOutline, globeOutline, clipboardOutline, refreshOutline, chevronForwardOutline } from 'ionicons/icons';

import { strArrayToOptions } from '@/helpers/convertor'
import { TCurrency, TSelectorOption } from "@/types";
import { CurrenciesActionTypes } from "@/store/currencies/actions";

export default defineComponent({
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        IonInput,
        IonItem,
        IonLabel,
        IonIcon,
        IonText,
        IonButton,
        OptionSelector
    },
    setup() {
        const store = useStore()
        const availableCurrenciesAsOptions: Array<TSelectorOption> = strArrayToOptions(store.getters.availableCurrencies)
        const activeCurrencies = ref<TCurrency[]>(store.getters.currencies)
        const defaultCurrency = ref<TCurrency>(store.getters.defaultCurrency)

        watch(activeCurrencies, () => {
            store.dispatch(CurrenciesActionTypes.UPDATE_CURRENCIES, activeCurrencies.value)
        })
        watch(defaultCurrency, () => {
            store.dispatch(CurrenciesActionTypes.CHANGE_DEFAULT_CURRENCY, defaultCurrency.value)
        })
        const helo = () => {
            alert("ayasy")
        }

        return {
            availableCurrenciesAsOptions,
            activeCurrencies,
            defaultCurrency,

            listOutline,
            qrCodeOutline,
            cashOutline,
            globeOutline,
            clipboardOutline,
            refreshOutline,
            chevronForwardOutline,
            helo
        }
    }
});
</script>


<style scoped>
ion-item {
    --padding-start: 0;
    --background: transparent;
    --inner-padding-end: 0px;
    border: solid 1px transparent;
}
ion-label {
    display: flex !important;
    align-items: center;
    padding: 0.5rem 1rem;
}
ion-icon{
    color: var(--ion-color-medium)
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
</style>