var App = {
  options: {},

  init: function() {
    this.owlCarousel();
    this.select();
  },

  owlCarousel: function() {
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      responsive: {
        0: {
          items: 1
        }
      }
    });
  },

  select: function() {
    let check = 1;

    let months = {
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

    function leapYear(year) {
      if (year % 400 === 0) {
        return true;
      } else if (year % 4 === 0 && year % 100 != 0) {
        return true;
      } else {
        return false;
      }
    }

    function createYears() {
      let now = new Date();
      for (let i = 1940; i <= now.getFullYear(); i++) {
        $('[data-name="year"]')
          .find(".select__list")
          .append("<li data-select='" + i + "'>" + i + "</li>");
      }
      $("[data-select='1999']").addClass("active");
    }

    function createMonths() {
      for (let key in months) {
        $('[data-name="month"]')
          .find(".select__list")
          .append("<li data-select='" + key + "'>" + key + "</li>");
      }
      $("[data-select='january']").addClass("active");
      createDate("january");
    }

    function createDate(month, leapYear) {
      let title = $("[data-name='date'] .select__title");
      let active = $("[data-name='date'] .input_hidden").val();
      if (title.html() > months[month][1]) {
        title.html(months[month][1]);
      }
      if (leapYear === true) {
        months.february = 29;
      } else {
        months.february = 28;
      }
      $('[data-name="date"]')
        .find(".select__list")
        .children()
        .remove();
      for (let i = 1; i <= months[month][1]; i++) {
        $('[data-name="date"]')
          .find(".select__list")
          .append("<li data-select='" + i + "'>" + i + "</li>");
      }
      if (active != "") {
        $("[data-select='" + active + "']").addClass("active");
      } else {
        $("[data-select='1']").addClass("active");
      }
    }

    function selectItemClick() {
      $(".select__list li").click(e => {
        let year = $("[data-name='year'] .select__title").html();
        let date = $("[data-name='date'] .select__title").html();
        let month = $("[data-name='month'] .select__title").html();
        let li = e.target;
        let list = $(li).parent();
        let input = $(list)
          .parent()
          .find(".input_hidden");
        let title = $(list)
          .parent()
          .find(".select__title");
        let target = li.dataset.select; // присвоить titile выбранный элемент
        input.val(target);
        $(title)
          .html(target)
          .css("color", "#000")
          .addClass("check");
        if (check === 0) {
          check = 1;
          $(e.target).addClass("active");
        } else {
          $(list)
            .children()
            .removeClass("active");
          $(e.target).addClass("active");
        }
        if (
          $(list)
            .parent()
            .attr("data-name") === "month"
        ) {
          createDate(target, leapYear(year));
        }

        let dateCheck = new Date(year, months[month][0], date);
        function getCurrentAge(date) {
          return (
            ((new Date().getTime() - new Date(date)) /
              (24 * 3600 * 365.25 * 1000)) |
            0
          );
        }
        if (getCurrentAge(dateCheck) >= 18) {
          console.log("+");
        }
      });
    }

    function selectClick() {
      $(".select").click(e => {
        let select = e.target.parentElement;
        let list = $(select).find(".select__list");
        let title = $(select).find(".select__title");
        // открывать скрывать список
        $(list).toggle();
        $(title).toggleClass("select__title--open");

        $(document).mouseup(e => {
          // скрывать если клик вне элемента
          if (!$(select).is(e.target) && !$(title).is(e.target)) {
            $(list).hide();
            $(title).removeClass("select__title--open");
          }
        });

        selectItemClick();
      });
    }

    createYears();
    createMonths();
    selectClick();
  }
};

$(document).ready(function() {
  App.init();
});