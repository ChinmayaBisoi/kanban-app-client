import { useEffect, useState } from "react";

export default function useScreenSize(
  heightToAdd: number | undefined = 0,
  widthToAdd: number | undefined = 0
) {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth + widthToAdd,
      height: window.innerHeight + heightToAdd,
    });
  }, []);

  useEffect(() => {
    function getCurrentDimension(widthToAdd: number, heightToAdd: number) {
      return {
        width: window.innerWidth + widthToAdd,
        height: window.innerHeight + heightToAdd,
      };
    }

    const updateDimension = () => {
      setScreenSize(getCurrentDimension(widthToAdd, heightToAdd));
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return screenSize;
}
