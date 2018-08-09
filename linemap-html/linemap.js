// TODO: clicking on a row should highlight it, and all associated rows
// TODO: scrolling while a line is selected should synchro-scroll everything

var rlinemaps = [[0, 0, 76, 76, 76, 76, 76, 0, 77, 77, 0, 78, 0, 79, 0, 80, 80, 80, 0, 81, 0, 82, 82, 82, 0, 84, 84, 84, 84, 84, 84, 84, 84, 84, 0, 85, 85, 0, 86, 86, 86, 86, 86, 86, 86, 86, 86, 0, 88, 0, 89, 89, 89, 0, 91, 91, 91, 91, 91, 91, 0, 93, 0, 94, 0, 95, 0, 97, 97, 97, 97, 97, 97, 0, 100, 100, 0, 101], [0, 0, 0, 10, 0, 0, 12, 12, 12, 12, 12, 0, 14, 14, 14, 14, 0, 0, 18, 0, 0, 20, 0, 0, 22, 0, 0, 23, 0, 24, 0, 27, 0, 0, 0, 34, 0, 0, 37, 0, 40, 0, 0, 0, 47, 0, 0, 49, 0, 0, 51, 0, 0, 52, 0, 53, 0, 55, 0, 56, 0, 59, 59, 59, 59, 0, 60, 0, 62, 0, 64, 0, 66, 0, 70, 0, 71, 0, 73, 0, 0, 76, 0, 0, 78, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 13, 0, 13, 13, 0, 0, 14, 0, 15, 0, 16, 0, 19, 0, 19, 19, 19, 19, 19, 19, 0, 0, 25, 0, 25, 25, 25, 25, 28, 0, 30, 0, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 36, 0, 36, 36, 36, 39, 0, 39, 41, 0, 0, 0, 42, 0, 0, 0, 45, 0, 45, 45, 45, 48, 0, 48, 51, 0, 51, 51, 51, 51, 54, 0, 56, 0, 56, 0, 0, 58, 0, 60, 0, 0, 0, 62, 0, 63, 0, 64, 0, 64, 65, 0, 67, 0, 67, 67, 69, 0, 69, 69, 69, 0, 0, 71, 0, 73, 0, 73, 0, 0, 75, 0, 77, 0, 79, 0, 0, 0, 82, 0, 82, 82, 82, 82, 82, 82, 0, 0, 13, 0, 0, 0, 19, 0, 19, 0, 0, 19, 19, 19, 19, 0, 0, 19, 19, 19, 0, 0, 22, 0, 22, 22, 0, 0, 82, 0, 82, 0, 0, 82, 82, 82, 82, 0, 0, 82, 82, 82, 0, 0, 85], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 12, 0, 16, 0, 17, 0, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 0, 20, 0, 21, 0, 22, 0, 23, 0, 25, 0, 26, 0, 27, 0, 30, 0, 31, 0, 32, 0, 33, 0, 34, 0, 35, 0, 0, 48, 0, 48, 49, 0, 50, 0, 0, 0, 0, 0, 50, 0, 0, 72, 0, 73, 0, 74, 0, 0, 0, 76, 0, 76, 76, 76, 76, 76, 76, 78, 0, 0, 0, 92, 0, 93, 0, 95, 0, 0, 0, 96, 0, 96, 96, 96, 96, 96, 96, 109, 0, 111, 0, 0, 0, 0, 0, 112, 0, 116, 0, 117, 0, 118, 0, 0, 0, 120, 0, 120, 120, 120, 120, 0, 0, 122, 0, 122, 122, 122, 122, 122, 122, 123, 0, 0, 0, 127, 0, 0, 171, 0, 172, 0, 173, 0, 174, 0, 0, 0, 133, 0, 135, 0, 137, 0, 0, 0, 0, 0, 140, 0, 0, 144, 0, 147, 0, 147, 149, 0, 0, 0, 0, 0, 153, 0, 153, 153, 155, 0, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 160, 0, 0, 0, 162, 0, 162, 162, 162, 162, 0, 0, 0, 48, 0, 48, 49, 0, 50, 0, 0, 0, 0, 0, 0, 0, 54, 0, 56, 0, 58, 0, 0, 0, 0, 0, 0, 0, 63, 0, 64, 0, 65, 0, 66, 0, 0, 0, 182, 0, 183, 0, 0, 0, 186, 0, 187, 0, 188, 0, 189, 0, 0, 0, 192, 0, 193, 0, 194, 0, 0, 0, 198, 0, 0, 0, 200, 0, 0, 0, 204, 0, 205, 0, 0, 0, 208, 0, 209, 0, 210, 0, 211, 0, 0, 0, 214, 0, 215, 0, 216, 0, 0, 0, 220, 0, 220, 220, 220, 220, 220], [0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 21, 21, 23, 23, 23, 23, 23, 27, 27, 29, 29, 32, 32, 32, 34, 34, 35, 35, 35, 43, 43, 47, 47, 47, 51, 51, 61, 61, 63, 63, 66, 66, 66, 66, 66, 67, 67, 67, 67, 67, 67, 69, 69, 71, 71, 71, 0, 0, 0, 0, 0, 0, 0, 167, 167, 169, 169, 169, 173, 173, 175, 175, 183, 183, 177, 177, 177, 177, 180, 180, 180, 183, 183, 185, 185, 185, 185, 189, 189, 192, 192, 192, 193, 193, 193, 193, 193, 193, 193, 196, 196, 198, 198, 199, 199, 199, 199, 199, 199, 199, 205, 205, 207, 207, 207, 207, 207, 207, 209, 209, 212, 212, 214, 214, 215, 215, 215, 215, 215, 215, 215, 218, 218, 220, 220, 220, 220, 221, 221, 221, 221, 221, 223, 223, 225, 225, 225, 0, 0, 0, 0, 0, 0, 0, 0, 233, 233, 233, 235, 235, 237, 237, 239, 239, 241, 241, 243, 243, 245, 245, 247, 247, 249, 249, 251, 251, 251, 265, 265, 263, 263, 267, 267, 267, 279, 279, 283, 283, 283, 84, 84, 86, 86, 89, 89, 89, 91, 91, 93, 93, 94, 94, 94, 94, 94, 96, 96, 96, 273, 273, 273, 279, 279, 283, 283, 283, 102, 102, 102, 104, 104, 106, 106, 106, 109, 109, 109, 111, 111, 113, 113, 113, 114, 114, 114, 114, 114, 114, 116, 116, 114, 114, 118, 118, 120, 120, 122, 122, 124, 124, 124, 124, 124, 130, 130, 132, 132, 135, 135, 137, 137, 137, 138, 138, 138, 138, 138, 138, 140, 140, 143, 143, 143, 145, 145, 147, 147, 148, 148, 148, 148, 148, 148, 148, 154, 154, 154, 154, 157, 157, 159, 159, 161, 161, 163, 163, 163, 297, 297, 295, 295, 299, 299, 299, 305, 305, 305, 305, 312, 312, 315, 315, 316, 316, 316, 316, 316, 316, 316, 316, 316, 316, 316, 255, 255, 255, 255, 255, 287, 287, 287, 287, 287, 287, 287, 287, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var nlines = [1147, 78, 86, 278, 374, 523];


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

function _highlight(evt) {
    // find the click target
    var target = evt.target;
    while (target.id === undefined || !target.id.match(/n-\d+/)) {
        if (target === this)
            return;
        target = target.parentNode;
    }
    var id = target.id.substring(2, target.id.length);
    $(".interactive-highlight").removeClass("interactive-highlight");
    target.classList.add("interactive-highlight");
}

$( document ).ready(function() {
  $(".source")
    .on("scroll", _redraw);
  $(window)
    .on("resize", _redraw);
  $(".source-profile")
    .on("click", _highlight);
  _redraw();
});
