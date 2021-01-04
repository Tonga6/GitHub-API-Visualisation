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
    const getRepoCommits = new XMLHttpRequest();

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

            //Create canvas for chart
            var canv = document.createElement('canvas');
            canv.id = i;
            document.body.appendChild(canv); // adds the canvas to the body element

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
            var ctx = document.getElementById(i).getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            // var ctx = document.getElementById('canvas2').getContext('2d');
            // var myChart = new Chart(ctx, {
            //     type: 'bar',
            //     data: {
            //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            //         datasets: [{
            //             label: '# of Votes',
            //             data: [12, 19, 3, 5, 2, 3],
            //             backgroundColor: [
            //                 'rgba(255, 99, 132, 0.2)',
            //                 'rgba(54, 162, 235, 0.2)',
            //                 'rgba(255, 206, 86, 0.2)',
            //                 'rgba(75, 192, 192, 0.2)',
            //                 'rgba(153, 102, 255, 0.2)',
            //                 'rgba(255, 159, 64, 0.2)'
            //             ],
            //             borderColor: [
            //                 'rgba(255, 99, 132, 1)',
            //                 'rgba(54, 162, 235, 1)',
            //                 'rgba(255, 206, 86, 1)',
            //                 'rgba(75, 192, 192, 1)',
            //                 'rgba(153, 102, 255, 1)',
            //                 'rgba(255, 159, 64, 1)'
            //             ],
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             yAxes: [{
            //                 ticks: {
            //                     beginAtZero: true
            //                 }
            //             }]
            //         }
            //     }
            // });
            // var ctx = document.getElementById('canvas3').getContext('2d');
            // var myChart = new Chart(ctx, {
            //     type: 'bar',
            //     data: {
            //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            //         datasets: [{
            //             label: '# of Votes',
            //             data: [12, 19, 3, 5, 2, 3],
            //             backgroundColor: [
            //                 'rgba(255, 99, 132, 0.2)',
            //                 'rgba(54, 162, 235, 0.2)',
            //                 'rgba(255, 206, 86, 0.2)',
            //                 'rgba(75, 192, 192, 0.2)',
            //                 'rgba(153, 102, 255, 0.2)',
            //                 'rgba(255, 159, 64, 0.2)'
            //             ],
            //             borderColor: [
            //                 'rgba(255, 99, 132, 1)',
            //                 'rgba(54, 162, 235, 1)',
            //                 'rgba(255, 206, 86, 1)',
            //                 'rgba(75, 192, 192, 1)',
            //                 'rgba(153, 102, 255, 1)',
            //                 'rgba(255, 159, 64, 1)'
            //             ],
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             yAxes: [{
            //                 ticks: {
            //                     beginAtZero: true
            //                 }
            //             }]
            //         }
            //     }
            // });
            // Append each li to the ul
            li.appendChild(canv);
            ul.appendChild(li);
        }

    }
    // Send the request to the server
    getUser.send();
    getRepos.send();


    function RepoAccess(username, repo, header){
        //console.log(repo);

        // GitHub endpoints
        const repoCommits_url = `https://api.github.com/repos/${username}/${repo}/commits`;

        // Open connections using GET request via URL endpoint
        getRepoCommits.open('GET', repoCommits_url, true);

        // Process response
        getRepoCommits.onload = function () {
            const data = JSON.parse(this.response);
            console.log(data);
        }

        getRepoCommits.send();
    }
}
