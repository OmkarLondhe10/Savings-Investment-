// saveItemToWatchlist.js
import { toast } from "react-toastify";

export const saveItemToWatchlist = (e, id, coinName) => {
  e.preventDefault();
  e.stopPropagation();
  
  try {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    
    if (watchlist.includes(id)) {
      toast.warning(`${coinName} is already in your watchlist!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          background: "var(--darkgrey)",
          color: "var(--white)",
          border: "1px solid var(--blue)",
        }
      });
      return false;
    }

    watchlist.push(id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    
    toast.success(`${coinName} added to watchlist!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: "var(--darkgrey)",
        color: "var(--white)",
        border: "1px solid var(--green)",
      }
    });
    
    return true;
  } catch (error) {
    toast.error(`Failed to add ${coinName} to watchlist!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: "var(--darkgrey)",
        color: "var(--white)",
        border: "1px solid var(--red)",
      }
    });
    return false;
  }
};