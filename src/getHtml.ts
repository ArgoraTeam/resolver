require("dotenv").config();
import { T_weeve, T_address } from "./types";
import Account from 'arweave-account'

const account = new Account();

export function forWeeve (weeve: T_weeve) {
  if(weeve)
    return`
    <!DOCTYPE html>
    <html lang="en">
      <head prefix="https://ogp.me/ns/article">
        <meta charset="utf-8">
        <title>${weeve.id}</title>
        <meta property="og:title" content="${weeve.text}" />
        <meta property="og:image" content="https://${process.env.GATEWAY}/${weeve.picture}" />
        <meta property="og:url"   content="https://${process.env.GATEWAY}/${weeve.id}" />
        <meta property="og:site_name"   content="Metaweave.xyz" />
        <meta property="og:type"        content="article" />
        <meta property="article:author" content="${weeve.jwk}" />
      </head>
      <body>
        <script>
          window.location.replace("https://${process.env.GATEWAY}/${process.env.ARGORA_TXID}/thread/${weeve.id}");
        </script>
      </body>
    </html>`
  else
    return `corrupted weeve`;
};

export async function forProfile (address: T_address) {
  
  if (address) {
    const accountInfo = await account.get(address);
    const profile = accountInfo?.profile;
    console.log(profile);

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head prefix="https://ogp.me/ns/article">
        <meta charset="utf-8">
        <title>${profile?.handle}</title>
        <meta property="og:title" content="${profile?.handle}" />
        <meta property="og:image" content="https://${process.env.GATEWAY}/${profile?.avatar}" />
        <meta property="og:url"   content="https://${process.env.GATEWAY}/${profile?.avatar}" />
        <meta property="og:site_name"   content="Metaweave.xyz" />
        <meta property="og:type"        content="profile" />
        <meta property="article:author" content="${address}" />
      </head>
      </head>
      <body>
      <script>
        window.location.replace("https://${process.env.GATEWAY}/${process.env.ARGORA_TXID}/profile/${address}");
      </script>
      </body>
    </html>`
  }
}