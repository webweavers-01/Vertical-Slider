(function($, window, document, undefined) {
    'use strict';

    $('body').fitVids({
        ignore: '.vimeo-video, .youtube-simple-wrap iframe, .iframe-video.for-btn iframe, .post-media.video-container iframe'
    });

    /*=================================*/
    /* 01 - VARIABLES */
    /*=================================*/
    var swipers = [],
        swipers3 = [],
        winW, winH, winScr, _isresponsive, smPoint = 768,
        mdPoint = 992,
        lgPoint = 1200,
        addPoint = 1600,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
        pageCalculateHeight;

    var countLoader = 1;
    var preloaderSvgVar;

    function preloaderSvg() {
        if ($('.loader__svg pattern').length) {
            $('.loader__svg text').attr('fill', 'url(#pattern' + countLoader + ')');
            countLoader = countLoader < $('.loader__svg pattern').length ? countLoader + 1 : 1;
        }
    }

    function stopPreloader() {
        $('.preloader-svg').fadeOut(300);
        clearInterval(preloaderSvgVar);
    }

    $(document).ready(function() {
        if ($('.loader__svg pattern').length) {
            preloaderSvgVar = setInterval(
                function() {
                    preloaderSvg();
                }, 200);
        }
    });

    $(window).on('load', function() {
        if ($('.loader__svg').length) {
            setTimeout(stopPreloader, 900);
        }
    });


    /*=================================*/
    /* PAGE LOADING TRANSITION */
    /*=================================*/

    if ($(".animsition").length) {
        $(".animsition").animsition({
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 2000,
            outDuration: 800,
            loading: true,
            loadingParentElement: 'body', //animsition wrapper element
            loadingClass: 'animsition-loading',
            unSupportCss: ['animation-duration',
                '-webkit-animation-duration',
                '-o-animation-duration'
            ],
            overlay: false,
            overlayClass: 'animsition-overlay-slide',
            overlayParentElement: 'body'
        });
    }

    /*=================================*/
    /* 02 - PAGE CALCULATIONS */
    /*=================================*/
    /**
     *
     * PageCalculations function
     * @since 1.0.0
     * @version 1.0.1
     * @var winW
     * @var winH
     * @var winS
     * @var pageCalculations
     * @var onEvent
     **/
    if (typeof pageCalculations !== 'function') {

        var winW, winH, winS, pageCalculations, onEvent = window.addEventListener;

        pageCalculations = function(func) {

            winW = window.innerWidth;
            winH = window.innerHeight;
            winS = document.body.scrollTop;

            if (!func) return;

            onEvent('load', func, true); // window onload
            onEvent('resize', func, true); // window resize
            onEvent("orientationchange", func, false); // window orientationchange

        } // end pageCalculations

        pageCalculations(function() {
            pageCalculations();
        });
    }

    function pageHeightCalculate() {
        if ($('.page-calculate.fullheight').length) {

            var pageCalculate = $('.page-calculate'),
                headerHeight = $('.header_top_bg').not('.header_trans-fixed').outerHeight() || 0,
                footerHeight = $('#footer').not('.fix-bottom').outerHeight() || 0;

            pageCalculate.height(winH - headerHeight - footerHeight);
            pageCalculateHeight = pageCalculate.height();
        }
    }

    function twitter_slider() {
        if ($('.twitter-slider').length) {
            $('.twitter-slider').each(function() {
                $(this).find('.twitter-wrapper').css('height', 'auto').equalHeights();
                var itemHeight = $(this).find('.twitter-wrapper').outerHeight();
                $(this).height(itemHeight);
            });
        }
    }

    pageCalculations(function() {

        pageHeightCalculate();
        blogSimpleHeightCalculate();
        if (!window.enable_foxlazy) {
            wpc_add_img_bg('.s-img-switch');
        }

        /* fix for splited slider */
        wpc_add_img_bg('.ms-section .s-img-switch');
        wpc_add_img_bg('.woocommerce .s-img-switch');

        $('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function() {
            var thisSwiper = swipers['swiper-' + $(this).attr('id')],
                $t = $(this),
                slidesPerViewVar = updateSlidesPerView($t),
                centerVar = thisSwiper.params.centeredSlides;
            thisSwiper.params.slidesPerView = slidesPerViewVar;
            thisSwiper.reInit();
            if (!centerVar) {
                var paginationSpan = $t.find('.pagination span');
                var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                else $t.removeClass('pagination-hidden');
                paginationSlice.show();
            }
        });
    });


    function submenuPosition() {
        if ($(window).width() > 991 && !$('body').hasClass('mob-main-menu') && $('header:not(.aside-menu).right-menu #topmenu ul .mega-menu > ul').length) {
            var topH = ($('header.right-menu').outerHeight() - $('#topmenu > ul.menu').outerHeight()) / 2 + $('#topmenu > ul.menu').outerHeight();
            $('header:not(.aside-menu).right-menu #topmenu ul .mega-menu > ul').css('top', topH);
        } else if ($(window).width() > 1024 && $('body').hasClass('mob-main-menu') && $('header:not(.aside-menu).right-menu #topmenu ul .mega-menu > ul').length) {
            var topH = ($('header.right-menu').outerHeight() - $('#topmenu > ul.menu').outerHeight()) / 2 + $('#topmenu > ul.menu').outerHeight();
            $('header:not(.aside-menu).right-menu #topmenu ul .mega-menu > ul').css('top', topH);
        }
    }

    if ($('.kenburns').length) {
        $('.kenburns').each(function() {
            var time = $(this).attr('data-time') ? $(this).attr('data-time') : 6000;
            $(this).kenBurning({
                time: time
            });

        });
    }

    if ($('.modern-slider-wrap').length) {
        $('.modern-slider').each(function() {
            var time = $(this).attr('data-time') ? $(this).attr('data-time') : 6000;
            $(this).kenBurning({
                time: time
            });
        });
    }

    function kenburnsHeight() {
        if ($('.kenburns-wrap').length) {
            $('.kenburns-wrap').each(function() {
                var headerH = $('.header_top_bg').not('.header_trans-fixed').outerHeight() || 0,
                    footerH = $('#footer').not('.fix-bottom').outerHeight() || 0,
                    sliderH = $(window).height() - (headerH + footerH),
                    bottomplay = $('#footer').hasClass('fix-bottom') ? ($('#footer').outerHeight() + 60) : '30';

                $(this).find('.kenburns-play').css('bottom', bottomplay + 'px');
                $(this).find('.whizz-sound-btn').css('bottom', bottomplay + 'px');

                $(this).css('height', sliderH + 'px');

                if ($(window).width() < 768 && _ismobile) {
                    $(this).find('.whizz-sound-btn').css('bottom', bottomplay - 50 + 'px');
                    $(this).find('.caption').css('bottom', bottomplay + 10 + 'px');
                } else {
                    $(this).find('.caption').css('bottom', bottomplay - 20 + 'px');
                    $(this).find('.whizz-sound-btn').css('bottom', bottomplay + 'px');
                }

            });
        }
    }


    /*=================================*/
    /* 03 - FUNCTION ON DOCUMENT READY */
    /*=================================*/
    $(window).ready(function() {
        if ($('.full_screen_slider.disable_scroll').length) {
            $('html, body').addClass('overflow-hidden');
        }
    });

    /*Full height banner*/
    function topBannerHeight() {
        var headerH = $('.header_top_bg').not('.header_trans-fixed, .fixed-header').outerHeight() || 0,
            footerH = $('#footer').not('.fix-bottom').outerHeight() || 0,
            bannerH = $(window).height() - (headerH + footerH);
        if ($('#wpadminbar').length) {
            var windowH = $(window).height() - 32;
        } else {
            var windowH = $(window).height();
        }

        var minHban = ($('.post-little-banner .main-top-content').height() + 100) > 300 ? ($('.post-little-banner .main-top-content').height() + 100) : '300px';

        $('.single-post .post-little-banner').css('min-height', minHban);


        $('.full-height-window').css('min-height', (windowH - headerH) + 'px');


        $('.full-height, .main-wrapper').css('min-height', bannerH + 'px');
        $('body').css('min-height', $(window).height());

        if ($('.top-banner.full-height-window .content').length) {
            var contentB = $('.top-banner.full-height-window .content').outerHeight();

            if ((windowH - headerH) > (contentB + 100)) {
                $('.top-banner.full-height-window .content').css('top', ((windowH - headerH) - contentB) / 2 + 'px');
            } else {
                $('.top-banner.full-height-window').css('height', contentB + 100);
                $('.top-banner.full-height-window .content').css('top', ((windowH - headerH) - contentB) / 2 + 'px');
            }
        }

        var contentC = $('.top-banner:not(.full-height-window) .content').height();
        var bannerC = $('.top-banner:not(.full-height-window)').height();

        $('.top-banner:not(.full-height-window) .content').css('top', (bannerC - contentC) / 2 + 40 + 'px');


        if ($(window).width() < 992) {
            $('.full-height-hard-small').css('height', 'auto');
            $('.full-height-hard-small2').css('height', bannerH);
        } else {
            $('.full-height-hard-small').css('height', bannerH - 60 + 'px');
            $('.full-height-hard-small2').css('height', bannerH - 40 + 'px');
        }

        $('.full-height-hard').css('height', bannerH + 'px');
        if ($('.iframe-video.banner-video').length) {

            $('.iframe-video.banner-video').css('height', bannerH + 'px');
            if ($('#footer.no-footer').length) {
                $('.iframe-video.banner-video .fluid-width-video-wrapper').css('height', bannerH + 'px');
                $('.iframe-video.banner-video ').css('height', bannerH + 'px');
            }
        }
    }



    /*=================================*/
    /* 04 - FUNCTION ON PAGE LOAD */
    /*=================================*/

    $(window).on('load', function() {
        submenuPosition();
        initFullScreenSwiper();
        initFlowSlider();

        if ($('.multiscroll-slider').length) {
            initMultiscroll();
            multiScrollControls();
        }
        initThumbFlexSlider();
        setTimeout(kenburnsHeight, 0);
        wpc_add_img_bg('.s-img-switch');
        load_more_portfolio();
        twitter_slider();
        if ($('#wpadminbar').length) {
            $('.header_trans-fixed.header_top_bg').css('top', '32px');
        }

    });

    document.addEventListener("touchstart", function() {}, true);

    /*=================================*/
    /* 06 - FUNCTION ON PAGE SCROLL */
    /*=================================*/
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 150) {
            if ($('.header_top_bg.header_trans-fixed').length) {
                $('.header_top_bg.header_trans-fixed').addClass('bg-fixed-color');
            }
        } else {
            if ($('.header_top_bg.header_trans-fixed').length) {
                $('.header_top_bg.header_trans-fixed').removeClass('bg-fixed-color');
            }
        }
    });


    /*=================================*/
    /* BACKGROUND */
    /*=================================*/
    //sets child image as a background
    function wpc_add_img_bg(img_sel, parent_sel) {
        if (!img_sel) {

            return false;
        }
        var $parent, $imgDataHidden, _this;
        $(img_sel).each(function() {
            _this = $(this);
            $imgDataHidden = _this.data('s-hidden');
            $parent = _this.closest(parent_sel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css('background-image', 'url(' + this.src + ')').addClass('s-back-switch');
            if ($imgDataHidden) {
                _this.css('visibility', 'hidden');
                _this.show();
            } else {
                _this.hide();
            }
        });
    }


    /*=================================*/
    /* SWIPER SLIDER */
    /*=================================*/

    function initSwiper() {

        var initIterator = 0;

        $('.swiper-container').each(function() {

            var $t = $(this);
            var index = 'swiper-unique-id-' + initIterator;
            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.pagination').addClass('pagination-' + index);
            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var slidesPerViewVar = $t.attr('data-slides-per-view');
            if (slidesPerViewVar == 'responsive') {
                slidesPerViewVar = updateSlidesPerView($t);
            } else slidesPerViewVar = parseInt(slidesPerViewVar, 10);
            var loopVar = parseInt($t.attr('data-loop'), 10);
            var noSwipingVar = $t.attr('data-noSwiping');
            var mousewheelControl = parseInt($t.attr('data-mousewheelControl'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);
            var centerVar = parseInt($t.attr('data-center'), 10);

            var setThumb = function(activeIndex, slidesNum) {
                var url_thumb,
                    leftClick = $t.find('.slider-click.left'),
                    rightClick = $t.find('.slider-click.right'),
                    slidesNum = slidesNum,
                    activeIndexLeft, activeIndexRight;
                if (activeIndex < 1) {
                    leftClick.addClass('disabled');
                } else {
                    leftClick.removeClass('disabled').find('.left').text(activeIndex);
                }
                if (activeIndex == slidesNum - 1) {
                    rightClick.addClass('disabled');
                } else {
                    rightClick.removeClass('disabled').find('.left').text(activeIndex + 2);
                }
            };

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                speed: speedVar,
                pagination: '.pagination-' + index,
                loop: loopVar,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVar,
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: true,
                roundLengths: true,
                centeredSlides: centerVar,
                noSwiping: noSwipingVar,
                loopAdditionalSlides: 4,
                mousewheelControl: mousewheelControl,
                preventClicks: false,
                preventClicksPropagation: false,
                initialSlide: 0,
                noSwipingClass: 'stop-swiping',
                mode: mode || 'horizontal',
                onInit: function(swiper) {
                    $t.find('.swiper-slide').addClass('active');

                    if ($t.closest('.banner-slider-wrap.vertical') && $(window).width() < 768) {
                        $t.find('.swiper-slide').addClass('stop-swiping');
                    } else {
                        $t.find('.swiper-slide').removeClass('stop-swiping');
                    }
                    if (winW > 1024) {
                        $t.find(".slider-clickk").each(function() {
                            var arrow = $(this);
                            $(document).on("mousemove", function(event) {
                                var arrow_parent = arrow.parent(),
                                    parent_offset = arrow_parent.offset();

                                if (arrow.hasClass('right') && event.pageX > ($(window).width() / 2)) {
                                    $('.slider-clickk.right').css({
                                        'visibility': 'visible',
                                        'opacity': '1'
                                    });
                                    $('.slider-clickk.left').css({
                                        'visibility': 'hidden',
                                        'opacity': '0'
                                    });
                                } else if (arrow.hasClass('left') && event.pageX <= ($(window).width() / 2)) {
                                    $('.slider-clickk.left').css({
                                        'visibility': 'visible',
                                        'opacity': '1'
                                    });
                                    $('.slider-clickk.right').css({
                                        'visibility': 'hidden',
                                        'opacity': '0'
                                    });
                                }
                            });
                        });
                    } else {
                        $('.flow-slider .slider-clickk').css({
                            'visibility': 'hidden',
                            'opacity': '0'
                        });
                    }
                },
                onSlideChangeEnd: function(swiper) {

                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;

                },
                onSlideChangeStart: function(swiper) {
                    if (window.enable_foxlazy) {
                        $t.find('.swiper-slide img[data-lazy-src]').foxlazy();
                    }
                    $t.find('.swiper-slide.active').removeClass('active');
                }
            });

            swipers['swiper-' + index].reInit();
            popup_image();


            $('.portfolio-slider-wrapper.slider_simple .info').on('click', function() {

                var popup = $(this).closest('.swiper-slide').find('.caption-images-portfolio');

                $('.popup-portfolio-hidden').html(popup[0]);

                $('.popup-portfolio-hidden').find('.caption-images-portfolio').toggleClass('active');
                $('.popup-portfolio-hidden').find('.images-one').toggleClass('active');


                if ($('.popup-portfolio-hidden').find('.caption-images-portfolio.active').length) {
                    $('.header_top_bg').hide();
                    $('.portfolio-pagination.slider_simple').hide();
                } else {
                    $('.header_top_bg').show();
                    $('.portfolio-pagination.slider_simple').show();
                }


            });
            $('.portfolio-slider-wrapper .close-btn').on('click', function() {
                $('.popup-portfolio-hidden').find('.caption-images-portfolio').toggleClass('active');
                $('.popup-portfolio-hidden').find('.images-one').toggleClass('active');

                if ($('.popup-portfolio-hidden').find('.caption-images-portfolio.active').length) {
                    $('.header_top_bg').hide();
                    $('.portfolio-pagination.slider_simple').hide();
                } else {
                    $('.header_top_bg').show();
                    $('.portfolio-pagination.slider_simple').show();
                }
            });

            if ($t.attr('data-slides-per-view') == 'responsive') {
                var paginationSpan = $t.find('.pagination span');
                var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                else $t.removeClass('pagination-hidden');
                paginationSlice.show();
            }

            if ($t.find('.default-active').length) {
                swipers['swiper-' + index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);
            }

            initIterator++;
        });
    }


    function popup_image() {
        if ($('.popup-image').length) {
            $('.popup-image').lightGallery({
                selector: 'this',
                mode: 'lg-slide',
                closable: false,
                iframeMaxWidth: '80%',
                download: false,
                thumbnail: true
            });
        }
    }



    popup_image();


    /*=================================*/
    /* FULL SCREEN SLIDER */
    /*=================================*/
    function initFullScreenSwiper() {
        var initIterator = 0;
        $('.full_screen_slider').each(function() {

            var $t = $(this);
            var index = 'swiper-unique-id-' + initIterator;
            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.pagination').addClass('pagination-' + index);
            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var slidesPerViewVar = $t.attr('data-slides-per-view');
            if (slidesPerViewVar == 'responsive') {
                slidesPerViewVar = updateSlidesPerView($t);
            } else slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            var setThumb = function(activeIndex, slidesNum) {
                var url_thumb,
                    leftClick = $t.find('.slider-click.left'),
                    rightClick = $t.find('.slider-click.right'),
                    slidesNum = slidesNum,
                    activeIndexLeft, activeIndexRight;
                if (activeIndex < 1) {
                    leftClick.addClass('disabled');
                } else {
                    leftClick.removeClass('disabled').find('.left').text(activeIndex);
                    leftClick.find('.right').text(slidesNum);
                }
                if (activeIndex == slidesNum - 1) {
                    rightClick.addClass('disabled');
                } else {
                    rightClick.removeClass('disabled').find('.left').text(activeIndex + 2);
                    rightClick.find('.right').text(slidesNum);
                }
            }

            var loopVar = parseInt($t.attr('data-loop'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);
            var centerVar = parseInt($t.attr('data-center'), 10);

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                speed: speedVar,
                pagination: '.pagination-' + index,
                loop: loopVar,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVar,
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: true,
                roundLengths: true,
                centeredSlides: centerVar,
                mode: mode || 'horizontal',
                onInit: function(swiper) {
                    $t.find('.swiper-slide').addClass('active');
                    if (winW > 1024) {
                        $t.find(".slider-click").each(function() {
                            var arrow = $(this);
                            $(document).on("mousemove", function(event) {
                                var arrow_parent = arrow.parent(),
                                    parent_offset = arrow_parent.offset(),
                                    pos_left = Math.min(event.pageX - parent_offset.left, arrow_parent.width()),
                                    pos_top = event.pageY - parent_offset.top;

                                arrow.css({
                                    'left': pos_left,
                                    'top': pos_top
                                });
                            });
                        });
                    }
                    setThumb(swiper.activeLoopIndex, swiper.slides.length);
                    popup_image();
                },
                onSlideChangeEnd: function(swiper) {
                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                    setThumb(swiper.activeLoopIndex, swiper.slides.length);
                    popup_image()
                },
                onSlideChangeStart: function(swiper) {
                    $t.find('.swiper-slide.active').removeClass('active');
                    var activeIndex = (loopVar == 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                    setThumb(swiper.activeLoopIndex, swiper.slides.length);
                    swiper.startAutoplay();
                }
            });
            swipers['swiper-' + index].reInit();

            if ($t.attr('data-slides-per-view') == 'responsive') {
                var paginationSpan = $t.find('.pagination span');
                var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                else $t.removeClass('pagination-hidden');
                paginationSlice.show();
            }

            initIterator++;
        });
    }

    function updateSlidesPerView(swiperContainer) {
        if (winW >= addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
        else if (winW >= lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
        else if (winW >= mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
        else if (winW >= smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
        else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
    }

    //swiper arrows
    $('.swiper-arrow-left').on('click', function() {
        swipers['swiper-' + $(this).parent().attr('id')].swipePrev();
    });
    $('.swiper-arrow-right').on('click', function() {
        swipers['swiper-' + $(this).parent().attr('id')].swipeNext();
    });
    $('.swiper-outer-left').on('click', function() {
        swipers['swiper-' + $(this).parent().find('.swiper-container').attr('id')].swipePrev();
    });
    $('.swiper-outer-right').on('click', function() {
        swipers['swiper-' + $(this).parent().find('.swiper-container').attr('id')].swipeNext();
    });
    $('.swiper3-outer-left').on('click', function() {
        swipers3['swiper3-' + $(this).parent().find('.swiper3-container').attr('id')].slidePrev();
    });
    $('.swiper3-outer-right').on('click', function() {
        swipers3['swiper3-' + $(this).parent().find('.swiper3-container').attr('id')].slideNext();
    });
    $('.slider-click.left').on('click', function() {
        swipers['swiper-' + $(this).parent().parent().parent().find('.full_screen_slider').attr('id')].swipePrev();
        swipers['swiper-' + $(this).parent().parent().parent().find('.full_screen_slider').attr('id')].startAutoplay();
    });
    $('.slider-click.right').on('click', function() {
        swipers['swiper-' + $(this).parent().parent().parent().find('.full_screen_slider').attr('id')].swipeNext();
        swipers['swiper-' + $(this).parent().parent().parent().find('.full_screen_slider').attr('id')].startAutoplay();
    });


    /*=================================*/
    /* FLOW SLIDER */
    /*=================================*/

    function initFlowSlider() {
        $('.flipster-slider').each(function(index) {

            var that = $(this);

            var sliderIndex = 'flipster-slider-unique-id-' + index;

            that.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);

            var VarKeyboardControl = parseInt(that.attr('data-keyboard'), 10);
            var VarMousewheel = parseInt(that.attr('data-mousewheel'), 10);
            var VarNavButtons = parseInt(that.attr('data-controls'), 10);

            that.flipster({
                style: 'carousel',
                enableKeyboard: VarKeyboardControl || false,
                enableMousewheel: VarMousewheel || false,
                enableNavButtons: VarNavButtons || false
            })
        })
    }

    /*=================================*/
    /* POST BOX HEIGHT */
    /*=================================*/
    function blogSimpleHeightCalculate() {
        if ($('.simple.enable_fullheight').length) {

            var blogSimple = $('.simple.enable_fullheight'),
                headerHeight = $('.header_top_bg').not('.header_trans-fixed').outerHeight() || 0,
                footerHeight = $('#footer').not('.fix-bottom').outerHeight() || 0,
                blogSimpleHeight;

            blogSimple.height(winH - headerHeight - footerHeight - 40);

        }
        if ($('.team-member.fullheight.full_height').length) {
            var teamFullheight = $('.team-member.fullheight.full_height'),
                headerHeight = $('.header_top_bg').not('.header_trans-fixed').outerHeight() || 0,
                footerHeight = $('#footer').not('.fix-bottom').outerHeight() || 0,
                teamFullheightHeight;

            teamFullheight.height(winH - headerHeight - footerHeight - 40);
        }
    }

    /***********************************/
    /* COUNTER PAGINATION*/
    /**********************************/

    function counterPagination() {
        if ($('.pagination.simpple').length) {
            $('.pagination.simpple').each(function(index) {
                $(this).find('span').each(function(index) {
                    if ((index + 1) < 10) {
                        $(this).html('0' + (index + 1));
                    } else {
                        $(this).html((index + 1));
                    }
                });
            });
        }
    }

    $(window).on('resize', function() {
        submenuPosition();
        if ($('.ytbg').length) {
            video_size();
        }
        topBannerHeight();
        setTimeout(kenburnsHeight, 0);
        twitter_slider();
    });

    function video_size() {
        var height = $('.ytbg').width() * 0.55;
        $('.ytbg').closest('.wpb_wrapper').css('height', height + 'px');
    }
    if ($('.ytbg').length) {
        video_size();
    }
    if ($('.wpb_wrapper .hero-slider .slide').length) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('.hero-slider .slide').closest('.wpb_wrapper').css('margin', '0 15px')
        } else {
            $('.hero-slider .slide').closest('.wpb_wrapper').css('margin', '0 50px')
        }
    }
    $("iframe:not([src*=soundcloud])").each(function(index) {
        $(this).wrap("<div class='video-container'></div>");
    });


    // if element visible
    // ---------------------------------
    $.fn.isVisible = function() {
        var st = $(window).scrollTop(),
            wh = $(window).height(),
            tt = $(this).offset().top,
            th = $(this).height(),
            r;
        if (st + wh >= tt && tt + th >= st) {
            r = 1
        } else {
            r = 0
        }
        return r;
    };


    // smooth scroll
    // ---------------------------------
    $('.sscroll').on('click', function() {
        var ti = $(this).attr('href'),
            tt = $(ti).offset().top - 150;
        $('html, body').animate({
            scrollTop: tt
        }, 600);
        return false;
    });


    // scroll to top
    // ---------------------------------
    $(window).on('scroll', function() {
        var wh = $(window).height(),
            st = $(window).scrollTop();
        if (st >= wh * 0.1) {
            $('.to-top').fadeIn();
        } else {
            $('.to-top').fadeOut()
        }
    });
    $('.to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    // stellar fix - bg position on load
    if ($('[data-stellar-background-ratio]').length > 0) {
        setTimeout(function() {
            var st = $(window).scrollTop();
            $(window).scrollTop(st + 1);
            setTimeout(function() {
                $(window).scrollTop(st)
            }, 200);
        }, 200);
    }
    if ($('.hero-inner').length) {
        $(window).on('resize', function() {
            var hh = $('header').height();
            var hi = $('.hero-inner').height() / 2;
        }).resize();
    }


    // MOBILE NAVIGATION
    $('.mob-nav').on('click', function() {
        $(this).toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
        $('#topmenu').toggleClass('open');
        $('.header_top_bg.header_trans-fixed').toggleClass('open');
        if ($('#topmenu').hasClass('active-socials')) {
            $('.header_top_bg.header_trans-fixed').addClass('open');
        }
        $('body, html').toggleClass('no-scroll');
        return false;
    });


    // ASIDE MENU NAVIGATION
    $('.aside-nav').on('click', function() {
        $('.aside-menu').toggleClass('active-menu');
        $('.topmenu').toggleClass('active-menu');
        return false;
    });

    // WRAP BUTTON PROTECTED PAGE
    $('.woocommerce-page.woocommerce-cart .woocommerce input.button').wrap("<div class='shop-wrap'></div>");
    $('.single-portfolio .protected-page input[type="submit"]').wrap("<div class='input_protected_wrapper'></div>");
    $('.events-single-content.protected-page input[type="submit"]').wrap("<div class='input_protected_wrapper'></div>");

    $('.main-wrapper .wpcf7 form input[type="submit"]').wrap("<div class='input_protected_wrapper'></div>");
    $('.single-product form .form-submit input[type="submit"]').wrap("<div class='input_shop_wrapper'></div>");
    $('.single-post .comments-form form .input-wrapper input[type="submit"]').wrap("<div class='input_post_wrapper'></div>");

    // TOGGLE ASIDE SUBMENU
    $('.aside-menu .menu-item a').on('click', function() {
        if ($(this).parent().hasClass('menu-item-has-children')) {
            $(this).next('.sub-menu').slideToggle();
        }
    });


    // TOGGLE FULL SUBMENU
    $('.right-menu.full .menu-item a').on('click', function() {
        if ($(this).parent().hasClass('menu-item-has-children')) {
            $(this).next('.sub-menu').slideToggle();
        }
    });


    // side links
    $('.side-link').each(function() {
        var e = $(this);
        var h = Math.round(e.height());
        if ((h % 2) == 1) {
            e.css({
                height: '+=1'
            });
        }
    });


    // Hero slider
    // ---------------------------------
    if ($('.hero-slider').length) {
        $(window).on('resize', function() {
            $('.hero-slider .slide').height('800px').width('100%');
        }).resize();
        $('.hero-slider').flexslider({
            animation: "slide",
            pauseOnAction: true,
            animationLoop: true,
            slideshow: true,
            slideshowSpeed: 7000,
            animationSpeed: 600,
            controlNav: true,
            directionNav: false
        });
    }


    // YT Background
    // ---------------------------------
    let ytbg = $('.ytbg');

    if (ytbg.length) {
        $('.ytbg').YTPlayer({
            showYTLogo: false,
            optimizeDisplay: true
        });
    }
    // equal-height columns
    let equalHeight = $('.equal-height');

    if (equalHeight.length) {
        $('.equal-height [class*="col-"]').matchHeight({
            byRow: false
        });
    }



    // image slider
    // ---------------------------------
    if ($('.img-slider').length) {
        $('.img-slider').each(function() {
            $(this).flexslider({
                animation: "slide",
                slideshowSpeed: 4500,
                smoothHeight: true,
                pauseOnAction: false,
                controlNav: false,
                directionNav: true,
                prevText: "<i class='pe pe-7s-angle-left'></i>",
                nextText: "<i class='pe pe-7s-angle-right'></i>"
            });
        })
    }
    $('.flex-direction-nav a').on('click', function(ev) {
        ev.stopPropagation();
    });


    // BLOG
    // ---------------------------------
    $(window).on('load', function() {
        topBannerHeight();
        let blog = $('.blog');

        if (blog.length) {
            $('.blog').imagesLoaded(function() {
                $('.blog').shuffle({
                    "itemSelector": ".post"
                });
                // fix
                setTimeout(function() {
                    $('.blog').shuffle('shuffle');
                }, 200);
            });
        }

        calcPaddingMainWrapper();
    });

    function portfolioColumns() {
        if ($('.portfolio.col-3').length) {
            $('.item, .portfolio-pinterest .item-single, .palaroid .item-single, .adjusted .item-single').width(100 / 3 + '%');
            $('.item.wide, .item.wide-tall').width(100 * 2 / 3 + '%');
        }
        if ($('.portfolio.col-4').length) {

            $('.item, .portfolio-pinterest .item-single, .palaroid .item-single, .adjusted .item-single').width(100 / 4 + '%');
            $('.item.wide, .item.wide-tall').width(100 * 2 / 4 + '%');
        }
        if ($('.portfolio.col-6').length) {
            $('.item, .portfolio-pinterest .item-single, .palaroid .item-single, .adjusted .item-single').width(100 / 2 + '%');
            $('.item.wide, .item.wide-tall').width(100 * 2 / 2 + '%');
        }




        if ($('.single-portfolio .gallery-single.col-3').length) {
            $('.single-portfolio .gallery-single .item-single').css('width', 100 / 3 + '%');
        }
        if ($('.single-portfolio .gallery-single.col-4').length) {
            $('.single-portfolio .gallery-single .item-single').css('width', 100 / 4 + '%');
        }
        if ($('.single-portfolio .gallery-single.col-6').length) {
            $('.single-portfolio .gallery-single .item-single').css('width', 100 / 2 + '%');
        }



    }


    $('.product button[type="submit"]').on('click', function() {
        $("img[data-lazy-src]").foxlazy();
    });

    // PORTFOLIO
    // ---------------------------------
    $(window).on('load', function() {
        portfolioColumns();
        portfolioSliderHeight();
        // $("img[data-lazy-src]").foxlazy();
        initIsotop();
        // $("img[data-lazy-src]").foxlazy('', function(){
        //     setTimeout(initIsotop, 500);
        //     setTimeout(function () {
        //         portfolioFilter();
        //     }, 200);
        // });
        galleryFilter();
        portfolioFilter();
        $('img').on('load', function() {
            portfolioFilter();
        });
    });

    // spaces between items

    function portfolioSpace() {

        $('.gallery-single[data-space]').each(function() {
            var space = $(this).data('space');
            $(this).find('.item-single').css({
                'padding-right': space,
                'padding-left': space,
                'margin-top': '0',
                'margin-bottom': space * 2
            });
            $(this).css({
                'margin-left': -space + 'px',
                'margin-right': -space + 'px'
            });

        });



        $('#pixproof_gallery').each(function() {
            var space = $(this).data('space');
            $(this).find('.proof-photo').css({
                'padding-right': space,
                'padding-left': space,
                'margin-top': '0',
                'margin-bottom': space * 2
            });
            $(this).css({
                'margin-left': -space + 'px',
                'margin-right': -space + 'px'
            });

        });


        $('.portfolio[data-space]:not(.grid)').each(function() {
            var space = $(this).data('space');
            if ($(this).hasClass('classic') && !$(this).hasClass('big')) {
                $(this).find('.item').css({
                    'margin-top': space,
                    'margin-bottom': space - 30
                });
                $(this).find('.item-link').css({
                    'margin-right': space,
                    'margin-left': space
                });
            } else {
                $(this).find('.item-link').css({
                    'margin': space
                });
            }

            $(this).find('.item-link + h5').css({
                'margin-right': space,
                'margin-left': space
            });
            $('.portfolio').css({
                'margin-left': -space + 'px',
                'margin-right': -space + 'px'
            });

            if (($(this).hasClass('big_gap') || $(this).hasClass('masonry')) && !$(this).hasClass('masonry_modern')) {
                $(this).find('.item-link').css({
                    'margin-top': '0',
                    'margin-bottom': '0'
                });
                $(this).find('.item').css({
                    'margin-top': space,
                    'margin-bottom': space - 40
                });
                if ($(this).hasClass('masonry')) {
                    $(this).find('.item-link').css({
                        'margin-bottom': '7px'
                    });
                    $(this).find('.item').css({
                        'margin-top': space,
                        'margin-bottom': space - 25
                    });
                }
            }
            if ($(this).hasClass('masonry_modern')) {
                $(this).find('.item-link').css({
                    'margin-right': space / 2,
                    'margin-left': space / 2,
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'width': 'calc(100% - ' + space + 'px)',
                }).css({
                    'width': '-webkit-calc(100% - ' + space + 'px)',
                });
                $(this).find('.item').css({
                    'margin-top': space / 2,
                    'margin-bottom': space / 2
                });
            }
            if ($(this).closest('.portfolio-wrapper').hasClass('palaroid')) {

                $(this).find('.item-link').css({
                    'padding': space,
                    'margin': '0'
                });
            }
        });
        $('.portfolio.grid[data-space]').each(function() {

            var space = $(this).data('space');
            $(this).find('.item-link').css({
                'margin-right': space,
                'margin-left': space,
                'margin-top': '15px',
                'margin-bottom': '15px'
            });

            if ($(this).hasClass('grid_modern')) {
                $(this).find('.item').css({
                    'margin-top': space - 15,
                    'margin-bottom': space - 15
                });
            }

            $(this).find('.item-portfolio-content.grid_category').css({
                'width': '100%',
                'padding-right': space,
                'padding-left': space,
                'margin-bottom': space

            });
            $(this).find('.item-portfolio-content:not(.grid_category, .grid_modern)').css({
                'margin-right': space,
                'margin-left': space,
                'margin-bottom': space
            });
            $('.portfolio').css({
                'margin-left': -space + 'px',
                'margin-right': -space + 'px'
            });
        });
    }
    portfolioSpace();

    $(window).on('resize', function() {
        calcPaddingMainWrapper();
        counterPagination();
    });

    $(window).on('load', function() {
        counterPagination();
        // fix
        // ---------------------------------
        setTimeout(function() {
            $(window).scroll();
        }, 300);
    });


    // toggles
    // ---------------------------------
    $('.toggle .toggle-title').on('click', function() {
        $(this).next('.toggle-content').slideToggle(200);
        $(this).parent('.toggle').toggleClass('active');
        return false;
    });


    // IMAGE POPUP
    // ---------------------------------
    // single

    if ($('.gallery-single').length || $('.portfolio').length || $('.pricing-gallery').length || $('.line-wrap').length) {

        $('.gallery-single, .portfolio, .pricing-gallery, .line-wrap').each(function() {
            var thumb = (typeof $(this).attr('data-thumb') !== undefined) && (typeof $(this).attr('data-thumb') !== false) ? $(this).attr('data-thumb') : true;
            thumb = thumb === 'false' ? false : true;

            $(this).lightGallery({
                selector: '.gallery-item:not(.popup-details)',
                mode: 'lg-slide',
                closable: false,
                iframeMaxWidth: '80%',
                download: false,
                thumbnail: true,
                exThumbImage: 'href',
                showThumbByDefault: thumb
            });
        });
    }

    // YOUTUBE, VIMEO, GOOGLE MAPS POPUP
    // ---------------------------------

    let popup = $('.popup-youtube, .popup-vimeo, .popup-gmaps');

    if (popup.length) {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            disableOn: 0,
            preloader: false,
            removalDelay: 300,
            fixedContentPos: true,
            fixedBgPos: true
        });
    }


    // GALLERY POPUP
    // ---------------------------------
    // for portfolio

    if ($('.popup-gallery').length) {
        $('.popup-gallery').lightGallery({
            selector: '.filtered a',
            mode: 'lg-slide',
            closable: false,
            iframeMaxWidth: '80%',
            download: false,
            thumbnail: true
        });
    }
    if ($('.insta-wrapper').length) {
        $('.insta-wrapper').lightGallery({
            selector: '.insta-item',
            mode: 'lg-slide',
            closable: false,
            iframeMaxWidth: '80%',
            download: false,
            thumbnail: true
        });
    }
    if ($('.popup-single-gallery').length) {
        $('.popup-single-gallery').lightGallery({
            selector: 'a',
            closable: false,
            mode: 'lg-slide',
            iframeMaxWidth: '80%',
            download: false,
            thumbnail: true
        });
    }

    // AJAX CONTACT FORM
    // ---------------------------------
    $('#contact form').submit(function() {
        var url = $(this).attr('action');
        // get information from contact form
        var name = $('[name=name]').val();
        var email = $('[name=email]').val();
        var message = $('[name=message]').val();
        // send information to contact.php
        $.ajax({
            type: "POST",
            url: url,
            data: {
                name: name,
                email: email,
                message: message
            },
            success: function(response) {
                // response from contact.php
                $('.contact-message').html(response).slideDown(500);
            },
            error: function() {
                // error message
                $('.contact-message').html('<p class="error">Something went wrong, try again!</p>').slideDown('slow');
            }
        });
        return false;
    });


    // GOOGLE MAP
    // ----------------------------------
    //set your google maps parameters
    $(window).on('load', function() {
        if ($('#google-map').length > 0) {
            var latitude = $('#google-map').attr("data-lat"),
                longitude = $('#google-map').attr("data-lng"),
                contentString = $('#google-map').attr("data-string"),
                map_zoom = parseInt($('#google-map').attr("data-zoom"), 10);
            //google map custom marker icon
            var marker_url = $('#google-map').attr("data-marker");
            //we define here the style of the map
            var style = [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 40
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 17
                }]
            }];
            //set google map options
            var map_options = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: map_zoom,
                panControl: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style
            }
            //inizialize the map
            var map = new google.maps.Map(document.getElementById('google-map'), map_options);
            //add a custom marker to the map
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: map,
                visible: true,
                icon: marker_url
            });
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }
    });
    $('.wpcf7').on('focus', '.wpcf7-not-valid', function() {
        $(this).removeClass('wpcf7-not-valid');
    });

    function initIsotop() {
        if ($('.izotope-container').length) {
            $('.izotope-container').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.item-single',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.item-single',
                        gutterWidth: 30
                    }
                });
            });
            if ($('.izotope-container').closest('.portfolio-wrapper').hasClass('portfolio-pinterest') || $('.izotope-container').closest('.portfolio-wrapper').hasClass('adjusted')) {
                $('.izotope-container').closest('.portfolio-wrapper.portfolio-pinterest, .portfolio-wrapper.adjusted').removeAttr('style');
            }
        }
        if ($('.portfolio-single-content .gallery_masonry').length) {
            $('.portfolio-single-content .gallery_masonry').each(function() {
                var self = $(this);
                self.isotope({
                    itemSelector: '.portfolio-single-content .gallery_masonry a',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.portfolio-single-content .gallery_masonry a',
                        gutterWidth: 30
                    }
                });
            });
        }
        if ($('.insta-wrapper').length) {
            $('.insta-wrapper').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.insta-item',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.insta-item',
                        gutterWidth: 0
                    }
                });
            });
        }

        if ($('.izotope-container-2').length) {
            $('.izotope-container-2').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.full-single',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.full-single'
                    }
                });
            });
        }

        if ($('.izotope-container-3').length) {
            $('.izotope-container-3').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.images',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.images'
                    }
                });
            });
        }

        if ($('#pixproof_gallery.masonry').length) {
            $('#pixproof_gallery.masonry').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.proof-photo',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.proof-photo'
                    }
                });
            });
        }

        if ($('.wpb_wrapper.shuffle').length) {
            $('.wpb_wrapper.shuffle').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.item',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.item',
                        horizontalOrder: true,
                    }
                });
            });
        }

        if ($('.pricing-gallery').length) {
            $('.pricing-gallery').each(function() {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.images',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.pricing-gallery .grid-sizer'
                    }
                });
            });
        }

        if ($('.portfolio:not(.masonry) .wpb_wrapper, .blog').length && ($('.portfolio:not(.masonry) .wpb_wrapper > .item').length || $('.blog > .row > .item').length)) {
            $('.portfolio:not(.masonry) .wpb_wrapper, .blog > .row').each(function() {
                var self = $(this);
                var layoutM = self.closest('.portfolio-wrapper').hasClass('palaroid') ? "fitRows" : 'masonry';
                if (!$(this).parent().hasClass('adjusted')) {
                    self.isotope({
                        itemSelector: '.item',
                        layoutMode: layoutM,
                        masonry: {
                            columnWidth: '.item'
                        }
                    });
                }
            });
        }
        if ($('.portfolio.masonry .wpb_wrapper').length && $('.portfolio.masonry .wpb_wrapper > .item').length) {
            $('.portfolio.masonry .wpb_wrapper').each(function() {

                var self = $(this);
                self.isotope({
                    itemSelector: '.item',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.item'
                    }
                });
            });
        }

        if ($('.adjusted').length && $(window).width() > 767) {
            $('.adjusted .item-single').css('height', 'auto').equalHeights();
        } else if ($('.adjusted').length) {
            $('.adjusted .item-single').css('height', 'auto');
        }
    }


    $(window).on('resize', function() {
        portfolioSliderHeight();
        initIsotop();
    });
    window.addEventListener("orientationchange", function() {
        submenuPosition();
        setTimeout(kenburnsHeight, 0);
        counterPagination();
    });
    /*Calculate paddings for main wrapper*/
    function calcPaddingMainWrapper() {
        var paddValue = $('footer').outerHeight();
        if (!$("#footer.fix-bottom").length && $("#footer.footer-parallax").length) {
            $('.main-wrapper').css('margin-bottom', paddValue);
        } else if (!$("#footer.fix-bottom").length) {
            $('.main-wrapper').css('padding-bottom', paddValue);
        }
    }
    calcPaddingMainWrapper();

    function fixedMobileMenu() {
        if ($(window).width() < 992 && !$('body').hasClass('mob-main-menu')) {
            var padd = $(window).height() - $('header').outerHeight();

            $('header #topmenu').css('max-height', padd);
        } else if ($(window).width() < 1025 && $('body').hasClass('mob-main-menu')) {
            var padd = $(window).height() - $('header').outerHeight();

            $('header #topmenu').css('max-height', padd);

        }
        if ($('.header_trans-fixed').length && $(window).width() > 991 && !$('body').hasClass('mob-main-menu')) {
            var mt = ($('#topmenu > ul').outerHeight() - $('#topmenu .f-right').outerHeight()) / 2;

            $('#topmenu .f-right').css('margin-top', mt);
        } else if ($('.header_trans-fixed').length && $(window).width() > 1024 && $('body').hasClass('mob-main-menu')) {
            var mt = ($('#topmenu > ul').outerHeight() - $('#topmenu .f-right').outerHeight()) / 2;

            $('#topmenu .f-right').css('margin-top', mt);
        } else {
            $('.header_trans-fixed #topmenu .f-right').css('margin-top', 'auto');
        }
    }

    //fixed menu
    function addFixedHeader() {
        var topHeader = $('.header_top_bg.enable_fixed'),
            heightHeader = topHeader.height();

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 0) {
                topHeader.addClass('fixed');
            } else {
                topHeader.removeClass('fixed');
            }
        });
    }
    addFixedHeader();
    $(window).on('resize', function() {
        addFixedHeader();
    });
    window.addEventListener("orientationchange", function() {
        addFixedHeader();
    }, false);

    // header social
    $('.whizz-top-social .social-icon').on("click", function() {
        var thisItem = $(this);
        var thisItemParent = thisItem.parent('.whizz-top-social');
        var thisSocials = thisItemParent.find('.social');

        thisItemParent.toggleClass('over');
        thisSocials.toggleClass('active');

        return false;
    });

    // for woocommerce
    $('.add_to_cart_button').on('click', function() {
        $(document.body).trigger('wc_fragment_refresh');
    });

    // flexslider
    $(window).on('load', function() {
        initFlexSlider();
        $('canvas').wrap('<div class="canvas-wrap"></div>');


    });

    function initFlexSlider() {

        $('#carousel').eventType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
        $('#carousel').eventType = "click";
        let slider = $('#slider');

        if (slider.length) {
            $('#slider').flexslider({
                animation: "fade",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: "#carousel"
            })
        }
        if (winW < 768) {
            $('#carousel').flexslider({
                animation: "slide",
                animationSpeed: 600,
                controlNav: false,
                animationLoop: true,
                direction: "horizontal",
                slideshow: true,
                itemWidth: 100,
                itemMargin: 1,
                mousewheel: true,
                move: 1,
                asNavFor: '#slider'
            });
        } else {
            let carousel = $('#carousel');

            if (carousel.length) {
                $('#carousel').flexslider({
                    animation: "slide",
                    animationSpeed: 600,
                    controlNav: false,
                    animationLoop: true,
                    direction: "vertical",
                    slideshow: false,
                    itemWidth: 100,
                    itemMargin: 1,
                    mousewheel: true,
                    move: 1,
                    asNavFor: '#slider'
                });
            }
        }
    }


    // banner video full screen
    if ($('.banner-video .full-button').length) {
        $('.banner-video .full-button').each(function(index) {
            $(this).on('click', function() {
                if ($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    $(this).closest('.banner-video').removeClass('full');
                    $('header').show();
                    $('footer:not(.no-footer)').show();
                } else {
                    $(this).addClass('on');
                    $(this).closest('.banner-video').addClass('full');
                    $('header').hide();
                    $('footer').hide();
                }
            })
        })
    }

    function changeStateVideo(iframe_container, button, player, hover_enable, services) {
        var $this = $(button),
            iframe = iframe_container.find('iframe');

        if (hover_enable) {

            iframe_container.on('mouseover', function() {
                services == 'youtube' && player.playVideo();
                $(this).addClass('play');
                if (services != 'youtube') {
                    if (iframe.data('src')) {
                        iframe.attr('src', iframe.data('src'));
                    }

                    $this.addClass('start')
                        .closest('.iframe-video').addClass('play');
                }
            });

            iframe_container.on('mouseout', function() {
                services == 'youtube' && player.pauseVideo();
                if (services != 'youtube') {
                    if (iframe.data('src')) {
                        iframe.attr('src', 'about:blank');
                    }
                    $this.addClass('start')
                        .closest('.iframe-video').addClass('play');
                }
                $(this).removeClass('play');
            });

            return;
        }

        if ($this.hasClass('start')) {

            services == 'youtube' && player.pauseVideo();
            if (iframe.data('src')) {
                iframe.attr('src', 'about:blank');
            }
            $this.removeClass('start')
                .closest('.iframe-video').removeClass('play');
        } else {

            services == 'youtube' && player.playVideo();
            if (iframe.data('src')) {
                iframe.attr('src', iframe.data('src'));
            }
            $this.addClass('start')
                .closest('.iframe-video').addClass('play');
        }

    }

    // youtube video ready
    window.onYouTubeIframeAPIReady = function() {

        var player = [],
            $iframe_parent = [],
            $this,
            $button;

        // each all iframe
        $('.iframe-video.youtube iframe').each(function(i) {
            // get parent element
            $this = $(this);
            $iframe_parent[i] = $this.closest('.iframe-video.youtube');
            // init video player

            player[i] = new YT.Player(this, {

                // callbacks
                events: {
                    'onReady': function(event) {
                        // mute on/off
                        if ($iframe_parent[i].data('mute')) {
                            event.target.mute();
                        }

                    },
                    'onStateChange': function(event) {

                        switch (event.data) {
                            case 1:
                                // start play
                                break;
                            case 2:
                                // pause
                                break;
                            case 3:
                                // buffering
                                break;
                            case 0:
                                // end video
                                $iframe_parent[i].removeClass('play').find('.play-button').removeClass('start');
                                break;
                            default:
                                '-1'
                                // not play
                        }
                    }
                }
            });

            // hover play/pause video
            if ($iframe_parent[i].data('type-start') == 'hover') {
                changeStateVideo($iframe_parent[i], this, player[i], true, 'youtube')
            }

            // click play/pause video
            if ($iframe_parent[i].data('type-start') == 'click') {

                $iframe_parent[i].find('.play-button').on('click', function(event) {
                    event.preventDefault();
                    setTimeout(changeStateVideo($iframe_parent[i], this, player[i], false, 'youtube'), 0);
                });
            }

            var muteButton = $iframe_parent[i].find('.mute-button');
            // mute video
            if (muteButton.length) {
                muteButton.on('click', function() {
                    if (muteButton.hasClass('mute1')) {
                        player[i].unMute();
                        muteButton.removeClass('mute1');
                    } else {
                        muteButton.addClass('mute1');
                        player[i].mute();
                    }
                });
            }
            // stop video
            $iframe_parent[i].find('.video-close-button').on('click', function() {
                // event.preventDefault();
                player[i].stopVideo();
                $iframe_parent[i].removeClass('play')
                    .find('.play-button').removeClass('start');
            });
        });
    };

    var $iframe_parent = [];
    $('.iframe-video:not(.youtube)').each(function(i) {
        $iframe_parent[i] = $(this);
        $('.play-button', $iframe_parent[i]).on('click', function() {
            event.preventDefault();
            changeStateVideo($iframe_parent[i], this)
        });
        $iframe_parent[i].find('.video-close-button').on('click', function() {
            event.preventDefault();
            $iframe_parent[i].find('iframe').attr('src', 'about:blank');
            $iframe_parent[i].removeClass('play')
                .find('.play-button').removeClass('start');
        });

        // hover play/pause video
        if ($iframe_parent[i].data('type-start') == 'hover') {
            changeStateVideo($iframe_parent[i], $iframe_parent[i].find('iframe')[0], false, true)
        }
    });

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $('form').submit(function() {

            var required = $(this).find('[required]'); // change to [required] if not using true option as part of the attribute as it is not really needed.
            var error = false;

            for (var i = 0; i <= (required.length - 1); i++) {
                if (required[i].value == '' || !required[i].validity.valid) // tests that each required value does not equal blank, you could put in more stringent checks here if you wish.
                {
                    required[i].style.backgroundColor = 'rgb(255,155,155)';
                    error = true; // if any inputs fail validation then the error variable will be set to true;
                }
            }

            if (error) // if error is true;
            {
                return false; // stop the form from being submitted.
            }
        });
    }

    if (jQuery(".wpb-date").length) {
        jQuery(".wpb-date").datetimepicker();
    }

    // coming soon

    $(window).on('load', function() {
        if (comingSoonElements.length) {
            comingSoonValue()
        }
    });
    $(window).on('resize', function() {
        if (comingSoonElements.length) {
            comingSoonValue()
        }
    });

    var comingSoonElements = $('.coming-soon-descr li');

    function comingSoonValue() {
        comingSoonElements.each(function() {
            var thisElement = $(this),
                text = thisElement.data('desktop'),
                mobileText = thisElement.data('mobile');
            if ($(window).width() < 768) {
                thisElement.text(mobileText);
            } else {
                thisElement.text(text);
            }
        })
    }

    if ($('.gridrotate').length) {
        $('.gridrotate').gridrotator({
            rows: 2,
            // number of columns
            columns: 10,
            w1200: {
                rows: 2,
                columns: 10
            },
            w992: {
                rows: 2,
                columns: 8
            },
            w510: {
                rows: 2,
                columns: 5
            }
        });
    }


    /**********************************/
    /*COUNTER coming SOON*/
    /**********************************/
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function updateClock($clock, endTime, updateDays) {
        var t = getTimeRemaining(endTime);

        if (updateDays) {
            $clock.find('.count-days').text(t.days);
        }

        if (updateDays || t.minutes === 59) {
            $clock.find('.count-hours').text(('0' + t.hours).slice(-2));
        }

        if (updateDays || t.seconds === 59) {
            $clock.find('.count-mins').text(('0' + t.minutes).slice(-2));
        }

        $clock.find('.count-secs').text(('0' + t.seconds).slice(-2));

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    if ($('.coming-soon').length) {
        $('.coming-soon').each(function() {
            var self = $(this),
                endTime = self.attr('data-end'),
                $mask_clock = self.find('.mask');

            updateClock($mask_clock, endTime, true);

            var timeinterval = setInterval(function() {
                updateClock($mask_clock, endTime);
            }, 1000);

        });
    }

    /* Infinite scroll */
    function load_infinite_scroll() {
        // Load More Portfolio
        if (window.infinite_scroll) {

            var amount_images_per_page = parseInt(infinite_scroll.amount_images_per_page);

            // The maximum number of pages the current query can return.
            var countImages = parseInt(infinite_scroll.countImages);

            // The link of the next page of posts.
            var url_next_page = infinite_scroll.url_next_page;

            var maxPages = infinite_scroll.maxPages;

            var infinite_page = infinite_scroll.infinite_page;

            // wrapper selector
            var wrap_selector = '.gallery-wrap';

            var pageNum = 1;
            $(window).on('scroll', function() {
                if ($(document).height() - winH == $(window).scrollTop() && pageNum < maxPages) {
                    pageNum++;
                    $.ajax({
                        url: url_next_page + '?infinite_page=' + (pageNum),
                        type: "get",
                        success: function(data) {

                            var newElements = $(data).find('.izotope-container-2 .item-single');

                            var elems = [];

                            newElements.each(function(i) {
                                elems.push(this);
                            });

                            $('.izotope-container-2').isotope('insert', elems);
                            $('.izotope-container-2').find('img').on('load', function() {
                                if (!window.enable_foxlazy) {
                                    wpc_add_img_bg('.s-img-switch');
                                }
                            });

                            pageCalculations();

                            if ($('.gallery-single, .portfolio, .pricing-gallery, .line-wrap').length) {
                                $('.gallery-single, .portfolio, .pricing-gallery, .line-wrap').append(elems);
                                $('.gallery-single, .portfolio, .pricing-gallery, .line-wrap').data('lightGallery').destroy(true);

                                $('.gallery-single, .portfolio, .pricing-gallery, .line-wrap').each(function() {
                                    var thumb = (typeof $(this).attr('data-thumb') !== undefined) && (typeof $(this).attr('data-thumb') !== false) ? $(this).attr('data-thumb') : true;
                                    thumb = thumb === 'false' ? false : true;

                                    $(this).lightGallery({
                                        selector: '.gallery-item:not(.popup-details)',
                                        mode: 'lg-slide',
                                        closable: false,
                                        iframeMaxWidth: '80%',
                                        download: false,
                                        thumbnail: true,
                                        showThumbByDefault: thumb
                                    });

                                })
                            }

                            newElements.find('img[data-lazy-src]').foxlazy();

                            pageNum++;
                        }
                    });
                }
            });
        }
    }
    load_infinite_scroll();

    /**********************************/
    /*SPLITTED SLIDER*/
    /**********************************/

    $(window).on('resize', function() {
        if ($('.multiscroll-slider').length) {
            $.fn.multiscroll.destroy();
            initMultiscroll();
        }
    });

    window.addEventListener('orientationchange', function() {
        if ($('.multiscroll-slider').length) {
            $.fn.multiscroll.destroy();
            initMultiscroll();
        }
    });

    function initMultiscroll() {

        var winW = $(window).width(),
            winH = $(window).height(),
            mutiscrollWrapp = $('.multiscroll-slider'),
            multiscrollLeft = mutiscrollWrapp.find('.multiscroll-slider-left'),
            multiscrollRight = mutiscrollWrapp.find('.multiscroll-slider-right'),
            multiscrollHeight;

        if (mutiscrollWrapp.hasClass('fullheight')) {
            var headerHeight = $('.header_top_bg').not('.header_trans-fixed').outerHeight();
            var footerHeight = $('#footer').not('.fix-bottom').outerHeight();
            mutiscrollWrapp.height(winH - headerHeight - footerHeight);
        }

        multiscrollHeight = mutiscrollWrapp.height();

        if (!mutiscrollWrapp.hasClass('albums-sp') && (winW > 0 && winW < 480) || (winW > 767 && winW < 992)) {
            multiscrollLeft.height(multiscrollHeight / 2);
            multiscrollRight.height(multiscrollHeight / 2);
        } else if ((winW > 991) || (winW > 479 && winW < 768)) {
            multiscrollLeft.height(multiscrollHeight);
            multiscrollRight.height(multiscrollHeight);
        } else {
            multiscrollLeft.height(multiscrollHeight);
            multiscrollRight.height(multiscrollHeight);
        }

        mutiscrollWrapp.multiscroll({
            verticalCentered: false,
            scrollingSpeed: parseInt(mutiscrollWrapp.attr('data-speed'), 10),
            easing: 'easeInQuart',
            menu: false,
            navigation: false,
            loopBottom: parseInt(mutiscrollWrapp.attr('data-loop'), 10),
            loopTop: parseInt(mutiscrollWrapp.attr('data-loop'), 10),
            keyboardScrolling: parseInt(mutiscrollWrapp.attr('data-keyboard'), 10),
            touchSensitivity: 10,
            sectionSelector: '.ms-section',
            leftSelector: '.ms-left',
            rightSelector: '.ms-right',
            afterRender: function() {
                var bg_itemLeft = multiscrollLeft.find('[data-background]'),
                    bg_itemRight = multiscrollRight.find('[data-background]'),
                    slideCount = bg_itemLeft.length;

                if (bg_itemLeft.length || bg_itemRight.length) {
                    loadImages(0, 'left');
                }

                function loadImages(index, side) {
                    if (index < slideCount) {
                        var next_side,
                            item,
                            tmpImg = new Image();

                        if (side == 'right') {
                            item = bg_itemRight.eq(-index - 1);
                            next_side = 'left';

                            index++;
                        } else {
                            item = bg_itemLeft.eq(index);
                            next_side = 'right';
                        }

                        if (item.length) {
                            tmpImg.src = item.attr('data-background');
                            tmpImg.onload = function() {
                                item
                                    .css('background-image', 'url(' + tmpImg.src + ')')
                                    .removeAttr('data-background')
                                    .find('.swiper3-lazy-preloader')
                                    .remove();

                                loadImages(index, next_side);
                            }
                        } else {
                            loadImages(index, next_side);
                        }
                    } else {
                        return 0;
                    }
                }
            },
        });

        mutiscrollWrapp.find('.ms-section').removeClass('active');
        mutiscrollWrapp.find('.ms-right .ms-section').last().addClass('active');
        mutiscrollWrapp.find('.ms-left .ms-section').first().addClass('active');
    }

    function multiScrollControls() {
        $('.scroll-btn.down').on('click', function() {
            $.fn.multiscroll.moveSectionDown();
        });
        $('.scroll-btn.up').on('click', function() {
            $.fn.multiscroll.moveSectionUp();
        });
    }

    /**********************************/
    /* SKILLS */
    /**********************************/

    $(window).on('scroll', function() {
        if ($('.skills').length) {
            $('.skills').not('.active').each(function() {

                if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * 1) {
                    $(this).addClass('active');
                    $(this).find('.skill').each(function() {
                        var procent = $(this).attr('data-value');
                        $(this).find('.active-line').css('width', procent + '%');
                        $(this).find('.counter').countTo();
                    });
                }
            });
        }
    });

    /**********************************/
    /* THUMB FLEX SLIDER */
    /**********************************/
    $(window).on('resize', function() {
        if ($('.thumb-slider-wrapp').length) {
            initThumbFlexSlider();
        }
    });

    window.addEventListener('orientationchange', function() {
        portfolioSliderHeight();
        if ($('.thumb-slider-wrapp').length) {
            initThumbFlexSlider();
        }
    });

    function initThumbFlexSlider() {

        var winW = $(window).width(),
            winH = $(window).innerHeight(),
            innerWinH = $(window).height(),
            thumbSliderWrapp = $('.thumb-slider-wrapp'),
            headerHeight = $('.header_top_bg').not('.header_trans-fixed').outerHeight(),
            footerHeight = $('#footer').not('.fix-bottom').outerHeight();

        thumbSliderWrapp.innerHeight(winH - headerHeight - footerHeight);
        let mainThumb = $('.main-thumb-slider');

        if (mainThumb.length) {
            $('.main-thumb-slider').flexslider({
                animation: "fade",
                animationSpeed: 600,
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: ".sub-thumb-slider"
            });
        }
        var sub_thumb = $('.sub-thumb-slider');

        if (sub_thumb.length) {
            $('.sub-thumb-slider').flexslider({
                animation: "slide",
                animationSpeed: 600,
                controlNav: false,
                animationLoop: true,
                direction: "horizontal",
                slideshow: false,
                itemWidth: 100,
                itemMargin: 5,
                mousewheel: true,
                asNavFor: '.main-thumb-slider'
            });
        }

    }

    $('.thumb-slider-wrapp-arrow').on('click', function() {
        $(this).toggleClass('active').parent().find('.sub-thumb-slider').toggleClass('active');
    });


    /* Share */

    $('[data-share]').on('click', function() {

        var w = window,
            url = this.getAttribute('data-share'),
            title = '',
            w_pop = 600,
            h_pop = 600,
            scren_left = w.screenLeft != undefined ? w.screenLeft : screen.left,
            scren_top = w.screenTop != undefined ? w.screenTop : screen.top,
            width = w.innerWidth,
            height = w.innerHeight,
            left = ((width / 2) - (w_pop / 2)) + scren_left,
            top = ((height / 2) - (h_pop / 2)) + scren_top,
            newWindow = w.open(url, title, 'scrollbars=yes, width=' + w_pop + ', height=' + h_pop + ', top=' + top + ', left=' + left);

        if (w.focus) {
            newWindow.focus();
        }

        return false;
    });

    // for sound bg
    $('.whizz-sound-btn').on('click', function() {

        var $button = $(this);
        if ($button.hasClass('play')) {
            $button.next('audio').trigger('pause');
            $button.removeClass('play');
        } else {
            $button.next('audio').trigger('play');
            $button.addClass('play');
        }

    });

    /* Copyright */
    if ($('.whizz_copyright_overlay').length) {
        $(document).on('contextmenu', function(event) {
            if ($('.whizz_copyright_overlay').hasClass('copy')) {
                event.preventDefault();
            } else if (event.target.tagName != 'A') {
                event.preventDefault();
            }
            $('.whizz_copyright_overlay').css({
                'left': event.pageX,
                'top': event.pageY
            }).addClass('active');
        }).on('click', function() {
            $('.whizz_copyright_overlay').removeClass('active').removeAttr('style');
        });
    }

    function galleryFilter() {
        // init Isotope
        var $grid = $('.portfolio:not(.masonry) .wpb_wrapper');


        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function() {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };
        // bind filter button click
        $('.filter ul').on('click', '.button', function() {
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({
                filter: filterValue
            });

            $("img[data-lazy-src]").foxlazy();
            wpc_add_img_bg('.s-img-switch');
        });
        // change is-checked class on buttons
        $('.filter ul').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', '.button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });

    }

    function portfolioFilter() {
        var sort = '';

        if ($('.albums-left-filter').attr('data-random') == 'on') {
            sort = 'random';
        }

        // init Isotope
        let portfolio = $('.albums-left-filter .portfolio');

        if (portfolio.length) {
            var $grid = $('.albums-left-filter .portfolio').isotope({
                itemSelector: '.element-item',
                layoutMode: 'masonry',
                sortBy: sort
            });
        }
        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function() {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };
        // bind filter button click
        $('.albums-left-filter .filters-button-group').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({
                filter: filterValue
            });

            $("img[data-lazy-src]").foxlazy();
            wpc_add_img_bg('.s-img-switch');
        });
        // change is-checked class on buttons
        $('.albums-left-filter .button-group').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });

    }

    if ($('.filmstrim-gallery-outer.no1').length) {
        $('.fullview').css('display', 'none');
    }


    /**********************************/
    /* PORTFOLIO SLIDER FULL HEIGHT */
    /**********************************/

    function portfolioSliderHeight() {
        var headerH = $('.header_top_bg:not(.header_trans-fixed)').length ? $('.header_top_bg:not(.header_trans-fixed)').outerHeight() : 0,
            footerH = $('#footer:not(.fix-bottom)').length ? $('#footer:not(.fix-bottom)').outerHeight() : 0,
            sliderH = $(window).height() - (headerH + footerH);

        $('.portfolio-slider-wrapper.slider_simple .images-slider-wrapper .images-one').height(sliderH);
        $('.portfolio-slider-wrapper.slider_simple').height(sliderH);

        $('.main-header-testimonial.simpple .swiper-slide').css('height', 'auto').equalHeights();

        $('.line-of-images.logos2 a').css('height', 'auto').equalHeights();

        if ($(window).width() > 767) {
            $('.portfolio.grid .item.post-wrapper').css('height', 'auto').equalHeights();
            $('.portfolio.grid.masonry .item.post-wrapper').css('height', 'auto');
        } else {
            $('.portfolio.grid .item.post-wrapper').css('height', 'auto');
        }
    }
    portfolioSliderHeight();


    /**********************************/
    /* POPUP DETAILS */
    /**********************************/

    // popup form
    $(".popup-details").fancybox({
        arrows: true,
        loop: true
    });

    $('.gallery-item.slip:not(.modern)').parent().parent().sliphover({
        caption: 'data-content',
        target: '.info-content'
    });

    $('.gallery-item.slip.modern').parent().parent().sliphover({
        caption: 'alt',
        target: '.gallery-item img',
        withLink: true
    });

    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }


    $('.portfolio-load-more').on('click', function() {
        var count = $(this).data('num'),
            counter = 0;
        $(this).closest('.counter-wrap-port').find('.item-single:not(.count-show)').each(function() {
            if (counter < count) {
                $(this).addClass('count-show');
            }
            counter++;
        });
        if (!$(this).closest('.counter-wrap-port').find('.item-single:not(.count-show)').length) {
            $(this).hide();
        }

        initIsotop();

        event.preventDefault();
    });

    function load_more_portfolio() {
        // Load More Portfolio
        if (window.load_more_post) {

            var pageNum = parseInt(load_more_post.startPage) + 1;

            // The maximum number of pages the current query can return.
            var max = parseInt(load_more_post.maxPage);

            // The link of the next page of posts.
            var nextLink = load_more_post.nextLink;

            // wrapper selector
            var wrap_selector = '.portfolio .wpb_wrapper';

            //button click
            $('.load-more').on('click', function(e) {
                var $btn = $(this),
                    $btnText = $btn.html();
                $btn.html('loading...');
                if (pageNum <= max) {

                    var $container = $(wrap_selector);
                    $.ajax({
                        url: nextLink,
                        type: "get",
                        success: function(data) {

                            var newElements = $(data).find('.portfolio.l-more .item');
                            var elems = [];

                            newElements.each(function(i) {
                                elems.push(this);
                            });
                            $container.append(elems);
                            $container.find('img[data-lazy-src]').foxlazy();

                            wpc_add_img_bg('.s-img-switch');

                            portfolioColumns();
                            portfolioSpace();

                            $container.isotope('appended', $(elems));
                            $('img[data-lazy-src]').foxlazy();
                            pageNum++;
                            nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/' + pageNum);

                            $btn.html($btnText);

                            if (pageNum == (max + 1)) {
                                $btn.hide('fast');
                            }
                        }
                    });
                }
                return false;
            });
        }
    }

    if ($('.wpcf7-submit').length) {
        $('.wpcf7-submit').each(function() {
            if (!$(this).closest('#footer')) {
                $(this).wrap('<div class="a-btn-2 wpc-but"></div>');
            }
        });
    }

    if ($('.slider_classic').length) {
        $('.slider_classic').each(function() {
            $(this).closest('.vc_row').css('z-index', '500');
        })
    }
    $('.load-more').on("click", function() {
        var thisLink = $(this);

        thisLink.addClass('loading_img');
        var btn_loading = false;

        function customDelay() {
            $('.wpb_wrapper').find('.item').removeClass('classic_grid_hide');
            thisLink.closest('.portfolio').find('.wpb_wrapper').isotope('layout');
            $('.text-center').addClass('classic_grid_hide');
        }

        setTimeout(customDelay, 1000);
    });

    /*=================================*/
    /* SWIPER SLIDER */
    /*=================================*/
    function initSwiper3() {
        var initIterator = 0;
        $('.swiper3-container').each(function(index) {

            var $t = $(this);
            var index = 'swiper3-unique-id-' + initIterator;
            $t.addClass('swiper3-' + index + ' initialized').attr('id', index);
            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var effect = $t.attr('data-effect') ? $t.attr('data-effect') : 'slide';
            var loopVar = parseInt($t.attr('data-loop'), 10);
            var noSwipingVar = $t.attr('data-noSwiping');
            var mouse = parseInt($t.attr('data-mouse'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);
            var centerVar = parseInt($t.attr('data-center'), 10);
            var spaceBetweenVar = parseInt($t.attr('data-space'), 10);
            var slidesPerView = parseInt($t.attr('data-slidesPerView'), 10) ? parseInt($t.attr('data-slidesPerView'), 10) : 'auto';
            var breakpoints = {};

            if ($t.hasClass('swiper-album')) {
                breakpoints = {
                    480: {
                        slidesPerView: 1
                    },
                    767: {
                        slidesPerView: 3,
                        centeredSlides: false
                    },
                    991: {
                        slidesPerView: 4
                    },
                    1600: {
                        slidesPerView: 5
                    }
                };
            }

            if ($t.hasClass('showcase_slider')) {
                breakpoints = {
                    767: {
                        slidesPerView: 1
                    },
                    991: {
                        slidesPerView: 2,
                    },
                };
            }

            swipers3['swiper3-' + index] = new Swiper3($t, {
                pagination: '.swiper3-pagination',
                mode: mode || 'horizontal',
                slidesPerView: slidesPerView,
                breakpoints: breakpoints,
                centeredSlides: centerVar,
                noSwiping: noSwipingVar,
                paginationClickable: true,
                spaceBetween: spaceBetweenVar,
                containerModifierClass: 'swiper3-container-', // NEW
                slideClass: 'swiper3-slide',
                slideActiveClass: 'swiper3-slide-active',
                slideDuplicateActiveClass: 'swiper3-slide-duplicate-active',
                slideVisibleClass: 'swiper3-slide-visible',
                slideDuplicateClass: 'swiper3-slide-duplicate',
                slideNextClass: 'swiper3-slide-next',
                slideDuplicateNextClass: 'swiper3-slide-duplicate-next',
                slidePrevClass: 'swiper3-slide-prev',
                slideDuplicatePrevClass: 'swiper3-slide-duplicate-prev',
                wrapperClass: 'swiper3-wrapper',
                bulletClass: 'swiper3-pagination-bullet',
                bulletActiveClass: 'swiper3-pagination-bullet-active',
                buttonDisabledClass: 'swiper3-button-disabled',
                paginationCurrentClass: 'swiper3-pagination-current',
                paginationTotalClass: 'swiper3-pagination-total',
                paginationHiddenClass: 'swiper3-pagination-hidden',
                paginationProgressbarClass: 'swiper3-pagination-progressbar',
                paginationClickableClass: 'swiper3-pagination-clickable', // NEW
                paginationModifierClass: 'swiper3-pagination-', // NEW
                lazyLoadingClass: 'swiper3-lazy',
                lazyStatusLoadingClass: 'swiper3-lazy-loading',
                lazyStatusLoadedClass: 'swiper3-lazy-loaded',
                lazyPreloaderClass: 'swiper3-lazy-preloader',
                notificationClass: 'swiper3-notification',
                preloaderClass: 'preloader',
                zoomContainerClass: 'swiper3-zoom-container',
                loop: loopVar,
                speed: speedVar,
                autoplay: autoPlayVar,
                effect: effect,
                mousewheelControl: mouse,
                nextButton: '.swiper3-button-next',
                prevButton: '.swiper3-button-prev',
                lazyLoading: true,
                lazyLoadingInPrevNext: true,
                lazyLoadingInPrevNextAmount: 5,
            });

            initIterator++;
        });
    }

    $(window).on('load resize', function() {
        initSwiper3();
        fixedMobileMenu();
    });


    // SWIPER 3 - SPLIT SWIPER SHORTCODE

    var splitSwiper = new Swiper3('.swiper-container-split', {
        direction: 'vertical',
        speed: 1200,
        slidesPerView: 1,
        mousewheelControl: true,
        lazyLoading: true,
        lazyPreloaderClass: 'swiper3-lazy-preloader',
        lazyLoadingInPrevNext: true,
        lazyLoadingInPrevNextAmount: 5,
    });


    // SWIPER OUTER WRAPPER BACKGROUND ON SWIPE

    function changeBg() {
        if ($('.swiper-container-vert-slider .swiper-slide-active').attr('data-bg')) {
            var colorBg = $('.swiper-container-vert-slider .swiper-slide-active').attr('data-bg');
            $('.outer-swiper-wrapper .img-overlay').css("background-image", 'url(' + colorBg + ')');
        } else {
            var colorBg = $('.swiper-container-vert-slider .swiper-slide-active').css("background-image");
            $('.outer-swiper-wrapper .img-overlay').css("background-image", colorBg);
        }
    }

    var pageHeight = $(window).outerHeight();
    var headerHeight = $('.header_top_bg').outerHeight();

    function heightVerticalSlider() {
        var pageHeight = $(window).outerHeight();
        if ($('#wpadminbar').length) {
            pageHeight = $(window).outerHeight() - 32;
            $('.header_top_bg.fixed-header').css('top', '32px');

        }
        if ($('body').hasClass('static-menu')) {
            var headerHeight = 71;
        } else {
            var headerHeight = $('.header_top_bg').outerHeight();
        }
        $('.swiper-container-vert-slider').css("height", pageHeight - (headerHeight * 2));
        $('.outer-swiper-wrapper').css({
            "padding-top": headerHeight,
            "padding-bottom": headerHeight
        });
    }

    $(window).on('load resize', function() {
        changeBg();
        initSwiperVert();
        heightVerticalSlider();
        initSwiper();
    });

    // SWIPER 3 - HOME 9 - VERTICAL SLIDER SHORTCODE

    function initSwiperVert() {
        var elVertSwiper = $('.swiper-container-vert-slider');
        if ($('body').hasClass('static-menu')) {
            var headerHeight = 71;
        } else {
            var headerHeight = $('.header_top_bg').outerHeight();
        }
        if (elVertSwiper.length) {
            elVertSwiper.each(function() {
                var speed = parseInt($(this).attr('data-speed'));
                var autoplay = parseInt($(this).attr('data-autoplay'));
                var loop = parseInt($(this).attr('data-loop'));

                var vertSwiper = new Swiper3($(this), {
                    direction: 'vertical',
                    speed: speed,
                    autoplay: autoplay,
                    loop: loop,
                    height: pageHeight - (headerHeight * 2),
                    slidesPerView: 1,
                    lazyLoading: true,
                    lazyLoadingClass: 'swiper3-lazy',
                    lazyStatusLoadingClass: 'swiper3-lazy-loading',
                    lazyStatusLoadedClass: 'swiper3-lazy-loaded',
                    lazyPreloaderClass: 'swiper3-lazy-preloader',
                    lazyLoadingInPrevNext: true,
                    lazyLoadingInPrevNextAmount: 5,
                    mousewheelControl: true,
                    onInit: function() {
                        changeBg();
                    },
                    onSlideChangeEnd: function() {
                        changeBg();
                    },
                    nextButton: $(this).find('.swiper-button-next'),
                    prevButton: $(this).find('.swiper-button-prev')
                });
            })
        }
    }


    // WIDTH CALC - SWIPER 3 - SPLIT SWIPER SHORTCODE

    function widthSwiperSplit() {
        var containerWidth = $('.container').width();
        if ($('body').hasClass('static-menu')) {
            var widthResize = (($(document).outerWidth() - containerWidth) / 4);
        } else {
            var widthResize = (($(document).outerWidth() - containerWidth) / 2);
        }

        var widthColumn = containerWidth / 12;

        if ($('.slide-text').hasClass('slide-text-left')) {
            $('.slide-text-left .wrap-slide-text').css({
                'padding-left': widthResize,
                'padding-right': widthColumn
            });
        }

        if ($('.slide-text').hasClass('slide-text-right')) {
            $('.slide-text-right .wrap-slide-text').css({
                'padding-left': widthColumn,
                'padding-right': widthResize
            });
        }

        if ($('.fragment-text').hasClass('fragment-text-left')) {
            $('.fragment-text-left .wrap-frag-text').css({
                'padding-right': widthColumn
            });
        }

        if ($('.fragment-text').hasClass('fragment-text-right')) {
            $('.fragment-text-right .wrap-frag-text').css({
                'padding-left': widthColumn
            });
        }

        return widthResize;
    }

    $(window).on('load resize', function() {
        widthSwiperSplit();
    });


    // FRAGMENT SHORTCODE

    (function() {
        if (document.querySelectorAll('.fragment-img').length) {
            imagesLoaded(document.querySelectorAll('.fragment-img'), {
                background: true
            }, function() {

                // VAR ITEM
                var fragmentItemRight = $('.fragment-img.fragment-img--right');
                var fragmentItemLeft = $('.fragment-img.fragment-img--left');

                // DATA ATRIBEUT RIGHT ITEM
                var fragmentCountRight = parseInt($(fragmentItemRight).attr('data-fragment'));
                var fragmentParalaxRight = $(fragmentItemRight).attr('data-paralax');

                // DATA ATRIBEUT LEFT ITEM
                var fragmentCountLeft = parseInt($(fragmentItemLeft).attr('data-fragment'));
                var fragmentParalaxLeft = $(fragmentItemLeft).attr('data-paralax');

                // CREATE OBJECT
                document.querySelectorAll('.fragment-img').forEach(function(element) {

                    if (element.classList.contains('fragment-img--right')) {
                        new FragmentsFx(element, {
                            fragments: fragmentCountRight,
                            boundaries: {
                                x1: 100,
                                x2: 75,
                                y1: 50,
                                y2: 50
                            },
                            randomIntervals: {
                                top: {
                                    min: 0,
                                    max: 90
                                },
                                left: {
                                    min: 0,
                                    max: 90
                                },
                                dimension: {
                                    width: {
                                        min: 25,
                                        max: 50,
                                        fixedHeight: 10
                                    },
                                    height: {
                                        min: 15,
                                        max: 50,
                                        fixedWidth: 10
                                    }
                                }
                            },
                            parallax: fragmentParalaxRight
                        });
                    } else {
                        new FragmentsFx(element, {
                            fragments: fragmentCountLeft,
                            boundaries: {
                                x1: 50,
                                x2: 150,
                                y1: 0,
                                y2: 0
                            },
                            randomIntervals: {
                                top: {
                                    min: 0,
                                    max: 40
                                },
                                left: {
                                    min: 0,
                                    max: 90
                                },
                                dimension: {
                                    width: {
                                        min: 10,
                                        max: 50,
                                        fixedHeight: 0.5
                                    },
                                    height: {
                                        min: 5,
                                        max: 10,
                                        fixedWidth: 5
                                    }
                                }
                            },
                            parallax: fragmentParalaxLeft,
                            randomParallax: {
                                min: 30,
                                max: 150
                            }
                        });
                    }
                });
            });
        }
    })();

    $(window).on('load resize scroll', function() {
        if ($('.portfolio-pinterest').length) {
            $('.portfolio-pinterest a').not('.animated').each(function() {
                if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * 0.9) {
                    $(this).addClass('animated fadeInUp');
                }
            });
        }
    });

    $(window).on('load resize', function() {
        if ($('.pinterest.item-single a').length) {
            $('.pinterest.item-single a').not('.animated').each(function() {
                if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * 0.8) {
                    $(this).addClass('animated fadeInUp');
                }
            });
        }
    });


    $(window).on('scroll', function() {
        if ($('.pinterest.item-single a').length) {
            $('.pinterest.item-single a').not('.animated').each(function() {
                if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * 0.8) {
                    var self = $(this);
                    $(this).addClass('animated fadeInUp').parent().addClass('active');
                    setTimeout(function() {
                        self.parent().removeClass('active');
                    }, 1500);
                }
            });
        }
    });


    function playVideoOnMobile() {
        if (_ismobile !== null) {
            $('.iframe-video').each(function() {
                $(this).removeClass('play');
                $(this).find('.play-button').removeClass('start');
            })
        }
    }
    playVideoOnMobile();

    $('.iframe-video:not(.for-btn) .video-close-button').css('top', $('header').height() + 10);


    $('.dgwt-jg-item').on('click', function() {
        $('body').addClass('overflow-full');
    });

    $('.socials-mob-but').on('click', function(e) {
        if ($('.mob-nav.active').length) {
            $('.mob-nav').click();
        }
        $('#topmenu .f-right').toggleClass('active-socials');
        $('body').toggleClass('overflow-full');
        if ($('#topmenu .f-right.active-socials').length) {
            $('#topmenu').addClass('active-socials');
            $('.header_trans-fixed').addClass('open');
        } else {
            $('.header_trans-fixed').removeClass('open');

            setTimeout(function() {
                $('#topmenu').removeClass('active-socials');
            }, 350);
        }
        e.preventDefault();

    });

    function asideMenuStatic() {

        if ($('.aside-menu.static').length && $(window).width() > 991 && !$('body').hasClass('mob-main-menu')) {
            var logoHeight = $('.aside-menu .logo').outerHeight(),
                maxHeight = ($(window).height() - logoHeight - 80);
            $('#topmenu').css('padding-top', logoHeight);
            $('#topmenu ul.menu').css({
                'max-height': maxHeight
            });

            $(".aside-menu.static #topmenu ul").mCustomScrollbar({
                theme: "dark",
                preventDefault: true
            });
        } else if ($('.aside-menu.static').length && $(window).width() > 1024 && $('body').hasClass('mob-main-menu')) {
            var logoHeight = $('.aside-menu .logo').outerHeight(),
                maxHeight = ($(window).height() - logoHeight - 80);
            $('#topmenu').css('padding-top', logoHeight);
            $('#topmenu ul.menu').css({
                'max-height': maxHeight
            });

            $(".aside-menu.static #topmenu ul").mCustomScrollbar({
                theme: "dark",
                preventDefault: true
            });
        } else if ($('.aside-menu.static').length) {
            $(".aside-menu.static #topmenu ul").mCustomScrollbar("destroy");
            var maxH = $(window).height();
            $('#topmenu').css('max-height', '100vh');
            $('#topmenu').css('padding-top', '0');
            $('#topmenu ul.menu').css({
                'max-height': maxH
            });
        }
    }

    $(window).on('resize', function() {
        asideMenuStatic();
    });

    $(window).on('load', function() {
        asideMenuStatic();
    });


    $(window).on('load', function() {

        if ($('.mini_cart_item_thumbnail img').length) {

            var fixLazyImg = setInterval(function() {
                if ($('.mini_cart_item_thumbnail img').attr('src') == 'data:image/gif;base64,R0lGODdhAQABAIAAAAAAAMzMzCwAAAAAAQABAAACAkQBADs=') {
                    $('.mini_cart_item_thumbnail img').foxlazy();
                }
            }, 15);

            setTimeout(fixLazyImg, 5000);
        }

    });




    $('.tabs-header > .container > ul > li > a').on('hover', function(e) {
        e.preventDefault();
        if (!$(this).parent().hasClass('active')) {
            var index_el = $(this).parent().index();

            $(this).parent().addClass('active').siblings().removeClass('active');
            $(this).parent().closest('.tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');
        } else {
            return false
        }

    });

    function menuFull() {
        var menuH = $('.right-menu.full #topmenu .full-menu-wrap').outerHeight(),
            windowH = $(window).height(),
            menuT = windowH > menuH ? (windowH - menuH) / 2 : '0';
        $('.right-menu.full #topmenu .full-menu-wrap').css('top', menuT);
    }

    $(window).on('load resize', function() {
        menuFull()
    });

    /*=================================*/
    /* Home Full with */
    /*=================================*/
    (function($) {
        $(window).on('load', function() {
            $('.dgwt-jg-gallery:not(.gallery_masonry)').each(function() {
                var $gallery = $(this),
                    $item = $gallery.find('.dgwt-jg-item');
                if ($gallery.length > 0 && $item.length > 0) {
                    $gallery.lightGallery({
                        thumbnail: !0,
                        download: !1,
                        closable: !1
                    });
                    $item.children('img').each(function() {
                        if (typeof $(this).attr('srcset') !== 'undefined') {
                            $(this).attr('data-jg-srcset', $(this).attr('srcset'));
                            $(this).removeAttr('srcset')
                        }
                    });
                    $gallery.justifiedGallery({
                        lastRow: 'nojustify',
                        captions: !1,
                        margins: 3,
                        rowHeight: $gallery.data('height'),
                        maxRowHeight: 160,
                        thumbnailPath: function(currentPath, width, height, $image) {
                            if (typeof $image.data('jg-srcset') === 'undefined') {
                                return currentPath
                            }
                            var srcset = $image.data('jg-srcset');
                            if ($image.length > 0 && srcset.length > 0) {
                                var path, sizes = [],
                                    sizesTemp = [],
                                    urls = srcset.split(",");
                                return currentPath
                            } else {
                                return currentPath
                            }
                        }
                    }).on('jg.complete', function(e) {
                        $item.each(function() {
                            $(this).on('mouseenter mouseleave', function(e) {
                                var $this = $(this),
                                    width = $this.width(),
                                    height = $this.height();
                                var x = (e.pageX - $this.offset().left - (width / 2)) * (width > height ? (height / width) : 1),
                                    y = (e.pageY - $this.offset().top - (height / 2)) * (height > width ? (width / height) : 1);
                                var dir_num = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4,
                                    directions = ['top', 'right', 'bottom', 'left'];
                                if (e.type === 'mouseenter') {
                                    $this.removeClass(function(index, css) {
                                        return (css.match(/(^|\s)hover-out-\S+/g) || []).join(' ')
                                    });
                                    $this.addClass('hover-in-' + directions[dir_num])
                                }
                                if (e.type === 'mouseleave') {
                                    $this.removeClass(function(index, css) {
                                        return (css.match(/(^|\s)hover-in-\S+/g) || []).join(' ')
                                    });
                                    $this.addClass('hover-out-' + directions[dir_num])
                                }
                            })
                        })
                    })
                }
            })
        })
    }(jQuery))
    /*=================================*/
    /* menu*/
    /*=================================*/
    $(".mob-nav").on("click", function() {
        $('.topmenu').removeClass('active-socials');
    });
    /*=================================*/
    /* melisas-eyes */
    /*=================================*/

    $(".description_tab").on("click", function() {
        $('.woocommerce-Tabs-panel').addClass('hide_info');
        $('#tab-description').removeClass('hide_info');
        $('.wc-tabs li').removeClass('active');
        $(this).addClass('active');
    });
    $(".additional_information_tab").on("click", function() {
        $('.woocommerce-Tabs-panel').addClass('hide_info');
        $('#tab-additional_information').removeClass('hide_info');
        $('.wc-tabs li').removeClass('active');
        $(this).addClass('active');
    });
    $(".reviews_tab").on("click", function() {
        $('.woocommerce-Tabs-panel').addClass('hide_info');
        $('#tab-reviews').removeClass('hide_info');
        $('.wc-tabs li').removeClass('active');
        $(this).addClass('active');
    });

    $(".value label").on("click", function() {
        $('.all_price').html($(this).data("price"));
    })


})(jQuery, window, document);