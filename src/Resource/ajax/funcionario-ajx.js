

function CarregarMeusDados() {
    //alert(BASE_URL_AJAX("funcionario_api"));
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    var id_user_logado = dadosAPI.funcionario_id;
    var endpoint_cliente = "DetalharMeusDados";

    var dados = {
        endpoint: endpoint_cliente,
        id_user: id_user_logado
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            $("#nome").val(resultado.nome);
            $("#setor").val(resultado.nome_setor)
            $("#email").val(resultado.login);
            $("#telefone").val(resultado.telefone);
            $("#rua").val(resultado.rua);
            $("#cidade").val(resultado.cidade);
            $("#estado").val(resultado.sigla_estado);
            $("#id_end").val(resultado.id_end);
            $("#bairro").val(resultado.bairro);
            $("#cep").val(resultado.cep);
        }
    })
}

function ValidarAcesso(id_form) {
    if (NotificarCampos(id_form)) {
        var dados = {
            email: $("#login").val(),
            senha: $("#senha").val(),
            endpoint: 'Autenticar'

        }
        $.ajax({
            type: "POST",
            //url: "http://localhost/service_os/src/Resource/api/funcionario_api.php",
            url: BASE_URL_AJAX("funcionario_api"),
            data: JSON.stringify(dados),
            headers: {

                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var ret = dados_ret['result'];

                if (ret == -3) {
                    MensagemGenerica('Não autorizado', 'info');
                } else if (ret == 0) {
                    MensagemGenerica('Preencha os campos obrigatórios', 'warning');
                    if ($("#login").val() == '') {
                        $("#login").focus();
                    } else {
                        $("#senha").focus();
                    }
                } else if (ret == -4) {
                    MensagemGenerica('Usuário não ativo ou inexistente, contate o administrador', 'info');

                } else {
                    AddTnk(ret);
                    MensagemLogar('Sucesso, você será direcioando ao sistema');
                }

            }
        })
    }
    return false;
}


function AlterarMeusDados(id_form) {
    if (NotificarCampos(id_form)) {

        var dadosAPI = GetTnkValue();
        if (!dadosAPI.funcionario_id) {
            Sair();
        }

        var id_user = dadosAPI.funcionario_id;;
        var id_setor = dadosAPI.setor_id;

        var dados = {
            id_user: id_user,
            endpoint: "AlterarMeusDados",
            nome: $("#nome").val(),
            login: $("#email").val(),
            telefone: $("#telefone").val(),
            rua: $("#rua").val(),
            cidade: $("#cidade").val(),
            estado: $("#estado").val(),
            id_end: $("#id_end").val(),
            bairro: $("#bairro").val(),
            cep: $("#cep").val(),
            id_setor: id_setor
        }
        $.ajax({

            type: "POST",
            url: BASE_URL_AJAX("funcionario_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                if (resultado == 1) {
                    MensageGenerica('ola', 'warning');
                } else {
                    alert('teste');
                    MensagemErro();
                }
            }
        })

    }

    return false;
}
function CarregarEquipamentoAlocado() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    var id_setor_func = dadosAPI.setor_id;
    var combo_equipamento = $("#equipamento");
    combo_equipamento.empty();
    var endpoint_cliente = "SelecionarEquipamentosAlocadosSetorController";
    var dados = {
        endpoint: endpoint_cliente,
        id_setor: id_setor_func
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            $('<option>').val("").text("Selecione").appendTo(combo_equipamento);

            $(resultado).each(function () {

                $('<option>').val(this.id_alocar).text(this.nome_tipo + " / " + this.nome_modelo + " / " + this.identificacao).appendTo(combo_equipamento);
            })
        }
    })
    return false;
}


function GravarDadosOs() {
    alert('gravando');
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    // if (NotificarCampos(id_form)) {

    var id_user_func = dadosAPI.funcionario_id;
    var id_emp_func = dadosAPI.empresa_id;

    var dadosGravacao = {
        endpoint: 'GravarDadosOs',
        produto: $("#produto").val(),
        quantidades: $("#qtd").val(),
        valores: $("#valor").val(),
        ordem: 11,
        empresa_id: id_emp_func

    }

    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dadosGravacao),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            $("#novoChamado").modal("hide");
            if (resultado == '1') {
                FiltrarChamado();
                LimparCampos();
            }
        }


    })

    //}
    return false;

}



function ModalAberto() {
    if ($("#dadosOS").is(":visible")) {
        alert('sdas');
        modal({
            backdrop: 'static',
            keyboard: false
        });


    }
}












