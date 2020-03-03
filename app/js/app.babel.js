"use strict";

var App = {
  options: {},
  init: function init() {
    this.owlCarousel(), this.select(), this.progressCircle(), this.RangeSlider();
  },
  owlCarousel: function owlCarousel() {
    $(".register-form__carousel").owlCarousel({
      autoplayTimeout: 3e3,
      autoplay: !0,
      loop: !0,
      margin: 0,
      nav: !1,
      responsive: {
        0: {
          items: 1
        }
      }
    }), $(".users__carousel").owlCarousel({
      autoplayTimeout: 4e3,
      loop: !0,
      margin: 10,
      nav: !0,
      navText: "",
      dots: !1,
      responsive: {
        400: {
          items: 3
        },
        700: {
          items: 5
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

    function a(e) {
      return e % 400 == 0 || e % 4 == 0 && e % 100 != 0;
    }

    function l(e, a) {
      var l = $("[data-name='date'] .select__title"),
          n = $("[data-name='date'] .input_hidden").val();
      l.html() > t[e][1] && l.html(t[e][1]), t.february[1] = !0 === a ? 29 : 28, $('[data-name="date"]').find(".select__list").children().remove();

      for (var _a = 1; _a <= t[e][1]; _a++) {
        $('[data-name="date"]').find(".select__list").append("<li data-select='" + _a + "'>" + _a + "</li>");
      }

      "" != n ? $("[data-select='" + n + "']").addClass("active") : $("[data-select='1']").addClass("active");
    }

    var n;
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

      $("[data-select='january']").addClass("active"), l("january");
    }(), $(".select").click(function (n) {
      var r = n.target.parentElement,
          s = $(r).find(".select__list"),
          i = $(r).find(".select__title");
      $(s).toggle(), $(i).toggleClass("select__title--open"), $(document).mouseup(function (e) {
        $(r).is(e.target) || $(i).is(e.target) || ($(s).hide(), $(i).removeClass("select__title--open"));
      }), $(".select__list li").click(function (n) {
        var r = $("[data-name='year'] .select__title").html(),
            s = $("[data-name='date'] .select__title").html(),
            i = $("[data-name='month'] .select__title").html(),
            o = n.target,
            c = $(o).parent(),
            d = $(c).parent().find(".input_hidden"),
            u = $(c).parent().find(".select__title"),
            m = o.dataset.select;
        d.val(m), $(u).html(m).css("color", "#000").addClass("check"), 0 === e ? (e = 1, $(n.target).addClass("active")) : ($(c).children().removeClass("active"), $(n.target).addClass("active")), "month" === $(c).parent().attr("data-name") && l(m, a(r)), "year" === $(c).parent().attr("data-name") && "february" === $("[name='month']").val() && l("february", a(r));
        var p = new Date(r, t[i][0], s);
        s = p, ((new Date().getTime() - new Date(s)) / 315576e5 | 0) >= 18 && console.log("+");
      });
    });
  },
  progressCircle: function progressCircle() {
    var e = $(".progress-circle"),
        t = function t(_t2, a, l) {
      var n = 3.6 * _t2.value,
          r = 90 + n,
          s = a;
      l && r++;
      var i = $("<div>", {
        "class": "progress-circle__sector"
      }).css({
        background: _t2.color,
        transform: "rotate(" + s + "deg) skewY(" + r + "deg)"
      });
      return e.append(i), a + n;
    };

    [{
      value: 37,
      color: "#ffa352"
    }, {
      value: 63,
      color: "#e7e8e8"
    }].reduce(function (e, a) {
      return function e(a, l) {
        return a.value <= 25 ? t(a, l, !1) : e({
          value: a.value - 25,
          color: a.color
        }, t({
          value: 25,
          color: a.color
        }, l, !0));
      }(a, e);
    }, 0);
  },
  RangeSlider: function (_RangeSlider) {
    function RangeSlider() {
      return _RangeSlider.apply(this, arguments);
    }

    RangeSlider.toString = function () {
      return _RangeSlider.toString();
    };

    return RangeSlider;
  }(function () {
    new RangeSlider({
      element: document.getElementById("MyRangeSlider")
    });
  })
};
$(document).ready(function () {
  App.init();
});