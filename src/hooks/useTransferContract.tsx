import { TransferContract } from "../contracts/Transfer";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";
import { toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";

export function useTransferContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const transferContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new TransferContract(
      Address.parse("EQBsklt-v9ftMsh1JXfn34oRAoj9OD6Ou3miSnzHSl0xLl8O")
    );
    return client.open(contract) as OpenedContract<TransferContract>;
  }, [client]);

  return {
    address: transferContract?.address.toString(),
    sendDeposit: () => {
      return transferContract?.sendDeposit(sender, toNano("0.006369225"));
    },
  };
}
