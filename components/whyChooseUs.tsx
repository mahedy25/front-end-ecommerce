import Image from "next/image";
import { Lobster_Two } from "next/font/google";
import {
  CheckCircle,
  BadgeDollarSign,
  UserCheck,
  Truck,
  ThumbsUp,
} from "lucide-react";

const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

export default function WhyChooseUs() {
  return (
    <main className="mt-20 sm:mt-24 md:mt-32 lg:mt-40 px-4 max-w-7xl mx-auto">
      <h1
        className={`${lobster.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-12`}
      >
        Why Choose Us?
      </h1>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Banner Image */}
        <div className="w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/futuristic-supercar-snowy-canyon.jpg"
            alt="Why Choose Us"
            width={800}
            height={500}
            className="object-cover w-full h-full rounded-xl"
            priority
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 space-y-6 ">
          <h2 className={`${lobster.className} text-2xl sm:text-3xl font-bold text-[#046C4E]`}>
            Excellence in Every Drive
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We’re not just another car platform. We deliver hand-picked luxury cars
            with uncompromising quality, backed by stellar customer service and transparent pricing.
          </p>

          <ul className="space-y-4 mt-4">
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <CheckCircle size={20} className="text-[#046C4E] mt-0.5" />
              <span>100% verified luxury cars</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <BadgeDollarSign size={20} className="text-[#046C4E] mt-0.5" />
              <span>Transparent pricing with no hidden fees</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <UserCheck size={20} className="text-[#046C4E] mt-0.5" />
              <span>Dedicated and personalized customer service</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <Truck size={20} className="text-[#046C4E] mt-0.5" />
              <span>Nationwide secure delivery options</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <ThumbsUp size={20} className="text-[#046C4E] mt-0.5" />
              <span>Trusted by over 10,000+ happy customers</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
