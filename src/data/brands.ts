// On définit ici la "forme" (le type) d'un projet et d'une marque.
// typescript va nous aider à ne pas faire d'erreur en respectant cette structure.

export type Product = {
  id: string; // identifiant unique, utilisé dans les liens/ancres
  name: string; // nom affichcé à l'utilisateur
  category: "phone" | "watch" | "earbuds"; // type de produit
  image: string;
};

export type Brand = {
  id: "apple" | "samsung" | "pixel";
  name: string;
  accentVar: string; // le nom de la variable CSSS de couleur d'accent pour cette marque
  products: Product[]; // liste des 3 produits phares de la marques
  heroVideo: string;
};

// Ici on stocke les vraies données : les 3 marques et leurs produits
// C'est ce tableau qu'on va parcourir (avec .map()) dans le Headr et ailleurs
// pour générer automatiquement le menu, au lieu d'écrire le HTML à la main pour chaque marque

export const brands: Brand[] = [
  {
    id: "apple",
    name: "Apple",
    accentVar: "var(--accent-apple)",
    heroVideo: "/videos/apple/hero.mp4",
    products: [
      {
        id: "iphone",
        name: "iPhone 18 Pro",
        category: "phone",
        image: "/images/apple/apple.jpg",
      },
      {
        id: "apple-watch",
        name: "Apple Watch",
        category: "watch",
        image: "/images/apple/apple-watch.jpeg",
      },
      {
        id: "airpods",
        name: "AirPods Pro",
        category: "earbuds",
        image: "/images/apple/airpods.jpeg",
      },
    ],
  },
  {
    id: "samsung",
    name: "Samsung",
    accentVar: "var(--accent-samsung)",
    heroVideo: "/videos/samsung-hero.mp4",
    products: [
      {
        id: "galaxy-s",
        name: "Galaxy S25 Ultra",
        category: "phone",
        image: "/images/samsung/galaxy.jpg",
      },
      {
        id: "galaxy-watch",
        name: "Galaxy Watch",
        category: "watch",
        image: "/images/samsung/galaxy-watch.jpeg",
      },
      {
        id: "galaxy-buds",
        name: "Galaxy Buds",
        category: "earbuds",
        image: "/images/samsung/galaxy-buds.jpeg",
      },
    ],
  },
  {
    id: "pixel",
    name: "Google Pixel",
    accentVar: "var(--accent-pixel)",
    heroVideo: "/videos/pixel-hero.mp4",
    products: [
      {
        id: "pixel-phone",
        name: "Pixel 10 Pro",
        category: "phone",
        image: "/images/pixel/pixel.jpeg",
      },
      {
        id: "pixel-watch",
        name: "Pixel Watch",
        category: "watch",
        image: "/images/pixel/pixel-watch.jpeg",
      },
      {
        id: "pixel-buds",
        name: "Pixel Buds",
        category: "earbuds",
        image: "/images/pixel/pixel-buds.jpeg",
      },
    ],
  },
];

export type SpecRow = {
  label: string;
  apple: string;
  samsung: string;
  pixel: string;
};

export const phoneSpecs: SpecRow[] = [
  {
    label: "Écran",
    apple: '6.3" OLED 120Hz',
    samsung: '6.9" AMOLED 120Hz',
    pixel: '6.3" OLED 120Hz',
  },
  {
    label: "Puce",
    apple: "A19 Pro",
    samsung: "Snapdragon 8 Elite",
    pixel: "Tensor G5",
  },
  {
    label: "Caméra principale",
    apple: "48 MP",
    samsung: "200 MP",
    pixel: "50 MP",
  },
  {
    label: "Batterie",
    apple: "Jusqu'à 29h vidéo",
    samsung: "5000 mAh",
    pixel: "4870 mAh",
  },
  {
    label: "Prix de départ",
    apple: "1 199 €",
    samsung: "1 099 €",
    pixel: "999 €",
  },
];
