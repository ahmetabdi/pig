function callPlayer(a, b, c) {
    function d(a, b) {
        var c = a ? window.addEventListener : window.removeEventListener;
        c ? c("message", b, !1) : (a ? window.attachEvent : window.detachEvent)("onmessage", b)
    }
    window.jQuery && a instanceof jQuery && (a = a.get(0).id);
    var e = document.getElementById(a);
    e && "IFRAME" != e.tagName.toUpperCase() && (e = e.getElementsByTagName("iframe")[0]), callPlayer.queue || (callPlayer.queue = {});
    var f = callPlayer.queue[a],
        g = "complete" == document.readyState;
    if (g && !e) f && clearInterval(f.poller);
    else if ("listening" === b) e && e.contentWindow && (b = '{"event":"listening","id":' + JSON.stringify("" + a) + "}", e.contentWindow.postMessage(b, "*"));
    else if (g && (!e || e.contentWindow && (!f || f.ready)) && (f && f.ready || "function" != typeof b)) {
        if (e && e.contentWindow) {
            if (b.call) return b();
            e.contentWindow.postMessage(JSON.stringify({
                event: "command",
                func: b,
                args: c || [],
                id: a
            }), "*")
        }
    } else f || (f = callPlayer.queue[a] = []), f.push([b, c]), "poller" in f || (f.poller = setInterval(function() {
        callPlayer(a, "listening")
    }, 250), d(1, function h(b) {
        if (!e) {
            if (e = document.getElementById(a), !e) return;
            if ("IFRAME" != e.tagName.toUpperCase() && (e = e.getElementsByTagName("iframe")[0], !e)) return
        }
        if (b.source === e.contentWindow)
            for (clearInterval(f.poller), f.ready = !0, d(0, h); tmp = f.shift();) callPlayer(a, tmp[0], tmp[1])
    }, !1))
}

function share(a, b) {
    var c = "";
    switch (b) {
        case "reddit-share":
            return c = "http://www.reddit.com/submit?url=" + a, void window.open(c, "_blank");
        case "google-plus-share":
            c = "https://plus.google.com/share?url=" + a;
            break;
        case "twitter-share":
            c = "https://twitter.com/intent/tweet?text=" + a;
            break;
        case "facebook-share":
            c = "https://www.facebook.com/sharer/sharer.php?u=" + a
    }
    var d = "500",
        e = "480",
        f = screen.width / 2 - d / 2,
        g = screen.height / 2 - e / 2;
    window.open(c, "bns-share", "height=" + e + ",width=" + d + ", top=" + g + ", left=" + f + ", toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no")
}
var factions = function() {
        $("div.emblem").click(function() {
            $(this).parents("div#factions-wrapper").addClass("chosenFaction"), $(this).parents("div.faction").addClass("currentFaction")
        }), $(".close").click(function() {
            $(this).parents("div.faction").removeClass("currentFaction"), $(this).parents("div#factions-wrapper").removeClass("chosenFaction")
        }), $(".expand").click(function() {
            $("div.faction").toggleClass("currentFaction"), $("html, body").animate({
                scrollTop: 0
            }, "slow")
        }), $(window).bind("scroll", function() {
            var a = $(".currentFaction").height(),
                b = $("#footer-subscribe").height(),
                c = a - b;
            $(window).scrollTop() > c ? $(".expand").addClass("stopStick") : $(".expand").removeClass("stopStick")
        })
    }(),
    pathArray = window.location.pathname.split("/"),
    loc = pathArray[1];
