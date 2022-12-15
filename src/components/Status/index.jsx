import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetStatus } from "../../store/status/status-slice";

export default function Status() {
    const location = useLocation();
    const dispatch = useDispatch();

    // Reset statuses when changing pages
    useEffect(() => {
        dispatch(resetStatus());
    }, [location, dispatch])

    return;
}