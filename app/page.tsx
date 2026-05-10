import Hero from "@/components/home/Hero";
import Feature from "@/components/home/Features";
import How from "@/components/home/How";
import Cta from "@/components/home/Cta";
import Pricing from "@/components/home/Pricing";
import Faq from "@/components/home/Faq";
import Transform from "@/components/home/Transform";
import Footer from "@/components/home/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Alert className="rounded-none bg-linear-to-r from-[#FF73C3] via-[#7B71FF] to-[#0EC9E2] flex items-center justify-center fixed border-none z-40">
        <AlertDescription className="font-bold transition-all animate-pulse delay-1000 w-fit text-white max-md:text-xs">
          Heads up! Altohuman is still in the testing phase...All features will
          be fully functional soon.
        </AlertDescription>
      </Alert>
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