function ListarProdutos() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    var id_setor_func = dadosAPI.setor_id;
    var combo_produto = $("#produto");
    combo_produto.empty();
    var endpoint_produtos = "RetornarProdutos";
    var dados = {
        endpoint: endpoint_produtos,
        id_setor: id_setor_func
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            var tabelaProdutos = $("#tabela-produtos tbody");
            tabelaProdutos.empty(); // Limpa as linhas anteriores da tabela

            for (var i = 0; i < resultado.length; i++) {
                var produto = resultado[i];
                var linha = $("<tr></tr>");

                // Coluna do nome do produto
                var colunaNome = $("<td></td>").text(produto.ProdDescricao);
                linha.append(colunaNome);

                // Coluna do nome do produto
                var colunaEstoque = $("<td></td>").text(produto.ProdEstoque);
                linha.append(colunaEstoque);

                // Coluna do valor do produto
                var colunaValor = $("<td id=\"valor\"></td>");
                var inputValor = $("<input class=\"form-control\" type='text' readonly>").attr("name", "valor[]").val(produto.ProdValorVenda);
                colunaValor.append(inputValor);
                linha.append(colunaValor);

                // Coluna da quantidade (campo de input)
                var colunaQuantidade = $("<td></td>");
                var inputQuantidade = $("<input class=\"form-control\" type='number' min='0' value='0'>").attr("name", "quantidade[]");
                colunaQuantidade.append(inputQuantidade);
                linha.append(colunaQuantidade);

                // Coluna do checkbox
                if (produto.ProdEstoque > 0) {
                    var colunaCheckbox = $("<td></td>");
                    var checkbox = $("<input type='checkbox'>").attr("name", "produto_id[]").val(produto.ProdID);
                    colunaCheckbox.append(checkbox);
                    linha.append(colunaCheckbox);

                } else {
                    var colunaSemSaldo = $("<td style=\"color:red\"></td>").text("item sem saldo");
                    linha.append(colunaSemSaldo);

                }

                tabelaProdutos.append(linha);
            }
        }
    });
    return false;
}










$("#btn-gravar").click(function () {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    // if (NotificarCampos(id_form)) {

    var id_user_func = dadosAPI.funcionario_id;
    var id_emp_func = dadosAPI.empresa_id;

    // Obter os valores selecionados dos checkboxes e as quantidades dos inputs
    var Produtos = [];

    var produtosSelecionados = $("input[name='produto_id[]']:checked").each(function () {
        var row = $(this).closest("tr")[0];
        var quantidade = $(row).find("input[name='quantidade[]']").val();
        if (quantidade > 0) {

            Produtos.push({
                "produto_id": $(row).find("input[name='produto_id[]']").val(),
                "valor": $(row).find("input[name='valor[]']").val(),
                "qtd": quantidade,
            });
        } else {
            MensagemGenerica("Inserir quantidade", 'warning');
            return;
        }
    });

    if (Produtos.length === 0) {
        MensagemGenerica("Para gravar, adicione algum produto", 'warning');
        return;
    }

    let dados = {
        endpoint: 'GravarDadosOsGeral',
        empresa_id: id_emp_func,
        chamado_id: $("#OsID").val(),
        Produtos: Produtos
    }

    // Montar os dados para enviar na requisição AJAX
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (response) {

            if (response['result'] == -2) {
                MensagemGenerica("Produto com saldo insulficiente", "warning");
            } else {
                MensagemGenerica("Produto Adicionado com sucesso", 'success');
                ListarProdutos();
                CarregarProdutosOS($("#OsID").val());

            }

            // Processar a resposta da requisição
        },
        error: function (xhr, status, error) {
            // Tratar erros na requisição
            console.error(error);
        }
    });

})









function CarregarProdutos() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    var id_setor_func = dadosAPI.setor_id;
    var combo_produto = $("#produto");
    combo_produto.empty();
    var endpoint_produtos = "RetornarProdutos";
    var dados = {
        endpoint: endpoint_produtos,
        id_setor: id_setor_func
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            $('<option>').val("").text("Selecione").appendTo(combo_produto);

            $(resultado).each(function () {

                $('<option>').val(this.ProdID).text(this.ProdDescricao + " / estoque:" + this.ProdEstoque + " / R$:" + this.ProdValorVenda).appendTo(combo_produto);
            })
        }
    })
    return false;
}

function CarregarClientes() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    var id_setor_func = dadosAPI.setor_id;
    var combo_clientes = $("#cliente");
    combo_clientes.empty();
    var endpoint_clientes = "RetornarClientes";
    var dados = {
        endpoint: endpoint_clientes,
        id_setor: id_setor_func
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_clientes);

            $(resultado).each(function () {

                $('<option>').val(this.CliID).text(this.CliNome).appendTo(combo_clientes);
            })
        }
    })
    return false;
}

