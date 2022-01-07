<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>

            <ion-tab-bar slot="bottom" style="padding: .75rem .5rem">

                <ion-tab-button tab="home" href="/tabs/home">
                    <div style="display: flex; align-items: center; padding: .75rem; background-color: rgba(255,255,255,.1); border-radius: .6rem">
                        <ion-icon :icon="triangle" style="width: 25px; height: 25px" />
                        <ion-label style="margin-left: 12px">Home</ion-label>
                    </div>
                </ion-tab-button>

                <ion-tab-button tab="history" href="/tabs/history">
                    <div style="display: flex; align-items: center; padding: .75rem; background-color: rgba(255,255,255,.1); border-radius: .6rem">
                        <ion-icon :icon="ellipse" style="width: 25px; height: 25px" />
                        <ion-label  style="margin-left: 12px">History</ion-label>
                    </div>
                </ion-tab-button>

                <ion-tab-button tab="settings" href="/tabs/settings">
                    <div style="display: flex; align-items: center; padding: .75rem; background-color: rgba(255,255,255,.1); border-radius: .6rem">
                        <ion-icon :icon="square" style="width: 25px; height: 25px" />
                        <ion-label style="margin-left: 12px">Settings</ion-label>
                    </div>
                </ion-tab-button>

            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
} from "@ionic/vue";
import { ellipse, square, triangle, add } from "ionicons/icons";

export default {
    components: {
        IonLabel,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonPage,
        IonRouterOutlet,
    },
    setup() {
        return {
            ellipse,
            square,
            triangle,
            add
        };
    },
};
</script>