import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { brands } from "../../data/brands";
import "./Header.css";

export default function Header() {
  // "openBrand" retient QUELLE marque a son mega-menu ouvert en ce moment.
  // null = aucun menu ouvert. useState nous donne la valeur + une fonction pour la changer.
  const [openBrand, setOpenBrand] = useState<string | null>(null);
  // un état séparé pour savoir si le menu mobile (plein écran) est ouvert ou non
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // onMouseLeave sur le header entier : si la souris quitte toute la zone du header,
    // on referme le mega-menu (évite qu'il reste ouvert "pour rien").
    <header className="header" onMouseLeave={() => setOpenBrand(null)}>
      <div className="header__inner">
        {/* Logo du site, cliquable pour remonter en haut de page */}
        <a href="#top" className="header__logo">
          PRISM
        </a>

        <nav className="header__nav header__nav--desktop">
          {/* On boucle sur le tableau "brands" pour générer un lien par marque.
              Avantage : si on ajoute une 4e marque dans brands.ts, le menu se met à jour tout seul. */}
          {brands.map((brand) => (
            <div
              key={brand.id} // React a besoin d'une clé unique pour chaque élément d'une liste
              className="header__nav-item"
              onMouseEnter={() => setOpenBrand(brand.id)} // survol => on ouvre le mega-menu de cette marque
            >
              <a href={`#${brand.id}`} className="header__nav-link">
                {brand.name}
              </a>
            </div>
          ))}
          <a href="#comparatif" className="header__nav-link">
            Comparatif
          </a>
        </nav>

        <div className="header__actions">
          {/* Bouton de recherche : juste une icône SVG dessinée à la main (une loupe) */}
          <button className="header__icon-btn" aria-label="Rechercher">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21l-4.3-4.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* le bouton burger, visible seulement sur mobile (géré en CSS) */}
          <button
            className="header__burger"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileMenuOpen} // pour l'accessibilité : indique l'état ouvert/fermé aux lecteurs d'écran
            onClick={() => setMobileMenuOpen((open) => !open)} // inverse l'état actuel
          >
            {/* 3 petites barres qui forment l'icône burger.
                On change leur apparence en CSS selon si le menu est ouvert (voir Header.css) */}
            <span
              className={`header__burger-line ${mobileMenuOpen ? "is-open" : ""}`}
            />
            <span
              className={`header__burger-line ${mobileMenuOpen ? "is-open" : ""}`}
            />
            <span
              className={`header__burger-line ${mobileMenuOpen ? "is-open" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* AnimatePresence permet à Framer Motion d'animer aussi la DISPARITION
          d'un élément (pas juste son apparition). Sans ça, le menu disparaîtrait d'un coup. */}
      <AnimatePresence>
        {openBrand && (
          <motion.div
            className="header__megamenu"
            initial={{ opacity: 0, y: -8 }} // état de départ : invisible, légèrement décalé vers le haut
            animate={{ opacity: 1, y: 0 }} // état final : visible, en place
            exit={{ opacity: 0, y: -8 }} // état pendant la disparition : même chose qu'au départ
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="header__megamenu-inner">
              {/* On cherche la marque actuellement ouverte dans le tableau "brands",
                  puis on affiche ses 3 produits sous forme de liens */}
              {brands
                .find((b) => b.id === openBrand)
                ?.products.map((product) => (
                  <a
                    key={product.id}
                    href={`#${openBrand}-${product.category}`}
                    className="header__megamenu-item"
                    // On passe la couleur d'accent de la marque en variable CSS inline,
                    // pour que le survol de ce lien précis prenne la bonne couleur.
                    style={
                      {
                        "--item-accent": brands.find((b) => b.id === openBrand)
                          ?.accentVar,
                      } as React.CSSProperties
                    }
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="header__megamenu-thumb"
                      loading="lazy"
                    />
                    {/* future miniature produit */}
                    <span>{product.name}</span>
                  </a>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* le menu mobile, en plein écran, qui slide depuis le haut.
          On liste directement toutes les marques + leurs produits, pas besoin de survol
          puisque sur mobile on tape plutôt qu'on survole. */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="header__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {brands.map((brand) => (
              <div key={brand.id} className="header__mobile-group">
                <a
                  href={`#${brand.id}`}
                  className="header__mobile-brand"
                  style={
                    { "--item-accent": brand.accentVar } as React.CSSProperties
                  }
                  onClick={() => setMobileMenuOpen(false)} // on referme le menu après avoir cliqué un lien
                >
                  {brand.name}
                </a>
                <div className="header__mobile-products">
                  {brand.products.map((product) => (
                    <a
                      key={product.id}
                      href={`#${brand.id}-${product.category}`}
                      className="header__mobile-product-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {product.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a
              href="#comparatif"
              className="header__mobile-brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comparatif
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
