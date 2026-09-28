import {BarChart3, Bot, Clapperboard, Compass, LayoutDashboard, Lightbulb, Settings, ShieldCheck} from 'lucide-react';

const items = [
  {id:'dashboard', label:'Dashboard', icon:LayoutDashboard},
  {id:'scout', label:'Daily Scout', icon:Compass},
  {id:'trends', label:'Trends', icon:BarChart3},
  {id:'ideas', label:'Content Ideas', icon:Lightbulb},
  {id:'studio', label:'Video Studio', icon:Clapperboard},
  {id:'settings', label:'Settings', icon:Settings},
];

export const Sidebar = ({active, onNavigate, mode}) => <aside className="sidebar">
  <div className="brand"><div className="brand-mark"><span>90</span><i>°</i></div><div><strong>Touchline</strong><small>CONTENT INTELLIGENCE</small></div></div>
  <nav>{items.map(({id,label,icon:Icon}) => <button key={id} className={active===id?'active':''} onClick={()=>onNavigate(id)}><Icon size={19}/><span>{label}</span>{id==='ideas'&&<b>5</b>}</button>)}</nav>
  <div className="sidebar-spacer"/>
  <div className="agent-status"><div className="status-head"><Bot size={17}/><span>Agent network</span><i/></div><div className="status-row"><span>Scout</span><em>Ready</em></div><div className="status-row"><span>Analyst</span><em>Ready</em></div><div className="status-row"><span>Creator</span><em>Ready</em></div></div>
  <div className="safe-note"><ShieldCheck size={16}/><span>Original content only<br/><small>No auto-posting</small></span></div>
  <div className="mode-pill"><i/>{mode==='youtube'?'YouTube live data':'Mock data mode'}</div>
</aside>;
