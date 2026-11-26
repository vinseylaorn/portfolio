import './globals.css'
import type {Metadata} from 'next'
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://orn-vinseyla-workspace.whiteglobe2051.chatgpt.site'),title:'Orn Vinseyla | Full-Stack Web Developer',description:'Explore Orn Vinseyla’s full-stack projects, technical skills and software development experience in Phnom Penh, Cambodia.',openGraph:{title:'Orn Vinseyla | Developer Portfolio',description:'Full-stack applications, API development and database design in Phnom Penh, Cambodia.',type:'website'},twitter:{card:'summary'}}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
