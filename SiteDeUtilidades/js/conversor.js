var Dec;
var Bin;
var Hex;
var Oct;

$(".RadioButton").on("click", function (event) {
  event = event.target.id;
  if (event == "dec") {
    $("#dec").prop("checked", true);
    $("#bin").prop("checked", false);
    $("#hex").prop("checked", false);
    $("#oct").prop("checked", false);
    $("#numDec").prop("disabled", false);
    $("#numBin").prop("disabled", true);
    $("#numHex").prop("disabled", true);
    $("#numOct").prop("disabled", true);
    $("#numBin").val('');
    $("#numHex").val('');
    $("#numOct").val('');

  }
  if (event == "bin") {
    $("#bin").prop("checked", true);
    $("#dec").prop("checked", false);
    $("#hex").prop("checked", false);
    $("#oct").prop("checked", false);
    $("#numBin").prop("disabled", false);
    $("#numDec").prop("disabled", true);
    $("#numHex").prop("disabled", true);
    $("#numOct").prop("disabled", true);
    $("#numDec").val('');
    $("#numHex").val('');
    $("#numOct").val('');
  }
  if (event == "hex") {
    $("#hex").prop("checked", true);
    $("#dec").prop("checked", false);
    $("#bin").prop("checked", false);
    $("#oct").prop("checked", false);
    $("#numHex").prop("disabled", false);
    $("#numDec").prop("disabled", true);
    $("#numBin").prop("disabled", true);
    $("#numOct").prop("disabled", true);
    $("#numDec").val('');
    $("#numBin").val('');
    $("#numOct").val('');
  }
  if (event == "oct") {
    $("#oct").prop("checked", true);
    $("#dec").prop("checked", false);
    $("#bin").prop("checked", false);
    $("#hex").prop("checked", false);
    $("#numOct").prop("disabled", false);
    $("#numDec").prop("disabled", true);
    $("#numBin").prop("disabled", true);
    $("#numHex").prop("disabled", true);
    $("#numDec").val('');
    $("#numBin").val('');
    $("#numHex").val('');
  }
});

$(".input").on("keyup", function (event) {
  switch (event.target.id) {
    case "numDec":
      Dec = parseInt($("#numDec").val());
      Bin = parseInt(Dec).toString(2);
      Hex = decimalToHexString(Dec);
      Oct = parseInt(Dec).toString(8);
      break;

    case "numBin":
      Bin = parseInt($("#numBin").val());
      Dec = parseInt(Bin, 2);
      Hex = decimalToHexString(Dec).toString(16);
      Oct = parseInt(Bin.toString(8));
      break;

    case "numHex":
      Dec = parseInt($("#numHex").val(), 16);
      Bin = Dec.toString(2);
      Hex = $("#numHex").val();
      Oct = Dec.toString(8);
      break;

    case "numOct":
      Oct = parseInt($("#numOct").val());
      Dec = parseInt(Oct, 8);
      Bin = Dec.toString(2);
      Hex = decimalToHexString(Dec);
      break;

    default:
        Dec= '';
        Bin= '';
        Hex= '';
        Oct= '';
      break;
  }
  function decimalToHexString(number)
  {
    if (number < 0)
    {
      number = 0xFFFFFFFF + number + 1;
    }
  
    return number.toString(16).toUpperCase();
  }
$("#numDec").val(Dec)
$("#numBin").val(Bin)
$("#numHex").val(`${Hex}`)
$("#numOct").val(Oct)



});


