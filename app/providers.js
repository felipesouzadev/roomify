"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider 
        attribute="class"
        defaultTheme='dark'
        themes={['light', 'dark', 'modern']}
        >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
