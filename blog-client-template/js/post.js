//<a href="post.html?id=${post._id}">...read more</a>

fetchPost();

async function fetchPost() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts/'+ post._id);
        const blogPosts = await response.json();

        
        for (let post of blogPosts) {

           let postDate = new Date(post.date)

            let postContainer = document.getElementById('post-container');

           postContainer.innerHTML += `
                
                <h1> ${post.title}</h1>
                <p><i>${post.author}</i> | ${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}  ${postDate.toLocaleTimeString().slice(0, -3)}</p><br></p>
                <p><Tags: ${post.tags} 
                <p>${post.content}</p>
                
            `
        }

    } catch(error) {
        console.log(error)
    }
};