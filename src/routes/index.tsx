import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Products from "@/components/Products";
import FeaturedTyre from "@/components/FeaturedTyre";
import Branches from "@/components/Branches";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kambiz Tyre Supermarket — Kerala's Premium Tyre Destination" },
      {
        name: "description",
        content:
          "Premium tyres, wheel alignment, balancing, puncture repair and truck tyre services in Wayanad, Kerala. Two branches at Panamaram and Arinjerummal.",
      },
      {
        property: "og:title",
        content: "Kambiz Tyre Supermarket — Premium Tyres & Service in Wayanad",
      },
      {
        property: "og:description",
        content:
          "World-class tyres and precision automotive care across two branches in Wayanad, Kerala.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <Products />
      <FeaturedTyre />
      <Branches />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