void 0 == loc && (loc = ""), "" != loc && $("#current-loc").addClass(loc);
var $locMenu = $("#footer-loc-menu");
$locMenu.append($locMenu.find("." + loc));
var languageText = $locMenu.children().last().find("a").html();
$locMenu.children().last().find("a").html(languageText + '<i class="fa fa-caret-up"></i>'), $locMenu.children("li").click(function() {
        $this.children("a").trigger("click")
    }), $(".loc-dropdown dt a").click(function(a) {
        $(".loc-dropdown dd ul").toggle(), a.preventDefault();
        var b = $(a.target);
        b.parents().hasClass("loc-dropdown") || $(".loc-dropdown dd ul").hide(), $(".loc-dropdown dt").show()
    }), $(".loc-dropdown dd ul").mouseleave(function() {
        $(this).hide()
    }), $(".loc-dropdown dd ul li a").click(function() {
        var a = $(this).html();
        $(".loc-dropdown dt a span").html(a), $(".loc-dropdown dd ul").hide(), $(".fa-caret-up").hide()
    }),

    (jQuery, window, window.document), $(function() {
        function a() {
            $(d).each(function(a) {
                var c = $(this).offset().top,
                    d = $(this).height(),
                    e = $(window).scrollTop(),
                    f = $(this).attr("id"),
                    g = 100,
                    h = $(".floating-nav").find("ul a[href=#" + f + "]");
                e >= c - g && c + d - g > e && (b(h.attr("href")), $(".floating-nav").find("li").removeClass("active"), h.parent("li").addClass("active"))
            })
        }

        function b(a) {
            var b = "#hero-banner";
            a === b ? $(".floating-nav").removeClass("show-for-xlarge-up").hide() : $(".floating-nav").addClass("show-for-xlarge-up").show()
        }
        var c = ".game-info-nav .game-info-link, .races-nav .race-link a, #hero-gon, #hero-lyn, #hero-yun, #hero-jin";
        $(c).click(function(a) {
            a.preventDefault();
            var b = $(this),
                c = 500,
                d = "easeInOutQuad",
                e = b.attr("href"),
                f = $(e).offset().top,
                g = $("body, html").is(":animated");
            g || $("body, html").animate({
                scrollTop: f
            }, c, d)
        });
        var d = ".game-info-section, .class-section, .race-section, #hero-banner";
        $(window).scroll(function() {
            a()
        }), $(window).resize(function() {
            a()
        }), a()
    }), $(document).on("opened.fndtn.reveal", "#home-banner-video", function() {
        callPlayer("fullVideo", "playVideo"), $("#bgvid").get(0).pause()
    }), $(document).on("close.fndtn.reveal", "#home-banner-video", function() {
        callPlayer("fullVideo", "pauseVideo"), $("#bgvid").get(0).play()
    }), $(function() {
        var a = $(window).width(),
            b = '<div id="bgvid"></div>';
        a > 735 && (b = '<video autoplay loop muted id="bgvid" poster="/img/video_static/trailer_2_static.jpg"><source src="http://static.bladeandsoul.com/video/trailer_2_15_second.ogv" type="video/ogv"><source src="http://static.bladeandsoul.com/video/trailer_2_15_second.webm" type="video/webm"><source src="http://static.bladeandsoul.com/video/trailer_2_15_second.mp4" type="video/mp4"></video>'), $("#hero.hero-banner .videoBanner").prepend(b)
    }), $(function() {
        var a = "#home-page #hero-banner-carousel";

    }), $(function() {
        var a = "#home-page .races-slider .races-slides, #home-page .classes-slider .classes-slides";

    }), $(function() {
        function a(a) {
            $(j).hide().removeClass("animated slideInLeft"), $(".races ." + a + "-copy").show().addClass("animated slideInLeft"), j = ".races ." + a + "-copy"
        }

        function b(a, b) {
            var c = g,
                d = b || !1;
            "yun" === a && (c = "female");
            var e = ".race-preview." + a + "-" + c;
            $(".race-preview").hide().removeClass("animated fadeInRight"), d ? $(e).show().addClass("animated fadeInRight") : $(e).show().addClass("animated fadeInRight"), $(".male-female-selection li").removeClass(h), $("." + a + "-copy .male-female-selection li." + c).addClass(h)
        }

        function c(a) {
            $(n).hide().removeClass("animated fadeInRight"), $(".classes ." + a + "-copy").show().addClass("animated fadeInRight"), n = "." + a + "-copy"
        }

        function d(a) {
            var b = ".class-" + a;
            $(".preview").hide().removeClass("animated fadeInLeft"), $(b).show().addClass("animated fadeInLeft")
        }
        var e = "gon",
            f = "male",
            g = f,
            h = "active-gender",
            i = ["gon", "jin", "yun", "lyn"],
            j = "",
            k = null;
        $(".home-what-race-link").click(function() {
            var c = $(this);
            k = c.attr("class").split(" ")[1], a(k), b(k)
        }), $(".race-selection").on("click", "li", function() {
            $(".race-selection li.active").removeClass("active"), $(this).addClass("active")
        }), $(".races-slides .slick-dots li").click(function() {
            var a = $(this).index();
            k = i[a], b(k)
        }), $("#home-page .races-slider .races-slides").on("swipe", function(a, c, d) {
            k = $(this).find(".slick-active").attr("class").split(" ")[2], b(k)
        }), $(".male-female-selection li").click(function() {
            var a = $(this).hasClass(h);
            a || (g = $(this).attr("class"), b(k, !0))
        });
        var l = ["blademaster", "destroyer", "summoner", "forcemaster", "kungfumaster", "assassin", "bladedancer"],
            m = "blademaster",
            n = "";
        $(".class-icon").click(function() {
            var a = $(this),
                b = a.attr("class").split(" ")[1];
            c(b), d(b), $(".class-icon.active").removeClass("active"), $(this).addClass("active")
        }), $(".classes-slides .slick-dots li").click(function() {
            var a = $(this).index(),
                b = l[a];
            d(b)
        }), $("#home-page .classes-slider .classes-slides").on("swipe", function(a, b, c) {
            var e = b.currentSlide,
                f = l[e];
            d(f)
        });
    })

