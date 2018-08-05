var linemaps = [[
  [0],
  [1, 2],
  [2, 30],
], [
  [3],
  [1],
  [],
  [2, 0],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [5, 15],
  [],
]];
var nlines = [7, 162, 256];

function _redraw() {
  var radius = 4;
  var curveWidth = 6;
  var canvasWidth = 80;
  var sources = $(".source");
  var oldCanvas = $(".sources-container > canvas");
  var canvas = $("<canvas/>")
      .attr("width", canvasWidth)
      .attr("height", sources.height())
      .insertAfter(sources.slice(0, sources.length - 1));
  oldCanvas.remove();

  var fill_rainbow = ['black', 'red', 'blue', 'green']; // TODO: a better rainbow
  for (var nth = 0; nth < linemaps.length; ++nth) {
    var ctx = canvas.get(nth).getContext('2d');
    var linemap = linemaps[nth];
    var item0 = sources.eq(nth).children().eq(0);
    var item1 = sources.eq(nth + 1).children().eq(0);
    var lines0 = nlines[nth];
    var lines1 = nlines[nth + 1];
    for (var i0 = 0; i0 < linemap.length; ++i0) {
      var fill = fill_rainbow[i0 % fill_rainbow.length];
      var lineHeight0 = item0.height() / lines0;
      var y0 = item0.position().top + 1 + lineHeight0 * i0;
      var h0 = lineHeight0;

      // draw curve for the left side
      ctx.beginPath();
      ctx.strokeStyle = fill;
      ctx.lineWidth = 2;
      if (h0 <= 2 * radius) {
        y0 += h0 / 2;
        ctx.moveTo(0, y0);
        ctx.lineTo(curveWidth, y0);
      }
      else {
        var yb0 = y0 + h0 - radius;
        y0 += radius;
        ctx.moveTo(0, y0);
        ctx.arcTo(curveWidth, y0, curveWidth, y0 + radius, radius);
        ctx.arcTo(curveWidth, yb0, 0, yb0, radius);
        ctx.lineTo(0, yb0);
        y0 += h0 / 2 - radius;
      }
      ctx.stroke();

      var map1 = linemap[i0];
      if (map1.length == 0) {
        ctx.beginPath();
        ctx.strokeStyle = fill;
        ctx.lineWidth = 1;
        ctx.moveTo(x0 + radius, y0);
        ctx.lineTo(x0 - radius, y0);
        ctx.stroke();
      }
      for (var i1 = 0; i1 < map1.length; ++i1) {
        var lineHeight1 = item1.height() / lines1;
        var y1 = item1.position().top + 1 + lineHeight1 * map1[i1];
        var h1 = lineHeight1;

        // draw curve for the right side
        ctx.beginPath();
        ctx.strokeStyle = fill;
        ctx.lineWidth = 2;
        if (h1 <= 2 * radius) {
          y1 += h1 / 2;
          ctx.moveTo(canvasWidth, y1);
          ctx.lineTo(canvasWidth - curveWidth, y1);
        }
        else {
          var yb1 = y1 + h1 - radius;
          y1 += radius;
          ctx.moveTo(canvasWidth, y1);
          ctx.arcTo(canvasWidth - curveWidth, y1, canvasWidth - curveWidth, y1 + radius, radius);
          ctx.arcTo(canvasWidth - curveWidth, yb1, canvasWidth, yb1, radius);
          ctx.lineTo(canvasWidth, yb1);
          y1 += h1 / 2 - radius;
        }
        ctx.stroke();

        // now draw the connecting line
        var x0 = curveWidth;
        var x1 = canvasWidth - curveWidth;
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
}

$( document ).ready(function() {
  $(".source")
    .on("scroll", _redraw)
    .on("resize", _redraw);
  _redraw();
});
