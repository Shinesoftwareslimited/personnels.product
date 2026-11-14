import React,{useState,useEffect} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
import {nav} from '../data';
import {ArrowUpRight,Menu,X,ChevronDown} from './Icons';

export function Header(){
 const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); const loc=useLocation();
 useEffect(()=>{setOpen(false);},[loc.pathname]);
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>12);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f)},[]);
 return <header className={`site-header ${scrolled?'scrolled':''}`}><div className="container nav-wrap">
  <Link to="/" className="brand" aria-label="Vigor Personnels home"><span className="brand-mark">V</span><span className="brand-copy"><b>VIGOR</b><small>PERSONNELS</small></span></Link>
  <nav className={`main-nav ${open?'open':''}`} aria-label="Main navigation">{nav.map(n=><NavLink key={n.to} to={n.to} className={({isActive})=>isActive?'active':''}>{n.label}</NavLink>)}<Link className="mobile-cta" to="/contact">Talk to our team <ArrowUpRight size={16}/></Link></nav>
  <div className="nav-actions"><Link className="nav-cta" to="/contact">Talk to our team <ArrowUpRight size={16}/></Link><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button></div>
 </div></header>
}

export function Footer(){return <footer className="footer"><div className="container"><div className="footer-top"><div className="footer-brand"><Link to="/" className="brand brand-light"><span className="brand-mark">V</span><span className="brand-copy"><b>VIGOR</b><small>PERSONNELS</small></span></Link><p>Workforce, connected.<br/>A considered approach to people operations and work management.</p></div><div className="footer-col"><b>Explore</b><Link to="/platform">Platform</Link><Link to="/solutions">Solutions</Link><Link to="/industries">Industries</Link><Link to="/resources">Resources</Link></div><div className="footer-col"><b>Company</b><Link to="/company">About Vigor</Link><Link to="/contact">Contact</Link><a href="https://www.vigortechnologies.in/" target="_blank" rel="noreferrer">Vigor Technologies <ArrowUpRight size={13}/></a></div><div className="footer-col"><b>Information</b><Link to="/privacy">Privacy notice</Link><Link to="/terms">Terms of use</Link><Link to="/cookies">Cookie notice</Link><Link to="/accessibility">Accessibility</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Vigor Technologies. All rights reserved.</span><span>Vigor Personnels is an enterprise workforce platform.</span></div></div></footer>}

export function CookieNotice(){const [show,setShow]=useState(false);useEffect(()=>{setShow(!localStorage.getItem('vp-cookie-choice'))},[]);if(!show)return null;return <div className="cookie-notice"><div><b>Privacy matters.</b><p>This website uses essential browser storage for basic site preferences. Optional analytics are not enabled in this starter build.</p></div><div className="cookie-actions"><Link to="/cookies" onClick={()=>{}}>Cookie notice</Link><button className="button button-dark button-small" onClick={()=>{localStorage.setItem('vp-cookie-choice','accepted');setShow(false)}}>Okay</button></div></div>}

export function PageShell({eyebrow,title,lead,image,children}){return <><section className="page-hero"><div className="container page-hero-grid"><div><div className="eyebrow"><span/>{eyebrow}</div><h1>{title}</h1><p className="lead">{lead}</p></div>{image&&<div className="page-hero-image"><img src={image} alt=""/><div className="image-caption">VIGOR PERSONNELS <span>— PEOPLE. PROCESS. PROGRESS.</span></div></div>}</div></section>{children}</>}
