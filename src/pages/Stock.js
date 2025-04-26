import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Stock/Tabs';
import axios from 'axios';
import Search from '../components/Stock/Search';
import PaginationComponent from '../components/Stock/Pagination';
import { ToastContainer } from 'react-toastify';

function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [useNext50, setUseNext50] = useState(false);
  const perPage = 10;

  // NIFTY 50 and Next 50 stock symbols
const symbols = [
  "RELIANCE.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS", "TCS.NS",
  "KOTAKBANK.NS", "HINDUNILVR.NS", "ITC.NS", "LT.NS", "SBIN.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "HCLTECH.NS", "ASIANPAINT.NS", "MARUTI.NS",
  "SUNPHARMA.NS", "ULTRACEMCO.NS", "NESTLEIND.NS", "TITAN.NS", "WIPRO.NS",
  "ONGC.NS", "POWERGRID.NS", "NTPC.NS", "BAJAJ-AUTO.NS", "TECHM.NS",
  "HDFCLIFE.NS", "GRASIM.NS", "INDUSINDBK.NS", "DRREDDY.NS", "JSWSTEEL.NS",
  "CIPLA.NS", "TATAMOTORS.NS", "COALINDIA.NS", "BPCL.NS", "BRITANNIA.NS",
  "SHRIRAMFIN.NS", "DIVISLAB.NS", "HEROMOTOCO.NS", "ADANIPORTS.NS", "TATACONSUM.NS",
   "EICHERMOT.NS", "ADANIENT.NS", "HDFCAMC.NS", "ICICIGI.NS",
  "SBILIFE.NS", "IOC.NS", "GAIL.NS", "VEDL.NS", "UPL.NS",
];
const next50Symbols = [
  "DMART.NS", "LICI.NS", "HAL.NS", "ADANIGREEN.NS", "INDIGO.NS",
  "SIEMENS.NS", "IOC.NS", "NAUKRI.NS", "AMBUJACEM.NS", "PFC.NS",
  "GODREJCP.NS", "DLF.NS", "SRF.NS", "MARICO.NS", "BOSCHLTD.NS",
  "HAVELLS.NS", "ABB.NS", "TATAPOWER.NS", "ICICIPRULI.NS", "BANKBARODA.NS",
  "CANBK.NS", "AUROPHARMA.NS", "MPHASIS.NS", "IOB.NS", "IDBI.NS",
  "UNIONBANK.NS", "CUMMINSIND.NS", "LUPIN.NS", "ASHOKLEY.NS", "SAIL.NS",
  "IDFCFIRSTB.NS", "POLYCAB.NS", "MOTHERSON.NS", "INDUSTOWER.NS", "TVSMOTOR.NS",
  "DABUR.NS", "CONCOR.NS", "BHARATFORG.NS", "PERSISTENT.NS", "TIINDIA.NS",
  "JINDALSTEL.NS", "RECLTD.NS", "JUBLFOOD.NS", "TORNTPHARM.NS", "UPL.NS",
  "ABCAPITAL.NS", "OBEROIRLTY.NS", "ADANIPOWER.NS", "GAIL.NS", "IRFC.NS"
];


  const queryString = (useNext50 ? next50Symbols : symbols).join(',');

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=${queryString}`, {
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_YAHOO_API_KEY,
          'X-RapidAPI-Key': 'd4d2bc31e2mshf39b06cf6116008p175f96jsn468efccf3dae',
        },
      })
      .then((response) => {
        if (response.data?.quoteResponse?.result) {
          setStocks(response.data.quoteResponse.result);
        } else {
          setStocks([]);
          setError('No stock data available.');
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        setError('Failed to fetch stock data.');
        setStocks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [useNext50]);

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol?.toLowerCase().includes(search.toLowerCase()) || 
      stock.longName?.toLowerCase().includes(search.toLowerCase()) ||
      stock.shortName?.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedStocks = filteredStocks.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="flex justify-between items-center px-4 py-2">
        <Search 
          search={search} 
          onSearchChange={(e) => { 
            setSearch(e.target.value); 
            setPage(1); 
          }} 
        />
        <button 
          onClick={() => {
            setUseNext50((prev) => !prev);
            setPage(1);
          }}
          className="toggle-button"
        >
          {useNext50 ? "Show NIFTY 50" : "Show Next 50"}
        </button>
      </div>
      {loading ? (
        <div className="loading-message">Loading stock data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <TabsComponent stocks={paginatedStocks} />
          <PaginationComponent 
            page={page} 
            handlePageChange={(e, value) => setPage(value)} 
            count={Math.ceil(filteredStocks.length / perPage)} 
          />
        </>
      )}
    </div>
  );
}

export default StockPage;