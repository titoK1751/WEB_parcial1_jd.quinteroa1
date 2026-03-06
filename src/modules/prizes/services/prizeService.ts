import { fetcher } from "@/shared/services/http";
import { prizeFormData } from "../validation/prizeSchema";

export type PrizeStatus = "won" | "nominated";

export interface Prize {
    id: string;
    name: string;
    category: string;
    year: number;
    status: PrizeStatus;
}

export const fetchPrizes = (): Promise<Prize[]> => {
    return fetcher<Prize[]>("/v1/prizes");
};

export const createPrize = (data: prizeFormData): Promise<Prize> => {
    return fetcher<Prize>("/v1/prizes", {
        method: "POST",
        body: JSON.stringify(data),
    });
};
