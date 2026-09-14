'use client'
import {useState,useEffect} from 'react'
export default function BotPage(){
  const [log,setLog]=useState<any>(null)
  const [loading,setLoading]=useState(false)
  const [env,setEnv]=useState<any>({})
  useEffect(()=>{fetch('/api/bot/run').then(r=>r.json()).then(d=>setEnv(d))},[])
  const run=async()=>{setLoading(true);const r=await fetch('/api/bot/run');setLog(await r.json());setLoading(false)}
  const generateReal=async()=>{setLoading(true);const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:'Cinematic drama about family discovering their memories were AI generated, A24 style, 4k, intimate',genre:'Drama',title:'THE SECOND FAMILY REAL AI'})});setLog(await r.json());setLoading(false)}
  return <main style={{background:'#050505',color:'#fff',minHeight:'100vh',padding:'40px 48px'}}>
    <a href='/' style={{color:'#E50914',textDecoration:'none',fontWeight:900}}>← DRAMA.AI</a>
    <h1 style={{fontSize:48,fontWeight:900,marginTop:20}}>🤖 DRAMA.AI PRODUCTION BOT</h1>
    <p style={{color:'#888',maxWidth:700,marginTop:8}}>Turns mock films into REAL AI-generated cinema. Connected to Stripe + Supabase + Fal.ai</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12,marginTop:20,maxWidth:1000}}>
      <div style={{background:env?.supabase==='Connected'||env?.analysis?'#111':'#331111',padding:16,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#888'}}>SUPABASE</div><div style={{fontWeight:900,marginTop:4,color:env?.supabase==='Connected'||env?.analysis?'#22c55e':'#ef4444'}}>{env?.supabase||(env?.analysis?'Connected':'Not Connected - Add vars')}</div><div style={{fontSize:10,color:'#666',marginTop:4}}>Films database</div></div>
      <div style={{background:env?.stripe?.includes('Connected')?'#111':'#331111',padding:16,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#888'}}>STRIPE</div><div style={{fontWeight:900,marginTop:4,color:env?.stripe?.includes('Connected')?'#22c55e':'#ef4444'}}>{env?.stripe||'Checking...'}</div><div style={{fontSize:10,color:'#666',marginTop:4}}>Payments</div></div>
      <div style={{background:env?.realAI?.includes('Enabled')?'#111':'#332200',padding:16,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#888'}}>REAL AI FILMS</div><div style={{fontWeight:900,marginTop:4,color:env?.realAI?.includes('Enabled')?'#22c55e':'#f59e0b'}}>{env?.realAI||env?.mode||'Checking...'}</div><div style={{fontSize:10,color:'#666',marginTop:4}}>{env?.realAI?.includes('Enabled')?'Fal.ai connected':'Add FAL_KEY for real AI'}</div></div>
    </div>
    <div style={{display:'flex',gap:12,marginTop:24,flexWrap:'wrap'}}>
      <button onClick={run} disabled={loading} style={{background:'#22c55e',color:'#000',border:'none',padding:'14px 28px',borderRadius:999,fontWeight:900,cursor:'pointer'}}>{loading?'Running...':'▶ Run Bot - Convert Mock → Real AI'}</button>
      <button onClick={generateReal} disabled={loading} style={{background:'#fff',color:'#000',border:'none',padding:'14px 28px',borderRadius:999,fontWeight:900,cursor:'pointer'}}>🎬 Generate 1 Real AI Film Now</button>
    </div>
    {env?.required&&<div style={{marginTop:20,background:'#111',padding:16,borderRadius:12,maxWidth:1000,border:'1px solid #333'}}><div style={{fontWeight:900,marginBottom:8}}>⚠️ SETUP NEEDED - Add these in Vercel → Settings → Environment Variables:</div>{env.required.map((r:string,i:number)=><div key={i} style={{fontFamily:'monospace',fontSize:11,color:'#f59e0b',marginTop:4}}>{r}</div>)}<div style={{marginTop:12,fontSize:11,color:'#888'}}>After adding → Deployments → Redeploy (uncache) → Bot will work</div></div>}
    {log&&<pre style={{marginTop:20,background:'#111',padding:16,borderRadius:12,fontSize:11,whiteSpace:'pre-wrap',maxWidth:1000,overflowX:'auto'}}>{JSON.stringify(log,null,2)}</pre>}
    <div style={{marginTop:32,background:'#111',padding:20,borderRadius:12,maxWidth:1000}}>
      <h3 style={{fontWeight:900}}>How to get REAL AI films (not demo):</h3>
      <ol style={{marginTop:12,color:'#aaa',fontSize:12,lineHeight:1.9,paddingLeft:18}}>
        <li>Go to <b style={{color:'#fff'}}>fal.ai</b> → Sign up → Get API key (free $1 credit = 10 films)</li>
        <li>In Vercel → Settings → Environment Variables → Add <b style={{color:'#fff'}}>FAL_KEY=your_key</b></li>
        <li>Redeploy → Come to /bot → Click "Generate Real AI Film Now"</li>
        <li>Bot will convert your 24 mock films into real AI videos (Luma Dream Machine)</li>
        <li>Each real film costs ~$0.10, generates in 60-90 seconds</li>
      </ol>
      <div style={{marginTop:16,padding:12,background:'#000',borderRadius:8,fontSize:11,color:'#666'}}>Without FAL_KEY: Site works with demo videos (BigBuckBunny). With FAL_KEY: Real AI cinema generated from your prompts.</div>
    </div>
  </main>
}
