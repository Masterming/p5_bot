let speech;
let speechRec;
let bot;

let attempts = 0;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.position(400,20);

  //start Bot
  bot = new RiveScript();
  bot.loadFile("code/brain.rive", brainReady, brainError);

  function brainReady() {
    bot.sortReplies();
    let num = floor(random(10)) + 1;
    bot.setVariable('num', num);
  }

  function brainError() {
    console.log('Chatbot error!');
  }

  //starting Speaking
  speech = new p5.Speech();
  speech.onLoad = ready;

  function ready() {
    speech.setVoice(speech.voices[3].name);
    say("Hello!");
    say("Guess a number between 1 and 10.");
  }

  //starting Speech-Recognition
  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  speechRec.start(true, false);

  function gotSpeech() {
    takeGuess(speechRec.resultString);
  }
}

//draw the attempts
function draw() {
  background(51);
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(0);
  strokeWeight(12);
  textSize(80);
  text(attempts, width / 2, height / 2);
}

function say(s) {
  speech.speak(s);
  let p = createP("Bot: " + s);
  p.style("font-weight", '600');
  p.style("color", '#000066');
}

function takeGuess(text) {
  //what the bot might understand XD
  if (text == "one" || text == "Bonn" || text == "born") text = 1;
  if (text == "two") text = 2;
  if (text == "three" || text == "free") text = 3;
  if (text == "four" || text == "for") text = 4;
  if (text == "five") text = 5;
  if (text == "six" || text == "sex" || text == "sixt") text = 6;

  let reply = bot.reply("local-user", text);
  var p = createP("User: " + text);
  p.style("font-weight", '600');
  p.style("color", '#009000');
  say(reply);
  attempts++;
}
