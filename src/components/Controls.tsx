'use client'
import {useEffect,useRef,useState} from 'react'
import Image from 'next/image'
import {SquareTerminal,Menu,X,UserRound,AtSign,Send} from 'lucide-react'
import ProjectGallery from './ProjectGallery'
import {projects,email,github} from '../data'
const links=['Home','About','Skills','Projects','Experience','Contact']
export function Nav(){const [open,setOpen]=useState(false),[active,setActive]=useState('home')
useEffect(()=>{const scroll=()=>{let current='home';for(const link of links){const id=link.toLowerCase();if((document.getElementById(id)?.getBoundingClientRect().top??Infinity)<=160)current=id}setActive(current)};scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll)},[])
return <header className="site-header">
  <div className="wrap bar">
    <a href="#home" className="brand" aria-label="Vinseyla.dev home" onClick={()=>setOpen(false)}>
      <Image className="profile-avatar" src="/portfolio/images/profile.jpg" width={48} height={48} alt=""/><span>vinseyla<em>.dev</em></span>
    </a>
    <nav id="main-navigation" aria-label="Main navigation" className={open?'open':''}>
      {links.map(link=><a key={link} aria-current={active===link.toLowerCase()?'location':undefined}
        onClick={()=>setOpen(false)} href={'#'+link.toLowerCase()}>{link}</a>)}
    </nav>
    <div className="actions">
      <a href={github} className="gh"><SquareTerminal aria-hidden="true"/>GitHub</a>
      <button className="menu" aria-expanded={open} aria-controls="main-navigation" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
  </div>
</header>}
export function Projects(){const [filter,setFilter]=useState('All'),[index,setIndex]=useState(0);const dialog=useRef<HTMLDialogElement>(null);const p=projects[index];return <><div className="filters">{['All','Full-Stack','Frontend','Backend','Integration'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="two">{projects.map((p,i)=>(filter==='All'||p.categories.includes(filter))&&<article className="card" key={p.name}><ProjectGallery group={i===0?'retail':'rms'}/><h3>{p.name}</h3>{p.status&&<small>{p.status}</small>}<p>{p.summary}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div><button className="detail" onClick={()=>{setIndex(i);dialog.current?.showModal()}}>View details</button></article>)}</div><dialog ref={dialog} aria-labelledby="project-title"><button className="close" aria-label="Close project details" onClick={()=>dialog.current?.close()}><X/></button><h2 id="project-title">{p.name}</h2><p>{p.summary}</p><h3>Features</h3><div className="tags">{p.features.map(f=><span key={f}>{f}</span>)}</div><h3>My contribution</h3><ul>{p.work.map(w=><li key={w}>{w}</li>)}</ul></dialog></>}
export function ContactForm() {
  const [draft,setDraft]=useState('')
  return <form className="contact-form" onChange={()=>setDraft('')} onSubmit={e=>{e.preventDefault();const d=new FormData(e.currentTarget);const href='mailto:'+email+'?subject='+encodeURIComponent(String(d.get('Subject')))+'&body='+encodeURIComponent(d.get('Message')+'\n\n'+d.get('Name')+'\n'+d.get('Email'));setDraft(href);window.location.href=href}}>
    <div className="contact-pair">
      <label>Your name<div className="contact-control"><UserRound aria-hidden="true"/><input name="Name" autoComplete="name" required placeholder="Full name"/></div></label>
      <label>Email address<div className="contact-control"><AtSign aria-hidden="true"/><input name="Email" type="email" autoComplete="email" required placeholder="you@company.com"/></div></label>
    </div>
    <label>Subject<input name="Subject" required placeholder="What’s your message about?"/></label>
    <label>Message<textarea name="Message" required rows={5} placeholder="Tell me about your project or opportunity…"/></label>
    <button className="primary" type="submit"><Send size={17} aria-hidden="true"/>Open email draft</button>
    <p role="status">{draft?<>Draft prepared. Send it from your email app. <a href={draft}>Reopen draft</a></>:'Review and send your message in your email app.'}</p>
  </form>
}
