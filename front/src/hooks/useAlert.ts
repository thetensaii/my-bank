import { useEffect, useState } from "react";
import { AlertTypes } from "components/Alert/AlertView";

export const useAlert = (type : AlertTypes | null = null, message : string | null = null) : 
                            [ // tuple returned
                                {type:AlertTypes, message :string} | null, 
                                (type:AlertTypes, message :string) => void,
                                () => void
                            ] => {
    const [alert, setAlert] = useState<{type:AlertTypes, message:string}|null>(type && message ? {type, message} : null)

    
    const updateAlert = (type : AlertTypes, message:string) : void => {
        setAlert({type, message});
    }
    
    const removeAlert = () => {
        setAlert(null);
    }

    useEffect(() => {
        return () => removeAlert();
    }, [])

    

    return [alert, updateAlert, removeAlert];
}