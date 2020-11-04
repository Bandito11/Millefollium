import { Component, h, State } from '@stencil/core';
import { IFoodProduct } from '../../interfaces';
import { getFoodProducts } from '../../services/db';
import { actionSheetController, modalController } from '@ionic/core';
import { scan, stopScan } from '../../services/quagga';
import { firstLetterToUpperCase } from '../../helpers/utils';

// let usdaData: IUSDA[] = [];

@Component({
    tag: 'app-food-list',
    styleUrl: 'app-food-list.css',
    assetsDirs: ['workers']
})

export class AppFoodList {

    @State() foodProducts: IFoodProduct[] = [];
    @State() frequentFoodProducts: IFoodProduct[] = [];
    unfilteredFoodProducts: IFoodProduct[] = [];
    toggleBarcode = true;
    foodDataWorker;
    currentIndex: number;

    scrollEvent() {
        const content = document.querySelector<HTMLIonContentElement>('#food-list-content');
        content.scrollEvents = true;
        content.addEventListener('ionScroll', async (ev) => {
            const scroll = await content.getScrollElement();
            const scrollTopMax = scroll['scrollTopMax'];
            if (ev['detail']['scrollTop'] === scrollTopMax) {
                console.error('scroll in food list....')
                // if (this.foodProducts.length > 0) {
                //     for (let i = this.currentIndex; i < this.currentIndex + 10; i++) {
                //         this.foodProducts = [this.unfilteredFoodProducts[i], ...this.foodProducts];
                //     }
                //     this.currentIndex += 10;
                // }
            };
        });
    }

    componentWillLoad() {
        // this.getFrequentFoodProducts();
        //        if (typeof (this.foodDataWorker) == 'undefined') {
        //            this.foodDataWorker = new Worker('workers/usda-file.js');
        //        }
        //       this.foodDataWorker.onmessage = function (event) {
        //            usdaData = event.data;
        //        };
    }

    componentDidLoad() {
        this.scrollEvent();
    }

    // @Listen('ionChange')
    // handleIonChange(ev) {
    //     this.queryByNameOrId(ev.detail.value);
    // }

    queryByNameOrId(query) {
        if (query) {
            this.unfilteredFoodProducts = [];
            const response = getFoodProducts(query);
            if (response.success) {
                this.unfilteredFoodProducts = response.data;
            }
            this.foodProducts = [];
            if (this.unfilteredFoodProducts.length > 9) {
                this.currentIndex = 0;
                for (let i = 0; i < 10; i++) {
                    this.foodProducts = [this.unfilteredFoodProducts[i], ...this.foodProducts];
                }
                this.currentIndex += 10;
            } else {
                this.foodProducts = [...this.unfilteredFoodProducts];
            }
            // this.generateFrequentFoodProducts();
        } else {
            this.foodProducts.length = 0;
            this.foodProducts = [];
        }
    }

    // generateFrequentFoodProducts() {
    //     if (this.frequentFoodProducts.length > 0) {
    //         this.foodProducts.forEach(data => {
    //             let found;
    //             this.frequentFoodProducts.forEach(food => {
    //                 if (data.name === food.name) {
    //                     found = true;
    //                 }
    //             });
    //             if (!found) {
    //                 this.frequentFoodProducts.unshift(data);
    //             }
    //         });
    //     } else {
    //         this.frequentFoodProducts = [...this.foodProducts];
    //     }
    //     if (this.frequentFoodProducts.length > 9) {
    //         this.frequentFoodProducts.length = 10;
    //     }
    //     if (this.frequentFoodProducts.length > 0) {
    //         let frequentFoodProducts = [];
    //         this.frequentFoodProducts.forEach(food => {
    //             frequentFoodProducts.push(JSON.stringify(food));
    //         });
    //         localforage.setItem('frequentFoodProducts', frequentFoodProducts);
    //     } else {
    //         localforage.setItem('frequentFoodProducts', []);
    //     }

    // }

    // getFrequentFoodProducts() {
    //     localforage.getItem('frequentFoodProducts', (err, value: string[]) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             this.frequentFoodProducts = value.map(foodProduct => JSON.parse(foodProduct));
    //         }
    //     });
    // }

    goBack() {
        const ionNav = document.querySelector('ion-nav');
        ionNav.pop();
    }

