
'use client'
import { useState, useEffect } from 'react'
import { FILMS, GENRES } from '@/lib/films'

const MOODS: any = {
  glitch: "— DON'T LOOK BEHIND YOU — [signal lost] — she's right there —",
  intimate: "She said: 'We didn't sell the house. We sold the version of us that lived there.'",
  sharp: "OPERATOR: Ma'am, can you confirm your location? [voice = her own]",
  hologram: "> reconstructing last 3 seconds before divergence... 82% • hold...",
  soft: "You have one unread letter. From you, 2015. Should I open it?",
  punchline: "[AI LAUGH] Sorry, that was supposed to be sad. I'm learning.",
  evidence: "RECONSTRUCTION: Subject enters frame at 02:14:07. No exit detected."
}

export default function Breakthrough(){
  const [genre,setGenre]=useState('All')
  const [myList,setMyList]=useState<string[]>([])
  const [selected,setSelected]=useState<any>(null)
  const [liveIndex,setLiveIndex]=useState(0)
  const [typed,setTyped]=useState('')

  const filtered = genre==='All' ? FILMS : FILMS.filter(f=>f.genre===genre)

  useEffect(()=>{
    const t = setInterval(()=> setLiveIndex(i=> (i+1)%FILMS.length), 2800)
    return ()=> clearInterval(t)
  },[])

  useEffect(()=>{
    if(!selected) return
    const text = MOODS[selected.mood] || "This moment was generated 4.2 seconds ago."
    let i=0; setTyped('')
    const timer = setInterval(()=>{ setTyped(text.slice(0,i)); i++; if(i>text.length) clearInterval(timer) }, 22)
    return ()=> clearInterval(timer)
  },[selected])

  const checkout = async () => {
    const r = await fetch('/api/stripe/checkout',{method:'POST'})
    const d = await r.json()
    if(d.url) location.href=d.url
    else alert('🚀 BREAKTHROUGH READY: Add STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PRICE_ID in Vercel Env Vars to enable $9.99 Pro checkout. Build is green without it.')
  }

  const liveFilm = FILMS[liveIndex]

  return (
    <main style={{background:'#050505', color:'#fff', minHeight:'100vh'}}>
      {/* BREAKTHROUGH HEADER */}
      <header style={{position:'fixed', top:0, width:'100%', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px', background:'rgba(5,5,5,0.92)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{display:'flex', alignItems:'center', gap:24}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}><div style={{width:32,height:32,background:'#E50914',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,boxShadow:'0 0 20px rgba(229,9,20,0.4)'}}>D</div><span style={{color:'#E50914',fontWeight:900,letterSpacing:'-0.03em'}}>DRAMA.AI</span><span style={{fontSize:9,background:'#E50914',color:'#fff',padding:'2px 5px',borderRadius:4,fontWeight:900,marginLeft:6}}>BREAKTHROUGH</span></div>
          <div style={{display:'flex', alignItems:'center', gap:6, fontSize:10, fontFamily:'monospace', color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.06)', padding:'4px 10px', borderRadius:999}}><span style={{width:6,height:6,background:'#22c55e',borderRadius:999,display:'inline-block'}} className="pulse"></span>LIVE GENERATING: {liveFilm.title} • {liveFilm.genre}</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:11, color:'rgba(255,255,255,0.6)', fontFamily:'monospace'}}>My List {myList.length}</span>
          <button onClick={checkout} style={{background:'#fff',color:'#000',border:'none',padding:'8px 16px',borderRadius:999,fontWeight:900,fontSize:12,cursor:'pointer'}}>Go Pro $9.99 →</button>
          <a href="/studio" style={{background:'#E50914',color:'#fff',padding:'8px 16px',borderRadius:999,fontWeight:900,fontSize:12,textDecoration:'none',boxShadow:'0 0 20px rgba(229,9,20,0.3)'}}>Studio • Earn 70%</a>
        </div>
      </header>

      {/* HERO - BREAKTHROUGH */}
      <section style={{padding:'72px 20px 20px', maxWidth:1600, margin:'0 auto'}}>
        <div style={{background:'radial-gradient(120% 120% at 0% 0%, #1a1a2e 0%, #16213e 40%, #000 100%)', borderRadius:20, padding:'40px 32px', border:'1px solid rgba(255,255,255,0.08)', position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg, transparent, #E50914, transparent)', opacity:0.6}}></div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:20}}>
            <div style={{flex:1, minWidth:320}}>
              <div style={{fontSize:10, letterSpacing:'0.25em', color:'#E50914', fontFamily:'monospace', fontWeight:900, marginBottom:12}}>● BREAKTHROUGH • SYNTHETIC CINEMA • 24 FILMS LIVE</div>
              <h1 style={{fontSize:'clamp(36px,7vw,84px)', fontWeight:900, lineHeight:0.85, letterSpacing:'-0.04em', margin:0}}>Every film<br/>was never<br/><span style={{color:'#E50914'}}>filmed.</span></h1>
              <p style={{color:'rgba(255,255,255,0.6)', maxWidth:480, marginTop:16, lineHeight:1.5, fontSize:14}}>The first entertainment site where films generate themselves. No crew. No actors. No camera. Just prompts becoming cinema in real-time. This is the breakthrough.</p>
              <div style={{display:'flex', gap:10, marginTop:20, alignItems:'center'}}>
                <button onClick={()=>setSelected(liveFilm)} style={{background:'#E50914',color:'#fff',border:'none',padding:'12px 20px',borderRadius:999,fontWeight:900,fontSize:13,cursor:'pointer',boxShadow:'0 0 30px rgba(229,9,20,0.5)'}}>▶ Watch Live Gen • {liveFilm.match}% Match</button>
                <span style={{fontSize:10,fontFamily:'monospace',color:'rgba(255,255,255,0.4)'}}>DRAMA.AI PLAYER • latency 42ms • generating {liveFilm.title}</span>
              </div>
            </div>
            <div style={{width:320, background:'rgba(0,0,0,0.6)', borderRadius:12, border:'1px solid rgba(255,255,255,0.08)', padding:14}}>
              <div style={{fontSize:10, fontFamily:'monospace', color:'rgba(255,255,255,0.4)', marginBottom:10}}>LIVE GENERATION FEED</div>
              {FILMS.slice(0,4).map(f=> <div key={f.id} style={{display:'flex', gap:10, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.06)'}}><div style={{width:32,height:32,borderRadius:6,background: f.match>94 ? '#16a34a' : '#E50914',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:900}}>{f.match}%</div><div style={{flex:1}}><div style={{fontSize:11,fontWeight:800}}>{f.title}</div><div style={{fontSize:10,color:'rgba(255,255,255,0.5)'}}>{f.genre} • {f.duration} • {f.views.toLocaleString()} views • generating now</div></div><div style={{width:6,height:6,background:'#22c55e',borderRadius:999,marginTop:6}} className="pulse"></div></div>)}
              <div style={{marginTop:10, fontSize:10, color:'#22c55e', fontFamily:'monospace'}}>● 24 films generating live • $0.08/view • creators earn 70%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Genres */}
      <div style={{maxWidth:1600, margin:'0 auto', padding:'0 20px', display:'flex', gap:8, overflowX:'auto'}}>
        {GENRES.map(g=> <button key={g} onClick={()=>setGenre(g)} style={{background: genre===g ? '#fff' : 'rgba(255,255,255,0.06)', color: genre===g ? '#000' : 'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.08)', padding:'7px 16px', borderRadius:999, fontSize:12, fontWeight:800, whiteSpace:'nowrap', cursor:'pointer', transition:'all 0.2s'}}>{g}</button>)}
      </div>

      {/* BREAKTHROUGH GRID */}
      <section style={{maxWidth:1600, margin:'0 auto', padding:'20px 20px 40px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:14}}>
          {filtered.map(f=> (
            <div key={f.id} style={{background:'#0f0f0f', borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,0.06)', cursor:'pointer', transition:'transform 0.2s', position:'relative'}} onClick={()=>setSelected(f)} onMouseEnter={e=> e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e=> e.currentTarget.style.transform='scale(1)'}>
              <div style={{height:320, background:`linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%), linear-gradient(135deg, #1a1a2e, #000)`, padding:12, display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative'}}>
                <div style={{position:'absolute', inset:0, background:`radial-gradient(80% 60% at 50% 0%, ${f.match>95 ? '#E50914' : '#333'}22, transparent)`}}></div>
                <div style={{display:'flex', justifyContent:'space-between', position:'relative', zIndex:1}}><span style={{fontSize:9, background:'rgba(0,0,0,0.7)', padding:'4px 8px', borderRadius:999, backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.1)'}}>{f.genre} • {f.duration} • {f.year}</span><span style={{fontSize:9, fontWeight:900, background: f.match>=95 ? '#16a34a' : f.match>=90 ? '#E50914' : '#333', padding:'4px 8px', borderRadius:999, boxShadow: f.match>=95 ? '0 0 12px rgba(34,197,94,0.5)' : '0 0 12px rgba(229,9,20,0.5)'}}>{f.match}% MATCH</span></div>
                <div style={{position:'relative', zIndex:1}}><div style={{fontWeight:900, fontSize:16, lineHeight:1.1, letterSpacing:'-0.01em'}}>{f.title}</div><div style={{fontSize:11, color:'rgba(255,255,255,0.55)', marginTop:8, lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{f.synopsis}</div><div style={{display:'flex', gap:6, marginTop:10}}><span style={{fontSize:8, background:'rgba(255,255,255,0.1)', padding:'3px 6px', borderRadius:999, fontFamily:'monospace'}}>{f.mood.toUpperCase()}</span><span style={{fontSize:8, background:'rgba(255,255,255,0.1)', padding:'3px 6px', borderRadius:999, fontFamily:'monospace'}}>{f.views.toLocaleString()} VIEWS</span></div></div>
              </div>
              <div style={{padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'#0a0a0a', borderTop:'1px solid rgba(255,255,255,0.06)'}}><button style={{background:'#fff', color:'#000', border:'none', padding:'6px 14px', borderRadius:999, fontWeight:900, fontSize:11, display:'flex', alignItems:'center', gap:6}}>▶ Play • ${f.earn}</button><button onClick={(e)=>{e.stopPropagation(); setMyList(l=> l.includes(f.id) ? l.filter(x=>x!==f.id) : [...l,f.id])}} style={{background: myList.includes(f.id) ? '#fff' : 'none', border:'1px solid rgba(255,255,255,0.2)', color: myList.includes(f.id) ? '#000' : '#fff', width:28, height:28, borderRadius:999, fontWeight:900}}>{myList.includes(f.id) ? '✓' : '+'}</button></div>
            </div>
          ))}
        </div>
      </section>

      {/* BREAKTHROUGH PLAYER */}
      {selected && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.94)', zIndex:100, display:'flex', justifyContent:'center', alignItems:'center', padding:16}}>
          <div style={{background:'#0a0a0a', borderRadius:20, maxWidth:1000, width:'100%', overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 0 80px rgba(229,9,20,0.15)'}}>
            <div style={{aspectRatio:'16/9', background:`radial-gradient(100% 100% at 50% 0%, #1a1a2e, #000)`, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', padding:32, position:'relative'}}>
              <div style={{position:'absolute', top:16, left:16, right:16, display:'flex', justifyContent:'space-between', fontSize:10, fontFamily:'monospace', color:'rgba(255,255,255,0.5)'}}><span style={{background:'rgba(0,0,0,0.7)', padding:'6px 12px', borderRadius:999, border:'1px solid rgba(255,255,255,0.1)'}}>DRAMA.AI PLAYER • {selected.genre.toUpperCase()} MODE • latency 42ms • {selected.mood.toUpperCase()}</span><span style={{background:'#E50914', color:'#fff', padding:'6px 12px', borderRadius:999, fontWeight:900}}>● LIVE GENERATING</span></div>
              
              <div style={{textAlign:'center', maxWidth:640}}>
                <h2 style={{fontSize:'clamp(20px,4vw,36px)', fontWeight:900, letterSpacing:'-0.02em'}}>{selected.title}</h2>
                <div style={{marginTop:16, fontSize:14, lineHeight:1.5, color:'#fff', fontFamily:'monospace', minHeight:60, background:'rgba(0,0,0,0.5)', padding:'16px', borderRadius:12, border:'1px solid rgba(255,255,255,0.08)'}}>{typed}<span style={{animation:'blink 0.75s infinite', borderRight:'2px solid #E50914', marginLeft:2}}>&nbsp;</span></div>
                <div style={{marginTop:12, display:'flex', gap:8, justifyContent:'center'}}><span style={{fontSize:10, background:'#16a34a', padding:'4px 8px', borderRadius:999, fontWeight:900}}>{selected.match}% MATCH • YOU WOULD WATCH THIS</span><span style={{fontSize:10, background:'rgba(255,255,255,0.1)', padding:'4px 8px', borderRadius:999}}>{selected.views.toLocaleString()} views • ${selected.earn} earned</span></div>
              </div>

              <div style={{position:'absolute', bottom:0, left:0, right:0, height:4, background:'rgba(255,255,255,0.1)'}}><div style={{height:'100%', background:'linear-gradient(90deg, #E50914, #ff6b6b)', width:'42%', position:'relative'}}><div style={{position:'absolute', right:0, top:'50%', transform:'translateY(-50%)', width:14, height:14, background:'#E50914', borderRadius:999, boxShadow:'0 0 16px #E50914'}}></div></div></div>
            </div>
            <div style={{padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', background:'#050505'}}><div><div style={{fontWeight:900, fontSize:14}}>{selected.title} • {selected.duration} • {selected.year} • Breakthrough Ready</div><div style={{fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:2}}>Stripe + Runway hooks ready • Add keys in Vercel → Settings → Env Vars → Redeploy</div></div><button onClick={()=>setSelected(null)} style={{background:'#1a1a1a', color:'#fff', border:'1px solid rgba(255,255,255,0.1)', width:40, height:40, borderRadius:999, cursor:'pointer'}}>✕</button></div>
          </div>
        </div>
      )}

      <footer style={{maxWidth:1600, margin:'0 auto', padding:'32px 20px', borderTop:'1px solid rgba(255,255,255,0.06)', fontSize:10, fontFamily:'monospace', color:'rgba(255,255,255,0.3)', display:'flex', gap:16, flexWrap:'wrap'}}><span>© 2025 DRAMA.AI — BREAKTHROUGH • Synthetic Cinema</span><span>•</span><span>Best AI entertainment ever made • No actors harmed, they were hallucinated</span><span>•</span><span style={{color:'#E50914'}}>Ready for Stripe + Runway • 70% creator revenue • $0.08/view</span></footer>
    </main>
  )
}
