import { useState } from "react"
import CompanyLogo from "../CompanyLogo"
import { useNavigate } from "react-router-dom"

function PortfolioCard({stock , mystockdata ,reload}){
    const [more , setMore] = useState(false)
    const [view , setView ] = useState("more") 
    const [quantity , setQuantity] = useState()
    const [price , setPrice ] = useState()
    const [succes ,setSucces] = useState(false)
    const [count , setCount] = useState(3)
    const [fail , setFail] = useState(false)
    const nav = useNavigate()
    let data = mystockdata?.[stock.company_name] || null
    let domain = stock.company_name?.replaceAll(' ','')
    function expand(){
        setMore(!more)
        setView(view == "more"? "less" : "more" )
    }
    function handlequantity(e){
        setQuantity(e.target.value)
        let p = e.target.value * data.currentPrice
        setPrice(p)
    }
    function handleprice(e){
        setPrice(e.target.value)
        setQuantity((e.target.value) / data.currentPrice)
    }
    function sellstock(e){
        e.preventDefault()
        const sellDetail = {
            "tickerid" : stock.ticker_id,
            "company" : stock.company_name,
            "quantity" : quantity,
            "price" : price
        }
        async function fetchsell(){
            const res = await fetch("http://localhost:8080/sell" ,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" :"Bearer " + localStorage.getItem("jwt")
                },
                body : JSON.stringify(sellDetail)
            })
            const body = await res.text()
            console.log(res)
            if(res.ok){
                setSucces(true)
                setTimeout(() => {setCount(prev => (prev-1))},1000)
                setTimeout(() => {setCount(prev => (prev-1))},2000)
                setTimeout(() => {reload()
                    setSucces(false)
                    setCount(3)
                },3000)
                console.log("sold")
            }else{
                setFail(true)
                setTimeout(() => {setCount(prev => (prev-1))},1000)
                setTimeout(() => {setCount(prev => (prev-1))},2000)
                setTimeout(() => {reload()
                    setFail(false)
                    setCount(3)
                },3000)
                console.log("failed to sale")
            }
        }
        fetchsell()
    }
    return(<>
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
                    <span>{(data?.CurrentHoldingsQuantity)?.toFixed(2) || '.....'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Average Buy Price</span>
                    <span>₹{(data?.avgBuyPrice)?.toFixed(2) || '.....'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Total Invested</span>
                    <span>₹{(data?.totalInvested)?.toFixed(2) || '......'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Current Value</span>
                    <span>₹{(data?.currentValue)?.toFixed(2) || '.....'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold  text-neutral-800">Returns</span>
                    <span className={`${data?.returns >= 0 ? "text-green-500" : "text-red-500"}`}>₹{(data?.returns)?.toFixed(2) || '0'}</span>
                </div>
                <button onClick={expand}>View {view}</button>
            </div>
            {
                more && <div className="w-full p-3 gap-10 flex items-center h-fit">
                    <div className="basis-128 rounded-4xl bg-neutral-50 h-fit shadow-md border-2">
                        <h1 className="text-center p-1 font-bold text-2xl text-neutral-400">Closed Details</h1>
                        <div className="flex flex-col  p-2">
                            <div className="flex p-1 justify-around">
                                <span className="font-bold w-40">Closed Amount</span>
                                <span>{(data.closedAmount)?.toFixed(2) || 0}</span>
                            </div>
                            <div className="flex p-1 justify-around">
                                <span className="font-bold w-40">Closed Profit Loss</span>
                                <span>{(data.closedProfitLoss)?.toFixed(2) || 0}</span>
                            </div>
                            <div className="flex p-1 justify-around">
                                <span className="font-bold w-40">Closed P/L %</span>
                                <span>{(data.closedProfitLoss)?.toFixed(2)  || 0}</span>
                            </div>
                            <button className="p-1 " >View Transactions</button>
                        </div>
                    </div>
                    <div className="basis-256 p-4 gap-10 flex border-2 h-fit bg-neutral-50 rounded-4xl shadow-md">
                        <div className="w-fit p-2 flex flex-col">
                            <div className="flex flex-col p-1">
                                <span className="font-bold">Current Price</span>
                                <span>₹{data.currentPrice || 0}</span>
                            </div>
                            <div className="flex flex-col p-1">
                                <span className="font-bold">Year High</span>
                                <span>₹{data.yearHigh || 0}</span>
                            </div>
                            <div className="flex flex-col p-1">
                                <span className="font-bold">Year Low</span>
                                <span>₹{data.yearLow || 0}</span>
                            </div>
                            <div className="text-blue-600">View about stock</div>
                        </div>
                        <div className="basis-128 rounded-4xl h-fit border-2">
                            <h1 className="text-center text-2xl bg-neutral-400 rounded-t-4xl font-extrabold">SELL</h1>
                            <p className=" text-red-500 mt-2 ml-2">Enter amount or quantity of stocks to sale {`<< ${data.CurrentHoldingsQuantity}`}</p>
                                <form onSubmit={sellstock} className="p-1 flex flex-col items-center gap-1  h-fit">
                                    <div className="flex w-full p-1 items-center justify-evenly">
                                        <label className="font-bold">Stocks</label>
                                        <input value={quantity} onChange={handlequantity} type="number" className="w-60 rounded-3xl border-4  h-8"></input>
                                    </div>
                                    <div className="flex w-full p-1 items-center justify-evenly">
                                        <label className="font-bold">Amount</label>
                                        <input type="number" value={price} onChange={handleprice} className="w-60  rounded-3xl border-4  h-8"></input>
                                    </div>
                                    <button type="submit" className="text-center w-50 h-8 rounded-4xl font-extrabold bg-purple-400 text-white border-2">Sell Stocks</button>
                                </form>
                        </div>
                    </div>
                </div>
            }
            </div>
            {
                succes && <div className="w-400 h-10 font-extrabold text-right bg-green-500 text-white text-3xl absolute bottom-0 right-0">Success wait.. {count} </div>
            }
            {
                fail && <div className="w-400 h-10 font-extrabold text-right bg-red-500 text-white text-3xl absolute bottom-0 right-0">Success wait.. {count} </div>
            }
            </>
        )
}
export default PortfolioCard