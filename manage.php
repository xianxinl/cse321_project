<!DOCTYPE html>
<html>
<head>
<title>UB TRADE</title>
<link rel="stylesheet" href="css/bootstrap.min.css"><!-- bootstrap-CSS -->
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" /><!-- style.css -->
<link rel="stylesheet" href="css/font-awesome.min.css" /><!-- fontawesome-CSS -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/menu_sideslide.css" type="text/css" media="all"><!-- Navigation-CSS -->

</head>
<body>
      <div class="agiletopbar">
        <div class="wthreenavigation">
          <div class="menu-wrap">
          <nav class="menu">
            <div class="icon-list">
              <a href="chat.html"><i class="fa fa-fw fa-mobile"></i><span>Chat</span></a>
              <a href="friend.html"><i class="fa fa-users"></i><span>Friends</span></a>
            </div>
          </nav>
          <button class="close-button" id="close-button">Close Menu</button>
        </div>
        <button class="menu-button" id="open-button"> </button>
        </div>
        <div class="clearfix"></div>
      </div>
		<div class="w3ls-header"><!--header-one-->
			<div class="w3ls-header-right">
				<ul>
          <!-- click to change password-->
          <li class="dropdown head-dpdn">
            <a href="alterpassword.php"><i aria-hidden="true"></i> Change Password </a>
          </li>
          <!-- change password end-->
          <!-- click to sign out account -->
          <li class="dropdown head-dpdn">
            <a href="setting/Sign_Out.php"><i aria-hidden="true"></i> Sign Out</a>
          </li>
          <!-- sign out end -->
					<li class="dropdown head-dpdn">
            <!-- replace login in by username when logined in !-->
            <a href="manage.php"><i aria-hidden="true"></i> Anthony</a>
          <!-- username display end !-->
					</li>

					<li class="dropdown head-dpdn">
						<div class="header-right">
		</div>
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

	<!-- Products -->
	<div class="total-ads main-grid-border">
		<div class="container">
			<div class="select-box">
				<div class="clearfix"></div>
			</div>
      <h2>Manage Your Posts</h2>
			<div class="ads-grid">
				<div class="agileinfo-ads-display col-md-9">
					<div class="wrapper">
					<div class="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
					  <div id="myTabContent" class="tab-content">
						<div role="tabpanel" class="tab-pane fade in active" id="home" aria-labelledby="home-tab">
						   <div>
												<div id="container">
                          <div class="sort">
                               <div class="sort-by">
                                <label>Sort By : </label>
                                <form method="GET">
                                <select name = "orderby" onchange="this.form.submit()">       <!-- every time when select, pass the "order way" to get and refresh page with updated order way-->

                                        <option value="Release_date DESC">Most recent</option>
                                        <option value="Price ASC">Price: Low to High</option>
                                        <option value="Price DESC">Price: High to Low</option>
                                </select>
                              </form>
                                 </div>
                               </div>

								<div class="clearfix"></div>
                <br>
                    <ul class="list">
      								<a href="single.html">
      									<li>
      									<img src="images/b8.jpg" title="" alt="" />
      									<section class="list-left">
      									<h5 class="title">soccer day yeahyeahyeah</h5>
      									<span class="adprice">Anthony</span>
      									</section>
      									<section class="list-right">
      									<span class="date">Today, 17:05</span>
                        <button onclick="return confirmDele()">Edit</button>
                        <button onclick="return confirmDele()">Delete</button>      									</section>
      									<div class="clearfix"></div>
      									</li>
      								</a>
      							</ul>
						</div>
							</div>

						</div>
					  </div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
	<!-- // Products -->
	<!--footer section start-->
		<footer>
			<div class="agileits-footer-bottom text-center">
			<div class="container">
				<div class="w3-footer-logo">
					<h1><a href="index.html"><span>UB</span>Social</a></h1>
				</div>

			</div>
		</div>
		</footer>
        <!--footer section end-->
</body>
</html>
