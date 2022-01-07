<template>
    <ion-select
        :interface="type"
        :placeholder="placeholder"
        :multiple="multiple"
        header="hello"
        class="ion-padding"
    >
        <ion-select-option
            v-for="option in options"
            :key="option.name"
            :value="option.toLowerCase()"
        >
            {{ option }}
        </ion-select-option>
    </ion-select>
</template>

<script>
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
        header: {
            type: String,
            required: false,
        },
        multiple: {
            type: Boolean,
            required: false,
        },
        type: {
            type: String,
            required: false,
            validator: (value) => {
                return ["action-sheet", "selector"].includes(value);
            },
        },
    },
};
</script>

<style scoped>
ion-select {
    background-color: var(--ion-color-light); 
    border-radius: 0.5rem;
}
@media (prefers-color-scheme: dark) {
    ion-select:root {
        background-color: var(--ion-color-primary);
    }
}
</style>
