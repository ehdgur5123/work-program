"use client";

import { useState } from "react";
import Navigation from "@/app/project/quiz/components/Navigation";
import HambergerButton from "@/app/project/quiz/components/HambergerButton";

export default function NavigationForm() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav>
      <div className="hidden lg:block h-full">
        <Navigation />
      </div>
      <div className="block lg:hidden">
        <HambergerButton setIsNavOpen={setIsNavOpen} />
        <Navigation className={`${isNavOpen && "hidden lg:block"}`} />
      </div>
    </nav>
  );
}
