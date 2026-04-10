import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/caregivers", label: "돌봄 인력 찾기" },
  { href: "/programs", label: "교육 프로그램" },
  { href: "/jobs", label: "구인" },
  { href: "/pricing", label: "요금" },
  { href: "/reviews", label: "후기" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-logo">
            <span className="text-2xl font-bold text-primary tracking-tight">
              케어온
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-${link.label}`}
              >
                <span
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    location === link.href
                      ? "text-primary bg-accent"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/emergency" data-testid="btn-emergency-nav">
              <Button variant="destructive" size="sm" className="gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                긴급 요청
              </Button>
            </Link>
            <Link href="/consultation" data-testid="btn-consultation-nav">
              <Button size="sm" className="gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                상담 신청
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setOpen(!open)}
            data-testid="btn-mobile-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              <span
                className={cn(
                  "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location === link.href
                    ? "text-primary bg-accent"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link
              href="/emergency"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              <Button
                variant="destructive"
                size="sm"
                className="w-full gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                긴급 요청
              </Button>
            </Link>
            <Link
              href="/consultation"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              <Button size="sm" className="w-full gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                상담 신청
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
