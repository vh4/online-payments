import { AiFillProduct } from "react-icons/ai";
import { FaFaucetDrip } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { MdElectricBolt } from "react-icons/md";

interface SidebarProps {
    nameMenu: string;
    setNameMenu: (menu: string) => void;
}

export default function Sidebar({ nameMenu, setNameMenu } : SidebarProps) {
  return (
    <aside className="w-full flex justify-center" aria-label="Sidebar">
    {/* <div className="px-4">
      <div className="text-lg font-semibold">List Tagihan</div>
      <small className="text-xs text-gray-500">Quickly pay your bills here.</small>
    </div> */}
    <div className="md:mt-0 md:mb-0 w-full" >
        <ul className="p-4 w-full flex space-x-8">
            <li>
                <div onClick={() => setNameMenu('pln')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-600 ${ nameMenu === 'pln' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <MdElectricBolt className='text-yellow-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600 ">PLN token</span>
                </div>
            </li>    
            <li>                
                <div onClick={() => setNameMenu('pdam')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <FaFaucetDrip className='text-blue-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">PDAM Air</span>
                </div>
            </li> 
            <li>                
                <div onClick={() => setNameMenu('multifinance')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <GiPayMoney className='text-pink-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">PDAM Air</span>
                </div>
            </li> 
            <li>
                <div onClick={() => setNameMenu('pln')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pln' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <MdElectricBolt className='text-yellow-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600 ">PLN token</span>
                </div>
            </li>    
            <li>                
                <div onClick={() => setNameMenu('pdam')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <FaFaucetDrip className='text-blue-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">PDAM Air</span>
                </div>
            </li> 
            <li>                
                <div onClick={() => setNameMenu('multifinance')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <GiPayMoney className='text-pink-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">PDAM Air</span>
                </div>
            </li> 
            <li>
                <div onClick={() => setNameMenu('pln')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pln' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <MdElectricBolt className='text-yellow-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600 ">PLN token</span>
                </div>
            </li>    
            <li>                
                <div onClick={() => setNameMenu('pdam')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <FaFaucetDrip className='text-blue-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">PDAM Air</span>
                </div>
            </li> 
            <li>                
                <div onClick={() => setNameMenu('multifinance')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <GiPayMoney className='text-pink-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">PDAM Air</span>
                </div>
            </li> 
            <li>                
                <div onClick={() => setNameMenu('multifinance')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <GiPayMoney className='text-pink-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">PDAM Air</span>
                </div>
            </li> 
            <li>
                <div onClick={() => setNameMenu('pln')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pln' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <MdElectricBolt className='text-yellow-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600 ">PLN token</span>
                </div>
            </li>    
            <li>                
                <div onClick={() => setNameMenu('pdam')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4  flex justify-center rounded-xl'>
                        <FaFaucetDrip className='text-blue-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">PDAM Air</span>
                </div>
            </li>
            <li>                
                <div onClick={() => setNameMenu('lainya')} className={`block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'multifinance' ? '' : ''}`}>
                    <div className='bg-gray-100 px-4 py-4 flex justify-center rounded-xl'>
                        <AiFillProduct className='text-green-500' size={22} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-gray-600">Others</span>
                </div>
            </li>
            
        </ul>
    </div>
</aside>
  );
}
