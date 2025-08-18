import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">Pages</a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">Account</a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">Directory</a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">Events</a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="max-w-screen-xl px-4 py-2 mx-auto lg:px-8 lg:py-4">
      <div className="container flex items-center justify-between mx-auto text-blue-gray-900 gap-4">
        {/* Brand */}
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-bold text-xl"
        >
          Meshwork
        </Typography>

        {/* Desktop nav links */}
        <div className="hidden lg:block">{navList}</div>

        {/* Search + Create Post + Notifications + Avatar */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <input
            placeholder="Search posts, businesses, events…"
            className="hidden md:block flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            Create Post
          </button>

          <span role="img" aria-label="notifications" className="cursor-pointer">
            🔔
          </span>

          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>

        {/* Mobile toggle button */}
        <IconButton
          variant="text"
          className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-6 h-6"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
              stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </IconButton>
      </div>

      {/* Mobile nav */}
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex flex-col gap-2 mt-4">
            <input
              placeholder="Search…"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Create Post
            </button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default NavBar;

