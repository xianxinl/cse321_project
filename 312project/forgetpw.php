<!DOCTYPE html>
<html>
<?php
 session_start();
 ?>
<head>
<title>UB TRADE</title>
<link rel="stylesheet" href="css/bootstrap.min.css"><!-- bootstrap-CSS -->
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" /><!-- style.css -->
<link rel="stylesheet" href="css/font-awesome.min.css" /><!-- fontawesome-CSS -->
<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- header -->
	<header>
		<div class="w3ls-header"><!--header-one-->
			<div class="w3ls-header-right">
				<ul>
					<li class="dropdown head-dpdn">
						<a href="signin_front.php" aria-expanded="false"><i class="fa fa-user" aria-hidden="true"></i>
              <a>
              <?php if (isset($_SESSION['username']))
          {
          echo $_SESSION['username'];
        } else echo"Sign In"?></a>
					</li>
				</ul>
			</div>

			<div class="clearfix"> </div>
		</div>
		<div class="container">
			<div class="agile-its-header">
				<div class="logo">
					<h1><a href="index.html"><span>UB</span>TRADE</a></h1>
				</div>
				<div class="agileits_search">
				<a class="post-w3layouts-ad" href="index.html">Back to Homepage</a>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</header>
	<!-- //header -->
	<!-- sign in form -->
	 <section>
		<div id="agileits-sign-in-page" class="sign-in-wrapper">
			<div class="agileinfo_signin">
			<h3>Check Email Address</h3>
				<form action="forgetpw.handle.php" method="post">
					<input type="email" name="useremail" placeholder="Registered Email" required="">

					<input type="submit" value="Verify">
				</form>
			</div>
		</div>
	</section>
	<!-- //sign in form -->
	<!--footer section start-->
		<footer>
			<div class="agileits-footer-bottom text-center">
			<div class="coindex.htmler">
				<div class="w3-footer-logo">
					<h1><a href="index.html"><span>UB</span>TRADE</a></h1>
				</div>
				<div class="copyrights">
					<p> Design by  <label> CSE_442_TEAM</label></p>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		</footer>
        <!--footer section end-->


</html>
