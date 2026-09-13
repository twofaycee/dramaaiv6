
'use client'
import { useState } from 'react'
export default function Studio(){
  const [prompt,setPrompt]=useState('A woman discovers her husband has a second family 20 minutes away.')
  const [genre,setGenre]=useState('Drama')
  const [loading,setLoading]=useState(false)
  const [result,setResult]=useState<any>(null)
  const gen = async () => {
    setLoading(true)
    const r = await fetch('/api/generate',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({prompt, genre})})
    setResult(await r.json()); setLoading(false)
  }
  return <main style={{background:'#050505', color:'#fff', minHeight:'100vh', padding:20, maxWidth:800, margin:'0 auto'}}><a href="/" style={{color:'#E50914', fontWeight:900}}>← DRAMA.AI</a><h1 style={{marginTop:20, fontSize:36, fontWeight:900}}>Studio • Generate Breakthrough Film</h1><p style={{color:'rgba(255,255,255,0.5)', fontSize:13}}>Ready for Runway + Stripe. Add keys in Vercel Env Vars.</p><div style={{display:'flex', gap:8, marginTop:16, flexWrap:'wrap'}}>{['Drama','Horror','Thriller','Sci-Fi','Romance','Dark Comedy','True Crime AI'].map(g=> <button key={g} onClick={()=>setGenre(g)} style={{background:genre===g?'#fff':'#1a1a1a', color:genre===g?'#000':'#fff', border:'none', padding:'6px 14px', borderRadius:999, fontSize:12, fontWeight:800}}>{g}</button>)}</div><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} style={{width:'100%', height:140, marginTop:16, background:'#111', border:'1px solid #333', borderRadius:12, padding:16, color:'#fff'}}/><button onClick={gen} disabled={loading} style={{marginTop:12, width:'100%', background:'#E50914', color:'#fff', border:'none', padding:'14px', borderRadius:10, fontWeight:900}}>{loading?'Generating Breakthrough...':`Generate ${genre} Film →`}</button>{result && <div style={{marginTop:16, background:'#111', padding:16, borderRadius:12}}><div style={{fontSize:10, color:'#facc15', fontFamily:'monospace'}}>{result.mock ? 'MOCK READY - Add RUNWAY_API_KEY for real video' : 'LIVE'}</div><div style={{fontWeight:900, marginTop:8}}>{result.title}</div><div style={{fontSize:13, color:'rgba(255,255,255,0.6)'}}>{result.script}</div></div>}</main>
}
