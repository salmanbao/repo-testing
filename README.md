<h1 align="center" id="title">Drop Fee Script</h1>

<p align="center"><img src="https://cdn-icons-png.flaticon.com/512/5047/5047307.png" alt="project-image"></p>

The purpose of Drop-Fee Worker is to watch users who need **SCRT** and **SOL** for minting NFT's on the respective blockchains. Drop-Fee worker **ping** the Serenity Shield backend after specific intervals and fetch the records in which users need SCRT/SOL and then transfer SCRT/SOL amounts specified in records. In order to faciliate users with **SCRT/SOL** drop-fee worker has its own wallets for both networks with enough funds.
After depositing SCRT/SOL into user wallets drop-fee worker update the records status from **PENDING** to **COMPLETE** against each user request.


<h2>🛠️ Installation Steps:</h2>

<p>1. Dependencies Installation</p>

```
yarn
```

<p>2. Setup Environment Variables</p>

```
yarn run setup
```

<p>3. Build</p>

```
yarn run build
```

<p>4. Start Script</p>

```
yarn run start
```

<p>5. Format Code</p>

```
yarn run format-all
```

<p>6. Lint Code</p>

```
yarn run lint
```

<p>7. Test</p>

```
yarn run test
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Node.Js
*   EsLint
*   Jest
*   PM2
*   


Events -> Jobs -> Runners -> Steps -> Actions