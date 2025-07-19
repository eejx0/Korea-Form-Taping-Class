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

export type GetScheduleDetailResponse = {
    title: string;
    file: string;
    dates: string;
    id: string;
}

export type Jobs = 'DOCTOR' | 'STUDENT';
export type Types = 'DEFAULT' | 'SECOND' | 'MORE';

export type GetEducationFeeRequest = {
    job: Jobs;
    id: string;
    type: Types;
}