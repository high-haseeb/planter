import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="gap-8 justify-around items-center py-2 px-8 w-screen text-white bg-brGreen hidden lg:flex">
      <Promo icon={"shipping"} text={"free delivery"} />
      <Promo icon={"payment"} text={"secure payments"} />
      <SearchBar />
      <div className="flex gap-8">
        <Button icon={"user"} href={"/user"} />
        <Button icon={"heart"} href={"/heart"} />
        <Button icon={"shopping_bag"} href={"/bag"} />
      </div>
    </div>
  );
};
const Button = ({ icon, href }) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <Link href={href}>
        <Image
          src={`/icons/${icon}.svg`}
          width={40}
          height={40}
          alt={icon}
          className="object-cover"
        />
      </Link>
    </div>
  );
};
const Promo = ({ icon, text }) => {
  return (
    <div className="flex gap-2 justify-center items-center text-lg">
      <Image
        src={`/icons/${icon}.svg`}
        width={30}
        height={30}
        alt={icon}
        className="object-cover"
      />
      <div className="capitalize">{text}</div>
    </div>
  );
};
const SearchBar = () => {
  return (
    <div className="flex flex-grow justify-center items-center text-black">
      <input
        className="p-2 px-6 w-full rounded-l-3xl placeholder:text-gray-500"
        placeholder="Search"
      />
      <div className="p-2 bg-black rounded-r-3xl">
        <Image
          src={`/icons/search.svg`}
          width={25}
          height={25}
          alt="search"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Navbar;
