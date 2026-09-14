// REAL AI FILM GENERATION - Uses FAL.AI (Runway, Luma, Kling) for real AI videos
// Get free key at fal.ai - $1 = ~10 films

export async function createRealAIFilm(prompt: string, genre: string) {
  const falKey = process.env.FAL_KEY;
  
  // If no FAL_KEY, return demo video but mark as needing real generation
  // Once you add FAL_KEY, this will generate REAL AI films
  if (!falKey) {
    console.log('No FAL_KEY - returning demo. Add FAL_KEY env var for real AI');
    return {
      status: 'demo_mode',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      prompt,
      genre,
      isRealAI: false,
      message: 'Add FAL_KEY in Vercel env vars for real AI generation'
    };
  }

  try {
    // REAL GENERATION via FAL.AI - Luma Dream Machine (best for drama)
    const res = await fetch('https://queue.fal.run/fal-ai/luma-dream-machine', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${falKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `${prompt}, cinematic 4k, ${genre} film, dramatic lighting, film grain, shallow depth of field, 24fps`,
        aspect_ratio: '16:9'
      })
    });
    
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`FAL error: ${err}`);
    }
    
    const data = await res.json();
    // FAL returns request_id, we need to poll or use webhook
    // For now return request_id, bot will check status
    return {
      status: 'generating',
      requestId: data.request_id,
      videoUrl: data.video?.url || data.url || '',
      prompt,
      genre,
      isRealAI: true
    };
  } catch (e: any) {
    console.error('Real AI generation failed:', e);
    return {
      status: 'failed',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      prompt,
      genre,
      isRealAI: false,
      error: e.message
    };
  }
}

// For backward compatibility
export async function createGeneration(prompt: string, genre: string) {
  return createRealAIFilm(prompt, genre);
}

// Turn mock films into real AI films - call this from bot
export async function generateRealFilmForMock(mockFilm: any, falKey?: string) {
  if (!falKey && !process.env.FAL_KEY) {
    return { ...mockFilm, is_real_ai: false, video_url: mockFilm.video_url };
  }
  const result: any = await createRealAIFilm(mockFilm.prompt || mockFilm.synopsis, mockFilm.genre);
  return {
    ...mockFilm,
    video_url: result.videoUrl,
    is_real_ai: result.isRealAI,
    status: result.isRealAI ? 'live' : 'scheduled'
  };
}
