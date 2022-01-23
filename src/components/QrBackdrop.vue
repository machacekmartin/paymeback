<template>
    <transition name="fade">
        <ion-content v-if="active">
            <p style="color: white" z->LOL</p>
            <ion-backdrop style="opacity: .8"></ion-backdrop>
            
        </ion-content>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonBackdrop, IonContent } from "@ionic/vue";

export default defineComponent({
    components: {
        IonBackdrop,
        IonContent
    },
    setup() {
        const active = true;
        return {
            active
        } 
    },
})
</script>
