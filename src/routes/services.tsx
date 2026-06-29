import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Kambiz Tyre Supermarket" },
      {
        name: "description",
        content:
          "Tyre sales, wheel alignment, balancing, puncture repair, rethreading and truck tyre services in Wayanad, Kerala.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <div className="pt-28">
        <Services />
      </div>
      <Footer />
    </main>
  );
}
