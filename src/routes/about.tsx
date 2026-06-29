import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Kambiz Tyre Supermarket" },
      {
        name: "description",
        content:
          "Two decades of keeping Kerala moving. Learn about Kambiz Tyre Supermarket's history, values and team in Wayanad.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <div className="pt-28">
        <About />
      </div>
      <Footer />
    </main>
  );
}
