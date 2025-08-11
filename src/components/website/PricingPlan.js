"use client";

import PricingCard from "./PricingCard";
import { useI18n } from "@/lib/i18n";

function PricingPlan() {
  const { t } = useI18n();
  return (
    <div className="px-4 sm:px-16 flex flex-col gap-10 sm:gap-16">
      <div className="font-bold text-3xl sm:text-4xl">
        <h2 className="text-center">{t("pricing.title1")}</h2>
        <h2 className="text-center">{t("pricing.title2")}</h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <PricingCard
          planKey="silver"
          planName={t("pricing.silverPlan")}
          features={t("pricing.silverFeatures")}
        />
        <PricingCard
          planKey="gold"
          planName={t("pricing.goldPlan")}
          price={1000}
          isPopular={true}
          features={t("pricing.goldFeatures")}
        />
        <PricingCard
          planKey="custom"
          planName={t("pricing.customPlan")}
          price={"1000+"}
          features={t("pricing.customFeatures")}
        />
      </div>
    </div>
  );
}

export default PricingPlan;
