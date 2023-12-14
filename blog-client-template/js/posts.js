
// Funktion för att hämta blogginlägg från API:et
async function fetchBlogPost() {

    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        if (!response.ok) {
            throw new Error('Opps something whent wrong. We will dispatch a group of monkeys to fix your problem!')
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.log('Something wrong happened: ', error);
        
        // Returnerar en tom array, om det uppstår fel i hämtningen av APIet 
        return []; 
    }
}

// Funktion för att fylla i HTML med blogginläggsdata
async function fillBlogPosts() {

    const blogPostsContainer = document.getElementById('blogPost-list');
    const blogPosts = await fetchBlogPost();

    blogPosts.forEach((post) => {

        // Konvertera datumsträngen från API-responsen (post.date) till ett JS Date-objekt
        const postDate = new Date(post.date); 

        // Begränsa till de första 100 tecknen
        const first100Characters = post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content;

        // Skapa en sträng med datumet i det önskade formatet
        const formattedDate = `${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()} ${postDate.toLocaleTimeString()}`;

        // Skapa en sträng med citationstecken runt taggarna
        const tagsString = post.tags && post.tags.length > 0
        ? `<p class="indent"><b>tags:</b> ${post.tags.map(tag => `"${tag}"`).join(', ')}</p>`
        : '';

        // Grundstrukturen på hur blogginlägget ska se ut 
        const listItemHTML = `
            <li class="blog-post-item">
            <h2>${post.title}</h2>
                <p><em>${post.author} | <span class="date">${formattedDate}</em></span></p>
                ${tagsString}
                <p>${first100Characters}<a href="post.html?id=${post._id}"> ...read more</a></p>
            </li><hr>
        `;

        // Anropa funktionen för att fylla i blogginläggsdata när sidan laddas
        // Lägga till HTML-strängen i containern
        blogPostsContainer.innerHTML += listItemHTML;
    });
}

fillBlogPosts();  

