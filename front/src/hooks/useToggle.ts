import { useState } from "react";

const useToggle = (inital:boolean = true): [boolean, () => void] => {
    const [value, setValue] = useState<boolean>(inital);

    const toggle = ():void => {
        setValue(v => !v);
    }

    return [value, toggle];
}

export default useToggle;