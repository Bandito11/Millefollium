const errorMessage = `Couldn't retrieve data from file.`;
const fileName = 'USDA-SR28-V1.csv';
fetch(`/assets/${fileName}`)
    .then(res => res.ok ? res.text() : errorMessage)
    .then((data) => {
        if (data.startsWith(errorMessage)) {
            console.log(data);
        } else {
            const temp = data.split(`\n`);
            const foodData = temp.map(row => {
                const newRow = row.split(',');
                return (newRow);
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