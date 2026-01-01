import Hero from "@/components/home/Hero";
import Feature from "@/components/home/Features";
import How from "@/components/home/How";
import Cta from "@/components/home/Cta";
import Pricing from "@/components/home/Pricing";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <Feature />
      <How />
      <Cta />
      <Pricing />
    </div>
  );
};

export default HomePage;
