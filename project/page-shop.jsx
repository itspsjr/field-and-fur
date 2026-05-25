// Shop page with real filtering + sorting

function ShopPage() {
  const { navigate, addToCart, openMiniCart } = React.useContext(AppCtx);
  const [filters, setFilters] = React.useState({ category: 'all', size: 'all', skin: 'all' });
  const [sort, setSort] = React.useState('bestselling');
  const [quickShop, setQuickShop] = React.useState(null);

  const filtered = React.useMemo(() => {
    const all = PRODUCTS.concat(UPSELLS);
    let list = all.filter(p =>
      (filters.category === 'all' || p.category.toLowerCase() === filters.category) &&
      (filters.size === 'all' || p.size === filters.size || p.size === 'all') &&
      (filters.skin === 'all' || p.skin === filters.skin || p.skin === 'all')
    );
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'newest') list = [...list].sort((a, b) => (b.newest ? 1 : 0) - (a.newest ? 1 : 0));
    if (sort === 'bestselling') list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [filters, sort]);

  const totalProducts = PRODUCTS.length + UPSELLS.length;
  const CATEGORIES = ['all', 'shop'];
  const SIZES = [['all', 'All sizes'], ['small', 'Small / Puppy'], ['large', 'Medium & Large']];
  const SKIN = [['all', 'All skin'], ['sensitive', 'Sensitive'], ['normal', 'Normal']];

  return (
    <main className="page-fade">
      {/* PAGE HEADER */}
      <section style={{ background: 'var(--bg-cream)', padding: '64px 0 48px' }}>
        <div className="wrap">
          <div className="eyebrow">PawApothecary shop · {filtered.length} {filtered.length === 1 ? 'product' : 'products'}</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '12px 0 8px' }}>
            Shop by collection, not by bundle.
          </h1>
          <p className="lede" style={{ margin: 0 }}>
            Dog wipes, dental water, and Legacy Studio each serve a different moment. Browse everyday grooming products here, then visit Legacy Studio only when remembrance is what you need.
          </p>
        </div>
      </section>

      {/* SHOP GRID + FILTERS */}
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 56, alignItems: 'flex-start' }}>
          {/* FILTERS */}
          <aside style={{ position: 'sticky', top: 92 }}>
            <FilterGroup
              title="Category"
              options={CATEGORIES.map(c => [c, c[0].toUpperCase() + c.slice(1)])}
              value={filters.category}
              onChange={v => setFilters({ ...filters, category: v })}
            />
            <FilterGroup
              title="Dog size"
              options={SIZES}
              value={filters.size}
              onChange={v => setFilters({ ...filters, size: v })}
            />
            <FilterGroup
              title="Skin type"
              options={SKIN}
              value={filters.skin}
              onChange={v => setFilters({ ...filters, skin: v })}
            />
            <button
              className="btn btn-ghost btn-sm"
              style={{ marginTop: 8, paddingInline: 4 }}
              onClick={() => setFilters({ category: 'all', size: 'all', skin: 'all' })}
            >
              ↺ Reset filters
            </button>
          </aside>

          {/* PRODUCTS */}
          <div>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
              <div className="small">{filtered.length} of {totalProducts} Shop products</div>
              <div className="row" style={{ gap: 10 }}>
                <label className="small mono" htmlFor="sort">SORT BY</label>
                <select id="sort" className="select" style={{ width: 180, height: 38 }} value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="bestselling">Bestselling</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to high</option>
                  <option value="price-desc">Price: High to low</option>
                </select>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="card" style={{ padding: 48, textAlign: 'center' }}>
                <p className="h-display" style={{ fontSize: 24, margin: 0 }}>No products match.</p>
                <p className="muted" style={{ marginTop: 8 }}>Try resetting your filters.</p>
              </div>
            ) : (
              <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onClick={() => setQuickShop({ type: 'product', item: p })} />
                ))}
              </div>
            )}

            <div className="legacy-shop-block">
              <div className="row" style={{ justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', marginBottom: 22 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>Dog Legacy Studio</div>
                  <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: 0 }}>For the dog whose story continues after goodbye.</h2>
                </div>
                <button className="btn btn-ghost" onClick={() => navigate('legacy')}>View all services →</button>
              </div>
              <div className="legacy-shop-grid">
                {LEGACY_SERVICES.slice(0, 3).map(service => {
                  const option = service.options[0];
                  return (
                    <article key={service.id} className="card" style={{ padding: 18 }}>
                      <Placeholder label={service.image} tone={service.tone} aspect="4 / 3" style={{ marginBottom: 16 }} />
                      <div className="row" style={{ justifyContent: 'space-between', gap: 14 }}>
                        <h3 className="h-display" style={{ fontSize: 22, margin: 0 }}>{service.name}</h3>
                        <strong>${option.price}</strong>
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
          ) : (
            <React.Fragment>
              <div className="shop-config-section">
                <label className="label">Purchase option</label>
                <div className="quick-option-grid two">
                  <button className={!subscribe ? 'active' : ''} onClick={() => setSubscribe(false)}>
                    <strong>One-time</strong>
                    <span>Ships once</span>
                    <em>${item.price.toFixed(2)}</em>
                  </button>
                  <button className={subscribe ? 'active' : ''} onClick={() => setSubscribe(true)}>
                    <strong>Subscribe</strong>
                    <span>Save 15%</span>
                    <em>${item.subPrice.toFixed(2)}</em>
                  </button>
                </div>
              </div>
              {subscribe && (
                <div className="shop-config-section">
                  <label className="label">Delivery frequency</label>
                  <div className="quick-segments">
                    {[4, 6, 8].map(w => <button key={w} className={frequency === w ? 'active' : ''} onClick={() => setFrequency(w)}>{w} weeks</button>)}
                  </div>
                </div>
              )}
              <div className="shop-config-section">
                <label className="label">Quantity</label>
                <div className="quick-qty">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                  <span className="mono">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>
            </React.Fragment>
          )}

          <div className="shop-config-section">
            <label className="label">{isLegacy ? 'Story notes' : 'Use case or notes'}</label>
            <textarea className="textarea" rows="4" value={notes} onChange={e => setNotes(e.target.value)} placeholder={isLegacy ? 'Favorite routines, dates, phrases, or memories...' : 'Sensitive skin, muddy walks, breath care schedule...'} />
          </div>
        </div>
        <div className="shop-drawer-foot">
          <div>
            <div className="small">{isLegacy ? `Personalized for ${dogLabel}` : subscribe ? `Ships every ${frequency} weeks` : 'One-time purchase'}</div>
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
