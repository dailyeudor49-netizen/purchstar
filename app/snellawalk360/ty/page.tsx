import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - Aurea Calzature",
};

export default function SnellaWalk360ThankYou() {
  return <ThankYouContent landingSlug="snellawalk360" />;
}
