export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Handle API routes
        if (url.pathname === '/api/stats') {
            try {
                const response = await fetch('https://www.reddit.com/r/eMaghreb/about.json', {
                    headers: {
                        'User-Agent': 'e-maghreb-website/1.0'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Reddit API responded with ${response.status}`);
                }

                const data = await response.json();

                return new Response(JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
                    },
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            }
        }

        // Fallback to assets (Cloudflare Workers Assets binding)
        // If env.ASSETS is available, use it to serve static files.
        if (env.ASSETS) {
            return env.ASSETS.fetch(request);
        }

        return new Response("Not Found", { status: 404 });
    }
}
