export interface GetPatientProps {
  Prontuario: number;
  NomePaciente: string;
  idade: {
    years: number;
    months: number;
    days: number;
  };
  NomeResponsavel: string;
  DataInternacao: string;
  dias: {
    hours: number;
    minutes: number;
    seconds: number;
    days: number;
  };
  Unidade: string;
  Especialidade: string;
  Leito: string;
  dia: string;
  bg: string;
  color: string;
  fugulin: number;
}
