<template>
    <ion-select
        :interface="type"
        :placeholder="placeholder"
        :value="options[0].toLowerCase()"
    >
        <ion-select-option
            v-for="option in options"
            :key="option"
            :value="option.toLowerCase()"
        >
            {{ option }}
        </ion-select-option>
    </ion-select>
</template>

<script lang="ts">
import { IonSelect, IonSelectOption } from "@ionic/vue";

export default {
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
            validator: (value: string) => {
                return ["action-sheet", "selector"].includes(value);
            },
        },
    },
};
</script>
