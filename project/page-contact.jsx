// Contact page

function ContactPage() {
  const [form, setForm] = React.useState({ name: '', email: '', subject: 'General question', message: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  function submit(e) {
    e.preventDefault();
    const err = {};
    if (!form.name) err.name = 'Required';
    if (!form.email.includes('@')) err.email = 'Valid email required';
    if (form.message.length < 10) err.message = 'Tell us a bit more (10+ chars)';
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  }

  return (
    <main className="page-fade">
      <section style={{ background: 'var(--bg-cream)', padding: '64px 0 48px' }}>
        <div className="wrap">
          <span className="pill">Contact</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 76px)', margin: '14px 0 12px' }}>
            We'd love to <span className="h-italic">hear from you.</span>
          </h1>
          <p className="lede" style={{ margin: 0 }}>
            Questions, suggestions, dog photos, dog stories — they all land in the same inbox, and we read every one.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-split" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'flex-start' }}>
          {/* FORM */}
          <div className="card" style={{ padding: 32 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--bg-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2"><path d="M5 12l4 4 10-10" /></svg>
                </div>
                <h2 className="h-display" style={{ fontSize: 28, margin: '0 0 12px' }}>Got it — thanks {form.name.split(' ')[0]}.</h2>
                <p className="lede" style={{ margin: '0 auto 16px', maxWidth: 420 }}>
                  We'll get back to you within 24–48 hours, usually faster. Keep an eye on <strong>{form.email}</strong>.
                </p>
                <button className="btn btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'General question', message: '' }); }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2 className="h-display" style={{ fontSize: 26, margin: '0 0 6px' }}>Send us a note</h2>
                <p className="small" style={{ marginBottom: 20 }}>We respond within 24–48 hours.</p>

                <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <FormField label="Name" error={errors.name}>
                    <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </FormField>
                  <FormField label="Email" error={errors.email}>
                    <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                  </FormField>
                </div>

                <FormField label="Subject">
                  <select className="select" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option>General question</option>
                    <option>Order support</option>
                    <option>Subscription help</option>
                    <option>Wholesale inquiry</option>
                    <option>Press &amp; partnerships</option>
                    <option>Something else</option>
                  </select>
                </FormField>

                <FormField label="Message" error={errors.message}>
                  <textarea className="textarea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your dog, your order, or whatever's on your mind…" rows={6} />
                </FormField>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }}>Send message →</button>
                <p className="small" style={{ textAlign: 'center', marginTop: 14, color: 'var(--ink-3)' }}>
                  By submitting, you agree to our Privacy Policy. We never share your info.
                </p>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <aside style={{ display: 'grid', gap: 16 }}>
            <div className="card-sage" style={{ padding: 24, borderRadius: 14 }}>
              <div className="eyebrow">Email us</div>
              <a className="h-display" style={{ display: 'block', fontSize: 22, margin: '8px 0 4px', color: 'var(--forest)' }}>hello@fieldandfur.co</a>
              <p className="small" style={{ margin: 0 }}>For press: press@fieldandfur.co</p>
            </div>

            <div className="card-cream" style={{ padding: 24, borderRadius: 14 }}>
              <div className="eyebrow">Mailing address</div>
              <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.6 }}>
                Paw Apothecary<br />
                PO Box 142<br />
                Rhinebeck, NY 12572
              </p>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div className="eyebrow">Response time</div>
              <p style={{ margin: '8px 0 12px', fontSize: 14 }}>
                We answer every message within <strong>24–48 hours</strong>, Monday through Friday.
              </p>
              <div className="row" style={{ gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: '#3aa55c' }} />
                <span className="small">Currently online · ~3 hour avg. response today</span>
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Follow along</div>
              <div className="row" style={{ gap: 10 }}>
                {['Instagram', 'TikTok', 'Facebook', 'Pinterest', 'YouTube'].map(s => (
                  <a key={s} className="icon-btn" style={{ width: 38, height: 38, border: '1px solid var(--line)', background: '#fff' }} title={s}>
                    <SocialIcon name={s} />
                  </a>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Quick links</div>
              <div className="col" style={{ gap: 6 }}>
                {['Shipping & returns', 'Subscription FAQ', 'Ingredient list', 'Vet partnership program', 'Wholesale'].map(x => (
                  <a key={x} className="small" style={{ cursor: 'default', color: 'var(--ink-2)' }}>→ {x}</a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ContactPage });
