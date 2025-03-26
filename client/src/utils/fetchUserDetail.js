import Axios from "./Axios";
import SummeryApi from "../common/SummeryApi";

export const fetchUserDetail = async () => {
    try{    
        const response = await Axios({
            ...SummeryApi.getUserDetails,
        });
        return response.data;
    }catch(error){
        console.log(error);
        return null;
    }
}