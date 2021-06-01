export const mockRecipeInfo = {
    name: 'French Toast',
    ingredients: [
        { name: 'bread', amount: '4 slices (about 80 calories)' },
        { name: 'vanilla extract', amount: '1 tsp (about 20 calories)' },
        { name: 'cinammon', amount: '1 tbsp (about 60 calories)' }
    ],
    image: '/assets/images/frenchtoast.jpg',
    protein: 24,
    carbs: 12,
    steps: [
        'in a medium bowl mix the cinammon, vanilla extract and white eggs',
        'soak the bread in the mixture created in the first step',
        'spray a pan with cooking spray',
        'cook in a pan at medium low temperature',
        'after a minute or two turn it around. If it\'s brownish color it is done, if not after doing the same with the other side turn it around again and cook it for a few more minutes.',
        'repeat for 4 more breads slices.'
    ],
    calories: 400,
    fat: 19,
    category: 'breakfast',
    ratings: 5
}

export const mockRecipes = [
    {
        name: 'French Toast',
        ingredients: [],
        image: '/assets/images/frenchtoast.jpg',
        protein: 24,
        carbs: 12,
        steps: [],
        calories: 400,
        fat: 19,
        category: 'breakfast',
        ratings: 5
    },
    {
        name: 'Chicken with Rice & Spinach',
        ingredients: [],
        image: '/assets/images/chickenrice.jpg',
        protein: 30,
        carbs: 40,
        steps: [],
        calories: 600,
        fat: 10,
        category: 'dinner',
        ratings: 3
    }
];

export function mockDailyEntries() {
    const frenchToast = {
        name: 'French Toast',
        ingredients: [],
        image: '/assets/images/frenchtoast.jpg',
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
        image: '/assets/images/chickenrice.jpg',
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
