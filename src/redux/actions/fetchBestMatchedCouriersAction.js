import callAPI from "../../utils/api";
import {
    fetchMatchCouriers,
    fetchMatchCouriersSuccess,
} from "../slices/matchedCouriersSlice";

export const fetchMatchCouriersAction = (id) => async (dispatch, getState) => {
    console.log("fetchMatchCouriersAction");
    try {
        const result = await callAPI("/api/resolution/courier-search/" + id, "GET", true);
        dispatch(fetchMatchCouriers());
        dispatch(fetchMatchCouriersSuccess(result));
    } catch (error) {
        console.log(error);
    }
};
