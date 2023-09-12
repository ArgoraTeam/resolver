# Metaweave resolver

Resolve Argora protocol metadata, generate Open Graph Protocol (OGP) html tags and redirect to the concerned weeve/user.

# Getting started

```
$ cp .env-example .env
$ npm install
$ npm start
```

Open your browser and go on http://localhost:3000/t/_XsCToKBa971rQIY-_VcSVqIptn0vamfxfp9WQ8Po_Q

If you are redirected to a Weeve with the following image, then it works :)

![Ushuaia](https://rrlmwqn6j7k3mtdcdpdwxdqtsrjqlbiytnqdezi3at5inni4kfxq.arweave.net/jFbLQb5P1bZMYhvHa44TlFMFhRibYDJlGwT6hrUcUW8)

# Purpose

The released version of the above link is the following: http://r.metaweave.xyz/t/_XsCToKBa971rQIY-_VcSVqIptn0vamfxfp9WQ8Po_Q

The resolver request data according to a txid or a wallet address and generate an html response with OGP tags. This way, we are able to use native web 2 capabilities to show a preview of the Weeve and User profile when it is shared on these platforms.

Here is an example on Signal App with the same Weeve than before and another one without an image attached:

<img width="606" alt="Screenshot 2022-04-29 at 17 07 48" src="https://user-images.githubusercontent.com/7074019/165972170-f17754a9-287a-4c89-a71e-cb8f4a76f001.png">
