export type IFormInputKeys = "name" |
"description" |
"gatewayId" |
"toggle";

export type IFormInput2 =  {
  [key in IFormInputKeys as string]: string;
}

export interface IFormInput {
  "name": string,
  "description": string,
  "gatewayId": string,
  "toggle": boolean,
  "id"?: number | string
}

export interface Column {
  id: "name" | "description" | "gatewayId" | "toggle";
  label: string;
  minWidth?: string;
  align?: "center" | "right" | "left";
}


export type buttonOptions = 'gateways' | 'devices' | 'dashboard';

export type IItems = {
  [key in buttonOptions]: Column[];
}

export type buttonOptionsLabels = 'Gateways' | 'Devices' | 'Dashboard';