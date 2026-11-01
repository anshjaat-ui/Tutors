import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Phone, ArrowUpRight, GraduationCap, BookOpen } from 'lucide-react'

const phone='7505567334'
export default function Header(){
 const [open,setOpen]=useState(false)
 const links=[['Home','/#home'],['Boards & Subjects','/boards'],['Classes','#classes'],['About','#about'],['Contact','#enquiry']]
 return <header className="alpha-header">
  <div className="alpha-top"><div className="alpha-container alpha-top-inner"><span><i className="alpha-top-dot"/> Personalised home & online tuition · Aligarh and nearby cities</span><a href={`tel:${phone}`}><Phone size={13}/> +91 {phone}</a></div></div>
  <div className="alpha-container alpha-nav">
   <Link to="/" className="alpha-brand" onClick={()=>setOpen(false)} aria-label="Alpha Home Tutors home"><span className="brand-mark"><img src="/favicon.svg" alt="ALPHA HOME TUTORS logo" style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:"10px"}} /></span><span><b>ALPHA</b><small>HOME TUTORS <i>•</i> ALIGARH</small></span></Link>
   <nav className={open?'alpha-links show':'alpha-links'}>{links.map(([label,href])=>href==='/boards'?<Link key={label} to={href} onClick={()=>setOpen(false)}>{label}</Link>:<a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
   <a className="alpha-nav-cta" href="/#enquiry" onClick={()=>setOpen(false)}>Find a tutor <ArrowUpRight size={16}/></a>
   <button className="alpha-menu" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'}>{open?<X/>:<Menu/>}</button>
  </div>
 </header>
}
