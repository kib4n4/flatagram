// When the DOM content is loaded, execute the following code
document.addEventListener("DOMContentLoaded", function () {
    // Defining a function that fetches image data from the server and update the DOM 
    function getsImage() {
      //To fetch image data from the server
      fetch("http://localhost:3000/images/1")
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          // Updates the title, image source, and like count on the webpage
          document.getElementById("card-title").textContent = data.title;
          document.getElementById("card-image").src = data.image;
          document.getElementById("like-count").textContent =
            data.likes + " likes";
  
          // Updates the comments list with the received comments data
          const commentsList = document.getElementById("comments-list");
          commentsList.innerHTML = ""; // Clears existing comments
          data.comments.forEach((comment) => {
            const list = document.createElement("list"); // Creates a new list item for each comment
            list.textContent = comment.content; // Sets the content of the list item
            commentsList.appendChild(list); // Adds the list item to the comments list
          });
        });
  
      // To fetch comments data from the server
      fetch("http://localhost:3000/comments")
        .then((response) => response.json()) // Parse the response as JSON
        .then((comments) => {
          //To update the comments list with the received comments data
          const commentsList = document.getElementById("comments-list");
          comments.forEach((comment) => {
            const list = document.createElement("li"); // Creates a new list item for each comment
            list.textContent = comment.content; // Sets the content of the list item
            commentsList.appendChild(list); // Adds the list item to the comments list
          });
        });
    }
  
    // To call the getImageData function to fetch and display image and comments data
    getsImage();
  
    // Add an event listener for the like button click event
    document.getElementById("like-button").addEventListener("click", function () {
      // Increment the like count displayed on the webpage
      const likesCount = document.getElementById("like-count");
      const currentLikes = parseInt(likesCount.textContent);
      likesCount.textContent = currentLikes + 1 + " likes";
    });
  
    // Add an event listener for the comment form submission event
    document.getElementById("comment-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // To get new user comments
        const newComment = document.getElementById("comment").value;
        // Append the new comment to the comments list on the webpage
        const commentsList = document.getElementById("comments-list");
        const li = document.createElement("li"); // Creates a new list item for the comment
        li.textContent = newComment; // Set the content of the list item
        commentsList.appendChild(li); // Adds the list item to the comments list
        document.getElementById("comment").value = ""; // Clears the comment input field
      });
  });
  