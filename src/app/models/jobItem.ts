import { JobStatus } from "./JobStatus";

export interface TranslationJob {
    id: number;
    customerName: string;
    status: JobStatus;
    originalContent: string;
    translatedContent: string;
    price: number;
}


