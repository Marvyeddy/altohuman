import Hero from "@/components/home/Hero";
import Feature from "@/components/home/Features";
import How from "@/components/home/How";
import Cta from "@/components/home/Cta";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <Feature />
      <How />
      <Cta />
    </div>
  );
};

export default HomePage;
