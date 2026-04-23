import ThemeToggle from "./ThemeToggle";
import Avatar from "./Avatar";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 z-40 flex items-center justify-between bg-fem-blue-600 shadow-[0px_20px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-fem-blue-700 dark:shadow-[0px_20px_10px_-10px_rgba(0,0,0,0.10)] lg:inset-x-auto lg:inset-y-0 lg:flex-col lg:rounded-r-[1.25rem]">
      <Logo />
      <div className="flex items-center lg:flex-col">
        <ThemeToggle />
        <Avatar />
      </div>
    </nav>
  );
};

export default Navbar;
