// Subscribe page — Legacy Studio ongoing plans only

function SubscribePage() {
  const { navigate, addToCart } = React.useContext(AppCtx);
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

  const [selected, setSelected] = React.useState({ 'legacy-anniversary': 1 });
  const selectedItems = legacyPlans.filter(p => selected[p.id] > 0);
  const monthly = selectedItems.reduce((s, p) => s + p.subPrice * (selected[p.id] || 0), 0);

  return (
    <main className="page-fade">
      {/* HERO */}
      <section style={{ background: 'var(--bg-cream)', padding: '64px 0 48px' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <span className="pill gold">Legacy Studio ongoing plans</span>
            <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 76px)', margin: '14px 0 16px' }}>
              Stay close to the memory all year.
            </h1>
            <p className="lede" style={{ marginTop: 0 }}>
              These plans are for families who want ongoing support — gentle reminders, a growing photo archive, and yearly story updates for dogs still making memories.
            </p>
            <div className="row" style={{ marginTop: 20, gap: 18 }}>
              <Stat n="24h" l="first response" />
              <Stat n="$0" l="signup fee" />
              <Stat n="Cancel" l="anytime" />
            </div>
          </div>
          <Placeholder label="yearly keepsake · memorial plans" tone="forest" aspect="1 / 1" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="wrap">
          <SectionHeader eyebrow="How it works" title="Three steps. No rush." />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              ['01', 'Choose a plan', 'Pick the level of ongoing support that fits where you are — an anniversary reminder, a growing archive, or a yearly chapter.'],
              ['02', 'We remember with you', 'On meaningful dates, during your archive window, or at your yearly update, we reach out and do the work.'],
              ['03', 'Cancel anytime', 'No phone calls, no hoops. Pause or cancel from your account in one click. No minimum commitment.'],
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

      {/* PLANS + SUMMARY */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap">
          <SectionHeader eyebrow="Ongoing plans" title="Choose what fits" lede="You can hold more than one plan. Changes apply before the next billing date." />
          <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ display: 'grid', gap: 16 }}>
              {legacyPlans.map(plan => {
                const qty = selected[plan.id] || 0;
                return (
                  <div key={plan.id} className="card" style={{ padding: 22, display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 18, alignItems: 'center' }}>
                    <Placeholder label="" tone={plan.tone} aspect="1 / 1" style={{ borderRadius: 10 }} />
                    <div>
                      <div className="row" style={{ gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                        <h3 className="h-display" style={{ fontSize: 19, margin: 0 }}>{plan.name}</h3>
                        <span className="pill gold">{plan.badge}</span>
                      </div>
                      <p className="small" style={{ margin: '0 0 6px', color: 'var(--ink-2)', lineHeight: 1.5 }}>{plan.short}</p>
                      <strong style={{ fontSize: 14 }}>${plan.subPrice.toFixed(2)}/month</strong>
                    </div>
                    <div className="row" style={{ border: '1px solid var(--line)', borderRadius: 999, padding: 2, background: '#fff', height: 40 }}>
                      <button onClick={() => setSelected({ ...selected, [plan.id]: Math.max(0, qty - 1) })} style={{ width: 32, height: 32, border: 0, borderRadius: 999, background: 'transparent', cursor: 'default' }}>−</button>
                      <span className="mono" style={{ minWidth: 22, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{qty}</span>
                      <button onClick={() => setSelected({ ...selected, [plan.id]: qty + 1 })} style={{ width: 32, height: 32, border: 0, borderRadius: 999, background: 'transparent', cursor: 'default' }}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SUMMARY PANEL */}
            <aside className="card" style={{ padding: 26, position: 'sticky', top: 92 }}>
              <h3 className="h-display" style={{ fontSize: 22, margin: '0 0 6px' }}>Your plans</h3>
              <p className="small" style={{ marginBottom: 16 }}>{selectedItems.length} {selectedItems.length === 1 ? 'plan' : 'plans'} selected</p>
              {selectedItems.length > 0 ? (
                <div style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
                  {selectedItems.map(p => (
                    <div key={p.id} className="row" style={{ justifyContent: 'space-between' }}>
                      <span className="small">{p.name}</span>
                      <span className="small" style={{ fontWeight: 600 }}>${p.subPrice.toFixed(2)}/mo</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="small" style={{ color: 'var(--ink-3)', marginBottom: 14 }}>No plans selected yet.</p>
              )}
              <div className="divider" style={{ margin: '0 0 14px' }} />
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontWeight: 600 }}>Monthly total</span>
                <span style={{ fontWeight: 700, fontSize: 24 }}>${monthly.toFixed(2)}</span>
              </div>
              <button
                disabled={selectedItems.length === 0}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', opacity: selectedItems.length === 0 ? 0.5 : 1 }}
                onClick={() => { selectedItems.forEach(p => addToCart(p, selected[p.id] || 1, true)); navigate('cart'); }}
              >
                Start plan →
              </button>
              <div className="small center" style={{ marginTop: 10 }}>Skip, pause, or cancel anytime.</div>
            </aside>
          </div>
        </div>
      </section>

      {/* ONE-TIME CTA */}
      <section className="section-tight" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap center" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="eyebrow">Not sure yet?</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', margin: '14px 0 16px' }}>
            One-time keepsakes are always available.
          </h2>
          <p className="lede" style={{ margin: '0 auto 24px' }}>
            A memorial book, tribute print, or letter doesn't require a plan. Browse all Legacy Studio services and order when you're ready.
          </p>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('legacy')}>Explore one-time keepsakes →</button>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap" style={{ maxWidth: 800, marginInline: 'auto' }}>
          <SectionHeader eyebrow="Plan FAQ" title="Common questions" align="center" />
          <FAQList items={[
            { q: 'What is the Anniversary Remembrance Plan?', a: 'We track meaningful dates — adoption day, birthday, and the day you said goodbye — and send gentle emails and one printed card each year. Nothing intrusive, nothing salesy. Just a quiet reminder that we remember too.' },
            { q: 'How does the Memory Archive work?', a: 'You can add photos and brief notes to a private vault throughout the year. When you\'re ready for a book, tribute page, or memorial piece, the material is already organized and waiting.' },
            { q: 'Can I have more than one plan?', a: 'Yes. Many families combine the archive with anniversary reminders. You can also add the yearly story update if your dog is still with you and making new memories.' },
            { q: 'How do I cancel?', a: 'One click from your account. We don\'t ask why or try to talk you out of it. We appreciate feedback if you want to share, but it\'s never required.' },
            { q: 'Is there a minimum commitment?', a: 'None. You can cancel after a single month. The anniversary card is mailed on your next meaningful date after signup — if you cancel before then, we\'ll pro-rate a refund.' },
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
