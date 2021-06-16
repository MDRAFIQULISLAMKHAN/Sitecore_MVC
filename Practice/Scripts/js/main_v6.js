var $body,
	timer,
	$window,
	$document,
	windowHeight,
	windowWidth,
	windowRtlOffset,
	$btnPlay,
	$videoPopup,
	$wrapper,
	$menuTrigger,
	wrapperHeight,
	scrollTop = 0,
	bodyScrollBar,
	$previewTimeline,
	$header,
	$storyVideoBlock,
	$constructList,
	$constructItem,
	$heroSlider,
	$popupVideoContainer,
	popupMainVideo,
	videosData = [],
	isDesktopScreen = false,
	isMobileScreen = false,
	mainMenuLinkData = [],
	$footer,
	markers,
	$heroSlider,
	$formSuccess,
	isHeroSectionExist = false,
	isHero2SectionExist = false,
	$heroSection,
	$hero2Section,
	$cursor,
	mouseCoord = {},
	$subscribeForm,
	isHeroAnimDone = false,
	heroSlidesArray = [],
	$partnerItem,
	currentMenuLinkTitle,
	$phaseNavLink,
	$mainNavLink,
	prevScrollTop,
	isRtl,
	$previewPopup,
	$popupMainVideoW,
	$sliderVideoPopup,
	$btnClosePopupMainVideo,
	// DEFAULT_BODY_BG_COLOR = '#E9E9E9',
	DEFAULT_BODY_BG_COLOR = '#fff',
	tlLoadAnim,
	sectionBgData = [],
	$cursorHamburger = $('.cursorHamburger'),
	currentHeroSlideIndex = 0,
	$popupVideo,
	$numberAnimTitle,
	$designsSlider,
	tlNumbers,
	previewBlockData = [],
	$designsNavLink,
	$designsNavItem,
	$designsNavSlider,
	$sectionDescr,
	$settingsSection,
	settingsClick = false,
	sectionDescrData = [],
	settingsArray = [],
	isVideoPopupOpen = false,
	isSliderVideoOpen = false,
	degree = 0.0174532925,
	mediaPoint1 = 1024,
	mediaPoint2 = 768,
	mediaPoint3 = 480,
	mediaPoint4 = 320,
	rem;

