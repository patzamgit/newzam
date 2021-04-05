
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
	if($('#chimp-form').valid()){
	var data=$('#chimp-form').serializeArray();
	//$('#loader').show();
		$.ajax({
			type:'POST',
			url:'https://languagepanel.com/newzam/sendmail.php',
			data: data,
			dataType:'json',
			success:function(jdata){
				//$('#loader').hide();
				$('#response').html(utf8_decode(jdata.str));
				$('#email').val('');
			}
		});
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

function doModal(title, message) {
    var html = '<div class="modal hide fade in">';

    html += '<div class="modal-dialog" role="document">';
    html += '<div class="modal-content">';

    html += '<div class="modal-header">';
    html += '<h5 class="modal-title">' + title + '</h5>';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '</div>';

    html += '<div class="modal-body">';
    html += '<p>';
    html += message;
    html += '</div>';

    html += '<div class="modal-footer">';
    html += '<button class="btn btn-primary" data-dismiss="modal">Close</button>'; // close button
    html += '</div>';  // footer
    html += '</div>';  // modalWindow

    const div = document.createElement('div');
    div.innerHTML = html;

    document.body.appendChild(div);

    $(div.children[0]).modal().on('hidden.bs.modal', function (e) {
        document.body.removeChild(div);
    });
}

function isEmail(email) {
    email = email.toLowerCase();
    var n = email.search("gmail");
    if (n > -1) {
        return false;
    }
    n = email.search("yahoo");
    if (n > -1) {
        return false;
    }
    n = email.search("aol");
    if (n > -1) {
        return false;
    }
    n = email.search("hotmail");
    if (n > -1) {
        return false;
    }
    n = email.search("msn.com");
    if (n > -1) {
        return false;
    }
    n = email.search("rediffmail");
    if (n > -1) {
        return false;
    }
    n = email.search("yandex");
    if (n > -1) {
        return false;
    }
    n = email.search("outlook");
    if (n > -1) {
        return false;
    }
    n = email.search("zoho");
    if (n > -1) {
        return false;
    }
    n = email.search("mail.com");
    if (n > -1) {
        return false;
    }
    n = email.search("inbox.com");
    if (n > -1) {
        return false;
    }
    n = email.search("icloud");
    if (n > -1) {
        return false;
    }
    n = email.search("indiatimes");
    if (n > -1) {
        return false;
    }

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    f = regex.test(email);

    return f;
}

function submit_contact(event){
	if($('#chimp-form').valid()){
    event.preventDefault();
    event.stopPropagation();

    var form = event.target;
    var data = new FormData(form);

    console.log('submit_contact', form.elements, data);

    var fields = ['email', 'token'];
    fields.forEach(function (fieldName) {
        var element = form.querySelector('[name="' + fieldName + '"]');
        element.addEventListener('focus', function () {
            element.parentElement.removeAttribute('tooltip');
        });
    });

    var err = 0;

    if (data.get('email').length == 0) {
        err = 1;
        //form.querySelector('[name="email"]').parentElement.setAttribute('tooltip', 'Please enter email address.');
    } else if (!isEmail(data.get('email'))) {
        //form.querySelector('[name="email"]').parentElement.setAttribute('tooltip', 'Please enter valid email address.');
        err = 1;
    }

    if (err == 1) {
        return false;
    }

    const data2 = new URLSearchParams();
    for (const pair of data) {
        data2.append(pair[0], pair[1]);
    }

    fetch(form.getAttribute('action'),
    //fetch('https://languagepanel.com/newzam/sendmail.php',
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Accept": "application/json",
				},
				method: "POST",
				body: data2
			})
			.then(function (res) {
					console.log(res);
					/*if (res.ok) {
						form.style.backgroundColor = '#179b09';
					} else {
						form.style.backgroundColor = '#d10e0e';
					}*/

					res.json().then(function (msg) {
						console.log(msg);
						console.log(utf8_decode(msg.str))
						//doModal('Contact', msg);

						/*var html = '<div class="container"><div class="contact-result">';
						html += '<h1>Thank you!</h1>';
						html += '<p>We’ll get back to you as soon as possible at ' + data.get('email') + '</p>';
						html += '<p><a href="/">Back to home page</a></p>';
						html += '</div></div>';
						form.innerHTML = html;*/
						
						//$('#response').html(utf8_decode(jdata.str));
						$('#response').html('Mail is sent successfully');
						$('#email').val('');

					})

			})
			.catch(function (res) {
					console.error(res);
					doModal('Contact', 'Some error occurred, please try again later.');
			});

    return true;
	}	
}