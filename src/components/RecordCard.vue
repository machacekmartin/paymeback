<template>
    <ion-item-sliding>
        <ion-item-options>
            <ion-item-option color="dark" class="ion-padding-horizontal">
                <ion-icon :icon="createOutline" size="large" class="ion-padding-horizontal"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" @click="deleteCard">
                <ion-icon :icon="trashBinOutline" size="large" class="ion-padding-horizontal"></ion-icon>
            </ion-item-option>
        </ion-item-options>
        <ion-item lines="none" class="ion-no-margin ion-no-padding">
            <ion-card color="light" class="ion-no-margin ion-no-padding">
                <ion-card-header>
                    <ion-grid class="ion-no-padding">
                        <ion-row class="ion-align-items-end">
                            <ion-col>
                                <ion-card-subtitle>
                                    <span>{{ date }}</span>
                                </ion-card-subtitle>
                                <ion-card-title>
                                    <h2 class="ion-no-margin">{{ debtorName }}</h2>
                                </ion-card-title>
                            </ion-col>
                            <ion-col size="auto">
                                <ion-text color="danger">
                                    <h1 class="ion-no-margin">
                                        <strong>{{ price }}</strong> {{ currency }}
                                    </h1>
                                </ion-text>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-header>
                <ion-card-content>
                    <p>{{ description }}</p>
                </ion-card-content>
            </ion-card>
        </ion-item>
    </ion-item-sliding>
</template>

<script lang="ts">
import {
    IonCard,
    IonIcon,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonItemSliding,
    IonItemOptions,
    IonItem,
    IonItemOption,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { trashBinOutline, createOutline } from "ionicons/icons";

export default defineComponent({
    components: {
        IonCard,
        IonIcon,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent,
        IonGrid,
        IonRow,
        IonCol,
        IonText,
        IonItemSliding,
        IonItemOptions,
        IonItem,
        IonItemOption,
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        date: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        debtorName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    setup(props, context){
        const deleteCard = (): void => {
            context.emit('delete')
        }

        return {
            trashBinOutline, 
            createOutline, 
            
            deleteCard
        }
    }
});
</script>

<style scoped>
ion-card {
    width: 100%;
    box-shadow: none;
}
ion-item{
    --inner-padding-end: 0;
}
ion-item:host{
    background: transparent;
}
h1 {
    font-size: 2rem;
    font-style: italic;
}

</style>
