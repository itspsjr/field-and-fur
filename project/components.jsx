// Shared components for Field & Fur

// ─── Placeholder (striped SVG image stand-in) ──────────────────────────
function Placeholder({ label, tone = 'cream', aspect = '1 / 1', round = false, style = {}, className = '', children }) {
  const tones = { cream: '', sage: 'sage', forest: 'forest', gold: 'gold' };
  return (
    <div
      className={`ph ${tones[tone] || ''} ${round ? 'ph-round' : ''} ${className}`}
      style={{ aspectRatio: aspect, ...style }}
    >
      <span className="ph-label">{label}</span>
      {children}
    </div>
  );
}

// ─── Logo + paw mark ───────────────────────────────────────────────────
function PawMark({ size = 26, color = 'var(--forest)', accent = 'var(--gold)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <ellipse cx="16" cy="22" rx="9" ry="7" fill={color} />
      <ellipse cx="8" cy="12" rx="3.2" ry="4" fill={color} />
      <ellipse cx="16" cy="9" rx="3.2" ry="4" fill={accent} />
      <ellipse cx="24" cy="12" rx="3.2" ry="4" fill={color} />
      <ellipse cx="29" cy="18" rx="2.5" ry="3.2" fill={color} />
    </svg>
  );
}

function Logo({ size = 22, light = false }) {
  return (
    <div className="logo" style={{ color: light ? '#fff' : 'var(--ink)', fontSize: size }}>
      <PawMark size={size + 4} color={light ? '#fff' : 'var(--forest)'} accent="var(--gold)" />
      <span>Ever After Paw</span>
    </div>
  );
}

// ─── Stars ─────────────────────────────────────────────────────────────
function Stars({ value = 5, size = 14, showNumber = false, count = null }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="row" style={{ gap: 8 }}>
      <span className="stars" style={{ fontSize: size }}>
        {[0, 1, 2, 3, 4].map(i => {
          const fill = i < full ? 'var(--gold)' : (i === full && half ? 'url(#half)' : 'rgba(0,0,0,0.12)');
          return (
            <svg key={i} viewBox="0 0 20 20" width={size} height={size}>
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="var(--gold)" />
                  <stop offset="50%" stopColor="rgba(0,0,0,0.12)" />
                </linearGradient>
              </defs>
              <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" fill={fill} />
            </svg>
          );
        })}
      </span>
      {showNumber && (
        <span className="small" style={{ color: 'var(--ink-2)' }}>
          {value.toFixed(1)} {count != null && <span className="muted">· {count.toLocaleString()} reviews</span>}
        </span>
      )}
    </span>
  );
}

