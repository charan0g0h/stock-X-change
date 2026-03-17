import { useState } from "react"
import CompanyLogo from "../CompanyLogo"

function PortfolioCard({stock , mystockdata}){
    const [more , setMore] = useState(false)
    let data = mystockdata?.[stock.company_name] || null
    let domain = stock.company_name?.replaceAll(' ','')
    function expand(){
        setMore(!more)
    }
    return(
            <div className="rounded-4xl mt-2 bg-white shadow-md border-2 h-fit">
            <div className="w-full justify-around items-center flex h-30">
                <div className="w-30 p-4">
                    <CompanyLogo domain={domain}></CompanyLogo>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-extrabold text-3xl text-neutral-600">{stock.company_name}</span>
                    <span>ISIN ID: {stock.ticker_id || "....."}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Holding Stocks</span>
                    <span>{data?.CurrentHoldingsQuantity || '.....'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Average Buy Price</span>
                    <span>₹{data?.avgBuyPrice || '.....'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Total Invested</span>
                    <span>₹{data?.totalInvested || '......'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Current Value</span>
                    <span>₹{data?.currentValue || '.....'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Returns</span>
                    <span className={`${data?.returns >= 0 ? "text-green-500" : "text-red-500"}`}>₹{data?.returns || '0'}</span>
                </div>
                <button onClick={expand}>View More</button>
            </div>
            {
                more && <div className="w-full flex h-60">
                    <div className="basis-128 rounded-4xl border-2">
                        
                    </div>
                </div>
            }
            </div>
        )
}
export default PortfolioCard