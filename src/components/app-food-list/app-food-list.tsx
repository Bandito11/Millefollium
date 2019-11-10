import { Component, h, Listen, State } from '@stencil/core';
import { IFoodProduct, IUSDA } from '../../interfaces';
import { getFoodProducts } from '../../services/db';
import { foodNameToUppercase } from '../../helpers/utils';
import { actionSheetController, modalController } from '@ionic/core';
import { scan, stopScan } from '../../services/quagga';
declare const localforage;

let usdaData: IUSDA[] = [];

@Component({
    tag: 'app-food-list',
    styleUrl: 'app-food-list.css'
})

export class AppFoodList {

    @State() foodProducts: IFoodProduct[] = [];
    @State() frequentFoodProducts: (IFoodProduct)[] = [];
    unfilteredFoodProducts: IFoodProduct[] = [];
    toggleBarcode = true;
    foodDataWorker;
    currentIndex: number;

    componentWillLoad() {
        this.getFrequentFoodProducts();
        if (typeof (this.foodDataWorker) == "undefined") {
            this.foodDataWorker = new Worker("workers/usda-file.js");
        }
        this.foodDataWorker.onmessage = function (event) {
            usdaData = event.data;
        };
    }

    componentDidLoad() {
        const content = document.querySelector<HTMLIonContentElement>('#food-list-content');
        content.scrollEvents = true;
        content.addEventListener('ionScroll', async (ev) => {
            const scroll = await content.getScrollElement();
            const scrollTopMax = scroll['scrollTopMax'];
            if (ev['detail']['scrollTop'] === scrollTopMax) {
                this.generateFoodProducts();
            };

        });
    }

    @Listen('ionChange')
    handleIonChange(ev) {
        this.queryByNameOrId(ev.detail.value);
    }

