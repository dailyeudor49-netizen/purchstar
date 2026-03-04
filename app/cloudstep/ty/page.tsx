import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - VENOCARE™",
};

export default function CloudstepThankYou() {
  return <ThankYouContent landingSlug="cloudstep" />;
}
