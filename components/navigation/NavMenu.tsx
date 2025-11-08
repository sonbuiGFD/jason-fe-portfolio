"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavMenuProps {
  links: NavLink[];
  className?: string;
}

/**
 * NavMenu Component
 *
 * Desktop navigation menu with active state indication.
 * Uses semantic HTML and ARIA attributes for accessibility.
 *
 * @example
 * ```tsx
 * <NavMenu links={navLinks} />
 * ```
 */
export function NavMenu({ links, className = "" }: NavMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`nav-menu ${className}`.trim()}
      aria-label="Main navigation"
    >
      <ul className="nav-menu__list">
        {links.map((link) => (
          <li key={link.href} className="nav-menu__item">
            <Link
              href={link.href}
              className={`nav-menu__link ${
                isActive(link.href) ? "nav-menu__link__active" : ""
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
