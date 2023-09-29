export declare type MekongSMSOptions = {
  endpoint: string;
  username: string;
  password: string;
  sender?: string;
}

export declare type MekongSMSSendOptions = {
  text: string;
  sender: string;
  phoneNumbers: string | string[];
  international?: boolean;
  customData?: string;
}

export declare type MekongSMSSendResult = {
  code: number;
  message: string;
}

export declare type MekongSMSCreditResult = {
  message?: string;
  credit?: number;
}

export declare class MekongSMS {
  constructor(options: MekongSMSOptions);
  send(options: MekongSMSSendOptions): Promise<MekongSMSSendResult[]>;
  credits(): Promise<MekongSMSCreditResult>;
}