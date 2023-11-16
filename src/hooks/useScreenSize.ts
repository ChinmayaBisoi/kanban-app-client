import { useEffect, useState } from "react";

export default function useScreenSize(heightToAdd: number | undefined = 0) {
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    setScreenSize(window.innerHeight + heightToAdd);
  }, [window.innerHeight]);

  useEffect(() => {
    function getCurrentDimension(heightToAdd: number) {
      return window.innerHeight + heightToAdd;
    }

    const updateDimension = () => {
      setScreenSize(getCurrentDimension(heightToAdd));
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return screenSize;
}
