"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  Home, 
  Target, 
  LayoutGrid, 
  FileText, 
  Image as ImageIcon, 
  Award, 
  Moon,
  Sun
} from "lucide-react";

export function Header() {
  const [time, setTime] = useState<string>("");
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial update
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", { 
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Target },
    { name: "Work", href: "/work", icon: LayoutGrid },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Certificates", href: "/certificate", icon: Award },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-6 text-sm text-foreground/70 pointer-events-none">
      {/* Left: Location */}
      <div className="flex items-center font-medium tracking-wide pointer-events-auto">
        <span>Asia/Manila</span>
      </div>

      {/* Center: Nav Pill */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-border/50 bg-background/80 p-1.5 backdrop-blur-md shadow-2xl pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isHome = item.name === "Home";
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
                isHome ? "px-3 py-2" : "px-4 py-2"
              } ${
                isActive 
                  ? "bg-foreground/10 text-foreground shadow-sm" 
                  : "hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <Icon className="h-[18px] w-[18px] stroke-[1.5]" />
              {!isHome && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
        
        {/* Separator & Dark Mode Toggle */}
        <div className="mx-1 h-5 w-px bg-border/50" />
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center rounded-full p-2 text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          {mounted && theme === "light" ? (
            <Moon className="h-[18px] w-[18px] stroke-[1.5]" />
          ) : (
            <Sun className="h-[18px] w-[18px] stroke-[1.5]" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </button>
      </nav>

      {/* Right: Time */}
      <div className="flex items-center font-medium tracking-wider pointer-events-auto">
        <span>{time || "00:00:00"}</span>
      </div>
    </header>
  );
}
