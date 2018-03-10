function copyTable(tableID) {
  
  var tableRange = document.getElementById(tableID);
  var range = document.createRange();
  var sel = window.getSelection();

  sel.removeAllRanges();
  range.selectNodeContents(tableRange);
  sel.addRange(range);
  
  document.execCommand('Copy');  
}