import BrandHero from "./components/BrandHero/BrandHero";
import ComparisonSection from "./components/ComparaisonSection/ComparaisonSection";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ProductShowcase from "./components/ProductShowcase/ProductShowcase";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import { brands } from "./data/brands";
import "./styles/tokens.css";

const taglines: Record<string, string> = {
  apple: "Pensé différemment.",
  samsung: "Repoussez les limites.",
  pixel: "Pensé pour vous.",
};

function App() {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        {/* On boucle directement sur "brands" pour générer hero + showcase de chaque marque.
            Fini de dupliquer BrandHero/ProductShowcase 3 fois à la main dans le JSX. */}
        {brands.map((brand) => (
          <div key={brand.id}>
            <BrandHero
              id={brand.id}
              brandName={brand.name}
              tagline={taglines[brand.id]}
              videoSrc={brand.heroVideo}
              theme={brand.id === "samsung" ? "dark" : "light"}
            />
            <ProductShowcase
              brandId={brand.id}
              theme={brand.id === "samsung" ? "dark" : "light"}
            />
          </div>
        ))}

        <ComparisonSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
