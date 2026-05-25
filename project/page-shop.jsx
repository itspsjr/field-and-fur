// Shop page — redirects to Legacy Studio keepsakes

function ShopPage() {
  const { navigate, addToCart, openMiniCart } = React.useContext(AppCtx);
  const [quickShop, setQuickShop] = React.useState(null);

  return (
    <main className="page-fade">
      {/* PAGE HEADER */}
      <section style={{ background: 'var(--bg-cream)', padding: '64px 0 48px' }}>
        <div className="wrap">
          <div className="eyebrow">Ever After Paw · Legacy Studio</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '12px 0 8px' }}>
            Keepsakes for the dog you'll never forget.
          </h1>
          <p className="lede" style={{ margin: 0 }}>
            Each piece is made to order, personalized with your dog's name, photos, and memories. Browse all Legacy Studio services below.
          </p>
        </div>
      </section>

      {/* LEGACY SERVICES GRID */}
      <section className="section">
        <div className="wrap">
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {LEGACY_SERVICES.map(service => {
              const option = service.options[0];
              return (
                <article key={service.id} className="card" style={{ padding: 18 }}>
                  <Placeholder label={service.image} tone={service.tone} aspect="4 / 3" style={{ marginBottom: 16 }} />
                  <div className="row" style={{ justifyContent: 'space-between', gap: 14 }}>
                    <h3 className="h-display" style={{ fontSize: 22, margin: 0 }}>{service.name}</h3>
                    <strong>From ${option.price}</strong>
                  </div>
                  <p className="small" style={{ color: 'var(--ink-2)', lineHeight: 1.55 }}>{option.name} · {option.note}</p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setQuickShop({ type: 'legacy', item: service })}
                  >
                    Personalize keepsake
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Not sure where to start?</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '0 0 16px' }}>
            We'll help you find the right keepsake.
          </h2>
          <p className="lede" style={{ margin: '0 auto 24px' }}>
            Every family's story is different. Reach out and we'll guide you to the keepsake that fits yours.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('legacy')}>View all services</button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('contact')}>Contact us</button>
          </div>
        </div>
      </section>

      <ShopQuickCustomizeDrawer
        selection={quickShop}
        onClose={() => setQuickShop(null)}
        onAdded={() => {
          setQuickShop(null);
          openMiniCart();
        }}
      />
    </main>
  );
}

function ShopQuickCustomizeDrawer({ selection, onClose, onAdded }) {
  const { addToCart } = React.useContext(AppCtx);
  const [qty, setQty] = React.useState(1);
  const [subscribe, setSubscribe] = React.useState(false);
  const [frequency, setFrequency] = React.useState(4);
  const [dogName, setDogName] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [legacyOptionId, setLegacyOptionId] = React.useState('');

  React.useEffect(() => {
    if (!selection) return;
    setQty(1);
    setSubscribe(false);
    setFrequency(4);
    setDogName('');
    setNotes('');
    setLegacyOptionId(selection.type === 'legacy' ? selection.item.options[0].id : '');
  }, [selection]);

  React.useEffect(() => {
    if (!selection) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selection, onClose]);

  if (!selection) return null;

  const isLegacy = selection.type === 'legacy';
  const item = selection.item;
  const legacyOption = isLegacy ? item.options.find(o => o.id === legacyOptionId) || item.options[0] : null;
  const unitPrice = isLegacy ? legacyOption.price : (subscribe ? item.subPrice : item.price);
  const dogLabel = dogName.trim() || 'your dog';

  function addConfigured() {
    if (isLegacy) {
      const cfg = LEGACY_PERSONALIZATION[item.id] || LEGACY_PERSONALIZATION['memorial-book'];
      addToCart(legacyServiceToCartItemWithPersonalization(item, legacyOption, {
        name: dogLabel,
        tagline: cfg.defaultTagline,
        theme: cfg.themes[0],
        finish: cfg.finishes[0],
        subject: cfg.subjects[0],
        dedication: notes || cfg.defaultDedication,
        photoCount: 6,
      }), 1, false);
    } else {
      addToCart({
        ...item,
        name: dogName.trim() ? `${item.name} for ${dogName.trim()}` : item.name,
        short: notes ? `${item.short || item.tagline} · Shopper note: ${notes}` : (item.short || item.tagline),
        frequency,
      }, qty, subscribe);
    }
    onAdded();
  }

  const drawer = (
    <React.Fragment>
      <div className="shop-quick-overlay" onClick={onClose} />
      <aside className="shop-quick-drawer" role="dialog" aria-label="Customize before adding">
        <div className="shop-drawer-head">
          <div>
            <div className="eyebrow">{isLegacy ? 'Dog Legacy Studio' : 'Shop product'}</div>
            <h2 className="h-display">{item.name}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
        </div>
        <div className="shop-drawer-body">
          <Placeholder label={item.image} tone={item.tone || 'sage'} aspect="4 / 3" />
          <p className="lede" style={{ fontSize: 16, margin: '16px 0 0' }}>{item.short || item.tagline}</p>

          <div className="shop-config-section">
            <label className="label">Dog name</label>
            <input className="input" value={dogName} onChange={e => setDogName(e.target.value)} placeholder="e.g. Luna" />
          </div>

          {isLegacy ? (
            <div className="shop-config-section">
              <label className="label">Keepsake option</label>
              <div className="quick-option-grid">
                {item.options.map(option => (
                  <button key={option.id} className={legacyOption.id === option.id ? 'active' : ''} onClick={() => setLegacyOptionId(option.id)}>
                    <strong>{option.name}</strong>
                    <span>{option.note}</span>
                    <em>${option.price}</em>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="shop-config-section">
            <label className="label">{isLegacy ? 'Story notes' : 'Use case or notes'}</label>
            <textarea className="textarea" rows="4" value={notes} onChange={e => setNotes(e.target.value)} placeholder={isLegacy ? 'Favorite routines, dates, phrases, or memories...' : 'Notes...'} />
          </div>
        </div>
        <div className="shop-drawer-foot">
          <div>
            <div className="small">{isLegacy ? `Personalized for ${dogLabel}` : 'One-time purchase'}</div>
            <strong>${(unitPrice * (isLegacy ? 1 : qty)).toFixed(2)}</strong>
          </div>
          <button className="btn btn-primary btn-lg" onClick={addConfigured}>Add to bag</button>
        </div>
      </aside>
    </React.Fragment>
  );

  return ReactDOM.createPortal(drawer, document.body);
}

function FilterGroup({ title, options, value, onChange }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h4 className="eyebrow" style={{ margin: '0 0 12px' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {options.map(([val, label]) => {
          const active = value === val;
          return (
            <button
              key={val}
              onClick={() => onChange(val)}
              style={{
                background: active ? 'var(--bg-sage)' : 'transparent',
                color: active ? 'var(--forest-deep)' : 'var(--ink-2)',
                border: 0,
                padding: '8px 12px',
                borderRadius: 8,
                textAlign: 'left',
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                cursor: 'default',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{label}</span>
              {active && <span style={{ color: 'var(--forest)' }}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { ShopPage, FilterGroup });
