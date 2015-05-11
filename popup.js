
$(function(){

	var tabId;
	//doInCurrentTab( function(tab){ tabId = tab.id } );

	var port;
	var splits;

	chrome.tabs.getSelected(null, function(tab){
		
		tabId = tab.id;

		//console.log('tabId:' + tabId);

		port = chrome.tabs.connect(tabId, {name: "hello"});

		port.onMessage.addListener( function(msg) {
			if (msg.type == "find") {
				$('#info').show();
				var a = msg.data;
				var len = a.length;
				var $tbody = $('#info').find('tbody');
				for( var i=0; i<len; i++){
					if( a[i] == 1 ) { str = '<span class="found">found</span>'; }
					else            { str = '<span class="not-found">not found</span>'; }
					if((i+1)%2==0)  { row = "even"; }
					else            { row = "odd"; }
					$tbody.append( '<tr class="' + row + '""><td class="col01">' + i + '</td><td class="col02">' + str + '</td><td class="col03">' + splits[i] + '</td></tr>' );
				}
			}
		});

	});

	$('.search-btn').on( 'click', function()
	{	
		var text = $('#words').val();
		if( text == '' ) return;
		var tmp = text.split(/\r?\n/g);
		//splits = text.split(/\r?\n/g);
		splits = [];
		for(var j=0; j<tmp.length; j++){
			if( tmp[j].match(/\S/g) ) splits.push(tmp[j]);
		}
		
		port.postMessage( { type: "search", data:splits } );

	});

	$('.clear-btn').on( 'click', function()
	{
		$('#info').hide();
		$('#info').find('tbody').empty();
		port.postMessage( { type: "clear" } );

	});

	$('.popup-btn').on( 'click', function()
	{
		var info = $('#info');
		port.postMessage( { type: "result", data:info.html() } );

	});


});
