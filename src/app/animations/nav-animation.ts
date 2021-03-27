import {AnimationController,Animation} from '@ionic/angular'
export const enterAnimation = (baseEl:HTMLElement,opts?:any):Animation =>{
    const DURATION=1000
    console.log("baseEl: ",baseEl)
    console.log("opts: ",opts)

    const animationCtrl = new AnimationController()
    
    //if(opts.direction === "forward"){
        return animationCtrl.create()
        .addElement(opts.enteringEl)
        .duration(0)
        .easing("ease-in")
        .fromTo("opacity",0,1)
    //}
}