
// <!-- ============================= setInterval & clearInterval script ========================================== -->
// setInterval & clearInterval script

// add class is body tag

$(document).ready(function(){


setTimeout(function(){
	function evm_sidebar_interval() {
		var evmSidebarInterval;
		$("Your class").off().click(function () {
			clearInterval(evmSidebarInterval);
			evmSidebarInterval = setInterval(function () {
				if ($("check length").length > 0) {
					clearInterval(evmSidebarInterval);
					evm_sidebar_interval();
					setTimeout(function(){
						$("body.template-product").addClass("cart-drawer--show");	
					}, 500);
				}
			}, 200);
		});
	}
	evm_sidebar_interval();
},3000);
});

// <!-- ============================= End setInterval & clearInterval script ========================================== -->
