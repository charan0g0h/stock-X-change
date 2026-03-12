import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CompanyLogo from "../CompanyLogo"
import { Line,Bar } from "react-chartjs-2"

function Stock(){
    const {company} = useParams()
    const [search , setSearch ] = useState()
    const [trending , setTrending ] = useState({})
    const [stockdata , setStockdata ] = useState({})
    const [reuse,SetReuse] = useState({})
    const [domain ,setDomain] = useState('')
    const [history,setHistory] = useState([])
    const [pricedata,setPricedata] = useState({})
    const [recom,setRecom] = useState([])
    const [amount,setAmount] = useState()
    const [stock,setStock] = useState()
    const apikey = import.meta.env.VITE_API_KEY
    const nav = useNavigate()
    function handlesearch(){

    }
    useEffect(() => {
        async function fetchtrend(){
            const res = await fetch("https://stock.indianapi.in//trending",{
                method : "GET",
                headers : {
                    "x-api-key" : apikey
                }
            })
            const data = await res.json()
            setTrending(data.trending_stocks)
        }
        async function fetchCompany(){
            const res = await fetch(`https://stock.indianapi.in/stock?name=${company}`,{
            method : "GET",
            headers : {
                "x-api-key" : apikey
            }                
            })
            const data = await res.json()
            setStockdata(data)
            SetReuse(data.stockDetailsReusableData)
        }
        fetchtrend()
        fetchCompany()
        setDomain(company.replaceAll(" ",""))
    },[])

    useEffect(() => {
        async function fetchHistorydata(){
            const res = await fetch(`https://stock.indianapi.in/historical_data?stock_name=${company}&period=1m&filter=price`,{
                method : "GET",
                headers : {
                    "x-api-key" : apikey
                }
            })
            const data = await res.json()
            setHistory(data.datasets)
            console.log(data.datasets)
        }
        fetchHistorydata()
    },[])

    useEffect(() => {
        let p = history[0]?.values?.map((e) => e[1])
        let d1 = history[1]?.values?.map((e) => e[1])
        let d2 = history[2]?.values?.map((e) => e[1])
        setPricedata({"price" : p , "dma50" : d1 , "dma200" : d2})
        console.log(pricedata.price)
    },[history])

    useEffect(() => {
        let sb = [
            stockdata.analystView?.[0]?.numberOfAnalystsLatest,
            stockdata.analystView?.[0]?.numberOfAnalysts1WeekAgo,
            stockdata.analystView?.[0]?.numberOfAnalysts1MonthAgo,
            stockdata.analystView?.[0]?.numberOfAnalysts2MonthAgo,
            stockdata.analystView?.[0]?.numberOfAnalysts3MonthAgo
        ]
        let b = [
            stockdata.analystView?.[1]?.numberOfAnalystsLatest,
            stockdata.analystView?.[1]?.numberOfAnalysts1WeekAgo,
            stockdata.analystView?.[1]?.numberOfAnalysts1MonthAgo,
            stockdata.analystView?.[1]?.numberOfAnalysts2MonthAgo,
            stockdata.analystView?.[1]?.numberOfAnalysts3MonthAgo
        ]
        let h = [
            stockdata.analystView?.[2]?.numberOfAnalystsLatest,
            stockdata.analystView?.[2]?.numberOfAnalysts1WeekAgo,
            stockdata.analystView?.[2]?.numberOfAnalysts1MonthAgo,
            stockdata.analystView?.[2]?.numberOfAnalysts2MonthAgo,
            stockdata.analystView?.[2]?.numberOfAnalysts3MonthAgo
        ]
        let s = [
            stockdata.analystView?.[3]?.numberOfAnalystsLatest,
            stockdata.analystView?.[3]?.numberOfAnalysts1WeekAgo,
            stockdata.analystView?.[3]?.numberOfAnalysts1MonthAgo,
            stockdata.analystView?.[3]?.numberOfAnalysts2MonthAgo,
            stockdata.analystView?.[3]?.numberOfAnalysts3MonthAgo
        ]
        let ss = [
            stockdata.analystView?.[4]?.numberOfAnalystsLatest,
            stockdata.analystView?.[4]?.numberOfAnalysts1WeekAgo,
            stockdata.analystView?.[4]?.numberOfAnalysts1MonthAgo,
            stockdata.analystView?.[4]?.numberOfAnalysts2MonthAgo,
            stockdata.analystView?.[4]?.numberOfAnalysts3MonthAgo
        ]
        setRecom([sb,b,h,s,ss])
    },[stockdata])

    const arr = ["close","date" ,"time","price","percentChange","marketCap","yhigh","ylow","high","low"]
    const dates = [];
    for (let i = 19; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split("T")[0]);
    }

    function invest(e){
        const body = {
            "comDet" : stockdata,
            "quantity" : stock,
            "buy_price" : amount
        }
        e.preventDefault()
        nav("/home/payment",body)
    }

    function handleamount(e){
        setAmount(e.target.value)
        setStock((e.target.value)/reuse.price)
    }

    function handlestock(e){
        setStock(e.target.value)
        setAmount(e.target.value * reuse.price)
    }

    return(
        <>
        <div className="w-full p-4 border-2 bg-white flex justify-between">
                <input type="text" value={search} onChange={handlesearch} placeholder="search for stocks / NSE or BSE" className= "w-100 rounded-2xl border-2 p-3 bg-neutral-50 h-10"></input>
                <div className="w-30 flex justify-around">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 border-2 rounded-2xl p-2 inline  hover:cursor-pointer">
                        <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                        <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 border-2 rounded-2xl p-2 inline  hover:cursor-pointer">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                </div>
        </div>
        <div className="w-full h-15 border-2 bg-neutral-100 flex justify-around">
            {(trending.top_gainers || [] ).map((stock,index) => {
                if(index < 3){
                    return(
                        <>
                        <div className="w-100 p-3 flex items-center h-full">
                            <div className="w-15 rounded-4xl border-2 ">
                                <CompanyLogo domain={stock.company_name.replaceAll(" ","")}></CompanyLogo>
                            </div>
                            <div className="font-bold flex justify-between w-full ">
                                <span className="ml-2">{stock.company_name || "company"}</span>
                                <span className="text-green-500">{stock.percent_change || 0} %</span>
                            </div>
                        </div>
                        <div className="h-full w-0.5 bg-black "></div>
                        </>
                    )
                }else return null
            })}
            {(trending.top_losers || [] ).map((stock,index) => {
                if(index < 2){
                    return(
                        <>
                        <div className="w-100 p-3 flex items-center h-full">
                            <div className="w-15 rounded-4xl border-2 ">
                                <CompanyLogo domain={stock.company_name.replaceAll(" ","")}></CompanyLogo>
                            </div>
                            <div className="font-bold flex justify-between w-full ">
                                <span className="ml-2">{stock.company_name || "company"}</span>
                                <span className="text-red-500">{stock.percent_change || 0} %</span>
                            </div>
                            
                        </div>
                        <div className="h-full w-0.5 bg-black "></div>
                        </>
                    )
                }else return null
            })}
        </div>
        <div className="bg-white w-full p-6 border-2 h-fit">
           <div className="w-200 shadow-2xs flex gap-4 p-4 items-center h-fit border-0">
                <div className="w-20 h-20 rounded-4xl border-2 p-2">
                    <CompanyLogo domain={domain}></CompanyLogo>
                </div>
                <div>
                    <span className="text-5xl font-serif">{stockdata.companyName || "Company Name"}</span>
                    <span className="ml-2">ISIN: {stockdata.companyProfile?.isInId || 'A000000A'}</span>
                    <h2 className="text-2xl text-neutral-500">{stockdata.industry|| "industry"}</h2>
                </div>
           </div>
           <div className="w-full h-100 flex p-1 gap-4  "> 
            <div className="basis-4xl p-1 px-4 rounded-4xl shadow-md  border-2">
                    <div className="flex p-2 justify-around w-full ">
                        <span className="px-3 hover:cursor-pointer border-2  bg-neutral-500 text-white">1m</span>
                        <span className="px-3 hover:cursor-pointer border-2   bg-neutral-500 text-white">3m</span>
                        <span className="px-3 hover:cursor-pointer border-2   bg-neutral-500 text-white"> 6m</span>
                        <span className="px-3 hover:cursor-pointer border-2   bg-neutral-500 text-white">1y</span>
                        <span className="px-3 hover:cursor-pointer border-2   bg-neutral-500 text-white">max</span>
                    </div>
                    <div className="h-80 p-2 rounded-4xl border-2">
                    <Line data={{ 
                        labels : dates,
                        datasets : [
                            {
                                label : "Price",
                                data : pricedata.price,
                                backgroundColor : "skyblue",
                                borderColor: "skyblue"
                            },
                            {
                                label : "50DMA",
                                borderColor:"green",
                                backgroundColor:"green",
                                data :pricedata.dma50
                            },
                            {
                                label : "200DMA",
                                borderColor : "black",
                                data : pricedata.dma200,
                                backgroundColor: "black"
                            }
                            
                        ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                    ></Line>
                    </div>
                </div>
                <div className="basis-md h-100 rounded-4xl shadow-md border-2 p-2 bg-neutral-50">
                    <h1 className="text-center font-mono text-2xl text-neutral-500">Stock Price Overview</h1>
                    <div className="pl-8 pr-12">
                        {arr.map((e) => {
                            return(
                                <div className="p-1 w-full flex justify-between">
                                <span className="font-mono ">{e} :</span>
                                <span className="font-mono ">{reuse[e] || "loading"}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
           </div>
           <div className="w-full h-fit items-center flex pt-6 gap-4">
                <div className="h-fit w-100 border-2 p-4 bg-neutral-50 shadow-md rounded-4xl">
                    <h1 className="text-center text-3xl font-mono  text-neutral-500">Moving Averages</h1>
                    <div className="p-4 w-full ">
                        <table className="text-left w-full">
                            <thead>
                                <tr className="">
                                    <th className="p-3">Days</th>
                                    <th className="p-3">NSE</th>
                                    <th className="p-3">BSE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockdata.stockTechnicalData?.map((e) => {
                                    return(
                                        <tr>
                                            <td className="text-left pl-3 pb-3">{e.days}</td>
                                            <td className="text-left pl-3 pb-3">₹  {e.bsePrice}</td>
                                            <td className="text-left pl-3 pb-3">₹  {e.nsePrice}</td>
                                        </tr>
                                    )
                                } )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="basis-5xl h-100 rounded-4xl shadow-md border-2 p-4 bg-neutral-50">
                        <h1 className="text-center text-3xl font-mono text-neutral-500">Company Profile</h1>
                        <h2 className=" font-mono">Exchange Code BSE: {stockdata.companyProfile?.exchangeCodeBse || "bse code"} </h2>
                        <h2 className=" font-mono">Exchange Code NSE: {stockdata.companyProfile?.exchangeCodeNse || "nse code"}</h2>
                        <h3 className="font-extrabold">Discription:</h3>
                        <p>
                            {stockdata.companyProfile?.companyDescription}
                        </p>
                </div>
           </div>
           <div className="w-full py-6  gap-4 flex h-110 ">
                <div className="border-2 p-4 bg-neutral-50 rounded-4xl shadow-md basis-2xl">
                    <h1 className="text-center text-3xl font-mono text-neutral-500">Analyst View</h1>
                    <Bar data={{
                        labels: ["Latest","1 week","1 month" ,"2 month","3 month"],
                        datasets : [
                            {
                            label: "Strong Buy",
                            data: recom[0],
                            backgroundColor:"#02552E"
                            },
                            {
                                label:"Buy",
                                data:recom[1],
                                backgroundColor:"#06AA5A"
                            },
                            {
                                label : "Hold",
                                data: recom[2],
                                backgroundColor:"#898989"
                            },
                            {
                                label : "Sell",
                                data : recom[3],
                                backgroundColor:"#FF0000"
                            },
                            {
                                label : "Strong Sell",
                                data : recom[4],
                                backgroundColor:"#B40000"
                            }
                        ]
                    }}></Bar>
                </div>
                <div className="border-2 rounded-4xl shadow-md basis-lg">
                    <h1 className="p-2 text-center text-2xl font-extrabold text-neutral-200 bg-neutral-600">INVEST</h1>
                    <div className="p-3">
                    <div className="w-full flex gap-10 justify-evenly items-center">
                        <span className="text-2xl font-bold text-neutral-700">Risk meter</span> 
                        <span className="text-neutral-600">{stockdata.riskMeter?.categoryName}</span>
                    </div>
                    <div className=" w-full flex gap-10 justify-evenly items-center">
                        <span className="text-2xl font-bold text-neutral-700">Market Cap</span> 
                        <span className="text-neutral-600">{reuse.marketCap} CR</span>
                    </div>
                    </div>
                    <h2 className="ml-4">Invest safely with stock <b>X</b> change</h2>
                    <form onSubmit={invest} className="p-4 w-full flex flex-col  items-center">
                        <div>
                            <label>invest amount</label><br></br>
                            <input type="text" placeholder="minimum ₹1000" value={amount} onChange={handleamount} className="text-2xl text-center border-2"></input><br></br>
                            
                        </div>
                        <div>
                            <label>stocks</label><br></br>
                            <input type="number" value={stock} onChange={handlestock} className="text-2xl border-2 text-center"></input>
                        </div>
                        <button type="submit" className="font-bold p-4 m-2 mt-4 text-white w-70 rounded-2xl bg-purple-400">Invest Now</button>
                    </form>
                </div>
           </div>
        </div>
        </>
    )
}
export default Stock