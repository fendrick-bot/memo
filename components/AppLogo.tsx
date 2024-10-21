import dark_logo from "@/public/dark-logo.svg";
import light_logo from "@/public/light-logo.svg";
import Image from "next/image";

export function AppLogo(){
    const logo_size = 32;
    return (
        <div className="pr-1">
            <Image src={dark_logo} alt="Memo Logo" width={logo_size} height={logo_size} className="dark:hidden"/>
            <Image src={light_logo} alt="Memo Logo" width={logo_size} height={logo_size} className="hidden dark:block" />
        </div>

    )
}