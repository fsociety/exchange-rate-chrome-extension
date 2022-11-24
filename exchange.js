const defaultExhange = {
  from: 'USD',
  to: 'TRY'
};

function getExhangeRate(){
  chrome.storage.sync.get(
    defaultExhange,
    function({from,to}) {
      var requestURL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&source=ecb`;
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();

      request.onload = function() {
        var response = request.response;
        document.getElementById('exchange-rate').innerHTML = response.result + ' ' + to;
      }
  });
}

function changeExRate(e){
  chrome.storage.sync.set({
    [e.target.id]: e.target.value
  }, function() {
    getExhangeRate();
  });
}

chrome.storage.sync.get(
  defaultExhange
  ,function({from,to}) {
  document.getElementById('from').value = from;
  document.getElementById('to').value = to;
});

getExhangeRate();
document.getElementById('from').addEventListener('change',changeExRate);
document.getElementById('to').addEventListener('change',changeExRate);