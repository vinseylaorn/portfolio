import {Mail, Send} from 'lucide-react'
import {email, github, telegram} from '../data'

const links = {
  GitHub: github,
  Telegram: telegram,
  Email: 'mailto:'+email,
}
type Network = keyof typeof links

function NetworkIcon({name}:{name:Network}) {
  if(name==='Telegram')return <Send aria-hidden="true"/>
  if(name==='Email')return <Mail aria-hidden="true"/>
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.07c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.24.92.1-.72.39-1.21.71-1.49-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.43-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.7 10.7 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>
  </svg>
}

export default function SocialLinks({compact=false}:{compact?:boolean}) {
  const networks:Network[]=compact?['GitHub','Telegram','Email']:['GitHub','Telegram']
  return <div className={'social-links'+(compact?' compact':'')}>
    {networks.map(name=><a key={name} href={links[name]} aria-label={name} title={name}>
      <NetworkIcon name={name}/>{!compact&&<span>{name}</span>}
    </a>)}
  </div>
}
