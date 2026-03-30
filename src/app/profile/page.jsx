"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, LogOut } from "lucide-react";
import ProfileItem from "@/components/profile/profileItem";

export default function ProfilePage() {
  const { authenticateUser, logout } = useAuth();
  const router = useRouter();

  if (!authenticateUser) return null;

  const { firstName, lastName, email, mobile } = authenticateUser;

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-violet-600/30">
            {firstName?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              {firstName} {lastName}
            </h1>
            <p className="text-zinc-500 text-sm">{email}</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
          {/* Info Row */}
          <div className="space-y-4">
            <ProfileItem icon={<User size={16} />} label="Full Name">
              {firstName} {lastName}
            </ProfileItem>

            <ProfileItem icon={<Mail size={16} />} label="Email">
              {email}
            </ProfileItem>

            <ProfileItem icon={<Phone size={16} />} label="Mobile">
              {mobile || "-"}
            </ProfileItem>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={() => router.push("/profile/edit")}
              className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
            >
              Edit Profile
            </button>

            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold py-2.5 rounded-xl transition"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
