// Checkout flow — 3 steps + confirmation

function CheckoutPage() {
  const { navigate, cart, clearCart } = React.useContext(AppCtx);
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '',
    shipping: 'standard',
    cardName: '', cardNumber: '', cardExp: '', cardCvc: '',
  });
  const [errors, setErrors] = React.useState({});

  const subtotal = cart.reduce((s, i) => s + (i.subscribe ? i.subPrice : i.price) * i.qty, 0);
  const shipping = data.shipping === 'express' ? 9.95 : (subtotal >= 35 ? 0 : 5.95);
  const tax = subtotal * 0.0825;
  const total = subtotal + shipping + tax;

  function validate(s) {
    const e = {};
    if (s >= 1) {
      if (!data.email.includes('@')) e.email = 'Valid email required';
    }
    if (s >= 2) {
      if (!data.firstName) e.firstName = 'Required';
      if (!data.lastName) e.lastName = 'Required';
      if (!data.address) e.address = 'Required';
      if (!data.city) e.city = 'Required';
      if (!data.state) e.state = 'Required';
      if (data.zip.length < 5) e.zip = 'Zip required';
    }
    if (s >= 3) {
      if (data.cardNumber.replace(/\s/g, '').length < 12) e.cardNumber = 'Card number incomplete';
      if (!data.cardExp.match(/^\d\d\/\d\d$/)) e.cardExp = 'MM/YY';
      if (data.cardCvc.length < 3) e.cardCvc = 'CVC';
    }
    return e;
  }

  function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(step + 1);
  }

  function placeOrder() {
    const e = validate(3);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setStep(4);
      setTimeout(() => clearCart(), 100);
    }
  }

  if (cart.length === 0 && step < 4) {
    return (
      <main className="page-fade">
        <section className="section center">
          <div className="wrap">
            <h1 className="h-display" style={{ fontSize: 36 }}>Nothing to check out.</h1>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('shop')}>Browse the shop</button>
          </div>
        </section>
      </main>
    );
  }

  if (step === 4) return <Confirmation />;

  return (
    <main className="page-fade">
      <div className="wrap" style={{ paddingTop: 32, paddingBottom: 8 }}>
        <a onClick={() => navigate('cart')} className="small" style={{ cursor: 'default' }}>← Back to cart</a>
        <h1 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', margin: '8px 0 24px' }}>Checkout</h1>
        <Stepper step={step} />
      </div>

      <section className="section-tight">
        <div className="wrap grid-aside" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 56, alignItems: 'flex-start' }}>
          <div className="card" style={{ padding: 32 }}>
            {step === 1 && <ContactStep data={data} setData={setData} errors={errors} />}
            {step === 2 && <ShippingStep data={data} setData={setData} errors={errors} />}
            {step === 3 && <PaymentStep data={data} setData={setData} errors={errors} />}
            <div className="row" style={{ marginTop: 24, justifyContent: 'space-between' }}>
              {step > 1 && <button className="btn btn-outline" onClick={() => setStep(step - 1)}>← Back</button>}
              <button
                className="btn btn-primary btn-lg"
                style={{ marginLeft: 'auto' }}
                onClick={step === 3 ? placeOrder : next}
              >
                {step === 3 ? `Pay $${total.toFixed(2)}` : 'Continue →'}
              </button>
            </div>

            {/* CHECKOUT UPSELL */}
            <div style={{ marginTop: 36, paddingTop: 28, borderTop: '1px dashed var(--line)' }}>
              <div className="row" style={{ gap: 10, marginBottom: 14 }}>
                <span className="pill gold">★ Add &amp; save</span>
                <span className="small">Add one of these to your order before checking out — same shipment, 60-second decision.</span>
              </div>
              <UpsellRow title="Frequently added at checkout" compact />
            </div>
          </div>
          <OrderSummary cart={cart} subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
        </div>
      </section>
    </main>
  );
}

