const errorMessage = `Couldn't retrieve data from file.`;
const fileName = 'USDA-SR28-V1.csv';
fetch(`/assets/${fileName}`)
    .then(res => res.ok ? res.text() : errorMessage)
    .then((data) => {
        if (data.startsWith(errorMessage)) {
            console.log(data);
        } else {
            const temp = data.split(`\n`);
            const foodData = temp.map((rows, rowIndex) => {
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
                    potasssium: 0,
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
            postMessage(foodData);
        }
    });

    // let foodDataWorker;
    // if (typeof(foodDataWorker) == "undefined") {
    //   foodDataWorker = new Worker("workers/usda-file.js");
    // }
    // foodDataWorker.onmessage = function(event){
    //   TODO: Do something with event
    // };