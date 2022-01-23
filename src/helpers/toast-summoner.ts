import { toastController } from "@ionic/vue";

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