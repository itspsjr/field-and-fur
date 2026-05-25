// Blog list page

function BlogPage() {
  const { navigate } = React.useContext(AppCtx);
  const [category, setCategory] = React.useState('All');
  const [query, setQuery] = React.useState('');

  const categories = ['All', 'Dog Health', 'Grooming Tips', 'Natural Ingredients', 'Dog Care', 'Product Updates'];
  const filtered = BLOG_POSTS.filter(p =>
    (category === 'All' || p.category === category) &&
    (query === '' || (p.title + p.excerpt).toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <main className="page-fade">
      {/* HEADER */}
      <section style={{ background: 'var(--bg-cream)', padding: '64px 0 48px' }}>
        <div className="wrap">
          <div className="eyebrow">The Field Journal</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 76px)', margin: '14px 0 12px' }}>
            Honest writing on <span className="h-italic">dog care.</span>
          </h1>
          <p className="lede" style={{ margin: 0 }}>
            Grooming tips, ingredient deep-dives, and notes from the field. Vet-reviewed, no fluff.
          </p>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="section-tight">
        <div className="wrap">
          <div className="row" style={{ justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
            <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
              {categories.map(c => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    style={{
                      background: active ? 'var(--forest)' : 'transparent',
                      color: active ? '#fff' : 'var(--ink-2)',
                      border: active ? '1px solid var(--forest)' : '1px solid var(--line)',
                      padding: '8px 14px',
                      borderRadius: 999,
                      fontSize: 13,
                      cursor: 'default',
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <div style={{ position: 'relative', width: 260 }}>
              <input className="input" placeholder="Search posts…" value={query} onChange={e => setQuery(e.target.value)} style={{ paddingLeft: 38, height: 42 }} />
              <svg style={{ position: 'absolute', left: 12, top: 12 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card center" style={{ padding: 48 }}>
              <p className="h-display" style={{ fontSize: 24, margin: 0 }}>No posts found.</p>
              <p className="muted" style={{ marginTop: 8 }}>Try a different search or category.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40 }}>
              {/* FEATURED */}
              <div>
                {filtered.slice(0, 1).map(p => (
                  <article key={p.slug} className="card" onClick={() => navigate('blogpost', { slug: p.slug })} style={{ cursor: 'default' }}>
                    <Placeholder label={p.image} tone="sage" aspect="16 / 9" style={{ border: 0, borderRadius: 0, borderBottom: '1px solid var(--line)' }} />
                    <div style={{ padding: 28 }}>
                      <div className="row" style={{ gap: 12, marginBottom: 12 }}>
                        <span className="pill">{p.category}</span>
                        <span className="small">{p.read} min read · {p.date}</span>
                      </div>
                      <h2 className="h-display" style={{ fontSize: 32, margin: '0 0 12px', lineHeight: 1.15 }}>{p.title}</h2>
                      <p className="lede" style={{ margin: 0 }}>{p.excerpt}</p>
                      <button className="btn btn-outline btn-sm" style={{ marginTop: 18 }}>Read article →</button>
                    </div>
                  </article>
                ))}
              </div>

              {/* SIDE LIST */}
              <div style={{ display: 'grid', gap: 16 }}>
                {filtered.slice(1).map(p => (
                  <article key={p.slug} className="card" onClick={() => navigate('blogpost', { slug: p.slug })} style={{ cursor: 'default', display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'stretch' }}>
                    <Placeholder label={p.image} tone="cream" aspect="1 / 1" style={{ border: 0, borderRadius: 0, borderRight: '1px solid var(--line)' }} />
                    <div style={{ padding: 16 }}>
                      <span className="eyebrow">{p.category}</span>
                      <h3 className="h-display" style={{ fontSize: 18, margin: '8px 0 6px', lineHeight: 1.25 }}>{p.title}</h3>
                      <div className="small">{p.date} · {p.read} min</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* EMAIL */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow">Subscribe to the journal</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', margin: '14px 0 16px' }}>
            One thoughtful email, <span className="h-italic">every other Sunday.</span>
          </h2>
          <EmailCapture />
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { BlogPage });
