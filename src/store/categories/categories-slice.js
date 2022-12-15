import { createSlice } from "@reduxjs/toolkit";

// State slice for categories
const categoriesSlice = createSlice({
    name: "categories",
    initialState: { type: [], facilities: [] },
    reducers: {
        updateCategories(state, action) {
            // Split categories into type and facilities
            state.type = action.payload.type;
            state.facilities = action.payload.facilities;
        },
    }
});

export const { updateCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;