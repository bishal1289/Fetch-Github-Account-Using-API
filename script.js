
      let profile = document.querySelector("#profile");
      let form = document.querySelector("#form");
      let search = document.querySelector("#search");

      const url = "https://api.github.com/users/";

      async function getUser(userName) {
        const resp = await fetch(url + userName);
        const respData = await resp.json();
        console.log(respData);

        displayUser(respData);

        getRepo(userName);
      }

      async function getRepo(userName) {
        const resp = await fetch(url + userName + "/repos");
        const respData = await resp.json();
        console.log(respData);

        displayRepo(respData);
      }

      function displayUser(user) {
        const cardHtml = `
        <div class="card">
            <div>
            <h2>${user.name} (@${search.value})</h2>
            <p>${user.bio}</p>

            
        </div>
        <div id='flx'>
          <div>
            <img class="avtar" src="${user.avatar_url}" alt="${user.name}"/>
        </div>
        <div>
             <ul class="info">
                <h5>Followers : ${user.followers}</h5>
                <h5>Following : ${user.following}</h5>
                <h5>Repos : ${user.public_repos}</h5>
            </ul>
        </div>
       
        </div>

        <h1>Repo List:</h1>
        <div id="repository">
            
        </div>
        
    </div>
    `;
        profile.innerHTML = cardHtml;
      }

      function displayRepo(repos) {
        const repository = document.querySelector("#repository");

        repos.forEach(function (ele) {
          const repoEle = document.createElement("a");
          const div = document.createElement("div");
          div.classList.add("repoDiv");
          repoEle.href = ele.html_url;
          repoEle.target = "_blank";
          repoEle.innerText = ele.name;
          div.append(repoEle);
          repository.append(div);
        });
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const user = search.value;
        

        if (user) {
          getUser(user);
        }
      });
    