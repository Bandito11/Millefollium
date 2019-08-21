import { measurements } from './utils';
import { IFoodItem, IDaily } from "../interfaces";

export const MOCKDAILY: IDaily = {
    breakfast: [{
        servingsSize: 7,
        name: 'banana',
        calories: 40,
        dietaryFiber: {
            grams: 6,
            percent: 23
        },
        totalCarbohydrates: {
            grams: 6,
            percent: 23
        },
        fat: {
            total: {
                grams: 5,
                percent: 665
            },
            saturated: {
                grams: 6,
                percent: 13
            },
            trans: {
                grams: 3,
                percent: 46
            },
            polyunsaturated: {
                grams: 8,
                percent: 234
            },
            monounsaturated: {
                grams: 13,
                percent: 13
            },
        },
        protein: 1,
        sugar: {
            added: {
                grams: 25,
                percent: 87
            },
            total: {
                grams: 32,
                percent: 45
            }
        },
        sugarAlcohol: {
            added: {
                grams: 32,
                percent: 45
            },
            total: {
                grams: 34,
                percent: 12
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
                    percent: 45
                }
            }
        }],
        dinner: [{
            servingsSize: 1,
            name: 'Big Mac',
            calories: 1200,
            dietaryFiber: {
                grams: 54,
                percent: 34
            },
            totalCarbohydrates: {
                grams: 21,
                percent: 34
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 14
                },
                saturated: {
                    grams: 22,
                    percent: 45
                },
                trans: {
                    grams: 323,
                    percent: 56
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 87
                },
                monounsaturated: {
                    grams: 2,
                    percent: 34
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 21
                },
                total: {
                    grams: 50,
                    percent: 56
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 45
                },
                total: {
                    grams: 85,
                    percent: 76
                }
            }
        }],
        dinnerSnack: [{
            servingsSize: 3,
            name: 'Protein Drink',
            calories: 125,
            dietaryFiber: {
                grams: 6,
                percent: 23
            },
            totalCarbohydrates: {
                grams: 6,
                percent: 45
            },
            fat: {
                total: {
                    grams: 5,
                    percent: 54
                },
                saturated: {
                    grams: 6,
                    percent: 450
                },
                trans: {
                    grams: 3,
                    percent: 46
                },
                polyunsaturated: {
                    grams: 8,
                    percent: 24
                },
                monounsaturated: {
                    grams: 13,
                    percent: 74
                },
            },
            protein: 1,
            sugar: {
                added: {
                    grams: 25,
                    percent: 374
                },
                total: {
                    grams: 32,
                    percent: 24
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 32,
                    percent: 86
                },
                total: {
                    grams: 34,
                    percent: 30
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
                percent: 17
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 15
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 37
                },
                saturated: {
                    grams: 22,
                    percent: 34
                },
                trans: {
                    grams: 323,
                    percent: 34
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 35
                },
                monounsaturated: {
                    grams: 2,
                    percent: 36
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 32
                },
                total: {
                    grams: 50,
                    percent: 36
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 14
                },
                total: {
                    grams: 85,
                    percent: 43
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
                percent: 53
            },
            totalCarbohydrates: {
                grams: 93,
                percent: 64
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 24
                },
                saturated: {
                    grams: 22,
                    percent: 864
                },
                trans: {
                    grams: 323,
                    percent: 56
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 82
                },
                monounsaturated: {
                    grams: 2,
                    percent: 28
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 28
                },
                total: {
                    grams: 50,
                    percent: 75
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 25
                },
                total: {
                    grams: 85,
                    percent: 68
                }
            }
        }, {
            servingsSize: 9,
            name: 'chicken',
            calories: 234,
            dietaryFiber: {
                grams: 54,
                percent: 86
            },
            totalCarbohydrates: {
                grams: 50,
                percent: 28
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 52
                },
                saturated: {
                    grams: 22,
                    percent: 58
                },
                trans: {
                    grams: 323,
                    percent: 18
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 42
                },
                monounsaturated: {
                    grams: 2,
                    percent: 37
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 86
                },
                total: {
                    grams: 50,
                    percent: 43
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 56
                },
                total: {
                    grams: 85,
                    percent: 56
                }
            }
        }],
        lunchSnack: [{
            servingsSize: 2,
            name: 'Protein bar',
            calories: 250,
            dietaryFiber: {
                grams: 54,
                percent: 97
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 24
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 57
                },
                saturated: {
                    grams: 22,
                    percent: 85
                },
                trans: {
                    grams: 323,
                    percent: 57
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 45
                },
                monounsaturated: {
                    grams: 2,
                    percent: 245
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 78
                },
                total: {
                    grams: 50,
                    percent: 13
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 86
                },
                total: {
                    grams: 85,
                    percent: 45
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
                percent: 8
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 57
                },
                saturated: {
                    grams: 22,
                    percent: 854
                },
                trans: {
                    grams: 323,
                    percent: 38
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 36
                },
                monounsaturated: {
                    grams: 2,
                    percent: 56
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 58
                },
                total: {
                    grams: 50,
                    percent: 87
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 45
                },
                total: {
                    grams: 85,
                    percent: 76
                }
            }
        }],
        dinnerSnack: [{
            servingsSize: 8,
            name: 'Protein Drink',
            calories: 125,
            dietaryFiber: {
                grams: 54,
                percent: 56
            },
            totalCarbohydrates: {
                grams: 54,
                percent: 56
            },
            fat: {
                total: {
                    grams: 33,
                    percent: 86
                },
                saturated: {
                    grams: 22,
                    percent: 45
                },
                trans: {
                    grams: 323,
                    percent: 67
                },
                polyunsaturated: {
                    grams: 24,
                    percent: 76
                },
                monounsaturated: {
                    grams: 2,
                    percent: 67
                },
            },
            protein: 32,
            sugar: {
                added: {
                    grams: 40,
                    percent: 57
                },
                total: {
                    grams: 50,
                    percent: 57
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 65,
                    percent: 45
                },
                total: {
                    grams: 85,
                    percent: 75
                }
            }
        }]
    }
];