    queryUSDAByName(value) {
        const foodProduct: IFoodProduct = {
            name: '',
            barcode: '',
            picture: '',
            servingPerContainer: '1',
            servingSize: {
                size: '0',
                grams: '100',
                measurement: 'gram',
            },
            calories: '0',
            fat: {
                total: {
                    grams: '0',
                    percent: '0',
                },
                saturated: {
                    grams: '0',
                    percent: '0',
                },
                trans: {
                    grams: '0',
                    percent: '0',
                },
                polyunsaturated: {
                    grams: '0',
                    percent: '0',
                },
                monounsaturated: {
                    grams: '0',
                    percent: '0',
                },
            },
            cholesterol: {
                grams: '0',
                percent: '0',
            },
            sodium: {
                grams: '0',
                percent: '0',
            },
            potassium: {
                grams: '0',
                percent: '0',
            },
            totalCarbohydrates: {
                grams: '0',
                percent: '0',
            },
            dietaryFiber: {
                grams: '0',
                percent: '0',
            },
            protein: {
                grams: '0',
                percent: '0',
            },
            niacin: {
                grams: '0',
                percent: '0',
            },
            phosphorus: {
                grams: '0',
                percent: '0',
            },
            calcium: {
                grams: '0',
                percent: '0',
            },
            iron: {
                grams: '0',
                percent: '0',
            },
            magnesium: {
                grams: '0',
                percent: '0',
            },
            manganese: {
                grams: '0',
                percent: '0',
            },
            dateCreated: null,
            vitamin: {
                A: {
                    grams: '0',
                    percent: '0',
                },
                B: {
                    grams: '0',
                    percent: '0',
                },
                C: {
                    grams: '0',
                    percent: '0',
                },
                D: {
                    grams: '0',
                    percent: '0',
                },
                E: {
                    grams: '0',
                    percent: '0',
                },
            },
            sugar: {
                added: {
                    grams: '0',
                    percent: '0',
                },
                total: {
                    grams: '0',
                    percent: '0',
                }
            },
            sugarAlcohol: {
                added: {
                    grams: '0',
                    percent: '0',
                },
                total: {
                    grams: '0',
                    percent: '0',
                }
            }

        };
        const usdaProducts: (IFoodProduct)[] = [];
        usdaData.forEach(product => {
            if (product.foodName.includes(value)) {
                usdaProducts.push({
                    ...foodProduct,
                    name: product.foodName,
                    protein: {
                        percent: '0',
                        grams: product.protein.toString()
                    },
                    fat: {
                        ...foodProduct.fat,
                        total: {
                            percent: '0',
                            grams: product.fat.toString()
                        },
                        saturated: {
                            percent: '0',
                            grams: product.saturatedFat.toString()
                        }
                    },
                    totalCarbohydrates: {
                        percent: '0',
                        grams: product.carbohydrates.toString()
                    },
                    calories: product.calories.toString(),
                    sugar: {
                        ...foodProduct.sugar,
                        total: {
                            ...foodProduct.sugar.total,
                            grams: product.sugar.toString()
                        }
                    },
                    dietaryFiber: {
                        percent: '0',
                        grams: product.fiber.toString()
                    },
                    calcium: {
                        percent: '0',
                        grams: product.calcium.toString()
                    },
                    iron: {
                        percent: '0',
                        grams: product.iron.toString()
                    },
                    magnesium: {
                        percent: '0',
                        grams: product.magnesium.toString()
                    },
                    phosphorus: {
                        percent: '0',
                        grams: product.phosphorus.toString()
                    },
                    potassium: {
                        percent: '0',
                        grams: product.potassium.toString()
                    },
                    sodium: {
                        percent: '0',
                        grams: product.sodium.toString()
                    },
                    manganese: {
                        percent: '0',
                        grams: product.manganese.toString()
                    },
                    vitamin: {
                        ...foodProduct.vitamin,
                        A: {
                            percent: '0',
                            grams: product.vitaminA.toString()
                        },
                        E: {
                            percent: '0',
                            grams: product.vitaminE.toString()
                        },
                        D: {
                            percent: '0',
                            grams: product.vitaminD.toString()
                        },
                        C: {
                            percent: '0',
                            grams: product.vitaminC.toString()
                        }
                    },
                    niacin: {
                        percent: '0',
                        grams: product.niacin.toString()
                    },
                    cholesterol: {
                        percent: '0',
                        grams: product.cholesterol.toString()
                    },
                })
            }
        });
        return usdaProducts;
    }

    generateFoodProducts() {
        if (this.foodProducts.length > 0) {
            for (let i = this.currentIndex; i < this.currentIndex + 10; i++) {
                this.foodProducts.unshift(this.unfilteredFoodProducts[i]);
            }
            this.currentIndex += 10;
            this.foodProducts = this.foodProducts;
        }
    }

    queryByNameOrId(query) {
        if (query) {
            this.unfilteredFoodProducts = [];
            const checkIfBarcodeANumber = parseInt(query);
            if ((checkIfBarcodeANumber != NaN || typeof checkIfBarcodeANumber != 'number') && usdaData) {
                this.unfilteredFoodProducts = this.queryUSDAByName(query);
            };
            const response = getFoodProducts(query);
            if (response.success) {
                this.unfilteredFoodProducts = [...response.data, ...this.unfilteredFoodProducts];
            }
            this.foodProducts = [];
            if (this.unfilteredFoodProducts.length > 9) {
                this.currentIndex = 0;
                for (let i = 0; i < 10; i++) {
                    this.foodProducts = [this.unfilteredFoodProducts[i], ...this.foodProducts];
                }
                this.currentIndex += 10;
            } else {
                this.foodProducts = this.unfilteredFoodProducts;
            }
            this.generateFrequentFoodProducts();
        } else {
            this.foodProducts.length = 0;
            this.foodProducts = [];
        }
    }

