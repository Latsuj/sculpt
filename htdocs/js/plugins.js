// Avoid `console` errors in browsers that lack a console.
(function() {
	var oldPositionTopScroll=0;
	var positionTopScroll=0;
	$(window).scroll(function(event) {
		// Get the value of the scroll position
		positionTopScroll = $(window).scrollTop();
		transition();
		slide1();
		slide2();
		slide3();
	});

	/**
	 * =======================================================================================>
	 * TRANSITION
	 * =======================================================================================>
	 */	
	var secondZoom = false;
	function transition() {
		if(!animated) {
			if(positionTopScroll<endPositionSlide1) {
				secondZoom = false;
				zoom(0,0);
			}
			if(positionTopScroll>endPositionSlide1 && positionTopScroll<endPositionSlide2) {
				secondZoom = false;
				zoom(0,0);
			}
			if(positionTopScroll>endPositionSlide2 && positionTopScroll<endPositionSlide3) {
				zoom(-$(window).width()*2,-$(window).width()*1.08);
				secondZoom = false;
			}
			if(positionTopScroll>endPositionSlide3) {
				secondZoom = true;
				zoom(-$(window).width()*0.5,-$(window).width()*0.95);
			}
		}
	}
	/**
	 * =======================================================================================>
	 * SLIDE 1
	 * =======================================================================================>
	 */
	var VITESSE_SLIDE_1 = 10;
	function slide1() {
		$("#firstSlide").css("top",-VITESSE_SLIDE_1*$(window).scrollTop()+"px");
	}
	
	var endPositionSlide1;
	function endSlide1() {
		endPositionSlide1 = $(window).height()/VITESSE_SLIDE_1;
	}

	/**
	 * =======================================================================================>
	 * SLIDE 2
	 * =======================================================================================>
	 */	
	
	var VITESSE_SLIDE_2 = 3;
	var PUISSANCE_OPACITY_SLIDE_2 = 0.5;
	var VITESSE_OPACITY_SLIDE_2 = 0.02;
	var OFFSET_SLIDE_2 = 300;
	var OFFSET_TRANSITION_SLIDE_2 = 50;
	function slide2() {
		if(positionTopScroll>endPositionSlide1) {
			// Gere l'ensemble du premier rayon d'opacite...
			var calOpacity = PUISSANCE_OPACITY_SLIDE_2*(1-Math.exp(-VITESSE_OPACITY_SLIDE_2*(positionTopScroll-endPositionSlide1)));
			if(positionTopScroll>endPositionSlide1+OFFSET_SLIDE_2) {
				calOpacity = PUISSANCE_OPACITY_SLIDE_2-VITESSE_OPACITY_SLIDE_2*0.2*(positionTopScroll-endPositionSlide1-OFFSET_SLIDE_2);
			}
			$("#backgroundSlideText1").css("opacity",calOpacity);
			
			
			var calText = VITESSE_SLIDE_2*(positionTopScroll - endPositionSlide1);
			$("#secondSlideText1").css("top","calc(100% - "+calText+"px)");
		} else {
			// Reset l'opacite en dehors du slide
			$("#backgroundSlideText1").css("opacity",0);
		}
	}
	
	var endPositionSlide2;
	function endSlide2() {
		endPositionSlide2 = endPositionSlide1+OFFSET_SLIDE_2+$(window).height()/4;
	}

	/**
	 * =======================================================================================>
	 * SLIDE 3
	 * =======================================================================================>
	 */		
	

	function slide3() {
		if(positionTopScroll>endPositionSlide2) {
			var calOpacity = PUISSANCE_OPACITY_SLIDE_2*(1-Math.exp(-VITESSE_OPACITY_SLIDE_2*(positionTopScroll-endPositionSlide2)));
			if(positionTopScroll>endPositionSlide2+OFFSET_SLIDE_2) {
				calOpacity = PUISSANCE_OPACITY_SLIDE_2-VITESSE_OPACITY_SLIDE_2*0.2*(positionTopScroll-endPositionSlide2-OFFSET_SLIDE_2);
			}
			$("#backgroundSlideText2").css("opacity",calOpacity);
			
			var calText = VITESSE_SLIDE_2*(positionTopScroll - endPositionSlide2);
			$("#secondSlideText2").css("top","calc(100% - "+calText+"px)");
		} else {
			// Reset l'opacite en dehors du slide
			$("#backgroundSlideText2").css("opacity",0);
		}
	}
	
	var endPositionSlide3;
	function endSlide3() {
		endPositionSlide3 = endPositionSlide2+OFFSET_SLIDE_2+$(window).height()/4;
	}
	
	var step = 0;
	var animated = false;
	function zoom(posX,posY) {
		var from = {"propertyX" : positionX,"propertyY" : positionY};
		var to = {"propertyX" : posX,"propertyY" : posY};

		jQuery(from).animate(to, {
		    duration: 1000,
		    step: function(now,fx) {
		    	
		    	// Pour le zoom sur l'axe X
		    	if(fx.prop == "propertyX") {
					animated=true;
			        positionX = this.propertyX;
		    	}
		    	
		    	// Pour le zoom sur l'axe Y
		    	if(fx.prop == "propertyY") {
					animated=true;
			        positionY = this.propertyY;
		    	}
		        adaptContent();
		    }, 
		    complete : function() {
		    	// Correctif, car la division par le temps ne donne pas toujours un nombre fixe
		    	positionX = posX;
		    	positionY = posY;
		        adaptContent();
		    	
		    	animated=false;
		    }
		});
	}
	
	//TODO HOW TO USE AN OTHER ATTRIBUT :XXXXXX ?
	/**
	function animation() {
		$(".imgContainer").clearQueue();
		$(".imgContainer").stop();
		console.log("azeaze : "+positionY);
		$(".imgContainer").css({"fontSize":positionX+"px","fontWeight":(-positionY)+"px"}).animate({"fontSize":"500px","fontWeight":"0px"},{
			duration:5000,
			step: function(now,fx) {
				if(fx.prop == "fontSize") {
					positionX = -now;
				}
				if(fx.prop == "fontWeight") {
					//positionY = -now;
					//console.log(now);
				}
				//adaptContent();
				//console.log( "Left: ", currentLeft );
			}
		})
	}
	**/
	
	
	/**
	 * Specialement pour l'animation sur le petit menu
	 */
	var lastScrollTop = 0;
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		if (st > lastScrollTop){
			if (!$("#topbar").is(':animated')) {
				$("#topbar").clearQueue();
				$("#topbar").stop();
				$("#topbar").animate({"top":"-"+$("#firstTopBar").height()+"px"},100);
			}
		} else {
			if (!$("#topbar").is(':animated')) {
				$("#topbar").clearQueue();
				$("#topbar").stop();
				$("#topbar").animate({"top":"0px"},100);
			}
		}
		lastScrollTop = st;
	});
	
	var ratio = 0;
	var oldration = 0;
	
	var offset = 300;
	var positionX = 0,positionY = 0;
	var oldpositionX = 0,oldpositionY = 0;
	function adaptContent() {
		var imgW, imgH, winW, winH;
		
		var winW = $(window).width();
		var winH = $(window).height();
		$(".imgHolder").each(function( index ) {
			$(this).css("height",winH+"px");
		});
		var imgW = $(".imgHolder").first().width();
		var imgH = $(".imgHolder").first().height();
		var calW = ($(".imgHolder").first().width() - positionX) / 6000;
		var calH = ($(".imgHolder").first().height() - positionX) / 4000;

		$(".imgContainer").css("transform","translate3d("+positionX+"px, "+positionY+"px, 0px) scale("+calW+","+calW+")");
		
		if($(".imgContainer")[0].getBoundingClientRect().height<winH) {
			var offsetX = positionX + ((calH*6000) - winW)/2;
			ratio = calH;
			$(".imgContainer").css("transform","translate3d(-"+offsetX+"px, 0px, 0px) scale("+calH+","+calH+")");
		}
	}
	
	/**
	 * Adapte le contenu lors du chargement de la page et lorsque l'on modifie la taille de la fenetre
	 */
	$( window ).on("resize load",function() {
		adaptContent();
		endSlide1();
		endSlide2();
		endSlide3();
	});
	
}());
