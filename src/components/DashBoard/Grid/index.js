import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import "./styles.css";

function Grid({ coin }) {
  const [isCoinAdded, setIsCoinAdded] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsCoinAdded(watchlist.includes(coin.id));
  }, [coin.id]);

  const toggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (isCoinAdded) {
      const updatedWatchlist = watchlist.filter((id) => id !== coin.id);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      setIsCoinAdded(false);

      toast.success(`₹${coin.name} removed from watchlist!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: {
          background: "var(--darkgrey)",
          color: "var(--white)",
          border: "1px solid var(--red)",
        },
      });
    } else {
      const updatedWatchlist = [...watchlist, coin.id];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      setIsCoinAdded(true);

      toast.success(`${coin.name} added to watchlist!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: {
          background: "var(--darkgrey)",
          color: "var(--white)",
          border: "1px solid var(--green)",
        },
      });
    }
  };

  return (
    <Link to={`/coin/${coin.id}`} className="grid-link">
      <div
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 ? "grid-container-red" : ""
        }`}
      >
        <div className="info-flex">
          <img src={coin.image} alt={coin.name} className="coin-logo" />
          <div className="name-col">
            <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
          <div
            className="watchlist-icon"
            onClick={toggleWatchlist}
            aria-label={isCoinAdded ? "Remove from watchlist" : "Add to watchlist"}
          >
            {isCoinAdded ? (
              <StarIcon style={{ color: "#FFD700", transition: "transform 0.2s" }} />
            ) : (
              <StarOutlineIcon style={{ transition: "transform 0.2s" }} />
            )}
          </div>
        </div>

        <div className="chip-flex">
          {coin.price_change_percentage_24h >= 0 ? (
            <>
              <div className="price-chip">
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
              <div className="icon-chip">
                <TrendingUpRoundedIcon />
              </div>
            </>
          ) : (
            <>
              <div className="price-chip chip-red">
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
              <div className="icon-chip chip-red">
                <TrendingDownRoundedIcon />
              </div>
            </>
          )}
        </div>

        <div className="info-container">
          <h3
            className="coin-price"
            style={{
              color:
                coin.price_change_percentage_24h < 0
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            ₹{coin.current_price?.toLocaleString()}
          </h3>
          <p className="total_volume">
            Total Volume: ₹{coin.total_volume?.toLocaleString()}
          </p>
          <p className="total_volume">
            Market Cap: ₹{coin.market_cap?.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Grid;
