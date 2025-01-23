export interface IServiceBus {
  sendMessage(message: any): Promise<void>;
  receiveMessage(): Promise<void>;
}

export const IServiceBus = Symbol('IServiceBus');
