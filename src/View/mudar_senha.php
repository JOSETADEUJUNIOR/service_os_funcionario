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

						<li class="active">Alterar senha</li>
					</ul><!-- /.breadcrumb -->
				</div>
				<!-- conteudo da pagina -->
				<div class="page-content">
					<input type="hidden" id="id_end">
					<form action="mudar_senha.php" id="form_mudarSenha" method="post">
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-12" id="divSenhaAtual">
									<div class="col-md-12">
										<div class="form-group">
											<label>Senha atual</label><span style="margin-left: 3px;"><i onclick="VerSenha()" class="fa fa-eye fa-0x"></i></span>
											<input type="password" class="form-control obg" id="senha" name="senha" placeholder="Digite o aqui....">
										</div>
										<button class="btn btn-success" onclick="return VerificarSenhaAtual('form_mudarSenha')">Validar</button>
									</div>
								</div>
							</div>
						</div>
					</form>

					<form id="formNovaSenha" action="mudar_senha.php" method="post">
						<div class="col-md-12" id="divMudarSenha" style="display: none;">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label>Nova senha</label>
										<input type="password" class="form-control obg" id="newsenha" name="newsenha" placeholder="Digite o aqui....">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label>Repetir senha</label>
										<input type="password" class="form-control obg" id="resenha" name="resenha" placeholder="Digite o aqui....">
									</div>
									<button class="btn btn-success" onclick="return AtualizarSenha()">Gravar</button>
								</div>

							</div>
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
	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/funcionario-ajx.js"></script>
	<script>
		Verify();
	</script>
	


</body>


</html>