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
          price={500}
          isPopular={true}
          features={[
            "When I am up they gonne hate",
            "When I am down they gonna set me straight",
            "Best App of all time",
            "Frank Ocean the best musician",
            "Frank Ocean the best musician",
            "Frank Ocean the best musician",
          ]}
        />
        <PricingCard
          planName="Elite"
          price={2000}
          features={[
            "When I am up they gonne hate",
            "When I am down they gonna set me straight",
            "Best App of all time",
            "Frank Ocean the best musician",
            "Frank Ocean the best musician",
            "Frank Ocean the best musician",
            "When I am down they gonna set me straight",
            "When I am up they gonne hate",
          ]}
        />
      </div>
    </div>
  );
}

export default PricingPlan;
