require("dotenv").config();
const sharp = require('sharp');
import { T_weeve, T_address } from "./types";
import Account from 'arweave-account'

const account = new Account();

export async function generateWalletImage(address: T_address) {
  let shortAddress = `${address.substring(0,3)}...${address.substring(address.length-3)}`;
  const svgBuffer =  Buffer.from(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg width="100%" height="100%" viewBox="0 0 800 800" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <rect x="0" y="0" width="800" height="800"/>
      <g transform="matrix(1,0,0,1,-121,123)">
          <text x="214px" y="310px" style="font-family:'ArialMT', 'Arial', sans-serif;font-size:144px;fill:white;">${shortAddress}</text>
      </g>
  </svg>
  `);
  let buff = await sharp(svgBuffer)
    .resize(800,800)
    .png()
    .toBuffer();
  return buff;
}


export async function forWeeve (weeve: T_weeve) {
  if(weeve) {

    let pictureTxid = weeve.picture;
  
    if (!pictureTxid) {
      // Assign the users arweave-account image if there's no image in the weeve
      const accountInfo = await account.get(weeve.address);
      const profile = accountInfo?.profile;
      if (profile)
        pictureTxid = profile.avatar;
    }

    // Assign the default metaweave logo if theres no profile or weeve image
    if (!pictureTxid)
      pictureTxid = "EuA2yst44jYnCnkqVDPD9myXsP6wem6W7hSrOLeATCI";

    return`
    <!DOCTYPE html>
    <html lang="en">
      <head prefix="https://ogp.me/ns/article">
        <meta charset="utf-8">
        <title>${weeve.id}</title>
        <meta property="og:title" content="${weeve.text}" />
        <meta property="og:image" content="https://${process.env.GATEWAY}/${pictureTxid}" />
        <meta property="og:url"   content="https://${process.env.GATEWAY}/${weeve.id}" />
        <meta property="og:site_name"   content="Metaweave.xyz" />
        <meta property="og:type"        content="article" />
        <meta property="article:author" content="${weeve.address}" />
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="logo">
        <div id="subdomain">
          account
        </div>
        <img src="/metaweave-dark.svg" alt="metaweave logo">
        <div id="text">
          metaweave.xyz
        </div>
        </div>
        <script>
          setTimeout(() => {
            window.location.href = "https://${process.env.GATEWAY}/${process.env.METAWEAVE_TXID}/thread/${weeve.id}";
          }, 2000);
        </script>
      </body>
    </html>`
  } else {
    return `corrupted weeve`;
  }
};

export async function forProfile (basePath:string, address: T_address) {
  
  if (address) {
    const accountInfo = await account.get(address);
    const profile = accountInfo?.profile;

    let url = `https://${process.env.GATEWAY}/${profile?.avatar}`;
    let handle = profile?.handle;

    if (!profile) {
      url = `${basePath}/img/${address}`;
      handle = address;
    } 
  
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head prefix="https://ogp.me/ns/article">
        <meta charset="utf-8">
        <title>${handle}</title>
        <meta property="og:title" content="${handle}" />
        <meta property="og:image" content="${url}" />
        <meta property="og:url"   content="${url}" />
        <meta property="og:site_name"   content="Metaweave.xyz" />
        <meta property="og:type"        content="profile" />
        <meta property="article:author" content="${address}" />
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="logo">
        <div id="subdomain">
          account
        </div>
        <img src="/metaweave-dark.svg" alt="metaweave logo">
        <div id="text">
          metaweave.xyz
        </div>
        </div>
      <script>
        setTimeout(() => {
          window.location.href = "https://${process.env.GATEWAY}/${process.env.METAWEAVE_TXID}/profile/${address}";
        }, 2000);
      </script>
      </body>
    </html>`
  }
}