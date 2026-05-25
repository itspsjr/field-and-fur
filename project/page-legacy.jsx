// Dog Legacy Studio services, adapted into the Field & Fur site system

const LEGACY_SERVICES = [
  {
    id: 'memorial-book',
    name: 'Dog Memorial Book',
    tagline: 'A hardcover keepsake of their whole story',
    price: 89,
    range: '$89-149',
    timing: 'Digital proof in 24 hours · print in 7-10 days',
    badge: 'Most loved',
    tone: 'forest',
    image: 'linen memorial book · archival pages',
    short: 'A linen-bound album of photos, stories, and the small details only your family remembers.',
    details: ['24, 40, or 60 pages', 'Linen or premium cover', 'Two design revisions included'],
    options: [
      { id: 'digital', name: 'Digital proof + PDF', price: 89, note: '24-page designed keepsake PDF' },
      { id: 'linen', name: 'Linen hardcover', price: 119, note: '40 pages, foil-stamped cover' },
      { id: 'premium', name: 'Premium hardcover', price: 149, note: '60 pages, premium cover and gift box' },
    ],
  },
  {
    id: 'tribute-art',
    name: 'Tribute Wall Art',
    tagline: 'A framed portrait, dated and signed',
    price: 65,
    range: '$65-195',
    timing: 'Digital in 24 hours · framed in 5-8 days',
    badge: 'Gallery quality',
    tone: 'sage',
    image: 'framed dog portrait · quiet caption',
    short: 'Museum-quality framed portraits with their name, dates, and one gentle line of copy.',
    details: ['Digital print file', '11x14 or 16x20 framed', 'Solid wood frame options'],
    options: [
      { id: 'digital', name: 'Digital print file', price: 65, note: 'High-resolution file, ready to print' },
      { id: 'framed-11', name: '11x14 framed print', price: 125, note: 'Solid wood frame and mat' },
      { id: 'gallery-16', name: '16x20 gallery frame', price: 195, note: 'Larger frame, premium paper' },
    ],
  },
  {
    id: 'letter',
    name: 'A Letter From Your Dog',
    tagline: 'In their voice, on heirloom paper',
    price: 39,
    range: '$39-65',
    timing: 'Digital in 48 hours · mailed in 5-7 days',
    badge: 'Heartfelt',
    tone: 'gold',
    image: 'cotton paper letter · wax seal',
    short: 'A carefully written letter in their voice, printed on cotton paper and sealed by hand.',
    details: ['Digital or printed letter', 'Deckled cotton paper', 'Wax-sealed envelope'],
    options: [
      { id: 'digital', name: 'Digital letter', price: 39, note: 'Delivered as a designed PDF' },
      { id: 'cotton', name: 'Cotton paper letter', price: 55, note: 'Printed on deckled heirloom paper' },
      { id: 'sealed', name: 'Wax-sealed envelope', price: 65, note: 'Printed, folded, sealed, and mailed' },
    ],
  },
  {
    id: 'tribute-page',
    name: 'Dog Tribute Page',
    tagline: 'A private dog memorial they live on inside',
    price: 49,
    range: '$49-89',
    timing: 'Live in 24 hours',
    badge: 'Shareable',
    tone: 'cream',
    image: 'private dog memorial page · guestbook',
    short: 'A private dog tribute page with photos, video, a guestbook, and a QR card for family and friends.',
    details: ['Lifetime private dog page', 'Guestbook memories', 'Optional printed QR card'],
    options: [
      { id: 'page', name: 'Private dog tribute page', price: 49, note: 'Photos, story, and guestbook' },
      { id: 'qr-card', name: 'Page + QR card', price: 69, note: 'Printed card for services or family' },
      { id: 'bookmark', name: 'Page + memorial bookmark', price: 89, note: 'Printed QR bookmark set' },
    ],
  },
  {
    id: 'sympathy-bundle',
    name: 'Dog Loss Sympathy Bundle',
    tagline: 'For someone whose heart just broke',
    price: 119,
    range: '$119-189',
    timing: 'Ships in 7 days',
    badge: 'Gift',
    tone: 'sage',
    image: 'keepsake gift box · candle · card',
    short: 'A thoughtful gift box with a personalized note, small portrait, candle, and keepsake card.',
    details: ['Direct-to-recipient shipping', 'Handwritten sender note', 'Optional hardcover upgrade'],
    options: [
      { id: 'standard', name: 'Standard sympathy box', price: 119, note: 'Portrait, candle, and handwritten card' },
      { id: 'premium', name: 'Premium sympathy box', price: 159, note: 'Adds cotton letter and framed mini print' },
      { id: 'book', name: 'Bundle + memorial book', price: 189, note: 'Adds a starter memorial book proof' },
    ],
  },
  {
    id: 'life-story',
    name: 'Dog Life Story Book',
    tagline: 'A celebration, not a goodbye',
    price: 79,
    range: '$79-139',
    timing: 'Digital proof in 24 hours',
    badge: 'Celebrate now',
    tone: 'forest',
    image: 'joyful life story book · favorite walks',
    short: 'A brighter album for adoption days, golden years, and dogs whose story is still unfolding.',
    details: ['Playful story spreads', 'Digital or hardcover', 'Great for birthdays and gotcha days'],
    options: [
      { id: 'digital', name: 'Digital celebration book', price: 79, note: '24-page designed PDF' },
      { id: 'hardcover', name: 'Hardcover life story', price: 109, note: '40 pages, playful layout' },
      { id: 'premium', name: 'Premium life story', price: 139, note: '60 pages with milestone spreads' },
    ],
  },
];

