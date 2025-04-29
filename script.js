
var manaSpele = document.getElementById("manaSpele");
        var ctx = manaSpele.getContext("2d");

 addEventListener("keydown", MyKeyDownHandler); 

 var model_x = 0; // sākotnējā X pozīcija
 var model_y = 0;// sākotnējā Y pozīcija
 var modelImg = new Image();
 modelImg.src = "https://cdn-icons-png.flaticon.com/128/2908/2908521.png";

 var wings_x = 0;// sākotnējā X pozīcija
 var wings_y = 0;// sākotnējā Y pozīcija
 var wingsImg = new Image();
 wingsImg.src = "https://cdn-icons-png.flaticon.com/128/10073/10073615.png";
 // model izmēr
        var modelWidth = 50; 
        var modelHeight = 50;
// wings izmēr
        var wingsWidth = 20;
        var wingsHeight = 20
 function restart_game() {
     // uzspiežot s sāksies no sākuma 
     
     time_remaining = 20;
     score = 0;
     wings_speed = 3;
     }
  // Funkcija, kas ļauj, lai pārvietotu modeli pa kreisi un pa labi
function MyKeyDownHandler (MyEvent) { 
   if (MyEvent.keyCode == 37 && model_x > 0) { // Kreisais taustiņš
       model_x = model_x - 10}; // Pārvieto pa kreisi  
   if (MyEvent.keyCode == 39 && model_x+modelImg.width < manaSpele.width)
            { // Labais taustiņš
                model_x = model_x+10}; // Pārvieto modeli pa labi
                if (MyEvent.keyCode == 83) restart_game();                                            
   MyEvent.preventDefault();
   }
   
 var score = 0;

 function ImagesTouching(x1, y1, img1, x2, y2, img2) {
          if (x1 >= x2+img2.width || x1+img1.width <= x2) return false;   // Pārbauda, vai attēli ir pārāk tālu nošķirti uz X asi
          if (y1 >= y2+img2.height || y1+img1.height <= y2) return false;// Pārbauda, vai attēli ir pārāk tālu nošķirti uz Y asi
          return true;                                                    // Ja nav pārāk tālu, attēli pārklājas  
          }
 var time_remaining = 20; // Spēles laiks


 function Do_a_Frame () {
    ctx.clearRect(0, 0, manaSpele.width, manaSpele.height);

    ctx.fillStyle= "red"; // Uzstāda teksta krāsu
    ctx.font = "20px Arial"; // Uzstāda fontu
    ctx.fillText("Score: " + score, 0, 20); // Parāda punktu skaitu

    model_y = manaSpele.height - modelImg.height;  // Nosaka modeļa Y pozīciju, lai tas būtu kanvas apakšā
    ctx.drawImage(modelImg, model_x, model_y); // Zīmē modeli uz kanvas
     ctx.fillText("Time Remaining: " + Math.round(time_remaining), 0, 45); // Parāda atlikušos sekundes

    if (time_remaining <= 0) {
          ctx.fillStyle= "blue"; // Uzstāda teksta krāsu uz zilu
          ctx.font = "bold 50px Arial"; // Uzstāda fontu
          ctx.textAlign="center"; // Izlīdzina tekstu pa vidu
          ctx.fillText("Game Over",manaSpele.width / 2, manaSpele.height / 2); // Parāda "Game Over"
           ctx.font = "bold 20px Arial";
          ctx.fillText("Press S to play again", manaSpele.width / 2, (manaSpele.height / 2)+50);
          ctx.textAlign="left"; // Tekstu pa kreisi
          }
    else {
          time_remaining = time_remaining - 1/40; // Laika atskaitīšana

          wings_y = wings_y + 3; // Spārni kustas uz leju
          if (wings_y > manaSpele.height) {
              wings_y= 0; //Ja spārni iziet ārā no kanvasa apakšas, tos novieto augšā
              wings_x= Math.random() * (manaSpele.width - wingsImg.width);// Nejauši izvēlas jaunu X pozīciju spārniem
              }   
          }
    ctx.drawImage(wingsImg, wings_x, wings_y); // Zīmē spārnus uz kanvas
// Ja modelis saskaras ar spārniem, palielinām punktu skaitu un pārkārtojam spārnu pozīcijas
    if (ImagesTouching(model_x, model_y, modelImg, wings_x, wings_y, wingsImg)) {
        score= score + 5; // Palielina punktus
        wings_x= -wingsImg.width;
        }
    } // Izsauc 25 milisekundes
    setInterval(Do_a_Frame, 25);
