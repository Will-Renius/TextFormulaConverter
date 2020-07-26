//
function textToFunction() { 
  var sheet = SpreadsheetApp.getActiveSheet();  
  var range = sheet.getActiveRange();   // The cell which holds the formula
  var values = range.getValues(); 
  for (var i = 0; i < values[0].length; i++){
    for(var j = 0; j < values.length; j++){
      if(!range.getCell(j+1, i+1).isBlank()){
        values[j][i] = "=" + values[j][i];
        if( (values[j][i].substring(0,2)) == "=="){   // Test for == at beginning of formula. If present, fix it.
          values[j][i] = values[j][i].substring(1,(values[j][i].length));
        }
      }
      
    }
  }
  var cells = range;  // The cell where I want the results to be
  cells.setFormulas(values);              // Setting the formula.
}
function functionToText() { 
  var sheet = SpreadsheetApp.getActiveSheet();  
  var range = sheet.getActiveRange();   // The cell which holds the formula=
  var formulas = range.getFormulas(); 
  for (var i = 0; i < formulas[0].length; i++){
   for(var j = 0; j < formulas.length; j++){
    
       formulas[j][i] = formulas[j][i].replace("=", "");
      }
   
  } 
  var cells = range;  // The cell where I want the results to be
  cells.setValues(formulas);              // Setting the formula.
}


/* What should the add-on do when a document is opened */
function onOpen() {
  var ss = SpreadsheetApp.getActive();
  var items = [
      {name: 'Convert To Text', functionName: 'functionToText'},
      null, // Results in a line separator.
      {name: 'Convert To Formula', functionName: 'textToFunction'}
   ];
   ss.addMenu('Text Formula Converter', items);
 
}
/* What should the add-on do after it is installed */
function onInstall() {
  onOpen();
}