$(document).ready(function ($) {
	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(SplitText);

	$window = $(window);
	$wrapper = $('.wrapper')[0];
	$scrollerProxyWDiv = $('.scroller_proxy_w_div');
	$scrollerProxyDiv = $('.scroller_proxy_div');
	$document = document.documentElement;
	$body = $('body');
	$header = $('.header');
	$footer = $('.footer');
	$mainNavLink = $('.main_menu_link');
	$btnPlay = $('.btnPlay');
	$popupVideo = $('.popupVideo');
	$videoPopup = $('.videoPopup');
	$menuTrigger = $('.menuTrigger');
	$designsSlider = $('.designsSlider');
	$designsNavLink = $('.designsNavLink');
	$designsNavSlider = $('.designsNavSlider');
	$designsNavItem = $('.designs_nav_item');
	$sectionDescr = $('.sectionDescr');
	$numberAnimTitle = $('.numberAnimTitle');
	$settingsSection = $('[data-num]');
	$partnerItem = $('.partner_item_wrap');
	$phaseNavLink = $('.phase_nav_link');
	$subscribeForm = $('#subscribeForm');
	$cursor = $('.cursor');
	$heroSection = $('.heroSection');
	$hero2Section = $('.hero2Section');
	$previewTimeline = $('.previewTimeline');
	$storyVideoBlock = $('.storyVideoBlock');
	$constructList = $('.constructList');
	$constructItem = $('.construct_item');
	$heroSlider = $('.heroSlider');
	$formSuccess = $('.form_success');
	$previewPopup = $('.previewPopup');
	$sliderVideoPopup = $('.sliderVideoPopup');
	$popupMainVideoW = $('.popupMainVideoW');
	$popupVideoContainer = $('#popupVideoContainer');
	$btnClosePopupMainVideo = $('.btnClosePopupMainVideo');
	tlNumbers = gsap.timeline({
		paused: true,
		scrollTrigger: {
			scroller: $scrollerProxyWDiv,
			trigger: ".visionSection",
			start: "top center",
			toggleActions: "play none none none"
		}
	});

	sectionBgData = [
		{
			id: 1,
			color: '#fff'
		},
		{
			id: 2,
			color: '#E9E9E9',
		},
		{
			id: 3,
			color: '#faf9f5'
		},
		{
			id: 4,
			color: '#f6f6f6'
		},
		{
			id: 5,
			color: '#faf9f5'
		},
		{
			id: 6,
			color: '#faebd7'
		}
	]

	// UNCOMMENT PRELOADER LATER
	// paused: true

	tlLoadAnim = gsap.timeline({
		delay: .2,
		paused: true
	});

	tlLoad2Anim = gsap.timeline({
		delay: .2,
		paused: true
	});

	updateSizes()

	// tabs 1

	tlTabs = gsap.timeline({
		paused: true
	});

	phaseData = []

	$('.phase_block_w').each((index, item) => {

		let $title = $(item).find('.phase_block_title_in')
		let $line = $(item).find('.phase_block_title_line');
		let $items = $(item).find('.phase_info_list_item')

		let itemInfo = {
			'el': $(item),
			'title': $title,
			'line': $line,
			'items': $items
		};

		phaseData.push(itemInfo);
	});

	$phaseNavLink.on('click', function (e) {
		e.preventDefault();

		let offsetEl = isRtl ? 25 : -25;

		let $this = $(this);
		let startTab = $('.phase_nav_link.active_tab').data('tab');
		let finishTab = $this.data('tab');

		if (startTab !== finishTab) {
			$phaseNavLink.removeClass('active_tab');
			$this.addClass('active_tab');

			tlTabs
				.fromTo(phaseData[startTab].items, {
					opacity: 1,
					yPercent: 0
				}, {
					opacity: 0,
					yPercent: -25,
					stagger: .1,
					duration: .2
				})
				.fromTo(phaseData[startTab].line, {
					scaleX: 1
				}, {
					scaleX: 0,
					duration: .3,
					ease: 'none'
				})
				.fromTo(phaseData[startTab].title, {
					opacity: 1,
					xPercent: 0
				}, {
					opacity: 0,
					xPercent: offsetEl,
					duration: .3
				})
				.set([], {
					onComplete: function () {
						$('.phase_block_w').removeClass('active_tab')
						$(`.phase_block_w[data-tab=${finishTab}]`).addClass('active_tab')
					}
				})
				.fromTo(phaseData[finishTab].title, {
					opacity: 0,
					xPercent: offsetEl
				}, {
					opacity: 1,
					xPercent: 0,
					duration: .3
				})
				.fromTo(phaseData[finishTab].line, {
					scaleX: 0
				}, {
					scaleX: 1,
					duration: .3,
					ease: 'none'
				})
				.fromTo(phaseData[finishTab].items, {
					opacity: 0,
					yPercent: -25
				}, {
					opacity: 1,
					yPercent: 0,
					stagger: .1,
					duration: .3
				})

			tlTabs.timeScale(1.3)
			tlTabs.play()
		}

	});

	// tabs 2


	tlTabs2 = gsap.timeline({
		paused: true
	});

	tabsData = []

	$('.tab_content').each((index, item) => {

		let $img1 = $(item).find('.preview_img_wrap')
		let $img2 = $(item).find('.preview_sm_img');
		let $content = $(item).find('.preview_col.content_mod')

		let tabInfo = {
			'el': $(item),
			'img1': $img1,
			'img2': $img2,
			'content': $content
		};

		tabsData.push(tabInfo);
	});

	$('.tab_link').on('click', function () {

		let $this = $(this);
		let startTab = $('.tab_link.active_tab').data('tab');
		let finishTab = $this.data('tab');

		$('.tab_link').removeClass('active_tab')
		$this.addClass('active_tab')

		if (startTab !== finishTab) {
			tlTabs2
				.fromTo([tabsData[startTab].img1, tabsData[startTab].img2], {
					opacity: 1,
					yPercent: 0
				}, {
					opacity: 0,
					yPercent: 15,
					duration: .3
				})
				.fromTo(tabsData[startTab].content, {
					opacity: 1,
					yPercent: 0
				}, {
					opacity: 0,
					yPercent: 15,
					duration: .3
				}, '-=.2')
				.set([], {
					onComplete: function () {
						$('.tab_content').removeClass('active_tab').addClass('disabled_tab')
						$(`.tab_content[data-tab=${finishTab}]`).addClass('active_tab').removeClass('disabled_tab')
					}
				})
				.fromTo([tabsData[finishTab].img1, tabsData[finishTab].img2], {
					opacity: 0,
					yPercent: 15
				}, {
					opacity: 1,
					yPercent: 0,
					duration: .3
				})
				.fromTo(tabsData[finishTab].content, {
					opacity: 0,
					yPercent: 15
				}, {
					opacity: 1,
					yPercent: 0,
					duration: .3
				}, '-=.2')
		}

		tlTabs2.play();
	})


	isRtl = $body.attr('dir') ? true : false

	$numberAnimTitle.each(function (index, title) {
		let dataText = $(title).data('text');

		let numberData = {
			number: 0
		};

		tlNumbers.to(numberData, {
			duration: 2,
			onUpdate: function () {
				$(title).text(numberData.number);
			},
			number: dataText,
			roundProps: 'number',
			ease: Power0.easeNone,
		}, 'anim');
	});

	$menuTrigger.on('click', function () {
		let $this = $(this);
		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$this.removeClass('active_mod');
		} else {
			$body.addClass('menu_open');
			$this.addClass('active_mod');
		}
	});

	// social feed

	feedData = isRtl ? feedArabic : feedEn
	initFeed();

	// preview item image click
	$('.preview_sm_img').on('click', function () {
		$(this).closest('.preview_item').find('.preview_img').toggleClass('active_mod');
	})

	// sliders
	// $('.heroSlider').slick({
	// 	infinite: true,
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	fade: true,
	// 	dots: true,
	// 	arrows: false,
	// 	autoplay: false,
	// 	rtl: isRtl
	// });

	$('.other_slider').slick({
		prevArrow: $('.slider_control.prev_mod.v2_mod.other_mod'),
		nextArrow: $('.slider_control.next_mod.v2_mod.other_mod'),
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		rtl: isRtl,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,







				slidesToScroll: 1

			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	})

	$('.feed_slider').slick({
		prevArrow: $('.slider_control.prev_mod.feed_mod'),
		nextArrow: $('.slider_control.next_mod.feed_mod'),
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		dots: false,
		arrows: true,
		adaptiveHeight: true,
		rtl: isRtl
	});

	$designsSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: $designsNavSlider,
		arrows: false,
		rtl: isRtl
	});

	var $story_slider_item_array = [];
	$('.story_slider').height($(".story_slider_item").outerHeight());

	$(".story_slider_item").each(function (index) {
		var $this = $(this);
		// var $el = $('.story_slider_item_w',$this);
		// $this.addClass('not')
		$this.height($this.outerHeight());
		// $('.story_slider').height($this.outerHeight());
		$story_slider_item_array.push($this)
	});

	var side = 45;
	var sub_side = 150;
	var down = -170;
	var down_sub = -350;

	$('.storySlider').on('init', function (event, slick) {
		//left
		gsap.set($story_slider_item_array[1], {
			opacity: 1,
			xPercent: side * -1,
			z: down
		})
		//center
		gsap.set($story_slider_item_array[0], {
			opacity: 1,
		})
		//right
		gsap.set($story_slider_item_array[$story_slider_item_array.length - 1], {
			opacity: 1,
			xPercent: side,
			z: down
		})
	});

	$('.storySlider').slick({
		prevArrow: $('.slider_control.prev_mod.story_mod'),
		nextArrow: $('.slider_control.next_mod.story_mod'),
		infinite: true,
		slidesToShow: 1,
		centerMode: true,
		speed: 700,
		slidesToScroll: 1,
		arrows: true,
		rtl: true
	});

	function storySliderAnim($direction, $center, $old_center, $left_one, $right_one) {
		var $time = .7;
		var $ease = "sine.inOut";

		if ($direction === 'right_click') {
			gsap.fromTo($center, $time, {
				opacity: 1,
				xPercent: side,
				z: down
			}, {
				opacity: 1,
				xPercent: 0,
				z: 0,
				ease: $ease,
				immediateRender: false
			})

			gsap.fromTo($old_center, $time, {
				opacity: 1,
				xPercent: 0,
				z: 0
			}, {
				opacity: 1,
				xPercent: side * -1,
				z: down,
				ease: $ease,
				immediateRender: false
			})
			gsap.fromTo($left_one, $time, {
				zIndex: 5,
				opacity: 1,
				xPercent: side * -1,
				z: down,
			}, {
				zIndex: 1,
				opacity: 0,
				xPercent: sub_side * -1,
				z: down_sub,
				ease: $ease,
				immediateRender: false
			})
			gsap.fromTo($right_one, $time, {
				opacity: 0,
				xPercent: sub_side,
				z: down_sub,
			}, {
				opacity: 1,
				xPercent: side,
				z: down,
				ease: $ease,
				immediateRender: false
			})

		} else if ($direction === 'left_click') {
			gsap.fromTo($center, $time, {
				opacity: 1,
				xPercent: side * -1,
				z: down,
			}, {
				opacity: 1,
				xPercent: 0,
				z: 0,
				ease: $ease,
				immediateRender: false
			})
			gsap.fromTo($old_center, $time, {
				opacity: 1,
				xPercent: 0,
				scale: 1
			}, {
				opacity: 1,
				xPercent: side,
				z: down,
				ease: $ease,
				immediateRender: false
			})
			gsap.fromTo($right_one, $time, {
				opacity: 1,
				xPercent: side,
				z: down,
			}, {
				opacity: 0,
				xPercent: sub_side,
				z: down_sub,
				ease: $ease,
				immediateRender: false
			})
			gsap.fromTo($left_one, $time, {
				opacity: 0,
				xPercent: sub_side * -1,
				z: down_sub,
				immediateRender: false
			}, {
				opacity: 1,
				xPercent: side * -1,
				z: down,
				ease: $ease,
				immediateRender: false
			})

		}
	}



	$('.storySlider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		console.log('right_click', currentSlide, nextSlide);
		console.log('left_click', nextSlide, currentSlide);

		let $direction;
		let $left_one;
		let $center = nextSlide;
		let $old_center = currentSlide;
		let $right_one;


		if (currentSlide === 0 && nextSlide === $story_slider_item_array.length - 1) {

			$direction = 'right_click';
			$left_one = 1;
			// $old_center
			// $center
			$right_one = $story_slider_item_array.length - 2;

			console.log(1, 'left', $direction, $left_one, $old_center, $center, $right_one)
		} else if (currentSlide === 0 && nextSlide === 1) {

			$direction = 'left_click';
			$left_one = 2;
			// $center
			// $old_center
			$right_one = $story_slider_item_array.length - 1;

			console.log(2, 'right', $direction, $left_one, $center, $old_center, $right_one)

		} else if (currentSlide > nextSlide) {
			if (nextSlide === 0) {
				if (currentSlide === 1) {
					$direction = 'right_click';
					$left_one = 2;
					// $old_center
					// $center
					$right_one = $story_slider_item_array.length - 1;

					console.log(31, 'left', $direction, $left_one, $old_center, $center, $right_one)
				} else {

					$direction = 'left_click';
					$left_one = nextSlide + 1;
					// $center
					// $old_center
					$right_one = currentSlide - 1;

					console.log(32, 'right', $direction, $left_one, $center, $old_center, $right_one)
				}
			} else {

				if (currentSlide === $story_slider_item_array.length - 1) {
					$direction = 'right_click';
					$left_one = 0;
					// $old_center
					// $center
					$right_one = nextSlide - 1;

					console.log(33, 'left', $direction, $left_one, $old_center, $center, $right_one)
				} else {
					$direction = 'right_click';
					$left_one = currentSlide + 1;
					// $old_center
					// $center
					$right_one = nextSlide - 1;

					console.log(34, 'left', $direction, $left_one, $old_center, $center, $right_one)
				}


			}
		} else if (currentSlide < nextSlide) {

			if (nextSlide === $story_slider_item_array.length - 1) {
				$direction = 'left_click';
				$left_one = 0;
				// $center
				// $old_center
				$right_one = currentSlide - 1;

				console.log(41, 'right', $direction, $left_one, $center, $old_center, $right_one)
			} else {
				$direction = 'left_click';
				$left_one = nextSlide + 1;
				// $center
				// $old_center
				$right_one = currentSlide - 1;

				console.log(42, 'right', $direction, $left_one, $center, $old_center, $right_one)
			}

		}

		storySliderAnim($direction, $story_slider_item_array[nextSlide], $story_slider_item_array[currentSlide], $story_slider_item_array[$left_one], $story_slider_item_array[$right_one])
	});



	// $designsNavSlider.slick({
	// 	infinite: true,
	// 	slidesToShow: 6,
	// 	slidesToScroll: 1,
	// 	dots: false,
	// 	arrows: false,
	// 	autoplay: false,
	// });


	$('.groundb_slider.page_mod').slick({
		prevArrow: $('.slider_control.prev_mod.v2_mod.groundb_mod.page_mod'),
		nextArrow: $('.slider_control.next_mod.v2_mod.groundb_mod.page_mod'),
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		rtl: isRtl,
		responsive: [{
			breakpoint: mediaPoint1,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: mediaPoint2,
			settings: {
				slidesToShow: 2,
			}
		}, {
			breakpoint: mediaPoint3,
			settings: {
				slidesToShow: 1,

			}
		}
		]
	});

	$('.groundb_slider.popup_mod').slick({
		prevArrow: $('.slider_control.prev_mod.v2_mod.groundb_mod.popup_mod'),
		nextArrow: $('.slider_control.next_mod.v2_mod.groundb_mod.popup_mod'),
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		asNavFor: '.slider_video_w',
		focusOnSelect: true,
		rtl: isRtl,
		responsive: [{
			breakpoint: mediaPoint1,






			settings: {





				slidesToShow: 3,

			}
		},
		{
			breakpoint: mediaPoint2,
			settings: {
				slidesToShow: 2,
			}
		}, {
			breakpoint: mediaPoint3,
			settings: {
				slidesToShow: 1,
			}
		}
		]
	});


	$('.slider_video_w').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		arrows: false,
		fade: true,
		// fade: true,
		asNavFor: '.groundb_slider.popup_mod',
		rtl: isRtl
	});

	function destroyScrollBar() {
		Scrollbar.destroy($wrapper);
		prevScrollTop = scrollTop;
	}

	function reInitScrollBar() {
		initBodyScrollBar();
		bodyScrollBar.setPosition(0, prevScrollTop);
	}

	$('.sliderVideoPopupBtn').on('click', function (e) {
		e.preventDefault();

		if (!isSliderVideoOpen) {
			isSliderVideoOpen = true;

			$sliderVideoPopup.addClass('active_state');
			$body.addClass('popup_mod');
			destroyScrollBar();
			$('.groundb_slider_icon_w .icon-plyr-play').addClass('display-none');
		}
	});

	var FS_counter;
	var FS_counter_temp;
	var timerId = false;
	var interval_start = false;

	// videoPlayer.map(item => item.on('enterfullscreen exitfullscreen', event => {
	// 	console.log(event.type, item.playing);
	// 	if (event.type === 'enterfullscreen' && item.playing && item.currentTime > 0) {
	// 		interval_start = false;
	// 		prevScrollTop = scrollTop;
	// 		bodyScrollBar.setPosition(0, 0)
	// 		ScrollTrigger.refresh(true);
	// 		console.log('enterfullscreen', prevScrollTop, event.type);
	// 	}
	// 	if (event.type === 'exitfullscreen' && prevScrollTop && !interval_start && item.playing && item.currentTime > 0) {
	// 		interval_start = true;
	// 		// gsap.from($body, .1 * videoPlayer.length * 3, {opacity:0})
	// 		// gsap.delayedCall(.1 * videoPlayer.length * 2.93, function () {
	// 		gsap.delayedCall(.1, function () {
	// 			scroll_refresh();
	// 		});
	// 	}
	// }));

	function scroll_refresh() {
		console.log('exitfullscreen', prevScrollTop);
		bodyScrollBar.setPosition(0, prevScrollTop)

		console.log('set pos')
	}

	const stopAllVideoExceptCurrent = currentVideo => {
		videosData.map(({
			video
		}) => {
			if (video !== currentVideo) {
				video.stop();
			}
		});
	};

	$('.video_block').each((index, video) => {

		let videoSrc;
		let videoType;
		let isEmbededVideo = false;
		let plyrProvider = $(video).data('plyr-provider');

		const plyrInstance = new Plyr(video, {
			iconUrl: 'i/sprite/sprite.svg',
			invertTime: false,
			hideControls: false,
			fullscreen: { enabled: false, fallback: false, iosNative: false },
		});

		plyrInstance.on('play', () => {
			plyrInstance.toggleControls(true);

			// Alaa changes 26/11/2020 start
			if (plyrProvider) {
				var videoId = $(video).data('plyr-embed-id');
				AddVideoToDataLayer(videoId);
			} else {
				let $videoSourceEl = $('source', $(video));
				var videoSource = $videoSourceEl.attr('src');
				AddVideoToDataLayer(videoSource);
			}
			// Alaa changes 26/11/2020 end

			stopAllVideoExceptCurrent(plyrInstance);

			// ne nash code
			var sizeWrap = $(item.elements.container).closest('.preview_sm_img_in')

			if (sizeWrap) {
				var sizeWrapWidth = sizeWrap.height() / 9 * 16;
				sizeWrap.width(sizeWrapWidth)
			}

		});

		plyrInstance.on('ready', () => plyrInstance.toggleControls(false));
		plyrInstance.on('pause', () => {
			plyrInstance.toggleControls(false);

			// ne nash code
			var sizeWrap = $(item.elements.container).closest('.preview_sm_img_in')
			if (sizeWrap) {
				sizeWrap.width('100%')
			}

		});

		if (plyrProvider) {
			videoType = plyrProvider;
			videoSrc = $(video).data('plyr-embed-id');
			isEmbededVideo = true;
		} else {
			let $videoSourceEl = $('source', $(video));
			videoSrc = $videoSourceEl.attr('src');
			videoType = $videoSourceEl.attr('type');
		}

		$(video).parent().attr('data-video-id', index + 1);

		let data = {
			id: index + 1,
			video: plyrInstance,
			src: videoSrc,
			type: videoType,
			isEmbededVideo
		};

		videosData.push(data);
	});

	const toggleVideoPopupState = () => {
		$body.toggleClass('popup_mod');
		$popupMainVideoW.toggleClass('active_state');
	};

	const getVideoById = id => {
		const videoItem = videosData.filter(item => {
			if (id === item.id) {
				return item;
			}
		});

		return videoItem;
	};

	const createVideoTemplate = (isEmbededVideo, src, type) => {
		let videoTemplate;

		if (isEmbededVideo) {
			videoTemplate = `
				<div class="popup_video popupMainVideo" data-plyr-provider=${type} data-plyr-embed-id=${src}></div>
			`;
		} else {
			videoTemplate = `
				<video class="popup_video popupMainVideo" playsinline="" controls="" muted="">
					<source src=${src} type=${type}>
				</video>
			`;
		}

		return videoTemplate;
	};

	const createPopupVideo = (isEmbededVideo, src, type) => {
		const videoTemplate = createVideoTemplate(isEmbededVideo, src, type);

		$popupVideoContainer[0].innerHTML = videoTemplate;

		popupMainVideo = new Plyr('.popupMainVideo', {
			iconUrl: 'i/sprite/sprite.svg',
			invertTime: false,
			hideControls: false,
			fullscreen: { enabled: false, fallback: false, iosNative: false },
		});

	};

	$(document).on('click', '.plyr__control[data-plyr="fullscreen"]', function (e) {
		e.preventDefault();

		let $this = $(this);
		let videoId = $this.closest('.plyr').find('[data-video-id]').data('video-id');

		const videoItem = getVideoById(videoId)[0];

		videoItem.video.stop();

		createPopupVideo(videoItem.isEmbededVideo, videoItem.src, videoItem.type);

		// FOR YOUTUBE
		if (videoItem.isEmbededVideo) {
			setTimeout(() => {
				popupMainVideo.play();
			}, 1000);
		} else {
			popupMainVideo.play();
		}

		toggleVideoPopupState();
	});

	const stopVideoPopup = () => {
		popupMainVideo.stop();
	};

	$btnClosePopupMainVideo.on('click', () => {
		toggleVideoPopupState();
		stopVideoPopup();
	});



	// const videoBg = Array.from(document.querySelectorAll('.video_bg')).map(p => new Plyr(p, {
	// 	iconUrl: '',
	// 	invertTime: false,
	// 	hideControls: false,
	// 	autoplay: true
	// }));

	// videoBg.map(item => item.on('ready', () => {
	// }));
	$('.groundb_slider_item_w').on('click', function (e) {
		e.preventDefault();
		if (isSliderVideoOpen) {
			videosData.map((item) => {
				item.video.stop();
			});
		}
	});
	
	$('.closeSliderVideoPopup').on('click', function (e) {
		e.preventDefault();

		if (isSliderVideoOpen) {
			isSliderVideoOpen = false;
			reInitScrollBar();

			videosData.map((item) => {
				item.video.stop();
			});

			$sliderVideoPopup.removeClass('active_state');
			$body.removeClass('popup_mod');
			$('.groundb_slider_icon_w .icon-plyr-play').removeClass('display-none');
		}

	});

	$designsNavLink.on('click', function (e) {
		e.preventDefault();

		var $this = $(this);
		var slideId = $this.data('slide-id');

		$designsSlider.slick('slickGoTo', slideId);
	});

	$btnPlay.on('click', function (e) {
		e.preventDefault();

		var $this = $(this);

		if (!isVideoPopupOpen) {
			isVideoPopupOpen = true;

			let srcVideo = $this.data('video-src');
			$popupVideo.attr('src', srcVideo);

			$popupVideo[0].load();
			$videoPopup.addClass('active_state');
			$body.addClass('popup_mod');

			destroyScrollBar();

			// Alaa changes 26/11/2020 start
			AddVideoToDataLayer(srcVideo);
			// Alaa changes 26/11/2020 end
		}

	});

	$('.btnCloseVideoPopup').on('click', function (e) {
		e.preventDefault();

		if (isVideoPopupOpen) {
			isVideoPopupOpen = false;

			$videoPopup.removeClass('active_state');
			$body.removeClass('popup_mod');

			$popupVideo[0].pause();
			$popupVideo.attr('src', '');

			reInitScrollBar();
		}

	});

	// $('[data-fancybox]').fancybox({
	// 	thumbs : {
	// 		autoStart : true,
	// 		axis: 'x'
	// 	}
	// });

	$('a.feed_item').on('click', function (e) {
		e.preventDefault();
		var index = $(this).index()

		$('.socialPopup').addClass('active_state')
		$('.feed_slider').slick('slickGoTo', index - 1)

		destroyScrollBar()
	})

	$('.feedClose').on('click', function () {
		let parentPopup = $(this).closest('.popup')
		parentPopup.removeClass('active_state')

		let videoEl = parentPopup.find('.feed_slider_item.slick-active video.feed_slider_img')
		if (videoEl.length) {
			videoEl[0].pause()
		}

		reInitScrollBar();
	})

	$('.phase_info').on('click', function () {
		$previewPopup.addClass('active_state')
		destroyScrollBar()
	})

	$('.previewClose').on('click', function () {
		$previewPopup.removeClass('active_state')
		reInitScrollBar()
	})

	$('.btnDescrControl').on('click', function (e) {
		var $this = $(this);
		var descrId = $this.data('descr-id');

		$.each(sectionDescrData, (index, item) => {
			if (item.id === descrId) {
				if (item.isOpened) {
					gsap.to($(item.el), {
						height: item.height,
						duration: .4,
						ease: 'none',
						onComplete: () => {
							gsap.set($(item.el), {
								clearProps: 'height'
							})
						}
					});
					item.isOpened = false;
					$(item.el).removeClass('active_state')
					$this.removeClass('active_state');
					$cursorHamburger.removeClass('active_state')
				} else {
					gsap.to($(item.el), {
						height: item.fullHeight,
						duration: .4,
						ease: 'none'
					});
					item.isOpened = true;
					$(item.el).addClass('active_state')
					$this.addClass('active_state');
					$cursorHamburger.addClass('active_state');
				}
			}
		});
	});

	$('.partnerOpen').click(function () {
		$partnerItem.removeClass('active_mod');
		$(this).closest('.partner_item_wrap').addClass('active_mod');
	});

	$('.partnerClose').click(function () {
		$(this).closest('.partner_item_wrap').removeClass('active_mod');
	});

	// validation

	$('.sendForm').on('click', function (e) {
		debugger
		var termsChecked = $('#I_have_read_and_understood_the_Red_Sea_Development_Company').is(":checked")

		if ($subscribeForm.valid()) {
			if (termsChecked) {
				var fd = new FormData();
				fd.append('FirstName', $("#subscribe_name").val());
				fd.append('LastName', $("#subscribe_last_name").val());
				fd.append('Email', $("#subscribe_mail").val());
				fd.append('EmailTemplate', '{EA5DAE8E-1E81-4C36-AF37-B3D2C156B1A8}');
				var url = 'https://www.theredsea.sa//api/Subscriber/AddNewsSubscription'; // the script where you handle the form input.
				$subscribeForm.addClass("display-none");
				$('.loader-icon').removeClass("display-none");
				$.ajax({
					type: 'POST',
					url: url,
					data: fd, // serializes the form's elements.
					async: true,
					success: function (data) {
						showSuccessMessage();
						$('.loader-icon').addClass("display-none");
						dataLayer.push({'event':'Newsletter_Success'});
					},
					error: function (data) {
						$('.loader-icon').addClass("display-none");
						showFailureMessage();
					},
					processData: false,
					contentType: false
				});
				e.preventDefault(); // avoid to execute the actual submit of the form.
				$subscribeForm[0].reset();
			}
			else {
				showTermsValidationMessage();
				return false;
			}
		} else {
			return false;
		}
	});

	$('#I_have_read_and_understood_the_Red_Sea_Development_Company').click(function () {
		if ($(this).is(':checked')) {
			$('.terms-message').html("");
		}
	});

	function showTermsValidationMessage() {
		var msg = isRtl ? "<p>يجب الموافقة على سياسة الخصوصية </p>" : "<p>Please agree to the privacy policy</p>"
		$('.terms-message').html(msg);
	};

	function showSuccessMessage() {
		var msgHeader = isRtl ? "<h5>تم تسجيلكم بنجاح، أهلاً ومرحباً بكم!</h5>" : "<h5>You've successfully subscribed!</h5>"
		var msgBody = isRtl ? "<p>نشكركم على تسجيلكم في نشرتنا البريدية التي ستقدم لكم آخر مستجدات مشروع البحر الأحمر وتطوراته على أرض الواقع، بالإضافة إلى فرص الأعمال المتنوعة التي يوفرها المشروع. نسعد بكم ونتطلع إلى التفاعل معكم.</p>"
			: "<p>Thank you for signing up to our monthly email newsletter, in which you will hear all about our latest news, progress updates and opportunities. We look forward to engaging with you.</p>"
		$('.subscription-message').html(msgHeader + msgBody);
		$('.subscription-message').animate({ opacity: 1 }, 1000);
	};


	function showFailureMessage() {
		var msgHeader = isRtl ? "<h5>لم يكتمل التسجيل في القائمة البريدية</h5>" : "<h5>Your registration is not completed!</h5>"
		var msgBody = isRtl ? "<p>عذرا، يرجى المحاولة مرة أخرى في وقت لاحق.</p>" : "<p>Sorry, please try to submit your request later.</p>"
		$('.subscription-message').html(msgHeader + msgBody);
		$('.subscription-message').animate({ opacity: 1 }, 1000);
	};

	$subscribeForm.validate({
		rules: {
			name: "required",
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			I_have_read_and_understood_the_Red_Sea_Development_Company: {
				required: true
			}
		}
	});

	//developer funcitons

	// pageWidget([
	// 	'index',
	// 	'index_2',
	// 	'2d_level_page',
	// 	'2d_level_page_2',
	// 	'constructions',
	// 	'constructions_2',
	// 	'sheybarah_page',
	// 	'sheybarah_page_2',
	// ]);
	// getAllClasses('html', '.elements_list');

	$('.latestSlider').slick({
		prevArrow: $('.slider_control.prev_mod.latest_mod'),
		nextArrow: $('.slider_control.next_mod.latest_mod'),
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		rtl: isRtl,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});

	$('.map_facility_close').on('click', function () {
		$('.map_pointer_wrap').removeClass('active_mod')
		$('.map_facility').removeClass('active_mod')
	});

	$designsNavSlider.slick({
		prevArrow: $('.btnPrevDesignsSlide'),
		nextArrow: $('.btnNextDesignsSlide'),
		arrows: true,
		dots: false,
		infinite: false,
		slidesToShow: 3,
		asNavFor: $designsSlider,
		slidesToScroll: 1,
		variableWidth: true,
		rtl: isRtl
	});

	$designsNavLink = $('.designsNavLink');

	// function buildDesignsSlider() {
	// 	if ($designsNavSlider.length) {
	// 		var firstItemTop = $designsNavItem.eq(0).offset().top;
	// 		var itemLength = $designsNavItem.length;
	// 		var lastItemTop = $designsNavItem.eq(itemLength - 1).offset().top;

	// 		if (firstItemTop !== lastItemTop) {

	// 			$designsNavSlider.slick({
	// 				prevArrow: $('.btnPrevDesignsSlide'),
	// 				nextArrow: $('.btnNextDesignsSlide'),
	// 				arrows: true,
	// 				dots: false,
	// 				infinite: false,
	// 				slidesToShow: 3,
	// 				asNavFor: $designsSlider,
	// 				slidesToScroll: 1,
	// 				variableWidth: true,
	// 				rtl: isRtl
	// 			});

	// 			$designsNavLink = $('.designsNavLink');

	// 		} else {
	// 			$('.designs_w_nav').addClass('static_mod');
	// 		}
	// 	}
	// }

	// buildDesignsSlider();

	// map popup

	let isMapSectionExist = checkIfElementExist($('.mapSection'));

	if (isMapSectionExist) {
		initMap();
		onloadOpenPopup();
	}

	$('body').on('click', '.map_pointer_wrap', function () {
		$('.map_pointer_wrap').removeClass('active_mod')
		$(this).addClass('active_mod')
		$('.map_facility').addClass('active_mod')

		let currentItem = markers.find(item => {
			return item.id == $(this).data('id')
		});

		fillPopup(currentItem)
	})
});

