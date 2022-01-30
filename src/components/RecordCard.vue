<template>
    <div>
        <ion-item-sliding>
            <ion-item-options>
                <ion-item-option color="danger" @click="deleteCard()">
                    <ion-icon :icon="trashBinOutline" size="large" class="ion-padding-horizontal"></ion-icon>
                </ion-item-option>
            </ion-item-options>
            <ion-item lines="none" class="ion-no-margin ion-no-padding">
                <ion-card color="light" class="ion-no-margin" :button="true" @click="activateCard()">
                    <ion-card-header class="ion-no-padding">
                        <ion-grid class="ion-no-padding">
                            <ion-row class="ion-align-items-center">
                                <ion-col>
                                    <ion-card-subtitle>
                                        <span>{{ datetimeFormatted }}</span>
                                    </ion-card-subtitle>
                                    <ion-card-title>
                                        <h3 class="ion-no-margin">{{ debtorName }}</h3>
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
                    <ion-card-content class="ion-no-padding" v-if="description">
                        <small>{{ description }}</small>
                    </ion-card-content>
                </ion-card>
            </ion-item>
        </ion-item-sliding>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
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
        datetime: {
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
        const activateCard = (): void => {
            context.emit('activate')
        }

        const datetimeFormatted: ComputedRef<string> = computed(() : string => {
            return format(parseISO(props.datetime), "dd. MM. yyyy' 'h:mm a")
        })

        return {
            trashBinOutline, 
            createOutline, 
            datetimeFormatted,
            
            deleteCard,
            activateCard
        }
    }
});
</script>

<style scoped>
ion-card {
    width: 100%;
    border: solid 1px var(--ion-color-light-shade);
    padding: .5rem 1rem;
}
ion-item{
    --inner-padding-end: 0;
    background: transparent;
    border-radius: .5rem;
}
ion-item:host{
    background: transparent;
}

ion-card-content{
    color: var(--ion-color-medium)
}
ion-card-subtitle > span{
    color: var(--ion-color-medium)
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
