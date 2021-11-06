// @ts-nocheck
import { MainPage } from "./pages/Main";
import { useNavigatorOnLine } from "./hooks/useNavigatorOnLine";
import "./App.scss";

function App() {
  const isOnline = useNavigatorOnLine();

  /* Lazy loading helper,
  it is a plugged in piece of code */
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