// ─── Announcement bar ──────────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="wrap" style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        <span>Free shipping on all Legacy Studio orders</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>Digital proofs within 24 hours</span>
      </div>
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────────
function Header() {
  const { route, navigate, cart, openSearch, openMenu, openMiniCart } = React.useContext(AppCtx);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'legacy', label: 'Legacy Studio' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <header className="header">
      <div className="wrap">
        <div className="header-inner">
          <div className="row" style={{ justifyContent: 'flex-start', gap: 4 }}>
            <button className="icon-btn hamburger" aria-label="Menu" onClick={openMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
            <a onClick={() => navigate('home')} style={{ cursor: 'default' }}><Logo /></a>
          </div>
          <nav className="header-nav">
            {links.map(l => (
              <a key={l.id} onClick={() => navigate(l.id)} className={route === l.id ? 'active' : ''} style={{ cursor: 'default' }}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="header-icons">
            <button className="icon-btn" aria-label="Search" onClick={openSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            </button>
            <button className="icon-btn account-btn" aria-label="Account" onClick={() => navigate('contact')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
            </button>
            <button className="icon-btn" aria-label="Cart" onClick={openMiniCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
              {cartCount > 0 && <span className="cart-pip">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────
function Footer() {
  const { navigate } = React.useContext(AppCtx);
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const socialLinks = {
    Instagram: 'https://www.instagram.com/',
    TikTok: 'https://www.tiktok.com/',
    Facebook: 'https://www.facebook.com/',
    Pinterest: 'https://www.pinterest.com/',
    YouTube: 'https://www.youtube.com/',
  };
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo light />
            <p style={{ color: '#8d8b7a', marginTop: 16, maxWidth: 260, fontSize: 14, lineHeight: 1.55 }}>
              A memorial studio for families honoring a dog's life and story.
            </p>
            <div className="row" style={{ marginTop: 20, gap: 12 }}>
              {Object.entries(socialLinks).map(([s, href]) => (
                <a
                  key={s}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s} temporary link`}
                  title={`${s} temporary link`}
                  style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Legacy Studio</h4>
            <a onClick={() => navigate('legacy')}>All Keepsakes</a>
            <a onClick={() => navigate('legacy')}>Dog Memorial Book</a>
            <a onClick={() => navigate('legacy')}>Tribute Wall Art</a>
            <a onClick={() => navigate('legacy')}>A Letter From Your Dog</a>
            <a onClick={() => navigate('legacy')}>Dog Tribute Page</a>
          </div>
          <div>
            <h4>Support</h4>
            <a onClick={() => navigate('contact')}>Contact Us</a>
            <a onClick={() => navigate('about')}>Our Story</a>
            <a>FAQ</a>
            <a>Wholesale</a>
          </div>
          <div>
            <h4>Join the Pack</h4>
            <p style={{ color: '#8d8b7a', fontSize: 14, lineHeight: 1.55, marginTop: 0 }}>
              Studio updates, stories of dogs remembered, and occasional keepsake drops. Unsubscribe anytime.
            </p>
            <form onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubscribed(true); }} style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <input
                className="input"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)', color: '#fff' }}
              />
              <button type="submit" className="btn btn-gold btn-sm" style={{ height: 48 }}>
                {subscribed ? 'Thanks!' : 'Join'}
              </button>
            </form>
            <div className="row" style={{ gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <span className="pill" style={{ background: 'rgba(255,255,255,.06)', color: '#d5d3c5' }}>🔒 Secure Checkout</span>
              <span className="pill" style={{ background: 'rgba(255,255,255,.06)', color: '#d5d3c5' }}>SSL Certified</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ever After Paw. All rights reserved. For external use on animals only. Results may vary.</span>
          <div className="links">
            <a>Privacy Policy</a>
            <a>Terms</a>
            <a>Refund Policy</a>
            <a>Disclaimer</a>
            <a>FDA Cosmetic Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  const s = { width: 16, height: 16, fill: 'none', stroke: '#d5d3c5', strokeWidth: 1.6 };
  switch (name) {
    case 'Instagram': return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#d5d3c5"/></svg>;
    case 'TikTok': return <svg viewBox="0 0 24 24" {...s}><path d="M15 4v9a4 4 0 1 1-4-4"/><path d="M15 4c0 2.8 2.2 5 5 5"/></svg>;
    case 'Facebook': return <svg viewBox="0 0 24 24" {...s}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>;
    case 'Pinterest': return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M11 8v9M11 17l-1 4M14 11a3 3 0 1 1-6 0"/></svg>;
    case 'YouTube': return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9l5 3-5 3z" fill="#d5d3c5"/></svg>;
    default: return null;
  }
}

// ─── Product card ──────────────────────────────────────────────────────
function ProductCard({ product, onClick }) {
  return (
    <div className="card" onClick={onClick} style={{ display: 'flex', flexDirection: 'column', cursor: 'default' }}>
      <a onClick={onClick} style={{ cursor: 'default' }}>
        <Placeholder label={product.image} tone={product.tone || 'sage'} aspect="1 / 1" style={{ borderRadius: 0, border: 0, borderBottom: '1px solid var(--line)' }} />
      </a>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="eyebrow">{product.category}</span>
          {product.badge && <span className="pill gold">{product.badge}</span>}
        </div>
        <h3 className="h-display" style={{ fontSize: 22, margin: 0 }}>{product.name}</h3>
        <Stars value={product.rating} count={product.reviews} showNumber />
        <div className="row" style={{ justifyContent: 'space-between', marginTop: 'auto', paddingTop: 8 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>${product.price.toFixed(2)}</div>
            {product.subPrice && <div className="small">${product.subPrice.toFixed(2)} subscribed</div>}
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, lede, align = 'left', action }) {
  return (
    <div style={{ display: 'flex', flexDirection: align === 'center' ? 'column' : 'row', justifyContent: 'space-between', alignItems: align === 'center' ? 'center' : 'flex-end', textAlign: align, marginBottom: 36, gap: 24 }}>
      <div style={{ maxWidth: 640 }}>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</div>}
        <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: 0 }}>{title}</h2>
        {lede && <p className="lede" style={{ marginTop: 14, marginInline: align === 'center' ? 'auto' : 0 }}>{lede}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Trust strip ───────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { t: 'No Harsh Chemicals', d: 'Free from parabens, sulfates, alcohol, and synthetic fragrance.' },
    { t: 'Vet-Friendly Formula', d: 'Developed alongside veterinarians and groomers.' },
    { t: 'Safe For All Breeds', d: 'Gentle enough for puppies and sensitive senior skin.' },
  ];
  return (
    <section className="section-tight" style={{ background: 'var(--bg-sage)' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
        {items.map(it => (
          <div key={it.t}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <CheckLeaf />
            </div>
            <h3 className="h-display" style={{ fontSize: 20, margin: '0 0 6px' }}>{it.t}</h3>
            <p className="small" style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckLeaf() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.8">
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}

// ─── Catalogue data ────────────────────────────────────────────────────
const UPSELLS = [];

const PRODUCTS = [];

// ─── Shared global state (cart, route) ────────────────────────────────
const AppCtx = React.createContext(null);

Object.assign(window, {
  Placeholder, PawMark, Logo, Stars, AnnouncementBar, Header, Footer, ProductCard,
  SectionHeader, TrustStrip, CheckLeaf, SocialIcon, PRODUCTS, UPSELLS, AppCtx,
});
