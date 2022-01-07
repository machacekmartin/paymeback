<template>
    <ion-card>
        <ion-card-header>
            <ion-grid class="ion-no-padding">
                <ion-row class="ion-align-items-end">
                    <ion-col>
                        <ion-card-subtitle>
                            {{ date }}
                        </ion-card-subtitle>
                        <ion-card-title>
                            <h2 class="ion-no-margin">{{ name }}</h2>
                            
                        </ion-card-title>
                    </ion-col>
                    <ion-col size="auto">
                        <h1 class="ion-no-margin ion-text"><strong>{{ price }}{{ currency }}</strong></h1>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-card-header>

        <ion-card-content>
            <p>{{ description }}</p>
        </ion-card-content>
    </ion-card>
</template>

<script>
import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/vue";
export default {
    components: {
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent,
        IonGrid,
        IonRow,
        IonCol,
    },
    props: {
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
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
};
</script>
