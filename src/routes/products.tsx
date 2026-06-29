import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Kambiz Tyre Supermarket" },
      {
        name: "description",
        content:
          "Premium tyres for cars, SUVs, trucks and bikes. Multi-brand selection with free fitment in Wayanad, Kerala.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <div className="pt-28">
        <Products />
      </div>
      <Footer />
    </main>
  );
}
