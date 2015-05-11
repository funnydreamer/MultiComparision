// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var url;

var BG = (function(){

	var my = {};

	//url = tab.url;

	console.log('background');


	return my;

}());

/*
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  
  //var url = chrome.tabs.url;
  url = tab.url;
  
  /*
  var url_lists = [
	"http://cybozu-test.dc.cybozu.co.jp/", "http://cybozu.co.jp/",
	"http://group-test.cybozu.jp/","http://group.cybozu.jp/",
	"http://products-test.dc.cybozu.co.jp/","http://products.cybozu.co.jp/",
	"http://live-test.dc.cybozu.co.jp/","https://live.cybozu.co.jp/",
	"http://spapps-test.dc.cybozu.co.jp/","http://spapps.cybozu.com/",
	"http://products-test.dc.cybozu.co.jp/","http://products.cybozu.co.jp/",
	"http://kantan-test.dc.cybozu.co.jp/","http://kantan.cybozu.co.jp/",
	"https://www-test.dc.cybozu.co.jp/","https://www.cybozu.com/",
	"https://garooncom-test.dc.cybozu.co.jp/","https://garoon.cybozu.com/",
	"https://kintonecom-test.dc.cybozu.co.jp/","https://kintone.cybozu.com/",
	"https://mailwisecom-test.dc.cybozu.co.jp/","https://mailwise.cybozu.com/"
  ];
  
  var len = url_lists.length;
  
  for( var i=0; i < len/2; i++ ){
	if ( url.match( url_lists[i*2+1] ) ){
		var newUrl = url.replace( url_lists[i*2+1], url_lists[i*2] );
		window.open(newUrl, "_blank");
		break;
	}
  }
  
});
*/
