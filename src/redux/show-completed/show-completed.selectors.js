import { createSelector } from "reselect";

const selectShowCompletedSlice = state => state.showCompleted;
export const selectShowCompleted = createSelector(
    [selectShowCompletedSlice],
    showCompletedSlice => showCompletedSlice.showCompleted
)