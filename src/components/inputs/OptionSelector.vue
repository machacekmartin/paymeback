<template>
    <ion-select
        :interface="type"
        :placeholder="placeholder"
    >
        <ion-select-option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.text }}
        </ion-select-option>
    </ion-select>
</template>

<script lang="ts">
import { IonSelect, IonSelectOption } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        IonSelect,
        IonSelectOption,
    },
    props: {
        options: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
            validator: (value: string): boolean => {
                return ["action-sheet", "selector"].includes(value);
            },
        },
    },
});
</script>
