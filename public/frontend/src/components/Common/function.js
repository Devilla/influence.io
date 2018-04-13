import $ from 'jquery';
export function validatewebsite(website){
  var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return re.test(website);
}

export function validphone(phone){
  var re = /^(\+[\d]{1,5}|0)?[7-9]\d{9}$/;
  return re.test(phone);
}
export function validateemail(email){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export function getCookie(cname) {
  const cookie = localStorage.getItem(cname);
  const authToken = cookie?JSON.parse(cookie):null;
  return authToken.token;
}

export function ajaxgetrequest(url,token){

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "GET",
    "headers": {
      "authorization": "JWT "+token,
      "cache-control": "no-cache",
    }
  }
  var arr=[];
  $.ajax(settings).done(function (response) {

    for(var i =0; i < response.length; i++){
      arr.push(response[i])
    }

  });
   return arr;
}
