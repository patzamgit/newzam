
function utf8_decode(str_data) {
  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 <= 239) {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      c4 = str_data.charCodeAt(i + 3);
      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
      c1 -= 0x10000;
      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
      i += 4;
    }
  }

  return tmp_arr.join('');
}

function submitprocess(){
	var mg=0;	
	if($('#chimp-form').valid()){
	var data=$('#chimp-form').serializeArray();
	//$('#loader').show();
		$.ajax({
			type:'POST',
			url:'https://languagepanel.com/newzam/sendmail.php',
			data: data,
			dataType:'json',
			success:function(jdata){
				$('#response').html(utf8_decode(jdata.str));
				$('#email').val('');
				mg=1;
			}
		});
		/*if(mg==0){
			$('#response').html('Thank you for your mail. We will contact you soon.');
			$('#email').val('');
		}*/
	}
}

function sleep(milliseconds) {
	var i=milliseconds/1000;
	
	if(i>0){
	i=i-1;
	var sd=i+' seconds';
	if(i<2)sd=i+' second';
	setTimeout(function(){ $('#cdsp').html(sd); console.log(i);if(i>=0)sleep(i*1000);}, 1000);
	} else {
	$('#cdsp').html('0 second');
	$("#autopost").submit();
	}
}

