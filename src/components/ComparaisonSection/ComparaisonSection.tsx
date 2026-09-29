import { motion } from "framer-motion";
import { phoneSpecs } from "../../data/brands";
import "./ComparisonSection.css";

// Les 3 marques qu'on affiche en colonnes, avec leur variable de couleur.
// On définit ça ici plutôt que d'importer "brands" en entier, car on n'a besoin
// que du nom + de la couleur pour l'en-tête du tableau.
const columns = [
  { key: "apple", label: "Apple", accentVar: "var(--accent-apple)" },
  { key: "samsung", label: "Samsung", accentVar: "var(--accent-samsung)" },
  { key: "pixel", label: "Google Pixel", accentVar: "var(--accent-pixel)" },
] as const; // "as const" fige les valeurs pour que TypeScript connaisse le type exact de "key"

export default function ComparisonSection() {
  return (
    <section id="comparatif" className="comparison">
      <div className="comparison__inner">
        <h2 className="comparison__title">Le comparatif</h2>
        <p className="comparison__subtitle">
          Les 3 téléphones phares, face à face.
        </p>

        <div className="comparison__table" role="table">
          {/* Ligne d'en-tête : une case vide (pour aligner avec les labels)
              + le nom de chaque marque avec sa couleur */}
          <div className="comparison__row comparison__row--header" role="row">
            <div
              className="comparison__cell comparison__cell--label"
              role="columnheader"
            />
            {columns.map((col) => (
              <div
                key={col.key}
                className="comparison__cell comparison__cell--brand"
                role="columnheader"
                style={{ "--col-accent": col.accentVar } as React.CSSProperties}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Une ligne par critère (écran, puce, caméra...).
              On boucle sur phoneSpecs, et pour chaque ligne on boucle sur "columns"
              pour aller chercher la bonne valeur (row[col.key]) */}
          {phoneSpecs.map((row, rowIndex) => (
            <motion.div
              key={row.label}
              className="comparison__row"
              role="row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: rowIndex * 0.08 }}
            >
              <div
                className="comparison__cell comparison__cell--label"
                role="rowheader"
              >
                {row.label}
              </div>
              {columns.map((col) => (
                <div key={col.key} className="comparison__cell" role="cell">
                  {row[col.key]}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
