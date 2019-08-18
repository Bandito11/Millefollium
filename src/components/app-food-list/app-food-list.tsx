import { Component, h } from '@stencil/core';

@Component({
    tag: 'app-food-list',
    styleUrl: 'app-food-list.css'
})

export class AppFoodList {

    componentDidLoad() {
        const searchBar = document.querySelector('ion-searchbar');
        searchBar.setFocus();
    }

    render() {
        return [
            <ion-header >
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        :
                        <ion-toolbar color="primary">
                            <ion-buttons slot="start">
                                <ion-button href="/" >
                                    <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                }
            </ion-header>
            ,
            <ion-content class="ion-padding">
                <ion-searchbar spellcheck={true} autocomplete="on" placeholder="Look for meal or snacks!"></ion-searchbar>

            </ion-content>
            ,
            <ion-footer>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ?
                        <ion-toolbar color="primary">
                            <ion-buttons slot="start">
                                <ion-button href="/" >
                                    <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                        : ''
                }
            </ion-footer>
        ]
    }
}