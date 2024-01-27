let cred = require("./cred.json");
let CSEnvVar = require("/workspaces/.codespaces/shared/environment-variables.json")

main();

async function main() {
  // await sleep(10000);

  let currentIndex = cred.GitHubAccs.findIndex(acc => acc.codespace_name === CSEnvVar.CODESPACE_NAME);
  if (currentIndex++ > cred.GitHubAccs.length) {
    startstopCodespace(cred.GitHubAccs[0], "start");
  } else {
    startstopCodespace(cred.GitHubAccs[currentIndex++], "start");
  }
}

/**
 * 
 * @param CODESPACE_NAME String value of the codespace (e.g. probable-bassoon-7vvqx7p4775v2xj49)
 * @param startstop String value to "start", or "stop" a codespace
 */
function startstopCodespace(CODESPACE_NAME, startstop) {
  if (startstop === "start" || startstop === "stop") {
    console.log(startstop);
    var headers = new Headers();
    headers.append("accept", "application/vnd.github+json");
    headers.append("X-GitHub-Api-Version", "2022-11-28");
    headers.append(`Authorization", "Bearer ${cred.GitHubAccs[CODESPACE_NAME].token}`);
    
    var requestOptions = {
      method: 'POST',
      headers: headers,
      redirect: 'follow'
    };

    fetch(`https://api.github.com/user/codespaces/${CODESPACE_NAME}/${startstop}`, requestOptions)
      .then(response => response.json())
      // .then(result => console.log(result))
      .then(startstopCodespace(CSEnvVar.CODESPACE_NAME, "stop"))
      .catch(error => console.log('error', error));
  } else {
    return
  }
}
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}