const LEGACY_PERSONALIZATION = {
  'memorial-book': {
    nameLabel: "Dog's name",
    taglineLabel: 'Subtitle',
    defaultName: 'Bella',
    defaultTagline: 'A Life Well Loved',
    themes: ['Soft & comforting', 'Classic & elegant', 'Celebration of life'],
    finishes: ['plum', 'rose', 'cream', 'charcoal', 'sage', 'taupe'],
    subjects: ['dog', 'paw'],
    dedicationLabel: 'Dedication',
    dedicationPlaceholder: 'A few words about who they were...',
    defaultDedication: 'For Bella — our shadow, our comfort, the best girl we ever knew.',
    photoHint: '12+ photos recommended',
  },
  'tribute-art': {
    nameLabel: "Dog's name",
    taglineLabel: 'Dates',
    defaultName: 'Bella',
    defaultTagline: '2014 — 2024',
    themes: ['Single portrait', 'Contact-sheet of nine', 'Paw silhouette'],
    finishes: ['plum', 'taupe', 'cream', 'charcoal', 'sage', 'rose'],
    subjects: ['dog', 'paw'],
    dedicationLabel: 'Caption',
    dedicationPlaceholder: 'A short caption to print under the portrait',
    defaultDedication: 'A good girl, every day of her life.',
    photoHint: '1 best portrait required',
  },
  letter: {
    nameLabel: "Dog's name",
    taglineLabel: 'Signed as',
    defaultName: 'Bella',
    defaultTagline: 'Your Bella',
    themes: ['Heartfelt & warm', 'Gentle & quiet', 'Playful & bright'],
    finishes: ['rose', 'cream', 'plum', 'taupe', 'sage'],
    subjects: ['dog'],
    dedicationLabel: 'Tell us about them',
    dedicationPlaceholder: 'Habits, voice, what they loved. We craft the letter.',
    defaultDedication: 'Bella loved the morning walk before anyone else was awake.',
    photoHint: '3+ photos recommended',
  },
  'tribute-page': {
    nameLabel: "Dog's name",
    taglineLabel: 'Dates',
    defaultName: 'Bella',
    defaultTagline: '2014 — 2024',
    themes: ['Quiet & minimal', 'Warm & full', 'Photo-led'],
    finishes: ['plum', 'cream', 'rose', 'sage', 'taupe', 'charcoal'],
    subjects: ['dog', 'paw'],
    dedicationLabel: 'Opening words',
    dedicationPlaceholder: 'A few opening words for the page...',
    defaultDedication: 'For Bella — our girl, our shadow. The people who loved her are welcome here.',
    photoHint: '6-30 photos for the gallery',
  },
  'sympathy-bundle': {
    nameLabel: "Their dog's name",
    taglineLabel: 'Recipient name',
    defaultName: 'Murphy',
    defaultTagline: 'Sarah',
    themes: ['Linen box · standard', 'Linen box · premium', 'Direct-to-recipient'],
    finishes: ['sage', 'cream', 'taupe', 'rose', 'plum'],
    subjects: ['dog'],
    dedicationLabel: 'Your note to the recipient',
    dedicationPlaceholder: 'A short note from you, printed on a card inside the box.',
    defaultDedication: "I'm thinking of you. Murphy was loved. So are you.",
    photoHint: '1-6 photos optional',
  },
  'life-story': {
    nameLabel: "Dog's name",
    taglineLabel: 'Subtitle',
    defaultName: 'Murphy',
    defaultTagline: 'A Life of Treats',
    themes: ['Bright & playful', 'Adoption anniversary', 'Senior years'],
    finishes: ['cream', 'rose', 'sage', 'plum', 'taupe', 'sky'],
    subjects: ['dog', 'paw'],
    dedicationLabel: 'Celebration message',
    dedicationPlaceholder: 'Your celebration message...',
    defaultDedication: 'For Murphy — eight years of zoomies, sock theft, and the loudest possible love.',
    photoHint: '12+ photos recommended',
  },
};

