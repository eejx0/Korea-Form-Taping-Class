export type GetScheduleResponse = {
    id: string;
    title: string;
    file: string;
    dates: string;
    doctorFee: string;
    studentFee: string;
    isActive: string;
    doctorSecondFee: string;
    studentSecondFee: string;
    doctorAfterFee: string;
    studentAfterFee: string;
};

export type GetScheduleListResponse = {
    items: GetScheduleResponse[];
    maxPage: number;
    total: number;
};