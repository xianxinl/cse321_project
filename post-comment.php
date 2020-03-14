<!DOCTYPE html>
<html>
<head>
<title>UB Social</title>
<link rel="stylesheet" href="css/bootstrap.min.css"><!-- bootstrap-CSS -->
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" /><!-- style.css -->
<link rel="stylesheet" href="css/font-awesome.min.css" /><!-- fontawesome-CSS -->
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
	<!-- header -->
	<header>
		<div class="w3ls-header"><!--header-one-->
			<div class="w3ls-header-right">
				<ul>
					<li class="dropdown head-dpdn">
            <a href="manage.php" aria-expanded="false"><i class="fa fa-user" aria-hidden="true"></i>Anthony</a>
					</li>
				</ul>
			</div>

			<div class="clearfix"> </div>
		</div>
		<div class="container">
			<div class="agile-its-header">
				<div class="logo">
					<h1><a href="index.html"><span>UB</span>Social</a></h1>
				</div>

        <div class="agileits_search">
				<a class="post-w3layouts-ad" href="index.html">Back to Home page</a>
				</div>

				<div class="clearfix"></div>
			</div>
		</div>
	</header>
	<!-- //header -->
	<!-- Submit Ad -->
	<div class="submit-ad main-grid-border">
		<div class="container">
			<h2 class="w3-head">Share your moments</h2>
			<div class="post-ad-form">
				<form enctype="multipart/form-data" method="post" action="post.handle.php">
					<div class="clearfix"></div>
					<label for="ProductName">Title<span>*</span></label>
					<input type="text" id="title" placeholder="50 letter maximum" name="title" maxlength="50">
					<div class="clearfix"></div>
					<label>Detail</label>
					<input type="text" style="font-size:12pt;height:420px;width:740px;" placeholder="Share your moments" name = "description" maxlength="1000"></textarea>
					<div class="clearfix"></div>
				<div class="upload-ad-photos">
				<label>Photos for your product</label>
					<div class="photos-upload-view">

						<input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="5242880" />

						<div>
							<input type="file" id="fileselect" name="image[]" multiple="multiple" />
							<div id="filedrag">or drop files here</div>
						</div>
						</div>
					<div class="clearfix"></div>
						<script src="js/filedrag.js"></script>
				</div>
					<input type="submit" value="Submit">
					<div class="clearfix"></div>
					</form>
					</div>
			</div>
		</div>
	</div>
	<!-- // Submit Ad -->
	<!--footer section start-->
		<footer>

			<div class="agileits-footer-bottom text-center">
			<div class="container">
				<div class="w3-footer-logo">
					<h1><a href="index.php"><span>UB</span>Social</a></h1>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		</footer>
        <!--footer section end-->
</body>

</html>