function AbrirChamado(id_form) {

    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    if (NotificarCampos(id_form)) {

        var id_user_func = dadosAPI.funcionario_id;
        var id_emp_func = dadosAPI.empresa_id;
        var dados = {
            endpoint: "AbrirChamado",
            id_user: id_user_func,
            empresa_id: id_emp_func,
            numero_nf: $("#numero_nf").val(),
            cliente_id: $("#cliente").val(),
            problema: $("#descricao_problema").val().trim(),
            defeito: $("#defeito").val().trim(),
            observacao: $("#observacao").val().trim()

        }

        $.ajax({
            type: "POST",
            // url: BASE_URL_AJAX("funcionario_api"),
            url: BASE_URL_AJAX("funcionario_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                $("#novoChamado").modal("hide");
                if (resultado == '1') {
                    FiltrarChamado();
                    LimparCampos();
                }
            }


        })

    }
    return false;

}

function CarregarProdutosOS(id) {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }

    var dados = {
        endpoint: 'CarregarProdutosOS',
        chamado_id: id,
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var itens = dados_ret['result'];
            console.log(itens);
            preencherTabelaItens(itens);

        }
    })
    return false;
}

function preencherTabelaItens(itens) {
    var tabelaProdutos_os = $("#tabela-produtos_os tbody");
    tabelaProdutos_os.empty(); // Limpa as linhas anteriores da tabela

    var totalGeral = 0; // Inicializa o total geral como 0

    for (var i = 0; i < itens.length; i++) {
        var item = itens[i];
        var linha_os = $("<tr></tr>");

        // Coluna da descrição do produto
        var colunaDescricao_os = $("<td></td>").text(item.ProdDescricao);
        linha_os.append(colunaDescricao_os);

        // Coluna da quantidade
        var colunaQuantidade_os = $("<td></td>").text(item.quantidade);
        linha_os.append(colunaQuantidade_os);

        // Coluna do valor unitário
        var colunaValorUnitario_os = $("<td></td>").text(formatarValorEmReais(item.valor));
        linha_os.append(colunaValorUnitario_os);

        // Coluna do valor total
        var valorTotal = item.quantidade * item.valor; // calcula o valor total
        totalGeral += valorTotal; // adiciona o valor total ao total geral
        var colunaValorTotal = $("<td></td>").text(formatarValorEmReais(valorTotal));
        linha_os.append(colunaValorTotal);

        tabelaProdutos_os.append(linha_os);
    }

    // Adicionar a linha do total geral abaixo da tabela
    var linhaTotalGeral = $("<tr style=\"background-color:#ddd\"></tr>");
    var colunaTotalGeral = $("<td></td>").attr("colspan", "3").text("Total Geral:");
    var colunaValorTotalGeral = $("<td></td>").text(formatarValorEmReais(totalGeral));
    linhaTotalGeral.append(colunaTotalGeral, colunaValorTotalGeral);
    tabelaProdutos_os.append(linhaTotalGeral);
}

function formatarValorEmReais(valor) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formatter.format(valor);
}

function FiltrarChamado(situacao = 4) {
    filtro_chamado = situacao;
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    let id_setor_logado = dadosAPI.setor_id;
    let id_empresa = dadosAPI.empresa_id;

    let dados = {
        situacao: filtro_chamado,
        endpoint: 'FiltrarChamadoGeral',
        id_setor: id_setor_logado,
        empresa_id: id_empresa
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        // url: "http://localhost/service_os/src/Resource/api/funcionario_api.php",
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret['result'];
            console.log(resultado);
            if (resultado) {
                var table_data = resultado.map(function (item) {
                    return `
              <tr>


             








                <td class="btn-group btn-group-sm">
               
                    <a class="green" href="#verMais" role="button" data-toggle="modal" onclick="ModalMais('${item.data_atendimento ||""}', '${item.data_encerramento || ""}', '${item.nome_tecnico || ""}', '${item.tecnico_encerramento || ""}', '${item.defeito || ""}', '${item.observacao || ""}', '${item.numero_nf}', '${item.laudo_tecnico || "sem laudo"}')">
                        <i title="Alterar Setor" class="ace-icon fa fa-pencil bigger-130"></i>
                    </a>
                    <a class="green" href="#dadosOS" role="button" data-toggle="modal" onclick="CarregarDadosOS('${item.id}', '${item.data_abertura}', '${item.numero_nf}')">
                        <i title="Itens da os" class="ace-icon fa fa-list bigger-130"></i>
                    </a>
                    <a class="red" href="#modalExcluir" data-toggle="modal" onclick="ExcluirModal('<?= $equipamentosAlocados[$i]['id_alocar'] ?>', '<?= $equipamentosAlocados[$i]['descricao'] ?>')">
                        <i title="Excluir Equipamento" class="ace-icon fa fa-trash-o bigger-130"></i>
                    </a>
  
  
                
                </td>
                <td>${item.numero_nf}</td>
                <td>${item.data_abertura}</td>
                <td>${item.nome_funcionario}</td>
                <td>${item.nome_cliente}</td>
                <td>${item.descricao_problema}</td>
              </tr>`;
                }).join('');

                var vaso = `
            <table class="table table-hover" id="dynamic-table">
              <thead>
                <tr>
                  <th>Ações</th>
                  <th>Numero da NF</th>
                  <th>Data Abertura</th>
                  <th>Funcionário</th>
                  <th>Cliente</th>
                  <th>Problema</th>
                </tr>
              </thead>
              <tbody>${table_data}</tbody>
            </table>
          `;

                $("#dynamic-table").html(vaso);
            } else {
                MensageGenerica("Nenhum chamado encontrado");
                $("#dynamic-table").html('');
            }
        }
    });
}