$(window).on('load', function () {
	updateSizes();
	loadFunc();
});

$(window).on('resize', function () {
	resizeFunc();
});

// $(window).on('scroll', function () {
// 	scrollFunc();
// });

function previewAnimation() {

	$('.previewBlock').each(function (index, item) {
		let $this = $(this);
		let $previewText = $('.preview_text', $this);
		let animDirection = $this.data('anim-direction');
		let previewTextId = $previewText.data('preview-id');
		let previewTextHeight = $previewText.height();
		let previewTextWidth = $previewText.width();
		let previewFullHeight = $previewText[0].scrollHeight;

		let descrData = {
			isOpened: false,
			el: $this,
			imgBlock: $('.previewImgBlock', $this),
			contentBlock: $('.previewContentBlock', $this),
			descrBlock: $previewText,
			descrId: previewTextId,
			descrHeight: previewTextHeight,
			descrFullHeight: previewFullHeight,
			descrWidth: previewTextWidth,
			descrFullWidth: previewTextWidth + rem * 55,
		};

		let previewTl = gsap.timeline({
			paused: true
		});

		// let toDirection = isRtl ? -1 : 1;
		let toXValue = !isRtl ? (animDirection === 'left' ? '-35vw' : '35vw') : (animDirection === 'left' ? '35vw' : '-35vw');
		let btnToXValue = animDirection === 'left' ? '29vw' : '-29vw';

		previewTl
			.addLabel('enter')
			.fromTo(descrData.imgBlock, {
				x: 0
			}, {
				x: toXValue,
				ease: 'power2.out',
				duration: 1
			}, 'enter')
			.fromTo(descrData.contentBlock, {
				x: 0
			}, {
				x: function () {
					return !isRtl ? (animDirection === 'left' ? '-35vw' : 0) : (animDirection === 'left' ? '35vw' : 0)
				},
				ease: 'power2.out',
				duration: 1
			}, 'enter')

			// .fromTo($('.btnPreviewControl', descrData.contentBlock), {
			// 	x: 0
			// }, {
			// 	x: function(){
			// 		return !isRtl ? '29vw' : '-29vw'
			// 	},
			// 	ease: 'power2.out',
			// 	duration: 1
			// }, 'enter')
			.addLabel('enter-finish')
			.addLabel('leave')
			.fromTo(descrData.imgBlock, {
				x: toXValue
			}, {
				x: 0,
				ease: 'power2.out',
				duration: 1,
				immediateRender: false,
			}, 'leave')
			.fromTo(descrData.contentBlock, {
				x: function () {
					return !isRtl ? (animDirection === 'left' ? '-35vw' : 0) : (animDirection === 'left' ? '35vw' : 0)
				},
			}, {
				x: 0,
				ease: 'power2.out',
				duration: 1,
				immediateRender: false,
			}, 'leave')
			// .fromTo($('.btnPreviewControl', descrData.contentBlock), {
			// 	x: function(){
			// 		return !isRtl ? '29vw' : '-29vw'
			// 	},
			// }, {
			// 	x: 0,
			// 	ease: 'power2.out',
			// 	duration: 1,
			// 	immediateRender: false,
			// }, 'leave')
			.addLabel('leave-finish')

		descrData.animTl = previewTl;

		previewBlockData.push(descrData);
	});

	$('.btnPreviewControl').on('click', function (e) {
		let $this = $(this);
		let descrId = $this.data('preview-id');

		$.each(previewBlockData, (index, item) => {
			if (item.descrId === descrId) {
				if (item.isOpened) {
					$this.removeClass('active_state');
					$cursorHamburger.removeClass('active_state')

					if (windowWidth >= mediaPoint1) {
						item.animTl.tweenFromTo('leave', 'leave-finish');
					}

					gsap.to($(item.descrBlock), {
						height: item.descrHeight,
						width: item.descrWidth,
						duration: .4,
						ease: 'none',
						onComplete: () => {
							gsap.set($(item.descrBlock), {
								clearProps: 'height'
							})
						}
					});

					item.isOpened = false;
					$(item.descrBlock).removeClass('active_state');
				} else {
					$this.addClass('active_state');
					$cursorHamburger.addClass('active_state')

					if (windowWidth >= mediaPoint1) {
						item.animTl.tweenFromTo('enter', 'enter-finish');
					}

					gsap.to($(item.descrBlock), {
						height: item.descrFullHeight,
						width: item.descrFullWidth,
						duration: .4,
						ease: 'none'
					});

					item.isOpened = true;
					$(item.descrBlock).addClass('active_state');
				}
			}
		});

	});

}

