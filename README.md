# GitHub-API-Visualisation

## How to Access
Open index.html with any modern web browser while index.html and app.js are in the same directory.


## About
|![Before Search](/Images/Home.png)|
|:--:|
|Homepage before a search is made|


After submitting a valid GitHub username into the search field, two categories of information will be retrieved from GitHub's API:

### User Information

#### Text-Based

- Name
- Location
- Number of Public Repos
- Date of Account Creation

|![User Info](/Images/repo.png)|
|:--:|
|User information retrieved from the API|


### Repo Information

The following is provided for every one of the user's public repository: 

|![Repo Info](/Images/User.png)|
|:--:|
|Repo information retrieved from the API|


#### Text-Based
- Name
- Description
- URL

#### Visual

|![Language Chart](/Images/Lang.png)|
|:--:|
|Percentage Breakdown of Language Distribution|


|![Collab Chart](/Images/Collab.png)|
|:--:|
|Breakdown of Collaborators and Contributions|


I chose language ratios and collaborator distribution as what I would visualise from the GitHub API because I think it provides an insight on the user's programming preferences and experiences.

Language breakdown of each repository reveals both a user's diversity and expertise in given languages.

Visualising the collaborators associated with each repository and how each has contributed provides an insight into what sort of work environments a user is exposed to. For example, if the user has experience working with large teams or by themselves.
