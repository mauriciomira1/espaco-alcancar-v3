import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./MapComponent"), { ssr: false });

const GoogleMaps = () => {
  return <DynamicMap />;
};

export default GoogleMaps;
