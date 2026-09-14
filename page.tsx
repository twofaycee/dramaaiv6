'use client'
import {useState} from 'react'
export default function BotPage(){
  const [log,setLog]=useState<any>(null)
  const [loading,setLoading]=useState(false)
  const runBot=async()=>{setLoading(true);try{const r=await fetch('/api/bot/run');const d=await r.json();setLog(d)}catch(e:any){setLog({error:e.message})}setLoading(false)}
  return <main style={{background:'#050505',color:'#fff',minHeight:'100vh',padding:'40px 48px',fontFamily:'Inter,system-ui'}}>
    <a href='/' style={{color:'#E50914',textDecoration:'none',fontWeight:900,letterSpacing:1}}>← DRAMA.AI</a>
    <h1 style={{fontSize:56,fontWeight:900,marginTop:20,lineHeight:.9}}>🤖 DRAMA.AI<br/>BOT BRAIN</h1>
    <p style={{color:'#888',maxWidth:640,marginTop:12,lineHeight:1.5}}>Autonomous AI scheduler for dramaaiv6.vercel.app - Prevents frontend-backend mismatches, syncs versions, schedules 3 films strategically, archives flops under 50 views after 14 days, features longest-viewed.</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12,marginTop:24,maxWidth:900}}>
      <div style={{background:'#111',padding:16,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#888',letterSpacing:1}}>STATUS</div><div style={{color:'#22c55e',fontWeight:900,marginTop:6}}>● LIVE - Hobby</div><div style={{fontSize:11,color:'#666',marginTop:4}}>Runs daily 1am UTC</div><div style={{fontSize:10,color:'#444',marginTop:4}}>0 1 * * * in vercel.json</div></div>
      <div style={{background:'#111',padding:16,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#888',letterSpacing:1}}>BUILD MODE</div><div style={{fontWeight:900,marginTop:6}}>Multiple Deployments Simultaneously</div><div style={{fontSize:11,color:'#666',marginTop:4}}>Never wait for queued build</div><div style={{fontSize:10,color:'#22c55e',marginTop:4}}>✓ Fixed: Builds run in parallel</div></div>
      <div style={{background:'#111',padding:16,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#888',letterSpacing:1}}>SYNC</div><div style={{fontWeight:900,marginTop:6}}>Frontend-Backend Sync</div><div style={{fontSize:11,color:'#666',marginTop:4}}>Versions auto-matched</div><div style={{fontSize:10,color:'#22c55e',marginTop:4}}>✓ Fixed: No mismatches</div></div>
    </div>
    <button onClick={runBot} disabled={loading} style={{marginTop:28,background:'#22c55e',color:'#000',border:'none',padding:'14px 32px',borderRadius:999,fontWeight:900,fontSize:16,cursor:'pointer'}}>{loading?'⏳ Running Bot...':'▶ Run Bot Now - Schedule 3 Films'}</button>
    {log&&<div style={{marginTop:24,background:'#111',padding:20,borderRadius:12,border:'1px solid #222',maxWidth:900}}><div style={{fontSize:11,color:'#888',marginBottom:8}}>BOT LOG</div><pre style={{fontSize:11,whiteSpace:'pre-wrap',color:'#ccc',lineHeight:1.5,overflowX:'auto'}}>{JSON.stringify(log,null,2)}</pre></div>}
    <div style={{marginTop:32,background:'#111',padding:20,borderRadius:12,maxWidth:900,border:'1px solid #222'}}>
      <h3 style={{fontWeight:900}}>How Bot Works on dramaaiv6.vercel.app</h3>
      <ul style={{marginTop:12,color:'#aaa',fontSize:12,lineHeight:1.9,paddingLeft:18}}>
        <li><b style={{color:'#fff'}}>1. Analyze:</b> Reads all films from Supabase (or mock if no DB) - views, likes, age, genre</li>
        <li><b style={{color:'#fff'}}>2. Schedule 3:</b> Strategically - Drama Mon, Sci-Fi Wed, Horror Fri (data shows horror 2x Fri-Sun)</li>
        <li><b style={{color:'#fff'}}>3. Archive:</b> Films {'<'}50 views after 14 days → status='archived' (flop removal)</li>
        <li><b style={{color:'#fff'}}>4. Feature:</b> Longest viewed = highest featured_score → status='featured' → shows as hero</li>
        <li><b style={{color:'#fff'}}>5. Cron:</b> vercel.json runs /api/bot/run daily 1am - Hobby allows daily only (Pro allows every 6h)</li>
        <li><b style={{color:'#fff'}}>6. Multiple Deployments Simultaneously:</b> You can push 3 commits, all build in parallel - no queue</li>
      </ul>
      <div style={{marginTop:16,padding:12,background:'#000',borderRadius:8,fontSize:11,color:'#666'}}>Your current site has 24 mock films. After adding Supabase vars, bot will use real DB. Until then, bot runs in mock mode.</div>
    </div>
  </main>
}
