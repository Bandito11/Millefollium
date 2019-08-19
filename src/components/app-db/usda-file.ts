
export function getFoodData() {
    fetch('./assets/USDA-SR28-V1.csv')
        .then(res => res.ok ? res.text() : `Couldn't retrieve data from USDA file.`)
        .then((data: string) => {
            if (data.startsWith(`Couldn't`)) {
                console.error(data);
            } else {
                const temp = data.split(`\n`);
                const foodData = temp.map(row => {
                    const newRow = row.split(',');
                    return newRow;
                });
                console.log(foodData)
            }
        });
}