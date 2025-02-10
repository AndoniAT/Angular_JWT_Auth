/**
 * Author: Andoni ALONSO TORT
 */

import axios from "axios";

const BACK_END_URL = "http://localhost:8000";

export default axios.create( {
    baseURL: BACK_END_URL
} );

export const axiosPrivate = axios.create( {
    baseURL: BACK_END_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
} );