// TODO: clicking on a row should highlight it, and all associated rows
// TODO: scrolling while a line is selected should synchro-scroll everything

var profile_map = [];
var rlinemaps = [];
var nlines = [];

//function rgba(r, g, b, a) {
//    return (r<<24) + (g<<16) + (b<<8) + (a*255)|0;
//}
var schemes = {
    rainbow: {desc: 'Rainbow 1', colors: [
        'rgb(141, 211, 199)',
        'rgb(255, 255, 179)',
        'rgb(190, 186, 218)',
        'rgb(251, 128, 114)',
        'rgb(128, 177, 211)',
        'rgb(253, 180,  98)',
        'rgb(179, 222, 105)',
        'rgb(252, 205, 229)',
        'rgb(217, 217, 217)',
        'rgb(188, 128, 189)',
        'rgb(204, 234, 197)',
        'rgb(255, 237, 111)',
    ]},
    //rainbow2: {desc: 'Rainbow 2', count: 12},
    //earth: {desc: 'Earth tones (colourblind safe)', count: 9},
    //green-blue: {desc: 'Greens and blues (colourblind safe)', count: 4},
    //gray-shade: {desc: 'Gray shades', count: 4}
};

function _redraw() {
  var radius = 4;
  var curveWidth = 6;
  var canvasMargin = 2;
  var canvasWidth = 80;
  var sources = $(".source");
  var canvasHeight = $(".sources-container > div").eq(0).height();
  var oldCanvas = $(".sources-container > canvas");
  var canvas = $("<canvas/>")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .insertAfter(sources.slice(0, sources.length - 1).parent());
  oldCanvas.remove();

  // change linemap to a run-length encoding
  var rlinemaps_rle = [];
  for (var nth = 0; nth < rlinemaps.length; ++nth) {
      var linemap = rlinemaps[nth];
      var rle = [];
      if (linemap.length > 0) {
          var idx = 0;
          var prev = 0;
          var prevlen = 0;
          for (idx = 1; idx < linemap.length; idx++) {
              if (linemap[idx] == 0 || linemap[idx] == prev) {
                  prevlen++;
              } else {
                  if (prev != 0)
                      rle.push([prev - 1, idx - prevlen, prevlen]);
                  prev = linemap[idx];
                  prevlen = 1;
              }
          }
          if (prev != 0)
              rle.push([prev - 1, idx - prevlen, prevlen]);
      }
      rlinemaps_rle.push(rle);
  }

  var fill_rainbow = schemes['rainbow'].colors;
  for (var nth = 0; nth < rlinemaps_rle.length; ++nth) {
    var rlinemap_rle = rlinemaps_rle[nth];
    var ctx = canvas.get(nth).getContext('2d');
    var canvasOffset = canvas.eq(nth).offset().top;
    var item0 = sources.eq(nth).find(".code").eq(0);
    var item1 = sources.eq(nth + 1).find(".code").eq(0);
    var lines0 = nlines[nth];
    var lines1 = nlines[nth + 1];
    for (var i0 = 0; i0 < rlinemap_rle.length; ++i0) {
      var rle = rlinemap_rle[i0];
      var fill = fill_rainbow[rle[0] % fill_rainbow.length];
      var lineHeight0 = item0.height() / lines0;
      var y0 = item0.offset().top - canvasOffset + lineHeight0 * rle[0];
      var h0 = lineHeight0;

      var lineHeight1 = item1.height() / lines1;
      var y1 = item1.offset().top - canvasOffset + lineHeight1 * rle[1];
      var h1 = lineHeight1 * rle[2];

      if ((y0 + h0 < -2 * lineHeight0 || y0 > canvasHeight + 2 * lineHeight0)
          && (y1 + h1 < -2 * lineHeight0 || y1 > canvasHeight + 2 * lineHeight0)) {
          // don't render connecting lines for items where the end-points are completely hidden
          // TODO: add some transparency instead and fade them out
          continue;
      }

      // draw curve for the left side
      ctx.beginPath();
      ctx.strokeStyle = fill;
      ctx.lineWidth = 2;
      if (h0 <= 2 * radius) {
        y0 += h0 / 2;
        ctx.moveTo(canvasMargin, y0);
        ctx.lineTo(canvasMargin + curveWidth, y0);
      }
      else {
        var yb0 = y0 + h0 - radius;
        y0 += radius;
        ctx.moveTo(canvasMargin, y0);
        ctx.arcTo(canvasMargin + curveWidth, y0, canvasMargin + curveWidth, y0 + radius, radius);
        ctx.arcTo(canvasMargin + curveWidth, yb0, canvasMargin, yb0, radius);
        ctx.lineTo(canvasMargin, yb0);
        y0 += h0 / 2 - radius;
      }
      ctx.stroke();

      // draw curve for the right side
      ctx.beginPath();
      ctx.strokeStyle = fill;
      ctx.lineWidth = 2;
      if (h1 <= 2 * radius) {
        y1 += h1 / 2;
        ctx.moveTo(canvasWidth - canvasMargin, y1);
        ctx.lineTo(canvasWidth - canvasMargin - curveWidth, y1);
      }
      else {
        var yb1 = y1 + h1 - radius;
        y1 += radius;
        ctx.moveTo(canvasWidth - canvasMargin, y1);
        ctx.arcTo(canvasWidth - canvasMargin - curveWidth, y1, canvasWidth - canvasMargin - curveWidth, y1 + radius, radius);
        ctx.arcTo(canvasWidth - canvasMargin - curveWidth, yb1, canvasWidth - canvasMargin, yb1, radius);
        ctx.lineTo(canvasWidth - canvasMargin, yb1);
        y1 += h1 / 2 - radius;
      }
      ctx.stroke();

      // now draw the connecting line
      var x0 = canvasMargin + curveWidth;
      var x1 = canvasWidth - canvasMargin - curveWidth;
      ctx.beginPath();
      ctx.strokeStyle = fill;
      ctx.lineWidth = 1;
      ctx.moveTo(x0, y0);
      if (y0 == y1) {
        ctx.lineTo(x1, y1);
      }
      else {
        ctx.bezierCurveTo(
            x0 + canvasWidth / 3, y0,
            x1 - canvasWidth / 3, y1,
            x1, y1);
      }
      ctx.stroke();
    }
  }
}

