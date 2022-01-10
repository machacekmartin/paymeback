<template>
    <ion-modal
        :isOpen="active"
        :swipeToClose="true"
        :presentingElement="presenter"
    >
        <ion-header translucent>
            <ion-toolbar>
                <ion-title>Add a new debtor</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="close()">Close</ion-button>
                </ion-buttons>
                
            </ion-toolbar>
        </ion-header>
        <ion-content> 
            <ion-slides :pager="true" :options="{}">
                <ion-slide>
                    <h1>Slide 1</h1>
                </ion-slide>
                <ion-slide>
                    <h1>Slide 2</h1>
                </ion-slide>
                <ion-slide>
                    <h1>Slide 3</h1>
                </ion-slide>
            </ion-slides> 
            
        </ion-content>
    </ion-modal>
</template>

<script lang="ts">
import {
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonModal,
    IonSlides, 
    IonSlide
} from "@ionic/vue";
import { ref, onMounted, defineComponent } from 'vue';

export default defineComponent({
    components: {
        IonTitle,
        IonToolbar,
        IonButtons,
        IonButton,
        IonHeader,
        IonContent,
        IonModal,
        IonSlides, 
        IonSlide
    },
    emits: ["close"],
    props: {
        active: {
            type: Boolean,
            required: true
        }
    },
    setup(props, { emit }) {
        const presenter= ref<HTMLElement | null>(null)
        
        onMounted(() => {
            presenter.value = document.getElementById('router')
        })

        const close = () => {
            emit("close");
        };

        return {
            presenter,
            close,
        };
    },
});
</script>

<style>
</style>