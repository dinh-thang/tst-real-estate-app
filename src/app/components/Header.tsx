import Link from "next/link";

import { CircleUser } from "lucide-react";

import GhostButton from "./buttons/GhostButton";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full h-14 bg-blue-500 px-4">
      <div className="flex flex-row gap-4">
        <h1 className="text-white text-xl font-medium">Real Estate Matching App</h1>

        <div className="ml-2 flex rounded w-[3px] bg-white "/>

        <div className="flex gap-2">
          <GhostButton className="w-30">
            <Link href="/property-listing">
              <h2 className="text-xs font-bold">Property Listing</h2>
            </Link>
          </GhostButton>

          <GhostButton className="w-30">
            <Link href="/">
              <h2 className="text-xs font-bold">Buyer Preference</h2>
            </Link>
          </GhostButton>
        </div>
      </div>

      <div className="flex justify-end items-center h-full">
        <CircleUser className="stroke-white " />
      </div>
    </header>
  );
}
 
export default Header;
