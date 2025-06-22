// Navbar.tsx
"use client";

import Link from "next/link";
import { Bot } from "lucide-react";            // ← add
import { SafeUser } from "@/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

type Props = { currentUser?: SafeUser | null };

function Navbar({ currentUser }: Props) {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex items-center gap-3 md:gap-0">
            <Logo />

            {/* search bar centred – code from the previous answer */}
            <div className="flex-1 flex justify-center">
              <Search />
            </div>

            {/* right-hand controls */}
            <div className="flex items-center gap-4">
              {/* AI Assistant button with bot-icon */}
              <Link href="/ai-assistant" className="shrink-0">
                <button
                  className="flex items-center gap-2 bg-airbnb-coral hover:bg-airbnb-coral/90
                             text-white text-sm font-semibold px-4 py-2 rounded-full transition"
                >
                  {/* circular icon */}
                  <span className="inline-flex items-center justify-center w-6 h-6
                                   rounded-full bg-white/25">
                    <Bot className="w-[14px] h-[14px]" />
                  </span>
                  AI&nbsp;Assistant
                </button>
              </Link>

              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
}

export default Navbar;
