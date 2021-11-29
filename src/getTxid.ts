import { T_txid, T_weeve } from "./types";
import {arweave, ardb} from './arweave';

const getTxid = async (txid: T_txid): Promise<T_weeve> => {
  let weeveData = null;
  try {
    const tx = await ardb.search('transactions')
      .ids([txid])
      .findOne();

    const data = await arweave.transactions.getData(tx.id, {decode: true, string: true});
    let community = 'tags' in tx ? tx.tags.find(tag => tag.name === 'community')?.value : undefined;

    if('owner' in tx && 'id' in tx && typeof data === "string"){
      let _data = JSON.parse(data)._data;
      weeveData = {
        id: tx.id,
        text: _data.text,
        picture: _data.pictures ? _data.pictures[0] : null,
        jwk: tx.owner.address,
        time: 'block' in tx ? tx.block?.timestamp : undefined,
        community: community
      };
    }
    else{
      console.error("This weeve is corrupted");
    }
  } catch(e) {
    console.error(`Could not retrieve Weeve: ${e}`);
  }
  
  return weeveData;
}

export default getTxid;