// Field & Fur — root app: router, global state, tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "forest-gold",
  "heroLayout": "split",
  "typePairing": "fraunces-jakarta",
  "sectionRhythm": "alternating"
}/*EDITMODE-END*/;

const PALETTES = {
  'forest-gold': { '--forest': '#2C5F2E', '--forest-deep': '#1f4520', '--gold': '#C8973F', '--bg-sage': '#E8F0E9', '--bg-cream': '#F5F1E8', '--earth': '#6B4226' },
  'sage-clay':   { '--forest': '#5A7553', '--forest-deep': '#3f5739', '--gold': '#C77955', '--bg-sage': '#E6ECDB', '--bg-cream': '#F4EDE2', '--earth': '#6B4226' },
  'midnight-honey': { '--forest': '#1F3531', '--forest-deep': '#0f1f1c', '--gold': '#D6A35C', '--bg-sage': '#E2E8E2', '--bg-cream': '#F2EBDD', '--earth': '#4A2E1A' },
  'cream-rose': { '--forest': '#7A4A4A', '--forest-deep': '#5a3535', '--gold': '#D49D6F', '--bg-sage': '#EDE0DA', '--bg-cream': '#F6EFE7', '--earth': '#6B4226' },
};

const TYPE_PAIRINGS = {
  'fraunces-jakarta': { '--serif': '"Fraunces", ui-serif, Georgia, serif', '--sans': '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif' },
  'dmserif-outfit':   { '--serif': '"DM Serif Display", ui-serif, Georgia, serif', '--sans': '"Outfit", ui-sans-serif, system-ui, sans-serif' },
  'cormorant-figtree':{ '--serif': '"Cormorant Garamond", ui-serif, Georgia, serif', '--sans': '"Figtree", ui-sans-serif, system-ui, sans-serif' },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState(() => parseHash().route);
  const [params, setParams] = React.useState(() => parseHash().params);
  const [cart, setCart] = React.useState([]);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [miniCartOpen, setMiniCartOpen] = React.useState(false);
  const [toast, setToast] = React.useState({ msg: '', visible: false });
  const toastTimer = React.useRef(null);

  // load extra fonts when type pairing changes
  React.useEffect(() => {
    const fonts = {
      'dmserif-outfit': 'family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700',
      'cormorant-figtree': 'family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Figtree:wght@300;400;500;600;700',
    };
    const param = fonts[tweaks.typePairing];
    if (!param) return;
    const id = 'font-' + tweaks.typePairing;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${param}&display=swap`;
    document.head.appendChild(link);
  }, [tweaks.typePairing]);

  // apply palette + type
  React.useEffect(() => {
    const styles = { ...(PALETTES[tweaks.palette] || {}), ...(TYPE_PAIRINGS[tweaks.typePairing] || {}) };
    const root = document.documentElement;
    Object.entries(styles).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [tweaks.palette, tweaks.typePairing]);

  // hash routing
  React.useEffect(() => {
    const onHash = () => {
      const { route, params } = parseHash();
      setRoute(route);
      setParams(params);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  function navigate(r, p = {}) {
    const q = new URLSearchParams(p).toString();
    window.location.hash = '/' + r + (q ? '?' + q : '');
  }

  // cart actions
  function showToast(msg) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2200);
  }
  function addToCart(product, qty = 1, subscribe = false) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.subscribe === subscribe);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty, subscribe }];
    });
    flashCart();
    showToast(`Added · ${product.name.replace(/&amp;/g, '&')}`);
    // open mini-cart on first add (UX nicety)
    if (!miniCartOpen && cart.length === 0) {
      setTimeout(() => setMiniCartOpen(true), 400);
    }
  }
  function updateCart(item, qty) {
    if (qty <= 0) return setCart(c => c.filter(i => i !== item));
    setCart(c => c.map(i => i === item ? { ...i, qty } : i));
  }
  function removeFromCart(item) {
    setCart(c => c.filter(i => i !== item));
  }
  function clearCart() { setCart([]); }

  const ctx = {
    route, params, navigate,
    cart, addToCart, updateCart, removeFromCart, clearCart,
    tweaks,
    openSearch: () => setSearchOpen(true),
    openMenu: () => setMenuOpen(true),
    openMiniCart: () => setMiniCartOpen(true),
    showToast,
  };

  return (
    <AppCtx.Provider value={ctx}>
      <AnnouncementBar />
      <Header />
      {route === 'home' && <HomePage />}
      {route === 'shop' && <ShopPage />}
      {route === 'product' && <ProductPage />}
      {route === 'cart' && <CartPage />}
      {route === 'checkout' && <CheckoutPage />}
      {route === 'about' && <AboutPage />}
      {route === 'blog' && <BlogPage />}
      {route === 'blogpost' && <BlogPostPage />}
      {route === 'contact' && <ContactPage />}
      {route === 'subscribe' && <SubscribePage />}
      {route === 'legacy' && <LegacyServicesPage />}
      <Footer />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MiniCartDrawer open={miniCartOpen} onClose={() => setMiniCartOpen(false)} />
      <Toast msg={toast.msg} visible={toast.visible} />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio
          value={tweaks.palette}
          options={[
            { value: 'forest-gold', label: 'Forest & Gold' },
            { value: 'sage-clay', label: 'Sage & Clay' },
            { value: 'midnight-honey', label: 'Midnight & Honey' },
            { value: 'cream-rose', label: 'Cream & Rose' },
          ]}
          onChange={v => setTweak('palette', v)}
        />

        <TweakSection label="Hero layout" />
        <TweakRadio
          value={tweaks.heroLayout}
          options={[
            { value: 'split', label: 'Split' },
            { value: 'centered', label: 'Centered' },
            { value: 'editorial', label: 'Editorial' },
          ]}
          onChange={v => setTweak('heroLayout', v)}
        />

        <TweakSection label="Type pairing" />
        <TweakRadio
          value={tweaks.typePairing}
          options={[
            { value: 'fraunces-jakarta', label: 'Fraunces + Jakarta' },
            { value: 'dmserif-outfit', label: 'DM Serif + Outfit' },
            { value: 'cormorant-figtree', label: 'Cormorant + Figtree' },
          ]}
          onChange={v => setTweak('typePairing', v)}
        />

        <TweakSection label="Jump to page" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            ['home', 'Home'], ['shop', 'Shop'], ['product', 'Product'],
            ['cart', 'Cart'], ['checkout', 'Checkout'], ['about', 'About'],
            ['blog', 'Blog'], ['blogpost', 'Post'], ['contact', 'Contact'],
            ['subscribe', 'Subscribe'], ['legacy', 'Legacy'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => navigate(id)} style={{
              padding: '7px 10px', borderRadius: 8,
              background: route === id ? 'var(--forest)' : 'rgba(255,255,255,.5)',
              color: route === id ? '#fff' : 'var(--ink-2)',
              border: '0.5px solid rgba(0,0,0,.06)',
              fontSize: 11.5, fontWeight: 500,
              cursor: 'default',
            }}>{label}</button>
          ))}
        </div>
      </TweaksPanel>
    </AppCtx.Provider>
  );
}

function parseHash() {
  const h = window.location.hash.replace(/^#\/?/, '') || 'home';
  const [route, q] = h.split('?');
  const params = {};
  if (q) {
    new URLSearchParams(q).forEach((v, k) => { params[k] = v; });
  }
  return { route: route || 'home', params };
}

function flashCart() {
  // brief visual feedback when adding to cart
  const pip = document.querySelector('.cart-pip');
  if (!pip) return;
  pip.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
    { duration: 380, easing: 'ease-out' }
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
