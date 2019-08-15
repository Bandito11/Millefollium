import { IDaily } from "../interfaces";

export const MOCKDAILY: IDaily = {
    breakfast: [{
        servingsSize: 7,
        name: 'banana',
        calories: 40,
        dietaryFiber: {
            grams: 6,
            percent: 0
        },
        totalCarbohydrates: {
            grams: 6,
            percent: 0
        },
        fat: {
            total: {
                grams: 5,
                percent: 0
            },
            saturated: {
                grams: 6,
                percent: 0
            },
            trans: {
                grams: 3,
                percent: 0
            },
            polyunsaturated: {
                grams: 8,
                percent: 0
            },
            monounsaturated: {
                grams: 13,
                percent: 0
            },
        },
        protein: 1,
        sugar: {
            added: {
                grams: 25,
                percent: 0
            },
            total: {
                grams: 32,
                percent: 0
            }
        },
        sugarAlcohol: {
            added: {
                grams: 32,
                percent: 0
            },
            total: {
                grams: 34,
                percent: 0
            }
        }
    }],
    breakfastSnack: [],
    lunch: [{
        servingsSize: 7,
        name: 'rice',
        calories: 30,
        dietaryFiber: {
            grams: 3,
            percent: 0
        },
        totalCarbohydrates: {
            grams: 3,
            percent: 0
        },
        fat: {
            total: {
                grams: 34,
                percent: 0
            },
            saturated: {
                grams: 12,
                percent: 0
            },
            trans: {
                grams: 8,
                percent: 0
            },
            polyunsaturated: {
                grams: 92,
                percent: 0
            },
            monounsaturated: {
                grams: 31,
                percent: 0
            },
        },
        protein: 13,
        sugar: {
            added: {
                grams: 3,
                percent: 0
            },
            total: {
                grams: 32,
                percent: 0
            }
        },
        sugarAlcohol: {
            added: {
                grams: 1,
                percent: 0
            },
            total: {
                grams: 0,
                percent: 0
            }
        }
    }, {
        servingsSize: 7,
        name: 'beans',
        calories: 12,
        dietaryFiber: {
            grams: 92,
            percent: 0
        },
        totalCarbohydrates: {
            grams: 92,
            percent: 0
        },
        fat: {
            total: {
                grams: 48,
                percent: 0
            },
            saturated: {
                grams: 31,
                percent: 0
            },
            trans: {
                grams: 83,
                percent: 0
            },
            polyunsaturated: {
                grams: 32,
                percent: 0
            },
            monounsaturated: {
                grams: 78,
                percent: 0
            },
        },
        protein: 0,
        sugar: {
            added: {
                grams: 32,
                percent: 0
            },
            total: {
                grams: 55,
                percent: 0
            }
        },
        sugarAlcohol: {
            added: {
                grams: 43,
                percent: 0
            },
            total: {
                grams: 34,
                percent: 0
            }
        }
    }],
    lunchSnack: [],
    dinner: [{
        servingsSize: 7,
        name: 'Baconator',
        calories: 1200,
        dietaryFiber: {
            grams: 6,
            percent: 0
        },
        totalCarbohydrates: {
            grams: 6,
            percent: 0
        },
        fat: {
            total: {
                grams: 34,
                percent: 0
            },
            saturated: {
                grams: 34,
                percent: 0
            },
            trans: {
                grams: 34,
                percent: 0
            },
            polyunsaturated: {
                grams: 34,
                percent: 0
            },
            monounsaturated: {
                grams: 34,
                percent: 0
            },
        },
        protein: 24,
        sugar: {
            added: {
                grams: 32,
                percent: 0
            },
            total: {
                grams: 35,
                percent: 0
            }
        },
        sugarAlcohol: {
            added: {
                grams: 34,
                percent: 0
            },
            total: {
                grams: 35,
                percent: 0
            }
        }
    }],
    dinnerSnack: [{
        servingsSize: 7,
        name: 'Protein Drink',
        calories: 125,
        dietaryFiber: {
            grams: 54,
            percent: 0
        },
        totalCarbohydrates: {
            grams: 54,
            percent: 0
        },
        fat: {
            total: {
                grams: 33,
                percent: 0
            },
            saturated: {
                grams: 22,
                percent: 0
            },
            trans: {
                grams: 323,
                percent: 0
            },
            polyunsaturated: {
                grams: 24,
                percent: 0
            },
            monounsaturated: {
                grams: 2,
                percent: 0
            },
        },
        protein: 32,
        sugar: {
            added: {
                grams: 40,
                percent: 0
            },
            total: {
                grams: 50,
                percent: 0
            }
        },
        sugarAlcohol: {
            added: {
                grams: 65,
                percent: 0
            },
            total: {
                grams: 85,
                percent: 0
            }
        }
    }]
};

