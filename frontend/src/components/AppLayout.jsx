import React from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import {
  LayoutDashboard,
  Dna,
  HeartPulse,
  Activity,
  FileText,
  Stethoscope,
  Droplet,
  LogOut,
  Heart,
} from "lucide-react";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/blood-group",
    label: "Blood Group",
    icon: Droplet,
  },
  {
    to: "/genetic-risk",
    label: "Genetic Risk",
    icon: Dna,
  },
  {
    to: "/diabetes-bp",
    label: "Diabetes & BP",
    icon: Activity,
  },
  {
    to: "/breast-cancer",
    label: "Breast Cancer",
    icon: HeartPulse,
  },
  {
    to: "/medical-report",
    label: "Report Reader",
    icon: FileText,
  },
  {
    to: "/blood-donation",
    label: "Blood Donation",
    icon: Stethoscope,
  },
];

export default function AppLayout({
  children,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F6]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-[#E5E1D8] bg-white flex flex-col">
        <div className="p-6 border-b border-[#E5E1D8]">
          <Link
            to="/dashboard"
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-md bg-[#B91C1C] flex items-center justify-center">
              <Heart
                className="w-5 h-5 text-white"
                strokeWidth={1.5}
              />
            </div>

            <div>
              <div className="font-heading font-bold text-[#1A1D1C]">
                GeneCare
              </div>

              <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B726C]">
                AI Health
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 my-1 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-[#FEE2E2] text-[#B91C1C] font-medium"
                      : "text-[#1A1D1C] hover:bg-[#FEE2E2]"
                  }`
                }
              >
                <Icon
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />

                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E5E1D8]">
          <div className="px-3 py-2 mb-2">
            <div className="text-sm font-medium text-[#1A1D1C]">
              {user?.name || "User"}
            </div>

            <div className="text-xs text-[#6B726C]">
              {user?.email || ""}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[#C85A40] hover:bg-[#FBEEEA] transition-colors"
          >
            <LogOut
              className="w-4 h-4"
              strokeWidth={1.5}
            />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto p-6 sm:p-8 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}