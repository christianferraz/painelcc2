import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { GetPatientProps } from "../interfaces";
import GetPatient from "../lib/GetPatient";
import styled from "../styles/Home.module.css";

const Home = ({ patients }: any) => {
  const [tabela, setTabela] = useState<GetPatientProps[] | null>([]);
  const [nr_page, setNrPage] = useState<number>(0);
  const pacientes: GetPatientProps[] = JSON.parse(patients);
  const pageLength = 15;
  const TotalPage = Math.ceil(pacientes.length / pageLength);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    interval = setInterval(() => {
      if (nr_page > TotalPage - 2) {
        setNrPage(0);
      } else {
        setNrPage((e) => e + 1);
      }
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, [TotalPage, nr_page]);

  useEffect(() => {
    if (nr_page < 1) {
      setTabela(pacientes.slice(0, pageLength));
    } else if (nr_page > 0 && nr_page < pageLength) {
      setTabela(
        pacientes.slice(nr_page * pageLength, 2 * (nr_page * pageLength))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nr_page]);

  return (
    <>
      <table className={styled.tableHumap}>
        <thead>
          <tr>
            <th>LEITO</th>
            <th>NOME</th>
            <th>IDADE</th>
            <th>FUGULIN</th>
            <th>MÉDICO</th>
            <th>ESPECIALIDADE</th>
            <th>DATA INTERNAÇÃO CC2</th>
            <th>DIAS</th>
          </tr>
        </thead>
        <tbody>
          {tabela?.map((patient) => {
            return (
              <tr
                key={patient.Prontuario}
                style={{ background: patient.bg, color: patient.color }}
              >
                <td>{patient.Leito}</td>
                <td>{patient.NomePaciente}</td>
                <td>{patient.idade.years}</td>
                <td>{patient.fugulin}</td>
                <td>{patient.NomeResponsavel}</td>
                <td>{patient.Especialidade}</td>
                <td>{patient.DataInternacao}</td>
                <td>{patient.dias.days}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const patients = await GetPatient();
    return {
      props: {
        patients: JSON.stringify(patients),
      },
      revalidate: 300,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default Home;
