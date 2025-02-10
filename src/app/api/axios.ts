/**
 * Author: Andoni ALONSO TORT
 */

import axios from "axios";
import { environment } from "../../environments/environment";

const BACK_END_URL = environment.BACK_END_URL;

export default axios.create( {
    baseURL: BACK_END_URL
} );

export const axiosPrivate = axios.create( {
    baseURL: BACK_END_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
} );