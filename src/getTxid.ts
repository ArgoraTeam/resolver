import { T_txid, T_weeve } from "./types";
import {arweave, ardb} from './arweave';
import ArdbTransaction from "ardb/lib/models/transaction";

const getTxid = async (txid: T_txid): Promise<T_weeve> => {
  let weeveData = null;
  try {
    const tx = <ArdbTransaction> await ardb.search('transactions')
      .ids([txid])
      .findOne();

    // get the tx data from the optimistic cache
    const response = await arweave.api.get(`${txid}`)
    const data = response.data;

    // retrieve the community the weeve was posted in
    let community = 'tags' in tx ? tx.tags.find(tag => tag.name === 'community')?.value : undefined;

    if(tx.owner?.address && txid && typeof data === "object"){
      let _data = data._data;
      weeveData = {
        id: txid,
        text: _data.text,
        picture: _data.pictures ? _data.pictures[0] : null,
        address: tx.owner.address,
        time: tx.block?.timestamp,
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