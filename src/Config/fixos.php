<?php

define('PATH_URL', $_SERVER["DOCUMENT_ROOT"] . '/service_os_funcionario/src/');

const SITUACAO_EM_ABERTO      = 1;
const SITUACAO_EM_ATENDIMENTO = 2;
const SITUACAO_ENCERRADO      = 3;
const SITUACAO_TODOS          = 4;

const ORDEM_EM_ABERTO       = "A";
const ORDEM_EM_ANDAMENTO    = "EA";
const ORDEM_CANCELADA       = "C";
const ORDEM_CONCLUIDA       = "F";

const SECRET_JWT_FUNC = 'tokenFunc';

const NAO_AUTORIZADO = -1000;
