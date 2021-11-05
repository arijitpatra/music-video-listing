import "./App.scss";
import { MainPage } from "./pages/Main/MainPage"; // TODO: Pages
import { useState, useEffect } from "react";

// TODO: MOVE THIS AND BELOW CUSTOM HOOK TO COMMON
const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;

const useNavigatorOnLine = () => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return status;
};

function App() {
  const isOnline = useNavigatorOnLine();

  document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });
        if (lazyloadImages.length === 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });

  return (
    <>
      {isOnline ? (
        <div
          style={{
            color: "white",
            background: "#16a116",
            textAlign: "center",
            position: "sticky",
            top: 0,
          }}
        >
          You are online
        </div>
      ) : (
        <div
          style={{
            color: "white",
            background: "#cd3326",
            textAlign: "center",
            position: "sticky",
            top: 0,
          }}
        >
          You are offline, please check the internet connection
        </div>
      )}
      <MainPage />
    </>
  );
}

export default App;
