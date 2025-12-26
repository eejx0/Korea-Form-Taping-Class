export type ReferenceItem = {
    id: string;
    title: string;
    file: string;
    dates: string;
};

export type GetReferenceListResponse = {
    items: ReferenceItem[];
    maxPage: number;
    total: number;
};

export type GetReferenceResponse = {
    id: string;
    title: string;
    file: string;
    dates: string;
};
