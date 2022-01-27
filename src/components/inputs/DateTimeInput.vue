<template>
    <ion-accordion-group>
        <ion-accordion>
            <ion-item slot="header" class="header">
                <ion-label>
                    <ion-icon size="small" :icon="type=='date' ? calendarOutline : timeOutline"></ion-icon>
                    <ion-text>{{ label }}</ion-text>
                </ion-label>
                <ion-text>{{ displayValue }}</ion-text>
            </ion-item>
            <ion-list slot="content">
                <ion-item>
                    <ion-datetime
                        color="danger"
                        size="cover"
                        hourCycle="hourCycle"
                        :presentation="type"
                        :value="value"
                        @ionChange="(event) => changeDate(event.detail.value)"
                    ></ion-datetime>
                </ion-item>
            </ion-list>
        </ion-accordion>
    </ion-accordion-group>
</template>

<script lang="ts">
import {
    IonDatetime,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    IonText,
    IonList,
    IonIcon
} from "@ionic/vue";
import { defineComponent, ComputedRef, computed } from "vue";
import { format, parseISO } from "date-fns";
import { calendarOutline, timeOutline } from 'ionicons/icons';

export default defineComponent({
    components: {
        IonDatetime,
        IonAccordionGroup,
        IonAccordion,
        IonItem,
        IonLabel,
        IonText,
        IonList,
        IonIcon
    },
    props: {
        type: {
            type: String,
            required: true,
            validator: (value: string): boolean => {
                return ['date', 'time'].includes(value)
            }
        },
        label: {
            type: String,
            required: false,
            default: 'Date'
        },
        value: {
            type: String,
            required: true
        }
    },

    setup(props, context) {

        const displayValue: ComputedRef<string> = computed(() : string => {
            if (props.type == 'date'){
                return format(parseISO(props.value), "dd. MM. yyyy")
            }
            return format(parseISO(props.value), "hh:mm a")
        })

        const changeDate = (isoValue: string): void => {
            context.emit('update', isoValue)
        };

        return {
            changeDate,
            displayValue,

            calendarOutline, timeOutline
        };
    },
});
</script>

<style scoped>
ion-item {
    --padding-start: 0;
    --background: transparent;
    --inner-padding-end: 0px;
}
ion-label {
    display: flex !important;
    align-items: center;
    padding: 0.5rem 1rem;
}
ion-text{
    margin-left: 1rem;
}
ion-item.header{
    border-bottom: solid .5px var(--border-color);
}
ion-icon{
    color: var(--ion-color-medium)
}

</style>