import { BiblicalParallel } from '../types';
import editorialParallelImg from '../assets/images/prophetic_parallel_editorial_1788112269744.jpg';
import exodusImg from '../assets/images/exodus_journey_desert_1788113311255.jpg';
import scarcityImg from '../assets/images/ancient_economy_scales_1788113329616.jpg';
import justiceImg from '../assets/images/biblical_justice_scales_1788113364062.jpg';
import solidarityImg from '../assets/images/solidarity_bread_sharing_1788134022438.jpg';
import nehemiahImg from '../assets/images/nehemiah_wall_rebuilding_1788134434835.jpg';
import financeTreasuryImg from '../assets/images/finances_gold_treasury_1788113347349.jpg';

const jeremiahVerseImg = exodusImg;
const psalm46VerseImg = scarcityImg;
const isaiahVerseImg = justiceImg;
const psalm126VerseImg = solidarityImg;
const proverbsVerseImg = nehemiahImg;

export const BIBLICAL_PARALLELS: BiblicalParallel[] = [
  {
    id: 'exodus-diaspora',
    title: 'El Éxodo Masivo y la Diáspora Venezolana',
    category: 'exodus',
    theme: 'Migración, Exilio y Búsqueda de Libertad',
    iconName: 'Compass',
    biblicalPassage: {
      reference: 'Éxodo 12:37-42 / Jeremías 29:4-7 / Deuteronomio 28:64',
      text: 'Partieron los hijos de Israel de Ramesés a Sucot, como seiscientos mil hombres de a pie, sin contar los niños... Y el Señor los esparcirá entre todos los pueblos, desde un extremo de la tierra hasta el otro extremo.',
      context: 'El pueblo de Israel huyó del sometimiento y la servidumbre en Egipto en busca de libertad y sustento, emprendiendo una caminata dolorosa por el desierto. Siglos más tarde, el exilio babilónico obligó a miles de familias a rehacer sus vidas en tierras extrañas mientras conservaban la fe en el retorno.',
      imageUrl: exodusImg,
      imageCaption: 'Ilustración Bíblica: La marcha del pueblo de Israel por el desierto tras salir de Egipto en busca de libertad y sustento divino.'
    },
    venezuelaNewsContext: {
      headline: 'Más de 7.7 millones de venezolanos han emigrado según ACNUR y la OIM',
      summary: 'Reportes de los principales medios internacionales (BBC Mundo, Reuters, El País, El Nacional) registran el mayor desplazamiento humano en la historia reciente del hemisferio occidental, impulsado por el colapso económico, la inseguridad y la persecución política.',
      mediaSources: ['BBC Mundo', 'Reuters', 'El Nacional', 'El País', 'ACNUR/OIM'],
      keyFacts: [
        'Caminantes atravesando la densa selva del Darién en busca de protección y empleo.',
        'Familias divididas geográficamente enviando apoyo desde el extranjero.',
        'Comunidades de fe venezolanas fundadas en ciudades de Colombia, Perú, Chile, EE.UU. y España.'
      ]
    },
    parallelAnalysis: 'El paralelo entre el Éxodo bíblico y la diáspora venezolana radica en la necesidad imperiosa de huir de condiciones invivibles de servidumbre económica y opresión política. Así como los israelitas caminaron por senderos hostiles confiando en la guía divina, millones de caminantes venezolanos enfrentan selvas, fronteras y discriminación llevando consigo su cultura, sus oraciones y su fe intacta.',
    reflection: 'La fe en tiempos de exilio recuerda las palabras de Jeremías a los deportados: "Edificad casas, habitadlas, plantad huertos y comed del fruto de ellos... y procurad la paz de la ciudad adonde os hice transportar". La diáspora venezolana ha demostrado ser semillera de trabajo honrado, resiliencia y testimonio cristiano en toda América Latina y el mundo.',
    keyQuotes: {
      biblical: 'Jehová guardará tu salida y tu entrada desde ahora y para siempre. (Salmo 121:8)',
      contemporary: '"Llevamos a Venezuela en el corazón y la Biblia en la mochila." — Testimonio de caminante en la frontera de Cúcuta.'
    }
  },
  {
    id: 'hyperinflation-scarcity',
    title: 'La Carestía, Hiperinflación y el Asedio Económico',
    category: 'economy',
    theme: 'Hiperinflación, Devaluación y Lucha por la Canasta Básica',
    iconName: 'TrendingUp',
    biblicalPassage: {
      reference: '2 Reyes 6:24-29 / Apocalipsis 6:6 / Hageo 1:6',
      text: 'Oí una voz que decía: Dos libras de trigo por un denario, y seis libras de cebada por un denario... Sembráis mucho, y recogéis poco; coméis, y no os saciáis; bebéis, y no quedáis satisfechos; os vestís, y no os calentáis; y el que trabaja a sueldo recibe su sueldo en saco roto.',
      context: 'En 2 Reyes 6, la ciudad de Samaria sufrió un asedio feroz que desencadenó una escasez extrema donde los alimentos básicos alcanzaron precios astronómicos. Igualmente, el profeta Hageo describe periodos donde la moneda perdía poder adquisitivo de un día para otro.',
      imageUrl: scarcityImg,
      imageCaption: 'Ilustración Bíblica: Balanza y medidas en tiempo de escasez y devaluación en Samaria y el texto profético de Apocalipsis.'
    },
    venezuelaNewsContext: {
      headline: 'Años de hiperinflación prolongada y pulverización del poder adquisitivo del Bolívar',
      summary: 'Diarios como Efecto Cocuyo, La Patilla, Reuters y El Nacional han documentado cómo el salario mínimo mensual cayó a niveles ínfimos en relación con la canasta alimentaria, obligando a reconversiones monetarias sucesivas (eliminando 14 ceros a la moneda nacional).',
      mediaSources: ['Efecto Cocuyo', 'La Patilla', 'Reuters', 'EFE'],
      keyFacts: [
        'Sueldos mínimos que apenas alcanzan para comprar un cartón de huevos o un kilo de queso.',
        'Dependencia extrema de remesas familiares y economía informal.',
        'Indexación de precios al dólar mientras los salarios públicos permanecen rezagados.'
      ]
    },
    parallelAnalysis: 'El texto de Apocalipsis 6:6 profetiza una época donde el trabajo de todo un día (un denario) apenas alcanza para comprar el pan básico diario para una persona. La realidad económica venezolana durante el pico hiperinflacionario es la manifestación contemporánea exacta de este fenómeno: el esfuerzo laboral desvalorizado en "saco roto" y la angustia diaria por la manutención del hogar.',
    reflection: 'Frente a la escasez, la Biblia muestra la provisión milagrosa de Dios (como la viuda de Sarepta en 1 Reyes 17). La familia venezolana ha desarrollado una fe profunda que confía en el Dios sustentador diario: "El pan nuestro de cada día, dánoslo hoy".',
    keyQuotes: {
      biblical: 'El que trabaja a sueldo recibe su sueldo en saco roto. (Hageo 1:6)',
      contemporary: '"Cada día es un milagro de multiplicación para poner comida en la mesa." — Vocero comunitario en Petare, Caracas.'
    }
  },
  {
    id: 'oppression-justice',
    title: 'Opresión Político-Social y Clamor por la Justicia',
    category: 'justice',
    theme: 'Autoritarismo, Persecución de Disidentes y Represión',
    iconName: 'Scale',
    biblicalPassage: {
      reference: '1 Reyes 21:1-16 / Proverbios 29:2 / Isaías 10:1-2',
      text: '¡Ay de los que dictan leyes injustas, y prescriben tiranía para apartar del juicio a los pobres, y para quitar el derecho a los afligidos de mi pueblo!... Cuando los justos dominan, el pueblo se alegra; mas cuando domina el impío, el pueblo gime.',
      context: 'El rey Acab y la reina Jezabel usaron el poder del Estado para despojar injustamente a Nabot de su viña ancestral y asesinarlo falsificando la ley. Los profetas de la Biblia denunciaron continuamente la corrupción institucional, el soborno de jueces y el sufrimiento del inocente.',
      imageUrl: justiceImg,
      imageCaption: 'Ilustración Bíblica: La viña de Nabot y el clamor de los profetas bíblicos contra las leyes injustas y el abuso de poder.'
    },
    venezuelaNewsContext: {
      headline: 'Crisis electoral e institucional post-28 de julio de 2024 y violaciones a los DDHH',
      summary: 'Organismos de Derechos Humanos de la ONU, la OEA, Amnistía Internacional e informes periodísticos de El Nacional, CNN en Español y Deutsche Welle (DW) detallan detenciones arbitrarias, inhabilitaciones políticas y represión de manifestaciones pacíficas.',
      mediaSources: ['Amnistía Internacional', 'Naciones Unidas (Alto Comisionado)', 'El Nacional', 'DW', 'CNN'],
      keyFacts: [
        'Detención de más de 2.000 ciudadanos tras protestas ciudadanas post-electorales.',
        'Inhabilitación y persecución contra líderes de la oposición democrática.',
        'Informes del Consejo de Derechos Humanos señalando crímenes de opresión estatal.'
      ]
    },
    parallelAnalysis: 'El abuso de poder gubernamental para aferrarse al mando silenciando la voluntad popular es un tema recurrente en las Escrituras. Nabot fue víctima del abuso judicial de reyes sin temor de Dios. Las noticias de denuncias internacionales en Venezuela reflejan este patrón bíblico donde el poder político se aparta de la justicia divina para oprimir a la ciudadanía.',
    reflection: 'La Biblia asegura que Dios no es indiferente al clamor de los perseguidos: "El Señor ejecuta justicia y juicio a favor de todos los que padecen violencia" (Salmo 103:6). El anhelo de verdad y justicia en Venezuela trasciende lo político y se convierte en un clamor espiritual.',
    keyQuotes: {
      biblical: 'Cuando domina el impío, el pueblo gime. (Proverbios 29:2)',
      contemporary: '"La verdad es la única base firme para la paz y la reconciliación de nuestro país." — Conferencia Episcopal Venezolana.'
    }
  },
  {
    id: 'solidarity-community',
    title: 'Redes de Solidaridad, Ollas Comunitarias y Apoyo Mutuo',
    category: 'solidarity',
    theme: 'Amor Fraterno, Comedores Populares y Fe en Acción',
    iconName: 'HeartHandshake',
    biblicalPassage: {
      reference: 'Hechos 2:44-47 / 1 Reyes 17:8-16 / Gálatas 6:2',
      text: 'Todos los que habían creído estaban juntos, y tenían en común todas las cosas; y vendían sus propiedades y sus bienes, y lo repartían a todos según la necesidad de cada uno... Llevad los unos las cargas de los otros, y cumplid así la ley de Cristo.',
      context: 'En medio de hambrunas y persecución romana, la Iglesia Primitiva en Jerusalén organizó la distribución de alimentos a viudas y necesitados. De igual forma, la viuda de Sarepta compartió su último puñado de harina con el profeta Elías, experimentando la multiplicación incorruptible.',
      imageUrl: solidarityImg,
      imageCaption: 'Ilustración Bíblica: La comunidad apostólica de Jerusalén compartiendo el pan, provisiones y el amor fraterno en común.'
    },
    venezuelaNewsContext: {
      headline: 'Multiplicación de "Ollas Comunitarias", comedores parroquiales y auxilio mutuo',
      summary: 'Diarios locales e internacionales han visibilizado cómo parroquias, ONG locales (como Alimenta la Solidaridad) y vecinos se organizan para cocinar sopa comunitaria y alimentar a niños, ancianos y enfermos vulnerables en barriadas urbanas y rurales.',
      mediaSources: ['El Pitazo', 'Crónica Uno', 'Tal Cual', 'Efecto Cocuyo'],
      keyFacts: [
        'Miles de niños atendidos a diario en comedores comunitarios gestionados por madres voluntarias.',
        'Remesas familiares convertidas en medicinas compartidas con vecinos de la tercera edad.',
        'Redes eclesiales enviando insumos médicos a hospitales con déficit de suministros.'
      ]
    },
    parallelAnalysis: 'Las "ollas comunitarias" en los barrios de Venezuela son un reflejo directo del ágape y la comunión fraterna descritos en el libro de los Hechos de los Apóstoles. En ausencia de un Estado eficiente, la ciudadanía y las comunidades de fe han asumido la responsabilidad bíblica de cuidar del prójimo compartiendo el poco alimento disponible.',
    reflection: 'En las horas más oscuras, la luz del Evangelio brilla a través del servicio abnegado. "No nos cansemos, pues, de hacer el bien; porque a su tiempo segaremos, si no desmayamos" (Gálatas 6:9).',
    keyQuotes: {
      biblical: 'Tenían en común todas las cosas y repartían según la necesidad de cada uno. (Hechos 2:44)',
      contemporary: '"Donde come uno, comen tres si hay amor en el caldero." — Voluntaria de cocina comunitaria en Catia.'
    }
  },
  {
    id: 'reconstruction-hope',
    title: 'El Anhelo de Reconstrucción Nacional y Nehemías',
    category: 'hope',
    theme: 'Reconstrucción de Murallas, Retorno de las Familias y Renovación Moral',
    iconName: 'Sparkles',
    biblicalPassage: {
      reference: 'Nehemías 2:17-18 / Jeremías 29:11 / Salmo 126:1-3',
      text: 'Les dije, pues: Vosotros veis la mal de la situación en que estamos, que Jerusalén está desierta, y sus puertas consumidas por el fuego; venid, y edifiquemos el muro de Jerusalén, y no estemos más en vergüenza... Entonces dijimos: Levantémonos y edifiquemos. Y esforzaron sus manos para bien.',
      context: 'Nehemías recibió la noticia de que los muros de su ciudad natal estaban derribados y el pueblo en gran aflicción. Movido por la oración y el liderazgo patriótico, organizó a la comunidad para reconstruir la nación desde sus ruinas, restaurando también las leyes morales y espirituales.',
      imageUrl: nehemiahImg,
      imageCaption: 'Ilustración Bíblica: Nehemías y el pueblo reedificando las murallas y puertas caídas de Jerusalén con oración y trabajo firme.'
    },
    venezuelaNewsContext: {
      headline: 'El llamado persistente a la reunificación familiar y la reconstrucción institucional',
      summary: 'Líderes de la sociedad civil, sectores académicos, iglesias y la diáspora articulan propuestas para la reconstrucción económica, el retorno seguro de los exiliados y el rescate de la ética pública en Venezuela.',
      mediaSources: ['El Nacional', 'La Gran Aldea', 'El Estímulo', 'Runrunes'],
      keyFacts: [
        'Planes elaborados por ingenieros, educadores y economistas venezolanos en el exilio para la reconstrucción.',
        'Concentraciones de fe donde millones oran por la paz, libertad y el regreso de sus hijos.',
        'Resiliencia cultural de la juventud venezolana en campos educativos, artísticos y científicos.'
      ]
    },
    parallelAnalysis: 'Venezuela se encuentra en un momento histórico análogo al de la Jerusalén de Nehemías: un país destruido institucional y económicamente, pero con un pueblo lleno de talentos y ganas de reconstruir. El espíritu de Nehemías —oración combinada con trabajo arduo y unión de todos los sectores— es el modelo bíblico para el renacer venezolano.',
    reflection: 'El Salmo 126 expresa el júbilo del regreso: "Cuando el Señor hizo volver a los cautivos de Sion, éramos como los que sueñan. Entonces nuestra boca se llenó de risa, y nuestra lengua de alabanza... Grandes cosas ha hecho el Señor con nosotros; estaremos alegres".',
    keyQuotes: {
      biblical: 'Levantémonos y edifiquemos. Y esforzaron sus manos para bien. (Nehemías 2:18)',
      contemporary: '"Venezuela volverá a florecer con la fuerza de su gente y la bendición de Dios."'
    }
  }
];

