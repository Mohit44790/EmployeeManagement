import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Loader = ({height}) => {
  const [loaderColor, setLoaderColor] = useState("text-blue-500");

  useEffect(() => {
    const colors = ["text-blue-500", "text-orange-500", "text-green-500", "text-emerald-400"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setLoaderColor(colors[index]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`text-xl font-semibold ${loaderColor} w-full flex justify-center items-center ${height ? height : 'min-h-[60vh]'}`}
    >
      <LoaderCircle className="w-20 h-20 animate-spin transition-colors" />
    </div>
  );
};

export default Loader;