export const MOCKENTRIES: IDaily[] = [
    {
        date: new Date('12/03/2019'),
        breakfast: [{
            servingsSize: 12,
            name: 'oatmeal',
            calories: 24,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 76,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        breakfastSnack: [],
        lunch: [{
            servingsSize: 7,
            name: 'rice',
            calories: 30,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }, {
            servingsSize: 7,
            name: 'fish',
            calories: 40,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        lunchSnack: [],
        dinner: [{
            servingsSize: 7,
            name: 'Yogurt',
            calories: 60,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 23,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 64,
                    percent: 0
                },
                total: {
                    grams: 14,
                    percent: 0
                }
            }
        }, {
            servingsSize: 7,
            name: 'Chocolate Milk',
            calories: 126,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        dinnerSnack: [{
            servingsSize: 13,
            name: 'Protein Drink',
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 81,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            },
            calories: 125
        }]
    }, {
        date: new Date('12/04/2019'),
        breakfast: [{
            servingsSize: 7,
            name: 'cereal',
            calories: 80,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        breakfastSnack: [{
            servingsSize: 10,
            name: 'Protein Drink',
            calories: 125,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        lunch: [{
            servingsSize: 7,
            name: 'rice',
            calories: 30,
            dietaryFiber: {
                grams: 6,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 6,
                percent: 0
            },
            fat: {
                total: {
                    grams: 5,
                    percent: 0
                },
                saturated: {
                    grams: 6,
                    percent: 0
                },
                trans: {
                    grams: 3,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 8,
                    percent: 0
                },
                monounsaturated: {
                    grams: 13,
                    percent: 0
                },
            },
            protein: 1,
            sugar: {
                added: {
                    grams: 25,
                    percent: 0
                },
                total: {
                    grams: 32,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 32,
                    percent: 0
                },
                total: {
                    grams: 34,
                    percent: 0
                }
            }
        }, {
            servingsSize: 7,
            name: 'beans',
            calories: 12,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 46,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }, {
            servingsSize: 7,
            name: 'salad',
            calories: 50,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        lunchSnack: [{
            servingsSize: 2,
            name: 'Protein Drink',
            calories: 125,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        dinner: [{
            servingsSize: 1,
            name: 'Big Mac',
            calories: 1200,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 21,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        dinnerSnack: [{
            servingsSize: 3,
            name: 'Protein Drink',
            calories: 125,
            dietaryFiber: {
                grams: 6,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 6,
                percent: 0
            },
            fat: {
                total: {
                    grams: 5,
                    percent: 0
                },
                saturated: {
                    grams: 6,
                    percent: 0
                },
                trans: {
                    grams: 3,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 8,
                    percent: 0
                },
                monounsaturated: {
                    grams: 13,
                    percent: 0
                },
            },
            protein: 1,
            sugar: {
                added: {
                    grams: 25,
                    percent: 0
                },
                total: {
                    grams: 32,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 32,
                    percent: 0
                },
                total: {
                    grams: 34,
                    percent: 0
                }
            }
        }]
    }, {
        date: new Date('12/05/2019'),
        breakfast: [{
            servingsSize: 5,
            name: 'banana',
            calories: 40,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        breakfastSnack: [],
        lunch: [{
            servingsSize: 2,
            name: 'salad',
            calories: 45,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 93,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }, {
            servingsSize: 9,
            name: 'chicken',
            calories: 234,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 50,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        lunchSnack: [{
            servingsSize: 2,
            name: 'Protein bar',
            calories: 250,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        dinner: [{
            servingsSize: 1,
            name: 'Chicken sandwhich',
            calories: 350,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }],
        dinnerSnack: [{
            servingsSize: 8,
            name: 'Protein Drink',
            calories: 125,
            dietaryFiber: {
                grams: 54,
                percent: 0
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 0
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 0
                },
                saturated: {
                    grams: 22,
                    percent: 0
                },
                trans: {
                    grams: 323,
                    percent: 0
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 0
                },
                monounsaturated: {
                    grams: 2,
                    percent: 0
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 0
                },
                total: {
                    grams: 50,
                    percent: 0
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 0
                },
                total: {
                    grams: 85,
                    percent: 0
                }
            }
        }]
    }
];