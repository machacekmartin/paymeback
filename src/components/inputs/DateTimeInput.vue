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
                        :value="iso"
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
import { defineComponent, ComputedRef, ref, computed } from "vue";
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
            validator: (value: string) => {
                return ['date', 'time'].includes(value)
            }
        },
        label: {
            type: String,
            required: false,
            default: 'Date'
        }
    },

    setup(props, context) {
        let iso = ref<string>(new Date().toISOString());

        const displayValue: ComputedRef<string> = computed(() : string => {
            if (props.type == 'date'){
                return format(parseISO(iso.value), "dd. MM. yyyy")
            }
            return format(parseISO(iso.value), "hh:mm a")
        })

        const changeDate = (isoValue: string) => {
            iso.value = isoValue;
            context.emit('update', iso.value)
        };

        return {
            changeDate,
            iso,
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