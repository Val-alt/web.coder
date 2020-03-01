"use strict";

var App = {
  options: {},
  init: function init() {
    this.owlCarousel(), this.select();
  },
  owlCarousel: function owlCarousel() {
    $(".owl-carousel").owlCarousel({
      loop: !0,
      margin: 0,
      nav: !1,
      responsive: {
        0: {
          items: 1
        }
      }
    });
  },
  select: function select() {
    var e = 1,
        t = {
      january: [0, 31],
      february: [1, 28],
      march: [2, 31],
      april: [3, 30],
      may: [4, 31],
      june: [5, 30],
      july: [6, 31],
      august: [7, 31],
      september: [8, 30],
      october: [9, 31],
      november: [10, 30],
      december: [11, 31]
    };

    function a(e, a) {
      var l = $("[data-name='date'] .select__title"),
          n = $("[data-name='date'] .input_hidden").val();
      l.html() > t[e][1] && l.html(t[e][1]), t.february = !0 === a ? 29 : 28, $('[data-name="date"]').find(".select__list").children().remove();

      for (var _a = 1; _a <= t[e][1]; _a++) {
        $('[data-name="date"]').find(".select__list").append("<li data-select='" + _a + "'>" + _a + "</li>");
      }

      "" != n ? $("[data-select='" + n + "']").addClass("active") : $("[data-select='1']").addClass("active");
    }

    var l, n;
    !function () {
      var e = new Date();

      for (var _t = 1940; _t <= e.getFullYear(); _t++) {
        $('[data-name="year"]').find(".select__list").append("<li data-select='" + _t + "'>" + _t + "</li>");
      }

      $("[data-select='1999']").addClass("active");
    }(), function () {
      for (var _e in t) {
        $('[data-name="month"]').find(".select__list").append("<li data-select='" + _e + "'>" + _e + "</li>");
      }

      $("[data-select='january']").addClass("active"), a("january");
    }(), $(".select").click(function (l) {
      var n = l.target.parentElement,
          s = $(n).find(".select__list"),
          i = $(n).find(".select__title");
      $(s).toggle(), $(i).toggleClass("select__title--open"), $(document).mouseup(function (e) {
        $(n).is(e.target) || $(i).is(e.target) || ($(s).hide(), $(i).removeClass("select__title--open"));
      }), $(".select__list li").click(function (l) {
        var n = $("[data-name='year'] .select__title").html(),
            s = $("[data-name='date'] .select__title").html(),
            i = $("[data-name='month'] .select__title").html(),
            d = l.target,
            c = $(d).parent(),
            r = $(c).parent().find(".input_hidden"),
            o = $(c).parent().find(".select__title"),
            m = d.dataset.select;
        r.val(m), $(o).html(m).css("color", "#000").addClass("check"), 0 === e ? (e = 1, $(l.target).addClass("active")) : ($(c).children().removeClass("active"), $(l.target).addClass("active")), "month" === $(c).parent().attr("data-name") && a(m, (n = n) % 400 == 0 || n % 4 == 0 && n % 100 != 0);

        var _ = new Date(n, t[i][0], s);

        s = _, ((new Date().getTime() - new Date(s)) / 315576e5 | 0) >= 18 && console.log("+");
      });
    });
  }
};
$(document).ready(function () {
  App.init();
});