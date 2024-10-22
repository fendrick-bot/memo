import Image from "next/image";
import convert_to_prefix from "@/public/convert_to_prefix.png";
import convert_to_postfix from "@/public/convert_to_postfix.png";
import postfix_to_infix from "@/public/postfix_to_infix.png";
import prefix_to_infix from "@/public/prefix_to_infix.png";

export default function Home() {
  return (
    <div className="w-full h-full mt-6 lg:w-1/2 m-auto min-h-[500px] ">
      <hr className=" bg-black" />
      <br />
      <h1 className="font-bold text-3xl text-black text-center w-full md:w-4/5 m-auto md:text-3xl">
        Online Polish Notation Calculator
      </h1>
      {/* <p className="text-gray-600">
        Welcome to our Polish Notation Converter! This tool is designed to help
        you effortlessly convert and evaluate expressions in various forms of
        Polish notation, including prefix (Polish) and postfix (Reverse Polish)
        notations.
      </p> */}
      <br />
      <div className="grid grid-cols-2 w-fit m-auto gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Image
          src={convert_to_prefix}
          className="w-full rounded-2xl shadow-lg"
          alt=""
          
        />
        <Image
          src={convert_to_postfix}
          className="w-full rounded-2xl shadow-lg"
          alt=""
        />
        

        {/* <div className=" flex w-32 h-32 border-4 border-white rounded-lg shadow-lg text-center font-bold bg-gray-300 items-center hover:bg-white hover:shadow-xl hover:border-gray-700 transition-all cursor-pointer">
          Convert to Prefix
        </div>
        <div className=" flex w-32 h-32 border-4 border-white rounded-lg shadow-lg text-center font-bold bg-gray-300 items-center hover:bg-white hover:shadow-xl hover:border-gray-700 transition-all cursor-pointer">
          Convert to Postfix
        </div>
        <div className=" flex w-32 h-32 border-4 border-white rounded-lg shadow-lg text-center font-bold bg-gray-300 items-center hover:bg-white hover:shadow-xl hover:border-gray-700 transition-all cursor-pointer">
          Prefix to ⠀Infix⠀
        </div>
        <div className=" flex w-32 h-32 border-4 border-white rounded-lg shadow-lg text-center font-bold bg-gray-300 items-center hover:bg-white hover:shadow-xl hover:border-gray-700 transition-all cursor-pointer">
          Postfix to ⠀Infix⠀
        </div> */}
      </div>
      <br />
      <h1 className="text-xl font-bold text-center">- Conversions to Infix -</h1>
      <br />
      <br />
      <div className="grid grid-cols-2 w-fit m-auto gap-4 md:grid-cols-2 lg:grid-cols-2">
        
        <Image
          src={prefix_to_infix}
          className="w-full rounded-2xl shadow-lg"
          alt=""
        />
        <Image
          src={postfix_to_infix}
          className="w-full rounded-2xl shadow-lg"
          alt=""
        />
      </div>
    </div>
  );
}
