const createHTMLMapMarker = ({
  OverlayView = google.maps.OverlayView,
  ...args
}) => {
  class HTMLMapMarker extends OverlayView {
    constructor() {
      super();
      this.latlng = args.latlng;
      this.html = args.html;
      this.setMap(args.map);
    }

    createDiv() {
      this.div = document.createElement("div");
      this.div.style.position = "absolute";
      if (this.html) {
        this.div.innerHTML = this.html;
      }
      google.maps.event.addDomListener(this.div, "click", event => {
        google.maps.event.trigger(this, "click");
      });
    }

    appendDivToOverlay() {
      const panes = this.getPanes();
      panes.overlayImage.appendChild(this.div);
    }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      let offset = 25;
      if (point) {
        this.div.style.left = `${point.x - 16}px`;
        this.div.style.top = `${point.y - 50}px`;
      }
    }

    draw() {
      if (!this.div) {
        this.createDiv();
        this.appendDivToOverlay();
      }
      this.positionDiv();
    }

    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    }

    getPosition() {
      return this.latlng;
    }

    getDraggable() {
      return false;
    }
  }

  return new HTMLMapMarker();
};;function heroSliderInit() {
	$('.hero_slider_item', $heroSlider).each(function() {
		let $this = $(this);
		let $title = $('.heroSliderItemTitle', $this);
		let $subTitle = $('.heroSliderItemSubTitle', $this);

		let splittedTitle = new SplitText($title, {type: "lines", linesClass: 'split_title'});
		new SplitText($title, {type: "lines", linesClass: 'split_title_wrap'});


		let slideData = {
			'el': $this,
			'elTitle': splittedTitle,
			'elSubTitle': $subTitle,
			'elDecor': $('.hero_slider_decor', $this),
			'elImage': $('.hero_slider_w_img', $this),
			'elContentW': $('.hero_slider_content', $this),
			'elContents': $('.heroSliderContent', $this),
		};

		heroSlidesArray.push(slideData);
	});

	$heroSlider.on('init', (event, slick, currentSlide) => {
		gsap.set(heroSlidesArray[0].elImage, {
			xPercent: -100
		});
		gsap.set(heroSlidesArray[0].elContentW, {
			opacity: 1
		});
	});

	$heroSlider.slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		speed: 0,
		arrows: false,
		touchMove: false,
		waitForAnimate: false,
		accessibility: false,
		rtl: isRtl
	});
	
	// $('.test_button.prev_mod').click(function () {
	// 	if(!isHeroAnimDone) {

	// 		if (currentHeroSlideIndex === 0) {
	// 			$heroSlider.slick('slickGoTo', heroSlidesArray.length-1);
	// 		} else {
	// 			$heroSlider.slick("slickPrev");
	// 		}

	// 	}
	// });

	// $('.test_button.next_mod').click(function () {
	// 	if(!isHeroAnimDone) {

	// 		if (currentHeroSlideIndex === heroSlidesArray.length-1) {
	// 			$heroSlider.slick('slickGoTo', 0);
	// 		} else {
	// 			$heroSlider.slick('slickNext');
	// 		}

	// 	}
	// });

	$heroSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (currentSlide !== nextSlide) {
			heroSliderAnim(currentSlide, nextSlide);
		}
	});

}

