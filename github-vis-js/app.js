// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');
const user = "Username";
const pass = "Password";


let global_i = 0; //use to track canvas id
let global_j = 1;
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
    const getRepos = new XMLHttpRequest();

    // GitHub endpoints
    const user_url = `https://api.github.com/users/${username}`;
    const repos_url = `https://api.github.com/users/${username}/repos`;

    // Open connections using GET request via URL endpoint
    getUser.open('GET', user_url, true);
    getRepos.open('GET', repos_url, true);


    getUser.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
    getRepos.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));


    // Process response
    getUser.onload = function () {
        global_i = 0; //reset counter
        global_j = 1;
        const data = JSON.parse(this.response);

        // Get the ul with id of of userInfo
        let ul = document.getElementById('userInfo');
        // Create variable that will create li's to be added to ul
        let li = document.createElement('li');
        // Add Bootstrap list item class to each li
        li.classList.add('list-group-item')

        let date = new Date(data.created_at);
        // Create the html markup for each li
        li.innerHTML = (`
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                <p><strong>Member Since:</strong> ${date}</p>
                `);

        // Append each li to the ul
        ul.appendChild(li);
    }

    ///////////////////////////////////////////////////////////////////////////////////////

    getRepos.onload = function () {

        // Parse API data into JSON
        const data = JSON.parse(this.response);

        // Loop over each object in data array
        for (let i in data) {

          
            ///////////////////////////////////////////////////////////////////////////////////////


            // Get the ul with id of of userRepos
            let ul = document.getElementById('userRepos');

            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');

            // Add Bootstrap list item class to each li
            li.classList.add('list-group-item')

            // Create the html markup for each li
            li.innerHTML = (`
                <p><strong>Repository Name:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>              
            `);

            ///////////////////////////////////////////////////////////////////////////////////////

            let getRepoLanguages = new XMLHttpRequest();
            let getRepoContributors = new XMLHttpRequest();
            // GitHub endpoints
            let repoLanguages_url = `https://api.github.com/repos/${username}/${data[i].name}/languages`;
            let repoContributors_url = `https://api.github.com/repos/${username}/${data[i].name}/contributors`;

            // Open connections using GET request via URL endpoint
            getRepoLanguages.open('GET', repoLanguages_url, true);
            getRepoContributors.open('GET', repoContributors_url, true);

            getRepoLanguages.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
            getRepoContributors.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));


            // Process response
            getRepoLanguages.onload = function () {

                //Create canvas for chart
            var canv = document.createElement('canvas');
            canv.id = global_i;    //each id corresponds to the repo it represents
            document.body.appendChild(canv); // adds the canvas to the body element


                let data = JSON.parse(this.response);
                let total_bytes = 0;
                for (let i in data) {
                    total_bytes += data[i]
                }
                for (let i in data) {
                    data[i] = Math.round((data[i] / total_bytes) * 100);
                }
                var ctx = document.getElementById(global_i).getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(data),
                        datasets: [{
                            data: Object.values(data),
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
                        title: {
                            display: true,
                            fontSize: 18,
                            text: 'Percentage Breakdown of Language Distribution'
                        }
                    }
                });
                li.appendChild(canv);
                ul.appendChild(li);
                global_i += 2;
            }

            getRepoContributors.onload = function () {

                //Create canvas for chart
            var canv = document.createElement('canvas');
            canv.id = global_j;    //each id corresponds to the repo it represents
            document.body.appendChild(canv); // adds the canvas to the body element


                let data = JSON.parse(this.response);
                var xs = [];
                var ys = [];
                for(let i in data){
                    xs.push(data[i].contributions);
                    ys.push(data[i].login);
                }
                var ctx = document.getElementById(global_j).getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ys,
                        datasets: [{
                            data: xs,
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
                        title: {
                            display: true,
                            fontSize: 18,
                            text: 'Breakdown of Collaborators & Contributions'
                        }                       
                    }
                });
                li.appendChild(canv);
                ul.appendChild(li);
                global_j += 2;
            }
            getRepoLanguages.send();
            getRepoContributors.send();

        }
    }
    // Send the request to the server
    getUser.send();
    getRepos.send();

}
