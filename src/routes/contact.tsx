import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Kambiz Tyre Supermarket" },
      {
        name: "description",
        content:
          "Get in touch with Kambiz Tyre Supermarket. Call, visit or send us a message for tyre quotes and appointments in Wayanad.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <div className="pt-28">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
