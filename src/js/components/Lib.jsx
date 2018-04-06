export const addPadding = (number, length) => {

    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}

export const parseTime = (time) => {
  var returnTime;
  var hour;
  var min;
  const pm = " PM";
  const am = " AM";
  
  if (time == 2400){
  returnTime = "12:00 AM";
  }
  //special case hour is 0
  else if (Math.floor(time / 100) == 0){
    hour = "12";
    min = time % 100;
    min = addPadding(min,2);
    
    returnNum = hour + ":" + min + am;
  }
  //pm time
  else if (time >= 1200 && time < 2400){
    if (time > 1300)
      time = time - 1200;
    hour = Math.floor(time / 100);
    hour = hour.toString();
    min = time % 100;
    min = addPadding(min,2);
    
    returnTime = hour + ":" + min + pm;
  }
  //am time
  else{
    hour = Math.floor(time / 100);
    hour = hour.toString();
    min = time % 100;
    min = addPadding(min,2);
    
    returnTime = hour + ":" + min + am;
  }
  
  return returnTime;
}