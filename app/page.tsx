import Hero from "@/components/home/Hero";
import Feature from "@/components/home/Features";
import How from "@/components/home/How";
import Cta from "@/components/home/Cta";
import Pricing from "@/components/home/Pricing";
import Faq from "@/components/home/Faq";
import Transform from "@/components/home/Transform";
import Footer from "@/components/home/Footer";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <Feature />
      <How />
      <Cta />
      <Pricing />
      <Faq />
      <Transform />
      <Footer />
    </div>
  );
};

export default HomePage;
