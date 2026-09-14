export default function BotPage(){
  return(
    <main style={{padding:40, background:'#000', color:'#fff', minHeight:'100vh'}}>
      <a href='/' style={{color:'#E50914'}}>← DRAMA.AI</a>
      <h1 style={{fontSize:40, fontWeight:900, marginTop:20}}>BOT BRAIN - LIVE</h1>
      <p>Multiple Deployments Simultaneously - Fixed</p>
      <p>Frontend-Backend Sync - Fixed</p>
      <p>Hobby: Runs daily 1am via vercel.json cron</p>
      <button onClick={async()=>{
        const r=await fetch('/api/bot/run');
        alert(JSON.stringify(await r.json()).slice(0,500))
      }} style={{marginTop:20, padding:'12px 24px', background:'#22c55e', border:'none', borderRadius:999, fontWeight:900}}>
        Run Bot Now
      </button>
    </main>
  )
}
