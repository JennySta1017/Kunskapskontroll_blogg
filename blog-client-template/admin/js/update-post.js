// Hämta post-id från URL-parametrar
const urlParams = new URLSearchParams(location.search);
const postId = urlParams.get('id');

// Anropa updatePost med det aktuella post-id när sidan laddas
updatePost(postId);

async function updatePost(postId) {
    try {
 
        // Hämta befintliga inlägg från API
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        
        if (!response.ok) {
            throw new Error('Unable to fetch post data');
        }

        const post = await response.json();

        // Fyll i formuläret med befintlig data 
        document.getElementById('title').value = post.title;
        document.getElementById('author').value = post.author;
        document.getElementById('content').value = post.content;
        // Om tags är en array
        document.getElementById('tags').value = post.tags.join(','); 
        document.getElementById('postId').value = postId;
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
}

// Lägg till en lyssnare för formuläret
document.getElementById('updatePostForm').addEventListener('submit', async function (event) {
    try {
        event.preventDefault();

        // Hämta formulärdatal
        const formData = new FormData(event.target);

        // Skicka uppdateringsförfrågan till API
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${formData.get('postId')}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData.get('title'),
                author: formData.get('author'),
                content: formData.get('content'),
                tags: formData.get('tags').split(',').map(tag => tag.trim()) // Om tags är en kommaseparerad sträng
            })
        });

        if (!response.ok) {
            throw new Error('Unable to update post');
        }
        // Om allt gick bra, omdirigera användaren
        location.replace('index.html');
    } catch(error) {
        console.error(error);
        // Hantera fel, t.ex. visa ett meddelande till användaren
    }
});
