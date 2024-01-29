# Github Codespace Server (GHCS)
## Concept
Github is providing a total of 120core/hours computing time in Github Workspaces to everyone, every month for free. The idea behind this script is, that you have about 13 to 26 ( 31d * 24h / ( 120c/h /  2c -> 4c  ) ) Github Accounts which will loop through them selfs every 4 hours (4h timeout) and theirefore you will always have a running 2/4 core server for free.
This is fairly simple to do, because you can start/stop a workspace via the Github API and you can also run a startup command with in the Workspace which will run the script which will then start the next Worspace shortly before the 4h timeout.

## Current State
Right now the script is just a prove of concept. There are still a few problems which need to be solved.
For example an implementation of an DNS service for a stady connection Domain or the problem, or that every code space has to run on a different repostory which the account owns and therefore leads to an uneasy code deployment.

## Tutorial
1. To run this script you need a feew Github Accounts. An easy solution to that is to make a new Gmail/Goole Account with a rather long E-Mail Address which can be used multiple times just by seperating it with dots (e.g. example@gmail.com = e.xample@gmail.com = exam.ple@gmail.com).
2. Ones you have all your accounts, create a cred.json file inside the src folder and enter all the accounts you created. You just need to fill in the codespace_name and token field.
   1. For the token you have to create one for each account; [Create Github token](https://github.com/settings/tokens?type=beta). There you have to give read/write permission to 'Codespaces' and 'Codespaces lifecycle admin' which allows the start/stop of your codespaces.
   2. The codespace_name can be found in the top URL bar in your browser while the codespace is beeing opened.
3. Now create a new reposotory in each Account and copy the entiere scipt over.
4. If everything goes as planted, your codespcaces should switch between each other in a given time intervall. 
