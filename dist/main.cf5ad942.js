// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var localList = localStorage.getItem('x');
var localListObject = JSON.parse(localList);
var hashMap = localListObject || [{
  text: 'V',
  name: 'vuejs',
  logo: 'https://cn.vuejs.org/images/icons/favicon-32x32.png',
  logoType: 'text',
  url: 'https://cn.vuejs.org/index.html'
}, {
  text: 'R',
  name: 'reactjs',
  logo: 'https://zh-hans.reactjs.org/favicon.ico',
  logoType: 'text',
  url: 'https://zh-hans.reactjs.org/'
}, {
  text: 'A',
  name: 'acfun',
  logo: '',
  logoType: 'text',
  url: 'https://www.acfun.cn/'
}, {
  text: 'B',
  name: 'bilibili',
  logo: 'https://www.bilibili.com/favicon.ico',
  logoType: 'ico',
  url: 'https://www.bilibili.com/'
}];

var parseUrl = function parseUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var template = function template(node) {
  // let urlName = parseUrl(node.url)
  return "<li>\n                <div class=\"site\">\n                    <div class=\"logo\">".concat(node.text, "</div>\n                    <div class=\"link\">").concat(node.name, "</div>\n                    <div class=\"delete\">\n                        <svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-delete\"></use>\n                        </svg>\n                    </div>\n                </div>\n            </li>");
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $(template(node)).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url, '_self');
    });
    $li.on('click', '.delete', function (e) {
      e.stopPropagation();
      console.log('delete');
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addSite').on('click', function () {
  var url = window.prompt('新增网站');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  var name = parseUrl(url);
  var shortName = name.toUpperCase();
  var newSite = {
    text: shortName[0],
    name: name,
    logo: url[0],
    logoType: 'text',
    url: url
  };
  hashMap.push(newSite);
  render();
});

window.onbeforeunload = function () {
  console.log('页面关闭');
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    var h = hashMap[i];

    if (h.name[0] === key) {
      window.open(h.url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.cf5ad942.js.map