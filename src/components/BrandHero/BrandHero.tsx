import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./BrandHero.css";

type BrandHeroProps = {
  id: string; // id de la marque, sert d'ancre (#apple, #samsung, #pixel.)
  brandName: string; // nom de la marque (Apple, Samsung, Pixel.)
  tagline: string; // phrase d'accroche sous le nom
  videoSrc: string; // source de la vidéo (chemin relatif ou URL)
  theme: "light" | "dark"; // permet de basculer le hero en dark mode (pour samsung)
};

export default function BrandHero({
  id,
  brandName,
  tagline,
  videoSrc,
  theme,
}: BrandHeroProps) {
  // "ref" nous donne un accès direct à l'élément DOM section,
  // pour que Framer Motion puisse mesuer SA position de scroll précise (pas celle de toute la page).
  const sectionRef = useRef<HTMLElement>(null);

  // useScroll suit la progression du scroll À L'INTÉRIEUR de cette section précise.
  // offset: ["start end", "end start"] veut dire :
  //   - "start end"  → le progrès commence à 0 quand le HAUT de la section touche le BAS de l'écran
  //   - "end start"  → le progrès atteint 1 quand le BAS de la section touche le HAUT de l'écran
  // Résultat : progress passe de 0 à 1 pendant tout le temps où la section traverse l'écran.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // useTransform "traduit" une valeur (ici scrollYProgress, de 0 à 1)
  // en une autre valeur utile pour l'animation.
  // Ici : quand progress va de 0 → 0.5, l'échelle (scale) de la vidéo va de 1.15 → 1
  // (donc la vidéo commence légèrement zoomée et se "dézoome" doucement en scrollant).
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  // Idem pour l'opacité du texte : il est invisible au tout début (0),
  // apparaît complètement entre 10% et 30% du scroll, puis commence à disparaître après 70%.
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.7, 0.9],
    [0, 1, 1, 0],
  );
  const textY = useTransform(scrollYProgress, [0, 0.1], [40, 0]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`brand-hero brand-hero--${theme}`}
    >
      {/* La vidéo en fond, avec l'effet de zoom piloté par le scroll */}
      <motion.video
        className="brand-hero__video"
        style={{ scale: videoScale }}
        src={videoSrc}
        autoPlay
        muted // navigateurs bloquent l'autoplay si le son n'est pas coupé
        loop
        playsInline // évite que la vidéo passe en plein écran automatiquement sur iOS
      />

      {/* Un voile semi-transparent par-dessus la vidéo, pour que le texte reste lisible */}
      <div className="brand-hero__overlay" />

      {/* Le texte (nom de marque + accroche), animé selon le scroll */}
      <motion.div
        className="brand-hero__content"
        style={{ opacity: textOpacity, y: textY }}
      >
        <h2 className="brand-hero__title">{brandName}</h2>
        <p className="brand-hero__tagline">{tagline}</p>
      </motion.div>
    </section>
  );
}
