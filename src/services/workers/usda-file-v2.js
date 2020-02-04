const errorMessage = `Couldn't retrieve data from file.`;
const fileName = 'USDA-SR28-V1.csv';
fetch(`/assets/${fileName}`)
    .then(res => res.ok ? res.text() : errorMessage)
    .then((data: string) => {
        if (data.startsWith(errorMessage)) {
            console.log(data);
        } else {
            postMessage(createUSDAObject(createUSDAArray(data)));
        }
    });

// let foodDataWorker;
// if (typeof(foodDataWorker) == "undefined") {
//   foodDataWorker = new Worker("workers/usda-file.js");
// }
// foodDataWorker.onmessage = function(event){
//   TODO: Do something with event
// };

function createUSDAArray(data: string): IUSDA[] {
    const temp = data.split(`\n`);
    const foodData = temp.map((rows) => {
        const usda = {
            databaseNumber: 0,
            foodGroup: '',
            foodName: '',
            protein: 0,
            fat: 0,
            carbohydrates: 0,
            ash: 0,
            calories: 0,
            starch: 0,
            sucrose: 0,
            glucose: 0,
            fructose: 0,
            lactose: 0,
            maltose: 0,
            alcohol: 0,
            water: 0,
            caffeine: 0,
            theobromine: 0,
            sugar: 0,
            galactose: 0,
            fiber: 0,
            calcium: 0,
            iron: 0,
            magnesium: 0,
            phosphorus: 0,
            potassium: 0,
            sodium: 0,
            zinc: 0,
            cupper: 0,
            fluoride: 0,
            manganese: 0,
            selenium: 0,
            vitaminA: 0,
            retinol: 0,
            retinolEquivalents: 0,
            betaCarotene: 0,
            alphaCarotene: 0,
            vitaminE: 0,
            vitaminD: 0,
            vitaminD2: 0,
            vitaminD3: 0,
            betaCryptoxanthin: 0,
            lycopene: 0,
            luteinAndZeaxanthin: 0,
            vitaminC: 0,
            thiamin: 0,
            riboflavin: 0,
            niacin: 0,
            vitaminB5: 0,
            vitaminB6: 0,
            folate: 0,
            vitaminB12: 0,
            choline: 0,
            cholesterol: 0,
            saturatedFat: 0,
            netCarbs: 0
        };
        const usdaFood = rows.split(';');
        usdaFood.map((row, index) => {
            const prop = Object.entries(usda)[index][0];
            usda[prop] = row;
        });
        return usda;
    });
    return foodData;
}

function createUSDAObject(foodData): IFoodProduct[] {
    const foodProduct: IFoodProduct = {
        name: '',
        barcode: '',
        picture: '',
        servingPerContainer: '1',
        servingSize: {
            size: '1',
            grams: '100',
            measurement: 'serving',
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
    foodData.forEach(product => {
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
        });
    });
    return usdaProducts;
}
