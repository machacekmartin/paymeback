<template>
    <ion-accordion-group>
        <ion-accordion>
            <ion-item slot="header">
                <ion-label>
                   {{ debtorName }}
                </ion-label>
              </ion-item>
            <ion-item class="content" slot="content">
                <ion-grid class="ion-no-padding ion-margin-vertical">
                    <ion-row>
                        <ion-col size="4">
                            <ion-text>
                                Description:
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <ion-text>
                                {{ description }}
                            </ion-text>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4">
                            <ion-text>
                                Person:
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <ion-text>
                                {{ debtorName }}
                            </ion-text>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4">
                            <ion-text>
                                Amount:
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <ion-text>
                                {{ price }}
                            </ion-text>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4">
                            <ion-text>
                                Currency:
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <ion-text>
                                {{ currency }}
                            </ion-text>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4">
                            <ion-text>
                                Added on:
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <ion-text>
                                {{ datetimeFormatted }}
                            </ion-text>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4">
                            <ion-text>
                                Payback on:
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <ion-text>
                                {{ paybackDatetimeFormatted }}
                            </ion-text>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-item>
        </ion-accordion>
    </ion-accordion-group>
</template>

<script lang="ts">
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonText, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent, computed } from "vue";
import { format, parseISO } from "date-fns";

export default defineComponent({
    components: {
        IonAccordionGroup,
        IonAccordion,
        IonItem,
        IonLabel,
        IonText,
        IonGrid, 
        IonRow, 
        IonCol
    },
    props: {
        description: {
            type: String,
            required: true
        },
        debtorName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        datetime: {
            type: String,
            required: true
        },
        paybackDatetime: {
            type: String,
            required: true
        }
    },
    setup(props){

        const datetimeFormatted = computed(() => {
            return format(parseISO(props.datetime), "dd. MM. yyyy' 'h:mm a")
        })
        const paybackDatetimeFormatted = computed(() => {
            return format(parseISO(props.paybackDatetime), "dd. MM. yyyy' 'h:mm a")
        })

        return {
            datetimeFormatted,
            paybackDatetimeFormatted
        }
    }
});
</script>
<style scoped>
ion-accordion-group{
    margin: .5rem;
}
ion-accordion{
    border-radius: .5rem;
}
ion-item{
    --background: var(--ion-card-background);
    --inner-border-width: 0;
}
ion-item.content{
    --background: var(--ion-color-light);
}
ion-row{
    margin-bottom: .5rem;
}
ion-text{
    color: var(--ion-color-medium)
}

</style>