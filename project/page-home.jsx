// Home page
function HomePage() {
  const { navigate, tweaks } = React.useContext(AppCtx);
  const heroLayout = tweaks.heroLayout || 'split';
  return (
    <main className="page-fade">
      {/* HERO */}
      <Hero layout={heroLayout} />

      {/* LEGACY SERVICES */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <SectionHeader
            eyebrow="Dog Legacy Studio"
            title="Preserve your dog’s story the way it deserves."
            lede="Every keepsake is made to order, personalized with your dog’s name, photos, and memories. Nothing generic. Nothing off a shelf."
            align="center"
          />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['01', 'Dog Memorial Book', 'A printed, hardbound photo book built from your dog’s best moments. Edited and designed for you.', 'Personalize a book', 'legacy'],
              ['02', 'Tribute Wall Art', 'Museum-quality canvas or fine art print featuring a portrait and tribute text, framed or unframed.', 'Explore art options', 'legacy'],
              ['03', 'A Letter From Your Dog', 'A beautifully written letter, as if from your dog to you — personalized with names, routines, and memories.', 'Create a letter', 'legacy'],
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

      {/* LEGACY FEATURE */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <LegacyBookScene service={LEGACY_SERVICES[0]} compact />
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Made to order</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: 0 }}>
              A keepsake as individual as the dog you’re honoring.
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Every memorial book, print, and letter is personalized from scratch. You share the photos, the names, the memories — we build something worth keeping for decades.
            </p>
            <div className="row" style={{ marginTop: 28, gap: 14, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('legacy')}>Explore all keepsakes</button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('contact')}>Ask a question</button>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap">
          <SectionHeader
            eyebrow="Families who trusted us"
            title="What families are saying"
            align="center"
          />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Hana K.', dog: 'In memory of Suki · Shiba Inu', text: 'The memorial book arrived and I couldn’t stop crying. Every photo was perfectly placed. It felt like someone who actually knew her made it.', rating: 5 },
              { name: 'Marcus T.', dog: 'In memory of Olive · Mini Aussie', text: 'I ordered the tribute print for my partner after we lost Olive. He hung it the same day it arrived. Nothing from a generic pet site would have come close.', rating: 5 },
              { name: 'Priya R.', dog: 'In memory of Mochi · Frenchie', text: '“A Letter From Your Dog” was the most thoughtful gift I have ever received. My sister read it at the kitchen table and we both sobbed. It was exactly right.', rating: 5 },
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
            lede="Thoughtful writing on honoring dogs, preserving memories, and finding comfort after loss."
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
            eyebrow="@pawapothecary"
            title="Stories we’ve been trusted with"
            action={<a className="btn btn-ghost">Follow on Instagram →</a>}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {[
              'dog portrait · golden', 'memorial book open', 'tribute print framed', 'letter close-up',
              'dog in field', 'keepsake flat-lay'
            ].map((l, i) => (
              <Placeholder key={i} label={l} tone={['sage', 'cream', 'gold', 'sage', 'cream', 'sage'][i]} aspect="1 / 1" />
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="section" style={{ background: 'var(--forest)', color: '#fff' }}>
        <div className="wrap center" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,.6)' }}>Stay in touch</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', margin: '14px 0' }}>
            Stories of dogs <span className="h-italic">remembered.</span>
          </h2>
          <p className="lede" style={{ color: 'rgba(255,255,255,.78)', margin: '0 auto 28px' }}>
            Studio updates, new keepsake releases, and stories from families we’ve worked with. Never spam.
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
          <span className="pill cream">Dog Legacy Studio</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(44px, 8vw, 96px)', margin: '24px 0' }}>
            For the dog whose<br />
            <span className="h-italic">story continues.</span>
          </h1>
          <p className="lede" style={{ fontSize: 20, margin: '0 auto 32px', maxWidth: 580 }}>
            Memorial books, tribute art, and personalized letters for families honoring a dog’s life after loss.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('legacy')}>Explore Legacy Studio</button>
            <button className="btn btn-gold btn-lg" onClick={() => navigate('contact')}>Ask a question</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 64 }}>
            <Placeholder label="dog portrait · golden" tone="sage" aspect="4 / 5" />
            <Placeholder label="memorial book open" tone="gold" aspect="4 / 5" />
            <Placeholder label="tribute print framed" tone="sage" aspect="4 / 5" />
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
                <div className="eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Dog Legacy Studio</div>
                <span className="ph-label">dog portrait · golden hour</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 0' }}>
              <div className="eyebrow">Est. 2024 · Hudson Valley, NY</div>
              <h1 className="h-display" style={{ fontSize: 'clamp(48px, 7vw, 88px)', margin: '24px 0' }}>
                A studio for dogs whose <span className="h-italic">stories live on.</span>
              </h1>
              <p className="lede" style={{ fontSize: 19 }}>
                Memorial books, tribute prints, and personalized letters. Made for the moment after goodbye.
              </p>
              <div className="row" style={{ marginTop: 28, gap: 14, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('legacy')}>Explore Legacy Studio</button>
                <button className="btn btn-outline btn-lg" onClick={() => navigate('contact')}>Ask a question</button>
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
          <span className="pill">PawApothecary · Est. 2024</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px, 7.5vw, 92px)', margin: '22px 0 18px' }}>
            For the dog whose<br />
            <span className="h-italic" style={{ color: 'var(--forest)' }}>story continues.</span>
          </h1>
          <p className="lede" style={{ fontSize: 19, maxWidth: 520 }}>
            Dog Legacy Studio creates memorial books, tribute art, and personalized letters for families honoring a dog’s life after loss.
          </p>
          <div className="row" style={{ marginTop: 32, gap: 14, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('legacy')}>Explore Legacy Studio</button>
            <button className="btn btn-gold btn-lg" onClick={() => navigate('contact')}>Ask a question</button>
          </div>
          <div className="row" style={{ marginTop: 36, gap: 28, flexWrap: 'wrap' }}>
            <div>
              <Stars value={4.9} />
              <div className="small" style={{ marginTop: 4 }}>4.9 from 800+ families</div>
            </div>
            <div className="divider" style={{ width: 1, height: 36, background: 'rgba(0,0,0,.1)' }} />
            <div className="small">
              <strong style={{ color: 'var(--ink)', display: 'block', fontWeight: 600 }}>Digital proof</strong>
              within 24 hours of your order
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Placeholder label="dog portrait · golden hour" tone="forest" aspect="4 / 5" />
          <div style={{ position: 'absolute', bottom: -28, left: -28, width: 220 }}>
            <Placeholder label="memorial book" tone="gold" aspect="3 / 4" />
          </div>
          <div style={{ position: 'absolute', top: 24, right: 8, background: '#fff', borderRadius: 12, padding: 14, boxShadow: '0 8px 24px rgba(0,0,0,.08)', width: 200 }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Made to order</div>
            <div style={{ fontSize: 13, lineHeight: 1.45 }}>"Nothing I found anywhere else came close." <span className="muted">— Hana K.</span></div>
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
        {done ? 'You’re in ✓' : 'Subscribe'}
      </button>
    </form>
  );
}

