export type BIQWithPercent = {
  BIQ: string;
  percent: number;
  hours: number;
};

export type Employee = {
  fio: string;
  surname: string;
  jiraLogin: string;
  psu: number;
  BIQsWithPercent: BIQWithPercent[];
};

export type Inputs = {
  projectName: string;
  monthName: string;
  monthWorkHours: number;
  employees: Employee[];
};
