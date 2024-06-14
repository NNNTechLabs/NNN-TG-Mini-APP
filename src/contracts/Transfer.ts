import { Address, Cell, Contract, beginCell, contractAddress, ContractProvider, SendMode, Sender } from "ton-core";

export type TransferContractConfig = {
    number: number;
    owner_address: Address;
};

export function transferContractConfigToCell(config: TransferContractConfig): Cell {
    return beginCell()
        .storeUint(config.number, 32)
        .storeAddress(config.owner_address)
        .endCell();
}

export class TransferContract implements Contract {

    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell }
    ) { }

    static createFromConfig(
        config: TransferContractConfig,
        code: Cell,
        workchain = 0
    ) {
        const data = transferContractConfigToCell(config);
        const init = { code, data };
        const address = contractAddress(workchain, init);

        return new TransferContract(address, init);
    }

    async getBalance(provider: ContractProvider) {
        const { stack } = await provider.get("balance", []);
        return {
            number: stack.readNumber(),
        };
    }

    async sendDeploy(
        provider: ContractProvider,
        via: Sender,
        value: bigint
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendDeposit(
        provider: ContractProvider,
        via: Sender,
        value: bigint
    ) {
        const msg = beginCell()
            .storeUint(6, 32)
            .storeUint(0, 64)
            .endCell();

        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: msg
        })
    }

}