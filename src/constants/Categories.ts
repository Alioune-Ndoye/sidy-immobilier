import { FaHome } from "react-icons/fa";
import {
  LuBuilding,
  LuCastle,
  LuMountain,
  LuTent,
  LuWaves,
} from "react-icons/lu";

export const categories = [
  {
    label: "Maison",
    icon: FaHome,
    slug: "house",
  },
  {
    label: "Appartement",
    icon: LuBuilding,
    slug: "apartment",
  },
  {
    label: "Chalet",
    icon: LuMountain,
    slug: "cabin",
  },
  {
    label: "Plage",
    icon: LuWaves,
    slug: "beach",
  },
  {
    label: "Camping",
    icon: LuTent,
    slug: "camping",
  },
  {
    label: "Château",
    icon: LuCastle,
    slug: "castle",
  },
];
