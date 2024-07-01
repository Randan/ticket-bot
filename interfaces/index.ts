interface ITicket {
  id: number;
  chtime: string;
}

interface IFreedatesforoffice {
  cnt: number;
  chdate: string;
}

export interface IFreeTicket {
  rows: ITicket[];
  trows: ITicket[];
  freedatesforoffice: IFreedatesforoffice[];
}
