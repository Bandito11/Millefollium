import { Component, h } from "@stencil/core";

@Component({
    tag: 'app-create-food',
    styleUrl: 'app-create-food.css'
})
export class AppDaily {

    render() {
        return [
            <div>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        : <ion-header>
                            <ion-toolbar color="primary">

                            </ion-toolbar>
                        </ion-header>
                }
            </div>,
            <ion-content>

            </ion-content>,
            <div>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? <ion-footer>
                            <ion-toolbar color="primary">

                            </ion-toolbar>
                        </ion-footer>
                        : ''
                }
            </div>
        ];
    }
}