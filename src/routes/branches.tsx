import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Branches from "@/components/Branches";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Our Branches — Kambiz Tyre Supermarket" },
      {
        name: "description",
        content:
          "Find Kambiz Tyre Supermarket at Panamaram and Arinjerummal, Wayanad, Kerala. Get directions, opening hours and contact details.",
      },
    ],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <div className="pt-28">
        <Branches />
      </div>
      <Footer />
    </main>
  );
}
