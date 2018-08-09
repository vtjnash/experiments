// TODO: clicking on a row should highlight it, and all associated rows
// TODO: scrolling while a line is selected should synchro-scroll everything

var rlinemaps = [[0, 0, 2, 2, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 6], [0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 7, 0, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 7, 0, 7, 0, 7, 7, 0, 7, 7, 7, 7, 0, 0, 9, 0, 10, 0, 11, 11, 11, 0, 15, 0, 16, 0, 17, 0, 18, 0, 18, 0, 0, 19, 0, 0, 19, 0, 0, 19, 0, 19, 0, 0, 19, 0, 0, 0, 0, 19, 0, 0, 0, 19, 0, 0, 19, 0, 0, 19, 0, 19, 0, 19, 0, 0, 19, 0, 19, 19, 0, 19, 19, 19, 0, 21, 0, 22, 0, 23, 0, 25, 25], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 6, 6, 6, 6, 11, 0, 11, 18, 0, 18, 21, 0, 23, 0, 23, 23, 0, 0, 25, 0, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 27, 0, 27, 27, 27, 27, 27, 27, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 31, 0, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 33, 0, 0, 0, 36, 0, 38, 0, 38, 38, 0, 0, 38, 0, 0, 38, 38, 38, 38, 38, 38, 38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 0, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 44, 0, 44, 44, 46, 0, 46, 46, 0, 0, 48, 0, 0, 0, 52, 0, 52, 52, 52, 0, 0, 0, 63, 0, 66, 0, 66, 66, 66, 66, 71, 0, 71, 78, 0, 78, 81, 0, 83, 0, 83, 83, 0, 0, 85, 0, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 88, 0, 90, 0, 90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 91, 0, 0, 0, 0, 0, 0, 0, 93, 0, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 97, 0, 99, 0, 99, 99, 0, 0, 99, 0, 0, 101, 0, 101, 101, 101, 101, 101, 101, 101, 101, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 27, 0, 27, 0, 0, 27, 0, 0, 27, 0, 0, 27, 27, 0, 0, 38, 0, 0, 0, 38, 0, 0, 38, 0, 0, 38, 38, 0, 0, 101, 0, 0, 0, 101, 0, 0, 101, 0, 0, 101, 101, 0, 0, 90, 0, 90, 0, 0, 90, 0, 0, 90, 0, 0, 90, 90], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 31, 0, 32, 0, 33, 0, 44, 0, 45, 0, 0, 0, 53, 0, 53, 57, 0, 58, 0, 60, 0, 61, 0, 62, 0, 63, 0, 64, 0, 65, 0, 71, 0, 72, 0, 73, 0, 73, 75, 0, 89, 0, 89, 0, 0, 0, 329, 0, 0, 0, 0, 145, 0, 0, 148, 0, 164, 0, 169, 0, 169, 185, 0, 196, 0, 203, 0, 0, 0, 235, 0, 236, 0, 252, 0, 252, 0, 0, 0, 244, 0, 343, 0, 0, 0, 305, 0, 307, 0, 0, 0, 77, 0, 79, 0, 322, 0, 0, 0, 238, 0, 240, 0, 365], [0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 19, 19, 21, 21, 23, 23, 23, 28, 28, 40, 40, 50, 50, 42, 42, 44, 44, 46, 46, 53, 53, 55, 55, 56, 56, 56, 108, 108, 110, 110, 110, 0, 0, 0, 0, 0, 0, 61, 61, 61, 61, 61, 61, 61, 61, 116, 116, 96, 96, 96, 96, 66, 66, 71, 71, 73, 73, 73, 74, 74, 78, 78, 80, 80, 80, 80, 86, 86, 86, 88, 88, 89, 89, 89, 89, 96, 96, 96, 96, 102, 102, 102, 102, 102, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
var nlines = [7, 25, 104, 420, 164, 257]


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
    var item0 = sources.eq(nth).children().eq(0);
    var item1 = sources.eq(nth + 1).children().eq(0);
    var lines0 = nlines[nth];
    var lines1 = nlines[nth + 1];
    for (var i0 = 0; i0 < rlinemap_rle.length; ++i0) {
      var rle = rlinemap_rle[i0];
      var fill = fill_rainbow[rle[0] % fill_rainbow.length];
      var lineHeight0 = item0.height() / lines0;
      var y0 = item0.position().top + lineHeight0 * rle[0];
      var h0 = lineHeight0;

      var lineHeight1 = item1.height() / lines1;
      var y1 = item1.position().top + lineHeight1 * rle[1];
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

$( document ).ready(function() {
  $(".source")
    .on("scroll", _redraw);
  $(window)
    .on("resize", _redraw);
  _redraw();
});
