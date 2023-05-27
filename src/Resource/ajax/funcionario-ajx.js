

function CarregarMeusDados() {
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
                console.log(ret);
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

                    MensagemErro();
                }
            }
        })

    }

    return false;
}
/* function CarregarEquipamentoAlocado() {
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
 */

function GravarDadosOs() {

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
    var id_empresa = dadosAPI.empresa_id;
    combo_produto.empty();
    var endpoint_produtos = "RetornarProdutosAPI";
    var dados = {
        endpoint: endpoint_produtos,
        id_setor: id_setor_func,
        id_emp_func: id_empresa
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

function ListarServicos() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    var id_setor_func = dadosAPI.setor_id;
    var combo_servico = $("#servicos");
    var id_empresa = dadosAPI.empresa_id;
    combo_servico.empty();
    var endpoint_servicos = "RetornarServicosAPI";
    var dados = {
        endpoint: endpoint_servicos,
        id_setor: id_setor_func,
        id_emp_func: id_empresa
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret_serv) {
            var resultado_serv = dados_ret_serv["result"];
            console.log(resultado_serv);

            var tabelaServicos = $("#tabela-servicos tbody");
            tabelaServicos.empty(); // Limpa as linhas anteriores da tabela

            for (var i = 0; i < resultado_serv.length; i++) {
                var servico = resultado_serv[i];
                var linha = $("<tr></tr>");

                // Coluna do nome do servico
                var colunaNome = $("<td></td>").text(servico.ServDescricao);
                linha.append(colunaNome);


                // Coluna do valor do produto
                var colunaValor = $("<td id=\"valor\"></td>");
                var inputValor = $("<input class=\"form-control\" type='text' readonly>").attr("name", "valor[]").val(servico.ServValor);
                colunaValor.append(inputValor);
                linha.append(colunaValor);

                // Coluna do checkbox

                var colunaCheckbox = $("<td></td>");
                var checkbox = $("<input type='checkbox'>").attr("name", "servico_id[]").val(servico.ServID);
                colunaCheckbox.append(checkbox);
                linha.append(colunaCheckbox);



                tabelaServicos.append(linha);
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


$("#btn-gravar-serv").click(function () {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }
    // if (NotificarCampos(id_form)) {

    var id_user_func = dadosAPI.funcionario_id;
    var id_emp_func = dadosAPI.empresa_id;

    // Obter os valores selecionados dos checkboxes e as quantidades dos inputs
    var Servicos = [];

    var servicosSelecionados = $("input[name='servico_id[]']:checked").each(function () {
        var row = $(this).closest("tr")[0];
        //var quantidade = $(row).find("input[name='quantidade[]']").val();

        Servicos.push({
            "servico_id": $(row).find("input[name='servico_id[]']").val(),
            "valor": $(row).find("input[name='valor[]']").val(),
        });

    });

    if (Servicos.length === 0) {
        MensagemGenerica("Para gravar, adicione algum serviço", 'warning');
        return;
    }

    let dados = {
        endpoint: 'GravarDadosServicosOsGeral',
        empresa_id: id_emp_func,
        chamado_id: $("#OsID").val(),
        Servicos: Servicos
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
                MensagemGenerica("Serviço Adicionado com sucesso", 'success');
                ListarServicos();
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

function RemoveProdOS(ref_id, quantidade, produtoID) {



    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }


    var empresa_func_id = dadosAPI.empresa_id;
    var referencia_func_id = ref_id;
    var qtd = quantidade;
    var prodID = produtoID;
    var dados = {

        endpoint: "RemoveProdOsAPI",
        empresa_id: empresa_func_id,
        quantidade_produto: qtd,
        produto_id: prodID,
        referencia_id: referencia_func_id
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
                ListarProdutos();
                CarregarProdutosOS($("#OsID").val());
                MensagemGenerica('Produto removido com sucesso', 'success');
            } else {
                MensagemErro();
            }
        }
    })
}


function RemoveServOS(ref_id, servicoID) {



    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id) {
        Sair();
    }


    var empresa_func_id = dadosAPI.empresa_id;
    var referencia_func_id = ref_id;
    var servID = servicoID;
    var dados = {

        endpoint: "RemoveServOsAPI",
        empresa_id: empresa_func_id,
        servico_id: servID,
        referencia_id: referencia_func_id
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
                ListarServicos();
                ListarProdutos();
                CarregarProdutosOS($("#OsID").val());
                MensagemGenerica('Serviço removido com sucesso', 'success');
            } else {
                MensagemErro();
            }
        }
    })
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
        tipo: dadosAPI.tipo,
        empresa_id: dadosAPI.empresa_id,
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
        endpoint: 'CarregarProdServOS',
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
            //console.log(itens);
            preencherTabelaItens(itens);

        }
    })
    return false;
}

