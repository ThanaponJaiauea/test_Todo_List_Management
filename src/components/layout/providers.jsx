"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { getAccessToken } from "@/utils/local-storage";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// 1. นำเข้า AuthContextProvider
import AuthContextProvider from "@/contexts/AuthContext";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);
    setIsReady(true);

    if (!token && pathname !== "/auth") {
      router.replace("/auth");
    } else if (token && pathname === "/auth") {
      router.replace("/home");
    }
  }, [pathname, router]);

  if (!isReady && pathname !== "/auth") {
    return <div className="bg-[#09090b] min-h-screen" />;
  }

  return (
    <AuthContextProvider>
      <ToastContainer
        autoClose={1000}
        theme="light"
        position="bottom-center"
        transition={Slide}
        stacked
        limit={3}
      />

      {pathname === "/auth" ? (
        <>{children}</>
      ) : (
        <SidebarProvider>
          <AppSidebar isLoggedIn={isLoggedIn} />
          <main className="flex-1">
            <div className="p-4">
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </SidebarProvider>
      )}
    </AuthContextProvider>
  );
}
