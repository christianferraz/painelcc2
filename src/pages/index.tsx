import { GetStaticProps } from "next";
import { useEffect } from "react";
import { api } from "../lib/axios";
import GetPatient from "../lib/GetPatient";

interface GetPatientProps {
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

const Home = ({ patients }: any) => {
  const pacientes: GetPatientProps[] = JSON.parse(patients);
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    interval = setInterval(() => {
      alert(pacientes.length);
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      {pacientes.map((patient) => {
        return <li key={patient.Prontuario}>{patient.NomePaciente}</li>;
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const patients = await GetPatient();
    return {
      props: {
        patients: JSON.stringify(patients),
      },
      revalidate: 600,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default Home;
