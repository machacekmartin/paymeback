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
                        <current-balance></current-balance>
                    </ion-col>
                    <ion-col size="auto" class="ion-padding">
                        <option-selector
                            :options="currencies"
                            placeholder="Currency"
                            type="action-sheet"
                        ></option-selector>
                    </ion-col>
                </ion-row>
                <transition-group name="debtors">
                    <ion-row v-for="(record, index) in debtorRecords" :key="record.id" class="debtor">
                        <ion-col class="ion-no-padding ion-no-margin ion-margin-top ion-margin-horizontal">
                            <debtor-card
                                :date="record.date"
                                :name="record.name"
                                :price="record.price"
                                :description="record.description"
                                :currency="record.currency"
                                :id="record.id"
                                @delete="removeRecord(index)"
                            >
                            </debtor-card>
                        </ion-col>
                    </ion-row>
                </transition-group>
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
import { reactive } from 'vue'

interface Record {
    id: string
    date: string
    name: string
    description: string
    price: number
    currency: string
}


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
        let debtorRecords: Array<Record> = reactive([
            {
                id: "25",
                date: "12. 4. 1997",
                name: "Davydek",
                description:
                    "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
                price: 289,
                currency: "$",
            },
            {
                id: "35",
                date: "12. 4. 1997",
                name: "Martynko",
                description:
                    "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
                price: 289,
                currency: "$",
            },
            {
                id: "45",
                date: "12. 4. 1997",
                name: "WTF",
                description:
                    "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
                price: 289,
                currency: "$",
            },
            {
                id: "55",
                date: "12. 4. 1997",
                name: "Dominyk",
                description:
                    "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
                price: 289,
                currency: "$",
            },
        ])

        const removeRecord = (index: number) => {
            debtorRecords.splice(index, 1)
            console.log(debtorRecords)
        };

        return {
            add,
            currencies: ["€ EUR", "$ USD", "? CZK"],
            people: ["Everyone", "Dominik", "Davidek", "Martynko"],
            debtorRecords,
            removeRecord
        };
    },
};
</script>

<style scoped>

.debtor{
    transition: opacity .2s, transform .3s;
}
.debtors-enter, .debtors-leave-to{
    opacity: 0;
    transform: translate(-150px, 40px);
}
.debtors-leave-active{
    margin-left: 10px;
    position: absolute;
}


</style>