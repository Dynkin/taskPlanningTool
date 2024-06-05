export type BIQWithPercent = {
  BIQ: string | undefined;
  percent: number;
  hours: number;
};

export type Employee = {
  fio: string;
  fioShort: string;
  jiraLogin: string;
  psu: number;
  vacationsDays: number;
  BIQsWithPercent: BIQWithPercent[];
};

export type Inputs = {
  projectName: string;
  planningStartDate: string;
  monthWorkHours: number;
  employees: Employee[];
};
