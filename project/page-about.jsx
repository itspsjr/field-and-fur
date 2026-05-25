// About page

function AboutPage() {
  const { navigate } = React.useContext(AppCtx);
  return (
    <main className="page-fade">
      {/* HERO */}
      <section style={{ background: 'var(--bg-cream)', padding: '80px 0' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <span className="pill">Our story · est. 2024</span>
            <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 76px)', margin: '20px 0 16px' }}>
              We started Field &amp; Fur because <span className="h-italic">we couldn't pronounce</span> our last brand of wipes.
            </h1>
            <p className="lede">
              In 2023, our retriever Bandit started losing fur in patches. The vet pointed to a wipe we'd been using daily. We read the label. Then we read 142 more.
            </p>
          </div>
          <Placeholder label="founders + bandit · porch" tone="forest" aspect="4 / 5" />
        </div>
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="wrap" style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow">Our mission</div>
          <p className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '20px 0 0', lineHeight: 1.2 }}>
            To make grooming products as <span className="h-italic">honest</span> as the dogs we make them for — clean, gentle, and made with ingredients we'd happily say out loud.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }}>
          <Placeholder label="formulation lab · upstate ny" tone="sage" aspect="4 / 5" />
          <div>
            <div className="eyebrow">Ingredient philosophy</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 16px' }}>
              We start with a list of <span className="h-italic">no's.</span>
            </h2>
            <p className="lede" style={{ marginTop: 0 }}>
              Most grooming products start with a hero ingredient and a marketing story. We start with the seven ingredients we refuse to use, then build the formula around what's left.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 24 }}>
              {['No parabens', 'No sulfates', 'No phthalates', 'No synthetic fragrance', 'No drying alcohol', 'No artificial dyes', 'No propylene glycol', 'No mystery “fragrance”'].map(x => (
                <div key={x} className="row" style={{ gap: 8, padding: '6px 0' }}>
                  <span style={{ color: 'var(--earth)' }}>×</span>
                  <span style={{ fontSize: 14 }}>{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="wrap">
          <SectionHeader eyebrow="What we stand for" title="Four values, no exceptions" align="center" />
          <div className="grid-4-md" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              ['01', 'Natural Ingredients', 'Plant-derived, food-grade, and traceable to source. No mystery blends.'],
              ['02', 'Dog Safety First', 'Vet-developed formulas. Patch-tested. pH-balanced for canine skin.'],
              ['03', 'Clean Formulas', 'Short ingredient lists. If it can\u2019t be on the front of the bottle, it doesn\u2019t go in.'],
              ['04', 'Honest Labeling', 'Every INCI name, in order, no hidden actives. Read the back of any can.'],
            ].map(([n, t, d]) => (
              <div key={n} className="card-cream" style={{ padding: 24, borderRadius: 14 }}>
                <div className="mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.1em', fontWeight: 600 }}>VALUE {n}</div>
                <h3 className="h-display" style={{ fontSize: 22, margin: '8px 0 8px' }}>{t}</h3>
                <p className="small" style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">Meet the team</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 16px' }}>
              Three humans, two dogs, <span className="h-italic">one farmhouse.</span>
            </h2>
            <p className="lede" style={{ marginTop: 0 }}>
              Co-founders Maya and Jonas run Field &amp; Fur out of a small farmhouse outside Rhinebeck, NY. Dr. Lin (DVM, twelve years in small-animal dermatology) keeps us honest on every formula.
            </p>
            <p className="lede">
              Bandit, our chief quality officer, is paid in belly rubs.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {[
              { name: 'Maya Chen', role: 'Co-founder · Formulation', tone: 'sage' },
              { name: 'Jonas Park', role: 'Co-founder · Operations', tone: 'cream' },
              { name: 'Dr. Hana Lin, DVM', role: 'Veterinary advisor', tone: 'gold' },
              { name: 'Bandit', role: 'Chief Quality Officer', tone: 'forest' },
            ].map(p => (
              <div key={p.name}>
                <Placeholder label={`portrait · ${p.name.toLowerCase()}`} tone={p.tone} aspect="4 / 5" />
                <div style={{ marginTop: 10, fontWeight: 600 }}>{p.name}</div>
                <div className="small">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section className="section">
        <div className="wrap center">
          <div className="eyebrow">As featured in</div>
          <div className="row" style={{ marginTop: 32, justifyContent: 'space-between', flexWrap: 'wrap', gap: 28 }}>
            {['Modern Dog', 'The Strategist', 'Hudson Valley Mag', 'BarkPost', 'Goop Pets'].map(p => (
              <span key={p} className="h-display" style={{ fontSize: 22, color: 'var(--ink-3)', fontStyle: 'italic' }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--forest)', color: '#fff' }}>
        <div className="wrap center" style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', margin: '0 0 16px' }}>
            Ready to switch?
          </h2>
          <p className="lede" style={{ color: 'rgba(255,255,255,.78)', margin: '0 auto 28px' }}>
            Try the hero wipe. If your dog isn't happy, we'll refund you — keep the canister.
          </p>
          <button className="btn btn-gold btn-lg" onClick={() => navigate('product')}>Shop the wipes</button>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { AboutPage });
