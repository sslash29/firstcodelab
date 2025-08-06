"use client";

import PricingCard from "./PricingCard";

function PricingPlan() {
  return (
    <div className="px-16 flex flex-col gap-15">
      <div className="font-bold text-4xl">
        <h2 className="text-center">We’ve got the plan that’s </h2>
        <h2 className="text-center">Perfect For Your </h2>
      </div>
      <div className="flex gap-5">
        <PricingCard />
        <PricingCard
          planName="Gold"
          price={1000}
          isPopular={true}
          features={[
            "Personalized 1:1 Course with Instructor",
            "Choose The Path You Want to follow",
            "We Can Create a custom plan for you",
            "12/7 Chat Support for Any Issues",
          ]}
        />
        <PricingCard
          planName="Custom"
          price={"1000+"}
          features={[
            "Personalized 1:1 Course with Instructor",
            "Personalized Time of each session",
            "24/7 Chat Support for Any Issues",
            "Customizable Curriculum (based on skill level or goals)",
            "Dedicated Instructor (Mentor)",
          ]}
        />
      </div>
    </div>
  );
}

export default PricingPlan;
