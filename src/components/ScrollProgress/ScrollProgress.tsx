import { motion, useScroll } from "framer-motion";
import "./ScrollProgress.css";

export default function ScrollProgress() {
  // Ici, pas de "target" précisé : useScroll suit par défaut le scroll de TOUTE la page
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress"
      // scaleX contrôle la largeur (échelle horizontale) de la barre : 0 = invisible, 1 = pleine largeur.
      // On branche directement scrollYProgress dessus, donc la barre suit le scroll en temps réel.
      style={{ scaleX: scrollYProgress }}
    />
  );
}
