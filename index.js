const inputBox = document.getElementById('input-box');
const searchBtn = document.getElementById('search-btn');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const repos = document.getElementById('repos');
const gists = document.getElementById('gists');
const addr = document.getElementById('addr');
const hireStats = document.getElementById('hire');
const userLogin = document.getElementById('user-login');
const imgContainer = document.getElementById('image-container');
const twitter = document.getElementById('twitter-username')
const bio = document.getElementById('bio');

const githubApiLink = "https://api.github.com/users/";

const addImage = (imageUrl) => {
    const image = document.createElement('img');
    imgContainer.appendChild(image);
    image.src = imageUrl;
    image.style.width = "150px";
}

if (hireStats.innerText == null || "") {
    hireStats.style.display = "none";
}
inputBox.addEventListener("change", (e) => {
    e.preventDefault();
    inputBox.value = (e.target.value)

    let username = inputBox.value;

    searchBtn.onclick = async () => {
        const user = await fetchUser(username);
        addImage(user.avatar_url);
        userLogin.innerText = user.login;
        bio.innerText = user.bio;
        followers.innerText = user.followers;
        following.innerText = user.following;
        addr.innerText = user.location;
        twitter.innerText = '@' + user.twitter_username
        repos.innerText = user.public_repos;
        gists.innerText = user.public_gists;

        if (user.hireable !== null) {
            hireStats.innerText = "Open to Work"
        }
        else {
            hireStats.innerHTML = "Chilling"
        }

        twitter.onclick = () => window.location.href('https:://x.com/' + user.twitter_username)
        inputBox.value = "";

    }
    inputBox.value = "";

});

const fetchUser = async (username) => {
    const response = await fetch(githubApiLink + username);
    const data = await response.json();
    return data;
}
