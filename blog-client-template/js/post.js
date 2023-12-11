
const urlParams = new URLSearchParams(location.search);
const postId = urlParams.get('id');

async function fetchPost(postId) {
    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const post = await response.json(); // Ändrat till 'post' istället för 'blogPosts'
        console.log(post)
        // Skapa ett datumobjekt från datumsträngen
        let postDate = new Date(post.date);

        // Hämta post-container från DOM
        let postContainer = document.getElementById('post-container');
        postContainer.innerHTML = `
            <h1>${post.title}</h1>
            <p><em>${post.author} | ${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()}  ${postDate.toLocaleTimeString()}</em></p>
            <p><b>tags:</b> ${post.tags}</p>
            <p>${post.content}</p>
        `;

    } catch(error) {
        console.log(error);
    }
}

// Anropa fetchPost-funktionen med postId som parameter
fetchPost(postId);
