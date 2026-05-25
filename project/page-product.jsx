// Product page — Hero Dog Grooming Wipes (or selected product)

function ProductPage() {
  const { navigate, params, addToCart } = React.useContext(AppCtx);
  const product = (PRODUCTS.concat(UPSELLS)).find(p => p.id === params.id) || PRODUCTS[0];
  const [subscribe, setSubscribe] = React.useState(true);
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState('ingredients');
  const [activeImage, setActiveImage] = React.useState(0);
  const [saved, setSaved] = React.useState(false);
  const [stickyVisible, setStickyVisible] = React.useState(false);
  const buyRef = React.useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting), { rootMargin: '-120px 0px 0px 0px' });
    if (buyRef.current) obs.observe(buyRef.current);
    return () => obs.disconnect();
  }, [product.id]);

  const unitPrice = subscribe ? product.subPrice : product.price;
  const images = [
    { label: 'product hero · ' + product.image, tone: product.tone || 'sage' },
    { label: 'top-down · open canister', tone: 'cream' },
    { label: 'lifestyle · paw + wipe', tone: 'sage' },
    { label: 'ingredient close-up', tone: 'gold' },
  ];

  return (
    <main className="page-fade">
      {/* BREADCRUMB */}
      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 8 }}>
        <div className="small">
          <a onClick={() => navigate('home')} style={{ cursor: 'default' }}>Home</a>
          <span className="muted"> / </span>
          <a onClick={() => navigate('shop')} style={{ cursor: 'default' }}>Shop</a>
          <span className="muted"> / </span>
          <span dangerouslySetInnerHTML={{ __html: product.name }} />
        </div>
      </div>

      {/* MAIN */}
      <section className="section-tight">
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56 }}>
          {/* GALLERY */}
          <div>
            <Placeholder label={images[activeImage].label} tone={images[activeImage].tone} aspect="1 / 1">
              <button
                className={'pin-save' + (saved ? ' saved' : '')}
                onClick={() => setSaved(s => !s)}
                title="Save to Pinterest"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.2 9.3-.1-.8-.2-2 .04-2.86l1.3-5.4s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-1 3.8-.3 1.2.6 2.2 1.7 2.2 2.1 0 3.7-2.2 3.7-5.4 0-2.8-2-4.8-4.9-4.8-3.3 0-5.3 2.5-5.3 5.1 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.3 1.4c0 .2-.2.3-.4.1-1.4-.6-2.2-2.7-2.2-4.3 0-3.5 2.5-6.7 7.3-6.7 3.8 0 6.8 2.7 6.8 6.4 0 3.8-2.4 6.9-5.8 6.9-1.1 0-2.2-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.4 3 1.1.3 2.2.5 3.4.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                {saved ? 'Saved' : 'Save'}
              </button>
            </Placeholder>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 12 }}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{ background: 'transparent', border: 0, padding: 0, cursor: 'default', borderRadius: 10, outline: activeImage === i ? '2px solid var(--forest)' : '1px solid var(--line)', outlineOffset: -1 }}
                >
                  <Placeholder label="" tone={img.tone} aspect="1 / 1" style={{ borderRadius: 9, border: 0 }} />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
              <span className="pill">{product.category}</span>
              {product.badge && <span className="pill gold">{product.badge}</span>}
            </div>
            <h1 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', margin: '12px 0 8px' }} dangerouslySetInnerHTML={{ __html: 'PawApothecary ' + product.name }} />
            <div className="row" style={{ gap: 14, marginBottom: 18 }}>
              <Stars value={product.rating} showNumber count={product.reviews} />
            </div>
            <p className="lede" style={{ marginTop: 0, marginBottom: 24 }}>
              Thick, gentle, natural wipes for everyday dog grooming. Safe for paws, coat, ears, and face. Free from parabens, sulfates, and harsh chemicals.
            </p>

            {/* PRICE / PURCHASE */}
            <div ref={buyRef} className="card" style={{ padding: 20 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, gap: 12 }}>
                <PurchaseOption
                  active={!subscribe}
                  title="One-time"
                  subtitle="Ships once"
                  price={`$${product.price.toFixed(2)}`}
                  onClick={() => setSubscribe(false)}
                />
                <PurchaseOption
                  active={subscribe}
                  title="Subscribe & save 15%"
                  subtitle="Ships monthly · cancel anytime"
                  price={`$${product.subPrice.toFixed(2)}`}
                  badge="BEST VALUE"
                  onClick={() => setSubscribe(true)}
                />
              </div>

              <div className="row" style={{ justifyContent: 'space-between', marginTop: 14, gap: 14 }}>
                <QtyStepper value={qty} onChange={setQty} />
                <button
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1 }}
                  onClick={() => addToCart(product, qty, subscribe)}
                >
                  Add to cart — ${(unitPrice * qty).toFixed(2)}
                </button>
              </div>
              <div className="small" style={{ marginTop: 12, textAlign: 'center' }}>
                Free shipping over $35 · 30-day money-back guarantee
              </div>
            </div>

            {/* KEY BENEFITS */}
            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                'Gentle on sensitive skin',
                'Safe for all breeds & sizes',
                'Biodegradable cloth',
                'Natural ingredients only',
                'Vet-friendly formula',
                '80 wipes per canister',
              ].map(b => (
                <div key={b} className="row" style={{ gap: 10 }}>
                  <CheckLeaf />
                  <span style={{ fontSize: 14 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TABS: INGREDIENTS / HOW TO USE / SAFETY */}
      <section className="section-tight" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap">
          <div className="row" style={{ gap: 4, borderBottom: '1px solid var(--line)', marginBottom: 32 }}>
            {[
              ['ingredients', 'Ingredients'],
              ['how', 'How to use'],
              ['safety', 'Safety & patch test'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  background: 'transparent', border: 0, cursor: 'default',
                  padding: '14px 18px',
                  fontSize: 14, fontWeight: tab === id ? 600 : 500,
                  color: tab === id ? 'var(--forest)' : 'var(--ink-2)',
                  borderBottom: tab === id ? '2px solid var(--forest)' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'ingredients' && <IngredientsTab />}
          {tab === 'how' && <HowToUseTab />}
          {tab === 'safety' && <SafetyTab />}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="wrap">
          <ReviewsSection product={product} />
        </div>
      </section>

      {/* RELATED */}
      <section className="section-tight" style={{ paddingBottom: 80 }}>
        <div className="wrap">
          <SectionHeader eyebrow="You might also like" title="More from the line" />
          <div className="grid-3" className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(p => (
              <ProductCard key={p.id} product={p} onClick={() => navigate('product', { id: p.id })} />
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE THE ROUTINE — UPSELLS */}
      <section className="section-tight" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap">
          <SectionHeader eyebrow="Complete the routine" title="Pairs well with" />
          <UpsellRow title="Often added together" />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap" style={{ maxWidth: 800, marginInline: 'auto' }}>
          <SectionHeader eyebrow="Questions, answered" title="Product FAQ" align="center" />
          <FAQList items={[
            { q: 'How many wipes are in a canister?', a: 'Each canister holds 80 thick, biodegradable wipes — roughly a 4–6 week supply for one dog.' },
            { q: 'Are these safe for puppies?', a: 'Yes. We recommend a small patch test for any dog under 8 weeks. The Puppy Wipes are slightly more dilute and ideal for very young pups.' },
            { q: 'Can I use these on my dog\u2019s face and ears?', a: 'The Grooming Wipes are face-safe. For around the eyes, tear stains, and inside ear flaps, the dedicated Eye & Ear Wipes are gentler.' },
            { q: 'How does the subscription work?', a: 'You\u2019ll save 15% on every order, and you can pause, skip, or cancel from your account at any time. Most owners pick a 4-week cadence.' },
            { q: 'Are these wipes flushable?', a: 'No — even though they\u2019re biodegradable, please dispose of them in a trash bin or compost (90 days to break down).' },
          ]} />
        </div>
      </section>

      {/* STICKY BUY BAR */}
      <div className={'sticky-buy' + (stickyVisible ? ' visible' : '')}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Placeholder label="" tone={product.tone || 'sage'} aspect="1 / 1" style={{ width: 52, height: 52, borderRadius: 8 }} />
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: product.name }} />
            <div className="row" style={{ gap: 8, marginTop: 2 }}>
              <Stars value={product.rating} size={12} />
              <span className="small" style={{ fontSize: 12 }}>${unitPrice.toFixed(2)} {subscribe && '· Subscribe'}</span>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product, qty, subscribe)}
          >
            Add to cart — ${(unitPrice * qty).toFixed(2)}
          </button>
        </div>
      </div>
    </main>
  );
}