const BLOG_POSTS = [
  { slug: 'how-to-honor-your-dog', title: 'How to honor a dog who changed your life', excerpt: 'Practical and meaningful ways to preserve a dog’s memory after loss — from a studio that has helped hundreds of families.', category: 'Remembrance', date: 'May 12, 2026', read: 6, image: 'dog portrait · golden' },
  { slug: 'memorial-book-guide', title: 'What makes a memorial book worth keeping', excerpt: 'The difference between a photo album and a true tribute — and why the details matter more than you think.', category: 'Keepsakes', date: 'May 04, 2026', read: 4, image: 'memorial book open' },
  { slug: 'writing-about-your-dog', title: 'How to write about a dog you loved', excerpt: 'A gentle guide for finding the words when grief makes them hard to find.', category: 'Grief & Memory', date: 'Apr 22, 2026', read: 9, image: 'writing journal' },
  { slug: 'tribute-art-ideas', title: 'Tribute art ideas for the dog you miss most', excerpt: 'From framed portraits to wall installations — the options, the materials, and what to consider.', category: 'Keepsakes', date: 'Apr 15, 2026', read: 5, image: 'tribute print framed' },
  { slug: 'gifts-for-grieving-dog-owners', title: 'Meaningful gifts for someone who lost a dog', excerpt: 'A curated list from people who have been there — what helped, what didn’t, and why a letter changes everything.', category: 'Remembrance', date: 'Apr 02, 2026', read: 7, image: 'gift box' },
  { slug: 'legacy-studio-process', title: 'How Legacy Studio builds your keepsake', excerpt: 'A behind-the-scenes look at our design and production process, from your photos to your front door.', category: 'Behind the Studio', date: 'Mar 24, 2026', read: 8, image: 'studio desk' },
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
