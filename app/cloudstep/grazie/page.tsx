import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - VENOCARE™",
};

export default function CloudstepThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="cloudstep" />
    </>
  );
}