function PurchaseOption({ active, title, subtitle, price, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, textAlign: 'left',
        padding: 16, borderRadius: 12,
        background: active ? '#fff' : 'transparent',
        border: active ? '2px solid var(--forest)' : '2px solid var(--line)',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {badge && (
        <span className="pill gold" style={{ position: 'absolute', top: -10, right: 12, fontSize: 9.5 }}>{badge}</span>
      )}
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
          <div className="small" style={{ marginTop: 2 }}>{subtitle}</div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{price}</div>
      </div>
    </button>
  );
}

function QtyStepper({ value, onChange }) {
  return (
    <div className="row" style={{ border: '1px solid var(--line)', borderRadius: 999, padding: 4, background: '#fff', height: 56 }}>
      <button onClick={() => onChange(Math.max(1, value - 1))} style={{ width: 40, height: 40, borderRadius: 999, border: 0, background: 'transparent', cursor: 'default', fontSize: 18 }}>−</button>
      <span className="mono" style={{ minWidth: 28, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <button onClick={() => onChange(value + 1)} style={{ width: 40, height: 40, borderRadius: 999, border: 0, background: 'transparent', cursor: 'default', fontSize: 18 }}>+</button>
    </div>
  );
}

function IngredientsTab() {
  const ingredients = [
    ['Purified Water (Aqua)', 'base'],
    ['Aloe Barbadensis Leaf Juice', 'soothes & hydrates'],
    ['Coconut-Derived Cleansers', 'gentle, sulfate-free'],
    ['Colloidal Oatmeal', 'calms itchy skin'],
    ['Chamomile Extract', 'anti-inflammatory'],
    ['Vitamin E (Tocopherol)', 'coat shine'],
    ['Glycerin (Vegetable)', 'moisture barrier'],
    ['Sodium Benzoate', 'food-grade preservative'],
  ];
  return (
    <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'flex-start' }}>
      <div>
        <h3 className="h-display" style={{ fontSize: 26, margin: '0 0 8px' }}>What\u2019s actually in here.</h3>
        <p style={{ color: 'var(--ink-2)', marginTop: 0 }}>
          We list every ingredient by INCI name, in order of quantity. No proprietary blends. No hidden “fragrance.”
        </p>
        <div style={{ marginTop: 24, display: 'grid', gap: 1, background: 'var(--line)', borderRadius: 10, overflow: 'hidden' }}>
          {ingredients.map(([k, v]) => (
            <div key={k} className="row" style={{ background: '#fff', padding: '12px 14px', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{k}</span>
              <span className="small">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="eyebrow" style={{ margin: '0 0 12px' }}>What you won't find</h4>
        <div style={{ display: 'grid', gap: 8 }}>
          {['Parabens', 'Sulfates (SLS / SLES)', 'Synthetic fragrance', 'Phthalates', 'Alcohol (drying)', 'Artificial dyes', 'Propylene glycol'].map(x => (
            <div key={x} className="row" style={{ gap: 10 }}>
              <span style={{ width: 18, height: 18, borderRadius: 999, background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--earth)' }}>×</span>
              <span style={{ fontSize: 14 }}>{x}</span>
            </div>
          ))}
        </div>
        <div className="card-sage" style={{ marginTop: 28, padding: 20, borderRadius: 12 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Certified</div>
          <p className="small" style={{ margin: 0, color: 'var(--ink-2)' }}>
            Leaping Bunny cruelty-free · pH-balanced for canine skin · biodegradable cloth (90 days) · cGMP manufactured in the USA.
          </p>
        </div>
      </div>
    </div>
  );
}

function HowToUseTab() {
  return (
    <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {[
        ['01', 'Remove one wipe', 'Pull from the dispenser and reseal the lid to keep the rest moist.'],
        ['02', 'Gently wipe', 'Paws, coat, face, or behind ears. One wipe is plenty for most dogs.'],
        ['03', 'Dispose responsibly', 'Trash or compost — never flush. Wipes break down in ~90 days.'],
      ].map(([n, t, d]) => (
        <div key={n} className="card" style={{ padding: 24, background: '#fff' }}>
          <div className="mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.1em' }}>STEP {n}</div>
          <h3 className="h-display" style={{ fontSize: 24, margin: '8px 0 8px' }}>{t}</h3>
          <p className="small" style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>{d}</p>
        </div>
      ))}
    </div>
  );
}

function SafetyTab() {
  return (
    <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56 }}>
      <div>
        <h3 className="h-display" style={{ fontSize: 26, margin: '0 0 12px' }}>Always patch test.</h3>
        <p style={{ color: 'var(--ink-2)', marginTop: 0 }}>
          Every dog is different. Before regular use, wipe a small area on the inside of your dog\u2019s back leg and wait 24 hours. Discontinue if redness or itching occurs.
        </p>
        <ul style={{ paddingLeft: 18, color: 'var(--ink-2)', lineHeight: 1.7 }}>
          <li>For external use on animals only.</li>
          <li>Do not use in the eyes — use Eye &amp; Ear Wipes for that area.</li>
          <li>Keep out of reach of children and pets.</li>
          <li>If irritation persists, consult your veterinarian.</li>
          <li>Results may vary by breed, coat type, and skin sensitivity.</li>
        </ul>
      </div>
      <div className="card-cream" style={{ padding: 24, borderRadius: 12 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>FDA Cosmetic Notice</div>
        <p className="small" style={{ color: 'var(--ink-2)', margin: 0, lineHeight: 1.55 }}>
          This product is intended for cosmetic use on dogs. It is not a drug, has not been evaluated by the FDA, and is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}

function ReviewsSection({ product }) {
  const [reviews, setReviews] = React.useState([
    { id: 1, name: 'Hana K.', dog: 'Suki · Shiba Inu', rating: 5, date: '3 days ago', title: 'Finally something that works.', body: 'My girl has terrible allergies and these wipes are the only thing that doesn\u2019t make her skin flare up. We use them every day after walks.', verified: true },
    { id: 2, name: 'Marcus T.', dog: 'Olive · Mini Aussie', rating: 5, date: '1 week ago', title: 'Genuinely thick.', body: 'I was skeptical of natural wipes \u2014 they\u2019re usually flimsy. These are robust and don\u2019t fall apart on muddy paws.', verified: true },
    { id: 3, name: 'Priya R.', dog: 'Mochi · Frenchie', rating: 4, date: '2 weeks ago', title: 'Smells faintly of chamomile.', body: 'Love that there\u2019s no fake fragrance. Took off a star only because the canister is a bit hard to open one-handed.', verified: true },
    { id: 4, name: 'Tomás L.', dog: 'Bandit · Border Collie', rating: 5, date: '3 weeks ago', title: 'Subscribe and forget.', body: 'I forgot how often I needed wipes until I subscribed. Now they just show up. Smart packaging too.', verified: false },
  ]);
  const [writing, setWriting] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', dog: '', rating: 5, title: '', body: '' });

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const histogram = [5, 4, 3, 2, 1].map(n => ({ n, c: reviews.filter(r => r.rating === n).length }));

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.body) return;
    setReviews([{ ...form, id: Date.now(), date: 'just now', verified: false }, ...reviews]);
    setForm({ name: '', dog: '', rating: 5, title: '', body: '' });
    setWriting(false);
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, marginBottom: 48 }}>
        <div>
          <div className="eyebrow">Reviews · {reviews.length}</div>
          <div className="h-display" style={{ fontSize: 64, lineHeight: 1, margin: '12px 0 6px' }}>{avg.toFixed(1)}</div>
          <Stars value={avg} size={18} />
          <p className="small" style={{ marginTop: 12 }}>Based on {reviews.length} verified reviews.</p>
          <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={() => setWriting(!writing)}>
            {writing ? 'Cancel' : 'Write a review'}
          </button>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {histogram.map(({ n, c }) => (
            <div key={n} className="row" style={{ gap: 12 }}>
              <span className="small mono" style={{ width: 16 }}>{n}★</span>
              <div style={{ flex: 1, height: 8, background: 'var(--line)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${(c / reviews.length) * 100}%`, height: '100%', background: 'var(--gold)' }} />
              </div>
              <span className="small mono" style={{ width: 24, textAlign: 'right' }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {writing && (
        <form onSubmit={submit} className="card" style={{ padding: 24, marginBottom: 32 }}>
          <h3 className="h-display" style={{ fontSize: 22, margin: '0 0 16px' }}>Tell us about {product.name.replace(/&amp;/g, '&')}</h3>
          <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input className="input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Your dog (e.g. Bandit · Border Collie)" value={form.dog} onChange={e => setForm({ ...form, dog: e.target.value })} />
          </div>
          <div className="row" style={{ marginTop: 14, gap: 14 }}>
            <span className="small">Rating</span>
            {[1, 2, 3, 4, 5].map(r => (
              <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })} style={{ background: 'transparent', border: 0, cursor: 'default', padding: 0, color: r <= form.rating ? 'var(--gold)' : 'rgba(0,0,0,.15)', fontSize: 20 }}>★</button>
            ))}
          </div>
          <input className="input" style={{ marginTop: 14 }} placeholder="Review title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea className="textarea" style={{ marginTop: 10 }} placeholder="What did you and your dog think?" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
          <button type="submit" className="btn btn-primary" style={{ marginTop: 14 }}>Submit review</button>
        </form>
      )}

      <div style={{ display: 'grid', gap: 16 }}>
        {reviews.map(r => (
          <article key={r.id} className="card" style={{ padding: 24 }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <div className="row" style={{ gap: 12 }}>
                <Placeholder label="" tone="sage" aspect="1 / 1" round style={{ width: 40, height: 40, border: 0 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{r.name} {r.verified && <span className="pill" style={{ fontSize: 9.5, marginLeft: 6 }}>VERIFIED</span>}</div>
                  <div className="small">{r.dog}</div>
                </div>
              </div>
              <div className="small">{r.date}</div>
            </div>
            <Stars value={r.rating} />
            {r.title && <h4 className="h-display" style={{ fontSize: 18, margin: '10px 0 4px' }}>{r.title}</h4>}
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>{r.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FAQList({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ display: 'grid', gap: 0 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,.08)' }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 0, padding: '20px 0', cursor: 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
            >
              <span style={{ fontWeight: 600, fontSize: 17, color: 'var(--ink)' }}>{item.q}</span>
              <span style={{ fontSize: 22, color: 'var(--forest)', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .2s' }}>+</span>
            </button>
            {isOpen && (
              <p style={{ margin: '0 0 20px', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '70ch' }}>{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { ProductPage, PurchaseOption, QtyStepper, IngredientsTab, HowToUseTab, SafetyTab, ReviewsSection, FAQList });
