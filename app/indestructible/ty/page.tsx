import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - Indestructible",
};

export default function IndestructibleThankYou() {
  return <ThankYouContent landingSlug="indestructible" />;
}
