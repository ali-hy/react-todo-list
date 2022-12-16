import { createSelector } from "reselect";

const selectCategorySlice = state => state.category;

export const selectCategories = createSelector(
    [selectCategorySlice],
    category => category.categories
)

export const selectSelectedCategory =  createSelector(
    [selectCategorySlice],
    category => category.selectedCategory 
)