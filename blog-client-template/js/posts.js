
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

    const blogPostList = document.getElementById('blogPost-list');
    const blogPosts = await fetchBlogPost();

    blogPosts.forEach((post) => {

        const listItem = document.createElement('li');
        listItem.classList.add('blog-post-item');

        // Begränsa till de första 100 tecknen
        const  first100Characters = post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content;

        // Skapa en sträng med citationstecken runt taggarna
        const tagsString = post.tags && post.tags.length > 0
        ? `<p class="indent"><b>tags:</b> ${post.tags.map(tag => `"${tag}"`).join(', ')}</p>`
        : '';

        // Grundstrukturen på hur blogginlägget ska se ut i Js 
        listItem.innerHTML = `
            <li class="blog-post-item">
            <h2>${post.title}</h2>
                <p><em>${post.author} | <span class="date">${post.date}</em></span></p>
                ${tagsString}
                <p>${first100Characters}<a href="post.html?id=${post._id}"> ...read more</a></p>
            </li><hr>
        `;
        
        // DUBBELKOLLA HTML STRUKTUREN SÅ DET STÅR RÄTT


        // Anropa funktionen för att fylla i blogginläggsdata när sidan laddas
        blogPostList.appendChild(listItem);
        //document.getElementById('blogPost-list').innerHTML = punsListHTML;
    });
}

fillBlogPosts();  

