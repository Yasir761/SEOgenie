import Home from "@/components/hero/hero";
import {HowItWorks} from '@/components/howitswork/howitswork' 
import Navbar from "@/components/navbar/navbar";
import Features from "@/components/features/features";
import Integrations from "@/components/integration/integration";
import Testimonials from "@/components/testimonials/testimonials";
import Pricing from "@/components/pricing/pricing";
import FAQSection from "@/components/faqs/faqs";
import CTAAndFooter from "@/components/footer/CTAFooter";
export default function HomePage() {
  return (
    <main>

      <Navbar />
      <Home />
      <HowItWorks  />
      <Features/>
      <Integrations />
      {/* <Testimonials/> */}
      <Pricing/>
      <FAQSection/>
      <CTAAndFooter/>

      
    </main>
  );
}
