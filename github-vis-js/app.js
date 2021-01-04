// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

const header = {
    "Authorization" : `token b3d11d600bed5c888dbc1b65e3303f2d9baecd8b`
}
// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    //test search function
    gitHubAccess(gitHubUsername,header);

})


function gitHubAccess(username,header) {

    // Create XMLHttpRequest objects
    const getUser = new XMLHttpRequest();
    const getRepos = new XMLHttpRequest();
    const getRepoInfo = new XMLHttpRequest();

    // GitHub endpoints
    const user_url = `https://api.github.com/users/${username}`;
    const repos_url = `https://api.github.com/users/${username}/repos`;
    //const commits_url = `https://api.github.com/repos/${owner}/${repo}/commits`;

    // Open connections using GET request via URL endpoint
    getUser.open('GET', user_url, true);
    getRepos.open('GET', repos_url, true);


    // Process response
    getUser.onload = function () {
        const data = JSON.parse(this.response);

        // Get the ul with id of of userInfo
        let ul = document.getElementById('userInfo');
        // Create variable that will create li's to be added to ul
        let li = document.createElement('li');
        // Add Bootstrap list item class to each li
        li.classList.add('list-group-item')

        let d;
        d = new Date(data.created_at);
        d.getMonth();
        console.log(d.getMonth());
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
    

    getRepos.onload = function () {

        // Parse API data into JSON
        const data = JSON.parse(this.response);
        //console.log(data);
        // Loop over each object in data array
        for (let i in data) {

            RepoAccess(username, data[i].name, header);
            // Get the ul with id of of userRepos
            let ul = document.getElementById('userRepos');

            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');

            // Add Bootstrap list item class to each li
            li.classList.add('list-group-item')

            // Create the html markup for each li
            li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
                <p><strong>Main Language:</strong> ${data[i].language}</p>
            `);

            // Append each li to the ul
            ul.appendChild(li);

        }

    }
    // Send the request to the server
    getUser.send();
    getRepos.send();


    function RepoAccess(username, repo, header){
        //console.log(repo);

        // GitHub endpoints
        const repoInfo_url = `https://api.github.com/repos/${username}/${repo}/commits`;

        // Open connections using GET request via URL endpoint
        getRepoInfo.open('GET', repoInfo_url, true);

        // Process response
        getRepoInfo.onload = function () {
            const data = JSON.parse(this.response);
            console.log(data);
        }

        getRepoInfo.send();
    }
}
