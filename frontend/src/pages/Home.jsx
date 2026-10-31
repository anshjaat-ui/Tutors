import { useState } from 'react'
import { api } from '../api/client'
import { ArrowRight, BookOpen, GraduationCap, UserCheck, MapPin, Phone, Clock, ShieldCheck, Users, Target, MessageCircle, ChevronDown, CheckCircle2, Send, Monitor, Home as HomeIcon, ClipboardList, CalendarCheck, Star, BadgeCheck, Languages, Sparkles } from 'lucide-react'

const subjects = ['Mathematics','Science','English','Physics','Chemistry','Biology','Social Science','Hindi','Commerce','Computer Science']
const classes = ['Nursery – UKG','Class 1–5','Class 6–8','Class 9–10','Class 11–12']
const categories = [
  ['KG to Class 5','Foundational learning','BookOpen'],
  ['Class 6 to 8','Build strong concepts','GraduationCap'],
  ['Class 9 to 10','School exam support','Target'],
  ['Class 11 to 12','Senior secondary subjects','Sparkles'],
  ['Mathematics','Practice with clarity','Target'],
  ['Science','Understand every concept','Star'],
  ['English & Languages','Read, write and communicate','Languages'],
  ['Commerce','Accounts and business studies','ClipboardList'],
  ['Online Tuition','Learn from home','Monitor'],
  ['Home Tuition','One-to-one at home','HomeIcon']
]
const faqs = [
  ['What is ALPHA HOME TUTORS?','ALPHA HOME TUTORS helps parents and students enquire about suitable home or online tuition based on class, subjects, location and learning preferences.'],
  ['How do I request a home tutor?','Fill in the enquiry form with the student’s class, subjects and location. Er. Arun Sir will contact you to understand the requirement and discuss available options.'],
  ['Which classes and subjects are covered?','You can enquire for classes from Nursery to Class 12 and a range of school subjects. Availability depends on the subject, class and location.'],
  ['Do you offer online as well as home tuition?','You can select home tuition, online tuition or either option in the enquiry form. We will discuss what is available for your location.'],
  ['Can I discuss a demo class first?','Yes. Mention that you would like to discuss a demo session in the additional details, and the team can explain the available arrangements.'],
  ['How are tuition fees decided?','Fees can vary by class, subject, tutor requirements, location and learning schedule. The team can discuss the applicable details after understanding your enquiry.'],
  ['Which areas do you serve?','Enquiries are welcome from Aligarh, Hathras, Mathura, Vrindavan and nearby locations. Exact availability is confirmed individually.']
]
const steps = [
  ['Share your requirement','Tell us the student’s class, subjects, location and preferred learning mode.','ClipboardList'],
  ['Discuss suitable options','Our team will contact you to understand the requirement and discuss availability.','Users'],
  ['Talk through the details','Discuss tutor suitability, schedule and any demo-session arrangements.','MessageCircle'],
  ['Begin the learning journey','Once the details are agreed, coordinate the start of tuition.','GraduationCap']
]
const iconMap = { BookOpen, GraduationCap, Target, Sparkles, Star, Languages, ClipboardList, Monitor, HomeIcon }
export default function Home(){
  const [form,setForm]=useState({name:'',phone:'',classLevel:'',subjects:[],area:'',mode:'Home tuition',message:''})
  const [status,setStatus]=useState('')
  const [busy,setBusy]=useState(false)
  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}))
  const toggleSubject=subject=>update('subjects',form.subjects.includes(subject)?form.subjects.filter(item=>item!==subject):[...form.subjects,subject])
  async function submit(event){
    event.preventDefault()
    setBusy(true);setStatus('')
    try{await api.post('/enquiries',{...form,phone:form.phone.trim(),source:'website'});setStatus('success')}
    catch(error){setStatus('error')}
    finally{setBusy(false)}
  }
  return <main>
    <section className="alpha-hero" id="home">
      <div className="alpha-container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> PERSONAL GUIDANCE. STRONGER FOUNDATIONS.</div>
          <h1>Find the right home tutor for <em>every learning goal.</em></h1>
          <p className="hero-lead">Personalised home and online tuition for school students. Share your requirement and let us help you explore a suitable learning option.</p>
          <div className="hero-actions"><a href="#enquiry" className="btn-primary">Book a callback <ArrowRight size={18}/></a><a href="tel:7505567334" className="btn-secondary"><Phone size={17}/> Call Er. Arun Sir</a></div>
          <div className="hero-proof"><div className="proof-icon"><ShieldCheck size={19}/></div><div><b>Learning support centred around your child</b><span>Personal attention • Clear communication • Local support</span></div></div>
        </div>
        <div className="hero-visual"><div className="hero-photo"><div className="photo-overlay"></div><div className="hero-note"><span className="note-icon"><BookOpen size={20}/></span><div><b>A learning plan that fits.</b><small>Every student has a different journey.</small></div></div><div className="hero-seal"><GraduationCap size={30}/><span>LEARN<br/>WITH CONFIDENCE</span></div></div><div className="hero-side-label">ALPHA HOME TUTORS <span>·</span> ALIGARH REGION</div></div>
      </div>
      <div className="hero-bottom"><div className="alpha-container hero-bottom-inner"><span><MapPin size={16}/> Aligarh, Hathras, Mathura & Vrindavan</span><span><Clock size={16}/> Office hours: 9:30 AM – 10:00 PM</span><span><Phone size={16}/> +91 7505567334</span></div></div>
    </section>
    <section className="alpha-container alpha-stats"><div><b>Nursery–12</b><span>School-level enquiries</span></div><div><b>Multiple subjects</b><span>Academic learning support</span></div><div><b>Home & online</b><span>Flexible learning modes</span></div><div><b>Local support</b><span>Nearby service locations</span></div></section>

    <section className="section-pad alpha-categories" id="classes"><div className="alpha-container"><div className="section-heading"><div><div className="eyebrow">COURSES & TUITION</div><h2>A tutor for every <em>class and subject.</em></h2></div><p>Explore the learning areas you can enquire about. Our team will confirm tutor and subject availability for your requirement.</p></div><div className="alpha-category-grid">{categories.map(([name,desc,icon])=>{const Icon=iconMap[icon]||BookOpen;return <button className="alpha-category-card" key={name} onClick={()=>{update('classLevel',classes.find(c=>name.includes(c.replace('Class ','').replace('–','')))||form.classLevel);update('message',form.message?form.message+'; Interested in '+name: 'Interested in '+name);document.getElementById('enquiry')?.scrollIntoView({behavior:'smooth'})}}><span className="category-icon"><Icon size={23}/></span><b>{name}</b><small>{desc}</small><ArrowRight size={17} className="category-arrow"/></button>})}</div></div></section>

    <section className="section-pad section-soft" id="why"><div className="alpha-container"><div className="center-heading"><div className="eyebrow">WHY ALPHA HOME TUTORS</div><h2>Support that puts <em>students first.</em></h2><p>A simple, thoughtful process to help families find learning support that suits their needs.</p></div><div className="benefit-grid"><div className="benefit-card"><span><UserCheck/></span><h3>Personal attention</h3><p>Explore one-to-one learning support based on the student’s class, pace and requirements.</p></div><div className="benefit-card"><span><Target/></span><h3>Concept clarity</h3><p>Focus on understanding fundamentals, asking questions and building confidence.</p></div><div className="benefit-card"><span><BadgeCheck/></span><h3>Careful tutor matching</h3><p>Discuss the student’s needs and preferences before considering a suitable tutor option.</p></div><div className="benefit-card"><span><Monitor/></span><h3>Home or online</h3><p>Choose your preferred learning mode and let us confirm what is available in your area.</p></div><div className="benefit-card"><span><MessageCircle/></span><h3>Direct communication</h3><p>Speak with Er. Arun Sir to discuss your enquiry, questions and next steps.</p></div><div className="benefit-card"><span><MapPin/></span><h3>Local support</h3><p>Enquiries are welcome from Aligarh, Hathras, Mathura, Vrindavan and nearby areas.</p></div></div></div></section>

    <section className="section-pad" id="how-it-works"><div className="alpha-container"><div className="center-heading"><div className="eyebrow">HOW IT WORKS</div><h2>Simple steps. <em>Clear communication.</em></h2><p>Getting started with ALPHA HOME TUTORS is straightforward.</p></div><div className="alpha-steps">{steps.map(([title,desc,icon],i)=>{const Icon=iconMap[icon]||Users;return <div className="alpha-step" key={title}><span className="step-count">0{i+1}</span><span className="step-icon"><Icon size={24}/></span><h3>{title}</h3><p>{desc}</p></div>})}</div></div></section>

    <section className="alpha-quote-band"><div className="alpha-container quote-inner"><div><span className="eyebrow light">A GOOD PLACE TO START</span><h2>Every child can grow with the <em>right guidance.</em></h2><p>Tell us what your child needs. We’ll help you understand the next step.</p></div><a href="#enquiry" className="btn-light">Share your requirement <ArrowRight size={18}/></a></div></section>

    <section className="section-pad" id="about"><div className="alpha-container about-grid"><div className="section-image"><div className="image-caption"><span>ALPHA HOME TUTORS</span><b>Guidance that makes a difference.</b></div></div><div className="section-copy"><div className="eyebrow">ABOUT ALPHA HOME TUTORS</div><h2>A better learning experience begins with <em>the right guidance.</em></h2><p>We believe every student deserves patient guidance, clear explanations and a learning environment where questions are always welcome.</p><p>Led by Er. Arun Sir, ALPHA HOME TUTORS connects families with tuition options based on the student’s class, subjects, location and preferred learning mode.</p><div className="founder-line"><div className="founder-avatar">A</div><div><b>Er. Arun Sir</b><small>Primary contact · ALPHA HOME TUTORS</small></div></div><a href="#enquiry" className="text-link">Speak with us <ArrowRight size={16}/></a></div></div></section>

    <section className="section-pad section-soft" id="enquiry"><div className="alpha-container enquiry-grid"><div className="enquiry-copy"><div className="eyebrow">BOOK A CALLBACK</div><h2>Let’s find the right <em>learning support.</em></h2><p>Share a few details and our team will get in touch to understand your requirements and discuss availability.</p><div className="contact-card"><span><Phone/></span><div><small>CALL ER. ARUN SIR</small><a href="tel:7505567334">+91 7505567334</a></div></div><div className="contact-card"><span><Clock/></span><div><small>OFFICE HOURS</small><b>9:30 AM – 10:00 PM</b></div></div><a className="whatsapp-link" href="https://wa.me/917505567334?text=Hello%20Alpha%20Home%20Tutors%2C%20I%20want%20to%20enquire%20about%20tuition." target="_blank" rel="noreferrer"><MessageCircle size={18}/> Chat on WhatsApp</a></div>
      <form className="enquiry-form" onSubmit={submit}><div className="form-title"><div><span>STUDENT ENQUIRY</span><h3>Request a callback</h3></div><span className="form-step">01 / 01</span></div><div className="form-row"><label>Parent / Student name<input required minLength="2" value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Enter full name"/></label><label>Phone number<input required pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" value={form.phone} onChange={e=>update('phone',e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number"/></label></div><div className="form-row"><label>Student's class<select required value={form.classLevel} onChange={e=>update('classLevel',e.target.value)}><option value="">Select class</option>{classes.map(c=><option key={c}>{c}</option>)}</select></label><label>Preferred tuition<select value={form.mode} onChange={e=>update('mode',e.target.value)}><option>Home tuition</option><option>Online tuition</option><option>Either / discuss</option></select></label></div><label>Service location<select required value={form.area} onChange={e=>update('area',e.target.value)}><option value="">Select your area</option>{['Aligarh','Hathras','Mathura','Vrindavan','Nearby area around Aligarh (20–50 km)','Other nearby location'].map(a=><option key={a}>{a}</option>)}</select></label><label>Subjects required <span className="optional">(select all that apply)</span></label><div className="form-subjects">{subjects.map(s=><button type="button" key={s} className={form.subjects.includes(s)?'selected':''} onClick={()=>toggleSubject(s)}>{form.subjects.includes(s)?'✓ ':'＋ '}{s}</button>)}</div><label>Additional details <span className="optional">(optional)</span><textarea rows="3" value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Preferred timing, demo request or other learning requirements"/></label>{status==='success'&&<div className="form-success"><CheckCircle2 size={18}/> Enquiry submitted successfully. Our team will contact you.</div>}{status==='error'&&<div className="form-error">Could not submit right now. Please call or WhatsApp +91 7505567334.</div>}<button className="btn-primary form-submit" disabled={busy}>{busy?'Submitting…':'Submit enquiry'} <Send size={17}/></button><small className="form-privacy">Your details will only be used to respond to this tuition enquiry.</small></form></div></section>

    <section className="section-pad" id="faq"><div className="alpha-container faq-wrap"><div><div className="eyebrow">HAVE QUESTIONS?</div><h2>Frequently asked <em>questions.</em></h2><p>Need help choosing a tuition option? Speak with our team.</p><a href="tel:7505567334" className="text-link">Call Er. Arun Sir <ArrowRight size={16}/></a></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section>

    <section className="final-cta"><div className="alpha-container final-cta-inner"><div><span>TAKE THE FIRST STEP</span><h2>Let’s make learning feel more achievable.</h2></div><a href="#enquiry" className="btn-light">Book a callback <ArrowRight size={18}/></a></div></section>
  </main>
}