function preencherTabelaItens(itens) {
console.log(itens);
    if (itens != "") {

        $("#div_listagem_itens_os").show();
        var tabelaItens_os = $("#tabela-itens_os tbody");
        tabelaItens_os.empty(); // Limpa as linhas anteriores da tabela

        var totalGeral = 0; // Inicializa o total geral como 0
        var valorTotal;
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i];
            var linha_os = $("<tr></tr>");

            // Verifica se é um produto ou serviço
            var tipoItem = item.ProdDescricao ? "Produto" : "Serviço";
            var colunaTipo_os = $("<td></td>").text(tipoItem);

            if (item.ProdDescricao) {
                // É um produto
                var colunaDescricao_os = $("<td></td>").text(item.ProdDescricao);
                var colunaQuantidade_os_prod = $("<td></td>").text(item.quantidade);
                var colunaValorUnitario_os = $("<td></td>").text(formatarValorEmReais(item.valor));
                var valorTotal = item.quantidade * item.valor;
                var colunaValorTotal = $("<td></td>").text(formatarValorEmReais(valorTotal));
                var botaoExcluir = $("<button class=\"red\"><i title=\"Excluir\" class=\"ace-icon fa fa-trash-o bigger-120\"></i></button>");
                botaoExcluir.attr("data-referencia-id", item.referencia_id);
                botaoExcluir.attr("data-produto-id", item.produto_ProdID);
                botaoExcluir.attr("data-quantidade", item.quantidade);
                
                botaoExcluir.click(function () {
                    if ($("#status").val()==0) {
                    var referenciaId = $(this).attr("data-referencia-id");
                    var produtoId = $(this).attr("data-produto-id");
                    var quantidade = $(this).attr("data-quantidade");
                    
                    RemoveProdOS(referenciaId, quantidade, produtoId);
                    }else{
                        MensagemGenerica("Ordem de serviço concluída, exclusão não permitida", "warning");
                    }
                });

                var colunaExcluir = $("<td></td>").append(botaoExcluir);

                linha_os.append(colunaDescricao_os, colunaTipo_os, colunaQuantidade_os_prod, colunaValorUnitario_os, colunaValorTotal, colunaExcluir);
            } else {
                // É um serviço
                var quantidadeServico;
                if (item.quantidade > 1) {
                    quantidadeServico = item.quantidade;
                } else {
                    quantidadeServico = 1;
                }
                var colunaDescricao_os = $("<td></td>").text(item.ServNome);
                var colunaQuantidade_os = $("<td></td>").text(quantidadeServico);
                var colunaValorUnitario_os = $("<td></td>").text(formatarValorEmReais(item.valor));
                var valorTotal = 1 * item.valor;
                var colunaValorTotal = $("<td></td>").text(formatarValorEmReais(valorTotal));
               
                var botaoExcluir = $("<button class=\"red\"><i title=\"Excluir\" class=\"ace-icon fa fa-trash-o bigger-120\"></i></button>");
                botaoExcluir.attr("data-referencia-id", item.referencia_id);
                botaoExcluir.attr("data-servico-id", item.servico_ProdID);

                botaoExcluir.click(function () {
                    if ($("#status").val()==0) {
                        var referenciaId = $(this).attr("data-referencia-id");
                        var servicoId = $(this).attr("data-servico-id");
                        RemoveServOS(referenciaId, servicoId);
                    }else{
                        MensagemGenerica("Ordem de serviço concluída, exclusão não permitida", "warning");
                    }
                });

                var colunaExcluir = $("<td></td>").append(botaoExcluir);

                linha_os.append(colunaDescricao_os, colunaTipo_os, colunaQuantidade_os, colunaValorUnitario_os, colunaValorTotal, colunaExcluir);
            }

            tabelaItens_os.append(linha_os);
            totalGeral += valorTotal;
        }

        // Adicionar a linha do total geral abaixo da tabela
        var linhaTotalGeral = $("<tr style=\"background-color:#ddd\"></tr>");
        var colunaTotalGeral = $("<td></td>").attr("colspan", "5").text("Total Geral:");
        var colunaValorTotalGeral = $("<td></td>").text(formatarValorEmReais(totalGeral));
        linhaTotalGeral.append(colunaTotalGeral, colunaValorTotalGeral);
        tabelaItens_os.append(linhaTotalGeral);
    } else {
        $("#div_listagem_itens_os").hide();
    }
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
            var status = '';
            if (resultado) {
                var table_data = resultado.map(function (item) {

                    if (item.data_abertura != null && item.data_atendimento == null) {
                        status = '<span class="label label-info arrowed-right arrowed-in">Em aberto</span>';
                    } else if (item.data_atendimento != null && item.tecnico_encerramento == null) {
                        status = '<span class="label label-warning arrowed arrowed-right">Em atendimento</span>';
                    } else if (item.tecnico_encerramento != null) {
                        status = '<span class="label label-success arrowed-in arrowed-in-right">Concluída</span>';
                    }
                    return `
              <tr>
                <td colspan="3">
               
                    <a class="green" href="#verMais" role="button" data-toggle="modal" onclick="ModalMais('${item.data_atendimento || ""}', '${item.data_encerramento || ""}', '${item.nome_tecnico || ""}', '${item.tecnico_encerramento || ""}', '${item.defeito || ""}', '${item.observacao || ""}', '${item.numero_nf}', '${item.laudo_tecnico || "sem laudo"}')">
                        <i title="Alterar Setor" class="ace-icon fa fa-pencil bigger-120"></i>
                    </a>
                    <a class="blue" href="#print_os" role="button" data-toggle="modal" onclick="printOs('${item.id}')">
                        <i title="Alterar Setor" class="ace-icon fa fa-print bigger-120"></i>
                    </a>
                </td>
                <td colspan="3">
                <a class="green" href="#dadosOS" role="button" data-toggle="modal" onclick="CarregarDadosOS('${item.id}', '${item.data_abertura}', '${item.numero_nf}', ${item.data_encerramento !== null ? "'" + item.data_encerramento + "'" : 0})">

                        <i title="Itens da os" class="ace-icon fa fa-list bigger-120"></i>
                    </a>
                    </td>
  
  
                
                <td>${item.numero_nf}</td>
                <td>${item.data_abertura}</td>
                <td>${item.nome_funcionario}</td>
                <td>${item.nome_cliente}</td>
                <td>${status}</td>
                <td>${item.descricao_problema}</td>
              </tr>`;
                }).join('');

                var vaso = `
            <table class="table table-hover" id="dynamic-table">
              <thead>
                <tr>
                  <th colspan="3">Ações</th>
                  <th colspan="3">Itens</th>
                  <th>Numero da NF</th>
                  <th>Data Abertura</th>
                  <th>Funcionário</th>
                  <th>Cliente</th>
                  <th>Status</th>
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