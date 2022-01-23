<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet ref="router" id="router"></ion-router-outlet>
            <ion-tab-bar slot="bottom" mode="ios">
                <ion-tab-button tab="home" href="/tabs/home" layout="icon-start">
                    <ion-icon :icon="homeOutline" />
                    <ion-label>Home</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="history" href="/tabs/history" layout="icon-start">
                    <ion-icon :icon="timeOutline" />
                    <ion-label>History</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="settings" href="/tabs/settings" layout="icon-start">
                    <ion-icon :icon="optionsOutline" />
                    <ion-label>Settings</ion-label>
                </ion-tab-button>
                <ion-button color="tertiary" @click="openModal()">
                    <ion-icon :icon="add"></ion-icon>
                </ion-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonButton,
    IonRouterOutlet,
} from "@ionic/vue";
import { useEmitter } from '@/emitter';

import { ellipse, square, triangle, add, homeOutline, timeOutline, optionsOutline } from "ionicons/icons";

export default defineComponent({
    components: {
        IonLabel,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonPage,
        IonButton,
        IonRouterOutlet,
    },
    setup() {
        const emitter = useEmitter()

        const openModal = (): void => {
            emitter.emit('create-modal-open')
        };

        return {
            openModal,

            ellipse,
            square,
            triangle,
            add,
            homeOutline,
            timeOutline,
            optionsOutline
        };
    },
});
</script>

<style scoped>

ion-label{
    position: relative;
    transition: .5s;
    margin-left: 1rem;
}
ion-tab-bar{
    position: relative;
    display: flex;
    justify-content: flex-start;
    padding: .5rem;   
}
ion-icon{
    margin-right: auto;
    
}
ion-tab-button{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 0;
    max-width: 62px;
    padding: 0 1rem;
    margin: 0 .5rem;
    border-radius: .5rem;    
    transition: .5s;
}
ion-tab-button.tab-selected{
    max-width: 155px;
    --background: var(--ion-color-light);
}
ion-tab-button:not(.tab-selected) ion-label{
    transform: translateX(100px);
    opacity: 0;
}

ion-button{
    position: absolute;
    margin: 0;
    right: .5rem;
    width: 55px;
    height: 50px;
    --border-radius: .5rem;
}
</style>