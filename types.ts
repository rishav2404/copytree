
export interface TransformationResult {
  original: string;
  processed: string;
  timestamp: number;
}

export enum StatusType {
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PROCESSING = 'PROCESSING'
}