function heroSliderAnim(currentSlide, nextSlide) {

	const createTitlesAnim = (indexSlide, direction) => {
		const subTl = gsap.timeline();
		let fromYvalue;
		let toYvalue;

		if (direction === 'leave') {
			fromYvalue = 0;
			toYvalue = 100;
		} else {
			fromYvalue = 100;
			toYvalue = 0;
		}

		subTl
			.fromTo([heroSlidesArray[indexSlide].elTitle.lines, heroSlidesArray[indexSlide].elSubTitle], {
				yPercent: fromYvalue
			}, {
				yPercent: toYvalue,
				duration: .7,
				stagger: .06,
				ease: "power4.out"
			})

		return subTl;
	};

	const createAllContentsAnim = (indexSlide, direction) => {
		const subTl = gsap.timeline();

		let fromOpacityValue = direction === 'leave' ? 1 : 0;
		let toOpacityValue = direction === 'leave' ? 0 : 1;

		subTl
			.fromTo(heroSlidesArray[indexSlide].elContents, {
				opacity: fromOpacityValue
			}, {
				opacity: toOpacityValue,
				duration: .4,
			})

		return subTl;
	};

	const tlSlide = gsap.timeline({
		onComplete: () => {
			currentHeroSlideIndex = nextSlide;
		}
	});
	
	if (currentSlide < nextSlide) {
		tlSlide
			.addLabel('slide')
			.fromTo([heroSlidesArray[currentSlide].elImage, heroSlidesArray[nextSlide].elImage], {
				xPercent: gsap.utils.wrap([-100, 0]),
			}, {
				xPercent: gsap.utils.wrap([-200, -100]),
				duration: .8,
				ease: "power4.inOut"
			})
			.add(createTitlesAnim(currentSlide, 'leave'), 'slide')
			.add(createAllContentsAnim(currentSlide, 'leave'), 'slide')
			.set(heroSlidesArray[nextSlide].elContentW, {opacity: 1}, '-=.2')
			.addLabel('next_slide', '-=.2')
			.add(createAllContentsAnim(nextSlide), 'next_slide')
			.add(createTitlesAnim(nextSlide), 'next_slide')

	} else {
		tlSlide
			.addLabel('slide')
			.fromTo([heroSlidesArray[currentSlide].elImage, heroSlidesArray[nextSlide].elImage], {
				xPercent: gsap.utils.wrap([-100, -200]),
			}, {
				xPercent: gsap.utils.wrap([0, -100]),
				duration: .8,
				ease: "power4.inOut"
			})
			.add(createTitlesAnim(currentSlide, 'leave'), 'slide')
			.add(createAllContentsAnim(currentSlide, 'leave'), 'slide')
			.set(heroSlidesArray[nextSlide].elContentW, {opacity: 1}, '-=.2')
			.addLabel('next_slide', '-=.2')
			.add(createAllContentsAnim(nextSlide), 'next_slide')
			.add(createTitlesAnim(nextSlide), 'next_slide')
	}

};
var markersEn = [
	{
		id: 1,
		active: true,
		type: 'airport',
		lat: 25.6256908308,
		lng: 37.0869142921,
		title: 'Airport',
		img: 'Airport.jpg',
		text: 'The airport, due for completion in 2022, will serve an estimated one million tourists per year by 2030 with a schedule of domestic and international flights, and a peak capacity of 900 passengers per hour.',
		content: [
			{
				icon: 'luggage',
				title: 'Smart Luggage',
			},
			{
				icon: 'duty-free',
				title: 'Duty Free',
			},
			{
				icon: 'brands',
				title: 'International Brands',
			},
			{
				icon: 'wifi',
				title: 'Free WIFI',
			}
		],
		link: 'custom read more',
		url: 'https://www.google.com/'
	},
	{
		id: 2,
		type: 'beach',
		lat: 25.5026149584,
		lng: 36.9591716292,
		title: 'Shurayrah',
		img: 'Shurayrah.jpg',
		text: 'Dolphin-shaped Shurayrah Island is our hub and will contain 11 world-class hotels designed by award-winning architects Foster + Partners.',
		content: [
			{
				icon: 'luggage',
				title: '11 hotels',
			},
			{
				icon: 'duty-free',
				title: 'Architect Foster + Partner',
			},
			{
				icon: 'brands',
				title: 'Completion 2023',
			},
			{
				icon: 'wifi',
				title: 'Rooms 2,480',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 3,
		type: 'beach',
		lat: 25.3623154283,
		lng: 36.9076187384,
		title: 'Sheybarah',
		img: 'Sheybarah.jpg',
		text: 'Sheybarah Island will feature signature overwater assets designed by Dubai-based Killa Architectural Design (KAD).',
		content: [
			{
				icon: 'luggage',
				title: '1 hotel',
			},
			{
				icon: 'duty-free',
				title: 'Architect Killa Architectural Design (KAD)',
			},
			{
				icon: 'brands',
				title: 'Completion 2022',
			},
			{
				icon: 'luggage',
				title: 'Rooms 73',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 4,
		type: 'beach',
		lat: 25.545237559,
		lng: 36.7458874735,
		title: 'Ummahat Alshaykh',
		img: 'Ummahat Alsheykh.jpg',
		text: 'Hotel 11 on Ummahat AlShaykh Island is designed by Japanese architect Kengo Kuma',
		content: [
			{
				icon: 'luggage',
				title: '1 hotel',
			},
			{
				icon: 'duty-free',
				title: 'Architect Kengo Kuma',
			},
			{
				icon: 'brands',
				title: 'Completion 2022',
			},
			{
				icon: 'wifi',
				title: 'Rooms 90',
			}
		],
		link: 'Read more',
		url: '#'
	},
/*	{
		id: 5,
		type: 'beach',
		lat: 25.5293292149,
		lng: 36.7523635389,
		title: 'Ummahat Alshaykh 2',
		text: '',
		content: [],
		link: 'Read more',
		url: '#'
	},
	{
		id: 6,
		type: 'beach',
		lat: 25.5296726277,
		lng: 36.7722996268,
		title: 'Ummahat Alshaykh 3',
		text: '',
		content: [],
		link: 'Read more',
		url: '#'
	},*/
	{
		id: 7,
		type: 'beach',
		lat: 25.3773184526,
		lng: 37.3279244997,
		title: 'Southern Dunes',
		img: 'Southern Dunes.jpg',
		text: 'Designed by Foster + Partners, our Southern Dunes hotel is one of two inland locations at The Red Sea',
		content: [
			{
				icon: 'luggage',
				title: '1 hotel',
			},
			{
				icon: 'duty-free',
				title: 'Architect Foster + Partner',
			},
			{
				icon: 'brands',
				title: 'Completion 2022',
			},
			{
				icon: 'wifi',
				title: 'Rooms 80',
			}
		],
		link: 'Read more',
		url: '#'
	},
/*	{
		id: 8,
		type: 'airport',
		lat: 22222,
		lng: 33333,
		title: 'Desert Rock',
		text: '',
		content: [],
		link: 'Read more',
		url: '#'
	}, */
	{
		id: 9,
		type: 'beach',
		lat: 25.4985777764,
		lng: 37.0063731218,
		title: 'Coastal Village',
		img: 'Coastal Village__2.jpg',
		text: 'Our Coastal Village will comprise staff residence buildings, a management office, villas & townhouses and a hotel. ',
		content: [
			{
				icon: 'luggage',
				title: '1 hotel',
			},
			{
				icon: 'duty-free',
				title: 'Architects Arcadis & Al Majal Al Arabi',
			},
			{
				icon: 'brands',
				title: 'Completion 2021',
			},
			{
				icon: 'wifi',
				title: '14,000 units',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 10,
		type: 'beach',
		lat: 25.5148997147,
		lng: 37.0576345176,
		title: 'Construction Village',
		img: 'constructions village.JPG',
		text: 'Our Construction Village will be home to 10,000 construction workers, cricket pitches, gyms, cinemas and more.',
		content: [
			{
				icon: 'duty-free',
				title: 'Architects Al Majal Al Arabi & ARCCO Speedhouse JV ',
			},
			{
				icon: 'brands',
				title: 'Completion 2020',
			},
			{
				icon: 'wifi',
				title: '10,0000 units',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 11,
		type: 'beach',
		lat: 25.4349723077,
		lng: 37.1842630172,
		title: 'Base camp',
		img: 'base camp.JPG',
		text: 'Completed in April 2019, our Base Camp houses around 150 people who live and work on site. The Camp includes prayer, dining, gym, and other amenities.',
		content: [
			{
				icon: 'luggage',
				title: 'On-site emergency medical facility',
			}, 
			{
				icon: 'brands',
				title: 'Completion 2019',
			},
			{
				icon: 'wifi',
				title: '150 units',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 12,
		type: 'beach',
		lat: 25.5335387805,
		lng: 37.0597568215,
		title: 'Nursery',
		img: 'nursery.jpg',
		text: 'Completed in January 2020, our 100-hectare nursery will provide up to 15 million plants for landscaping and more on The Red Sea Project',
		content: [
			{
				icon: 'luggage',
				title: '100 hecatres',
			},
			{
				icon: 'duty-free',
				title: 'Design by Nesma',
			},
			{
				icon: 'brands',
				title: 'Completion 2020',
			},
			{
				icon: 'wifi',
				title: '15 million plants',
			}
		],
		link: 'Read more',
		url: '#'
	}
]

var markersArabic = [
	{
		id: 1,
		active: true,
		type: 'airport',
		lat: 25.6256908308,
		lng: 37.0869142921,
		title: 'المطار',
		img: 'Airport.jpg',
		text: 'سيتم الانتهاء من تطوير المطار بحلول عام 2022، وسيقدم خدمات الملاحة الجوية لنحو مليون زائر سنوياً بحلول عام 2030 من خلال رحلات داخلية ودولية مجدولة، وطاقة استيعابية تصل إلى 900 مسافر في الساعة.',
		content: [
			{
				icon: 'luggage',
				title: 'الحقائب الذكية',
			},
			{
				icon: 'duty-free',
				title: 'السوق الحرة',
			},
			{
				icon: 'brands',
				title: 'الماركات العالمية',
			},
			{
				icon: 'wifi',
				title: 'واي فاي مجاني',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 2,
		type: 'beach',
		lat: 25.5026149584,
		lng: 36.9591716292,
		title: 'شُريرة',
		img: 'Shurayrah.jpg',
		text: 'هي الجزيرة الرئيسية والتي تشبه في رسمها شكل الدلفين، وستحتضن 11 فندقاً عالمياً فاخراً يتم تصميمها بواسطة شركائنا (فوستر أند بارتنرز) ',
		content: [
			{
				icon: 'luggage',
				title: '11 فندق',
			},
			{
				icon: 'duty-free',
				title: 'فوستر أند بارتنرز',
			},
			{
				icon: 'brands',
				title: 'التسليم في عام 2030',
			},
			{
				icon: 'wifi',
				title: '2,480 غرفة فندقية',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 3,
		type: 'beach',
		lat: 25.3623154283,
		lng: 36.9076187384,
		title: 'شيبارة',
		img: 'Sheybarah.jpg',
		text: 'ستحتضن جزيرة شيبارة فللاً فندقيةً عائمة تم تصميمها من قبل شركائنا (كيلا للتصميم المعماري).', 
		content: [
			{
				icon: 'luggage',
				title: 'فندق فاخر',
			},
			{
				icon: 'duty-free',
				title: 'كيلا للتصميم المعماري',
			},
			{
				icon: 'brands',
				title: 'التسليم في عام 2022',
			},
			{
				icon: 'luggage',
				title: 'غرفة فندقية 73',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 4,
		type: 'beach',
		lat: 25.545237559,
		lng: 36.7458874735,
		title: 'أمهات الشيخ',
		img: 'Ummahat Alsheykh.jpg',
		text: 'ستشمل جزيرة أمهات الشيخ فندقاً فخماً تم تصميمه من قبل شركائنا (كينغو كوما)',
		content: [
			{
				icon: 'luggage',
				title: 'فندق فاخر',
			},
			{
				icon: 'duty-free',
				title: 'كينغو كوما',
			},
			{
				icon: 'brands',
				title: 'التسليم في عام 2022',
			},
			{
				icon: 'wifi',
				title: 'غرفة فاخرة 90',
			}
		],
		link: 'Read more',
		url: '#'
	},
/*	{
		id: 5,
		type: 'beach',
		lat: 25.5293292149,
		lng: 36.7523635389,
		title: 'Ummahat Alshaykh 2',
		text: '',
		content: [],
		link: 'Read more',
		url: '#'
	},
	{
		id: 6,
		type: 'beach',
		lat: 25.5296726277,
		lng: 36.7722996268,
		title: 'Ummahat Alshaykh 3',
		text: '',
		content: [],
		link: 'Read more',
		url: '#'
	}, */
	{
		id: 7,
		type: 'beach',
		lat: 25.3773184526,
		lng: 37.3279244997,
		title: 'المنتجع الصحراوي',
		img: 'Southern Dunes.jpg',
		text: 'تم تصميم المنتجع الصحراوي من قبل شركائنا (فوستر أند بارتنرز) ويعتبر أحد منتجعي البر الرئيس لمشروع البحر الأحمر',
		content: [
			{
				icon: 'luggage',
				title: 'فندق فاخر',
			},
			{
				icon: 'duty-free',
				title: 'فوستر أند بارتنرز',
			},
			{
				icon: 'brands',
				title: 'التسليم في عام 2022',
			},
			{
				icon: 'wifi',
				title: 'غرفة فاخرة 80',
			}
		],
		link: 'Read more',
		url: '#'
	},
/*	{
		id: 8,
		type: 'arabic airport',
		lat: 22222,
		lng: 33333,
		title: 'Desert Rock',
		text: '',
		content: [],
		link: 'Read more',
		url: '#'
	}, */
	{
		id: 9,
		type: 'beach',
		lat: 25.4985777764,
		lng: 37.0063731218,
		title: 'مدينة الموظفين',
		img: 'Coastal Village__2.jpg',
		text: 'ستضم مدينة الموظفين مناطق ووحدات سكنية، بالإضافة إلى مكاتب إدارية، وفندق للضيوف الرسميين.',
		content: [
			{
				icon: 'luggage',
				title: 'فندق فاخر',
			},
			{
				icon: 'duty-free',
				title: 'شركة مجموعة المجال العربي القابضة',
			},
			{
				icon: 'brands',
				title: 'التسليم في عام 2021',
			},
			{
				icon: 'wifi',
				title: '14,000 وحدة',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 10,
		type: 'beach',
		lat: 25.5148997147,
		lng: 37.0576345176,
		title: 'مدينة العمال',
		img: 'constructions village.JPG',
		text: 'ستستضيف مدينة العمال نحو 10000 عامل بناء، وستوفر مرافق رياضية وترفيهية منها ملعب كركيت، وأندية رياضية، وسينما وغيرها.',
		content: [
			{
				icon: 'duty-free',
				title: 'شركة مجموعة المجال العربي القابضة وشركة أركيدز وشركة أركو للبيوت الجاهزة',
			},
			{
				icon: 'brands',
				title: 'التسليم في عام 2020',
			},
			{
				icon: 'wifi',
				title: '10,0000 وحدة سكنية',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 11,
		type: 'beach',
		lat: 25.4349723077,
		lng: 37.1842630172,
		title: 'سكن الموظفين',
		img: 'base camp.JPG',
		text: 'تم تسليم سكن الموظفين في  أبريل عام 2019، ويستضيف قرابة 150 موظف للعمل والمعيشة في موقع المشروع. ويضم السكن مرافق سكنية وترفيهية، ومسجد بالإضافة إلى المرافق الأخرى.',
		content: [
			{
				icon: 'luggage',
				title: 'مرفق طبي للطوارئ في موقع المشروع',
			}, 
			{
				icon: 'brands',
				title: 'اكتمل في عام 2019',
			},
			{
				icon: 'wifi',
				title: '150 وحدة',
			}
		],
		link: 'Read more',
		url: '#'
	},
	{
		id: 12,
		type: 'beach',
		lat: 25.5335387805,
		lng: 37.0597568215,
		title: 'المشتل الزراعي',
		img: 'nursery.jpg',
		text: 'تم تسليم المشتل الزراعي في يناير عام 2020، وسيزود المشتل الذي تبلغ مساحته حوالي 100 هكتار المشروع بحوالي 15 مليون شتلة لزراعتها في أنحاء الوجهة.',
		content: [
			{
				icon: 'luggage',
				title: '100 هكتار',
			},
			{
				icon: 'duty-free',
				title: 'تم تصميمه بواسطة شركة نسما',
			},
			{
				icon: 'brands',
				title: 'تم التسليم في يناير 2020',
			},
			{
				icon: 'wifi',
				title: '15 مليون شتلة',
			}
		],
		link: 'Read more',
		url: '#'
	}
];var feedArabic = [
	{
		name: 'TheRedSeaSA',
		img: 'i/feed/feed_1.jpg',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaSA/status/1315588643919220737?s=20',
		text: `إيان ويليامسون: "قطع العمل في مدينة موظفي #مشروع_البحر_الأحمر أشواطاً كبيرة. فبعد انتهائنا من مرحلة التصميم، بدأنا في شراء واختيار الموارد المناسبة مما أشعل المنافسة في القطاع. فهل سيقع الاختيار على حلول التصنيع خارج منطقة المشروع أم الحلول مسبقة الصب وكذلك المصبوبة في الموقع".`
	},
	{
		name: 'TheRedSeaSA',
		img: 'i/feed/feed_2.jpg',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaSA/status/1314822983593197568?s=20',
		text: `تستضيف سواحل البحر الأحمر طائر مرزة البطائح الغربية (الصقر الحقبي) المهاجرة خلال فصل الخريف من أوروبا وغرب روسيا إلى إفريقيا.	#اليوم_العالمي_للطيور_المهاجرة`
	},
	{
		name: 'TheRedSeaSA',
		img: 'i/feed/feed_7.jpg',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaSA/status/1311606318164324359?s=20',
		text: `نعمل على تطوير قرية سكنية عمالية متكاملة لاستضافة أول ١٠ آلاف عامل في #مشروع_البحر_الأحمر ستوفر السبل التي تضمن بيئة صحية ومحفزة للعاملين في المشروع.`
	},
	{
		name: 'TheRedSeaSA',
		video: 'i/feed/feed_5.mp4',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaSA/status/1313457647279132677?s=20',
		text: `أحدث التطورات في #مشروع_البحر_الأحمر من خلال كاميرات التايم لابس تظهر شاحنات شركة أركيرودون - أحد شركاءنا - المحملة بالصخور في جزيرة شُريرة. وحتى هذا اليوم تم تسليم ٩٥٠ ألف طن من الصخور للعمل على الجسر والبنية التحتية البحرية.`
	},
	{
		name: 'TheRedSeaSA',
		img: 'i/feed/feed_3.jpg',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaSA/status/1314211215636275204?s=20',
		text: `باغانو: " نسعد بالتعاون مع إحدى أعرق الجامعات على مستوى المملكة والشرق الأوسط. حيث تشكل مذكرة التفاهم هذه خطوةً مهمة نحو تعزيز ودعم الجوانب العلمية والمهنية لشركتنا وللجامعة أيضاً، بالإضافة لتبادل الخبرات والذي سيخدم بدوره أهدافنا المشتركة". للمزيد: http://ms.spr.ly/6016TxpEs`
	},
	{
		name: 'TheRedSeaSA',
		img: 'i/feed/feed_1.jpg',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaSA/status/1305491414474727430?s=20',
		text: `#مشروع_البحر_الأحمر؛ وجهة سياحية استثنائية ستمكن الزوار من الانغماس في الطبيعية والاستمتاع بمياه البحر الفيروزية عند افتتاح المرحلة الأولى نهاية عام 2022  (📸 : @mohamed_5575)`
	}
]

var feedEn = [
	{
		name: 'TheRedSeaGlobal',
		img: 'https://visiontoreality.theredsea.sa/sub_domain_pages/i/feed/feed_1.jpg',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaGlobal/status/1315587759944404992?s=20',
		text: `"With designs complete at Coastal Village, we're now heavily into procurement which is creating a buzz in the industry. It''ll be interesting to see whether off-site manufacturing wins over pre-cast solutions and in situ," said our Chief Projects Delivery Officer Ian Williamson`
	},
	{
		name: 'TheRedSeaGlobal',
		img: 'https://visiontoreality.theredsea.sa/sub_domain_pages/i/feed/feed_2.jpg',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaGlobal/status/1314207890568220678?s=20',
		text: `#Didyouknow the marsh harrier is a bird of prey that migrates from Europe and West Russia to Africa following different routes. One of these flyways passes by #TheRedSea coast, where a wide range of birds can be spotted during the autumn migration. #WorldMigratoryBirdDay`
	},
	{
		name: 'TheRedSeaGlobal',
		img: 'https://visiontoreality.theredsea.sa/sub_domain_pages/i/feed/feed_3.jpg',
		icon: 'twitter',
		url: 'https://twitter.com/TheRedSeaGlobal/status/1314893856283004928?s=20',
		text: `“Engaging the promising young people of #SaudiArabia through initiatives like this is an important part of our vision as a company,” said our CEO Pagano Read more here: http://ms.spr.ly/6013TxTCX`
	},
	{
		name: 'theredseadevelopmentcompany',
		img: 'https://visiontoreality.theredsea.sa/sub_domain_pages/i/feed/feed_4.jpg',
		icon: 'instagram',
		url: 'https://www.instagram.com/p/CGE_sT3F1x7/',
		text: `We're pleased to announce that we have signed an MoU with King Abdulaziz University to exchange knowledge and expertise for the benefit of TRSDC employees and KAU students and graduates.`
	},
	{
		name: 'theredseadevelopmentcompany',
		video: 'https://visiontoreality.theredsea.sa/sub_domain_pages/i/feed/feed_5.mp4',
		icon: 'instagram',
		url: 'https://www.instagram.com/p/CGAKPgJph4v/',
		text: `Check out this time-lapse video of trucks carrying rocks along our Shurayrah Island Causeway by our partner Archirodon. To date they’ve delivered 950,000 tons of rock for Shurayrah Bridge and marine jetties.`
	},
	{
		name: 'theredseadevelopmentcompany',
		video: 'https://visiontoreality.theredsea.sa/sub_domain_pages/i/feed/feed_6.mp4',
		icon: 'instagram',
		url: 'https://www.instagram.com/p/CFokJxeJU7s/',
		text: `At #TheRedSea Project in #SaudiArabia, we are driven by our passion for sustainable development and, despite the challenges of this year, we are working hard to develop a regenerative destination that is underpinned by luxury, sustainability and care. Happy #WorldTourismDay #WTD`
	}
]




function initFeed() {

	feedData.map((item, index) => {
		var sliderItem = `<div class="feed_slider_item">
			<div class="feed_slider_img_wrap">
				${
					item.img ? `<img class="feed_slider_img" src='${item.img}' alt="image" />` :''
				}
				${
					item.video ? `<video class="feed_slider_img" playsinline="" controls><source src='${item.video}' type="video/mp4"></video>` :''
				}
			</div>
			<div class="feed_slider_content">
				<div class="feed_slider_head">
					<a class="feed_slider_link" href='${item.url}'>
						<div class="feed_slider_account">${item.name}</div>
						<div class="feed_slider_icon">
							${
								item.icon == 'instagram' ? '<svg class="icon size_mod" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.81 19.81" id="instagram"><path d="M18.16 16.51a1.65 1.65 0 01-1.65 1.65H3.3a1.65 1.65 0 01-1.65-1.65V3.3A1.65 1.65 0 013.3 1.65h13.21a1.65 1.65 0 011.65 1.65zM16.51 0H3.3A3.3 3.3 0 000 3.3v13.21a3.3 3.3 0 003.3 3.3h13.21a3.3 3.3 0 003.3-3.3V3.3a3.3 3.3 0 00-3.3-3.3z"></path><path d="M9.9 13.21a3.31 3.31 0 113.31-3.31 3.31 3.31 0 01-3.31 3.31zM9.9 5a5 5 0 105 5 5 5 0 00-5-5zm4.1-.46a1.24 1.24 0 012.48 0 1.24 1.24 0 11-2.48 0z"></path></svg>' : ''
							}
							${
								item.icon == 'twitter' ? '<svg class="icon size_mod" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.4 19.81" id="twitter"><path d="M21.89 4.94v.65A14.12 14.12 0 017.68 19.81 14.13 14.13 0 010 17.57a9.61 9.61 0 001.21.06 10 10 0 006.2-2.13A5 5 0 012.74 12a7.3 7.3 0 00.94.08A5.75 5.75 0 005 11.94 5 5 0 011 7a5.06 5.06 0 002.26.63A5 5 0 011.7.91 14.19 14.19 0 0012 6.14 5.45 5.45 0 0111.89 5a5 5 0 018.65-3.42A9.83 9.83 0 0023.72.37a5 5 0 01-2.2 2.76 10.34 10.34 0 002.88-.78 11 11 0 01-2.51 2.59z"></path></svg>' : ''
							}
						</div>
					</a>
				</div>
				<div class="feed_slider_text">${item.text}</div>
			</div>
		</div>`

		var previewItem = `<a class="feed_item fadeEl" href="#">
			<div class="feed_img_wrap">
				${
					item.img ? `<img class="feed_img" src='${item.img}' alt="image" />` :''
				}
				${
					item.video ? `<video class="feed_img" playsinline=""  muted=""><source src='${item.video}' type="video/mp4"></video>` :''
				}
			</div>
			<div class="feed_content">
				<div class="feed_head">
					<div class="feed_icon">
						${
							item.icon == 'instagram' ? '<svg class="icon size_mod" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.81 19.81" id="instagram"><path d="M18.16 16.51a1.65 1.65 0 01-1.65 1.65H3.3a1.65 1.65 0 01-1.65-1.65V3.3A1.65 1.65 0 013.3 1.65h13.21a1.65 1.65 0 011.65 1.65zM16.51 0H3.3A3.3 3.3 0 000 3.3v13.21a3.3 3.3 0 003.3 3.3h13.21a3.3 3.3 0 003.3-3.3V3.3a3.3 3.3 0 00-3.3-3.3z"></path><path d="M9.9 13.21a3.31 3.31 0 113.31-3.31 3.31 3.31 0 01-3.31 3.31zM9.9 5a5 5 0 105 5 5 5 0 00-5-5zm4.1-.46a1.24 1.24 0 012.48 0 1.24 1.24 0 11-2.48 0z"></path></svg>' : ''
						}
						${
							item.icon == 'twitter' ? '<svg class="icon size_mod" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.4 19.81" id="twitter"><path d="M21.89 4.94v.65A14.12 14.12 0 017.68 19.81 14.13 14.13 0 010 17.57a9.61 9.61 0 001.21.06 10 10 0 006.2-2.13A5 5 0 012.74 12a7.3 7.3 0 00.94.08A5.75 5.75 0 005 11.94 5 5 0 011 7a5.06 5.06 0 002.26.63A5 5 0 011.7.91 14.19 14.19 0 0012 6.14 5.45 5.45 0 0111.89 5a5 5 0 018.65-3.42A9.83 9.83 0 0023.72.37a5 5 0 01-2.2 2.76 10.34 10.34 0 002.88-.78 11 11 0 01-2.51 2.59z"></path></svg>' : ''
						}
					</div>
						${
							item.video ? '<div class="feed_controls"><div class="feed_control_item playFeedVideo"><svg class="icon icon-play size_mod"><use xlink:href="i/sprite/sprite.svg#play"></use></svg></div><div class="feed_control_item muteFeedVideo"><svg class="icon icon-audio size_mod"><use xlink:href="i/sprite/sprite.svg#audio"></use></svg></div></div>' : ''
						}
				</div>
				<div class="feed_text">${item.text}</div>
			</div>
		</a>`

		$('.feed_slider').append(sliderItem)
		$('.feed_list').append(previewItem)
	})
}


