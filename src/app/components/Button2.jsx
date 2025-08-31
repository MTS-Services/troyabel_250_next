"use client";
 
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
 
export const InteractiveHoverButton = React.forwardRef(
  ({ text, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative text-white w-auto cursor-pointer overflow-hidden rounded-full border bg-purple-400 p-2 px-6 text-center font-semibold",
          className
        )}
        {...props}
      >
        {/* Initial content */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white/50 transition-all duration-300 group-hover:scale-[60]"></div>
          <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {text}
          </span>
        </div>
 
        {/* Hover content */}
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
          <span>{text}</span>
          <ArrowRight />
        </div>
      </button>
    );
  }
);
 
InteractiveHoverButton.displayName = "InteractiveHoverButton";