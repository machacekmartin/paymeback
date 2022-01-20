<template>
    <ion-accordion-group>
        <ion-accordion>
            <ion-item slot="header" class="header">
                <ion-label>
                    {{ label }}
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
} from "@ionic/vue";
import { defineComponent, ComputedRef, computed } from "vue";
import { format, parseISO } from "date-fns";

export default defineComponent({
    components: {
        IonDatetime,
        IonAccordionGroup,
        IonAccordion,
        IonItem,
        IonLabel,
        IonText,
        IonList,
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
            displayValue
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
    padding: 0.5rem 1rem;
    font-weight: bold;
}
ion-item.header{
    border-bottom: solid .5px var(--border-color);
}

</style>