function CarregarMeusDadosd() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    var id_usuario_logado = dadosAPI.funcionario_id;
    var dados = {
        endpoint: 'DetalharMeusDados',
        id_user: id_usuario_logado
    };
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret['result'];

            if (resultado != '') {


                var table_start = '';
                var table_end = '';
                var table_data = '';

                var table_start = '<div class="table-responsive"><table width="100%" class="table table-hover" id="dynamic-table" style="max-width:600px;"><thead>';
                var table_head = ' <tr><th>Nome</th>\n' +

                    ' <th>Email</th>\n' +
                    ' <th>Telefone</th>\n' +
                    ' <th>Rua</th>\n' +
                    ' </tr></thead>';

                $(resultado).each(function () {
                    table_data += '<tr>';


                    table_data += '<td>' + this.nome + '</td>';
                    table_data += '<td>' + this.login + '</td>';
                    table_data += '<td>' + this.telefone + '</td>';
                    table_data += '<td>' + this.rua + '</td>';


                })
                table_end = '</tbody></table></div>';

                var vaso = table_start + table_head + table_data + table_end;

                $("#dynamic-table").html(vaso);
            } else {
                MensageGenerica("Nenhum chamado encontrado");
                $("#divResult").hide();
            }
        }


    })

}

function VerificarSenhaAtual(id_form) {
    if (NotificarCampos(id_form)) {
        var dadosAPI = GetTnkValue();
        if (!dadosAPI.funcionario_id) {
            Sair();
        }
        id_user = dadosAPI.funcionario_id;
        var dados = {
            endpoint: 'VerificarSenhaAtual',
            id: id_user,
            senha: $("#senha").val()
        };
        $.ajax({
            type: "POST",
            // url: BASE_URL_AJAX("funcionario_api"),
            url: BASE_URL_AJAX("funcionario_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];


                if (resultado == 1) {
                    $("#divSenhaAtual").hide();
                    $("#divMudarSenha").show();
                } else if (resultado == -1) {
                    MensagemGenerica("Senha não confere", "info");
                    $("#senha").focus();
                } else if (resultado == -1000) {
                    ClearTnk();
                    Verify();
                }
            }


        })
    }
    return false;
}

function AtualizarSenha() {

    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    id_user = dadosAPI.funcionario_id;

    var dados = {
        endpoint: "AtualizarSenha",
        id: id_user,
        senha: $("#newsenha").val().trim(),
        repetir_senha: $("#resenha").val().trim()
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            if (resultado == 0) {
                NotificarCampos('formNovaSenha');
                $("#newsenha").focus();
            } else if (resultado == -2) {
                NotificarCampos('formNovaSenha');
                MensagemGenerica("Senha precisa ter minimo de 6 caracteres");
                $("#newsenha").focus();
            } else if (resultado == -4) {
                NotificarCampos('formNovaSenha');
                MensagemGenerica("Senhas não conferem", 3);
                $("#resenha").focus();
            } else {
                MensagemGenerica("Sucesso ao alterar senha", 'success');
                $("#divSenhaAtual").show();
                $("#divMudarSenha").hide();
                $("#senha").val('');
                $("#newsenha").val('');
                $("#resenha").val('');
            }
            RemoverLoad();
        }


    })
    return false;
}

function VerSenha() {

    if ($("#senha").prop('type') == 'password') {
        $("#senha").prop('type', 'text');

    } else {
        $("#senha").prop('type', 'password');

    }


}