export const MOCKFOODITEMS: IFoodItem[] = [{
    name: 'banana',
    barcode: '',
    picture: '',
    servingPerContainer: 1,
    servingSize: {
        amount: 34,
        measurement: measurements[measurements.pieces]
    },
    calories: 50,
    fat: {
        total: {
            percent: 0,
            grams: 0
        },
        saturated: {
            percent: 0,
            grams: 0
        },
        trans: {
            percent: 0,
            grams: 0
        },
        polyunsaturated: {
            percent: 0,
            grams: 0
        },
        monounsaturated: {
            percent: 9,
            grams: 0
        },
    },
    cholesterol: {
        percent: 3,
        grams: 30
    },
    sodium: {
        percent: 237,
        grams: 0
    },
    potassium: {
        percent: 567,
        grams: 50
    },
    totalCarbohydrates: {
        percent: 567,
        grams: 40
    },
    dietaryFiber: {
        percent: 76,
        grams: 10
    },
    protein: {
        percent: 67,
        grams: 10
    },
    niacin: {
        percent: 78,
        grams: 65
    },
    phosphorus: {
        percent: 37,
        grams: 12
    },
    calcium: {
        percent: 37,
        grams: 10
    },
    iron: {
        percent: 53,
        grams: 76
    },
    magnesium: {
        percent: 765,
        grams: 32
    },
    manganese: {
        percent: 67,
        grams: 79
    },
    dateCreated: new Date().toString(),
    vitamin: {
        A: {
            percent: 0,
            grams: 0
        },
        B: {
            percent: 0,
            grams: 0
        },
        C: {
            percent: 37,
            grams: 145
        },
        D: {
            percent: 0,
            grams: 0
        },
        E: {
            percent: 0,
            grams: 0
        },
    },
    sugar: {
        total: {
            percent: 67,
            grams: 12
        },
        added: {
            grams: 0,
            percent: 0
        }
    },
    sugarAlcohol: {
        total: {
            percent: 0,
            grams: 0
        },
        added: {
            grams: 0,
            percent: 0
        }
    }
},
{
    name: 'apple',
    barcode: '',
    picture: '',
    servingPerContainer: 1,
    servingSize: {
        amount: 4,
        measurement: measurements[measurements.piece]
    },
    calories: 40,
    fat: {
        total: {
            percent: 0,
            grams: 0
        },
        saturated: {
            percent: 0,
            grams: 0
        },
        trans: {
            percent: 0,
            grams: 0
        },
        polyunsaturated: {
            percent: 0,
            grams: 0
        },
        monounsaturated: {
            percent: 0,
            grams: 0
        },
    },
    cholesterol: {
        percent: 53,
        grams: 15
    },
    sodium: {
        percent: 0,
        grams: 0
    },
    potassium: {
        percent: 0,
        grams: 0
    },
    totalCarbohydrates: {
        percent: 68,
        grams: 34
    },
    dietaryFiber: {
        percent: 53,
        grams: 10
    },
    protein: {
        percent: 97,
        grams: 10
    },
    niacin: {
        percent: 0,
        grams: 0
    },
    phosphorus: {
        percent: 27,
        grams: 12
    },
    calcium: {
        percent: 0,
        grams: 0
    },
    iron: {
        percent: 0,
        grams: 0
    },
    magnesium: {
        percent: 0,
        grams: 0
    },
    manganese: {
        percent: 0,
        grams: 0
    },
    dateCreated: new Date().toString(),
    vitamin: {
        A: {
            percent: 56,
            grams: 67
        },
        B: {
            percent: 0,
            grams: 0
        },
        C: {
            percent: 56,
            grams: 405
        },
        D: {
            percent: 0,
            grams: 0
        },
        E: {
            percent: 0,
            grams: 0
        },
    },
    sugar: {
        total: {
            percent: 73,
            grams: 12
        },
        added: {
            grams: 0,
            percent: 0
        }
    },
    sugarAlcohol: {
        total: {
            percent: 0,
            grams: 0
        },
        added: {
            grams: 0,
            percent: 0
        }
    }
}, {
    name: 'Protein Drink',
    barcode: '',
    picture: '',
    servingPerContainer: 1,
    servingSize: {
        amount: 40,
        measurement: measurements[measurements.oz]
    },
    calories: 120,
    fat: {
        total: {
            percent: 0,
            grams: 0
        },
        saturated: {
            percent: 0,
            grams: 0
        },
        trans: {
            percent: 0,
            grams: 0
        },
        polyunsaturated: {
            percent: 0,
            grams: 0
        },
        monounsaturated: {
            percent: 0,
            grams: 0
        },
    },
    cholesterol: {
        percent: 953,
        grams: 50
    },
    sodium: {
        percent: 62,
        grams: 3
    },
    potassium: {
        percent: 61,
        grams: 0
    },
    totalCarbohydrates: {
        percent: 32,
        grams: 0
    },
    dietaryFiber: {
        percent: 20,
        grams: 34
    },
    protein: {
        percent: 456,
        grams: 20
    },
    niacin: {
        percent: 0,
        grams: 0
    },
    phosphorus: {
        percent: 0,
        grams: 0
    },
    calcium: {
        percent: 0,
        grams: 0
    },
    iron: {
        percent: 0,
        grams: 0
    },
    magnesium: {
        percent: 0,
        grams: 0
    },
    manganese: {
        percent: 0,
        grams: 0
    },
    dateCreated: new Date().toString(),
    vitamin: {
        A: {
            percent: 0,
            grams: 0
        },
        B: {
            percent: 0,
            grams: 0
        },
        C: {
            percent: 0,
            grams: 0
        },
        D: {
            percent: 0,
            grams: 0
        },
        E: {
            percent: 0,
            grams: 0
        },
    },
    sugar: {
        total: {
            percent: 0,
            grams: 0
        },
        added: {
            grams: 0,
            percent: 0
        }
    },
    sugarAlcohol: {
        total: {
            percent: 0,
            grams: 0
        },
        added: {
            grams: 0,
            percent: 0
        }
    }
},];