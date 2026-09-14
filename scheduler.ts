export function featuredScore(f:any){
  const age=(Date.now()-new Date(f.created_at||Date.now()).getTime())/(1000*60*60*24);
  return ((f.views||0)*0.5+(f.likes||0)*10)/(1+age*0.05)
}
export function shouldRemove(f:any){
  const age=(Date.now()-new Date(f.created_at||Date.now()).getTime())/(1000*60*60*24);
  if(age<14) return false; // keep 14 days minimum
  return (f.views||0)<50 // flop = archive
}
