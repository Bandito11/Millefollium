export function mockDailyEntries() {
    const frenchToast = {
        name: 'French Toast',
        ingredients: [],
        image: 'assets/images/frenchtoast.jpg',
        protein: 24,
        carbs: 12,
        steps: [],
        calories: 400,
        fat: 19,
        category: 'breakfast',
        ratings: 5
    }

    const chickenRice = {
        name: 'Chicken with Rice & Spinach',
        ingredients: [],
        image: 'assets/images/chickenrice.jpg',
        protein: 30,
        carbs: 40,
        steps: [],
        calories: 600,
        fat: 10,
        category: 'dinner',
        ratings: 3
    }
    const daily1 = {
        date: new Date('11/02/2020').valueOf(),
        meals: [chickenRice, frenchToast]
    };
    const daily2 = {
        date: new Date('11/01/2020').valueOf(),
        meals: [frenchToast]
    };

    const daily3 = {
        date: new Date('10/31/2020').valueOf(),
        meals: [chickenRice]
    };

    return [daily1, daily2, daily3]
}
