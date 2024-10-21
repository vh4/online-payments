import { AiFillProduct } from "react-icons/ai";
import { FaFaucetDrip } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { MdElectricBolt } from "react-icons/md";

interface SidebarProps {
  nameMenu: string;
  setNameMenu: (menu: string) => void;
}

export default function Sidebar({ nameMenu, setNameMenu }: SidebarProps) {
  return (
    <aside className="w-full" aria-label="Sidebar">
      <div className="md:mt-0 md:mb-0 max-w-full md:max-w-[46rem] lg:max-w-[58rem] xl:max-w-full">

        {/* desktop using flex*/}

        <div className="hidden md:block">
        <ul className="p-4 w-full flex space-x-8 overflow-x-auto scrollbar-hide">
          {menuItems.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => setNameMenu(item.key)}
                className={`block center cursor-pointer items-center text-sm font-bold ${
                  nameMenu === item.key ? "text-gray-900" : "text-gray-600"
                }`}
              >
                <div className="bg-gray-100 px-6 py-6 flex justify-center rounded-xl">
                  <item.icon className={item.iconColor} size={22} />
                </div>
                <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px]">
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
        </div>

        {/* mobile using grids */}

         <div className="block md:hidden">
         <ul className="grid grid-cols-4 gap-6 p-4 w-full">
          {menuMobile.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => setNameMenu(item.key)}
                className={`block center cursor-pointer items-center text-sm font-bold ${
                  nameMenu === item.key ? "text-gray-900" : "text-gray-600"
                }`}
              >
                <div className="bg-gray-100 px-6 py-6 flex justify-center rounded-xl">
                  <item.icon className={item.iconColor} size={22} />
                </div>
                <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px]">
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
         </div>

      </div>
    </aside>
  );
}

const menuItems = [
  { key: "pln", label: "PLN Token", icon: MdElectricBolt, iconColor: "text-yellow-500" },
  { key: "pdam", label: "PDAM Air", icon: FaFaucetDrip, iconColor: "text-blue-500" },
  { key: "multifinance", label: "Multifinance", icon: GiPayMoney, iconColor: "text-pink-500" },
  { key: "pln", label: "PLN Token", icon: MdElectricBolt, iconColor: "text-yellow-500" },
  { key: "pdam", label: "PDAM Air", icon: FaFaucetDrip, iconColor: "text-blue-500" },
  { key: "multifinance", label: "Multifinance", icon: GiPayMoney, iconColor: "text-pink-500" },
  { key: "pln", label: "PLN Token", icon: MdElectricBolt, iconColor: "text-yellow-500" },
  { key: "pdam", label: "PDAM Air", icon: FaFaucetDrip, iconColor: "text-blue-500" },
  { key: "multifinance", label: "Multifinance", icon: GiPayMoney, iconColor: "text-pink-500" },
  { key: "pln", label: "PLN Token", icon: MdElectricBolt, iconColor: "text-yellow-500" },
  { key: "pdam", label: "PDAM Air", icon: FaFaucetDrip, iconColor: "text-blue-500" },
  { key: "multifinance", label: "Multifinance", icon: GiPayMoney, iconColor: "text-pink-500" },
  { key: "others", label: "Others", icon: AiFillProduct, iconColor: "text-green-500" },
];

const menuMobile = [
    { key: "multifinance", label: "Multifinance", icon: GiPayMoney, iconColor: "text-pink-500" },
    { key: "pln", label: "PLN Token", icon: MdElectricBolt, iconColor: "text-yellow-500" },
    { key: "pdam", label: "PDAM Air", icon: FaFaucetDrip, iconColor: "text-blue-500" },
    { key: "multifinance", label: "Multifinance", icon: GiPayMoney, iconColor: "text-pink-500" },
    { key: "pln", label: "PLN Token", icon: MdElectricBolt, iconColor: "text-yellow-500" },
    { key: "pdam", label: "PDAM Air", icon: FaFaucetDrip, iconColor: "text-blue-500" },
    { key: "multifinance", label: "Multifinance", icon: GiPayMoney, iconColor: "text-pink-500" },
    { key: "others", label: "Others", icon: AiFillProduct, iconColor: "text-green-500" },
  ];