function animBgInit() {

	const updateBgColor = (color) => {
		$document.style.setProperty('--bg-color', color);
	};

	const onEnterAnim = $section => {
		let colorIdValue = $section.data('id-color');
		let colorValue;

		sectionBgData.forEach(({ id, color }) => {
			if (colorIdValue === id) {
				colorValue = color;
			}
		});

		updateBgColor(colorValue);
	};

	// const onLeaveAnim = () => updateBgColor(DEFAULT_BODY_BG_COLOR);

	ScrollTrigger.batch($('.sectionBgTrigger'), {
		// markers:true,
		start: "top top+=30%",
		end: "bottom top+=30%",
		scroller: $scrollerProxyWDiv,
		onEnter: batch => onEnterAnim($(batch)),
		onEnterBack: batch => onEnterAnim($(batch)),
		// onLeave: batch => onLeaveAnim(),
		// onLeaveBack: batch => onLeaveAnim()
	});

}

const onLoadingAnim = () => {
	let $loader = $('.loader');

	let tlLoadingAnim = gsap.timeline({
		delay: .2,
		onComplete: () => {
			if (isHeroSectionExist) {
				tlLoadAnim.play();
			}
			if (isHero2SectionExist) {
				tlLoad2Anim.play();
			}

			$loader.addClass('hidden_mod');
		}
	});

	let enterTweenEasing = "power2.out";
	let $loadingDecor = $('.loader_block_decor');
	let $loaderBlockWImage = $('.loader_block_w_img');
	let $loaderImages = $('.loader_block_img');
	let $loaderTitle = $('.loaderTitle');

	let splittedTitle = new SplitText($loaderTitle, {
		type: "lines",
		linesClass: 'split_title'
	});
	let splittedWtitle = new SplitText($loaderTitle, {
		type: "lines",
		linesClass: 'split_title_wrap'
	});

	let randomImageIndex = getRandomInt(0, $loaderImages.length - 1);

	gsap.set($loaderImages[randomImageIndex], {
		opacity: 1
	});

	tlLoadingAnim
		.fromTo('.loader_w_logo', {
			opacity: 0
		}, {
			opacity: 1,
			duration: .5
		})
		.addLabel('decor_anim', '+=1')
		.fromTo($loadingDecor, {
			yPercent: 0
		}, {
			yPercent: -100,
			duration: .8,
			ease: enterTweenEasing
		}, 'decor_anim')
		.set('.loader_block_content', {
			opacity: 1
		}, 'decor_anim+=.7')
		.fromTo($loadingDecor, {
			yPercent: -100
		}, {
			yPercent: -200,
			duration: .8,
			immediateRender: false,
			ease: enterTweenEasing
		}, 'decor_anim+=.7')
		.addLabel('anim', '-=1')
		.fromTo($loaderBlockWImage, {
			yPercent: -50
		}, {
			yPercent: -100,
			immediateRender: false,
			duration: 1,
			ease: enterTweenEasing
		}, 'anim')
		.fromTo(splittedTitle.lines, {
			yPercent: 100
		}, {
			yPercent: 0,
			duration: .9,
			stagger: .3,
			ease: enterTweenEasing,
			onComplete: () => {
				$(splittedWtitle.lines).addClass('visible_mod');
			}
		}, 'anim+=.4')
		.addLabel('leave_anim')
		.fromTo(splittedTitle.lines, {
			y: 0
		}, {
			y: '-30vh',
			duration: 1,
			stagger: .3,
			immediateRender: false,
			ease: "power2.in"
		}, 'leave_anim')
		.fromTo($loaderBlockWImage, {
			yPercent: -100
		}, {
			yPercent: -140,
			duration: 1.4,
			immediateRender: false,
			ease: "power2.in"
		}, 'leave_anim')
		.fromTo($loader, {
			yPercent: 0
		}, {
			yPercent: -100,
			duration: 1.4,
			ease: "power2.in"
		}, 'leave_anim')

};

