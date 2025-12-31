import Hero from "@/components/home/Hero";
import Feature from "@/components/home/Features";
import How from "@/components/home/How";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <Feature />
      <How />
    </div>
  );
};

export default HomePage;
