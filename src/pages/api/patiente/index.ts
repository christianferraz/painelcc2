// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import GetPatient from "../../../lib/GetPatient";

import { DataQuery, DataRespose } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRespose[]>
) {
  try {
    const pacientes = await GetPatient();

    res.status(200).json(pacientes);
  } catch (error) {
    console.log("Erro ", error);
  }
}
