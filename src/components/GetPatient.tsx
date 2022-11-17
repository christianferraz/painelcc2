import { GetStaticProps } from "next";
import { api } from "../lib/axios";

interface GetPatientProps {
  patients: {
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
  }[];
}

const GetPatient = ({ patients }: GetPatientProps) => {
  return (
    <div>
      <ul>
        {patients.map((patient) => {
          return <li key={patient.Prontuario}>{patient.DataInternacao}</li>;
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const patients = await api.get("/api/patients");
    console.log(patients.data);
    return {
      props: {
        patients,
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default GetPatient;
