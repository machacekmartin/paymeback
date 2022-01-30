<template>
    <ion-accordion-group>
        <ion-accordion>
            <ion-item slot="header" class="header">
                <ion-label>
                    <ion-icon size="small" :icon="calendarOutline"></ion-icon>
                    <ion-text>Date & Time</ion-text>
                </ion-label>
                <ion-text>
                    {{ valueFormatted }}
                </ion-text>
            </ion-item>
            <ion-list slot="content">
                <ion-item>
                    <ion-datetime
                        color="danger"
                        size="cover"
                        hourCycle="hourCycle"
                        presentation="time-date"
                        :value="value"
                        :showClearButton="true"
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
import { calendarOutline } from 'ionicons/icons';

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
        value: {
            type: String,
            required: true
        }
    },

    setup(props, context) {
        const valueFormatted: ComputedRef<string> = computed(() : string => {
            return format(parseISO(props.value), "dd. MM. yyyy' 'h:mm a")
        })

        const changeDate = (isoValue: string): void => {
            console.log(isoValue)
            context.emit('update', isoValue)
        };

        return {
            changeDate,
            valueFormatted,
            calendarOutline
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
    max-width: 100px;
}
ion-item.header{
    border-bottom: solid .5px var(--border-color);
}
ion-icon{
    color: var(--ion-color-medium)
}

</style>