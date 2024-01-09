const APIURL = 'http://api.github.com/users/'
const form = document.getElementById('form')
const main = document.getElementById('main')
const search = document.getElementById('search')

async function getUser(username) {
    try{
        const {data} = await axios(APIURL + username)
        createUserCard(data) 
        getRepos(username)  
    }   
    catch (err) {
        if (err.response.status == 404) {
        createErrorCard('Profile not found.')
         }
    }
}

async function getRepos(username) {
    try{
        const {data} = await axios(APIURL + username + '/repos?sort=created')
        addReposToCard(data)    
    }   
    catch (err) { 
        createErrorCard('Problem in getting repos.')
    }
}

function createUserCard (user){
        const cardHTML = `    
        <div class="card">
        <div>
            <img src=${user.avatar_url} alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
    `
    main.innerHTML = cardHTML
}

function createErrorCard (msg) {
    const cardHTML = `
        <div class="card">
        <h1>${msg}</h1>
        </div>    
    `
    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposElement = document.getElementById('repos')

    repos
    .slice(0, 15)
    .forEach(repo => {
        const repoEle = document.createElement('a')
        repoEle.classList.add('repo') 
        repoEle.href= repo.html_url
        repoEle.target= '_blank'
        repoEle.innerText= repo.name

        reposElement.appendChild(repoEle)
    })
}
form.addEventListener('submit',(e) => {
    e.preventDefault()
    const user = search.value

    if(user) {
        getUser(user)
        search.value =''
    }
})