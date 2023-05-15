<div class="modal fade" id="dadosOS">
    <div class="modal-dialog modal-lg">
        <div class="modal-content bg-white">
            <div class="modal-header bg-primary">
                <h4 class="modal-title">Produtos e Serviços da Ordem</h4>

            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4 col-xs-12">
                        <div class="form-group">
                            <label>Numero da NF</label>
                            <input class="form-control obg" readonly id="numero_nf_alter">
                            <input type="text" id="OsID">
                        </div>
                    </div>
                    <div class="col-md-12 col-xs-12">
                        <div class="form-group">
                        <i style="color:blue" class="fa fa-shopping-cart fa-3x" aria-hidden="true">sessão para adicionar os produtos</i>
                            <button id="btn-toggle-div" class="btn btn-primary btn-xs">Carregar a lista de produtos</button>
                        </div>
                    </div>
                    <hr>
                    <!--  <div class="col-md-7 col-xs-7">
                        <div class="form-group">
                            <label>Lançar Produtos</label>
                            <select class="chosen-select" data-placeholder="Selecione o produto" name="produto" id="produto" style="width: 100%;">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2 col-xs-2">
                        <div class="form-group">
                            <label>Quantidade</label>
                            <input type="text" name="qtd" id="qtd">
                            
                        </div>
                    </div>
                    <div class="col-md-2 col-xs-2">
                        <div class="form-group">
                            <label>Valor</label>
                            <input type="text" name="valor" id="valor">
                            
                        </div>
                    </div>
                    <div class="col-md-1">
                            <div class="form-group">
                                <label>Add</label>
                                <button class="form-control btn btn-success btn-xs"  onclick="return GravarDadosOs()" name="btnAddItem"><i class="fa fa-edit"></i></button>
                            </div>
                        </div> -->
                    <div class="col-md-12 col-xs-12">
                       
                        
                        <div id="div-produtos" style="display: none;">
                            <h2>Lista de Produtos</h2>
                            <table id="tabela-produtos" class="table table-striped table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Estoque</th>
                                        <th>Valor</th>
                                        <th>Quantidade</th>
                                        <th>Selecionar</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>


                    <div class="col-md-12 col-xs-12">
                       
                        
                       
                           <h2>Lista de Produtos</h2>
                           <table id="tabela-produtos_os" class="table table-striped table-bordered table-hover">

                               <thead>
                                   <tr>
                                       <th>Produto</th>
                                       <th>Quantidade</th>
                                       <th>Valor Unitário</th>
                                       <th>Valor Total</th>
                                   </tr>
                               </thead>
                               <tbody></tbody>
                           </table>
                       
                   </div>
                </div>

            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" id="btnCancelar" onclick="FechandoModal('form_atendimento')" class="btn btn-info" data-dismiss="modal">Cancelar</button>
                <button id="btn-gravar" class="btn btn-success" type="button">Gravar dados da OS</button>
            </div>

        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<script>
    /* $(window).on("load", function(){
   // página totalmente carregada (DOM, imagens etc.)
   $("#nome").focus();
   $("#nome").reset();
}); */
</script>