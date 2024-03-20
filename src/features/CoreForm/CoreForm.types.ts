export type BIQWithPercent = {
  BIQ: string;
  percent: number;
  hours: number;
};

export type Employee = {
  fio: string;
  fioShort: string;
  jiraLogin: string;
  psu: number;
  BIQsWithPercent: BIQWithPercent[];
};

export type Inputs = {
  projectName: string;
  planningStartDate: string;
  monthWorkHours: number;
  employees: Employee[];
};
