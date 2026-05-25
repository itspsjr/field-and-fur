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
              We started Ever After Paw because <span className="h-italic">nothing we found</span> was good enough.
            </h1>
            <p className="lede">
              In 2023, we lost our retriever Bandit. We looked everywhere for a way to honor him — something that matched how much he mattered. We couldn't find it. So we built it.
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
            To preserve every dog's story as <span className="h-italic">carefully</span> as the families who lived it — in books, prints, and letters worth keeping for decades.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }}>
          <Placeholder label="studio desk · upstate ny" tone="sage" aspect="4 / 5" />
          <div>
            <div className="eyebrow">Our approach</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 16px' }}>
              We start with <span className="h-italic">your dog's story.</span>
            </h2>
            <p className="lede" style={{ marginTop: 0 }}>
              Every keepsake starts from scratch. You send us photos, dates, and the small details that made your dog yours. A designer builds something around what's actually true — not a template, not a form letter.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 24 }}>
              {['Made to order', 'No templates', 'Designer-crafted', 'Two revisions included', 'Proof in 24–48 hours', 'Archival materials', 'Dog-only focus', 'Lifetime files'].map(x => (
                <div key={x} className="row" style={{ gap: 8, padding: '6px 0' }}>
                  <CheckLeaf />
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
              ['01', 'Only dogs', 'We only make keepsakes for dogs. Not cats, not horses, not generic pets. Every piece of our craft is shaped around the bond between a dog and their family.'],
              ['02', 'Nothing generic', 'Every keepsake is built from your photos and your story. We don’t sell pre-made albums or stock portraits.'],
              ['03', 'Honest timelines', 'We tell you exactly how long each step takes. No surprise delays, no vague “2–4 weeks”. Proofs in 24–48 hours, always.'],
              ['04', 'Quiet quality', 'Archival inks, linen covers, cotton paper. Materials that last decades without calling attention to themselves.'],
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
              Co-founders Maya and Jonas run Ever After Paw out of a small farmhouse outside Rhinebeck, NY. Dr. Lin (DVM, twelve years in small-animal practice) advises on every written piece that touches on health or loss.
            </p>
            <p className="lede">
              Bandit, our chief inspiration, is the reason any of this exists.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {[
              { name: 'Maya Chen', role: 'Co-founder · Design', tone: 'sage' },
              { name: 'Jonas Park', role: 'Co-founder · Operations', tone: 'cream' },
              { name: 'Dr. Hana Lin, DVM', role: 'Veterinary advisor', tone: 'gold' },
              { name: 'Bandit', role: 'Chief Inspiration Officer', tone: 'forest' },
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
            Ready to start?
          </h2>
          <p className="lede" style={{ color: 'rgba(255,255,255,.78)', margin: '0 auto 28px' }}>
            Browse Legacy Studio keepsakes — or contact us if you need help deciding where to start.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-gold btn-lg" onClick={() => navigate('legacy')}>Explore keepsakes</button>
            <button className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,.4)', color: '#fff' }} onClick={() => navigate('contact')}>Contact the studio</button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { AboutPage });
