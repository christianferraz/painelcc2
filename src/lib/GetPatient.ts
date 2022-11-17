import { rejects } from "assert";
import { pool, queryCC2, queryFugulin } from "../conectDB";
import { DataQuery, DataRespose } from "../types";

export default async function GetPatient(): Promise<DataRespose[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let pac = await pool.query<DataQuery>(queryCC2);
      const pacientesTemp = await Promise.all(
        pac.rows.map(async (a) => {
          a.NomePaciente = a.NomePaciente.match(/\b(\w)/gi)?.join(
            " "
          ) as string;
          a.dias.days = a.dias.days || 0;
          let bg =
            a.dias.days < 4
              ? "#75a787"
              : a.dias.days > 5
              ? "#be4541"
              : "#d1d530";
          let color =
            a.dias.days < 4 ? "white" : a.dias.days > 5 ? "white" : "black";
          let Resfugulin = await pool.query(queryFugulin(a.Prontuario));
          let fugulin: number =
            Resfugulin.rows.length > 0 ? Resfugulin.rows[0].medicao : 0;

          a.dia = `${
            a.dias.days
              ? a.dias.days > 1
                ? `${a.dias.days} dias`
                : `${a.dias.days} dia`
              : ""
          }`;
          return { ...a, bg, color, fugulin };
        })
      );
      let pacientes = pacientesTemp.sort((a, b) =>
        a.Leito > b.Leito ? 1 : -1
      );
      return resolve(pacientes);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
}
