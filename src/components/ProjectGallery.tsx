'use client'
import {useCallback,useEffect,useRef,useState} from 'react'
import {ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react'

const retail = [
  ['Sales dashboard','Sales overview, category totals and order status'],
  ['Product catalog','Product cards with prices, categories and inventory controls'],
  ['Company reports','Revenue, expenses, orders and sales performance charts'],
  ['Branch overview','Phnom Penh Central branch tools and point-of-sale shift'],
  ['Point of sale','Product selection and current order with payment options'],
]

const rms = [
  ['System selection','Admin and point-of-sale system choices'],
  ['Restaurant dashboard','Revenue, orders and table status'],
  ['Menu management','Menu items, categories and prices'],
  ['Table management','Table availability and floor layout'],
  ['Stock management','Inventory quantities and stock levels'],
  ['Reports and analytics','Revenue, order volume and expenses'],
  ['POS table selection','Restaurant tables grouped by floor'],
  ['Order entry','Menu selection and items on the current order'],
  ['Collect payment','Order summary and payment methods'],
]

export default function ProjectGallery({group}:{group:'retail'|'rms'}) {
  const slides=group==='retail'?retail:rms
  const [frame,setFrame]=useState({index:0,previous:-1,direction:1})
  const {index,previous,direction}=frame
  const move=useCallback((offset:number)=>{
    setFrame(current=>({
      previous:current.index,
      index:(current.index+offset+slides.length)%slides.length,
      direction:offset,
    }))
  },[slides.length])
  const gallery=useRef<HTMLElement>(null)
  const [visible,setVisible]=useState(false)
  const [playing,setPlaying]=useState(false)

  useEffect(()=>{
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference=()=>setPlaying(!preference.matches)
    syncPreference()
    preference.addEventListener('change',syncPreference)
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.intersectionRatio>=0.25),{threshold:0.25})
    if(gallery.current)observer.observe(gallery.current)
    return ()=>{
      preference.removeEventListener('change',syncPreference)
      observer.disconnect()
    }
  },[])

  useEffect(()=>{
    if(!playing || !visible)return
    const timer=window.setInterval(()=>{
      if(!document.hidden)move(1)
    },5000)
    return ()=>window.clearInterval(timer)
  },[index,playing,visible,move])

  const touch=useRef<{x:number,y:number}|null>(null)
  const [title,description]=slides[index]
  return <section ref={gallery} className="retail-gallery" role="region" aria-roledescription="carousel" aria-label={group==='retail'?'Retail project screenshots':'Restaurant project screenshots'}
    tabIndex={0} onKeyDown={event=>{
      if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
        event.preventDefault()
        move(event.key==='ArrowLeft'?-1:1)
      }
    }}>
    <figure data-direction={direction>0?"left":"right"} onTouchStart={event=>{const point=event.touches[0];touch.current={x:point.clientX,y:point.clientY}}}
      onTouchCancel={()=>{touch.current=null}}
      onTouchEnd={event=>{
        const start=touch.current
        touch.current=null
        if(!start)return
        const point=event.changedTouches[0], dx=point.clientX-start.x
        if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(point.clientY-start.y))move(dx<0?1:-1)
      }}>
      <div className={previous>=0?'slide-pair moving':'slide-pair'} key={index}>
        {previous>=0&&<img className="slide-outgoing" aria-hidden="true" alt="" src={`/portfolio/images/${group}/${group}${previous+1}.webp`}/>}
        <img className="slide-current" loading={previous<0?'lazy':'eager'} src={`/portfolio/images/${group}/${group}${index+1}.webp`} alt={description} width={1800} height={1020}/>
      </div>
    </figure>
    <div className="gallery-bar">
      <span aria-live={playing?"off":"polite"} aria-atomic="true"><small>{index+1} / {slides.length}</small>{title}</span>
      <div><button type="button" aria-label={playing?'Pause slideshow':'Play slideshow'} onClick={()=>setPlaying(value=>!value)}>{playing?<Pause/>:<Play/>}</button>
      <button type="button" aria-label="Previous screenshot" onClick={()=>move(-1)}><ChevronLeft/></button>
      <button type="button" aria-label="Next screenshot" onClick={()=>move(1)}><ChevronRight/></button></div>
    </div>
  </section>
}