export const BIBLICAL_VERSES_FOR_TRIALS = [
  {
    verse: 'Jeremías 29:11',
    text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.',
    category: 'Esperanza y Futuro',
    imageUrl: jeremiahVerseImg,
    imageCaption: 'El profeta Jeremías contemplando el amanecer y sosteniendo el rollo de promesas divinas para los exiliados.'
  },
  {
    verse: 'Salmo 46:1-2',
    text: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones. Por tanto, no temeremos, aunque la tierra sea removida.',
    category: 'Protección en la Crisis',
    imageUrl: psalm46VerseImg,
    imageCaption: 'Fortaleza y refugio inquebrantable en las alturas ante las tempestades y pruebas.'
  },
  {
    verse: 'Isaías 41:10',
    text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.',
    category: 'Fortaleza Espiritual',
    imageUrl: isaiahVerseImg,
    imageCaption: 'Caminante bíblico sustentado e iluminado por la presencia divina en medio de sendas áridas.'
  },
  {
    verse: 'Salmo 126:5-6',
    text: 'Los que sembraron con lágrimas, con regocijo segarán. Irá andando y llorando el que lleva la preciosa semilla; mas volverá a venir con regocijo, trayendo sus gavillas.',
    category: 'Consuelo y Retorno',
    imageUrl: psalm126VerseImg,
    imageCaption: 'Segadores bíblicos cosechando gavillas doradas de trigo con júbilo tras tiempos de siembra y dolor.'
  },
  {
    verse: 'Proverbios 21:3',
    text: 'Hacer justicia y juicio es a Jehová más agradable que sacrificio.',
    category: 'Justicia Social',
    imageUrl: proverbsVerseImg,
    imageCaption: 'Balanza de rectitud y rollos sagrados en el atrio del templo, simbolizando la justicia y el juicio recto.'
  }
];

