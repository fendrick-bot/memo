import dark_logo from "@/public/dark-logo.svg";
import Image from "next/image";

export function AppLogo(){
    const logo_size = 32;
    return (
        <div className="pr-1">
            <Image src={dark_logo} alt="Memo Logo" width={logo_size} height={logo_size}/>
          
        </div>

    )
}