'use strict';
/////////////////////////////////////////////
// --- Table of Contents --- 
// 1. Home Page
// 		- Animated Skills
// 		- Social Media Icons Toggle
// 2. Modals
// 		- Initializing Modals
// 		- Binding Modals to Menus
// 		- Hiding Modal on Back Button click
// 3. Resume Section
// 		- Resume Filter
// 		- Bar Chart Function
// 		- Doughnut Chart Function
// 		- Pie Chart Function
// 		- Progress Bar
// 		- Rating
// 4. Portfolio Section
// 5. Animation Function
// 6. Contact Form
/////////////////////////////////////////////
$(window).load(function(){
	$( '#page-loader' ).remove();
});
$(document).ready(function() {

	/////////////////////////////////////////////
	// START --- 1. Home Page 
	/////////////////////////////////////////////

	// Animated Skills
    $("#js-rotating").Morphext({
        animation: "fadeInDown", // Overrides default "bounceIn"
    	speed: 4000, // The delay between the changing of each phrase in milliseconds.
    });

	// Social Media Icons Toggle
	$('.add.user.icon').parent().on( 'click', function() {
		$( '#social_media_icons' ).fadeToggle();
	} );

	/////////////////////////////////////////////
	// END --- 1. Home Page 
	/////////////////////////////////////////////

	/////////////////////////////////////////////
	// START --- 2. Modals 
	/////////////////////////////////////////////

	// Initializing Modals
	$( '[id$=_section]:not("#portfolio_section")' ).modal({
		allowMultiple: true,
		transition: 'scale',
		closable: false,
        onVisible: function () {
            animateCss( $(this) );
        },
		onHidden: function () {
			$(this).find('[data-anim-effect]').removeAttr('style');
		}
	});
	$( '#portfolio_section' ).modal({
		allowMultiple: true,
		transition: 'scale',
		closable: false,
		onShow: function () {
			$('#portfolio_container').show();
		},
        onVisible: function () {
    		$grid.shuffle({
				itemSelector: '.portfolio_item',
				delimeter: ','
			});
        	animateCss( $(this) );
        },
        onHide: function () {
			$('#portfolio_container').hide();
		},
		onHidden: function () {
			$(this).find('[data-anim-effect]').removeAttr('style');
		}
	});

	// Binding Modals to Menus
	$( 'nav' ).on( 'click', '.item', function(){
		var $this = $( this ),
			section = $this.data( 'section' );
			$( '#'+section ).modal( 'show' );
	} );

	// Hiding Modal on Back Button click
	$( '.backBtn' ).on( 'click', function() {
		$( '.modal' ).modal( 'hide' );
		$formMessagesContainer.hide();
	} );

	/////////////////////////////////////////////
	// END --- 2. Modals 
	/////////////////////////////////////////////

	/////////////////////////////////////////////
	// START --- 3. Resume Section 
	/////////////////////////////////////////////

	// Resume Filter
	var $resumeSections = $( '.resume-section' ),
		$activeResumeFilterButton = $('#filter-resume-group a.active');
	$resumeSections.hide();
	function filterResumeSection (button) {
		var $this = button,
			$parent = $this.parents('.content'),
			filterValue = $this.attr('data-group');
		$resumeSections.hide();
		// Scrolling animation
        setTimeout(function(){
            $('.ui.modal.visible').animate({ 
                scrollTop: $parent.find( '.'+filterValue ).offset().top
            }, 1000);
        }, 0);
		$parent.find( '.'+filterValue ).fadeIn(350);
		$this.addClass('active').siblings().removeClass('active');
		$('#resume_section').find('.resume-section:visible [data-anim-effect]').removeAttr('style');
		animateCss( $('#resume_section').find('.resume-section:visible') );
	}
	if( $activeResumeFilterButton.length === 0 ){
		$( '#filter-resume-group a' ).first().addClass( 'active' );
		$resumeSections.first().show();
	}
	else {
		filterResumeSection( $activeResumeFilterButton );
	}
	$('#filter-resume-group').on( 'click', 'a', function() {
		filterResumeSection( $(this) );
	});

	// Bar Chart Function
	var barCharts = $( '[data-chart-type="bar"]' );
	barCharts.each( function() {
		var $this = $(this),
			dataLabels = $this.attr('data-labels'),
			dataHeading = $this.attr('data-heading'),
			dataColors = $this.attr('data-colors'),
			dataValues = $this.attr('data-values');
			var barChart = new Chart($this, {
		    type: 'bar',
		    data: {
			    labels: $.parseJSON(dataLabels),
			    datasets: [
			        {
			        	scale: 100,
			            label: dataHeading,
			            backgroundColor: $.parseJSON(dataColors),
			            data: $.parseJSON(dataValues),
			        }
			    ]
			},
		    options: {
				responsive: true,
				animation:{
			        animateScale: true
			    },
			    scales: {
		            yAxes: [{
		            	ticks: {
		                    beginAtZero: true,
		                    suggestedMax: 100
		                }
		            }]
		        }
			}
		});
	});

	// Doughnut Chart Function
	var doughnutCharts = $( '[data-chart-type="doughnut"]' );
	doughnutCharts.each( function() {
		var $this = $(this),
			dataLabels = $this.attr('data-labels'),
			dataValues = $this.attr('data-values'),
			dataColors = $this.attr('data-colors');
		var doughnutChart = new Chart($this, {
		    type: 'doughnut',
		    data: {
			    labels: $.parseJSON(dataLabels),
			    datasets: [
			        {
			            data: $.parseJSON(dataValues),
			            backgroundColor: $.parseJSON(dataColors)
			        }]
			},
		    options: {
		    	responsive: true,
				animation:{
			        animateScale: true
			    }
			}
		});
	});

	// Pie Chart Function
	var pieCharts = $( '[data-chart-type="pie"]' );
	pieCharts.each( function() {
		var $this = $(this),
			dataLabels = $this.attr('data-labels'),
			dataValues = $this.attr('data-values'),
			dataColors = $this.attr('data-colors');
		var pieChart = new Chart($this, {
		    type: 'pie',
		    data: {
			    labels: $.parseJSON(dataLabels),
			    datasets: [
			        {
			            data: $.parseJSON(dataValues),
			            backgroundColor: $.parseJSON(dataColors)
			        }]
			},
		    options: {
		    	responsive: true,
				animation:{
			        animateScale: true
			    }
			}
		});
	});

	// Progress Bar
	$('.ui.progress').progress({
		showActivity: false
	});

	// Rating
	$('.ui.rating').rating('disable');

	/////////////////////////////////////////////
	// END --- 3. Resume Section 
	/////////////////////////////////////////////

	/////////////////////////////////////////////
	// START --- 4. Portfolio Section 
	/////////////////////////////////////////////

	// Shuffle.js
	var $grid = $('#portfolio_container');
	$('#filter-portfolio-group').on( 'click', 'a', function() {
		var $this = $( this ),
			filterValue = $this.attr('data-group');
		$this.addClass('active').siblings().removeClass('active');
		$grid.shuffle('shuffle', filterValue );
	});

	// SlipHover
	$grid.sliphover();

	// Portfolio Popup
	$('body').magnificPopup({
		delegate: '.sliphover-overlay, .open-popup-link',
		type: 'inline',
		midClick: true,
	});

	/////////////////////////////////////////////
	// END --- 4. Portfolio Section 
	/////////////////////////////////////////////

	/////////////////////////////////////////////
	// START --- 5. Animation Function 
	/////////////////////////////////////////////

	var isHandHeld = false;
	if ( $(window).width() <= 767 || $('body').width() <= 767 ) {
		isHandHeld = true; // Disabling animation on mobile devices
	}
	function animateCss( $section ) {
		var $animatedElems = $section.find('[data-anim-effect]');
		$animatedElems.each(function () {
		    var $elem = $(this),
        		animEffect = $elem.attr('data-anim-effect'),
		    	animDelay = $elem.attr('data-anim-delay');
		    if (isHandHeld === false) {
	            if (animDelay) {
	                setTimeout(function () {
				        $elem.transition({
							animation 	: animEffect,
							duration	: 1000,
							className	: {
							  animating	: 'animated',
							}
						}).css('visibility', 'visible');
	                }, animDelay);
	            } else {
			        $elem.transition({
						animation 	: animEffect,
						duration	: 1000,
						className	: {
						  animating	: 'animated',
						}
					}).css('visibility', 'visible');
	            }
			}
			else {
				$elem.css('visibility', 'visible');
			}

		});
	}

	/////////////////////////////////////////////
	// END --- 5. Animation Function 
	/////////////////////////////////////////////

	/////////////////////////////////////////////
	// START --- 6. Contact Form 
	/////////////////////////////////////////////

	// Get the form.
    var $form = $('#contact-form'),
    	formUrl = $form.attr('action'),
    	$submitButton = $form.find('.ui.submit'),
    	$formMessagesContainer = $form.find('.ui.message'),
    	$formMessages = $formMessagesContainer.find('#form-messages');

	$submitButton.on( 'click', function( e ) {
	    e.preventDefault();
	    
	    // Serialize the form data.
		var formData = $form.serialize();

		// Submit the form using AJAX.
		$.ajax({
		    url: formUrl,
		    type: 'POST',
		    data: formData,
		    success: function(response) {
		    	$formMessagesContainer.hide();
			    $formMessagesContainer.removeClass('warning');
			    $formMessagesContainer.addClass('success');
		    	$formMessagesContainer.fadeIn(350);

			    // Set the message text.
			    $formMessages.text(response);

			    // Clear the form.
			    $form.find('input, textarea').val('');
			},
			error: function(data) {
				$formMessagesContainer.hide();
			    $formMessagesContainer.removeClass('success');
			    $formMessagesContainer.addClass('warning');
		    	$formMessagesContainer.fadeIn(350);

			    // Set the message text.
			    if (data.responseText === '') {
			        $formMessages.text('Oops! An error occured and your message could not be sent.');
			    } else {
			        $formMessages.text(data.responseText);
			    }
			}
		});
	});
	
	// Closable Message
	$formMessagesContainer.find('.close').on('click', function() {
		$formMessagesContainer.fadeOut(350);
	});


    /////////////////////////////////////////////
	// END --- 6. Contact Form 
	/////////////////////////////////////////////

});