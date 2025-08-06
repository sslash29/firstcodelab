"use client";

import BulletPoint from "./BulletPoint";

function PricingCard({
  planName = "Silver",
  price = 800,
  features = [
    "In a Group of the least amount is 4",
    "Choose The Path You Want to follow",
    "We Can Create a custom plan for you",
  ],
  isPopular = false,
}) {
  return (
    <div className="flex flex-col border py-2 px-4 rounded-lg w-[409px] h-[600px] bg-white relative">
      {/* Header */}
      {!isPopular ? (
        <span className="font-semibold mt-2 mb-2">{planName} Plan</span>
      ) : (
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold mt-2">{planName} Plan</span>
          <span className="font-bold bg-[#35A7FF] text-white px-2 h-fit py-1 flex items-center justify-center rounded-md text-xs self-end">
            Popular
          </span>
        </div>
      )}

      {/* Price */}
      <div className="flex mb-4">
        <h3 className="text-4xl font-bold">EGP{price}</h3>
        <span className=" font-light self-end">per month</span>
      </div>

      {/* Button */}
      <button className="font-bold px-4 py-2 flex items-center justify-center rounded-lg bg-[#DDDDE3]">
        <a href="https://wa.me/01278953422" target="_blank">
          Get Started
        </a>
      </button>
      <div className="w-[408px] h-[0.8px] bg-black absolute top-[162px] right-0"></div>
      {/* Feature List (Flexible Scrollable) */}
      <div className="flex flex-col gap-3 mt-10 flex-1 overflow-y-auto">
        <h4 className="font-bold ml-1">FEATURES</h4>
        <div className="px-4 flex flex-col gap-3.5">
          {features.map((feature, key) => (
            <BulletPoint key={key}>{feature}</BulletPoint>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
