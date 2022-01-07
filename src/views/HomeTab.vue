<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>You Owe Me</ion-title>
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
                        <current-balance ></current-balance>
                    </ion-col>
                    <ion-col size="auto" class="ion-padding">
                        <option-selector :options="currencies" placeholder="Currency" type="action-sheet"></option-selector>
                    </ion-col>
                </ion-row>

                <ion-row v-for="record in debtorRecords" :key="record.name">
                    <ion-col class="ion-no-padding ion-no-margin" >
                        <debtor-card :date="record.date" :name="record.name" :price="record.price" :description="record.description" :currency="record.currency" class="ion-no-margin ion-margin-top ion-margin-horizontal"></debtor-card>
                    </ion-col>
                </ion-row>

            </ion-grid>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button>
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
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
    IonFab,
    IonFabButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
} from "@ionic/vue";
import CurrentBalance from "@/components/CurrentBalance.vue";
import OptionSelector from "@/components/OptionSelector.vue";
import DebtorCard from "@/components/DebtorCard.vue";
import { add } from "ionicons/icons";

export default {
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

        CurrentBalance,
        OptionSelector,
        DebtorCard,
    },

    setup() {
        return {
            add,
            currencies: ["€ EUR", "$ USD", "? CZK"],
            people: ["Everyone", "Dominik", "Davidek", "Martynko"],
            debtorRecords: [
                {
                    date: "12. 4. 1997",
                    name: "Davydek",
                    description: "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
                    price: 289,
                    currency: '$'
                },
                {
                    date: "12. 4. 1997",
                    name: "Daominiik",
                    description: "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
                    price: 500,
                    currency: '$'
                },
                {
                    date: "12. 4. 1997",
                    name: "Martynko",
                    description: "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
                    price: 1500,
                    currency: '€'
                },
                {
                    date: "12. 4. 1997",
                    name: "Martynko",
                    description: "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
                    price: 1500,
                    currency: '€'
                },
            ],
        };
    },
};
</script>