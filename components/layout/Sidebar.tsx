"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "▣" },
  { label: "Analytics", href: "/analytics", icon: "◈" },
  { label: "Patients",  href: "/patients",  icon: "◎" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen border-r border-border bg-surface px-4 py-6">
      <div className="mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-200 text-primary-700 font-bold">
            H
          </span>
          <span className="text-sm font-semibold text-foreground tracking-wide">
            HealthSaaS
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-2 px-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200/60",
                isActive
                  ? "border-border bg-card text-primary-700"
                  : "border-transparent bg-transparent text-muted hover:bg-card hover:border-border",
              ].join(" ")}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}