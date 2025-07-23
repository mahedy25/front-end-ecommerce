import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import PopularNow from "@/components/BestSellers";
import WhyChooseUs from "@/components/whyChooseUs";


export default function Home() {
  return (
    <main className="">
      <Hero />
      <Categories />
      <PopularNow />
      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}
