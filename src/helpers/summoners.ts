import { toastController, modalController } from "@ionic/vue";

export async function toast(message: string, icon: string) {
    const toast = await toastController.create({
        color: 'tertiary',
        position: 'top',
        duration: 2000,
        message: message,
        icon: icon,
        cssClass: 'toast'
    })

    await toast.present()
}

export async function modal(options: any): Promise<HTMLIonModalElement>{
    let modal: HTMLIonModalElement | null = await modalController.create(options)
    modal.onDidDismiss().then(() => modal = null)
    modal.present();

    return modal
}