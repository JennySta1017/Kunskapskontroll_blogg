
const tableBody = document.getElementById('table-body');

fetchAllPosts();

async function fetchAllPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const blogPosts = await response.json();
     
        
        for (let post of blogPosts) {
           let postDate = new Date(post.date)

           tableBody.innerHTML += `
                <tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.tags}</td>
                <td>${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}  ${postDate.toLocaleTimeString().slice(0, -3)}</td>
                <td>
                <div id="manage-links">
                <a href="update-post.html?id=${post._id}">Update</a> |
                <a href="#" class = "delete-links" data-id="${post._id}">Delete</a>
                </div></td>
               </tr>
            `
        }

    } catch(error) {
        console.log(error)
    }

    const deleteLinks = document.getElementsByClassName('delete-links');
    for (let link of deleteLinks) {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            let postId = e.target.dataset.id;
            let response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + postId, {
                method: `DELETE`
            });
            
            if(response.ok) {
                e.target.parentNode.parentNode.parentNode.remove();
            }
        })
    }

}