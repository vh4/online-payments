import { FaFaucetDrip } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { MdElectricBolt } from "react-icons/md";

export default function Sidebar({ nameMenu, setNameMenu } : any) {
  return (
    <aside className="w-full" aria-label="Sidebar">
    <div className="px-4">
      <div className="text-lg font-semibold">List Tagihan</div>
      <small className="text-xs text-gray-500">Quickly pay your bills here.</small>
    </div>
    <div className="md:mt-0 -mb-4 md:mb-0 flex justify-center w-full overflow-y-auto px-1" >
        <ul className="p-4 w-full grid grid-cols-4 gap-4">
            <li>
                <div onClick={() => setNameMenu('pln')} className={`mt-4 block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pln' ? '' : ''}`}>
                    <div className='bg-gray-100 mx-4 py-3 flex justify-center rounded-xl'>
                        <MdElectricBolt className='text-red-500' size={24} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-black ">PLN token</span>
                </div>
            </li>    
            <li>                
                <div onClick={() => setNameMenu('pdam')} className={`mt-4 block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'pdam' ? '' : ''}`}>
                    <div className='bg-gray-100 mx-4 py-3 flex justify-center rounded-xl'>
                        <FaFaucetDrip className='text-fuchsia-500' size={24} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-black">PDAM Air</span>
                </div>
            </li> 
            <li>                
                <div onClick={() => setNameMenu('multifinance')} className={`mt-4 block center cursor-pointer items-center text-sm font-bold text-gray-900 ${ nameMenu === 'multifinance' ? '' : ''}`}>
                    <div className='bg-gray-100 mx-4 py-3 flex justify-center rounded-xl'>
                        <GiReceiveMoney className='text-orange-500' size={24} />
                    </div>
                    <span className="block text-xs text-center font-normal mt-4 flex-1 whitespace-nowrap text-[15px] text-black">Multifinance</span>
                </div>
            </li>
        </ul>
    </div>
</aside>
  );
}
