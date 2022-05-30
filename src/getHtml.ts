require("dotenv").config();
const sharp = require('sharp');
import { T_weeve, T_address } from "./types";
import Account from 'arweave-account'

const account = new Account();

export async function generateWalletImage(address: T_address) {
  let shortAddress = `${address.substring(0,3)}...${address.substring(address.length-3)}`;
  const svgBuffer =  Buffer.from(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg width="100%" height="100%" viewBox="0 0 800 800" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
      <rect x="-1" y="0" width="801" height="800"/>
      <g transform="matrix(1,0,0,1,-121,346)">
          <text x="160px" y="308.684px" textLength="90%" style="font-family:Monospace, sans-serif;font-size:140px;fill:white;">${shortAddress}</text>
      </g>
      <g transform="matrix(1.72148,0,0,1.72148,67.2047,-60.604)">
          <path d="M58,90L202,164L204,189L231,199L251,187L260,176L280,172L305,184L337,192L302,209L287,225L266,264L225,286L198,290L192,307L135,316L87,301L62,273L51,246L129,252L141,243L133,242L133,233L99,222L68,182L53,141L58,90ZM63,100L195,168L198,194L232,206L256,192L263,182L279,178L298,188L321,194L302,201L284,218L262,258L223,279L177,288L188,292L188,300L132,308L94,296L66,265L64,255L129,260L146,250L187.925,244.062L191,243L142,236L142,229L104,215L75,179L61,142L63,100ZM269,192L273,187L277,191L275,194L271,194L269,192ZM221,185L217,186L213,183L261,119L349,84L299,170L296,171L291,169L334,97L265,124L221,185Z" style="fill:url(#_Linear1);stroke:url(#_Linear2);stroke-width:1.16px;"/>
      </g>
      <defs>
          <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-223,232,-180.617,-173.611,344,95)"><stop offset="0" style="stop-color:rgb(255,0,191);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(206,0,255);stop-opacity:1"/></linearGradient>
          <linearGradient id="_Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-239,226,-175.946,-186.067,350,83)"><stop offset="0" style="stop-color:rgb(255,0,186);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(206,0,255);stop-opacity:1"/></linearGradient>
      </defs>
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
          resolver
        </div>
        <img src="/metaweave-gradient-dark.svg" alt="metaweave logo">
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
          resolver
        </div>
        <img src="/metaweave-gradient-dark.svg" alt="metaweave logo">
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