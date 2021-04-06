import { AnimationController, Animation } from '@ionic/angular'
export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
    const DURATION = 300
    const animationCtrl = new AnimationController()

    return animationCtrl.create()
        .addElement(opts.enteringEl)
        .duration(DURATION)
        .easing("ease-in")
        .fromTo("opacity", 0, 1)
}