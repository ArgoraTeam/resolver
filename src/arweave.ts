require("dotenv").config();
import Arweave from 'arweave';
import ArDB from 'ardb';

const arweave = Arweave.init({
  host: process.env.GATEWAY,// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

const ardb = new ArDB(arweave);

export {
  arweave,
  ardb
};