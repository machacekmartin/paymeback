<template>
    <ion-slides pager="true" :options="slideOpts" ref="slider">
        <ion-slide>
            <ion-img :src="require('/resources/icon.png')" alt="icon"></ion-img>
            <h1>Welcome!</h1>
            <ion-text class="ion-margin-bottom">This app offers a way of keeping track of your lended money</ion-text>
            <ion-text class="ion-margin-bottom">Also, you can generate custom QR payments</ion-text>
            <ion-button class="footer ion-margin-top full" color="tertiary" @click="nextSlide()">
                <ion-text class="ion-margin-end">OK, next</ion-text>
                <ion-icon :icon="arrowForwardOutline"></ion-icon>
            </ion-button>
            
            <ion-text class="ion-margin-top ion-margin-bottom" color="medium">
               <small>QR Payments are currently set-up for Czech Republic only.</small> 
            </ion-text>
        </ion-slide>

        <ion-slide>
            <ion-img :src="require('/resources/icon-2.png')"></ion-img>
            <h1>QR & Account number</h1>
            <ion-text class="ion-margin-bottom">Generating QR payments requires your account number</ion-text>
            <ion-text class="ion-margin-bottom">You can add this number in the settings</ion-text>

            <div class="row footer">
                <ion-button class="ion-margin-top" color="light" @click="prevSlide()">
                    <ion-icon :icon="arrowBackOutline"></ion-icon>
                </ion-button>
                <ion-button class="ion-margin-top ion-margin-start full" color="tertiary" @click="completeSlider()">
                    <ion-text class="ion-margin-horizontal">OK, let me in</ion-text>
                    <ion-icon :icon="checkmarkOutline"></ion-icon>
                </ion-button>
            </div>

            <ion-text class="ion-margin-top ion-margin-bottom" color="medium">
               <small>Your information is stored purely on your phone and is not being sent anywhere</small> 
            </ion-text>
        </ion-slide>
    </ion-slides>
</template>

<script lang="ts">
import { IonSlides, IonSlide, IonImg, IonText, IonIcon, IonButton } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { arrowForwardOutline, arrowBackOutline, checkmarkOutline } from "ionicons/icons";
import { useEmitter } from '@/emitter'

export default defineComponent({
    components: { IonSlides, IonSlide, IonImg, IonText, IonIcon, IonButton },
    setup() {
        const emitter = useEmitter()
        const slider = ref<any>()

        const slideOpts = {
            initialSlide: 0,
            speed: 400,
        };

        const nextSlide = () => {
            slider.value.$el.slideNext()
        }
        const prevSlide = () => {
            slider.value.$el.slidePrev()
        }
        const completeSlider = () => {
            emitter.emit('complete-intro')
        }

        return { 
            slider,
            nextSlide,
            prevSlide,
            completeSlider,
            slideOpts,
            arrowForwardOutline,
            arrowBackOutline,
            checkmarkOutline
        };
    },
});
</script>

<style scoped>
ion-item {
    --padding-start: 0;
    --background: transparent;
    --inner-padding-end: 0px;
    border: solid 1px transparent;
}
ion-slides{
    height: 100vh;
    --bullet-background: var(--ion-color-dark);
    background-color: var(--ion-color-medium-contrast);
}
ion-slide{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    height: 100vh;
    padding: 2rem 4rem;
}
ion-img{
    position: relative;
    width: 250px;
    margin-bottom: 2rem;
}
ion-img::part(image){
    border-radius: 1.5rem;
    overflow: hidden;
}
ion-button.full{
    width: 100%;
}
.footer{
    margin-top: auto;
}
.row{
    display: flex;
    width: 100%;
}

</style>