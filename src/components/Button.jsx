import { Children } from "react";

export default function Button({children, buttonType, btnClassName}){

    return (
        <button type={buttonType} className={btnClassName} >{children}</button>
    )
}