const onLoadAnim = () => {
	tlLoadAnim
		.fromTo($heroSection, {
			opacity: 0
		}, {
			opacity: 1
		})
		.addLabel('anim')
		.fromTo(['.logo', heroSlidesArray[0].elContentW, '.slick-dots', '.hero_slider_item_btn'], {
			opacity: 0
		}, {
			opacity: 1
		})

	if (windowWidth >= mediaPoint1) {
		tlLoadAnim
			.fromTo($mainNavLink, {
				yPercent: 100
			}, {
				yPercent: 0,
				stagger: .1
			}, 'anim')
	} else {
		tlLoadAnim
			.fromTo('.header_menu', {
				opacity: 0
			}, {
				opacity: 1
			}, 'anim')
	}

};

const onLoad2Anim = () => {
	tlLoad2Anim
		.fromTo($hero2Section, {
			opacity: 0
		}, {
			opacity: 1
		})
		.addLabel('anim')
		.fromTo('.logo', {
			opacity: 0
		}, {
			opacity: 1
		})
		.fromTo('.fadeHeroEl', {
			opacity: 0,
			y: 50
		}, {
			opacity: 1,
			y: 0,
			stagger: .15
		}, 'anim')

	if (windowWidth >= mediaPoint1) {
		tlLoad2Anim
			.fromTo($mainNavLink, {
				yPercent: 100
			}, {
				yPercent: 0,
				stagger: .1
			}, 'anim')
	} else {
		tlLoad2Anim
			.fromTo('.header_menu', {
				opacity: 0
			}, {
				opacity: 1
			}, 'anim')
	}


};