    generateFrequentFoodProducts() {
        if (this.frequentFoodProducts.length > 0) {
            this.foodProducts.forEach(data => {
                let found;
                this.frequentFoodProducts.forEach(food => {
                    if (data.name === food.name) {
                        found = true;
                    }
                });
                if (!found) {
                    this.frequentFoodProducts.unshift(data);
                }
            });
        } else {
            this.frequentFoodProducts = this.foodProducts;
        }
        if (this.frequentFoodProducts.length > 9) {
            this.frequentFoodProducts.length = 10;
        }
        if (this.frequentFoodProducts.length > 0) {
            let frequentFoodProducts = [];
            this.frequentFoodProducts.forEach(food => {
                frequentFoodProducts.push(JSON.stringify(food));
            });
            localforage.setItem('frequentFoodProducts', frequentFoodProducts);
        } else {
            localforage.setItem('frequentFoodProducts', []);
        }

    }

    getFrequentFoodProducts() {
        localforage.getItem('frequentFoodProducts', (err, value: string[]) => {
            if (err) {
                console.error(err);
            } else {
                this.frequentFoodProducts = value.map(foodProduct => JSON.parse(foodProduct));
            }
        });
    }

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
            header: foodNameToUppercase(foodProduct.name),
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

    render() {
        return [
            <ion-header>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        :
                        <ion-toolbar color="primary">
                            <ion-buttons slot="start">
                                <ion-button href="/">
                                    <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                            <ion-searchbar animated debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
                            <ion-buttons slot="end">
                                <ion-button onClick={this.getBarcode.bind(this)}>
                                    <ion-icon slot="icon-only" name="barcode"></ion-icon>
                                </ion-button>
                                <ion-button onClick={() => this.presentCreateModal({ mode: 'create' })}>
                                    Create
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                }
            </ion-header>
            ,
            <ion-content id="food-list-content" class="ion-padding">
                {
                    this.foodProducts.length > 0
                        ? this.foodProducts.map((foodItem, index) =>
                            <ion-card onClick={_ => this.showSelectionWindow(foodItem)}>
                                {
                                    index % 2
                                        ? <ion-card-header color="secondary">
                                            <ion-label>{foodNameToUppercase(foodItem.name)} </ion-label>
                                        </ion-card-header>
                                        : <ion-card-header color="tertiary">
                                            <ion-label>{foodNameToUppercase(foodItem.name)} </ion-label>
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
                        : <h1>Recent</h1>
                }
                <div id="food-list-barcode"></div>
                {
                    this.frequentFoodProducts.length > 0 && this.foodProducts.length <= 0
                        ? this.frequentFoodProducts.map((foodItem, index) =>
                            <ion-card onClick={_ => this.showSelectionWindow(foodItem)}>
                                {
                                    index % 2
                                        ? <ion-card-header color="tertiary">
                                            <ion-label>{foodNameToUppercase(foodItem.name)} </ion-label>
                                        </ion-card-header>
                                        : <ion-card-header color="secondary">
                                            <ion-label>{foodNameToUppercase(foodItem.name)} </ion-label>
                                        </ion-card-header>
                                }
                                <ion-item lines="none">
                                    <ion-label>
                                        {foodItem.servingSize.size} {foodItem.servingSize.measurement}
                                    </ion-label>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>Servings per Container {foodItem.servingPerContainer}</ion-label>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>{foodItem.calories} calories</ion-label>
                                </ion-item>
                            </ion-card>
                        )
                        : ''
                }
            </ion-content>
            ,
            <ion-footer>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ?
                        <ion-toolbar color="primary">
                            <ion-buttons slot="start">
                                <ion-button href="/">
                                    <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                            <ion-searchbar animated debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
                            <ion-buttons slot="end">
                                <ion-button onClick={this.getBarcode.bind(this)}>
                                    <ion-icon slot="icon-only" name="barcode"></ion-icon>
                                </ion-button>
                                <ion-button onClick={() => this.presentCreateModal({ mode: 'create' })}>
                                    Create
                            </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                        : ''
                }
            </ion-footer>
        ]
    }
}
