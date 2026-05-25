// Cart page

function CartPage() {
  const { navigate, cart, updateCart, removeFromCart } = React.useContext(AppCtx);

  if (cart.length === 0) {
    return (
      <main className="page-fade">
        <section className="section">
          <div className="wrap center" style={{ maxWidth: 520, margin: '0 auto', paddingTop: 60, paddingBottom: 60 }}>
            <Placeholder label="empty canister" tone="sage" aspect="1 / 1" style={{ maxWidth: 200, margin: '0 auto 24px' }} />
            <h1 className="h-display" style={{ fontSize: 40, margin: '0 0 12px' }}>Your cart is <span className="h-italic">empty.</span></h1>
            <p className="lede" style={{ margin: '0 auto 24px' }}>Nothing in the bag yet — let's fix that.</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('shop')}>Browse the line</button>
          </div>
        </section>
      </main>
    );
  }

  const subtotal = cart.reduce((s, i) => s + (i.subscribe ? i.subPrice : i.price) * i.qty, 0);
  const shipping = subtotal >= 35 ? 0 : 5.95;
  const total = subtotal + shipping;

  return (
    <main className="page-fade">
      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 16 }}>
        <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: '0 0 8px' }}>Your cart</h1>
        <p className="muted">{cart.reduce((s, i) => s + i.qty, 0)} item(s)</p>
      </div>

      <section className="section-tight">
        <div className="wrap grid-aside" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 56, alignItems: 'flex-start' }}>
          {/* LINES */}
          <div style={{ display: 'grid', gap: 14 }}>
            {cart.map(item => (
              <div key={item.id + (item.subscribe ? '-sub' : '')} className="card" style={{ padding: 18, display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 18, alignItems: 'center' }}>
                <Placeholder label={item.image} tone={item.tone || 'sage'} aspect="1 / 1" style={{ borderRadius: 10 }} />
                <div>
                  <div className="row" style={{ gap: 10 }}>
                    <h3 className="h-display" style={{ fontSize: 20, margin: 0 }} dangerouslySetInnerHTML={{ __html: item.name }} />
                  </div>
                  {item.subscribe && <span className="pill gold" style={{ marginTop: 6 }}>SUBSCRIBE · SHIPS MONTHLY</span>}
                  <div className="row" style={{ marginTop: 12, gap: 14 }}>
                    <QtyStepper value={item.qty} onChange={(v) => updateCart(item, v)} />
                    <button className="btn btn-ghost btn-sm" onClick={() => removeFromCart(item)}>Remove</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>${((item.subscribe ? item.subPrice : item.price) * item.qty).toFixed(2)}</div>
                  <div className="small">${(item.subscribe ? item.subPrice : item.price).toFixed(2)} each</div>
                </div>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => navigate('shop')}>← Continue shopping</button>

            {/* UPSELLS */}
            <div style={{ marginTop: 24 }}>
              <UpsellRow title="Pairs well with your bag" />
            </div>
          </div>

          {/* SUMMARY */}
          <aside className="card" style={{ padding: 24, position: 'sticky', top: 92 }}>
            <h3 className="h-display" style={{ fontSize: 22, margin: '0 0 16px' }}>Order summary</h3>
            <div className="row" style={{ justifyContent: 'space-between', padding: '6px 0' }}>
              <span className="small">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="row" style={{ justifyContent: 'space-between', padding: '6px 0' }}>
              <span className="small">Shipping {subtotal >= 35 && <span className="pill" style={{ marginLeft: 4, fontSize: 9.5 }}>FREE</span>}</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {subtotal < 35 && (
              <div className="card-sage" style={{ padding: 12, borderRadius: 8, marginTop: 12, fontSize: 13 }}>
                Add ${(35 - subtotal).toFixed(2)} more for <strong>free shipping</strong>.
                <div style={{ marginTop: 8, height: 6, background: 'rgba(0,0,0,.08)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (subtotal / 35) * 100)}%`, height: '100%', background: 'var(--forest)' }} />
                </div>
              </div>
            )}
            <div className="divider" style={{ margin: '14px 0' }} />
            <div className="row" style={{ justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ fontWeight: 600 }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: 22 }}>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 14 }} onClick={() => navigate('checkout')}>
              Checkout →
            </button>
            <div className="small center" style={{ marginTop: 14, color: 'var(--ink-3)' }}>
              🔒 Secure checkout · 30-day money-back guarantee
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { CartPage });