function handleHoverOnBodyScroll() {
	clearTimeout(timer);

	if (!$body.hasClass('disable-hover')) {
		$body.addClass('disable-hover');
	}

	timer = setTimeout(function () {
		$body.removeClass('disable-hover');
	}, 500);
}

function initFooterAnimation() {
	var footerTl = gsap.timeline({
		paused: true,
		scrollTrigger: {
			scroller: $scrollerProxyWDiv,
			trigger: $footer,
			start: 'top center+=20%',
			toggleActions: "play none none none"
		}
	});

	footerTl
		.addLabel('anim')
		.fromTo($footer, {
			opacity: 0
		}, {
			opacity: 1,
			duration: .4,
		})
		.fromTo('.footerAnimEl', {
			y: 30,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			stagger: .1
		})
		.fromTo('.footerBg', {
			scale: 1.2
		}, {
			scale: 1,
			duration: .8
		}, 'anim')
}

function initBodyScrollBar($position) {
	let $$position = $position !== undefined ? $position : 0;
	let damping = windowWidth <= 1023 ? 0.18 : 0.06;
	bodyScrollBar = Scrollbar.init($wrapper, {
		damping: damping,
		delegateTo: document,
		thumbMinSize: 20
	});

	bodyScrollBar.addListener(({
		offset
	}) => {
		$scrollerProxyWDiv[0].scrollTop = offset.y;
		scrollTop = offset.y;

		headerScroll();
		handleHoverOnBodyScroll();

		settingsTrigger(scrollTop, 1);
	});

	bodyScrollBar.setPosition(0, $$position);

	ScrollTrigger.scrollerProxy($wrapper, {
		scrollTop(value) {
			if (arguments.length) {
				bodyScrollBar.scrollTop = value;
			}
			return bodyScrollBar.scrollTop;
		}
	});

	bodyScrollBar.addListener(ScrollTrigger.update);
}

function initCustomScrollBar() {
	setTimeout(() => {
		initBodyScrollBar();

		wrapperHeight = $wrapper.scrollHeight;

		$scrollerProxyDiv.height(wrapperHeight);

		ScrollTrigger.refresh();
		$heroSlider.slick('refresh');
	}, 100);
}

function timelinePreviewAnimation() {
	$previewTimeline.each((index, el) => {
		let $this = $(el);
		let $previewImage = $('.preview_img_wrap', $this);

		let xPercentValue = isEven(index + 1) ? (isRtl ? -80 : 80) : (isRtl ? 80 : -80);
		let endValue;

		if (windowWidth >= mediaPoint1) {
			endValue = 'bottom bottom-=50%';
		} else {
			endValue = 'bottom bottom';
		}

		let timeline = gsap.timeline({
			scrollTrigger: {
				trigger: $this,
				start: 'top bottom',
				end: endValue,
				scrub: true,
				scroller: $scrollerProxyWDiv,
			}
		});

		timeline
			.fromTo($previewImage, {
				xPercent: xPercentValue
			}, {
				xPercent: 0
			})

	});
}

function resetScrollBarPosition() {
	prevScrollTop = scrollTop;
	bodyScrollBar.setPosition(0, 0);
	ScrollTrigger.refresh(true)
}

function reInitScrollBarPosition() {
	bodyScrollBar.setPosition(0, prevScrollTop);
}

function progressScaleAnimation() {
	let storyBlockHeight = $storyVideoBlock.height();

	let scaleValue = Math.max(
		windowWidth / $storyVideoBlock.width(),
		windowHeight / storyBlockHeight
	);

	let timeline = gsap.timeline({
		scrollTrigger: {
			trigger: $storyVideoBlock,
			start: `top center-=${storyBlockHeight * 0.25}`,
			end: `bottom+=${windowHeight / 2}`,
			scrub: 0.1,
			pin: true,
			scroller: $scrollerProxyWDiv,
			onEnterBack: () => {
				$storyVideoBlock.removeClass('disabled_state');
			},
			onLeave: () => {
				$storyVideoBlock.addClass('disabled_state');
			},
		}
	});

	timeline
		.fromTo($storyVideoBlock, {
			scale: 1
		}, {
			scale: scaleValue,
			duration: .5,
		})
		.fromTo($storyVideoBlock, {
			opacity: 1
		}, {
			opacity: 0,
			duration: .2
		})
}

