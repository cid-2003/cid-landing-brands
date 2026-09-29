import "./Footer.css";

// Les colonnes du footer sont définies ici en dur (pas besoin d'un fichier séparé,
// ce contenu ne change pas dynamiquement selon la marque comme le mega-menu).
const footerColumns = [
  {
    title: "Produits",
    links: [
      "Comparatif téléphones",
      "Comparatif montres",
      "Comparatif écouteurs",
    ],
  },
  {
    title: "Marques",
    links: ["Apple", "Samsung", "Google Pixel"],
  },
  {
    title: "À propos",
    links: ["Le projet", "Méthodologie", "Sources des visuels"],
  },
  {
    title: "Ressources",
    links: ["Code source", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__columns">
        {/* On boucle sur footerColumns pour générer chaque colonne,
            puis on boucle sur les liens de CHAQUE colonne (boucle imbriquée) */}
        {footerColumns.map((col) => (
          <div key={col.title} className="footer__col">
            <h3 className="footer__col-title">{col.title}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__bottom">
        <p>
          Projet démo — comparatif Apple / Samsung / Google Pixel, à but
          pédagogique.
        </p>
        <div className="footer__socials">
          <a href="#" aria-label="GitHub">
            GH
          </a>
          <a href="#" aria-label="LinkedIn">
            IN
          </a>
        </div>
      </div>
    </footer>
  );
}
