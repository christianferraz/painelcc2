import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.DATABASE_DB,
  password: process.env.PASSWORD_DB,
  port: parseInt(process.env.PORT_DB!),
});

export const queryCC2 = `
SELECT distinct
	pac.prontuario As "Prontuario",
	pac.nome As "NomePaciente",
	age(pac.dt_nascimento) as "idade",
	pessoas.nome As "NomeResponsavel",
	to_char(mov.dthr_lancamento, 'DD/MM/YYYY HH:MM:SS' ) As "DataInternacao",
  age(mov.dthr_lancamento) As dias,
	unidade.descricao AS "Unidade",
	esp.nome_especialidade As "Especialidade",
	mov.lto_lto_id As "Leito"
FROM	agh.ain_internacoes inter
    LEFT JOIN agh.rap_servidores serv ON inter.ser_matricula_professor = serv.matricula
	LEFT JOIN agh.rap_pessoas_fisicas pessoas ON pessoas.codigo = serv.pes_codigo
	LEFT JOIN agh.aip_pacientes pac ON inter.pac_codigo = pac.codigo
        LEFT JOIN agh.ain_movimentos_internacao mov on inter.seq = mov.int_seq and mov.dthr_lancamento = ( Select Max( dthr_lancamento ) From agh.ain_movimentos_internacao a Where a.int_seq = inter.seq Group By a.int_seq )

	LEFT JOIN agh.ain_leitos leito ON leito.lto_id = inter.lto_lto_id
	LEFT JOIN agh.agh_unidades_funcionais unidade  ON unidade.seq = mov.unf_seq
	LEFT JOIN agh.agh_especialidades esp ON esp.seq = mov.esp_seq
	LEFT JOIN agh.ain_tipos_carater_internacao tci ON inter.tci_seq = tci.seq
	LEFT JOIN agh.ain_tipos_mvto_internacao tmi ON mov.tmi_seq = tmi.seq
	LEFT JOIN agh.ain_tipos_alta_medica tam ON inter.tam_codigo = tam.codigo
WHERE   inter.dt_saida_paciente is null -- Censo de Pacientes se somente esta linha
and unidade.descricao like 'CC2%' and usuario is not null`;

export const queryFugulin = (pront: number) => {
  return `select distinct contr.medicao, hr_ctrl.data_hora from agh.aip_pacientes As pac INNER JOIN
agh.ecp_horario_controles As hr_ctrl on pac.codigo=hr_ctrl.pac_codigo INNER JOIN
agh.ecp_controle_pacientes As contr on hr_ctrl.seq=contr.hct_seq INNER JOIN
agh.ecp_item_controles As item on item.seq=contr.ice_seq
where pac.prontuario=${pront} and item.seq=20345 order by data_hora desc limit 1`;
};
