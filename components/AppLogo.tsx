import dark_logo from "@/public/dark-logo.svg";
import light_logo from "@/public/light-logo.svg";
import Image from "next/image";

export function AppLogo(){
    return (
        <div className="pr-1">
            <Image src={dark_logo} alt="Memo Logo" width={33} height={33} className="dark:hidden"/>
            <Image src={light_logo} alt="Memo Logo" width={33} height={33} className="hidden dark:block" />
        </div>

    )
}