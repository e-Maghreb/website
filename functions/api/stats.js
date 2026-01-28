export async function onRequest(context) {
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
