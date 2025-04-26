import axios from "axios";

export const getTopStocks = async (symbols) => {
  try {
    if (!symbols || symbols.length === 0) return [];
    
    // Add .NS suffix for NSE stocks if not present
    const formattedSymbols = symbols.map(s => s.includes('.') ? s : `${s}.NS`);
    
    const options = {
      method: 'GET',
      url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${formattedSymbols.join(',')}`,
      headers: {
        'X-RapidAPI-Key': '13e3bd2be3msh555a7b67cb85664p164a29jsnee1c2d0378a1', // Public test key
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
      },
      timeout: 10000 // 10 second timeout
    };

    const response = await axios.request(options);
    
    if (!response.data || response.data.length === 0) {
      throw new Error('No stock data received');
    }

    return response.data.map(stock => ({
      id: stock.symbol.replace('.NS', ''),
      symbol: stock.symbol.replace('.NS', ''),
      name: stock.shortName || stock.longName || stock.symbol,
      current_price: stock.regularMarketPrice,
      price_change_percentage_24h: stock.regularMarketChangePercent,
      change: stock.regularMarketChange,
      previous_close: stock.regularMarketPreviousClose,
      open: stock.regularMarketOpen,
      high: stock.regularMarketDayHigh,
      low: stock.regularMarketDayLow,
      volume: stock.regularMarketVolume,
      market_cap: stock.marketCap,
      image: `https://financialmodelingprep.com/image-stock/${stock.symbol.replace('.NS', '')}.png`
    }));
    
  } catch (error) {
    console.error('Stock API Error:', error);
    throw new Error(`Failed to fetch stocks: ${error.message}`);
  }
};