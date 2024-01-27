const cred = require("./cred.json");
const CSEnvVar = require("/workspaces/.codespaces/shared/environment-variables.json");

main();

async function main() {
  await sleep(100000);

  let currentIndex = cred.GitHubAccs.findIndex(acc => acc.codespace_name === CSEnvVar.CODESPACE_NAME);
  if (currentIndex + 1 > cred.GitHubAccs.length - 1) {
    startstopCodespace(0, "start"); // Pass 0 as the index to start from the beginning
  } else {
    startstopCodespace(currentIndex + 1, "start"); // Pass currentIndex + 1 as the index
  }

  await sleep(25000);
  startstopCodespace(currentIndex, "stop")
}

function startstopCodespace(newindex, startstop) {
  console.log(startstop + " - " + newindex);
  if (startstop === "start" || startstop === "stop") {
    var headers = new Headers();
    headers.append("accept", "application/vnd.github+json");
    headers.append("X-GitHub-Api-Version", "2022-11-28");
    headers.append("Authorization", `Bearer ${cred.GitHubAccs[parseInt(newindex)].token}`);
    
    var requestOptions = {
      method: 'POST',
      headers: headers,
      redirect: 'follow'
    };

    fetch(`https://api.github.com/user/codespaces/${cred.GitHubAccs[parseInt(newindex)].codespace_name}/${startstop}`, requestOptions)
      .then(response => response.json())
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));
  } else {
    return;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
