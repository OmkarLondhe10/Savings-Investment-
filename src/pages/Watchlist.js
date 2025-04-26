import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import { get100Coins } from "../functions/get100Coins";
import CryptoDashboardTabs from "../components/DashBoard/Tabs";
import StockDashboardTabs from "../components/Stock/Tabs";
import { getTopStocks } from "../functions/getTopStocks";

function Watchlist() {
  
  const cryptoWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const stockWatchlist = JSON.parse(localStorage.getItem("stockWatchlist")) || [];
  
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [stockAssets, setStockAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cryptoWatchlist.length > 0 || stockWatchlist.length > 0) {
      fetchWatchlistData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchWatchlistData = async () => {
    try {
      if (cryptoWatchlist.length > 0) {
        const allCoins = await get100Coins();
        if (allCoins) {
          setCryptoAssets(allCoins.filter(coin => cryptoWatchlist.includes(coin.id)));
        }
      }
      
    } catch (error) {
      console.error("Error fetching watchlist data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  const hasCryptoAssets = cryptoAssets.length > 0;
  const hasStockAssets = stockAssets.length > 0;

  return (
    <div>
      <Header />
      
      {hasCryptoAssets || hasStockAssets ? (
        <div>
          {hasCryptoAssets && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ marginLeft: "1.5rem" }}>Cryptocurrencies</h2>
              <CryptoDashboardTabs coins={cryptoAssets} />
            </div>
          )}
          
          {hasStockAssets && (
            <div>
              <h2 style={{ marginLeft: "1.5rem" }}>Stocks</h2>
              <StockDashboardTabs stocks={stockAssets} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Your watchlist is empty
          </h1>
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "1rem", 
            margin: "2rem",
            flexWrap: "wrap" 
          }}>
            <a href="/dashboard">
              <Button text="Browse Cryptocurrencies" />
            </a>
            <a href="/stocks">
              <Button text="Browse Stocks" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;