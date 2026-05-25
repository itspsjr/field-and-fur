// Chrome: SearchOverlay, MobileNavDrawer, MiniCartDrawer, Toast, UpsellRow

// ─── Toast ─────────────────────────────────────────────────────────────
function Toast({ msg, visible }) {
  return (
    <div className={'toast' + (visible ? ' visible' : '')}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l4 4 10-10"/></svg>
      {msg}
    </div>
  );
}

// ─── Drawer shell ──────────────────────────────────────────────────────
function Drawer({ open, side = 'right', width = 420, onClose, children, label }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  return (
    <React.Fragment>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(20,20,15,0.4)',
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .25s ease', zIndex: 90,
        }}
      />
      <aside
        role="dialog"
        aria-label={label}
        style={{
          position: 'fixed', top: 0, [side]: 0, height: '100%',
          width: `min(${width}px, 92vw)`,
          background: 'var(--bg)', zIndex: 91,
          transform: open ? 'translateX(0)' : `translateX(${side === 'right' ? '100%' : '-100%'})`,
          transition: 'transform .3s cubic-bezier(.2,.8,.2,1)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 0 60px rgba(0,0,0,.18)',
        }}
      >
        {children}
      </aside>
    </React.Fragment>
  );
}

// ─── Search overlay (top sheet) ────────────────────────────────────────
function SearchOverlay({ open, onClose }) {
  const { navigate } = React.useContext(AppCtx);
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
      setQ('');
    }
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const all = [
    ...PRODUCTS.map(p => ({ kind: 'product', ...p })),
    ...UPSELLS.map(p => ({ kind: 'product', ...p })),
    ...BLOG_POSTS.map(p => ({ kind: 'post', title: p.title, id: p.slug, category: p.category, tone: 'cream', image: p.image })),
  ];
  const filtered = q.length === 0
    ? all.filter(x => x.kind === 'product').slice(0, 4)
    : all.filter(x => (x.name || x.title || '').toLowerCase().includes(q.toLowerCase())).slice(0, 8);

  const popular = ['Memorial Book', 'Tribute Wall Art', 'Letter From Your Dog', 'Dog Tribute Page', 'Keepsakes'];

  return (
    <React.Fragment>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(20,20,15,0.4)',
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .25s ease', zIndex: 90,
        }}
      />
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 91,
        background: 'var(--bg)',
        transform: open ? 'translateY(0)' : 'translateY(-110%)',
        transition: 'transform .35s cubic-bezier(.2,.8,.2,1)',
        boxShadow: '0 8px 40px rgba(0,0,0,.12)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div className="wrap" style={{ padding: '24px 0 32px' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
            <div className="eyebrow">Search Ever After Paw</div>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>Close <span className="kbd" style={{ marginLeft: 6 }}>esc</span></button>
          </div>
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 18, top: 22 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input
              ref={inputRef}
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Try memorial book, tribute art, or letter…"
              style={{
                width: '100%', padding: '20px 20px 20px 52px',
                fontSize: 22, fontFamily: 'var(--serif)',
                background: 'transparent', border: 0, outline: 0,
                borderBottom: '1px solid var(--line)',
                color: 'var(--ink)',
              }}
            />
          </div>

          {q.length === 0 && (
            <div className="row" style={{ marginTop: 18, gap: 8, flexWrap: 'wrap' }}>
              <span className="small mono">POPULAR</span>
              {popular.map(p => (
                <button key={p} onClick={() => setQ(p)} className="pill cream" style={{ cursor: 'default', border: 0 }}>{p}</button>
              ))}
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            {filtered.length === 0 ? (
              <p className="muted" style={{ padding: 24, textAlign: 'center' }}>No matches. Try a different word.</p>
            ) : (
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>{q ? 'Results' : 'Suggested products'}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  {filtered.map(item => (
                    <a
                      key={item.kind + (item.id || item.title)}
                      className="card"
                      onClick={() => { onClose(); item.kind === 'product' ? navigate('product', { id: item.id }) : navigate('blogpost', { slug: item.id }); }}
                      style={{ cursor: 'default', padding: 12 }}
                    >
                      <Placeholder label="" tone={item.tone || 'sage'} aspect="1 / 1" style={{ borderRadius: 8, marginBottom: 10 }} />
                      <div className="small mono" style={{ color: 'var(--gold)' }}>{item.kind === 'product' ? (item.category || 'Shop') : 'Journal'}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, marginTop: 4 }} dangerouslySetInnerHTML={{ __html: item.name || item.title }} />
                      {item.kind === 'product' && <div className="small" style={{ marginTop: 4 }}>${item.price.toFixed(2)}</div>}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// ─── Mobile nav drawer ─────────────────────────────────────────────────
function MobileNavDrawer({ open, onClose }) {
  const { route, navigate } = React.useContext(AppCtx);
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'Our Story' },
    { id: 'blog', label: 'Blog' },
    { id: 'subscribe', label: 'Subscribe & Save' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <Drawer open={open} side="left" width={360} onClose={onClose} label="Menu">
      <div style={{ padding: 20, borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo />
        <button className="icon-btn" onClick={onClose} aria-label="Close menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <nav style={{ padding: '12px 20px', flex: 1, overflowY: 'auto' }}>
        {links.map(l => (
          <button
            key={l.id}
            onClick={() => { navigate(l.id); onClose(); }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              width: '100%', textAlign: 'left',
              padding: '18px 4px',
              borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500,
              color: route === l.id ? 'var(--forest)' : 'var(--ink)',
              background: 'transparent', border: 0, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'var(--line)',
              cursor: 'default',
            }}
          >
            <span>{l.label}</span>
            <span style={{ color: 'var(--gold)' }}>→</span>
          </button>
        ))}
        <div style={{ marginTop: 28 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Account</div>
          <a onClick={() => { navigate('cart'); onClose(); }} style={{ display: 'block', padding: '8px 0', fontSize: 14, cursor: 'default' }}>Your bag</a>
          <a onClick={() => { navigate('contact'); onClose(); }} style={{ display: 'block', padding: '8px 0', fontSize: 14, cursor: 'default' }}>Order help</a>
          <a style={{ display: 'block', padding: '8px 0', fontSize: 14 }}>Track an order</a>
        </div>
      </nav>
      <div style={{ padding: 20, borderTop: '1px solid var(--line)' }}>
        <div className="row" style={{ gap: 8 }}>
          {['Instagram', 'TikTok', 'Facebook'].map(s => (
            <a key={s} className="icon-btn" style={{ width: 38, height: 38, border: '1px solid var(--line)' }}>
              <SocialIcon name={s} />
            </a>
          ))}
        </div>
      </div>
    </Drawer>
  );
}

// ─── Mini-cart drawer ──────────────────────────────────────────────────
function MiniCartDrawer({ open, onClose }) {
  const { cart, updateCart, removeFromCart, addToCart, navigate } = React.useContext(AppCtx);
  const subtotal = cart.reduce((s, i) => s + (i.subscribe ? i.subPrice : i.price) * i.qty, 0);
  const toFree = Math.max(0, 35 - subtotal);
  const progress = Math.min(100, (subtotal / 35) * 100);

  // Upsells not in cart
  const upsellSuggestions = UPSELLS.filter(u => !cart.find(c => c.id === u.id)).slice(0, 3);

  return (
    <Drawer open={open} side="right" width={440} onClose={onClose} label="Your bag">
      {/* HEADER */}
      <div style={{ padding: 20, borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="h-display" style={{ fontSize: 24, margin: 0 }}>Your bag <span className="muted" style={{ fontFamily: 'var(--sans)', fontSize: 14, marginLeft: 6 }}>({cart.reduce((s, i) => s + i.qty, 0)})</span></h3>
        <button className="icon-btn" onClick={onClose} aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>

      {/* SHIPPING PROGRESS */}
      <div style={{ padding: '14px 20px', background: 'var(--bg-sage)' }}>
        {toFree > 0 ? (
          <div className="small">You're <strong>${toFree.toFixed(2)}</strong> away from free shipping</div>
        ) : (
          <div className="small" style={{ color: 'var(--forest)' }}>🎉 You unlocked <strong>free shipping</strong></div>
        )}
        <div style={{ height: 5, background: 'rgba(0,0,0,.06)', borderRadius: 999, overflow: 'hidden', marginTop: 8 }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--forest)', transition: 'width .3s' }} />
        </div>
      </div>

      {/* LINES */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 32 }}>
            <Placeholder label="empty bag" tone="sage" aspect="1 / 1" style={{ maxWidth: 140, margin: '0 auto 16px' }} />
            <p className="h-display" style={{ fontSize: 22, margin: '0 0 8px' }}>Your bag is empty.</p>
            <p className="muted small" style={{ marginBottom: 16 }}>A memorial book? A tribute print?</p>
            <button className="btn btn-primary" onClick={() => { onClose(); navigate('shop'); }}>Browse the line</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {cart.map(item => (
              <div key={item.id + (item.subscribe ? '-sub' : '')} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
                <Placeholder label="" tone={item.tone || 'sage'} aspect="1 / 1" style={{ borderRadius: 8 }} />
                <div>
                  <div className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }} dangerouslySetInnerHTML={{ __html: item.name }} />
                    <button onClick={() => removeFromCart(item)} className="small" style={{ background: 'transparent', border: 0, cursor: 'default', color: 'var(--ink-3)' }}>×</button>
                  </div>
                  {item.subscribe && <span className="pill gold" style={{ fontSize: 9.5, marginTop: 4 }}>SUBSCRIBE</span>}
                  <div className="row" style={{ justifyContent: 'space-between', marginTop: 8 }}>
                    <div className="row" style={{ border: '1px solid var(--line)', borderRadius: 999, height: 30 }}>
                      <button onClick={() => updateCart(item, item.qty - 1)} style={{ width: 28, height: 28, border: 0, background: 'transparent', cursor: 'default' }}>−</button>
                      <span className="mono small" style={{ minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateCart(item, item.qty + 1)} style={{ width: 28, height: 28, border: 0, background: 'transparent', cursor: 'default' }}>+</button>
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>${((item.subscribe ? item.subPrice : item.price) * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* UPSELLS */}
            {upsellSuggestions.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Add to your bag</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {upsellSuggestions.map(u => (
                    <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '54px 1fr auto', gap: 12, alignItems: 'center', padding: 10, background: 'var(--bg-cream)', borderRadius: 10 }}>
                      <Placeholder label="" tone={u.tone} aspect="1 / 1" style={{ borderRadius: 6 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{u.name}</div>
                        <div className="small" style={{ fontSize: 11.5 }}>${u.price.toFixed(2)}</div>
                      </div>
                      <button className="btn btn-outline btn-sm" onClick={() => addToCart(u, 1, false)}>+ Add</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      {cart.length > 0 && (
        <div style={{ padding: 20, borderTop: '1px solid var(--line)', background: '#fff' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontWeight: 600 }}>Subtotal</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>${subtotal.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => { onClose(); navigate('checkout'); }}>
            Checkout →
          </button>
          <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: 6 }} onClick={() => { onClose(); navigate('cart'); }}>
            View full bag
          </button>
        </div>
      )}
    </Drawer>
  );
}

// ─── Upsell row (used on Cart + Checkout) ──────────────────────────────
function UpsellRow({ title = 'Frequently added together', items, compact = false }) {
  const { cart, addToCart } = React.useContext(AppCtx);
  const { navigate } = React.useContext(AppCtx);
  const visible = (items || UPSELLS).filter(u => !cart.find(c => c.id === u.id && !c.subscribe));
  if (visible.length === 0) return null;
  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
        <h3 className="h-display" style={{ fontSize: compact ? 20 : 24, margin: 0 }}>{title}</h3>
        <span className="small mono">{visible.length} suggestions</span>
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {visible.map(u => (
          <div key={u.id} className="card" style={{ padding: 14, display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 14, alignItems: 'center' }}>
            <a onClick={() => navigate('product', { id: u.id })} style={{ cursor: 'default' }}>
              <Placeholder label="" tone={u.tone} aspect="1 / 1" style={{ borderRadius: 8 }} />
            </a>
            <div>
              <div className="row" style={{ gap: 8 }}>
                <h4 className="h-display" style={{ fontSize: 17, margin: 0 }}>{u.name}</h4>
                {u.badge && <span className="pill gold" style={{ fontSize: 9.5 }}>{u.badge}</span>}
              </div>
              <p className="small" style={{ margin: '4px 0 4px', color: 'var(--ink-2)', lineHeight: 1.45 }}>{u.short}</p>
              <Stars value={u.rating} count={u.reviews} showNumber />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>+ ${u.price.toFixed(2)}</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 6 }} onClick={() => addToCart(u, 1, false)}>Add to order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Toast, Drawer, SearchOverlay, MobileNavDrawer, MiniCartDrawer, UpsellRow });