function _highlight(evt) {
  // find the click target
  var target = evt.target;
  while (target.id === undefined || !target.id.match(/n-\d+/)) {
      if (target === this)
          return;
      target = target.parentNode;
  }
  var id = parseInt(target.id.substring(2, target.id.length));
  $(".interactive-highlight").removeClass("interactive-highlight");
  target.classList.add("interactive-highlight");

  var old = $(".sources-container > *");
  old.not("#profile").remove();

  var method = profile_map[id - 1];
  if (method == 0)
      return;
  $.get(method + "/analysis", function(resp) {
      $(".sources-container").append(resp);
      $.getJSON(method + "/rlinemaps", function(resp) {
          rlinemaps = resp;
          var first = 0;
          for (var i = 0; i < rlinemaps[0].length; i++) {
              var line = rlinemaps[0][i];
              if (line != 0 && (first == 0 || first > line))
                  first = line;
          }
          $.getJSON(method + "/nlines", function(resp) {
              nlines = resp;
              var source0 = $(".source").eq(0);
              var item0 = source0.children().eq(0);
              var lineHeight0 = item0.height() / nlines[0];
              if (first > 5)
                  source0.scrollTop(Math.max(0, first * lineHeight0 - source0.height() / 2));
              $(".source")
                .on("scroll", _redraw);
              $.get(method + "/julia-heatmap", function(resp) {
                item0.before(resp);
              });
              _redraw();
          });
      });
  });
}

$(document).ready(function() {
  $(window)
    .on("resize", _redraw);
  $(".sources-container").load("profile", function() {
      $.getJSON("mapping", function(resp) {
          profile_map = resp;
          $(".source-profile")
            .on("click", _highlight)
            .on("scroll", function (evt) {
                $(this).children(".flame").css("left", this.scrollLeft + "px");
            });
      });
  });
  _redraw();
});