const LEGACY_SWATCHES = {
  plum: '#5b4573',
  rose: '#d6a1a0',
  cream: '#f5f1e8',
  charcoal: '#2f2928',
  sage: '#8aa384',
  taupe: '#b6a799',
  sky: '#aebfd1',
};

function createLegacyPersonalizationState() {
  return Object.fromEntries(LEGACY_SERVICES.map(service => {
    const cfg = LEGACY_PERSONALIZATION[service.id];
    return [service.id, {
      name: cfg.defaultName,
      tagline: cfg.defaultTagline,
      theme: cfg.themes[0],
      finish: cfg.finishes[0],
      subject: cfg.subjects[0],
      dedication: cfg.defaultDedication,
      photoCount: 6,
    }];
  }));
}

function legacyServiceToCartItem(service, option) {
  return {
    id: `legacy-${service.id}-${option.id}`,
    name: `${service.name} — ${option.name}`,
    tagline: service.tagline,
    price: option.price,
    subPrice: option.price,
    category: 'Legacy Studio',
    size: 'all',
    skin: 'all',
    rating: 4.94,
    reviews: 2847,
    image: service.image,
    tone: service.tone,
    badge: service.badge,
    short: option.note,
    legacy: true,
  };
}

function legacyServiceToCartItemWithPersonalization(service, option, personalization) {
  const base = legacyServiceToCartItem(service, option);
  return {
    ...base,
    id: `${base.id}-${personalization.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'custom'}`,
    name: `${service.name} — ${option.name} for ${personalization.name || 'your dog'}`,
    short: `${option.note} · ${personalization.theme} · ${personalization.finish} · ${personalization.photoCount} photos`,
    personalization,
  };
}

