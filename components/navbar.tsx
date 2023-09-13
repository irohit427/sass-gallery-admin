import { UserButton, auth } from "@clerk/nextjs";
import MainNavigation from "@/components/mainNavigation";
import { redirect } from "next/navigation";
import { ThemeToggler } from "./themeToggler";
import GallerySwitcher from "./gallerySwitcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const galleries = await prismadb.gallery.findMany({
    where: {
      userId
    }
  });

  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4">
        <GallerySwitcher items={galleries} />
        <MainNavigation className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggler />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default Navbar;