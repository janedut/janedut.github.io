// !function(n) {
//   "use strict";
//   var t = function() {
//       return document.createElement("canvas").getContext("2d")
//   }
//     , e = function(n, e) {
//       var a = new Image
//         , o = n.src || n;
//       "data:" !== o.substring(0, 5) && (a.crossOrigin = "Anonymous"),
//       a.onload = function() {
//           var n = t("2d");
//           n.drawImage(a, 0, 0);
//           var o = n.getImageData(0, 0, a.width, a.height);
//           e && e(o.data)
//       }
//       ,
//       a.src = o
//   }
//     , a = function(n) {
//       return ["rgb(", n, ")"].join("")
//   }
//     , o = function(n) {
//       return n.map(function(n) {
//           return a(n.name)
//       })
//   }
//     , r = 5
//     , i = 10
//     , c = {};
//   c.colors = function(n, t) {
//       t = t || {};
//       var c = t.exclude || []
//         , u = t.paletteSize || i;
//       e(n, function(e) {
//           for (var i = n.width * n.height || e.length, m = {}, s = "", d = [], f = {
//               dominant: {
//                   name: "",
//                   count: 0
//               },
//               palette: Array.apply(null, new Array(u)).map(Boolean).map(function() {
//                   return {
//                       name: "0,0,0",
//                       count: 0
//                   }
//               })
//           }, l = 0; i > l; ) {
//               if (d[0] = e[l],
//               d[1] = e[l + 1],
//               d[2] = e[l + 2],
//               s = d.join(","),
//               m[s] = s in m ? m[s] + 1 : 1,
//               -1 === c.indexOf(a(s))) {
//                   var g = m[s];
//                   g > f.dominant.count ? (f.dominant.name = s,
//                   f.dominant.count = g) : f.palette.some(function(n) {
//                       return g > n.count ? (n.name = s,
//                       n.count = g,
//                       !0) : void 0
//                   })
//               }
//               l += 4 * r
//           }
//           if (t.success) {
//               var p = o(f.palette);
//               t.success({
//                   dominant: a(f.dominant.name),
//                   secondary: p[0],
//                   palette: p
//               })
//           }
//       })
//   }
//   ,
//   n.RGBaster = n.RGBaster || c
// }(window);
if (document.getElementById('post-cover-img')) {
  let list = []
  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 5; j++) {
      for (let k = 0; k <= 5; k++) {
        list.push(`rgb(${i},${j},${k})`)
        list.push(`rgb(${255 - i},${255 - j},${255 - k})`)
      }
    }
  }
  RGBaster.colors(document.getElementById('post-cover-img').getAttribute('src'), {
    paletteSize: 30,
    exclude: list,
    success: function (payload) {
      const c = payload.dominant.match(/\d+/g)
      const grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114
      document.styleSheets[0].addRule(':root', `
        --main: ${payload.dominant};
        --second: ${grayLevel >= 192 ? '#000' : '#FFF'};
        --main-light: rgba(${c[0]}, ${c[1]}, ${c[2]}, .4);
        --main-shadow: 0 2px 3px 1px rgba(${c[0]}, ${c[1]}, ${c[2]}, .2);
        --cover-text: ${grayLevel >= 192 ? '#4C4948' : '#EEE'};
        --cover-bg: rgba(${c[0]}, ${c[1]}, ${c[2]});
      `)
    }
  })
} else {
  document.styleSheets[0].addRule(':root', `
    --main: #49B1F5;
    --second: #FFF;
    --main-light: rgba(73, 177, 245, .4);
    --main-shadow: 0 2px 3px 1px rgba(73, 177, 245, .2);
    --cover-text: #EEE;
    --cover-bg: #49B1F5;
  `)
}

document.styleSheets[0].addRule('[data-theme="dark"]', `
  --main: #5C5C5C !important;
  --second: #EEE !important;
  --main-light: rgba(92, 92, 92, .4) !important;
  --main-shadow: 0 2px 3px 1px rgba(92, 92, 92, .2) !important;
`)