function LegacyServicesPage() {
  const { navigate, addToCart, openMiniCart } = React.useContext(AppCtx);
  const [selected, setSelected] = React.useState(LEGACY_SERVICES[0]);
  const [selectedOptions, setSelectedOptions] = React.useState(() => (
    Object.fromEntries(LEGACY_SERVICES.map(service => [service.id, service.options[0].id]))
  ));
  const [personalization, setPersonalization] = React.useState(createLegacyPersonalizationState);
  const [proofOpen, setProofOpen] = React.useState(false);

  function selectedOptionFor(service) {
    return service.options.find(option => option.id === selectedOptions[service.id]) || service.options[0];
  }

  function setOption(service, option) {
    setSelected(service);
    setSelectedOptions(prev => ({ ...prev, [service.id]: option.id }));
  }

  function addService(service, option = selectedOptionFor(service), buyNow = false) {
    setSelected(service);
    addToCart(legacyServiceToCartItemWithPersonalization(service, option, personalization[service.id]), 1, false);
    if (buyNow) {
      navigate('cart');
    } else {
      openMiniCart();
    }
  }

  const selectedOption = selectedOptionFor(selected);
  const selectedPersonalization = personalization[selected.id];
  const selectedConfig = LEGACY_PERSONALIZATION[selected.id];
  function updatePersonalization(serviceId, patch) {
    setPersonalization(prev => ({ ...prev, [serviceId]: { ...prev[serviceId], ...patch } }));
  }

  return (
    <main className="page-fade">
      <section style={{ background: 'var(--bg-cream)', overflow: 'hidden' }}>
        <div className="wrap grid-split legacy-hero">
          <div>
            <span className="pill gold">Dog Legacy Studio · by Field &amp; Fur</span>
            <h1 className="h-display legacy-title">
              Keepsakes for the dogs who were <span className="h-italic" style={{ color: 'var(--forest)' }}>never just dogs.</span>
            </h1>
            <p className="lede" style={{ fontSize: 19, maxWidth: 620 }}>
              Legacy Studio is a separate remembrance service for dog families: memorial books, tribute art, letters, private pages, and sympathy gifts after goodbye.
            </p>
            <div className="row" style={{ marginTop: 30, gap: 14, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => addService(selected)}>Add {selectedOption.name} — ${selectedOption.price}</button>
              <button className="btn btn-outline btn-lg" onClick={() => setProofOpen(true)}>View proof experience</button>
            </div>
            <div className="row legacy-trust">
              <div><strong>4.94</strong><span className="small">2,847 tribute reviews</span></div>
              <div><strong>24-48h</strong><span className="small">first digital proof</span></div>
              <div><strong>1%</strong><span className="small">to ASPCA from every order</span></div>
            </div>
          </div>
          <LegacyBookScene service={selected} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeader
            eyebrow="Legacy services"
            title="Dog keepsakes for the bond that outlives the routine."
            lede="Legacy Studio is a separate remembrance service — for photos, dates, routines, and stories when a dog’s life is ready to be honored."
            action={<button className="btn btn-ghost" onClick={() => navigate('contact')}>Ask the studio →</button>}
          />
          <div className="legacy-grid">
            {LEGACY_SERVICES.map(service => (
              <LegacyServiceCard
                key={service.id}
                service={service}
                active={selected.id === service.id}
                onSelect={() => setSelected(service)}
                selectedOption={selectedOptionFor(service)}
                onOption={(option) => setOption(service, option)}
                onStart={(option) => addService(service, option)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-sage)' }}>
        <div className="wrap grid-split legacy-pdp">
          <div className="card-sage legacy-detail-art">
            <LegacyBookScene service={selected} compact />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Featured service</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(34px, 5vw, 58px)', margin: 0 }}>{selected.name}</h2>
            <p className="h-display h-italic" style={{ fontSize: 22, margin: '12px 0 20px', color: 'var(--forest)' }}>{selected.tagline}</p>
            <p className="lede">{selected.short}</p>
            <div className="legacy-stats">
              <div><span>From</span><strong>{selected.range}</strong></div>
              <div><span>Proof</span><strong>{selected.timing.split('·')[0]}</strong></div>
              <div><span>Revision</span><strong>2 rounds included</strong></div>
            </div>
            <div style={{ display: 'grid', gap: 12, margin: '28px 0' }}>
              {selected.details.map(item => (
                <div key={item} className="row" style={{ gap: 12 }}>
                  <CheckLeaf />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="legacy-buy-box">
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, alignItems: 'flex-end' }}>
                <div>
                  <div className="eyebrow">Buying options</div>
                  <p className="small" style={{ margin: '6px 0 0' }}>Pick a starting package. The studio can refine details after checkout.</p>
                </div>
                <strong style={{ fontSize: 24 }}>${selectedOption.price}</strong>
              </div>
              <div className="legacy-option-grid">
                {selected.options.map(option => (
                  <button
                    key={option.id}
                    className={`legacy-option ${option.id === selectedOption.id ? 'active' : ''}`}
                    onClick={() => setOption(selected, option)}
                  >
                    <strong>{option.name}</strong>
                    <span>{option.note}</span>
                    <em>${option.price}</em>
                  </button>
                ))}
              </div>
            </div>
            <LegacyPersonalizationPanel
              service={selected}
              config={selectedConfig}
              value={selectedPersonalization}
              onChange={(patch) => updatePersonalization(selected.id, patch)}
            />
            <div className="row" style={{ gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => addService(selected)}>Add to bag — ${selectedOption.price}</button>
              <button className="btn btn-gold btn-lg" onClick={() => addService(selected, selectedOption, true)}>Buy now</button>
              <button className="btn btn-outline btn-lg" onClick={() => setProofOpen(true)}>Preview proof review</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeader
            eyebrow="How it works"
            title="From daily dog care to lasting dog story."
            align="center"
          />
          <div className="grid-3 legacy-steps">
            {[
              ['01', 'Send the dog’s story', 'Upload photos, dates, favorite phrases, walk routines, and the details that made your dog yours.'],
              ['02', 'Review the proof', 'A designer creates your first proof in 24-48 hours. Comment on pages, approve sections, or ask for edits.'],
              ['03', 'Print or share', 'Approve the final proof, then receive digital files, printed dog keepsakes, or both.'],
            ].map(([n, title, text]) => (
              <div key={n} className="card" style={{ padding: 28 }}>
                <span className="pill">{n}</span>
                <h3 className="h-display" style={{ fontSize: 28, margin: '20px 0 10px' }}>{title}</h3>
                <p className="small" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {proofOpen && <LegacyProofModal service={selected} onClose={() => setProofOpen(false)} />}
    </main>
  );
}

function LegacyServiceCard({ service, active, selectedOption, onSelect, onOption, onStart }) {
  return (
    <article className={`card legacy-service ${active ? 'active' : ''}`} onClick={onSelect}>
      <Placeholder label={service.image} tone={service.tone} aspect="5 / 4" style={{ borderRadius: 0, border: 0, borderBottom: '1px solid var(--line)' }}>
        <span className="pill gold legacy-badge">{service.badge}</span>
      </Placeholder>
      <div style={{ padding: 22 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
          <div>
            <h3 className="h-display" style={{ fontSize: 25, margin: 0 }}>{service.name}</h3>
            <p className="h-display h-italic" style={{ fontSize: 16, color: 'var(--forest)', margin: '6px 0 0' }}>{service.tagline}</p>
          </div>
          <strong style={{ fontSize: 17 }}>{service.range}</strong>
        </div>
        <p className="small" style={{ margin: '16px 0 18px', color: 'var(--ink-2)', lineHeight: 1.6 }}>{service.short}</p>
        <div className="legacy-card-options">
          {service.options.map(option => (
            <button
              key={option.id}
              className={selectedOption.id === option.id ? 'active' : ''}
              onClick={(e) => { e.stopPropagation(); onOption(option); }}
            >
              <span>{option.name}</span>
              <strong>${option.price}</strong>
            </button>
          ))}
        </div>
        <div className="row" style={{ justifyContent: 'space-between', gap: 12 }}>
          <span className="eyebrow">{service.timing}</span>
          <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); onStart(selectedOption); }}>Add — ${selectedOption.price}</button>
        </div>
      </div>
    </article>
  );
}

function LegacyPersonalizationPanel({ service, config, value, onChange }) {
  return (
    <div className="legacy-personalize">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 16 }}>
        <div>
          <div className="eyebrow">Personalization options</div>
          <p className="small" style={{ margin: '6px 0 0' }}>Dog-only personalization: finish, subject, tone, dedication, and photo count.</p>
        </div>
        <span className="pill gold">{config.photoHint}</span>
      </div>

      <div className="legacy-form-grid">
        <label>
          <span>{config.nameLabel}</span>
          <input className="input" value={value.name} onChange={e => onChange({ name: e.target.value })} />
        </label>
        <label>
          <span>{config.taglineLabel}</span>
          <input className="input" value={value.tagline} onChange={e => onChange({ tagline: e.target.value })} />
        </label>
      </div>

      <div className="legacy-control-group">
        <div className="label">Tone / theme</div>
        <div className="legacy-segment-grid">
          {config.themes.map(theme => (
            <button key={theme} className={value.theme === theme ? 'active' : ''} onClick={() => onChange({ theme })}>{theme}</button>
          ))}
        </div>
      </div>

      <div className="legacy-form-grid">
        <div className="legacy-control-group">
          <div className="label">{service.id === 'letter' ? 'Paper' : service.id === 'sympathy-bundle' ? 'Box / finish' : service.id === 'tribute-art' ? 'Frame / finish' : 'Cover / finish'}</div>
          <div className="legacy-swatch-grid">
            {config.finishes.map(finish => (
              <button key={finish} className={value.finish === finish ? 'active' : ''} onClick={() => onChange({ finish })}>
                <span style={{ background: LEGACY_SWATCHES[finish] || 'var(--forest)' }} />
                {finish}
              </button>
            ))}
          </div>
        </div>
        <div className="legacy-control-group">
          <div className="label">Subject</div>
          <div className="legacy-segment-grid compact">
            {config.subjects.map(subject => (
              <button key={subject} className={value.subject === subject ? 'active' : ''} onClick={() => onChange({ subject })}>
                {subject.replace('dog-', '').replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="legacy-textarea">
        <span>{config.dedicationLabel}</span>
        <textarea className="textarea" rows="4" value={value.dedication} placeholder={config.dedicationPlaceholder} onChange={e => onChange({ dedication: e.target.value })} />
      </label>

      <div className="legacy-photo-count">
        <div>
          <div className="label">Photos added</div>
          <p className="small" style={{ margin: 0 }}>{config.photoHint}. This updates the order brief sent to the studio.</p>
        </div>
        <div className="row" style={{ border: '1px solid var(--line)', borderRadius: 999, padding: 2, background: '#fff', height: 40 }}>
          <button onClick={() => onChange({ photoCount: Math.max(0, value.photoCount - 1) })}>−</button>
          <span className="mono">{value.photoCount}</span>
          <button onClick={() => onChange({ photoCount: value.photoCount + 1 })}>+</button>
        </div>
      </div>

      <div className="legacy-brief-preview">
        <strong>Order brief preview</strong>
        <span>{value.name || 'Dog name'} · {value.tagline || 'subtitle'} · {value.theme} · {value.finish} · {value.subject.replace('dog-', '')}</span>
      </div>
    </div>
  );
}

function LegacyBookScene({ service, compact = false }) {
  return (
    <div className={`legacy-scene ${compact ? 'compact' : ''}`} aria-label={`${service.name} preview`}>
      <div className="legacy-card-back"></div>
      <div className="legacy-book">
        <div className="legacy-photo"></div>
        <span>{service.name.includes('Letter') ? 'DEAR HUMAN' : 'A LIFE WELL LOVED'}</span>
      </div>
      <div className="legacy-note">
        <em>"It came in cotton paper. I cried for an hour."</em>
        <small>Sarah M. · verified tribute</small>
      </div>
      <div className="legacy-pet"><span></span></div>
      <div className="legacy-frame"><div></div></div>
    </div>
  );
}

function LegacyProofModal({ service, onClose }) {
  return (
    <Drawer open={true} onClose={onClose} side="right" title="Proof review preview">
      <div style={{ padding: 20 }}>
        <div className="card" style={{ padding: 18, marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>{service.name}</div>
          <h3 className="h-display" style={{ fontSize: 28, margin: 0 }}>Bella's proof is ready</h3>
          <p className="small" style={{ color: 'var(--ink-2)', lineHeight: 1.6 }}>
            Review each page, leave notes, and approve when the keepsake feels right.
          </p>
        </div>
        <div className="legacy-proof-spread">
          <div>
            <h4>For Bella</h4>
            <Placeholder label="cover photo" tone="sage" aspect="4 / 3" />
            <p>She waited by the blue door every afternoon.</p>
          </div>
          <div>
            <h4>Small things</h4>
            <p>Her collar tags. The blanket corner. The garden path she inspected like it was her job.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
          <div className="card" style={{ padding: 14 }}><strong>Designer Mira</strong><br /><span className="small">I softened the cover color and moved the dates below her name.</span></div>
          <div className="card" style={{ padding: 14 }}><strong>You</strong><br /><span className="small">Can we mention the blue door on page 3?</span></div>
        </div>
      </div>
    </Drawer>
  );
}

Object.assign(window, { LegacyServicesPage, LEGACY_SERVICES, LegacyBookScene, legacyServiceToCartItem, legacyServiceToCartItemWithPersonalization, LEGACY_PERSONALIZATION });
