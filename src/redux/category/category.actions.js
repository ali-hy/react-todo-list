export const selectCategory = categoryIndex => {
    return {
        type: "SELECT_CATEGORY",
        payload: categoryIndex,
    }
}