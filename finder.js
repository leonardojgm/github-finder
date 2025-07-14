const USER = {
    login: String,
    name: String,
    bio: String,
    avatar_url: String,
    public_repos: Number,
    followers: Number,
    following: Number,
    repos: Array
}
const QUERY = document.querySelector('.query');
//console.log(QUERY);

async function getUser() {
    const URL = `https://api.github.com/users/${QUERY.value}`;
    const DATA = await fetch(URL);
    const USER_DATA = await DATA.json();
    
    if (USER_DATA.message === 'Not Found') {
        alert('Usuário não encontrado');

        return;
    }
    
    USER.login = USER_DATA.login;
    USER.name = USER_DATA.name;
    USER.bio = USER_DATA.bio;
    USER.avatar_url = USER_DATA.avatar_url;
    USER.public_repos = USER_DATA.public_repos;
    USER.followers = USER_DATA.followers;
    USER.following = USER_DATA.following;
    USER.repos = USER_DATA.repos;
    //console.table(USER);

    await getRepos();    
    getAllData();
}

async function getRepos() {
    const URL = `https://api.github.com/users/${QUERY.value}/repos`;
    const DATA = await fetch(URL);
    const REPOS_DATA = await DATA.json();
    
    USER.repos = REPOS_DATA;
    //console.table(USER.repos);
}

function getAllData() {
    const USER_INFO = document.getElementById("user");

    USER_INFO.setAttribute("style", "display: block");
    USER_INFO.innerHTML = `
        <div class="user-info">
            <div class="user-info-avatar">
                <h2 class="user-info-avatar-name">${USER.name == null ? (USER.name = "Sem nome de usuário") : USER.name}</h2>
                <h3 class="user-info-avatar-login">${USER.login}</h3>
                <img class="user-info-avatar-img" src="${USER.avatar_url}" alt="${USER.login}" tiltle="${USER.login}">
                <p class="user-info-avatar-bio">${USER.bio == null ? (USER.bio = "Sem biografia") : USER.bio}</p>
            </div>
            <div class="user-info-stats">
                <h2>Informações</h2>
                <p>Repos: ${USER.public_repos}</p>
                <p>Seguidores: ${USER.followers}</p>
                <p>Seguindo: ${USER.following}</p>
            </div>
        </div>
        ${USER.repos.map((repo) => `
            <div class="user-repos">
                <h3 class="user-repos-name">${repo.name}</h3>
                <p class="user-repos-description">${repo.description == null ? (repo.description = "Sem descrição") : repo.description}</p>
                <p class="user-repos-languages">${repo.language == null ? (repo.language = "Sem linguagem") : repo.language}</p>
                <p class="user-repos-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>💬 ${repo.watchers_count}</span>
                    <span>📦 ${repo.forks_count}</span>
                    <span>📅 ${new Date(repo.updated_at).toLocaleDateString('pt-br')}</span>
                    <a class="user-repos-link" href="${repo.html_url}" target="_blank">
                        <span>🔗 ${repo.html_url}</span>
                    </a>
                </p>
            </div>
        `).join('')}
    `
}