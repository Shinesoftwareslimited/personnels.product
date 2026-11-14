import React from 'react';
import { Users, Clock3, CalendarDays, Wallet, Workflow, Layers3, ChartNoAxesCombined, TrendingUp, ArrowUpRight, ArrowRight, Menu, X, Check, ChevronDown, ShieldCheck, Building2, BriefcaseBusiness, FileText, LockKeyhole, Globe2, Monitor, CircleHelp, Mail, Phone, MapPin, Download, Play, Sparkles, Database, Network, ClipboardCheck, PanelTop, Gauge, BookOpen, ExternalLink } from 'lucide-react';
const map={users:Users,clock:Clock3,calendar:CalendarDays,wallet:Wallet,workflow:Workflow,layers:Layers3,chart:ChartNoAxesCombined,trending:TrendingUp};
export function Icon({name,...props}){const C=map[name]||Sparkles;return <C {...props}/>}
export {Users,Clock3,CalendarDays,Wallet,Workflow,Layers3,ChartNoAxesCombined,TrendingUp,ArrowUpRight,ArrowRight,Menu,X,Check,ChevronDown,ShieldCheck,Building2,BriefcaseBusiness,FileText,LockKeyhole,Globe2,Monitor,CircleHelp,Mail,Phone,MapPin,Download,Play,Sparkles,Database,Network,ClipboardCheck,PanelTop,Gauge,BookOpen,ExternalLink};
