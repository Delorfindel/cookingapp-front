
export const initialStateFeed = {
  recipes: [],
};

export const FeedReducer = (prevState = initialStateFeed, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'addRecipes':
      return {
        ...prevState,
        recipes: [
          ...prevState.recipes,
          ...payload,
        ],
      };
    default:
      return prevState;
  }
};