$(function() {
        function a(a, b) {
            var c = $(".character." + a + "-character-" + b);
            $(".race-section." + a + " .character").hide().removeClass("animated fadeInLeft"), c.show().addClass("animated fadeInLeft"), $(".male-female-selection li").removeClass("active-gender"), $(".race-section." + a + " .male-female-selection li." + b).addClass("active-gender")
        }
        $(".gon-character-female, .lyn-character-female, .jin-character-female").hide(), $(".male-female-selection li").click(function() {
            var b = $(this).attr("class").split(" ")[0],
                c = $(this).closest(".race-section").attr("class").split(" ")[1];
            a(c, b)
        }), $("#game-races-page #hero-banner a").on("mouseover", function() {
            var a = $(this).attr("href");
            $('a[href="' + a + '"]').each(function() {
                var a = $(this).has(".races-hero").length ? $(this).find(".races-hero") : $(this);
                a.addClass("hovering")
            })
        }), $("#game-races-page #hero-banner a").on("mouseout", function() {
            var a = $(this).attr("href");
            $('a[href="' + a + '"]').each(function() {
                var a = $(this).has(".races-hero").length ? $(this).find(".races-hero") : $(this);
                a.removeClass("hovering")
            })
        })
    }), $(function() {
        function a(a, b) {
            $.ajax({
                url: "//rest.bladeandsoul.com/beta/signup",
                crossDomain: !0,
                dataType: "json",
                data: {
                    email: a,
                    lang: b
                },
                success: function(a, b, c) {
                    if ("error" === a.status) {
                        a.message;
                        $("#subscribe-msg").removeClass().addClass("on-error").html(a.message)
                    } else "success" === a.status && ($("#newsletter-confirmation-sent").foundation("reveal", "open"), "undefined" != typeof $.fn.ncsCustomEventTracker && $(document).ncsVirtualPageTracker({
                        virtualPageUrl: "cbt/success"
                    }), "undefined" != typeof versaTagObj && versaTagObj.generateRequest(window.top.location.href + "CBT-Confirm"))
                }
            })
        }
        if ($("body").hasClass("cbt")) {
            var b = $("body").data("lang"),
                c = window.location.pathname.split("/"),
                d = c[1];
            void 0 == d && (d = ""), "" != d && $("select#subscriber-lang").val(d), $("#submit-subscription").click(function(b) {
                b.preventDefault();
                var c = $("#subscriber-email").val(),
                    d = $("#subscriber-lang").val();
                return "undefined" != typeof versaTagObj && versaTagObj.generateRequest(window.top.location.href + "CBT-Submit"), a(c, d), !1
            }), $("a.signup-beta, div.signup-beta").click(function() {
                "undefined" != typeof $.fn.ncsCustomEventTracker && $(document).ncsVirtualPageTracker({
                    virtualPageUrl: b + "/cbt/signup"
                }), "undefined" != typeof versaTagObj && versaTagObj.generateRequest(window.top.location.href + "CBT-SignUp")
            }), $("#signup-beta-form").bind("opened", function() {
                $(".age-gate-form").length ? $(".agegate-month").focus() : $("#subscriber-email").focus()
            }), $(document).keyup(function(a) {
                var b = a.keyCode ? a.keyCode : a.which;
                13 == b && $("#signup-beta-form").hasClass("open") && $("#submit-subscription").click()
            }), $(document).foundation("reveal", "reflow")
        }
    }), $(function() {
        var a = {
            lang: $("body").data("lang"),
            pageId: "signup-landing-page",
            _signupBar: function() {
                var a = ".landing-page-main-button",
                    b = "#top-peek-nav",
                    c = "#footer-subscribe .copy",
                    d = $(window).scrollTop(),
                    e = $(a).offset().top + $(a).height(),
                    f = $(c).offset().top;
                d >= e && d + $(window).height() <= f ? $(b).addClass("show") : $(b).removeClass("show")
            },
            _scrollMagic: function() {
                var a = new ScrollMagic.Controller({
                    globalSceneOptions: {
                        triggerHook: "onEnter",
                        duration: "200%"
                    }
                });
                (new ScrollMagic.Scene).setTween("#landing-header > .layer-back", {
                    y: "-40%",
                    ease: Linear.easeNone
                }).addTo(a), (new ScrollMagic.Scene).setTween("#landing-header > .layer-mid", {
                    y: "-50%",
                    ease: Linear.easeNone
                }).addTo(a), (new ScrollMagic.Scene).setTween("#character-container > .left-back", {
                    y: "-40%",
                    ease: Linear.easeNone
                }).addTo(a), (new ScrollMagic.Scene).setTween("#character-container > .left-front", {
                    y: "10%",
                    ease: Linear.easeNone
                }).addTo(a), (new ScrollMagic.Scene).setTween("#character-container > .right-back", {
                    y: "-40%",
                    ease: Linear.easeNone
                }).addTo(a), (new ScrollMagic.Scene).setTween("#character-container > .right-front", {
                    y: "10%",
                    ease: Linear.easeNone
                }).addTo(a), (new ScrollMagic.Scene).setTween("#character-container > .single-front", {
                    y: "10%",
                    ease: Linear.easeNone
                }).addTo(a)
            },
            _animateHeaderAnimation: function() {
                var a = $("#landing-header");
                a.addClass("show-intro")
            },
            _animateBodyText: function(a) {
                a += $(window).height() / 2;
                var b = $("#story-content").offset().top,
                    c = $("#classes-content").offset().top,
                    d = $("#combat-content").offset().top,
                    e = $("#windwalking-content").offset().top,
                    f = $("#arena-content").offset().top;
                a >= b && c > a && $("#story-content").addClass("show-text"), a >= c && d > a && $("#classes-content").addClass("show-text"), a >= d && e > a && $("#combat-content").addClass("show-text"), a >= e && f > a && $("#windwalking-content").addClass("show-text"), a >= f && $("#arena-content").addClass("show-text")
            },
            _videoTrailerGA: function() {
                var a = this.lang;
                "undefined" != typeof $.fn.ncsCustomEventTracker && $(".show-trailer-link").click(function() {
                    $(document).ncsVirtualPageTracker({
                        virtualPageUrl: a + "/cbtlanding/watchtrailer"
                    })
                })
            },
            _initPage: function() {
                var a = this,
                    b = window.matchMedia("only screen and (max-width: 760px)"),
                    c = $(window).scrollTop();
                $(window).scroll(function() {
                    c = $(this).scrollTop(), a._signupBar(), a._animateBodyText(c)
                }), this._signupBar(), this._animateBodyText(c);
                var d = 250,
                    e = setTimeout(function() {
                        a._animateHeaderAnimation(), clearTimeout(e)
                    }, d);
                Modernizr.touch || b.matches || this._scrollMagic(), this._videoTrailerGA(), $(document).foundation("reveal", "reflow")
            },
            initialization: function() {
                var a = $("#" + this.pageId).length > 0;
                a && this._initPage()
            }
        };
        a.initialization()
    }), $(function() {
        function a(a, b, c, d, e) {
            $.ajax({
                url: "http://rest.bladeandsoul.com/newsletter/subscribe",
                crossDomain: !0,
                dataType: "jsonp",
                data: {
                    email: a,
                    lang: b,
                    day: c,
                    month: d,
                    year: e
                },
                success: function(b, c, d) {
                    if (console.log(b), "error" === b.status) {
                        b.message;
                        $("#subscribe-msg").removeClass().addClass("on-error").html(b.message)
                    } else "success" === b.status && ($("#newsletter-confirmation-sent .submitted-email").text(a), $("#newsletter-confirmation-sent").foundation("reveal", "open"), versaTagObj && versaTagObj.generateRequest(window.location.href + "thankyou"), "undefined" != typeof $.fn.ncsCustomEventTracker && $(document).ncsVirtualPageTracker({
                        virtualPageUrl: "newsletter/submit"
                    }))
                }
            })
        }

        function b(a) {
            if (a) var b = 500,
                c = setTimeout(function() {
                    $("#subscriber-email").val(""), $("#subscribe-msg").removeClass().html(""), clearTimeout(c)
                }, b);
            else $("#subscriber-email").val(""), $("#subscribe-msg").removeClass().html("")
        }

        function c(a) {
            a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var b = new RegExp("[\\?&]" + a + "=([^&#]*)"),
                c = b.exec(location.search);
            return null === c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
        }
        var d = $("body").attr("data-lang");
        if ($("#subscriber-lang ." + d).attr("selected", "selected"), $(document).on("click", "#submit-subscription", function() {
                var b = $("#subscriber-email").val(),
                    c = $("#subscriber-lang").val();
                uDay = "20", uMonth = "7", uYear = "1980", a(b, c, uDay, uMonth, uYear), $(".subscribe p span").text(b)
            }), $("#newsletter-subscribe-form .close-reveal-modal").click(function() {
                b(!0)
            }), $(document).on("click", '[data-reveal-id="newsletter-subscribe-form"]', function() {
                var a = $(this).attr("data-reveal-id"),
                    b = $("#" + a);
                b.find("#subscriber-email").focus(), "undefined" != typeof $.fn.ncsCustomEventTracker && $(document).ncsVirtualPageTracker({
                    virtualPageUrl: "newsletter/open"
                })
            }), $("#subscriber-email").bind("keypress", function(a) {
                13 == a.keyCode && a.preventDefault()
            }), "confirmed" == c("newsletter")) {
            var e = '<script type="text/javascript">/* <![CDATA[ */var google_conversion_id = 958902494;var google_conversion_language = "en";var google_conversion_format = "3";var google_conversion_color = "ffffff";var google_conversion_label = "Gh61CNaGsVwQztmbxgM";var google_remarketing_only = false;/* ]]> */</script><noscript><div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/958902494/?label=Gh61CNaGsVwQztmbxgM&amp;guid=ON&amp;script=0"/></div></noscript>';
            $("body").append(e), versaTagObj && versaTagObj.generateRequest(window.location.href + "confirm")
        }
    }),
    function(a) {
        function b() {
            var b = a(window).scrollTop(),
                c = 33;
            c >= b ? a(".toggle-topbar, #main-nav").removeClass("sticky") : a(".toggle-topbar, #main-nav").addClass("sticky")
        }
        var c = function() {
            var b = 15;
            a(window).width() + b < 1024 ? a(".top-bar").addClass("mobile").removeClass("desktop") : a(".top-bar").removeClass("mobile").addClass("desktop")
        };
        a(window).resize(function() {
            c()
        }), c(), a(".mobile .has-dropdown label").on("click", function() {
            a(this).siblings(".sub-menu").slideToggle()
        }), a(".toggle-topbar").on("click", function() {
            var b = a(this).closest(".top-bar");
            b.toggleClass("expanded"), b.hasClass("expanded") ? a("#main-nav .main-logo").addClass("open") : a("#main-nav .main-logo").removeClass("open")
        }), a(window).scroll(b), b()
    }(jQuery);
