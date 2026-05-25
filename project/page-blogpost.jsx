// Single blog post page

function BlogPostPage() {
  const { navigate, params } = React.useContext(AppCtx);
  const post = BLOG_POSTS.find(p => p.slug === params.slug) || BLOG_POSTS[0];
  const others = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState([
    { name: 'Sara D.', avatar: 'sage', date: '2 days ago', body: 'This helped me so much. I ordered the memorial book and it arrived exactly as described. Reading this made me feel less alone in the process.' },
    { name: 'Ravi M.', avatar: 'cream', date: '4 days ago', body: 'We lost our French bulldog last month and finding the right words has been the hardest part. This article said exactly what I couldn’t.' },
  ]);

  return (
    <main className="page-fade">
      {/* HEADER */}
      <section style={{ background: 'var(--bg-cream)', padding: '56px 0 32px' }}>
        <div className="wrap" style={{ maxWidth: 760, margin: '0 auto' }}>
          <a onClick={() => navigate('blog')} className="small" style={{ cursor: 'default' }}>← Back to journal</a>
          <div className="row" style={{ gap: 12, marginTop: 16 }}>
            <span className="pill">{post.category}</span>
            <span className="small">{post.read} min read · {post.date}</span>
          </div>
          <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', margin: '14px 0 16px', lineHeight: 1.1 }}>
            {post.title}
          </h1>
          <p className="lede">{post.excerpt}</p>
          <div className="row" style={{ marginTop: 24, justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div className="row" style={{ gap: 12 }}>
              <Placeholder label="" tone="sage" aspect="1 / 1" round style={{ width: 44, height: 44, border: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Maya Chen</div>
                <div className="small">Co-founder · 8 articles</div>
              </div>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <span className="small mono" style={{ marginRight: 4 }}>SHARE</span>
              {['Facebook', 'Instagram', 'Pinterest', 'Twitter'].map(s => (
                <button key={s} className="icon-btn" style={{ width: 36, height: 36, border: '1px solid var(--line)', background: '#fff' }} title={`Share to ${s}`}>
                  <ShareGlyph name={s} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED IMG */}
      <div className="wrap" style={{ maxWidth: 920, margin: '0 auto', paddingBlock: 32 }}>
        <Placeholder label={post.image} tone="sage" aspect="16 / 9" />
      </div>

      {/* BODY */}
      <article className="wrap" style={{ maxWidth: 720, margin: '0 auto', paddingBottom: 56 }}>
        <PostBody />

        {/* INLINE EMAIL */}
        <div className="card-sage" style={{ padding: 32, borderRadius: 14, marginTop: 40, textAlign: 'center' }}>
          <div className="eyebrow">Get more like this</div>
          <h3 className="h-display" style={{ fontSize: 28, margin: '12px 0 16px' }}>
            One careful email, <span className="h-italic">every other Sunday.</span>
          </h3>
          <EmailCapture />
        </div>

        {/* TAGS */}
        <div className="row" style={{ marginTop: 40, gap: 8, flexWrap: 'wrap' }}>
          <span className="small mono">TAGS</span>
          {['dog loss', 'remembrance', 'keepsakes', 'memorial', post.category.toLowerCase()].map(t => (
            <span key={t} className="pill cream">#{t.replace(/\s+/g, '')}</span>
          ))}
        </div>

        {/* COMMENTS */}
        <div style={{ marginTop: 56 }}>
          <h3 className="h-display" style={{ fontSize: 26, margin: '0 0 16px' }}>Comments · {comments.length}</h3>
          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            {comments.map((c, i) => (
              <div key={i} className="card" style={{ padding: 20, display: 'grid', gridTemplateColumns: '44px 1fr', gap: 14 }}>
                <Placeholder label="" tone={c.avatar} aspect="1 / 1" round style={{ width: 44, height: 44, border: 0 }} />
                <div>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14 }}>{c.name}</strong>
                    <span className="small">{c.date}</span>
                  </div>
                  <p style={{ margin: '6px 0 0', color: 'var(--ink-2)', lineHeight: 1.55 }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={e => { e.preventDefault(); if (!comment) return; setComments([{ name: 'You', avatar: 'gold', date: 'just now', body: comment }, ...comments]); setComment(''); }}>
            <label className="label">Leave a comment</label>
            <textarea className="textarea" value={comment} onChange={e => setComment(e.target.value)} placeholder="What's on your mind?" />
            <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>Post comment</button>
          </form>
        </div>
      </article>

      {/* RELATED */}
      <section className="section-tight" style={{ background: 'var(--bg-cream)' }}>
        <div className="wrap">
          <SectionHeader eyebrow="Keep reading" title="Related posts" />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {others.map(p => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function PostBody() {
  return (
    <div style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--ink-2)' }}>
      <p style={{ fontSize: 22, lineHeight: 1.55, color: 'var(--ink)', marginTop: 0 }}>
        Most families we work with ask the same thing when they reach out: <em>how do I even start?</em> The honest answer is — you don't need to have the words yet. You just need to begin.
      </p>
      <p>
        A dog's story is made of small things. The morning routine. The corner of the couch they claimed. The sound of the tags on the stairs. These details feel ordinary until they're gone — and then they're the most important things you can preserve.
      </p>

      <h2 className="h-display" style={{ fontSize: 30, color: 'var(--ink)', margin: '40px 0 12px', lineHeight: 1.2 }}>
        Start with what you remember
      </h2>
      <p>
        Before you think about formats or products, spend ten minutes writing down the details you're afraid you'll forget. The name of their favorite walk. The food they begged for. The face they made at bath time. These notes become the material everything else is built from.
      </p>

      <blockquote style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 24, margin: '32px 0', fontStyle: 'italic', fontSize: 22, fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
        "Grief asks us to hold two things at once: the loss and the love. A good memorial does that too — it sits quietly with both."
        <footer style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-3)', fontStyle: 'normal', fontFamily: 'var(--sans)' }}>— Maya Chen, co-founder</footer>
      </blockquote>

      <h2 className="h-display" style={{ fontSize: 30, color: 'var(--ink)', margin: '40px 0 12px', lineHeight: 1.2 }}>
        What makes a keepsake worth keeping
      </h2>
      <p>
        The memorials that families return to years later share one quality: specificity. Not "she was a good dog" but "she waited by the blue door every afternoon at 4:15." The more particular, the more alive.
      </p>
      <ul style={{ paddingLeft: 22 }}>
        <li>Their name, their dates — and one sentence about who they were</li>
        <li>At least one photo that shows their personality, not just their face</li>
        <li>A detail only your family would know</li>
        <li>The feeling of the house before and after</li>
      </ul>

      <h2 className="h-display" style={{ fontSize: 30, color: 'var(--ink)', margin: '40px 0 12px', lineHeight: 1.2 }}>
        You don't have to do this alone
      </h2>
      <p>
        That's what Legacy Studio is for. You send us the raw material — the photos, the dates, the notes — and a designer shapes it into something worth keeping. Two revisions, no rush, a proof in 24 hours. The hard part is remembering. We handle the rest.
      </p>
    </div>
  );
}

function ShareGlyph({ name }) {
  const s = { width: 14, height: 14, fill: 'none', stroke: 'var(--ink-2)', strokeWidth: 1.6 };
  switch (name) {
    case 'Facebook': return <svg viewBox="0 0 24 24" {...s}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>;
    case 'Instagram': return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg>;
    case 'Pinterest': return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M11 8v9M11 17l-1 4"/></svg>;
    case 'Twitter': return <svg viewBox="0 0 24 24" {...s}><path d="M4 4l7.5 10L4 20h2l7-7 4.5 7H22l-8-11 8-9h-2l-6.5 7L9 4z"/></svg>;
    default: return null;
  }
}

Object.assign(window, { BlogPostPage });
