"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider 
        attribute="class"
        defaultTheme='system'
        themes={['light', 'dark']}
        >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
