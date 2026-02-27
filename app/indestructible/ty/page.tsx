import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - Indestructible",
};

export default function IndestructibleThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="indestructible" />
    </>
  );
}
