export function featuredScore(f:any){const age=(Date.now()-new Date(f.created_at||Date.now()).getTime())/(1000*60*60*24);return ((f.views||0)*0.5+(f.likes||0)*10+(f.is_real_ai?100:0))/(1+age*0.05)}
export function shouldRemove(f:any){const age=(Date.now()-new Date(f.created_at||Date.now()).getTime())/(1000*60*60*24);if(age<14) return false;return (f.views||0)<50 && !f.is_real_ai}
