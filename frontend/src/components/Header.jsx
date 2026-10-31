import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, GraduationCap, Phone } from 'lucide-react'

const phone='7505567334'
export default function Header(){
  const [open,setOpen]=useState(false)
  const links=[['Home','#home'],['Courses','#classes'],['Why Choose Us','#why'],['How It Works','#how-it-works'],['About','#about'],['FAQs','#faq']]
  return <header className="alpha-header">
    <div className="alpha-top"><div className="alpha-container alpha-top-inner"><span>Personalised home tuition across Aligarh & nearby cities</span><a href={`tel:${phone}`}><Phone size={14}/> +91 {phone}</a></div></div>
    <div className="alpha-container alpha-nav">
      <Link to="/" className="alpha-brand" onClick={()=>setOpen(false)}><span className="brand-mark"><GraduationCap size={27}/></span><span><b>ALPHA</b><small>HOME TUTORS</small></span></Link>
      <nav className={open?'alpha-links show':'alpha-links'}>{links.map(([label,href])=><a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
      <a className="alpha-nav-cta" href="#enquiry" onClick={()=>setOpen(false)}>Book a Demo <span>↗</span></a>
      <button className="alpha-menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
    </div>
  </header>
}
