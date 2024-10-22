

import { Nav } from "@/components/Nav";
import InfixPostfix  from '@/app/infixPostfix'

export default function Home() {
  return (
    <div className="p-6 box-border">
      <Nav/>

      <div className="w-full h-full border-dashed border-2 mt-6 lg:w-1/2 m-auto min-h-[500px] border-gray-900">
        <h1>Working Area</h1>
      <InfixPostfix />

      </div>
      
    </div>
  );
}

