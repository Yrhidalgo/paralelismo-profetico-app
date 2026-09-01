import exodusImg from '../assets/images/exodus_journey_desert_1788113311255.jpg';
import economyImg from '../assets/images/ancient_economy_scales_1788113329616.jpg';
import justiceImg from '../assets/images/biblical_justice_scales_1788113364062.jpg';
import solidarityImg from '../assets/images/solidarity_bread_sharing_1788134022438.jpg';
import nehemiahImg from '../assets/images/nehemiah_wall_rebuilding_1788134434835.jpg';
import financeImg from '../assets/images/finances_gold_treasury_1788113347349.jpg';
import editorialImg from '../assets/images/prophetic_parallel_editorial_1788112269744.jpg';

export interface ThemeVisualPair {
  id: string;
  category: string;
  biblicalImage: string;
  biblicalCaption: string;
  modernImage: string;
  modernCaption: string;
}

export const THEME_VISUALS: Record<string, ThemeVisualPair> = {
  all: {
    id: 'all',
    category: 'all',
    biblicalImage: editorialImg,
    biblicalCaption: 'Relatos y Profecías de las Sagradas Escrituras',
    modernImage: editorialImg,
    modernCaption: 'Acontecimientos Globales en Tiempo Real',
  },
  exodus: {
    id: 'exodus',
    category: 'exodus',
    biblicalImage: exodusImg,
    biblicalCaption: 'El Éxodo: Travesía del pueblo hebreo por el desierto',
    modernImage: exodusImg, // Placeholder: Modern Migration image required
    modernCaption: 'Diáspora y rutas migratorias contemporáneas',
  },
  economy: {
    id: 'economy',
    category: 'economy',
    biblicalImage: economyImg,
    biblicalCaption: 'Comercio y balanzas en la antigüedad bíblica',
    modernImage: economyImg, // Placeholder: Modern Economy/Inflation image required
    modernCaption: 'Hiperinflación y mercados financieros modernos',
  },
  justice: {
    id: 'justice',
    category: 'justice',
    biblicalImage: justiceImg,
    biblicalCaption: 'El clamor de los profetas por la rectitud y la ley',
    modernImage: justiceImg, // Placeholder: Modern Justice/Protest image required
    modernCaption: 'Instituciones y defensa de los derechos ciudadanos',
  },
  solidarity: {
    id: 'solidarity',
    category: 'solidarity',
    biblicalImage: solidarityImg,
    biblicalCaption: 'La Iglesia Primitiva compartiendo el pan',
    modernImage: solidarityImg, // Placeholder: Modern Solidarity/Comedor image required
    modernCaption: 'Ollas comunitarias y auxilio humanitario actual',
  },
  hope: {
    id: 'hope',
    category: 'hope',
    biblicalImage: nehemiahImg,
    biblicalCaption: 'Nehemías y la reconstrucción de los muros de Jerusalén',
    modernImage: nehemiahImg, // Placeholder: Modern Reconstruction image required
    modernCaption: 'Proyectos de recuperación y renacer institucional',
  },
  finance: {
    id: 'finance',
    category: 'finance',
    biblicalImage: financeImg,
    biblicalCaption: 'Tesoros, deudas y tributos en el contexto bíblico',
    modernImage: financeImg,
    modernCaption: 'Deuda soberana y crisis del capital global',
  },
  society: {
    id: 'society',
    category: 'society',
    biblicalImage: exodusImg,
    biblicalCaption: 'La condición del forastero y el mandato de acogida',
    modernImage: exodusImg,
    modernCaption: 'Desplazamiento forzado y crisis migratoria global',
  },
  governance: {
    id: 'governance',
    category: 'governance',
    biblicalImage: justiceImg,
    biblicalCaption: 'Denuncia profética contra la tiranía y leyes injustas',
    modernImage: justiceImg,
    modernCaption: 'Erosión institucional y clamor por el estado de derecho',
  },
  resources: {
    id: 'resources',
    category: 'resources',
    biblicalImage: solidarityImg,
    biblicalCaption: 'Mayordomía de la creación y el descanso de la tierra',
    modernImage: solidarityImg,
    modernCaption: 'Seguridad hídrica y degradación de suelos fértiles',
  }
};

export const getThemeVisuals = (category: string): ThemeVisualPair => {
  return THEME_VISUALS[category] || THEME_VISUALS['all'];
};
