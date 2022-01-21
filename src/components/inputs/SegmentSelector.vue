<template>
    <ion-segment :swipeGesture="true">
        <ion-segment-button :value="option.value" v-for="option in options" :key="option">
            <ion-text>{{ option.text }}</ion-text>
            <ion-icon :icon="option.icon"></ion-icon>
        </ion-segment-button>
    </ion-segment>
</template>

<script lang="ts">

import { IonSegment, IonSegmentButton, IonIcon, IonText } from "@ionic/vue";
import { defineComponent } from "vue";
import { TSegment } from '@/types'


export default defineComponent({
    components: {
        IonSegment,
        IonSegmentButton,
        IonIcon,
        IonText
    },
    props: {
        options: {
            type: Object as () => TSegment[],
            required: true,
        },
    },
    setup() {
        return {
            
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
