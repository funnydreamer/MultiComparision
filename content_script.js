
$(function(){

	chrome.extension.onConnect.addListener(function(port) {

		var index = 0;
		var indexes = Array();

		console.assert(port.name == "hello");
		
		port.onMessage.addListener(function(msg) {
			//console.log(msg.type);
			if (msg.type == "search")
			{
				//検索処理
				$current = $('body');

				var words = msg.data;
				var slen = words.length;
				indexes = Array(slen);
				for( var j=0; j<slen; j++ ) indexes[j] = 0;
				for( var j=0; j<slen; j++ )
				{
					index = j;
					//console.log( typeof words[j] );
					//console.log( words[j] );
					findWord( words[j] );
				}
				port.postMessage({ type:"find", data:indexes });

			}
			else if (msg.type == "clear")
			{
				//検索ハイライトをクリア
				clear();
			}
			else if (msg.type == "result")
			{
				//検索結果をモーダルで表示
				$('body').append(
					'<div class="msearch-modal"><p class="msearch-close">CLOSE</p><div class="msearch-info"></div></div>'
				)
				$('.msearch-info').append( msg.data );
				$('.msearch-close').on('click',function(){
					$('.msearch-close').off('click');
					//$('.msearch-modal').remove();
					$('.msearch-modal').fadeOut(500, function(){ $(this).remove(); });
				})
			}
		});

		// http://c-man.s21.xrea.com/mars/md20080315.html を参照し、一部改変
		// 手抜きのグローバル変数。検索結果の復元用
		var stock = new Array();
		//検索関数
		function clear(){
			for(var i=stock.length-1;i>-1;i--)
				stock[i][0].parentNode.replaceChild(stock[i][1],stock[i][0]);
			stock.length=0;
		}
		function exFind(q) {
			/*
			for(var i=stock.length-1;i>-1;i--)
				stock[i][0].parentNode.replaceChild(stock[i][1],stock[i][0]);
			stock.length=0;
			*/
			q = q.replace(/^\s+|\s+$/g,'');
			if(! q) return;

			exFindSub(document.body);
		}
		//検索関数(サブ)
		function exFindSub(oo) {
			var q = exFind.arguments[0];
			for(var o = oo;o;o=o.nextSibling){
				if(o.nodeType == 3) {
					var result = o.nodeValue.indexOf(q);
					if(result >= 0){
						if(stock.length==0 || stock[stock.length-1][0]!=o.parentNode)
							stock.push([o.parentNode,o.parentNode.cloneNode(true)]);
						if(result)o = o.splitText(result);
						if(q.length != o.nodeValue.length)
							o.splitText(q.length);
						var span = document.createElement('span');
						span.className = 'FindItem';
						span.appendChild(
							document.createTextNode(q));
						o.parentNode.replaceChild(span,o);
						o = span;
						indexes[index] = 1;
					}
				} else if(o.firstChild) exFindSub(o.firstChild);
			}
		}
		//テスト用
		function findWord(str) {
			exFind(str);
			return false;
		}


	});

	

});