    async getBarcode() {
        if (this.toggleBarcode) {
            this.toggleBarcode = false;
            try {
                const ionSearch = document.querySelector('ion-searchbar');
                const resultObject = await scan(document.querySelector('#food-list-barcode'));
                ionSearch.value = resultObject.codeResult.code;
                this.queryByNameOrId(resultObject.codeResult.code);
            } catch (error) {
                console.error(error);
            }
            document.querySelector('#food-list-barcode').innerHTML = stopScan();
        } else {
            this.toggleBarcode = true;
            document.querySelector('#food-list-barcode').innerHTML = stopScan();
        }
    }

    async presentCreateModal(componentProps: { foodProduct?: IFoodProduct, mode: string }) {
        const ionSearch = document.querySelector('ion-searchbar');
        const modal = await modalController.create({
            component: 'app-form-food',
            componentProps: componentProps
        });
        ionSearch.value = '';
        await modal.present();
    }

    async showSelectionWindow(foodProduct: (IFoodProduct)) {
        const actionSheet = await actionSheetController.create({
            header: firstLetterToUpperCase(foodProduct.name),
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Add to Daily',
                    role: 'submit',
                    cssClass: 'primary',
                    handler: () => {
                        modalController.create({
                            component: 'app-daily-entry',
                            componentProps: {
                                foodProduct: foodProduct
                            }
                        }).then(modal => modal.present());
                    }
                },
                {
                    text: `View ${foodProduct.name}`,
                    role: 'view',
                    cssClass: 'tertiary',
                    handler: async () => {
                        let ifUSDA = false;
                        if (!foodProduct['$loki']) {
                            ifUSDA = true;
                        }
                        const modal = await modalController.create({
                            component: 'app-view-food',
                            componentProps: {
                                foodProduct: foodProduct,
                                ifUSDA: ifUSDA
                            }
                        });
                        await modal.present();
                    }
                }, {
                    text: `Edit ${foodProduct.name}`,
                    cssClass: 'secondary',
                    handler: () => {
                        this.presentCreateModal({ mode: 'edit', foodProduct: foodProduct });
                    }
                }
            ]
        });
        return await actionSheet.present();
    }

    getToolbar() {
        return <ion-toolbar color="primary">
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-searchbar onIonChange={ev => this.searchRecipe(ev)} inputmode="text" type="search" debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
                <ion-buttons slot="end">
                    {/* <ion-button onClick={this.getBarcode.bind(this)}>
                        <ion-icon slot="icon-only" name="barcode"></ion-icon>
                    </ion-button> */}
                    <ion-button onClick={() => this.presentCreateModal({ mode: 'create' })}>
                        Create
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>

        </ion-toolbar>
    }
    searchRecipe(ev: CustomEvent<import("@ionic/core").SearchbarChangeEventDetail>): void {
        const query = ev.detail.value;
        if (query) {
            console.error('Search Term ', query)
        }
    }

    render() {
        return [
            <ion-header>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        : this.getToolbar()
                }
            </ion-header>
            ,
            <ion-content id="food-list-content" class="ion-padding">
                {
                    this.foodProducts.map((foodItem, index) =>
                        <ion-card onClick={_ => this.showSelectionWindow(foodItem)}>
                            {
                                index % 2
                                    ? <ion-card-header color="secondary">
                                        <ion-label>{firstLetterToUpperCase(foodItem.name)} </ion-label>
                                    </ion-card-header>
                                    : <ion-card-header color="tertiary">
                                        <ion-label>{firstLetterToUpperCase(foodItem.name)} </ion-label>
                                    </ion-card-header>
                            }
                            <ion-item lines="none">
                                <ion-label>
                                    Serving Size {foodItem.servingSize.size} {foodItem.servingSize.measurement}
                                </ion-label>
                            </ion-item>
                            <ion-item lines="none">
                                <ion-label>Servings per Container about {foodItem.servingPerContainer}</ion-label>
                            </ion-item>
                            <ion-item lines="none">
                                <ion-label>{foodItem.calories} calories</ion-label>
                            </ion-item>
                        </ion-card>
                    )
                }
            </ion-content>
            ,
            <ion-footer>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? this.getToolbar()
                        : ''
                }
            </ion-footer>
        ]
    }
}
