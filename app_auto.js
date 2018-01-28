var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

var rect = two.makeRectangle(two.width / 2, two.height / 2, 600, 600);
var black = false;

// SET FREQUENCY (Hz)
let freqs = [5, 7, 12];
let obs_time = 6;

let periods = [];
let index = 0;
for ( i = 0; i< freqs.length; i++){
  periods[i] = 1/freqs[i];
}

let period = periods[index];


console.log("PERIOD " + period);

// FPS COUNTER //
let fps = 0;
let old_time = Date.now();
let delta_time = 0;

// FLASHING //
let delta = 0;
let ellapsed = 0;

// AUTOMATED
let count = 0;

two.bind('update', function() {

  // FPS Logic //
  frames ++;
  let new_time = Date.now();
  delta_time = delta_time + (new_time - old_time)/1000;
  delta = (new_time - old_time)/1000;
  old_time = new_time;
  if (delta_time > 1.0) {
    console.log("FPS: " + frames);
    frames = 0;
    delta_time = 0;
  }

  ellapsed = ellapsed + delta;
  if (ellapsed > period){
    ellapsed = 0;
    if (black || freqs[index] ==0){
      rect.fill = 'rgb(255, 255, 255)';
    }
    else{
      rect.fill= 'rgb(0,0,0)';
    }
    black = !black;

  }

  count ++;
  if (count > obs_time * 60){
    count = 0;
    index = (index + 1 ) % periods.length;
    period = periods[index]
  }
});
