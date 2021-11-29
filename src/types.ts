type T_txid = string;
type T_jwk = string;
type T_community = string;

type T_weeve = null | {
  id: T_txid,
  text: string,
  picture: T_txid | null,
  jwk: T_jwk,
  time: number | undefined,
  community: T_community | undefined
}

export {T_txid, T_weeve};