
(function ($) {
    "use strict";

    function animateSkillCircles() {
        $(".circle_skill").each(function () {
            var $skill = $(this);
            if ($skill.data("animated")) return;

            var top = $skill.offset().top;
            var viewBottom = $(window).scrollTop() + $(window).height() * 0.88;

            if (top < viewBottom) {
                $skill.data("animated", true);

                var percent = parseInt($skill.attr("data-percent"), 10) || 0;
                var circumference = 2 * Math.PI * 76;
                var offset = circumference * (1 - percent / 100);
                var $circle = $skill.find(".circle_value");
                var $counter = $skill.find("strong");

                requestAnimationFrame(function () {
                    $circle.css("stroke-dashoffset", offset);
                });

                $({ n: 0 }).animate({ n: percent }, {
                    duration: 2000,
                    easing: "swing",
                    step: function () {
                        $counter.text(Math.round(this.n) + "%");
                    },
                    complete: function () {
                        $counter.text(percent + "%");
                    }
                });
            }
        });
    }

    function animateImpactChart() {
        var $chart = $("#impactChart");
        if (!$chart.length || $chart.data("animated")) return;

        var top = $chart.offset().top;
        var viewBottom = $(window).scrollTop() + $(window).height() * 0.9;

        if (top < viewBottom) {
            $chart.data("animated", true);
            $chart.find(".bar").each(function (i) {
                var h = parseFloat($(this).attr("data-height")) || 0;
                var $bar = $(this);
                setTimeout(function () {
                    $bar.css("height", h + "%");
                }, i * 120);
            });
        }
    }

    $(window).on("load scroll resize", function () {
        animateSkillCircles();
        animateImpactChart();
    });

})(jQuery);