function Stepper({ step }) {
  const steps = [['1', 'Contact'], ['2', 'Shipping'], ['3', 'Payment']];
  return (
    <div className="row" style={{ gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
      {steps.map(([n, label], i) => {
        const num = parseInt(n);
        const done = step > num;
        const active = step === num;
        return (
          <React.Fragment key={n}>
            <div className="row" style={{ gap: 10 }}>
              <span style={{
                width: 28, height: 28, borderRadius: 999,
                background: done || active ? 'var(--forest)' : 'transparent',
                color: done || active ? '#fff' : 'var(--ink-3)',
                border: done || active ? 0 : '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600,
              }}>{done ? '✓' : n}</span>
              <span style={{ fontSize: 14, color: active ? 'var(--ink)' : 'var(--ink-3)', fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
            {i < steps.length - 1 && <span style={{ width: 30, height: 1, background: 'var(--line)' }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function FormField({ label, error, children, span = 12 }) {
  return (
    <div style={{ gridColumn: `span ${span}` }}>
      <label className="label">{label}</label>
      {children}
      {error && <div style={{ fontSize: 12, color: '#9a3a1f', marginTop: 4 }}>{error}</div>}
    </div>
  );
}

function ContactStep({ data, setData, errors }) {
  return (
    <div>
      <h2 className="h-display" style={{ fontSize: 24, margin: '0 0 6px' }}>Contact</h2>
      <p className="small">We'll send order updates here.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14, marginTop: 20 }}>
        <FormField label="Email" error={errors.email}>
          <input className="input" type="email" value={data.email} placeholder="you@email.com" onChange={e => setData({ ...data, email: e.target.value })} />
        </FormField>
        <FormField label="Phone (optional)">
          <input className="input" value={data.phone || ''} placeholder="(555) 123-4567" onChange={e => setData({ ...data, phone: e.target.value })} />
        </FormField>
        <div style={{ gridColumn: 'span 12', display: 'flex', gap: 10, alignItems: 'center', marginTop: 4 }}>
          <input type="checkbox" id="news" defaultChecked />
          <label htmlFor="news" className="small">Email me studio updates and stories of dogs remembered.</label>
        </div>
      </div>
    </div>
  );
}

function ShippingStep({ data, setData, errors }) {
  return (
    <div>
      <h2 className="h-display" style={{ fontSize: 24, margin: '0 0 6px' }}>Shipping address</h2>
      <p className="small">We ship within the US in 100% recycled mailers.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14, marginTop: 20 }}>
        <FormField label="First name" error={errors.firstName} span={6}>
          <input className="input" value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} />
        </FormField>
        <FormField label="Last name" error={errors.lastName} span={6}>
          <input className="input" value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} />
        </FormField>
        <FormField label="Address" error={errors.address} span={12}>
          <input className="input" placeholder="123 Main St" value={data.address} onChange={e => setData({ ...data, address: e.target.value })} />
        </FormField>
        <FormField label="City" error={errors.city} span={5}>
          <input className="input" value={data.city} onChange={e => setData({ ...data, city: e.target.value })} />
        </FormField>
        <FormField label="State" error={errors.state} span={3}>
          <input className="input" value={data.state} onChange={e => setData({ ...data, state: e.target.value })} />
        </FormField>
        <FormField label="Zip" error={errors.zip} span={4}>
          <input className="input" inputMode="numeric" value={data.zip} onChange={e => setData({ ...data, zip: e.target.value.slice(0, 5) })} />
        </FormField>
        <div style={{ gridColumn: 'span 12', marginTop: 8 }}>
          <label className="label">Shipping method</label>
          {[
            { id: 'standard', t: 'Standard', sub: '5–7 business days', price: 'Free over $35' },
            { id: 'express', t: 'Express', sub: '2–3 business days', price: '$9.95' },
          ].map(s => {
            const active = data.shipping === s.id;
            return (
              <button key={s.id} type="button" onClick={() => setData({ ...data, shipping: s.id })}
                style={{
                  width: '100%', textAlign: 'left', padding: 14, borderRadius: 10,
                  background: active ? '#fff' : 'transparent',
                  border: active ? '2px solid var(--forest)' : '1px solid var(--line)',
                  marginBottom: 8, cursor: 'default',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                <span>
                  <strong>{s.t}</strong>
                  <span className="small" style={{ marginLeft: 8 }}>{s.sub}</span>
                </span>
                <span style={{ fontWeight: 600 }}>{s.price}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PaymentStep({ data, setData, errors }) {
  function formatCard(v) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
  }
  function formatExp(v) {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length < 3) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
  }
  return (
    <div>
      <h2 className="h-display" style={{ fontSize: 24, margin: '0 0 6px' }}>Payment</h2>
      <p className="small">🔒 Encrypted in transit. We never store card numbers.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14, marginTop: 20 }}>
        <FormField label="Name on card" span={12}>
          <input className="input" value={data.cardName} onChange={e => setData({ ...data, cardName: e.target.value })} />
        </FormField>
        <FormField label="Card number" error={errors.cardNumber} span={12}>
          <input
            className="input"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            value={data.cardNumber}
            onChange={e => setData({ ...data, cardNumber: formatCard(e.target.value) })}
          />
        </FormField>
        <FormField label="Expiration" error={errors.cardExp} span={6}>
          <input className="input" placeholder="MM/YY" value={data.cardExp} onChange={e => setData({ ...data, cardExp: formatExp(e.target.value) })} />
        </FormField>
        <FormField label="CVC" error={errors.cardCvc} span={6}>
          <input className="input" inputMode="numeric" placeholder="123" value={data.cardCvc} onChange={e => setData({ ...data, cardCvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
        </FormField>
      </div>
    </div>
  );
}

function OrderSummary({ cart, subtotal, shipping, tax, total }) {
  return (
    <aside className="card" style={{ padding: 24, position: 'sticky', top: 92 }}>
      <h3 className="h-display" style={{ fontSize: 20, margin: '0 0 16px' }}>Order summary</h3>
      <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
        {cart.map(i => (
          <div key={i.id + (i.subscribe ? '-sub' : '')} className="row" style={{ gap: 12 }}>
            <Placeholder label="" tone={i.tone || 'sage'} aspect="1 / 1" style={{ width: 56, height: 56, borderRadius: 8 }} />
            <div style={{ flex: 1, fontSize: 13 }}>
              <div style={{ fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: i.name }} />
              <div className="small">Qty {i.qty} {i.subscribe && '· Subscribe'}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>${((i.subscribe ? i.subPrice : i.price) * i.qty).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="col" style={{ gap: 6, marginTop: 12 }}>
        <Line label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        <Line label="Shipping" value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`} />
        <Line label="Tax (est.)" value={`$${tax.toFixed(2)}`} />
      </div>
      <div className="divider" style={{ margin: '12px 0' }} />
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 600 }}>Total</span>
        <span style={{ fontWeight: 700, fontSize: 22 }}>${total.toFixed(2)}</span>
      </div>
    </aside>
  );
}

function Line({ label, value }) {
  return <div className="row" style={{ justifyContent: 'space-between' }}>
    <span className="small">{label}</span>
    <span className="small" style={{ color: 'var(--ink)' }}>{value}</span>
  </div>;
}

function Confirmation() {
  const { navigate } = React.useContext(AppCtx);
  const orderNum = 'FF-' + Math.floor(Math.random() * 90000 + 10000);
  return (
    <main className="page-fade">
      <section className="section">
        <div className="wrap center" style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--bg-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2"><path d="M5 12l4 4 10-10" /></svg>
          </div>
          <span className="eyebrow">Order {orderNum}</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 64px)', margin: '14px 0 16px' }}>
            Order placed. <span className="h-italic">Tails are wagging.</span>
          </h1>
          <p className="lede" style={{ margin: '0 auto 28px' }}>
            We've sent a confirmation email with your order details. A designer from our studio will be in touch within 24 hours to begin your keepsake.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('home')}>Back to home</button>
            <button className="btn btn-outline" onClick={() => navigate('shop')}>Keep shopping</button>
          </div>
          <div className="card-sage" style={{ padding: 24, marginTop: 48, borderRadius: 14, textAlign: 'left' }}>
            <h3 className="h-display" style={{ fontSize: 20, margin: '0 0 8px' }}>While you wait —</h3>
            <p className="small" style={{ color: 'var(--ink-2)', margin: 0 }}>
              Read the Field Journal for stories and guidance, or follow <strong>@everafterpaw</strong> on Instagram to see the work we've done.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { CheckoutPage });
