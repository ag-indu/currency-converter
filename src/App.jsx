import { useState } from 'react'
import './App.css'
import InputBox from './Components/InputBox'
import Image from './assets/bgimage.jpg'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount,setAmount] = useState('');
  const [from,setFrom] = useState("usd");
  const [to,setTo] = useState("inr");
  const [convertedAmount,setConvertedAmount] = useState('');
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const swap = ()=>{
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const convert = ()=>{
    setConvertedAmount((Number(amount)*currencyInfo[to]).toFixed(3))
  }
  return (
          <div
              className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat gap-1"
              style={{
                  backgroundImage: `url('${Image}')`,
              }}
          >
              <h1 className='text-5xl text-white font-bold mb-4 drop-shadow-md'>
                  CashFlow Convert
              </h1>

              <div className="w-full">
                  <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                      <form
                          onSubmit={(e) => {
                              e.preventDefault();
                              convert();
                          }}
                      >
                          <div className="w-full mb-1">
                              <InputBox
                                  label="From"
                                  amount={amount}
                                  currencyOption={options}
                                  onAmountChange={(cur)=>setAmount(cur)}
                                  onCurrencyChange={(cur) => setFrom(cur)}
                                  selectCurrency={from}
                              />
                          </div>
                          <div className="relative w-full h-0.5">
                              <button
                                  type="button"
                                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 cursor-pointer"
                                  onClick={swap}
                              >
                                  swap
                              </button>

                          </div>
                          <div className="w-full mt-1 mb-4">
                              <InputBox
                                  label="To"
                                  amount={convertedAmount}
                                  currencyOption={options}
                                  onCurrencyChange={(value) => setTo(value)}
                                  selectCurrency={to}
                                  amountDisable
                              />
                          </div>
                          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg cursor-pointer">
                              Convert {from.toUpperCase()} to {to.toUpperCase()}
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      );
  
}

export default App
