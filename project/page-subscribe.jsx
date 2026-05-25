// Subscribe & Save / Bundle builder page

function SubscribePage() {
  const { navigate, addToCart } = React.useContext(AppCtx);
  const subbable = PRODUCTS.concat(UPSELLS).filter(p => p.id !== 'bundle');
  const legacyPlans = [
    {
      id: 'legacy-anniversary',
      name: 'Anniversary Remembrance Plan',
      tagline: 'Gentle reminders and a yearly printed card',
      price: 9,
      subPrice: 9,
      category: 'Legacy Studio',
      size: 'all',
      skin: 'all',
      rating: 4.94,
      reviews: 2847,
      image: 'anniversary reminders · memorial card',
      tone: 'cream',
      badge: 'Legacy',
      short: 'We remember adoption days, birthdays, and goodbye dates with gentle emails and one mailed card each year.',
    },
    {
      id: 'legacy-photo-archive',
      name: 'Memory Archive Care',
      tagline: 'Monthly photo uploads organized into a private tribute vault',
      price: 12,
      subPrice: 12,
      category: 'Legacy Studio',
      size: 'all',
      skin: 'all',
      rating: 4.9,
      reviews: 941,
      image: 'private photo archive · tribute vault',
      tone: 'sage',
      badge: 'Digital',
      short: 'Add photos and small notes all year so a future book, tribute page, or memorial piece is already gathered.',
    },
    {
      id: 'legacy-yearly-book',
      name: 'Yearly Dog Story Update',
      tagline: 'A fresh chapter for dogs still making memories',
      price: 19,
      subPrice: 19,
      category: 'Legacy Studio',
      size: 'all',
      skin: 'all',
      rating: 4.92,
      reviews: 624,
      image: 'yearly life story chapter · printed update',
      tone: 'forest',
      badge: 'Keepsake',
      short: 'Each year, we turn new photos and favorite moments into a small chapter you can print or save.',
    },
  ];
  const [selected, setSelected] = React.useState({ 'wipes-hero': 1, 'paw-wipes': 1, 'dental-water': 1 });
  const [legacySelected, setLegacySelected] = React.useState({ 'legacy-anniversary': 1 });
  const [frequency, setFrequency] = React.useState(4);

  const items = Object.entries(selected).filter(([, q]) => q > 0).map(([id, qty]) => ({ ...PRODUCTS.concat(UPSELLS).find(p => p.id === id), qty }));
  const legacyItems = Object.entries(legacySelected).filter(([, q]) => q > 0).map(([id, qty]) => ({ ...legacyPlans.find(p => p.id === id), qty }));
  const allItems = items.concat(legacyItems);
  const monthlyRetail = allItems.reduce((s, p) => s + p.price * p.qty, 0);
  const monthlySub = allItems.reduce((s, p) => s + p.subPrice * p.qty, 0);
  const savings = monthlyRetail - monthlySub;

  return (
    <main className="page-fade">
      {/* HERO */}
      <section style={{ background: 'var(--bg-cream)', padding: '64px 0 48px' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <span className="pill gold">★ Subscribe &amp; Save 15%</span>
            <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 76px)', margin: '14px 0 16px' }}>
              Subscribe to the products you actually use.
            </h1>
            <p className="lede" style={{ marginTop: 0 }}>
              Set a cadence for everyday dog grooming items like wipes and dental water. Legacy Studio stays optional and separate because memorial work is not a routine refill.
            </p>
            <div className="row" style={{ marginTop: 20, gap: 18 }}>
              <Stat n="15%" l="off every order" />
              <Stat n="$0" l="signup fee" />
              <Stat n="2,400+" l="active subscribers" />
            </div>
          </div>
          <Placeholder label="four canisters · field kit" tone="forest" aspect="1 / 1" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="wrap">
          <SectionHeader eyebrow="How it works" title="Four steps. Two minutes." />
          <div className="grid-4-md" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              ['01', 'Choose dog wipes', 'Pick the wipe formats your dog uses after walks, meals, and muddy days.'],
              ['02', 'Add dental water', 'Keep the breath-support product arriving before the bottle runs out.'],
              ['03', 'Save 15% every order', 'Subscriber price kicks in immediately. Free shipping over $35.'],
              ['04', 'Cancel anytime', 'No phone calls, no hoops. Pause from your account in one click.'],
            ].map(([n, t, d]) => (
              <div key={n} className="card" style={{ padding: 22 }}>
                <div className="h-display" style={{ fontSize: 36, color: 'var(--gold)', lineHeight: 1, marginBottom: 8 }}>{n}</div>
                <h3 className="h-display" style={{ fontSize: 20, margin: '0 0 8px' }}>{t}</h3>
                <p className="small" style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEGACY STUDIO PLANS */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap grid-split subscribe-legacy">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Dog Legacy Studio add-ons</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: 0 }}>
              Legacy Studio is not a normal subscription.
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              These optional plans are for reminders, private archives, and yearly story updates. They are presented separately from wipes and dental water because remembrance needs a different tone.
            </p>
            <button className="btn btn-outline" style={{ marginTop: 22 }} onClick={() => navigate('legacy')}>Explore one-time keepsakes →</button>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {legacyPlans.map(plan => {
              const qty = legacySelected[plan.id] || 0;
              return (
                <div key={plan.id} className="card subscribe-legacy-card">
                  <Placeholder label="" tone={plan.tone} aspect="1 / 1" style={{ borderRadius: 10 }} />
                  <div>
                    <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
                      <h3 className="h-display" style={{ fontSize: 20, margin: 0 }}>{plan.name}</h3>
                      <span className="pill gold">{plan.badge}</span>
                    </div>
                    <p className="small" style={{ margin: '6px 0 8px', color: 'var(--ink-2)' }}>{plan.short}</p>
                    <div className="small">
                      <strong>${plan.subPrice.toFixed(2)}/month</strong>
                      <span className="muted"> · added to your subscription</span>
                    </div>
                  </div>
                  <div className="row" style={{ border: '1px solid var(--line)', borderRadius: 999, padding: 2, background: '#fff', height: 40 }}>
                    <button onClick={() => setLegacySelected({ ...legacySelected, [plan.id]: Math.max(0, qty - 1) })} style={{ width: 32, height: 32, border: 0, borderRadius: 999, background: 'transparent', cursor: 'default' }}>−</button>
                    <span className="mono" style={{ minWidth: 22, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{qty}</span>
                    <button onClick={() => setLegacySelected({ ...legacySelected, [plan.id]: qty + 1 })} style={{ width: 32, height: 32, border: 0, borderRadius: 999, background: 'transparent', cursor: 'default' }}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUILDER */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap">
          <SectionHeader eyebrow="Bundle builder" title="Build your monthly box" lede="Add what you'll use. The math updates in real time." />
          <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ display: 'grid', gap: 12 }}>
              {subbable.map(p => {
                const qty = selected[p.id] || 0;
                return (
                  <div key={p.id} className="card" style={{ padding: 18, display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16, alignItems: 'center' }}>
                    <Placeholder label="" tone={p.tone} aspect="1 / 1" style={{ borderRadius: 8 }} />
                    <div>
                      <h3 className="h-display" style={{ fontSize: 19, margin: 0 }} dangerouslySetInnerHTML={{ __html: p.name }} />
                      <div className="small" style={{ marginTop: 4 }}>
                        <span style={{ textDecoration: 'line-through', color: 'var(--ink-3)' }}>${p.price.toFixed(2)}</span>
                        <span style={{ marginLeft: 6, color: 'var(--forest)', fontWeight: 600 }}>${p.subPrice.toFixed(2)} subscribed</span>
                      </div>
                    </div>
                    <div className="row" style={{ border: '1px solid var(--line)', borderRadius: 999, padding: 2, background: '#fff', height: 40 }}>
                      <button onClick={() => setSelected({ ...selected, [p.id]: Math.max(0, qty - 1) })} style={{ width: 32, height: 32, border: 0, borderRadius: 999, background: 'transparent', cursor: 'default' }}>−</button>
                      <span className="mono" style={{ minWidth: 22, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{qty}</span>
                      <button onClick={() => setSelected({ ...selected, [p.id]: qty + 1 })} style={{ width: 32, height: 32, border: 0, borderRadius: 999, background: 'transparent', cursor: 'default' }}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SAVINGS PANEL */}
            <aside className="card" style={{ padding: 26, position: 'sticky', top: 92 }}>
              <h3 className="h-display" style={{ fontSize: 22, margin: '0 0 6px' }}>Your box</h3>
              <p className="small" style={{ marginBottom: 16 }}>{allItems.length} {allItems.length === 1 ? 'item' : 'items'} · ships every {frequency} weeks</p>

              <label className="label">Frequency</label>
              <div className="row" style={{ gap: 6, marginBottom: 16 }}>
                {[4, 6, 8].map(w => (
                  <button key={w} onClick={() => setFrequency(w)} style={{
                    flex: 1, padding: '10px 0', borderRadius: 10,
                    background: frequency === w ? 'var(--forest)' : '#fff',
                    color: frequency === w ? '#fff' : 'var(--ink-2)',
                    border: frequency === w ? '1px solid var(--forest)' : '1px solid var(--line)',
                    fontSize: 14, fontWeight: frequency === w ? 600 : 500,
                    cursor: 'default',
                  }}>{w} wk</button>
                ))}
              </div>

              {legacyItems.length > 0 && (
                <div className="card-sage" style={{ padding: 12, borderRadius: 8, marginBottom: 14, fontSize: 13 }}>
                  <strong>Legacy Studio add-ons included:</strong>
                  <div style={{ marginTop: 6, display: 'grid', gap: 4 }}>
                    {legacyItems.map(item => (
                      <span key={item.id}>{item.qty}× {item.name}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="divider" />
              <div className="col" style={{ gap: 6, marginTop: 14 }}>
                <Line label="Retail price" value={`$${monthlyRetail.toFixed(2)}`} />
                <Line label="Subscriber discount (15%)" value={`−$${savings.toFixed(2)}`} />
                <Line label="Shipping" value={monthlySub >= 35 ? 'Free' : '$5.95'} />
              </div>
              <div className="divider" style={{ margin: '14px 0' }} />
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>You pay</span>
                <span style={{ fontWeight: 700, fontSize: 24 }}>${(monthlySub + (monthlySub >= 35 ? 0 : 5.95)).toFixed(2)}</span>
              </div>
              <div className="card-sage" style={{ padding: 12, borderRadius: 8, marginTop: 14, fontSize: 13 }}>
                You save <strong>${savings.toFixed(2)}/order</strong> · <strong>${(savings * (52 / frequency)).toFixed(0)}/year</strong>
              </div>
              <button
                disabled={allItems.length === 0}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: 14, opacity: allItems.length === 0 ? 0.5 : 1 }}
                onClick={() => { allItems.forEach(it => addToCart(it, it.qty, true)); navigate('cart'); }}
              >
                Start subscription →
              </button>
              <div className="small center" style={{ marginTop: 10 }}>Skip, pause, or cancel anytime.</div>
            </aside>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section-tight" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="row" style={{ justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }}>
            {[
              ['Free shipping over $35', 'orders ship in recycled mailers'],
              ['Cancel anytime', 'no calls, no scripts, one click'],
              ['30-day money-back', 'don\u2019t love it? we\u2019ll refund you'],
              ['Vet-developed', 'reviewed by Dr. Hana Lin, DVM'],
            ].map(([t, d]) => (
              <div key={t} style={{ textAlign: 'center', maxWidth: 200 }}>
                <CheckLeaf />
                <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8 }}>{t}</div>
                <div className="small" style={{ marginTop: 2 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap" style={{ maxWidth: 800, marginInline: 'auto' }}>
          <SectionHeader eyebrow="Subscription FAQ" title="Common questions" align="center" />
          <FAQList items={[
            { q: 'Can I change my products mid-subscription?', a: 'Yes — swap, add, or remove products anytime from your account dashboard. Changes apply to your next shipment.' },
            { q: 'What if 4 weeks is too often?', a: 'Set your cadence to 6 or 8 weeks. You can also skip any shipment from your account.' },
            { q: 'How do I cancel?', a: 'One click from your account. We don\u2019t ask why or try to talk you out of it. We do appreciate feedback if you want to share.' },
            { q: 'Is there a minimum commitment?', a: 'None. You can cancel after a single shipment and keep the 15% discount on that order.' },
            { q: 'When am I charged?', a: 'You\u2019re charged the day each shipment processes. We\u2019ll send an email a few days before so there are no surprises.' },
          ]} />
        </div>
      </section>
    </main>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="h-display" style={{ fontSize: 30, lineHeight: 1, color: 'var(--forest)' }}>{n}</div>
      <div className="small" style={{ marginTop: 4 }}>{l}</div>
    </div>
  );
}

Object.assign(window, { SubscribePage });
