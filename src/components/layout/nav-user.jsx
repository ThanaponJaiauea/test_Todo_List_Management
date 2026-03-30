"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";

export function NavUser() {
  const { logout, authenticateUser } = useAuth();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  if (!authenticateUser) return null;

  const displayName = authenticateUser.firstName;
  const displayEmail = authenticateUser.email;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-semibold">
                {displayName?.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col ml-2 text-left">
                <span className="text-sm text-zinc-200">
                  {displayName} {authenticateUser.lastName}
                </span>
                <span className="text-xs text-zinc-500">{displayEmail}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="start"
            className="w-56 bg-zinc-900 border border-zinc-800 rounded-xl p-1 mb-2 shadow-xl"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => {
                  if (isMobile) setOpenMobile(false);
                  router.push("/profile");
                }}
                className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg px-3 py-2"
              >
                <User size={14} />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-zinc-800 my-1" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg px-3 py-2"
              >
                <LogOut size={14} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
