// Funktion för att hämta blogginlägg från API:et
async function fetchBlogPost() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const data = await response.json();
        return data;

    } catch (error) {
        console.log('Something wrong happened: ', error);
        
        return []; // OSÄKER PÅ DENNA 
    }
}

// Funktion för att fylla i HTML med blogginläggsdata
async function fillBlogPosts() {
    const blogPostList = document.getElementById('blogPost-list');
    const blogPosts = await fetchBlogPost();

    blogPosts.forEach((post) => {
        const listItem = document.createElement('li');
        listItem.classList.add('blog-post-item');
        listItem.innerHTML = `
            <li class="blog-post-item">
            <h2>${post.title}</h2>
                <p><em>${post.author} | <span class="date">${post.date}</em></span></p>
                <div class="tags"><b>tags:</b>
                    <span class="tag">${post.tags}</span>
                    <span class="tag">${post.tags}</span>
                </div>
                <p>${post.content}</p>
            

            </li><hr>
        `;
        // Anropa funktionen för att fylla i blogginläggsdata när sidan laddas
        blogPostList.appendChild(listItem);
        //document.getElementById('blogPost-list').innerHTML = punsListHTML;
    });
}
fillBlogPosts();  

