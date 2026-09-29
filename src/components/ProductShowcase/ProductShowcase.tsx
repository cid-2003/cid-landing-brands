import { motion } from "framer-motion";
import { brands } from "../../data/brands";
import "./ProductShowcase.css";

type ProductShowcaseProps = {
  brandId: "apple" | "samsung" | "pixel";
  theme: "light" | "dark";
};

export default function ProductShowcase({
  brandId,
  theme,
}: ProductShowcaseProps) {
  // On récupère la marque correspondante dans nos données...
  const brand = brands.find((b) => b.id === brandId);
  if (!brand) return null; // sécurité si jamais l'id ne correspond à rien

  // ...puis on ne garde QUE les produits qui ne sont pas le téléphone
  // (le téléphone est déjà mis en avant dans le hero juste au-dessus)
  const accessoryProducts = brand.products.filter(
    (p) => p.category !== "phone",
  );

  return (
    <section
      id={`${brandId}-products`}
      className={`showcase showcase--${theme}`}
    >
      <div className="showcase__inner">
        <h3 className="showcase__title">L'écosystème {brand.name}</h3>

        <div className="showcase__grid">
          {accessoryProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="showcase__card"
              // whileInView : l'animation se déclenche quand la carte ENTRE dans l'écran
              // (pas besoin de calculer le scroll nous-mêmes, Framer Motion le fait)
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} // "once: true" = l'anim ne se rejoue pas si on rescroll
              transition={{ duration: 0.5, delay: index * 0.15 }} // décalage entre chaque carte (effet "stagger")
              style={
                { "--card-accent": brand.accentVar } as React.CSSProperties
              }
            >
              <img
                src={product.image}
                alt={product.name}
                className="showcase__card-image"
                loading="lazy" // le navigateur ne charge l'image que quand elle approche de l'écran (perf)
              />
              <span className="showcase__card-category">
                {product.category}
              </span>
              <h4 className="showcase__card-name">{product.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
