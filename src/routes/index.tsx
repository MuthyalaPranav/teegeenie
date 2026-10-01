import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import heroImg from "@/assets/hero-lux.jpg";
import lookBauhaus from "@/assets/look-bauhaus.jpg";
import lookEtching from "@/assets/look-etching.jpg";
import lookStatue from "@/assets/look-statue.jpg";
import { useOpenAuth } from "@/components/SiteLayout";
import { Button, btnClass } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TeeGenie — Bespoke Apparel, Authored by You" },
      { name: "description", content: "Describe an idea and TeeGenie turns it into a print on a heavyweight organic cotton tee, made to order." },
      { property: "og:title", content: "TeeGenie — Bespoke Apparel, Authored by You" },
      { property: "og:description", content: "AI-authored designs on 240 GSM organic cotton. Describe it, refine it, wear it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const chips = [
  "Japanese sumi-e ink crane",
  "Bauhaus constructivist geometry",
  "Vintage monochrome etching",
  "Classical marble statue, tonal",
];

const looks = [
  { img: lookBauhaus, no: "01", style: "Bauhaus", prompt: "Constructivist geometry, chalk white on black" },
  { img: lookEtching, no: "02", style: "Engraving", prompt: "A moth over wild botanicals, Victorian etching" },
  { img: lookStatue, no: "03", style: "Tonal", prompt: "Marble statue in line art, black on charcoal" },
];

const specs = [
  { k: "240 GSM", v: "Heavyweight combed organic cotton with a dense, structured drape." },
  { k: "Pigment DTF", v: "Precision printing that holds fine linework wash after wash." },
  { k: "Made to order", v: "Every piece is produced only when you order it. No overstock." },
  { k: "Tailored fit", v: "Pre-shrunk, dropped shoulder, relaxed body. True to size." },
];

const reviews = [
  { q: "The fabric feels like a designer label. I typed one sentence and got something I'd actually pay boutique prices for.", n: "Ananya R.", r: "Mumbai" },
  { q: "The print detail on the etching tee is unreal. Friends keep asking which brand it is.", n: "Karthik S.", r: "Bengaluru" },
  { q: "Finally a custom tee that doesn't look custom. Quiet, considered, beautifully made.", n: "Meera P.", r: "Delhi" },
];

function Home() {
  const openAuth = useOpenAuth();
  const [prompt, setPrompt] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-12 md:py-20">
          <div className="flex flex-col justify-center md:col-span-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <p className="eyebrow text-muted-foreground">Atelier — Collection 01</p>
            <h1 className="mt-6 text-6xl leading-[0.95] md:text-8xl">
              Bespoke apparel, <span className="italic">authored</span> by you.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Describe an idea in your own words. TeeGenie renders it into an original print on heavyweight organic cotton — made only for you.
            </p>

            <form
              className="mt-10 flex border border-foreground bg-card"
              onSubmit={(e) => { e.preventDefault(); openAuth(); }}
            >
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your design…"
                className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Describe your design"
              />
              <Button type="submit" size="lg" className="shrink-0">Create <ArrowRight className="h-4 w-4" /></Button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setPrompt(c)}
                  className={`border px-3 py-1.5 text-xs transition-colors ${prompt === c ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="relative md:col-span-6">
            <img src={heroImg} width={1024} height={1280} alt="Off-white heavyweight tee with a sumi-e ink crane print" className="h-full w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-foreground/70 to-transparent p-6 text-background">
              <div>
                <p className="eyebrow opacity-80">Prompt</p>
                <p className="mt-1 font-display text-2xl italic">"Japanese sumi-e ink crane"</p>
              </div>
              <p className="eyebrow opacity-80">No. 00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-5 py-4 eyebrow">
          <span>240 GSM organic cotton</span><span>·</span><span>Made to order</span><span>·</span><span>Free shipping over ₹2,999</span><span>·</span><span>30-day returns</span>
        </div>
      </section>

      {/* Lookbook */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-muted-foreground">The Lookbook</p>
            <h2 className="mt-4 text-5xl md:text-7xl">From prompt <span className="italic">to piece.</span></h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Each garment begins as a single sentence. These are a few of our favourites from the community.</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {looks.map((l, i) => (
            <article key={l.no} className={`group ${i === 1 ? "md:mt-16" : ""}`}>
              <div className="overflow-hidden bg-secondary">
                <img src={l.img} width={896} height={1120} loading="lazy" alt={l.prompt} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-5 flex items-baseline justify-between border-b border-border pb-4">
                <span className="eyebrow text-muted-foreground">No. {l.no} — {l.style}</span>
                <button onClick={openAuth} className="eyebrow inline-flex items-center gap-1 hover:underline">Remix <ArrowUpRight className="h-3 w-3" /></button>
              </div>
              <p className="mt-4 font-display text-2xl italic leading-snug">"{l.prompt}"</p>
            </article>
          ))}
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-muted-foreground">Craftsmanship</p>
            <h2 className="mt-4 text-5xl md:text-6xl">Made <span className="italic">slowly,</span> to last.</h2>
            <p className="mt-6 max-w-md text-muted-foreground">Your idea deserves more than a thin promo tee. Every TeeGenie garment is cut from premium cotton and finished by hand.</p>
            <Link to="/about" className={`${btnClass("outline", "lg")} mt-10`}>Our Atelier</Link>
          </div>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 md:col-span-7">
            {specs.map((s) => (
              <div key={s.k} className="bg-background p-8">
                <dt className="font-display text-4xl">{s.k}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-foreground" />)}</div>
          <p className="eyebrow text-muted-foreground">4.9 / 5 from early creators</p>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.n} className="border-t border-foreground pt-8">
              <blockquote className="font-display text-2xl leading-snug">"{r.q}"</blockquote>
              <figcaption className="eyebrow mt-6 text-muted-foreground">{r.n} — {r.r}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <h2 className="text-5xl md:text-7xl">Your first piece <span className="italic">awaits.</span></h2>
          <button onClick={openAuth} className="mt-10 inline-flex items-center gap-2 border border-primary-foreground px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:bg-primary-foreground hover:text-primary">
            Begin Designing <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}
