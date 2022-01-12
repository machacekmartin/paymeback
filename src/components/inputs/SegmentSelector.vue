<template>
    <ion-segment :value="options[0].value" :swipeGesture="true" @ionChange="(event) => change(event.target.value)">
        <ion-segment-button :value="option.value" v-for="option in options" :key="option">
            <ion-text>{{ option.text }}</ion-text>
            <ion-icon :icon="option.icon"></ion-icon>
        </ion-segment-button>
    </ion-segment>
</template>

<script lang="ts">
import { IonSegment, IonSegmentButton, IonIcon, IonText } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        IonSegment,
        IonSegmentButton,
        IonIcon,
        IonText
    },
    props: {
        options: {
            type: Array,
            required: true,
        },
    },
    setup(props, context) {
        const change = (value: string): void => {
            context.emit('changed', value)
        }

        return {
            change
        }
    }
});
</script>

<style scoped>
ion-segment-button{
    padding: .5rem;
}
ion-icon{
    margin-bottom: .25rem;
}
</style>
