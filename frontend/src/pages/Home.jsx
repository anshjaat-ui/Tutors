import { useState } from 'react'
import { api } from '../api/client'
import { ArrowRight, BookOpen, GraduationCap, Phone, MessageCircle, ShieldCheck, UserCheck, Monitor, MapPin, Clock, CheckCircle2, Send, ChevronDown, ClipboardList, CalendarCheck, Star, Languages, Home as HomeIcon, Target, Users } from 'lucide-react'

const subjects = ['Mathematics','Science','English','Physics','Chemistry','Biology','Social Science','Hindi','Commerce','Computer Science']
const classes = ['Nursery – UKG','Class 1–5','Class 6–8','Class 9–10','Class 11–12']
const categories = [
  ['KG to 5th','Foundational learning','BookOpen'],['5th to 8th','Build strong concepts','GraduationCap'],
  ['9th to 10th','School exam preparation','Target'],['11th to 12th','Senior secondary classes','Star'],
  ['AMU Entrance','Entrance preparation','GraduationCap'],['JEE','Engineering entrance','Target'],
  ['NEET','Medical entrance','ShieldCheck'],['All Subjects','Academic support','ClipboardList'],
  ['Home Schooling','Personalised learning','HomeIcon'],['Language Learning','Language classes','Languages']
]
const iconMap={BookOpen,GraduationCap,Target,Star,ShieldCheck,ClipboardList,HomeIcon,Languages}
const benefits=[
 ['Dedicated learning support','Learning support planned around the student’s class, subject and individual requirements.','UserCheck'],
 ['Hassle-free enquiry','Share your requirement once and our team will guide you through the next steps.','ClipboardList'],
 ['Tutor suitability discussion','Discuss subject needs, preferred teaching style and tutor availability before proceeding.','ShieldCheck'],
 ['Offline & online learning','Choose home tuition or online learning based on your location and preference.','Monitor'],
 ['Demo class discussion','Ask our team about demo-session arrangements before confirming tuition.','CalendarCheck']
]
const steps=[
 ['Submit Your Requirement','Share the student’s class, subjects, location and preferred learning mode.','ClipboardList'],
 ['Discuss Suitable Options','Our team contacts you to understand the requirement and discuss availability.','Users'],
 ['Attend a Demo Session','Discuss a demo session and teaching approach before making a decision.','CalendarCheck'],
 ['Start Learning','Confirm the details and coordinate the start of tuition.','GraduationCap']
]
const faqs=[
 ['What is ALPHA HOME TUTORS?','ALPHA HOME TUTORS helps families enquire about suitable home and online tuition based on class, subjects, location and learning preferences.'],
 ['How does the process work?','Share your requirements through the enquiry form. Our team will contact you to understand the details and discuss suitable options.'],
 ['Which classes and subjects are available?','You can enquire for Nursery to Class 12, school subjects and selected entrance-exam preparation. Availability is confirmed individually.'],
 ['Do you provide home and online tuition?','You can choose home tuition, online tuition or either option in the enquiry form.'],
 ['Can I request a demo class?','Yes. Mention your demo request in the form and the team will discuss the available arrangements.'],
 ['How are tuition fees decided?','Fees depend on class, subject, location, tutor requirements and schedule. The applicable details can be discussed after your enquiry.'],
 ['Which locations do you serve?','Enquiries are welcome from Aligarh, Hathras, Mathura, Vrindavan and nearby locations. Exact availability is confirmed individually.']
]
const testimonials=[
 ['Priya Sharma','Mathura','The team understood our tuition requirements and explained the available options clearly.','PS'],
 ['Amit Verma','Aligarh','A simple enquiry process and helpful communication made it easy to discuss our child’s learning needs.','AV'],
 ['Neha Singh','Hathras','We were able to share the class, subjects and preferred timing in one place.','NS'],
 ['Rahul Agarwal','Vrindavan','The home and online tuition options are clearly explained. It made comparing choices easier.','RA']
]
const areas=['Aligarh','Hathras','Mathura','Vrindavan','Nearby areas around Aligarh','Other nearby locations']
export default function Home(){
 const [form,setForm]=useState({name:'',phone:'',classLevel:'',subjects:[],area:'',mode:'Home tuition',message:''})
 const [status,setStatus]=useState('')
 const [busy,setBusy]=useState(false)
 const update=(key,value)=>setForm(p=>({...p,[key]:value}))
 const toggleSubject=s=>update('subjects',form.subjects.includes(s)?form.subjects.filter(x=>x!==s):[...form.subjects,s])
 async function submit(e){e.preventDefault();setBusy(true);setStatus('');try{await api.post('/enquiries',{...form,phone:form.phone.trim(),source:'website'});setStatus('success')}catch{setStatus('error')}finally{setBusy(false)}}
 const enquiryForm=(compact=false)=><form className={compact?'t360-form t360-form-hero':'t360-form'} onSubmit={submit}>
  <div className="t360-form-heading"><span>GET STARTED TODAY</span><h3>Looking for a Tutor?</h3><p>Share your requirement</p></div>
  <label>Parent / Student Name<input required minLength="2" value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Enter your name"/></label>
  <label>Mobile Number<input required pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" value={form.phone} onChange={e=>update('phone',e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number"/></label>
  <div className="t360-form-row"><label>Class / Grade<select required value={form.classLevel} onChange={e=>update('classLevel',e.target.value)}><option value="">Select class</option>{classes.map(c=><option key={c}>{c}</option>)}</select></label><label>Tuition Mode<select value={form.mode} onChange={e=>update('mode',e.target.value)}><option>Home tuition</option><option>Online tuition</option><option>Either / discuss</option></select></label></div>
  <label>Area / City<select required value={form.area} onChange={e=>update('area',e.target.value)}><option value="">Select location</option>{areas.map(a=><option key={a}>{a}</option>)}</select></label>
  <label>Subjects Required <small>(select all that apply)</small></label><div className="t360-subjects">{subjects.map(s=><button type="button" key={s} className={form.subjects.includes(s)?'active':''} onClick={()=>toggleSubject(s)}>{form.subjects.includes(s)?'✓ ':''}{s}</button>)}</div>
  <label>Additional Requirement <small>(optional)</small><textarea rows="2" value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Tell us about your tuition requirement"/></label>
  {status==='success'&&<div className="t360-success"><CheckCircle2 size={17}/> Your enquiry has been submitted.</div>}
  {status==='error'&&<div className="t360-error">Could not submit. Please call +91 7505567334.</div>}
  <button className="t360-submit" disabled={busy}>{busy?'Submitting…':'Request a Call Back'} <ArrowRight size={17}/></button>
  <small className="t360-privacy">Your details will only be used to respond to your enquiry.</small>
 </form>
 return <main className="t360-page">
  <section className="t360-hero" id="home"><div className="t360-container t360-hero-grid">
   <div className="t360-hero-copy"><div className="t360-rating"><span>★★★★★</span> PERSONAL ATTENTION FOR EVERY STUDENT</div><h1>Find the <em>right home tutor</em> for every class & subject</h1><p>Looking for a trusted home tutor? ALPHA HOME TUTORS helps parents explore personalised home and online tuition for their child.</p>
    <div className="t360-hero-actions"><a href="#enquiry" className="t360-primary">Book a Demo Class <ArrowRight size={17}/></a><a href="tel:7505567334" className="t360-call"><Phone size={17}/> +91 7505567334</a></div>
    <div className="t360-chat"><span><MessageCircle size={21}/></span><div><b>Need help finding a tutor?</b><small>Talk to our team and share your requirement.</small></div><a href="https://wa.me/917505567334?text=Hello%20ALPHA%20HOME%20TUTORS%2C%20I%20need%20a%20home%20tutor." target="_blank" rel="noreferrer">WhatsApp <ArrowRight size={15}/></a></div>
   </div>
   {enquiryForm(true)}
  </div></section>
  <section className="t360-stats"><div className="t360-container t360-stat-grid"><div><b>Nursery – 12th</b><span>School classes</span></div><div><b>Multiple Subjects</b><span>Academic support</span></div><div><b>Home & Online</b><span>Learning options</span></div><div><b>Local Support</b><span>Nearby locations</span></div></div></section>
  <section className="t360-section" id="classes"><div className="t360-container"><div className="t360-section-head"><div><span className="t360-kicker">COURSES WE OFFER</span><h2>Tutor for Every Class, <em>Every Subject</em></h2></div><p>Explore our tuition categories and tell us what kind of learning support you are looking for.</p></div><div className="t360-category-grid">{categories.map(([name,desc,icon])=>{const Icon=iconMap[icon]||BookOpen;return <button key={name} className="t360-category" onClick={()=>{update('message',form.message?form.message+'; Interested in '+name:'Interested in '+name);document.getElementById('enquiry')?.scrollIntoView({behavior:'smooth'})}}><span className="t360-category-icon"><Icon size={24}/></span><b>{name}</b><small>{desc}</small><ArrowRight className="t360-category-arrow" size={17}/></button>})}</div></div></section>
  <section className="t360-section t360-pale" id="why"><div className="t360-container"><div className="t360-center-head"><span className="t360-kicker">WHY PARENTS TRUST US</span><h2>Here’s what makes us a <em>helpful learning partner</em></h2><p>Thoughtful guidance and clear communication at every step of your tuition enquiry.</p></div><div className="t360-benefit-grid">{benefits.map(([title,desc,icon])=>{const Icon=iconMap[icon]||UserCheck;return <article className="t360-benefit" key={title}><span><Icon size={24}/></span><h3>{title}</h3><p>{desc}</p></article>})}</div></div></section>
  <section className="t360-section" id="how-it-works"><div className="t360-container"><div className="t360-center-head"><span className="t360-kicker">HOW IT WORKS</span><h2>Simple, Fast & <em>Clear</em></h2><p>Getting started with ALPHA HOME TUTORS is simple.</p></div><div className="t360-steps">{steps.map(([title,desc,icon],i)=>{const Icon=iconMap[icon]||CalendarCheck;return <article className="t360-step" key={title}><span className="t360-step-number">0{i+1}</span><span className="t360-step-icon"><Icon size={25}/></span><h3>{title}</h3><p>{desc}</p></article>})}</div></div></section>
  <section className="t360-section t360-testimonials" id="parent-feedback"><div className="t360-container"><div className="t360-center-head"><span className="t360-kicker">PARENT FEEDBACK</span><h2>Words That <em>Inspire Us</em></h2><p>Sample testimonial layouts for preview. Replace these examples with verified parent feedback before publishing.</p></div><div className="t360-review-grid">{testimonials.map(([name,city,quote,initials])=><article className="t360-review-card" key={name}><div className="t360-review-top"><span className="t360-review-avatar">{initials}</span><div><b>{name}</b><small><MapPin size={12}/>{city}</small></div><span className="t360-review-mark">“</span></div><div className="t360-review-stars" aria-label="Decorative stars">★★★★★</div><p>“{quote}”</p><span className="t360-review-demo">SAMPLE REVIEW · DEMO CONTENT</span></article>)}</div></div></section>
  <section className="t360-cta-band"><div className="t360-container t360-cta-inner"><div><span className="t360-kicker">YOUR CHILD’S LEARNING JOURNEY</span><h2>Let’s find the right tutor <em>together.</em></h2><p>Tell us your requirements and our team will help you with the next step.</p></div><a href="#enquiry" className="t360-primary t360-primary-light">Book a Demo Class <ArrowRight size={17}/></a></div></section>
  <section className="t360-section" id="about"><div className="t360-container t360-about"><div className="t360-about-photo"><div><span>ALPHA HOME TUTORS</span><b>Learning begins with the right guidance.</b></div></div><div className="t360-about-copy"><span className="t360-kicker">ABOUT ALPHA HOME TUTORS</span><h2>Helping students learn with <em>confidence.</em></h2><p>Every student learns differently. We help families explore tuition options based on the student’s class, subjects, location and preferred learning mode.</p><p>Led by Er. Arun Sir, ALPHA HOME TUTORS focuses on understanding each enquiry and guiding families through the available options.</p><div className="t360-founder"><span>A</span><div><b>Er. Arun Sir</b><small>ALPHA HOME TUTORS</small></div></div><a href="tel:7505567334" className="t360-text-link">Talk to our team <ArrowRight size={16}/></a></div></div></section>
  <section className="t360-section t360-pale" id="enquiry"><div className="t360-container t360-enquiry"><div className="t360-enquiry-copy"><span className="t360-kicker">BOOK A DEMO CLASS</span><h2>Looking for a <em>home tutor?</em></h2><p>Share your requirement and our team will get in touch to discuss suitable tuition options.</p><div className="t360-contact-line"><Phone/><div><small>CALL US</small><b>+91 7505567334</b></div></div><div className="t360-contact-line"><Clock/><div><small>OFFICE HOURS</small><b>9:30 AM – 10:00 PM</b></div></div><a href="https://wa.me/917505567334" target="_blank" rel="noreferrer" className="t360-wa"><MessageCircle size={18}/> Chat on WhatsApp</a></div>{enquiryForm(false)}</div></section>
  <section className="t360-section" id="faq"><div className="t360-container t360-faq"><div><span className="t360-kicker">HAVE QUESTIONS?</span><h2>Frequently Asked <em>Questions</em></h2><p>Find answers to common questions about home and online tuition.</p><a href="tel:7505567334" className="t360-text-link">Contact our team <ArrowRight size={16}/></a></div><div className="t360-faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section>
  <section className="t360-areas"><div className="t360-container"><div><span className="t360-kicker">OUR SERVICE LOCATIONS</span><h2>Home tuition in your <em>city</em></h2></div><div className="t360-area-grid">{areas.map(a=><span key={a}><MapPin size={15}/>{a}</span>)}</div></div></section>
  <section className="t360-bottom-cta"><div className="t360-container"><h2>Ready to get started?</h2><p>Share your tuition requirement with ALPHA HOME TUTORS today.</p><a href="#enquiry" className="t360-primary">Request a Call Back <ArrowRight size={17}/></a></div></section>
 </main>
}
