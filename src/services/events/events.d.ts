export interface GetEventsParamsProps {
  room: string;
}

export interface EventProps {
  _id: string;
  room: string;
  title: string;
  description: string;
  package: string;
  datetime: string;
  sender: string;
  amount: number;
  securityCode: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateEventBodyProps = Omit<EventProps, '_id'>;
