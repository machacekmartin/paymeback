<template>
    <div>
        <ion-item-sliding>
            <ion-item-options>
                <ion-item-option color="danger" @click="deleteCard()">
                    <ion-icon :icon="trashBinOutline" size="large" class="ion-padding-horizontal"></ion-icon>
                </ion-item-option>
            </ion-item-options>
            <ion-item lines="none" class="ion-no-margin ion-no-padding">
                <ion-card color="light" class="ion-no-margin ion-no-padding" :button="true" @click="activateCard()">
                    <ion-card-header>
                        <ion-grid class="ion-no-padding">
                            <ion-row class="ion-align-items-end">
                                <ion-col>
                                    <ion-card-subtitle>
                                        <span>{{ formattedDate }}</span>
                                        <span>{{ formattedTime }}</span>
                                    </ion-card-subtitle>
                                    <ion-card-title>
                                        <h2 class="ion-no-margin">{{ debtorName }}</h2>
                                    </ion-card-title>
                                </ion-col>
                                <ion-col size="auto">
                                    <ion-text color="danger">
                                        <h1 class="ion-no-margin">
                                            <strong>
                                                {{ price }} 
                                                <small>{{ currency }}</small> 
                                            </strong>
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
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { IonCard, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonItemSliding, IonItemOptions, IonItem, IonItemOption } from "@ionic/vue";

import { format, parseISO } from "date-fns";
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
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true
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
        const activateCard = (): void => {
            context.emit('activate')
        }

        const formattedDate = computed(() => {
            return format(parseISO(props.date), "dd. MM. yyyy")
        })
        const formattedTime = computed(() => {
            return format(parseISO(props.time), "h:mm a")
        })

        return {
            trashBinOutline, 
            createOutline, 
            formattedDate,
            formattedTime,
            
            deleteCard,
            activateCard
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
    background: transparent;
    border-radius: .5rem;
}
ion-item:host{
    background: transparent;
}
ion-card-subtitle > span:first-child{
    padding-right: .5rem;
    font-weight: 500;
}
ion-card-subtitle > span:last-child{
    font-weight: 300;
}

ion-item-option{
    border-radius: .5rem;
}
h1 {
    font-size: 1.75rem;
    font-style: italic;
}

</style>
