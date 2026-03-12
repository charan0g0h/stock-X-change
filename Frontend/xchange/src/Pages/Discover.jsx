import { useEffect, useState } from "react"
import CompanyLogo from "../CompanyLogo"
import Stockcard2 from "./Stockcard2"
import Stockcard from "./Stockcard"

function Discover(){

    const [nse,setNse] = useState([])
    const [bse,setBse] = useState([])
    const [nsehigh,setNseHigh] = useState([])
    const [nselow,setNselow] = useState([])
    const [bsehigh,setBsehigh] = useState([])
    const [bselow,setBselow]  = useState([])
    const [search,setSearch] = useState("")

    const apikey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        async function nsemostactive(){
            const res = await fetch("https://stock.indianapi.in/NSE_most_active?",{
                method : "Get",
                headers : {
                    "x-api-key" : apikey
                }
            })
            const data = await res.json()
            setNse(data)
        }
        async function bsemostactive(){
            const res = await fetch("https://stock.indianapi.in/BSE_most_active?",{
                method : "GET",
                headers : {
                    "x-api-key" : apikey
                }
            })
            const data = await res.json()
            setBse(data)
        }
        async function fetchhighlow(){
            const res = await fetch("https://stock.indianapi.in/fetch_52_week_high_low_data",{
                method  : "GET",
                headers : {
                    "x-api-key" : apikey
                }
            })
            const data = await res.json()
            setNseHigh(data.NSE_52WeekHighLow.high52Week)
            setNselow(data.NSE_52WeekHighLow.low52Week)
            setBsehigh(data.BSE_52WeekHighLow.high52Week)
            setBselow(data.BSE_52WeekHighLow.low52Week)
        }
        nsemostactive()
        bsemostactive()
        fetchhighlow()
        console.log(nsehigh)
    },[])

    function handlesearch(e){
        setSearch(e.target.value)
    }


    return(
        <>
            <div className="w-full p-10 flex justify-between">
                <input type="text" value={search} onChange={handlesearch} placeholder="search for stocks / NSE or BSE" className= "w-200 rounded-3xl p-3 shadow-md bg-neutral-100 h-10"></input>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 inline mr-6 hover:cursor-pointer">
                        <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                        <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-neutral-500 p-2 text-2xl"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 inline mr-3 hover:cursor-pointer">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className=" w-full p-5 overflow-hidden ">
                <h1 className="text-2xl font-bold text-neutral-600">NSE Most Active</h1>
                <div className="w-full flex justify-between gap-4 overflow-x-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200/30 pt-4 pb-8 ">
                    {nse.map((stock,index) => {
                        return(
                            <Stockcard percent={stock.percent_change} key={index} price = {stock.price} company={stock.company}></Stockcard>
                        )
                    })}
                </div>
            </div>

            <div className=" w-full p-5 overflow-hidden ">
                <h1 className="text-2xl font-bold text-neutral-600">NSE 52 high</h1>
                <div className="w-full flex justify-between gap-4 overflow-x-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200/30 pt-4 pb-8 ">
                    {nsehigh.map((stock) => {
                        return(
                        <Stockcard2 company={stock.company} price={stock.price} percent={stock["52_week_high"]} type={"52_week_high"}></Stockcard2>
                        )
                    })}
                </div>
            </div>

            <div className=" w-full p-5 overflow-hidden ">
                <h1 className="text-2xl font-bold text-neutral-600">NSE 52 low</h1>
                <div className="w-full flex justify-between gap-4 overflow-x-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200/30 pt-4 pb-8 ">
                    {nselow.map((stock) => {
                        return(
                            <Stockcard2 company={stock.company} price={stock.price} percent={stock["52_week_low"]} type={"52_week_low"}></Stockcard2>
                        )
                    })}
                </div>
            </div>

            <div className=" w-full p-5 overflow-hidden ">
                <h1 className="text-2xl font-bold text-neutral-600">BSE Most Active</h1>
                <div className="w-full flex justify-between gap-4 overflow-x-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200/30 pt-4 pb-8 ">
                    {bse.map((stock,index) => {
                        return(
                            <Stockcard percent={stock.percent_change} key={index} price = {stock.price} company={stock.company}></Stockcard>
                        )
                    })}
                </div>
            </div>

            <div className=" w-full p-5 overflow-hidden ">
                <h1 className="text-2xl font-bold text-neutral-600">BSE 52 high</h1>
                <div className="w-full flex justify-between gap-4 overflow-x-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200/30 pt-4 pb-8 ">
                    {bsehigh.map((stock) => {
                        return(
                        <Stockcard2 company={stock.company} price={stock.price} percent={stock["52_week_high"]} type={"52_week_high"}></Stockcard2>
                        )
                    })}
                </div>
            </div>

            <div className=" w-full p-5 overflow-hidden ">
                <h1 className="text-2xl font-bold text-neutral-600">BSE 52 low</h1>
                <div className="w-full flex justify-between gap-4 overflow-x-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200/30 pt-4 pb-8 ">
                    {bselow.map((stock) => {
                        return(
                            <Stockcard2 company={stock.company} price={stock.price} percent={stock["52_week_low"]} type={"52_week_low"}></Stockcard2>
                        )
                    })}
                </div>
            </div>
            
        </>
    )
}
export default Discover