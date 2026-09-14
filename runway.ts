export async function createGeneration(prompt:string,genre:string){
  // Replace with real Runway/Anthropic/Stability later - currently returns demo video that works
  return {status:'succeeded',videoUrl:'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',prompt,genre}
}
