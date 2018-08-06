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

function rgba(r, g, b, a) {
    return (r<<24) + (g<<16) + (b<<8) + (a*255)|0;
}
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
  var oldCanvas = $(".sources-container > canvas");
  var canvas = $("<canvas/>")
      .attr("width", canvasWidth)
      .attr("height", sources.eq(0).height())
      .insertAfter(sources.slice(0, sources.length - 1));
  oldCanvas.remove();

  var fill_rainbow = schemes['rainbow'].colors;
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
      var y0 = item0.position().top + 2 + lineHeight0 * i0;
      var h0 = lineHeight0;

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
        var y1 = item1.position().top + 2 + lineHeight1 * map1[i1];
        var h1 = lineHeight1;

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
}

$( document ).ready(function() {
  $(".source")
    .on("scroll", _redraw)
    .on("resize", _redraw);
  _redraw();
});
