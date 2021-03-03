export const findRatingsIndex = async ({id, recipe}) => recipe.ratings.findIndex(rating => rating.id === id);
