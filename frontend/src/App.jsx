import { useEffect, useState } from 'react'
import { Menu, X, Phone, Clock3, GraduationCap, BookOpen, UserRound, MapPin, ArrowRight, CheckCircle2, Star, MessageCircle, ChevronDown, School, Award, ShieldCheck, Home as HomeIcon } from 'lucide-react'

const PHONE = '7505567334'
const subjects = ['All Subjects', 'Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Physics', 'Chemistry', 'Biology', 'Commerce', 'Computer']
const classes = ['Nursery', 'Class 1–5', 'Class 6–8', 'Class 9–10', 'Class 11–12', 'Competitive Exams']

function WhatsAppLink({ children, className = '', message = 'Hello Alpha Home Tutors, I want to enquire about home tuition.' }) {
  return <a className={className} href={`https://wa.me/91${PHONE}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">{children}</a>
}

function EnquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', classLevel: '', subject: '', location: '', mode: 'Home tuition', message: '' })
  const [availableSubjects, setAvailableSubjects] = useState(subjects.slice(1))
  useEffect(() => { const api = (import.meta.env.VITE_API_URL || '').replace(/\/$/, ''); if (!api) return; fetch(`${api}/api/subjects`).then(r => r.ok ? r.json() : null).then(data => { if (Array.isArray(data) && data.length) setAvailableSubjects(data) }).catch(() => {}) }, [])
  const [error, setError] = useState('')
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.classLevel || !form.subject) {
      setError('Please fill in your name, phone number, class and subject.')
      return
    }
    setError('')
    const record = { ...form, id: Date.now(), status: 'New', createdAt: new Date().toISOString() }
    try { const old = JSON.parse(localStorage.getItem('alpha_enquiries') || '[]'); localStorage.setItem('alpha_enquiries', JSON.stringify([record, ...old])) } catch {}
    fetch(`${(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')}/api/enquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) }).catch(() => {})
    const text = `Hello Alpha Home Tutors! I want to enquire about tuition.\nName: ${form.name}\nPhone: ${form.phone}\nClass: ${form.classLevel}\nSubject: ${form.subject}\nLocation: ${form.location || 'Not specified'}\nPreference: ${form.mode}\nMessage: ${form.message || 'None'}`
    window.open(`https://wa.me/91${PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }
  return <form className="enquiry-form" onSubmit={submit}>
    <div className="form-heading"><span className="eyebrow">LET'S GET STARTED</span><h3>Find the right tutor</h3><p>Share a few details and we'll help you take the next step.</p></div>
    <label>Parent / Student Name *<input name="name" value={form.name} onChange={update} placeholder="Enter your full name" /></label>
    <label>Contact Number *<input name="phone" type="tel" value={form.phone} onChange={update} placeholder="Your mobile number" /></label>
    <div className="form-row"><label>Class / Grade *<select name="classLevel" value={form.classLevel} onChange={update}><option value="">Select class</option>{classes.map(x => <option key={x}>{x}</option>)}</select></label><label>Subject *<select name="subject" value={form.subject} onChange={update}><option value="">Select subject</option>{availableSubjects.map(x => <option key={x}>{x}</option>)}</select></label></div>
    <label>Area / Location<input name="location" value={form.location} onChange={update} placeholder="Your locality or city" /></label>
    <label>Tuition Preference<select name="mode" value={form.mode} onChange={update}><option>Home tuition</option><option>Online tuition</option><option>Either is fine</option></select></label>
    <label>Anything else? <textarea name="message" value={form.message} onChange={update} placeholder="Preferred timings, learning goals, etc." rows="3" /></label>
    {error && <p className="form-error">{error}</p>}
    <button className="btn btn-primary form-submit" type="submit">Send Enquiry on WhatsApp <ArrowRight size={18} /></button>
    <small className="form-note">Your enquiry opens WhatsApp so you can review and send it.</small>
  </form>
}

function PublicApp() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeBanner, setActiveBanner] = useState({ title: 'Every student can learn better.', subtitle: 'Build strong concepts, grow in confidence, and make learning a positive everyday experience with Alpha Home Tutors.' })
  useEffect(() => { const api = (import.meta.env.VITE_API_URL || '').replace(/\/$/, ''); if (!api) return; fetch(`${api}/api/banners`).then(r => r.ok ? r.json() : null).then(data => { if (Array.isArray(data)) { const banner = data.find(item => item.active); if (banner) setActiveBanner({ title: banner.title || 'Every student can learn better.', subtitle: banner.subtitle || 'Personalized home tuition support.' }) } }).catch(() => {}) }, [])
  const closeMenu = () => setMenuOpen(false)
  return <div className="site-shell">
    <div className="topbar"><div className="container topbar-inner"><span><Clock3 size={14}/> Office Hours: 9:30 AM – 10:00 PM</span><span className="topbar-contact">Speak with Er. Arun Sir <a href={`tel:${PHONE}`}><Phone size={14}/> {PHONE}</a></span></div></div>
    <header className="site-header"><div className="container nav-wrap">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark"><GraduationCap size={27}/></span><span><strong>ALPHA <em>HOME TUTORS</em></strong><small>PERSONAL ATTENTION. BETTER LEARNING.</small></span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{[['Home','#home'],['About Us','#about'],['Our Approach','#approach'],['Subjects','#subjects'],['Contact','#contact']].map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}<WhatsAppLink className="btn btn-nav" message="Hello Er. Arun Sir, I would like to discuss home tuition." ><MessageCircle size={16}/> Enquire Now</WhatsAppLink></nav>
    </div></header>

    <main>
      <section className="hero" id="home"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="container hero-grid"><div className="hero-copy"><div className="hero-tag"><span/> PERSONALIZED HOME TUITION SUPPORT</div><h1>{activeBanner.title}</h1><p className="hero-lead">{activeBanner.subtitle}</p><div className="hero-actions"><a className="btn btn-primary" href="#enquiry">Find a Tutor <ArrowRight size={18}/></a><WhatsAppLink className="btn btn-outline"><Phone size={17}/> Talk to Er. Arun Sir</WhatsAppLink></div><div className="hero-points"><span><CheckCircle2 size={17}/> Student-focused guidance</span><span><CheckCircle2 size={17}/> Flexible learning options</span></div></div>
      <div className="hero-visual"><div className="visual-glow"/><div className="study-card"><div className="study-card-top"><span className="mini-icon"><BookOpen size={20}/></span><span className="live-pill">LEARNING FIRST</span></div><div className="book-illustration"><div className="book book-back"/><div className="book book-front"><div className="book-symbol">α</div><div className="book-lines"><i/><i/><i/></div></div><div className="pencil"/></div><div className="study-card-caption"><strong>One learner at a time.</strong><span>Support that starts with understanding.</span></div></div><div className="floating-note note-top"><span className="note-icon"><Award size={19}/></span><span><strong>Concept clarity</strong><small>Learn with confidence</small></span></div><div className="floating-note note-bottom"><span className="note-icon note-green"><ShieldCheck size={19}/></span><span><strong>Guided learning</strong><small>Personal attention</small></span></div><div className="hero-dot-pattern"/></div></div></section>

      <section className="trust-strip"><div className="container trust-grid"><div><span className="trust-icon"><UserRound/></span><span><strong>Student-first</strong><small>Learning support</small></span></div><div><span className="trust-icon"><BookOpen/></span><span><strong>Multiple subjects</strong><small>From basics to practice</small></span></div><div><span className="trust-icon"><HomeIcon/></span><span><strong>Flexible options</strong><small>Home or online tuition</small></span></div><div><span className="trust-icon"><MessageCircle/></span><span><strong>Easy enquiries</strong><small>Speak directly with us</small></span></div></div></section>

      <section className="section about-section" id="about"><div className="container about-grid"><div className="about-art"><div className="art-frame"><div className="art-topline"><span>ALPHA LEARNING</span><span>01 / 04</span></div><div className="art-big-alpha">α</div><div className="art-bottomline"><span>CURIOUS MINDS.</span><span>STRONG FOUNDATIONS.</span></div></div><div className="about-badge"><GraduationCap size={25}/><span>Learning with purpose</span></div></div><div className="section-copy"><span className="eyebrow">WELCOME TO ALPHA HOME TUTORS</span><h2>A stronger foundation<br/>for a brighter future.</h2><p>Every student has a different learning style. Our goal is to make it easier for students and parents to explore tuition support that suits their class, subjects, goals and schedule.</p><p>Connect with <strong>Er. Arun Sir</strong> to discuss your learning requirements and find the right next step.</p><div className="feature-list"><div><CheckCircle2/><span><strong>Clear concepts</strong><small>Focus on understanding, not just memorising.</small></span></div><div><CheckCircle2/><span><strong>Personal guidance</strong><small>Discuss your student's individual learning needs.</small></span></div><div><CheckCircle2/><span><strong>Parent communication</strong><small>Simple, direct communication about tuition options.</small></span></div></div><WhatsAppLink className="text-link">Know more about our approach <ArrowRight size={17}/></WhatsAppLink></div></div></section>

      <section className="section approach-section" id="approach"><div className="container"><div className="section-heading centered"><span className="eyebrow">A SIMPLE, STUDENT-FOCUSED PROCESS</span><h2>Learning support, made simple.</h2><p>Start with a conversation. We'll understand your requirements and discuss suitable options.</p></div><div className="steps-grid"><article className="step-card"><span className="step-number">01</span><div className="step-icon"><MessageCircle/></div><h3>Tell us what you need</h3><p>Share the student's class, subjects, location and preferred timings.</p></article><article className="step-card"><span className="step-number">02</span><div className="step-icon"><BookOpen/></div><h3>Discuss tuition options</h3><p>Talk through learning goals and whether home or online tuition fits best.</p></article><article className="step-card"><span className="step-number">03</span><div className="step-icon"><GraduationCap/></div><h3>Plan the next step</h3><p>Connect with Er. Arun Sir to discuss availability and the way forward.</p></article></div></div></section>

      <section className="section subjects-section" id="subjects"><div className="container"><div className="section-heading"><span className="eyebrow">LEARNING AREAS</span><h2>Support for different stages of learning.</h2><p>Tell us the student's grade and subject needs. We'll discuss the most suitable tuition option.</p></div><div className="subjects-grid">{[{icon:School,title:'Primary Classes',desc:'Build strong basics across core subjects.',tag:'Nursery – Class 5'},{icon:BookOpen,title:'Middle School',desc:'Strengthen understanding and study habits.',tag:'Classes 6 – 8'},{icon:GraduationCap,title:'Secondary Classes',desc:'Focused subject practice and exam preparation.',tag:'Classes 9 – 10'},{icon:Award,title:'Senior Secondary',desc:'Discuss subject-specific learning support.',tag:'Classes 11 – 12'},{icon:MapPin,title:'Home Tuition',desc:'Ask about tuition options in your locality.',tag:'Location-based enquiry'},{icon:MessageCircle,title:'Online Tuition',desc:'Explore remote learning when suitable.',tag:'Learn from home'}].map(({icon:Icon,title,desc,tag})=><article className="subject-card" key={title}><div className="subject-icon"><Icon size={23}/></div><h3>{title}</h3><p>{desc}</p><span className="subject-tag">{tag}</span><a href="#enquiry" className="subject-link">Ask about this <ArrowRight size={16}/></a></article>)}</div><p className="subject-disclaimer">Availability depends on class, subject, location and tutor schedule. Contact us to confirm details.</p></div></section>

      <section className="cta-band"><div className="container cta-inner"><div><span className="eyebrow">YOUR NEXT STEP STARTS HERE</span><h2>Let's find a learning path that works.</h2><p>Speak to Er. Arun Sir about your tuition requirements.</p></div><WhatsAppLink className="btn btn-light"><MessageCircle size={18}/> Enquire on WhatsApp <ArrowRight size={17}/></WhatsAppLink></div></section>

      <section className="section enquiry-section" id="enquiry"><div className="container enquiry-grid"><div className="enquiry-copy"><span className="eyebrow">ENQUIRY / CONTACT</span><h2>Tell us what the student needs.</h2><p>Complete the short form and send your enquiry directly to Alpha Home Tutors on WhatsApp. You can review the message before sending it.</p><div className="contact-info"><div className="contact-info-icon"><Phone/></div><div><small>CALL ER. ARUN SIR</small><a href={`tel:${PHONE}`}>{PHONE}</a></div></div><div className="contact-info"><div className="contact-info-icon"><Clock3/></div><div><small>OFFICE HOURS</small><strong>9:30 AM – 10:00 PM</strong><span>Daily enquiry hours</span></div></div><div className="contact-info"><div className="contact-info-icon"><MapPin/></div><div><small>HOW WE CAN HELP</small><strong>Home & online tuition enquiries</strong><span>Share your area and learning needs.</span></div></div></div><div id="contact"><EnquiryForm/></div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><a className="brand brand-footer" href="#home"><span className="brand-mark"><GraduationCap size={26}/></span><span><strong>ALPHA <em>HOME TUTORS</em></strong><small>PERSONAL ATTENTION. BETTER LEARNING.</small></span></a><p>Helping students and parents take the next step towards confident learning.</p></div><div className="footer-links"><strong>Explore</strong><a href="#about">About Us</a><a href="#approach">Our Approach</a><a href="#subjects">Classes & Subjects</a><a href="#enquiry">Send an Enquiry</a></div><div className="footer-links"><strong>Get in touch</strong><a href={`tel:${PHONE}`}><Phone size={15}/> {PHONE}</a><span><Clock3 size={15}/> 9:30 AM – 10:00 PM</span><WhatsAppLink><MessageCircle size={15}/> WhatsApp Enquiry</WhatsAppLink></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Alpha Home Tutors. All rights reserved.</span><span>Guiding learners, one step at a time.</span></div></footer>
    <WhatsAppLink className="floating-whatsapp" aria-label="Chat on WhatsApp"><MessageCircle size={23}/><span>Chat with us</span></WhatsAppLink>
  </div>
}

export default function App() { return <PublicApp /> }
