"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Beer,
  Wine,
  Martini,
  Music,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ChevronDown,
  Menu,
  X,
  Camera,
  Globe,
  Heart,
  Mic2,
  Palette,
  Brain,
  PartyPopper,
} from "lucide-react";

/* ───── animation helpers ───── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ───── data ───── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1681912406153-3c182eb94426?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1654113085277-c900fdc00964?w=800&q=80",
  beer: "https://images.unsplash.com/photo-1672069001592-867afc8ca1c2?w=800&q=80",
  cocktail: "https://images.unsplash.com/photo-1772311698901-fe3fa07141be?w=800&q=80",
  wine: "https://images.unsplash.com/photo-1668597965487-8eea9aab344c?w=800&q=80",
  food: "https://images.unsplash.com/photo-1677476154992-d9a4d88622f7?w=800&q=80",
  gallery1: "https://images.unsplash.com/photo-1633895365434-568d92210a76?w=600&q=80",
  gallery2: "https://images.unsplash.com/photo-1526907858462-4b1c6b0a0dcc?w=600&q=80",
  gallery3: "https://images.unsplash.com/photo-1575405491233-ae3545e5f807?w=600&q=80",
  gallery4: "https://images.unsplash.com/photo-1572550475328-2219f89eb077?w=600&q=80",
  gallery5: "https://images.unsplash.com/photo-1772187727832-d662c248d5f3?w=600&q=80",
  gallery6: "https://images.unsplash.com/photo-1762417421592-4ddbabc1b5cd?w=600&q=80",
  events: "https://images.unsplash.com/photo-1761243839291-45a7dc911df7?w=800&q=80",
  parallax: "https://images.unsplash.com/photo-1770334597610-8335702e8ab1?w=1920&q=80",
  contact: "https://images.unsplash.com/photo-1640552522897-3e7cfe787e3d?w=1920&q=80",
};

const drinks = [
  {
    category: "Csapolt Sörök",
    icon: Beer,
    color: "neon-yellow",
    items: [
      { name: "Rozsda IPA", desc: "Házi főzésű, citrusos-fenyős", price: "990" },
      { name: "Bécsi Láger", desc: "Klasszikus, ropogós", price: "790" },
      { name: "Búzasör", desc: "Bajor stílusú, krémes", price: "890" },
      { name: "Stout", desc: "Sötét, kávés-csokis", price: "990" },
    ],
  },
  {
    category: "Koktélok",
    icon: Martini,
    color: "neon-pink",
    items: [
      { name: "Rozsda Spritz", desc: "Aperol, pezsgő, szóda, narancs", price: "2 490" },
      { name: "Budapest Mule", desc: "Vodka, gyömbérsör, lime, uborka", price: "2 690" },
      { name: "Pálinka Sour", desc: "Szilva pálinka, citrom, tojásfehérje", price: "2 890" },
      { name: "Neon Negroni", desc: "Gin, Campari, vermut", price: "2 790" },
    ],
  },
  {
    category: "Borok",
    icon: Wine,
    color: "neon-cyan",
    items: [
      { name: "Egri Bikavér", desc: "Testes, fűszeres vörös", price: "890" },
      { name: "Tokaji Furmint", desc: "Száraz, ásványos fehér", price: "990" },
      { name: "Villányi Rosé", desc: "Friss, gyümölcsös", price: "790" },
      { name: "Szekszárdi Kadarka", desc: "Könnyű, elegáns vörös", price: "990" },
    ],
  },
];

const foods = [
  { name: "Házi Pogácsa", desc: "Sajtos & tepertős válogatás", price: "1 290" },
  { name: "Kolbász Tál", desc: "Füstölt kolbász, mustár, kenyér", price: "2 490" },
  { name: "Lángos", desc: "Tejfölös-sajtos, klasszikus", price: "1 890" },
  { name: "Melegszendvics", desc: "Sonkás-sajtos, ropogós", price: "1 490" },
  { name: "Töltött Káposzta", desc: "Nagymama receptje szerint", price: "2 890" },
  { name: "Sajt & Charcuterie", desc: "Válogatott magyar sajtok & felvágottak", price: "3 490" },
];

const events = [
  {
    title: "Élő Jazz Est",
    desc: "Minden pénteken 20:00-tól",
    icon: Music,
    tag: "Zene",
    tagColor: "bg-neon-pink",
  },
  {
    title: "DJ Szombat",
    desc: "Elektronikus zene hajnalig",
    icon: Mic2,
    tag: "Party",
    tagColor: "bg-neon-cyan",
  },
  {
    title: "Kvíz Este",
    desc: "Szerdánként 19:00 - Nyerj sört!",
    icon: Brain,
    tag: "Játék",
    tagColor: "bg-neon-yellow",
  },
  {
    title: "Művész Piac",
    desc: "Havonta egyszer, helyi alkotók",
    icon: Palette,
    tag: "Kultúra",
    tagColor: "bg-amber",
  },
];

const gallery = [
  { label: "Belső tér", image: IMG.gallery1, span: "md:col-span-2 md:row-span-2" },
  { label: "Udvar", image: IMG.gallery2, span: "" },
  { label: "Neon", image: IMG.gallery3, span: "" },
  { label: "Hangulat", image: IMG.gallery4, span: "md:col-span-2" },
  { label: "Koncert", image: IMG.gallery5, span: "" },
  { label: "Kívülről", image: IMG.gallery6, span: "" },
];

const navLinks = [
  { label: "Rólunk", href: "#rolunk" },
  { label: "Italok", href: "#italok" },
  { label: "Étel", href: "#etel" },
  { label: "Galéria", href: "#galeria" },
  { label: "Programok", href: "#programok" },
  { label: "Kapcsolat", href: "#kapcsolat" },
];

/* ───── component ───── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDrink, setActiveDrink] = useState(0);

  return (
    <>
      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 inset-x-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-bold tracking-tight">
            <span className="text-cream">ROZSDA</span>
            <span className="neon-text-pink text-lg ml-1">*</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-mist hover:text-neon-pink transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kapcsolat"
              className="text-sm font-bold px-5 py-2 rounded-full bg-neon-pink text-void hover:bg-neon-pink/80 transition-colors"
            >
              Asztalfoglalás
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-cream"
            aria-label="Menü"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-void/95 backdrop-blur-lg border-t border-smoke px-6 pb-6"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-mist hover:text-neon-pink font-medium border-b border-smoke/30 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kapcsolat"
              onClick={() => setMenuOpen(false)}
              className="mt-4 block text-center font-bold px-5 py-3 rounded-full bg-neon-pink text-void"
            >
              Asztalfoglalás
            </a>
          </motion.div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
      >
        <Image
          src={IMG.hero}
          alt="Rozsda Romkocsma belső tér"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void/90" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-sm uppercase tracking-[0.4em] text-neon-cyan font-medium mb-6"
          >
            Budapest &bull; VII. kerület &bull; Romkocsma
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-7xl md:text-9xl font-bold text-cream leading-[0.9] mb-4"
          >
            ROZSDA
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-display text-2xl md:text-3xl font-light text-neon-yellow animate-neon-flicker mb-8"
          >
            romkocsma
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-lg text-mist max-w-xl mx-auto mb-10"
          >
            Ahol a romlás szépsége találkozik a város lüktetésével. Craft sörök, élő
            zene és felülmúlhatatlan hangulat.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#italok"
              className="px-8 py-4 rounded-full bg-neon-pink text-void font-bold text-base hover:bg-neon-pink/80 transition-colors"
            >
              Nézd meg az itallapot
            </a>
            <a
              href="#rolunk"
              className="px-8 py-4 rounded-full border border-cream/30 text-cream font-bold text-base hover:border-neon-cyan hover:text-neon-cyan transition-colors"
            >
              Ismerd meg a helyet
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-mist z-10"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="rolunk" className="py-24 md:py-32 px-6 bg-night">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div
              variants={fadeUp}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={IMG.about}
                alt="Rozsda Romkocsma udvar"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-neon-pink/90 text-void text-sm font-bold">
                Est. 2015
              </div>
            </motion.div>

            <div>
              <motion.p
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.25em] text-neon-cyan font-semibold mb-4"
              >
                A történetünk
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-bold text-cream mb-6 leading-tight"
              >
                Egy elhagyott ház,
                <br />
                <span className="text-gradient">új életre kelt</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="section-line mb-8" />
              <motion.p variants={fadeUp} className="text-mist leading-relaxed mb-6">
                2015-ben egy düledező Huszár utcai házat álmodtunk újjá. Az omladozó
                falak, a kopott vakolat és a rozsdás csövek nem hibák — hanem
                jellegzetességek. Így született a Rozsda.
              </motion.p>
              <motion.p variants={fadeUp} className="text-mist leading-relaxed mb-8">
                Ma Budapest egyik legkülönlegesebb szórakozóhelye vagyunk: három
                szinten, egy hatalmas belső udvarral, helyi művészek alkotásaival a
                falakon és minden este más programmal.
              </motion.p>
              <motion.div variants={fadeUp} className="flex items-center gap-8">
                <div>
                  <p className="font-display text-3xl font-bold text-neon-pink">3</p>
                  <p className="text-sm text-mist">Szint</p>
                </div>
                <div className="w-px h-12 bg-smoke" />
                <div>
                  <p className="font-display text-3xl font-bold text-neon-yellow">12</p>
                  <p className="text-sm text-mist">Csapolt sör</p>
                </div>
                <div className="w-px h-12 bg-smoke" />
                <div>
                  <p className="font-display text-3xl font-bold text-neon-cyan">200+</p>
                  <p className="text-sm text-mist">Program/év</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DRINKS ═══ */}
      <section id="italok" className="py-24 md:py-32 px-6 bg-void grain-overlay">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.25em] text-neon-pink font-semibold mb-4"
            >
              Itallap
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold text-cream mb-4"
            >
              Mit kérsz?
            </motion.h2>
            <motion.div variants={fadeUp} className="section-line mx-auto" />
          </motion.div>

          {/* drink category tabs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-4 mb-12"
          >
            {drinks.map((d, i) => (
              <button
                key={d.category}
                onClick={() => setActiveDrink(i)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                  activeDrink === i
                    ? `bg-${d.color} text-void`
                    : "bg-smoke/50 text-mist hover:bg-smoke"
                }`}
              >
                <d.icon size={18} />
                {d.category}
              </button>
            ))}
          </motion.div>

          {/* drink category image + items */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              key={activeDrink}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={
                  activeDrink === 0
                    ? IMG.beer
                    : activeDrink === 1
                    ? IMG.cocktail
                    : IMG.wine
                }
                alt={drinks[activeDrink].category}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
            </motion.div>

            <motion.div
              key={`items-${activeDrink}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {drinks[activeDrink].items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-dark/80 border border-smoke/30 hover:border-neon-pink/30 transition-colors group"
                >
                  <div>
                    <h4 className="font-display font-bold text-cream group-hover:text-neon-pink transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-mist">{item.desc}</p>
                  </div>
                  <p className="font-display font-bold text-neon-yellow text-lg whitespace-nowrap ml-4">
                    {item.price} Ft
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FOOD ═══ */}
      <section id="etel" className="py-24 md:py-32 px-6 bg-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.25em] text-neon-yellow font-semibold mb-4"
              >
                Kocsmakaják
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-bold text-cream mb-6 leading-tight"
              >
                Amit a sörhöz
                <br />
                <span className="text-gradient">rendelni kell</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="section-line mb-8" />

              <motion.div variants={stagger} className="space-y-3">
                {foods.map((item, i) => (
                  <motion.div
                    key={item.name}
                    variants={fadeUp}
                    custom={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-smoke/30 border border-smoke/20 hover:border-neon-yellow/30 transition-colors group"
                  >
                    <div>
                      <h4 className="font-display font-bold text-cream group-hover:text-neon-yellow transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-mist">{item.desc}</p>
                    </div>
                    <p className="font-display font-bold text-neon-cyan whitespace-nowrap ml-4">
                      {item.price} Ft
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={IMG.food}
                alt="Kocsmakaják"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PARALLAX BREAK ═══ */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src={IMG.parallax}
          alt="Romkocsma hangulat"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-void/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-cream max-w-3xl leading-tight"
          >
            &ldquo;A legjobb történetek mindig egy
            <span className="text-neon-pink"> kocsma</span>ban
            kezdődnek.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="galeria" className="py-24 md:py-32 px-6 bg-night">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.25em] text-neon-cyan font-semibold mb-4"
            >
              Hangulat
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold text-cream mb-4"
            >
              Galéria
            </motion.h2>
            <motion.div variants={fadeUp} className="section-line mx-auto" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3"
          >
            {gallery.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={i}
                className={`group relative rounded-xl overflow-hidden cursor-pointer ${item.span}`}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-void/30 group-hover:bg-void/10 transition-colors duration-500" />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-void/70 backdrop-blur-sm text-xs font-bold text-cream">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ EVENTS ═══ */}
      <section id="programok" className="py-24 md:py-32 px-6 bg-void grain-overlay">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.25em] text-neon-yellow font-semibold mb-4"
            >
              Mi mikor van?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold text-cream mb-4"
            >
              Programjaink
            </motion.h2>
            <motion.div variants={fadeUp} className="section-line mx-auto" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {events.map((e, i) => (
              <motion.div
                key={e.title}
                variants={fadeUp}
                custom={i}
                className="group flex gap-5 p-6 rounded-2xl bg-dark border border-smoke/30 hover:border-neon-pink/30 hover-glow transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-smoke/40 flex items-center justify-center shrink-0 group-hover:bg-neon-pink/20 transition-colors">
                  <e.icon size={24} className="text-neon-pink" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-cream text-lg">{e.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.tagColor} text-void uppercase tracking-wider`}
                    >
                      {e.tag}
                    </span>
                  </div>
                  <p className="text-mist text-sm">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* featured event image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 relative aspect-[21/9] rounded-2xl overflow-hidden"
          >
            <Image
              src={IMG.events}
              alt="Élő zene a Rozsdában"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="font-display text-2xl md:text-3xl font-bold text-cream">
                Minden hétvégén <span className="neon-text-pink">élő zene</span>
              </p>
              <p className="text-mist mt-1">Péntek & Szombat 20:00-tól</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="kapcsolat" className="py-24 md:py-32 px-6 bg-dark relative grain-overlay">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.25em] text-neon-cyan font-semibold mb-4"
            >
              Gyere el!
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold text-cream mb-4"
            >
              Hol találsz meg?
            </motion.h2>
            <motion.div variants={fadeUp} className="section-line mx-auto mb-6" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* info */}
            <div className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-smoke/40 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-neon-pink" />
                </div>
                <div>
                  <p className="font-bold text-cream">Cím</p>
                  <p className="text-mist text-sm">1074 Budapest, Huszár utca 7.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-smoke/40 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-neon-yellow" />
                </div>
                <div>
                  <p className="font-bold text-cream">Telefon</p>
                  <p className="text-mist text-sm">+36 1 234 5678</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-smoke/40 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-neon-cyan" />
                </div>
                <div>
                  <p className="font-bold text-cream">E-mail</p>
                  <p className="text-mist text-sm">hello@rozsda.hu</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-smoke/40 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-neon-green" />
                </div>
                <div>
                  <p className="font-bold text-cream">Nyitvatartás</p>
                  <p className="text-mist text-sm">H-Cs: 16:00 &mdash; 02:00</p>
                  <p className="text-mist text-sm">P-Szo: 16:00 &mdash; 04:00</p>
                  <p className="text-mist text-sm">V: 16:00 &mdash; 00:00</p>
                </div>
              </motion.div>
            </div>

            {/* contact form */}
            <motion.form
              variants={stagger}
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <motion.div variants={fadeUp}>
                <input
                  type="text"
                  placeholder="Neved"
                  className="w-full px-4 py-3 rounded-xl bg-smoke/30 border border-smoke/40 text-cream placeholder-stone focus:outline-none focus:border-neon-pink/60 transition-colors"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <input
                  type="email"
                  placeholder="E-mail címed"
                  className="w-full px-4 py-3 rounded-xl bg-smoke/30 border border-smoke/40 text-cream placeholder-stone focus:outline-none focus:border-neon-pink/60 transition-colors"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <input
                  type="text"
                  placeholder="Mikor jönnél? (dátum, időpont)"
                  className="w-full px-4 py-3 rounded-xl bg-smoke/30 border border-smoke/40 text-cream placeholder-stone focus:outline-none focus:border-neon-pink/60 transition-colors"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <textarea
                  rows={4}
                  placeholder="Üzenet, speciális kérés..."
                  className="w-full px-4 py-3 rounded-xl bg-smoke/30 border border-smoke/40 text-cream placeholder-stone focus:outline-none focus:border-neon-pink/60 transition-colors resize-none"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-neon-pink text-void font-bold text-base hover:bg-neon-pink/80 transition-colors"
                >
                  Asztalfoglalás küldése
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-16 px-6 bg-void border-t border-smoke/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <p className="font-display text-2xl font-bold text-cream mb-2">
                ROZSDA<span className="neon-text-pink text-lg ml-1">*</span>
              </p>
              <p className="text-mist text-sm leading-relaxed">
                Budapest szívében, a VII. kerületben. Romkocsma, ahol minden este más
                történet íródik.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-cream mb-4">Navigáció</h4>
              <div className="space-y-2">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="block text-sm text-mist hover:text-neon-pink transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-cream mb-4">Kövess minket</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-smoke/30 flex items-center justify-center text-mist hover:text-neon-pink hover:bg-smoke/50 transition-colors"
                >
                  <Camera size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-smoke/30 flex items-center justify-center text-mist hover:text-neon-pink hover:bg-smoke/50 transition-colors"
                >
                  <Globe size={18} />
                </a>
              </div>
              <div className="mt-6 text-sm text-mist">
                <p>+36 1 234 5678</p>
                <p>hello@rozsda.hu</p>
              </div>
            </div>
          </div>
          <div className="border-t border-smoke/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone">
              &copy; 2024 Rozsda Romkocsma. Minden jog fenntartva.
            </p>
            <p className="text-xs text-stone flex items-center gap-1">
              Készítette <Heart size={12} className="text-neon-pink" /> Prometheus Digital
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
