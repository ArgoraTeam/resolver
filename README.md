# Metaweave resolver

Resolve Argora protocol metadata, generate Open Graph Protocol (OGP) html tags and redirect to the concerned weeve/user.

# Getting started

```
$ cp .env-example .env
$ npm install
$ npm start
```

Open your browser and go on http://localhost:3000/_XsCToKBa971rQIY-_VcSVqIptn0vamfxfp9WQ8Po_Q

If you are redirected to a Weeve with the following image, then it works :)

![Ushuaia](https://rrlmwqn6j7k3mtdcdpdwxdqtsrjqlbiytnqdezi3at5inni4kfxq.arweave.net/jFbLQb5P1bZMYhvHa44TlFMFhRibYDJlGwT6hrUcUW8)

# Purpose

The released version of the above link is the following: http://r.metaweave.xyz/_XsCToKBa971rQIY-_VcSVqIptn0vamfxfp9WQ8Po_Q

The resolver request data according to a txid or a wallet address and generate an html response with OGP tags. This way, we are able to use native web 2 capabilities to show a preview of the Weeve and User profile when it is shared on these platforms.

Here is an example on Signal App with the same Weeve than before and another one without an image attached:

<img width="606" alt="Screenshot 2022-04-29 at 17 07 48" src="https://user-images.githubusercontent.com/7074019/165972170-f17754a9-287a-4c89-a71e-cb8f4a76f001.png">

# To do

Currently the code is a simple proof of concept, `domain.ltd/<txid>` generates OGP html and redirect to `arweave.net->metaweave/thread/<txid>`

- Routing:
  - `domain.ltd/t/<txid>` -> redirect to a Weeve: `arweave.net->metaweave/thread/<txid>`
  - `domain.ltd/u/<wallet address>` -> redirect to an user profile: `arweave.net->metaweave/profile/<wallet address>`

- Features:
  - Weeve: `<meta property="og:image" content="picture url" />` links to a default picture of [Metaweave logo](https://clqdnswlpdrdmjykpevfim6d6zwjpmh6wb5g5fxocsvtrn4ajqra.arweave.net/EuA2yst44jYnCnkqVDPD9myXsP6wem6W7hSrOLeATCI) when there is no picture to show from a Weeve.
  - User profile: `<meta property="og:image" content="picture url" />` links to the Avatar from their [`arweave-account`](https://github.com/MetaweaveTeam/arweave-account) profile, if there is no Avatar, it will link to a generated Avatar image containing 3 first and 3 last characters of their wallet key as a substitute Avatar.
  - Splash Screen: The [metaweave splash-screen](https://github.com/MetaweaveTeam/splash-screen) will show up and redirection will be delayed by 2 seconds.

- Refactoring:
  - Rename mentions of Argora to Metaweave

## Font/colors guidelines

Fonts: 
- text: `Arial`
- txid: `monospace`
- wallet key: `monospace`

Colors palette:
- white: ![#ffffff](https://via.placeholder.com/15/ffffff/000000?text=+) `#ffffff`
- white alt: ![#f9f9f9](https://via.placeholder.com/15/f9f9f9/000000?text=+) `#f9f9f9`
- white alt 2: ![#f3f4ff](https://via.placeholder.com/15/f3f4ff/000000?text=+) `#f3f4ff`
- black: ![#000000](https://via.placeholder.com/15/000000/000000?text=+) `#000000`
- black alt: ![#18152e](https://via.placeholder.com/15/18152e/000000?text=+) `#18152e`
- black alt 2: ![#0c0e33](https://via.placeholder.com/15/0c0e33/000000?text=+) `#0c0e33`
- purple: ![#bc00ff](https://via.placeholder.com/15/bc00ff/000000?text=+) `#bc00ff`
- pink: ![#f817b5](https://via.placeholder.com/15/f817b5/000000?text=+) `#f817b5`
