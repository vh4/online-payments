import {
  IconLayoutDashboard,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";
import { AiFillThunderbolt } from "react-icons/ai";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Categories",
  },
  {
    id: uniqueId(),
    title: "PLN",
    icon: AiFillThunderbolt,
    href: "/menu/pln",
  },
];

export default Menuitems;
