
import { Nav } from "@/components/Nav";


export default function Home() {
  return (
    <div className="p-6 box-border">
      <Nav/>
      <div className="w-full h-full border-dashed border-2 mt-6 lg:w-1/2 m-auto min-h-[500px] border-gray-900">
        <h1>Working Area</h1>
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

