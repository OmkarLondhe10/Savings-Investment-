// removeItemToWatchlist.js
import { toast } from "react-toastify";

export const removeItemFromWatchlist = (e, id, coinName, setIsCoinAdded) => {
  e.preventDefault();
  e.stopPropagation();
  
  toast.info(
    <div>
      <p>Remove {coinName} from watchlist?</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button 
          onClick={() => {
            try {
              let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
              const newList = watchlist.filter((coin) => coin !== id);
              localStorage.setItem("watchlist", JSON.stringify(newList));
              setIsCoinAdded(false);
              
              toast.success(`${coinName} removed successfully!`, {
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
            } catch (error) {
              toast.error(`Failed to remove ${coinName}!`, {
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
            }
          }}
          style={{
            padding: '5px 10px',
            background: 'var(--green)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Confirm
        </button>
        <button 
          onClick={() => toast.dismiss()}
          style={{
            padding: '5px 10px',
            background: 'var(--red)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </div>,
    {
      position: "bottom-right",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      theme: "dark",
      style: {
        background: "var(--darkgrey)",
        color: "var(--white)",
        border: "1px solid var(--blue)",
        minWidth: "300px"
      }
    }
  );
};