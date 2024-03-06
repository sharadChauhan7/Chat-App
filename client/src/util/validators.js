import { isValidUsername,useStrongPassword } from "6pp";
import {isValidPhoneNumber} from "6pp";

export const usernameValidator = (userName) => {
if(userName && !isValidUsername(userName)){
    return { isValid: false, errorMessage: "Username is invalid" };
}
};
export const phoneValidator =(password)=>{
    if(password && !isValidPhoneNumber(password)){
        return {isValid:false,errorMessage:"Enter valid Phone number"};
    }
}
