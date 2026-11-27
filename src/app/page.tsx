import {
  Blocks,
  Cloud,
  CodeXml,
  Database,
  Download,
  FolderOpen,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Monitor,
  Network,
  PenTool,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { ContactForm, Nav, Projects } from '../components/Controls'
import SocialLinks from '../components/SocialLinks'
import { email, skills, status } from '../data'

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const PROFILE_IMAGE = '/portfolio/images/profile.jpg'
const SEPARATOR = ' · '

const SKILL_ICONS: LucideIcon[] = [Monitor, Server, Database, Wrench, PenTool, Sparkles, Cloud]

const CORE_STACK: { label: string; Icon: LucideIcon }[] = [
  { label: 'Next.js', Icon: Layers3 },
  { label: 'TypeScript', Icon: CodeXml },
  { label: 'Laravel', Icon: Blocks },
  { label: 'MySQL', Icon: Database },
]

const EXPERIENCES = [
  {
    company: 'CamSME Solution',
    role: 'Software Developer',
    date: 'June 2025 – Present',
    description:
      'Developed frontend and backend features for web applications. Built and maintained software systems, developed APIs, and integrated application components. Worked with databases and application logic, managed deployment and hosting, and participated in system development and maintenance.',
  },
  {
    company: 'IT Khmer',
    role: 'Frontend Developer',
    date: 'November 2024 – May 2025',
    description:
      'Designed user interfaces and forms, developed frontend components, and improved usability and user experience.',
  },
]

const WORKFLOW = [
  {
    name: 'API & integration',
    items: 'REST API development · API integration · Telegram bot integration · Exchange rate data integration',
  },
  {
    name: 'System design',
    items: 'Database design · ERD design · System architecture · API architecture',
  },
  {
    name: 'Tools',
    items: 'draw.io · dbdiagram · Figma · Canva · Postman · Git · GitHub · Docker',
  },
]

const EDUCATION_TAGS = ['Web Development', 'Database Management', 'Software Engineering', 'Programming']

const SOFT_SKILLS =
  'Problem Solving · Teamwork · Communication · Self-Learning · Adaptability · Responsibility · Time Management · Willingness to Learn'

/* -------------------------------------------------------------------------- */
/*  Small shared components                                                   */
/* -------------------------------------------------------------------------- */

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}

function Section({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`wrap section ${className}`.trim()}>
      {children}
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sections                                                                  */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap">
        <div className="heroGrid">
          <div>
            <div className="file intro">
              <Terminal size={17} /> Developer portfolio
            </div>

            <h1>
              <span>Hi, I’m</span>ORN
              <br />
              <strong>VINSEYLA</strong>
              <span className="period">.</span>
            </h1>

            <div className="role">
              <CodeXml /> Full-Stack Web Developer
            </div>

            <p className="lead">
              I'm a Full-Stack Web Developer focused on building modern web applications, scalable backend
              systems, and user-friendly digital experiences.
            </p>

            <div className="heroButtons">
              <a className="primary" href="#projects">
                <FolderOpen />
                View Projects
              </a>
              <a className="secondary" href="#contact">
                <Mail />
                Contact Me
              </a>
            </div>

            <div className="meta">
              <span>
                <MapPin /> Phnom Penh, Cambodia
              </span>
              <a href="/portfolio/mycv.pdf" download>
                <Download /> Download CV
              </a>
            </div>

            {status && <small>{status}</small>}
          </div>

          <figure className="portrait-frame">
            <Image
              className="hero-portrait"
              src={PROFILE_IMAGE}
              width={1401}
              height={1920}
              preload
              alt="Orn Vinseyla wearing a navy suit"
            />
          </figure>
        </div>

        <div className="techline">
          <span>CORE STACK</span>
          {CORE_STACK.map(({ label, Icon }) => (
            <strong key={label}>
              <Icon />
              {label}
            </strong>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" className="about">
      <div>
        <h2>About Me</h2>
        <div className="profile">
          <Image className="profile-avatar" src={PROFILE_IMAGE} width={54} height={54} alt="" />
          <div>
            <b>Orn Vinseyla</b>
            <small>Phnom Penh, Cambodia</small>
          </div>
        </div>
      </div>

      <div>
        <p>
          I am a Full-Stack Web Developer with practical experience working on web applications and software
          development projects. My technical interests include frontend development, backend engineering,
          database design, API integration, and software architecture.
        </p>
        <p>
          I enjoy building useful applications, solving technical challenges, exploring new technologies, and
          continuously improving my development skills.
        </p>
        <p>
          My goal is to become a professional software developer and contribute to building reliable, scalable,
          and user-friendly software solutions.
        </p>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills">
      <h2>Technical Skills</h2>
      <div className="three">
        {skills.map(([name, items], i) => {
          const Icon = SKILL_ICONS[i]
          return (
            <article className="card" key={name}>
              <Icon />
              <h3>{name}</h3>
              <Tags items={items.split(SEPARATOR)} />
            </article>
          )
        })}
      </div>
    </Section>
  )
}

function FeaturedProjects() {
  return (
    <Section id="projects">
      <h2>Featured Projects</h2>
      <Projects />
    </Section>
  )
}

function Experience() {
  return (
    <Section id="experience">
      <h2>Professional Experience</h2>
      {EXPERIENCES.map(({ company, role, date, description }) => (
        <article className="timeline" key={company}>
          <small>{date}</small>
          <div>
            <h3>{role}</h3>
            <b>{company}</b>
            <p>{description}</p>
          </div>
        </article>
      ))}
    </Section>
  )
}

function Workflow() {
  return (
    <Section>
      <h2>Integrations &amp; Development Workflow</h2>
      <div className="three">
        {WORKFLOW.map(({ name, items }) => (
          <article className="card" key={name}>
            <Network />
            <h3>{name}</h3>
            <Tags items={items.split(SEPARATOR)} />
          </article>
        ))}
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section>
      <h2>Education &amp; Skills</h2>
      <div className="two">
        <article className="card">
          <GraduationCap />
          <h3>University of South-East Asia</h3>
          <b>Information Technology</b>
          <small>2022 – 2026</small>
          <Tags items={EDUCATION_TAGS} />
        </article>

        <article className="card">
          <h3>Languages</h3>
          <p>Khmer — Native · English — Medium</p>
          <h3>Soft skills</h3>
          <Tags items={SOFT_SKILLS.split(SEPARATOR)} />
        </article>
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" className="two">
      <div>
        <h2>Let’s Build Something Together</h2>
        <p>
          I'm interested in software development opportunities, collaboration, and building useful digital
          solutions. Feel free to contact me.
        </p>
        <a className="email contact-email" href={`mailto:${email}`}>
          <Mail size={18} aria-hidden="true" />
          {email}
        </a>
        <SocialLinks />
      </div>
      <ContactForm />
    </Section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap footer-row">
        <div className="footer-person">
          <Image className="profile-avatar" src={PROFILE_IMAGE} width={48} height={48} alt="" />
          <div>
            <strong>Orn Vinseyla</strong>
            <small>Full-Stack Web Developer</small>
          </div>
        </div>

        <div className="footer-end">
          <small>© {new Date().getFullYear()}</small>
          <SocialLinks compact />
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <Experience />
        <Workflow />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  )
}