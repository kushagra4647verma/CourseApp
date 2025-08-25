import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-eerie-black text-baby-powder px-6 py-3 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-orange-wheel">
          CourseApp
        </Link>

        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-base flex items-center h-10 px-4 py-2`}
                >
                  <Link to="/courses">Courses</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-base flex items-center h-10 px-4 py-2`}
                >
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-base flex items-center h-10 px-4 py-2`}
                >
                  <Link to="/my-courses">My Courses</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="h-10 px-4 py-2"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
