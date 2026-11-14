import React,{useEffect} from 'react';
import {Routes,Route,useLocation} from 'react-router-dom';
import {Header,Footer,CookieNotice} from './components/Layout';
import Home from './pages/Home';
import {Platform,Solutions,Industries,Resources,Company,Contact,Legal} from './pages/Pages';
function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0)},[pathname]);return null}
function NotFound(){return <main className="not-found container"><div className="eyebrow"><span/>404 · PAGE NOT FOUND</div><h1>This page isn't <em>here.</em></h1><p>The address may have changed or the page may no longer be available.</p><a className="button button-primary" href="/">Return to home</a></main>}
export default function App(){return <><ScrollToTop/><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/platform" element={<Platform/>}/><Route path="/solutions" element={<Solutions/>}/><Route path="/industries" element={<Industries/>}/><Route path="/resources" element={<Resources/>}/><Route path="/company" element={<Company/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Legal type="privacy"/>}/><Route path="/terms" element={<Legal type="terms"/>}/><Route path="/cookies" element={<Legal type="cookies"/>}/><Route path="/accessibility" element={<Legal type="accessibility"/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/><CookieNotice/></>}
