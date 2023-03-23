<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>

<!DOCTYPE html>
<html>

<head>
	<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>

	<meta name="description" content="Static &amp; Dynamic Tables" />
</head>

<body class="skin-1">
	<?php include_once PATH_URL . '/Template/_includes/_topo.php' ?>
	<!-- topo-->


	<!--inicio do conteudo principal-->
	<div class="main-container ace-save-state" id="main-container">
		<script type="text/javascript">
			try {
				ace.settings.loadState('main-container')
			} catch (e) {}
		</script>

		<?php include_once PATH_URL . '/Template/_includes/_menu.php' ?>

		<div class="main-content">
			<div class="main-content-inner">
				<div class="breadcrumbs ace-save-state" id="breadcrumbs">
					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="#">Home</a>
						</li>

						<li class="active">Meus Dados</li>
					</ul><!-- /.breadcrumb -->
				</div>
				<!-- conteudo da pagina -->
				<div class="page-content">
					<input type="hidden" id="id_end">
					<form action="meus_dados.php" id="form_meusdados" method="post">
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label>Nome</label>
										<input class="form-control obg" id="nome" name="nome" placeholder="Digite o aqui....">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label>Setor</label>
										<input class="form-control obg" id="setor" name="setor" disabled placeholder="Digite o aqui....">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label>E-mail</label>
										<input class="form-control obg" id="email" name="email" placeholder="Digite o aqui....">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label>Telefone</label>
										<input class="form-control obg" id="telefone" name="telefone" placeholder="Digite o aqui....">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label>Cep</label>
										<input class="form-control obg" id="cep" name="cep" placeholder="Digite o aqui....">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label>Rua</label>
										<input class="form-control obg" id="rua" name="rua" placeholder="Digite o aqui....">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label>Cidade</label>
										<input class="form-control obg" id="cidade" name="cidade" placeholder="Digite o aqui....">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label>Estado</label>
										<input class="form-control obg" id="estado" name="estado" placeholder="Digite o aqui....">
									</div>
								</div>
							</div>
							<button class="btn btn-success col-md-12" onclick="return AlterarMeusDados('form_meusdados')">Gravar</button>
						</div>
					</form>
				</div><!-- /.col -->
			</div><!-- /.row -->
			<!-- /.final do conteudo da pagina -->
			<div id="divload">

			</div>

		</div><!-- /.main-content -->
		<?php include_once PATH_URL . './Template/_includes/_footer.php' ?>
	</div><!-- /.final do conteudo Princial -->


	<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>
	<script src="../../Template/assets/js/bootbox.js"></script>
	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/funcionario-ajx.js"></script>
	<script>
		Verify();
		CarregarMeusDados();
	</script>



</body>


</html>