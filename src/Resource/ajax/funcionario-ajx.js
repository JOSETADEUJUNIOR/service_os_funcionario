function CarregarMeusDados() {
//alert(BASE_URL_AJAX("funcionario_api"));
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id){
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
        url:BASE_URL_AJAX("funcionario_api"),
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
            url:BASE_URL_AJAX("funcionario_api"),
            data: JSON.stringify(dados),
            headers: {
                
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var ret = dados_ret['result'];
                console.log(ret)
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
        if (!dadosAPI.funcionario_id){
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
            url:BASE_URL_AJAX("funcionario_api"),
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
    if (!dadosAPI.funcionario_id){
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
        url:BASE_URL_AJAX("funcionario_api"),
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

function CarregarProdutos() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.funcionario_id){
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
        url:BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
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
    if (!dadosAPI.funcionario_id){
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
        url:BASE_URL_AJAX("funcionario_api"),
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
    if (!dadosAPI.funcionario_id){
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
        console.log(dados);
        $.ajax({
            type: "POST",
            // url: BASE_URL_AJAX("funcionario_api"),
            url:BASE_URL_AJAX("funcionario_api"),
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
                  <button type="button" class="btn btn-primary" onclick="ModalMais('${item.data_atendimento}', '${item.data_encerramento || ""}', '${item.nome_tecnico || ""}', '${item.tecnico_encerramento || ""}', '${item.laudo_tecnico || "sem laudo"}')" data-toggle="modal" data-target="#verMais"><i class="fa fa-caret-square-o-down" aria-hidden="true"></i></button>
                  <button type="button" class="btn btn-primary" onclick="ModalMais('${item.data_atendimento}', '${item.data_encerramento || ""}', '${item.nome_tecnico || ""}', '${item.tecnico_encerramento || ""}', '${item.laudo_tecnico || "sem laudo"}')" data-toggle="modal" data-target="#verMais"><i class="fa fa-list" aria-hidden="true"></i></button>
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
    if (!dadosAPI.funcionario_id){
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
        url:BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret['result'];
            console.log(resultado);
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
        if (!dadosAPI.funcionario_id){
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
            url:BASE_URL_AJAX("funcionario_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization':'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                
                console.log(resultado);
                if (resultado == 1) {
                    $("#divSenhaAtual").hide();
                    $("#divMudarSenha").show();
                } else if (resultado == -1) {
                    MensagemGenerica("Senha não confere", "info");
                    $("#senha").focus();
                }else if (resultado == -1000){
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
    if (!dadosAPI.funcionario_id){
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
        url:BASE_URL_AJAX("funcionario_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
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