function progressItemsList() {
	let constructLength = $constructItem.length;

	let timeline = gsap.timeline({
		duration: .2,
		ease: 'none',
		scrollTrigger: {
			trigger: $constructList,
			start: 'top center-=30%',
			end: `bottom+=${windowHeight}`,
			scrub: true,
			pin: true,
			scroller: $scrollerProxyWDiv,
		}
	});

	$constructItem.each((index, item) => {
		if (index < constructLength - 1) {
			timeline
				.fromTo($constructItem[index], {
					opacity: 1
				}, {
					opacity: 0
				})
				.fromTo($constructItem[index + 1], {
					opacity: 0
				}, {
					opacity: 1
				}, '-=.2')
		}
	})

}

function anchorAnimation() {
	// REFACTOR
	$mainNavLink.each((index, link) => {
		let $this = $(link);
		let sectionId = $this.attr('href');
		let $section = $(sectionId);

		if ($section.length) {
			let topY = $(sectionId).offset().top;

			let subData = {
				el: $this,
				index,
				yPosition: topY
			};

			mainMenuLinkData.push(subData);
		}

	});

	$mainNavLink.on('click', function (e) {
		let $this = $(this);
		e.preventDefault();

		settingsClick = true;

		setTimeout(function () {
			settingsClick = false;
		}, 500);

		let linkIndex = $this.data('index');
		let offsetY = 80;
		let offsetTop = mainMenuLinkData[linkIndex].yPosition - offsetY;

		$mainNavLink.removeClass('active_mod');
		$(this).addClass('active_mod');

		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$menuTrigger.removeClass('active_mod');
		}

		bodyScrollBar.scrollTo(0, offsetTop, 1000);
	});
}

function loadFunc() {
	calcViewportHeight();

	// G KOD, NE BEYTE
	if (windowWidth < mediaPoint1) {
		isDesktopScreen = false;
		isMobileScreen = true;
	} else {
		isDesktopScreen = true;
		isMobileScreen = false;
	}

	if ($settingsSection) {
		createSettingsArray();
	}

	previewAnimation();

	let isSectionDescrExist = checkIfElementExist($sectionDescr);

	if (isSectionDescrExist) {
		$sectionDescr.each(function (index, item) {
			let $this = $(this);
			let itemId = $this.data('descr-id');
			let itemHeight = $this.height();
			let itemFullHeight = $this[0].scrollHeight;

			let descrData = {
				isOpened: false,
				el: $this,
				id: itemId,
				height: itemHeight,
				fullHeight: itemFullHeight
			};

			sectionDescrData.push(descrData);
		});

		initCursorAnim();
		$('.tab_content').addClass('disabled_tab');
	}

	if (checkIfElementExist($storyVideoBlock) && windowWidth >= mediaPoint1) {
		progressScaleAnimation();
	}

	if (checkIfElementExist($constructList) && windowWidth >= mediaPoint1) {
		progressItemsList();
	}

	initAnimEl();
	animBgInit();
	initFooterAnimation();

	// anchors
	// if ($header.hasClass('home_page_mod')) {
	// 	anchorAnimation();
	// }

	if (checkIfElementExist($heroSlider)) {
		heroSliderInit();
	}

	$body.addClass('loaded_mod');
	initCustomScrollBar();

	isHeroSectionExist = checkIfElementExist($heroSection);
	isHero2SectionExist = checkIfElementExist($hero2Section)

	if (isHeroSectionExist) {
		onLoadAnim();
	}

	if (isHero2SectionExist) {
		onLoad2Anim();
	}

	let isTimelinePreviewSectionExist = checkIfElementExist($previewTimeline);

	if (isTimelinePreviewSectionExist) {
		timelinePreviewAnimation();
	}

	// UNCOMMENT PRELOADER LATER
	onLoadingAnim();
}

function resizeFunc() {
	updateSizes();

	calcViewportHeight();

	if ($wrapper) {
		wrapperHeight = $wrapper.scrollHeight;
		$scrollerProxyDiv.height(wrapperHeight);

		resetScrollBarPosition();

		setTimeout(() => {
			reInitScrollBarPosition();
		}, 500);
	}

	if (previewBlockData.length) {
		$.each(previewBlockData, function (key, item) {
			let $previewText = $('.preview_text', $(item.el));
			let previewTextHeight = $previewText.height();
			let previewFullHeight = $previewText[0].scrollHeight;

			item.descrHeight = previewTextHeight;
			item.descrFullHeight = previewFullHeight;
		});
	}

	if (sectionDescrData.length) {
		$.each(sectionDescrData, function (key, item) {
			item.height = $(item.el).height();
			item.fullHeight = $(item.el)[0].scrollHeight;
		});
	}

	// G KOD, NE BEYTE
	if (windowWidth < mediaPoint1) {
		if (isDesktopScreen && !isMobileScreen) {
			window.location.reload();
			isDesktopScreen = false;
			isMobileScreen = true;
		}
	} else {
		if (!isDesktopScreen && isMobileScreen) {
			window.location.reload()
			isDesktopScreen = true;
			isMobileScreen = false;
		}
	}

}

function headerScroll() {
	if (scrollTop > 10 && !$header.hasClass('scroll_mod')) {
		$header.addClass('scroll_mod');
	} else if (scrollTop < 10) {
		$header.removeClass('scroll_mod');
	}
}

function updateSizes() {
	windowWidth = window.outerWidth;
	windowHeight = window.innerHeight;
	windowRtlOffset = isRtl ? windowWidth : 0

	calcViewportHeight();

	if (settingsArray.length) {
		settingsArray.forEach(function (item) {
			item.update();
		});
	}

}

function tabs(link, block) {
	let linkSelector = $(link),
		blockSelector = $(block);

	// FOR CORRECT SCROLLTRIGGER & PREVIEW ANIMATION
	$(blockSelector).addClass('disabled_tab');
	ScrollTrigger.refresh(true);

	$(linkSelector).on('click', function (e) {
		e.preventDefault();

		let $this = $(this),
			currentData = $this.data('tab');

		$(blockSelector).removeClass('active_tab');
		$(linkSelector).removeClass('active_tab');

		$(block + '[data-tab="' + currentData + '"]').addClass('active_tab');
		$this.addClass('active_tab');
	});

}

function createSettingsArray() {
	$settingsSection.each(function (index, element) {
		var section = new SettingsSection($(this));
		settingsArray.push(section);
	});
}

function checkIfElementExist($element) {
	if (typeof ($element) != 'undefined' && $element != null && $element.length > 0) {
		return true;
	}

	return false;
}

function isEven(n) {
	return n % 2 == 0;
}

function initAnimEl() {
	$parallaxBlock = $('.parallaxBlock');

	if ($parallaxBlock.length) {
		$parallaxBlock.each((index, item) => {
			var offset = $(item).data('offset')

			gsap.to(item, {
				yPercent: offset,
				ease: "none",
				duration: 1,
				scrollTrigger: {
					trigger: $(item),
					scroller: $scrollerProxyWDiv,
					scrub: true,
				},
			});
		})
	}

	$fadeEl = $('.fadeEl')

	if ($fadeEl.length) {

		gsap.set($fadeEl, {
			opacity: 0,
			y: 50
		})

		ScrollTrigger.batch(".fadeEl", {
			start: `top 65%`,
			scroller: $scrollerProxyWDiv,
			onEnter: (elements, triggers) => {
				gsap.to(elements, {
					opacity: 1,
					y: 0,
					stagger: .15
				});
			}
		});
	}

	$drawEl = $('.drawEl');

	gsap.set($drawEl, {
		scaleX: 0,
		transformOrigin: '0 0'
	});

	if ($drawEl.length) {
		ScrollTrigger.batch($drawEl, {
			start: `top 65%`,
			scroller: $scrollerProxyWDiv,
			onEnter: (elements, triggers) => {
				gsap.to(elements, {
					scaleX: 1,
					duration: 1
				});
			}
		});
	}

	$animTitleEl = $('.animTitleEl');
	$animDescrEl = $('.animDescrEl');

	if (checkIfElementExist($animTitleEl) || checkIfElementExist($animDescrEl)) {
		let splittedTitle = new SplitText($animTitleEl, { type: "lines", linesClass: 'split_title' });
		new SplitText($animTitleEl, { type: "lines", linesClass: 'split_title_wrap' });

		gsap.set([splittedTitle.lines, $animDescrEl], {
			yPercent: 100
		})

		ScrollTrigger.batch([splittedTitle.lines, $animDescrEl], {
			start: `top 65%`,
			scroller: $scrollerProxyWDiv,
			onEnter: (elements, triggers) => {
				gsap.to(elements, {
					yPercent: 0,
					duration: 1,
					stagger: .06,
					ease: "power4.out"
				});
			}
		});
	}
}



