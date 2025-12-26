export type CertItem = {
    id: string;
    title: string;
    file: string;
    dates: string;
};

export type GetCertListResponse = {
    items: CertItem[];
    maxPage: number;
    total: number;
};

export type GetCertResponse = {
    id: string;
    title: string;
    file: string;
    dates: string;
};
