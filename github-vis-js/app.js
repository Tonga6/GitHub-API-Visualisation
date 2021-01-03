// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    //test search function
    gitHubAccess(gitHubUsername);

})


function gitHubAccess(username) {

    // Create XMLHttpRequest objects
    const getUser = new XMLHttpRequest();

    // GitHub endpoints
    const user_url = `https://api.github.com/users/${username}`;

    // Open connections using GET request via URL endpoint
    getUser.open('GET', user_url, true);

    // Process response
    getUser.onload = function () {
        const data = JSON.parse(this.response);

        // Get the ul with id of of userInfo
        let ul = document.getElementById('userInfo');
        // Create variable that will create li's to be added to ul
        let li = document.createElement('li');
        // Add Bootstrap list item class to each li
        li.classList.add('list-group-item')

        // Create the html markup for each li
        li.innerHTML = (`
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                <p><strong>Member Since:</strong> ${data.created_at}</p>
            `);

        // Append each li to the ul
        ul.appendChild(li);
    }
    
    // Send the request to the server
    getUser.send();
}
