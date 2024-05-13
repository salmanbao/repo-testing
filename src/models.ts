import { Network, ProcessStatus, RequestStatus } from './types';

export type DropRequest = {
    id: number;

    userId: string;

    status: RequestStatus;

    created_at: Date;

    updated_at: Date;

    transactions: DropTransaction[];
};

export type DropTransaction = {
    id: number;

    request: DropRequest;

    adminId: string;

    address: string;

    amount: number;

    txHash: string;

    network: Network;

    status: ProcessStatus;

    created_at: Date;

    updated_at: Date;
};

export type PingResponse = {
    lastRequest: DropRequest | null;

    newRequest: DropRequest | null;

    lastAdminId: string | null;

    nextAdminId: string | null;
};
