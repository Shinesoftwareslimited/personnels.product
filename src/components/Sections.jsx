import React from 'react';
import {Link} from 'react-router-dom';
import {modules,industries} from '../data';
import {Icon,ArrowRight,ArrowUpRight,Check,ShieldCheck,Database,Network,ClipboardCheck} from './Icons';

export function CTA({title='See how Vigor Personnels could work for your organisation.',text='Talk with our team about your operating model, requirements and deployment priorities.',label='Start a conversation'}){return <section className="cta-band"><div className="container cta-inner"><div><div className="eyebrow eyebrow-light"><span/>LET’S TALK</div><h2>{title}</h2><p>{text}</p></div><Link className="button button-white" to="/contact">{label}<ArrowUpRight size={17}/></Link></div></section>}

export function ModuleGrid({limit}){const items=limit?modules.slice(0,limit):modules;return <div className="module-grid">{items.map(m=><article className="module-card" key={m.n}><div className="module-card-top"><span className="module-number">{m.n}</span><span className="module-icon"><Icon name={m.icon} size={21}/></span></div><h3>{m.title}</h3><p>{m.desc}</p><div className="tag-list">{m.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div>}

export function IndustryGrid(){return <div className="industry-grid">{industries.map((i,n)=><article className="industry-card" key={i.title}><div className="industry-photo"><img src={i.image} alt={i.title}/><span>0{n+1}</span></div><div className="industry-body"><h3>{i.title}</h3><p>{i.desc}</p></div></article>)}</div>}

export function PrincipleGrid(){const items=[['One operating picture','Bring employee information and workforce activity into a coherent administrative view.','database'],['Clear ownership','Give managers and administrators defined responsibilities across everyday workflows.','clipboard'],['Useful information','Make operational records easier to review, understand and act on.','network']];return <div className="principle-grid">{items.map(([t,d,i])=><div className="principle" key={t}><div className="principle-icon">{i==='database'?<Database/>:i==='clipboard'?<ClipboardCheck/>:<Network/>}</div><h3>{t}</h3><p>{d}</p></div>)}</div>}

export function TrustStrip(){return <div className="trust-strip"><div className="container trust-inner"><span>DESIGNED FOR THE REALITIES OF WORK</span><div><b>PEOPLE</b><i>·</i><b>OPERATIONS</b><i>·</i><b>ACCOUNTABILITY</b><i>·</i><b>INSIGHT</b></div></div></div>}

