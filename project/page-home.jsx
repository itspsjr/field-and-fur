// Home page
function HomePage() {
  const { navigate, tweaks } = React.useContext(AppCtx);
  const heroLayout = tweaks.heroLayout || 'split';
  return (
    <main className="page-fade">
      {/* HERO */}
      <Hero layout={heroLayout} />

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* DOG CARE SYSTEM */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <SectionHeader
            eyebrow="Field & Fur collections"
            title="Dog grooming and dog memorials. Different needs, same standard."
            lede="Field & Fur is focused on dogs: everyday grooming with wipes and dental water, plus Legacy Studio memorial services when a dog’s life needs to be honored."
            align="center"
          />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['01', 'Dog Grooming Wipes', 'Clean paws, coat, face, and post-walk mess before irritation starts.', 'Shop wipes', 'product'],
              ['02', 'Dental Water Additive', 'A simple daily bowl additive for fresher breath support between brushing.', 'Shop dental care', 'shop'],
              ['03', 'Dog Legacy Studio', 'A separate memorial service for families ready to preserve a dog’s story after loss.', 'Explore keepsakes', 'legacy'],
            ].map(([n, title, text, cta, route]) => (
              <article key={title} className="card" style={{ padding: 26 }}>
                <span className="pill gold">{n}</span>
                <h3 className="h-display" style={{ fontSize: 28, margin: '20px 0 10px' }}>{title}</h3>
                <p className="small" style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65 }}>{text}</p>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => navigate(route)}>{cta} →</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CARE SYSTEM */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <LegacyBookScene service={LEGACY_SERVICES[0]} compact />
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Separate collections</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: 0 }}>
              Daily dog grooming. Dog memorials when the time comes.
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Field &amp; Fur does not treat memorial work like an everyday refill. Dog wipes and dental water live in daily grooming; Legacy Studio stays separate for remembrance.
            </p>
            <div className="row" style={{ marginTop: 28, gap: 14, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('shop')}>Shop dog care</button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('legacy')}>Explore Legacy Studio</button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="section">
        <div className="wrap">
          <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
            <div className="card-sage" style={{ borderRadius: 'var(--radius)', padding: 32, position: 'relative' }}>
              <span className="pill" style={{ position: 'absolute', top: 24, left: 24, background: 'var(--gold)', color: '#1f1605' }}>★ Bestseller</span>
              <Placeholder label="hero wipes canister · 80 ct" tone="sage" aspect="4 / 5" style={{ background: 'transparent', border: 0 }} />
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Hero Product · 80-count canister</div>
              <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: 0 }}>
                Start with the everyday dog-care routine.
              </h2>
              <p className="lede" style={{ marginTop: 18 }}>
                Thick, gentle wipes handle the daily mess. Dental water additive supports breath and plaque between brushing. Legacy Studio stays separate for remembrance when a dog’s story needs to be preserved.
              </p>
              <div className="row" style={{ marginTop: 28, gap: 14, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('product')}>Shop wipes — $12</button>
                <button className="btn btn-outline btn-lg" onClick={() => navigate('subscribe')}>Subscribe &amp; save 15%</button>
              </div>
              <div className="row" style={{ marginTop: 24, gap: 18 }}>
                <Stars value={4.9} showNumber count={2412} />
                <span className="small">· Free shipping over $35</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NATURAL */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Why natural</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: 0 }}>
              Skin is skin. <span className="h-italic">Even theirs.</span>
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              A dog's skin pH is more alkaline than ours, and their nose is closer to everything. We formulate every wipe like we're going to use it on our own family — because we are.
            </p>
            <div style={{ marginTop: 28, display: 'grid', gap: 14 }}>
              {[
                ['Coconut-derived cleansers', 'instead of sulfates'],
                ['Oat &amp; chamomile', 'to calm reactive skin'],
                ['Aloe &amp; vitamin E', 'for coat shine'],
                ['Biodegradable cloth', 'composts in 90 days'],
              ].map(([k, v]) => (
                <div key={k} className="row" style={{ gap: 12 }}>
                  <CheckLeaf />
                  <span><strong dangerouslySetInnerHTML={{ __html: k }} /> <span className="muted">— {v}</span></span>
                </div>
              ))}
            </div>
            <button className="btn btn-outline" style={{ marginTop: 28 }} onClick={() => navigate('about')}>Read our ingredient promise →</button>
          </div>
          <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Placeholder label="ingredient close-up" tone="sage" aspect="3 / 4" />
            <Placeholder label="dog portrait · golden retriever" tone="gold" aspect="3 / 4" style={{ marginTop: 32 }} />
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section">
        <div className="wrap">
          <SectionHeader
            eyebrow="The line"
            title="Shop by collection"
            lede="Choose everyday dog grooming or Legacy Studio based on what you need today. They share the Field & Fur standard, but they do not have to be bought together."
            action={<button className="btn btn-ghost" onClick={() => navigate('shop')}>Shop all →</button>}
          />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PRODUCTS.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => navigate('product', { id: p.id })} />
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap">
          <SectionHeader
            eyebrow="2,400+ happy dog owners"
            title="What the pack is saying"
            align="center"
          />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Hana K.', dog: 'Suki · Shiba Inu', text: 'My girl has terrible allergies and these wipes are the only thing that doesn\u2019t make her skin flare up. We use them every day after walks.', rating: 5 },
              { name: 'Marcus T.', dog: 'Olive · Mini Aussie', text: 'I was skeptical of \u201cnatural\u201d wipes \u2014 they\u2019re usually flimsy. These are genuinely thick and don\u2019t fall apart on muddy paws.', rating: 5 },
              { name: 'Priya R.', dog: 'Mochi · Frenchie', text: 'Vet recommended a gentler product for Mochi\u2019s wrinkles. The Eye & Ear ones cleared up her tear stains within a week.', rating: 5 },
            ].map(r => (
              <blockquote key={r.name} className="card" style={{ margin: 0, padding: 26, background: '#fff' }}>
                <Stars value={r.rating} />
                <p className="h-display" style={{ fontSize: 20, margin: '14px 0 18px', lineHeight: 1.35 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="row" style={{ gap: 12 }}>
                  <Placeholder label="" tone="sage" aspect="1 / 1" round style={{ width: 36, height: 36, border: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                    <div className="small">{r.dog}</div>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section">
        <div className="wrap">
          <SectionHeader
            eyebrow="The Field Journal"
            title="From the journal"
            lede="Honest writing on dog grooming, dog care, ingredients, and what we're learning from groomers and vets."
            action={<button className="btn btn-ghost" onClick={() => navigate('blog')}>All posts →</button>}
          />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {BLOG_POSTS.slice(0, 3).map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="section-tight">
        <div className="wrap">
          <SectionHeader
            eyebrow="@fieldandfur"
            title="From the field"
            action={<a className="btn btn-ghost">Follow on Instagram →</a>}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {[
              'golden mid-shake', 'paws in moss', 'puppy nap', 'wipe close-up',
              'border collie zoom', 'product flat-lay'
            ].map((l, i) => (
              <Placeholder key={i} label={l} tone={['sage', 'cream', 'gold', 'sage', 'cream', 'sage'][i]} aspect="1 / 1" />
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="section" style={{ background: 'var(--forest)', color: '#fff' }}>
        <div className="wrap center" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,.6)' }}>Join the pack</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', margin: '14px 0' }}>
            Get 10% off your <span className="h-italic">first order.</span>
          </h2>
          <p className="lede" style={{ color: 'rgba(255,255,255,.78)', margin: '0 auto 28px' }}>
            Plus dog-grooming tips, dog-care drops, and the occasional dog photo. No spam, ever.
          </p>
          <EmailCapture variant="dark" />
        </div>
      </section>
    </main>
  );
}

function Hero({ layout = 'split' }) {
  const { navigate } = React.useContext(AppCtx);

  if (layout === 'centered') {
    return (
      <section style={{ background: 'var(--bg-cream)', padding: '96px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap center" style={{ maxWidth: 880, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="pill cream">New formula · 2026</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(44px, 8vw, 96px)', margin: '24px 0' }}>
            Clean ingredients.<br />
            <span className="h-italic">Happy dogs.</span>
          </h1>
          <p className="lede" style={{ fontSize: 20, margin: '0 auto 32px', maxWidth: 580 }}>
            Natural grooming wipes crafted for dogs who deserve clean ingredients and gentle care.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('shop')}>Shop wipes</button>
            <button className="btn btn-gold btn-lg" onClick={() => navigate('subscribe')}>Subscribe &amp; save 15%</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 64 }}>
            <Placeholder label="dog 01 · field run" tone="sage" aspect="4 / 5" />
            <Placeholder label="product hero · 80ct" tone="gold" aspect="4 / 5" />
            <Placeholder label="dog 02 · paw close-up" tone="sage" aspect="4 / 5" />
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'editorial') {
    return (
      <section style={{ background: 'var(--bg)', padding: '64px 0 80px' }}>
        <div className="wrap">
          <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' }}>
            <div className="ph forest" style={{ aspectRatio: '4/5', display: 'flex', alignItems: 'flex-end', padding: 36, color: '#fff' }}>
              <div>
                <div className="eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Volume 01 · Field Notes</div>
                <span className="ph-label">happy dog · golden hour</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 0' }}>
              <div className="eyebrow">Est. 2024 · Hudson Valley, NY</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px, 7vw, 88px)', margin: '24px 0' }}>
                Better daily care for <span className="h-italic">your dog.</span>
              </h1>
              <p className="lede" style={{ fontSize: 19 }}>
                Dog wipes and dental water for everyday grooming. Legacy Studio only when remembrance is the need.
              </p>
              <div className="row" style={{ marginTop: 28, gap: 14, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('shop')}>Shop wipes</button>
                <button className="btn btn-outline btn-lg" onClick={() => navigate('subscribe')}>Subscribe &amp; save 15%</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // default: split
  return (
    <section style={{ background: 'var(--bg-cream)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center', minHeight: 'min(720px, 80vh)', padding: '64px 0' }}>
        <div>
          <span className="pill">Field &amp; Fur Co. · Est. 2024</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px, 7.5vw, 92px)', margin: '22px 0 18px' }}>
            Clean ingredients.<br />
            <span className="h-italic" style={{ color: 'var(--forest)' }}>Happy dogs.</span>
          </h1>
          <p className="lede" style={{ fontSize: 19, maxWidth: 520 }}>
            Field &amp; Fur is built around dog grooming and dog memorials: wipes and dental water for everyday care, and Legacy Studio for honoring a dog after loss.
          </p>
          <div className="row" style={{ marginTop: 32, gap: 14, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('shop')}>Shop wipes</button>
            <button className="btn btn-gold btn-lg" onClick={() => navigate('subscribe')}>Subscribe &amp; save 15%</button>
          </div>
          <div className="row" style={{ marginTop: 36, gap: 28, flexWrap: 'wrap' }}>
            <div>
              <Stars value={4.9} />
              <div className="small" style={{ marginTop: 4 }}>4.9 from 2,412 reviews</div>
            </div>
            <div className="divider" style={{ width: 1, height: 36, background: 'rgba(0,0,0,.1)' }} />
            <div className="small">
              <strong style={{ color: 'var(--ink)', display: 'block', fontWeight: 600 }}>Vet-developed</strong>
              with groomers in the Hudson Valley
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Placeholder label="happy dog · field shot" tone="forest" aspect="4 / 5" />
          <div style={{ position: 'absolute', bottom: -28, left: -28, width: 220 }}>
            <Placeholder label="product · 80 ct" tone="gold" aspect="3 / 4" />
          </div>
          <div style={{ position: 'absolute', top: 24, right: 8, background: '#fff', borderRadius: 12, padding: 14, boxShadow: '0 8px 24px rgba(0,0,0,.08)', width: 200 }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Vet approved</div>
            <div style={{ fontSize: 13, lineHeight: 1.45 }}>“Gentle enough for my own dachshund.” <span className="muted">— Dr. Lin, DVM</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailCapture({ variant = 'light' }) {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const dark = variant === 'dark';
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setDone(true); }}
      style={{ display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto' }}
    >
      <input
        className="input"
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={dark ? { background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', color: '#fff' } : {}}
      />
      <button type="submit" className="btn btn-gold btn-lg" style={{ height: 48 }}>
        {done ? 'You\u2019re in ✓' : 'Get 10% off'}
      </button>
    </form>
  );
}

const BLOG_POSTS = [
  { slug: 'how-often-wipe-dog', title: 'How often should you wipe your dog?', excerpt: 'A vet-backed guide to between-bath grooming for every coat type.', category: 'Grooming Tips', date: 'May 12, 2026', read: 6, image: 'dog in towel' },
  { slug: 'natural-wipes-5-reasons', title: '5 reasons to switch to natural dog wipes', excerpt: 'Why the wipes most owners pick up at the dog-care aisle are doing more harm than good.', category: 'Natural Ingredients', date: 'May 04, 2026', read: 4, image: 'wipes flat-lay' },
  { slug: 'chemicals-truth', title: 'The truth about chemicals in dog grooming products', excerpt: 'We read 142 ingredient labels so you don\u2019t have to. Here\u2019s what we found.', category: 'Natural Ingredients', date: 'Apr 22, 2026', read: 9, image: 'lab samples' },
  { slug: 'paw-care-101', title: 'Paw care 101 — protecting your dog between baths', excerpt: 'Mud, salt, hot pavement: the four-step routine that keeps pads soft and healthy.', category: 'Dog Health', date: 'Apr 15, 2026', read: 5, image: 'paw pads close-up' },
  { slug: 'ingredients-to-avoid', title: 'What ingredients to avoid in dog grooming products', excerpt: 'A printable cheat-sheet for your next dog-care run.', category: 'Natural Ingredients', date: 'Apr 02, 2026', read: 7, image: 'cheat sheet card' },
  { slug: 'natural-routine', title: 'How to build a natural grooming routine', excerpt: 'A simple weekly schedule from a Hudson Valley groomer of 22 years.', category: 'Grooming Tips', date: 'Mar 24, 2026', read: 8, image: 'grooming station' },
];

function BlogCard({ post }) {
  const { navigate } = React.useContext(AppCtx);
  return (
    <article className="card" onClick={() => navigate('blogpost', { slug: post.slug })} style={{ cursor: 'default', display: 'flex', flexDirection: 'column' }}>
      <Placeholder label={post.image} tone="sage" aspect="3 / 2" style={{ borderRadius: 0, border: 0, borderBottom: '1px solid var(--line)' }} />
      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="eyebrow">{post.category}</span>
          <span className="small">{post.read} min read</span>
        </div>
        <h3 className="h-display" style={{ fontSize: 22, margin: 0, lineHeight: 1.2 }}>{post.title}</h3>
        <p className="small" style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>{post.excerpt}</p>
        <div className="small" style={{ marginTop: 'auto', paddingTop: 8 }}>{post.date}</div>
      </div>
    </article>
  );
}

Object.assign(window, { HomePage, Hero, EmailCapture, BLOG_POSTS, BlogCard });
