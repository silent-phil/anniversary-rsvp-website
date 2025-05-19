import { NavItem } from "../../shared/types.ts";

export interface NavbarProps {
  items: NavItem[];
}

export default function Navbar({ items }: NavbarProps) {
    
  return (
    <nav class="navbar">
      {items.map((item) => (
        <a href={item.ref} class={item.class + " --fx-scroll"}>
          {item.name}
        </a>
      ))}
    </nav>
  );
}
