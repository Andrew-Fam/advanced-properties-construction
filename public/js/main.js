function initializeMap() {
                var map_canvas = document.getElementById('map_canvas');
                var mapOptions = {
                    center: new google.maps.LatLng(-37.765813,144.925375),
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false
                }
                var map = new google.maps.Map(map_canvas,mapOptions);
                // Creating a marker and positioning it on the map    
                var marker = new google.maps.Marker({    
                    position: new google.maps.LatLng(-37.765813,144.925375),    
                    map: map    
                })
                $(window).resize(function(){
                    window.setTimeout(function(){
                        console.log('yeah');
                        map.setCenter(marker.getPosition());
                    },400);
                });
                map.set('styles', [
                    {
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.business",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.business",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.place_of_worship",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.place_of_worship",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "saturation": 50
                            },
                            {
                                "gamma": 0
                            },
                            {
                                "hue": "#50a5d1"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.neighborhood",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#333333"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "weight": 0.5
                            },
                            {
                                "color": "#333333"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "gamma": 1
                            },
                            {
                                "saturation": 50
                            }
                        ]
                    }
                ]);
            }

            $(document).ready(function () {
                var blurOverlay = $('.blur-overlay');
                var hero = $('.hero');
                var background = $('.hero .background-image');
                var heroHeight = hero.outerHeight();
                var opacityVal = 0;
                var heroText = $('.hero-text');
                var divider = $('.divider');
                var bottom = parseInt(divider.css('bottom').replace("px",""));
                var bigAlbumImg = $('.property-album .big-image img');
                if(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/webOS/i)){
                        
                } 
                var scrollHandler = function (){
                    var s = $(window).scrollTop();
                    if(s<=heroHeight*4){
                        opacityVal = (s / heroHeight*4);
                        textOpacity = (s / heroHeight*0.7);
                        blurOverlay.css('opacity',opacityVal).css('-ms-filter','progid:DXImageTransform.Microsoft.Alpha(Opacity='+(opacityVal*100)+')').css('filter','alpha(opacity='+opacityVal+')').css('-moz-opacity',opacityVal).css('-khtml-opacity',opacityVal);
                       
                        if(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/webOS/i)){

                        } else {
                            heroText.css('opacity',1-textOpacity).css('-ms-filter','progid:DXImageTransform.Microsoft.Alpha(Opacity='+((1-textOpacity)*100)+')').css('filter','alpha(opacity='+1-textOpacity+')').css('-moz-opacity',1-textOpacity).css('-khtml-opacity',1-textOpacity);
                            heroText.css('margin-top',-(s/1.6));
                            divider.css('bottom',bottom+(s));
                        }
                    }
                };   

                $(window).scroll(scrollHandler);
                /* iOS scroll event */
                document.addEventListener("touchstart",scrollHandler,false);
                document.addEventListener("touchmove",scrollHandler,false);
                document.addEventListener("touchend",scrollHandler,false);



                $("#category-selector .category").click(function(){
                    var target = $(this).data('toggle');
                   
                    showPropertiesCollection();

                    $(target+' .lazy-img').each(function(){
                        $(this).attr('src',$(this).data('src'));
                    });
                   
                    $(this).addClass('selected');
                   
                    $(target).removeClass('fadeOutRight hide').addClass('show animated fadeInDown');
                    
                });

                $("#category-selector-expand, .gallery-collapse").click(function(){
                    showCategory();
                });

                $(".gallery-collapse").click(function(){
                    showCategory();
                });


                // click handler for property links

                $(".collection ul li a").click(function (){
                    var target = $(this).data('toggle');
                    $(target).initAlbum();
                });

                //click handler for back button on album view

                $("#back-to-category").click(function (){
                    exitPropertyAlbum();
                });

                // click handler for see more houses 

                $("#see-more-houses").click(function (){
                    exitPropertyAlbum();
                    showCategory();
                    
                });


                // get hash link to open gallery

                var hash = window.location.hash.replace('#', '');

                if(hash!= undefined && hash!="") {
                    var target = "#"+hash;

                    $(target).initAlbum();
                    console.log('hahhahaha');
                    console.log($(window).scrollTop());
                    $(window).scrollTop(0);
                }

                $(window).load(function(e) {
                    e.preventDefault();
                    if(window.location.hash && window.location.pathname=="/gallery") {
                        $(window).scrollTop(0);
                    }
                });
            });

            $.fn.initAlbum = function () {
                //lazy load all images in album
                var album = $(this);
                var bigImageDisplay = album.parent().find(".big-image");
                var categoryNav = $(".category-nav");
                var collection = $(".collection");
                var thumbs = $(album.find(".thumb"));
               
                thumbs.each(function(){
                    $(this).click(function(){
                        bigImageDisplay.css('background-image',"url('"+$(this).attr('src')+"')");
                    })
                    $(this).attr('src',$(this).data('src'));
                });
                bigImageDisplay.css('background-image',"url('"+thumbs.eq(0).data('src')+"')");
                showPropertyAlbum();
                album.addClass('shown').removeClass('hide');
            }


            function showPropertyAlbum() {
                var categoryNav = $(".category-nav");
                var gallery = $(".gallery");
                var album = $(".property-album");
                var hero = $(".hero");
                $(".property").addClass('hide');
                categoryNav.addClass('collapse');
                gallery.addClass('hide')
                album.addClass('shown');
                hero.addClass('truncated');
                $("#category-selector").addClass('hide');
                $(".gallery-collapse").removeClass('shown');
                $(document).scrollTop(0);
            }
            
            function exitPropertyAlbum() {
                var categoryNav = $(".category-nav");
                var gallery = $(".gallery");
                var album = $(".property-album");
                var hero = $(".hero");
                categoryNav.removeClass('collapse');
                gallery.removeClass('hide')
                album.removeClass('shown');
                hero.removeClass('truncated');
                $("#category-selector").removeClass('hide');
                $(".gallery-collapse").addClass('shown');
                $('html, body').animate({
                    scrollTop: $(".gallery").offset().top
                }, 0);
            }

            function showPropertiesCollection() {
                $("#category-selector .category").removeClass('selected');
                $("#category-selector").addClass('collapse');
                $(".category-nav").addClass('minimize');
                $(".collection").removeClass('fadeInDown').addClass('fadeOutRight hide');
                $(".gallery-collapse").addClass('shown');
                $(".property-album").removeClass('shown');
                $('html, body').animate({
                    scrollTop: $(".property-album").offset().top
                }, 0);
            }

            function showCategory() {
                
                var categoryNav = $(".category-nav");
                var collection = $(".collection");
                var album = $(".property-album");

                // show category section 

                categoryNav.removeClass('minimize');
                $("#category-selector").removeClass('collapse').removeClass('hide');

                // hide properties collection section

                collection.addClass('hide');

                // hide property album section 

                album.removeClass("shown");

                // hide gallery collapse button 

                $(".gallery-collapse").removeClass('shown');
                $('html, body').animate({
                    scrollTop: $(".category").offset().top
                }, 0);
            }
            google.maps.event.addDomListener(window, 'load', initializeMap);