function fillPopup(currentItem) {
	$('.map_facility_img').attr("src", "i/Microsite_pic/designs_v2/" + currentItem.img);

	$('.map_facility_title').text(currentItem.title)
	$('.map_facility_descr').text(currentItem.text)
	if (currentItem.link) {
		$('.facilityBtn').text(currentItem.link)
	}
	if (currentItem.url) {
		$('.facilityBtn').attr('href', currentItem.url)
	}
	popupIcons(currentItem.content)
}

function popupIcons(arr) {
	$('.map_facility_list').html('')
	$.each(arr, function (index, item) {
		$('.map_facility_list').append(`<li class="map_facility_list_item">
				<div class="map_facility_block">
					<div class="map_facility_block_w_icon">
						<img class="map_facility_block_img" src='https://visiontoreality.theredsea.sa/sub_domain_pages/i/icons/${item.icon}.svg'/>
					</div>
					<div class="map_facility_block_w_title">
					<span class="map_facility_block_title">${item.title}</span></div>
				</div>
			</li>`)
	})
}

function onloadOpenPopup() {
	if (windowWidth > mediaPoint1) {
		let currentItem = markers.find(item => {
			return item.active == true
		})

		if (currentItem) {
			fillPopup(currentItem)
			$('.map_facility').addClass('active_mod');
		}
	}
}

function SettingsSection(section) {
	this.section = section;
	this.num = section.attr('data-num');
	this.offsetTop = section.offset().top - 30;

	// update values
	this.update = function () {
		this.offsetTop = section.offset().top - 30;
	};

}

function settingsTrigger(position, version) {
	if (!settingsClick) {
		if (settingsArray.length) {
			settingsArray.forEach(function (item) {
				if (position > (item.offsetTop - 80)) {
					$mainNavLink.removeClass('active_mod');
					$('.main_menu_link[href="#section_' + item.num + '"]').addClass('active_mod');
				}
			});
		}
	}
}

function calcViewportHeight() {
	rem = (windowWidth * .5625 > windowHeight ? windowHeight / 1080 * 10 : windowWidth / 1920 * 10).toFixed(2);

	document.documentElement.style.setProperty('--rem', rem + 'px');

	if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
		var vh = window.innerHeight * 0.01;

		document.documentElement.style.setProperty('--vh', vh + 'px');
	}
}

function initCursorAnim() {
	const onMouseMove = e => {
		mouseCoord.x = e.clientX;
		mouseCoord.y = e.clientY;

		if ($cursor.length) {
			gsap.to($cursor, {
				opacity: 1,
				y: mouseCoord.y,
				x: mouseCoord.x - windowRtlOffset,
				duration: .1,
			});
		}
	};

	// document.addEventListener('mousemove', onMouseMove);

	$sectionDescr.on('mousemove', onMouseMove)
	$sectionDescr.on('mouseenter', function () {
		if ($(this).hasClass('active_state')) {
			$cursorHamburger.addClass('active_state')
		} else {
			$cursorHamburger.removeClass('active_state')
		}
	})
	$sectionDescr.on('mouseleave', function () {
		gsap.to($cursor, {
			opacity: 0
		})
	})
}

if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
			(image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

			image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
		});
	});
}

function throttle(callback, delay) {
	var timeoutHandler = null;
	return function () {
		if (timeoutHandler == null) {
			timeoutHandler = setTimeout(function () {
				callback();
				clearInterval(timeoutHandler);
				timeoutHandler = null;
			}, delay);
		}
	}
}

function debounce(callback, delay) {
	var timeoutHandler = null;
	return function () {
		clearTimeout(timeoutHandler);
		timeoutHandler = setTimeout(function () {
			callback();
		}, delay);
	}
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

var styles = ['color: #fff', 'background: #cf8e1f'].join(';');
var message = 'Developed by redsea';

console.info('%c%s', styles, message);


console.info('%c%s', styles, message);
function goToLink(page) {
	window.open(page, "_self");
}
function changeLanguage(from, to) {
	var href = window.location.href.replace(from, to);
	window.open(href, "_self");
}



// Alaa changes 26/11/2020 start

function AddVideoToDataLayer(src) {
	var videoSrc = src;
	var videoName = videoSrc.split("/").pop();
	var href = window.location.href;
	var pageName = href.split("/").pop();
	dataLayer.push({
		'PageName': pageName,
		'VideoName': videoName,
		'event': 'VideoPlay'
	});
}

// Alaa changes 26/11/2020 end

// //Subscription Form ajax

// $('.sendForm').on('click', function () {
    // subscribe();
// });

// function subscribe() {
    // //reviewScroll = false;
    // debugger
    // var isValid = true;
    // var fname = $("#subscribe_name").val();
    // var lname = $("#subscribe_last_name").val();
    // var email = $("#subscribe_mail").val();
    // var isagreed = $("#I_have_read_and_understood_the_Red_Sea_Development_Company").is(':checked');

    // if (fname) {
        // isValid = true;
        // SetControlInvalidMsg($("#subscribe_name"), true);
    // }
    // else {
        // isValid = false;
        // SetControlInvalidMsg($("#subscribe_name"), false);
    // }

    // if (lname) {
        // isValid = true;
        // SetControlInvalidMsg($("#subscribe_last_name"), true);
    // }
    // else {
        // isValid = false;
        // SetControlInvalidMsg($("#subscribe_last_name"), false);
    // }
    // var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // var validEmail = regex.test(email);
    // if (email && validEmail) {
        // isValid = true;
        // SetControlInvalidMsg($("#subscribe_mail"), true);
    // }
    // else {
        // isValid = false;
        // SetControlInvalidMsg($("#subscribe_mail"), false);
    // }
    // if (isagreed) {
        // isValid = true;
    // }
    // else {
        // isValid = false;
        // var errorMsg = "";
        // var language = $('html').attr('lang');
        // if (language=="ar") {
            // errorMsg = "يجب الموافقة على سياسة الخصوصية";
        // } else {
            // errorMsg = "Please accept the privacy policy";
        // }
        // //var errorMsg = $("#subscribe-form-privacy-policy").attr("data-errortext");
        // $(".error-text").html(errorMsg);
    // }

    // if (isValid) {       
        // var subscribeAPI = 'http://staging.theredsea.sa//api/Subscriber/AddNewsSubscription';
        // var emailtemplate = $('#tmplate').val();
        // var model = { FirstName: fname, LastName: lname, Email: email, EmailTemplate: emailtemplate };
        // $.ajax({
            // url: subscribeAPI,
            // dataType: 'JSON',
            // data: { model: model },
            // method: 'POST',
            // success: function (res) {
                // var message = unescape(res.Content);
                // var messageDisplay = "<h4 class='success-message'>" + message + "</h4>";
                // $(".form_success").html(messageDisplay);
            // },
            // error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log(errorThrown);
            // }
        // });
        // return;
    // }
// }


// function SetControlInvalidMsg(conrtol,isvalid) {
    // var errorMsg = $(conrtol).attr("data-errortext");
    // if (!isvalid) {
        // $(conrtol).addClass('invalid-contol');
        // $(conrtol).attr("placeholder", errorMsg);
    // } else {
        // $(conrtol).removeClass('invalid-contol');
    // } 

// }

// function InvalidMsg(textbox) {
    // var errorMsg = $(textbox).attr("data-errortext");
    // if (textbox.value === '') {
        // $(textbox).addClass('invalid-contol');
        // textbox.setCustomValidity('Required email address');
        // $(textbox).attr("placeholder", errorMsg);
    // } else if (textbox.validity.typeMismatch) {
        // $(textbox).addClass('invalid-contol');
        // textbox.setCustomValidity('please enter a valid email address');
    // } else {
        // $(textbox).removeClass('invalid-contol');
        // textbox.setCustomValidity('');
    // }

    // return true;
// }