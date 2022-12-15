import * as api from "../../api";
import { updateCategories } from "./categories-slice";

// Fetch categories, if successful update categories state slice
export const fetchCategories = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCategories();

        if (data.categories) {
            dispatch(updateCategories(data.categories));
        }
    } catch (error) {
        console.log(error);
    }
};