import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - Aurea Calzature",
};

export default function SnellaWalk360ThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="snellawalk360" />
    </>
  );
}
