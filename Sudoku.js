class Sudoku {
  alert = [
    "เเค่นี้ก็เล่นผิด ไม่เเเปลกที่เค้าไม่รัก",
    "ไม่ใช่ๆ เริ่มใหม่สิ เเต่เรื่องของเขาเริ่มใหม่ไม่ได้นะ",
    "ผิดได้ไง กลับบ้านไปดูดนมนอนซะ!",
    "ถ้าเค้าจะรักตอบผิดเค้าก็รัก เพราะงั้นตอบใหม่เถอะ",
    "You have had great success being a total idiot.",
    "Did you hear God call you an idiot?"
  ];
  countWrong=0;
  countbaby = 0;
  selectDigits = 0;
  HideList = [];
  fail = 0;
  success = 0;
  hidetotal;
  RealBoard = [];
  board;
  currentmode;
  constructor(mode) {
    //Preme
    if(localStorage.history == null){
      localStorage.setItem("history", "[]")
    }
    //Preme
//เช็คโหมด
    if (mode == "easy") {
      this.hidetotal = 4;
      localStorage.setItem('mode',"easy")
      if (localStorage.getItem("board") !== null) {

      //กรณีมีข้อมูลเดิมอยู่
        this.currentmode = 1;
        this.startTime = 0;
        this.oldboard(1);
        //Preme
        this.startTimer()
        //Preme
       
      } else {
        this.currentmode = 1;
        this.newgame();
        this.startTime = 0;
        this.board = this.createBoard(); //create 2D Array store in this.board property
        this.generateSudoku(); //gen num1-9 in 2D Array
        this.FullBoard(); //change 2D Arr(this.board) to 1D Arr(this.RealBoard)
        this.modeselect(this.hidetotal); //Random X positions to hide store in this.HideList
        this.Hide(); //Hide X positions use data in this.HideList

        //Fix Duplicate Preme
        if(document.getElementById("cell81") == null){
        this.createCell(81); //Create Sudoku Board (HTML)
        }
        //Preme

        this.LuckyBoardCheck(); //if start game and get that bear=9 -> disable that bear
        this.test(1);
        //Preme
        this.startTimer()
        //Preme
      }
    } else if (mode == "med") {
      this.hidetotal = 50;
      localStorage.setItem('mode',"med")
      if (localStorage.getItem("board2") !== null) {
        this.currentmode = 2;
        this.startTime = 0;
        this.oldboard(2);
        //Preme
        this.startTimer()
        //Preme
      } else {
        this.currentmode = 2;
        this.newgame();
        this.startTime = 0;
        this.board = this.createBoard(); //create 2D Array store in this.board property
        this.generateSudoku(); //gen num1-9 in 2D Array
        this.FullBoard(); //change 2D Arr(this.board) to 1D Arr(this.RealBoard)
        this.modeselect(this.hidetotal); //Random X positions to hide store in this.HideList
        this.Hide(); //Hide X positions use data in this.HideList
        
        //Fix Duplicate Preme
        if(document.getElementById("cell81") == null){
        this.createCell(81); //Create Sudoku Board (HTML)
        }
        //Preme

        this.LuckyBoardCheck(); //if start game and get that bear=9 -> disable that bear
        this.test(2);
        //Preme
        this.startTimer()
        //Preme
      }
    } else {
      this.hidetotal = 60;
      localStorage.setItem('mode',"hard")
      if (localStorage.getItem("board3") !== null) {
      
        this.currentmode = 3;
        this.startTime = 0;
        this.oldboard(3);
        //Preme
        this.startTimer()
        //Preme
      } else {
        this.currentmode = 3;
        this.newgame();
        this.startTime = 0;
        this.board = this.createBoard(); //create 2D Array store in this.board property
        this.generateSudoku(); //gen num1-9 in 2D Array
        this.FullBoard(); //change 2D Arr(this.board) to 1D Arr(this.RealBoard)
        this.modeselect(this.hidetotal); //Random X positions to hide store in this.HideList
        this.Hide(); //Hide X positions use data in this.HideList

        //Fix Duplicate Preme
        if(document.getElementById("cell81") == null){
        this.createCell(81); //Create Sudoku Board (HTML)
        }
        //Preme

        this.LuckyBoardCheck(); //if start game and get that bear=9 -> disable that bear
        this.test(3);
        //Preme
        this.startTimer()
        //Preme
      }
    }
  }
  static createaudio() {

    let isMuted;

    let bg = document.createElement("audio");
    bg.id = "bg";
    bg.src =
      "/preme/music/game-comedy-interesting-playful-sweet-bright-childish-music-57040.mp3";
    bg.type = "audio/mpeg";
    bg.loop = true;
    bg.autoplay = !isMuted;
    document.getElementsByTagName("body")[0].appendChild(bg);

    if(localStorage.muted == "true" && localStorage.muted != null ){
      isMuted = true
      
      document.getElementById("soundImage").src = "pic/sound_off.png";
      document.getElementById("bg").pause()
    }else{
      isMuted = false
      localStorage.setItem("muted", "false")

      document.getElementById("soundImage").src = "pic/sound_on.png";
      
    }

    let createsound = document.createElement("audio");
    createsound.id = "sound";
    createsound.type = "audio/mpeg";
    createsound.autoplay = true;
    document.getElementsByTagName("body")[0].appendChild(createsound);
    let soundImage = document.getElementById("soundImage");



    
    let muteButton = document.getElementById("muteButton");
      
    muteButton.addEventListener("click", function () {
      const audioElements = document.getElementsByTagName("audio");
      if (isMuted) {
        for (let i = 0; i < audioElements.length; i++) {
          audioElements[i].muted = false;
          
        }
        soundImage.src = "pic/sound_on.png";
        isMuted = false;
        localStorage.setItem("muted", "false")
        document.getElementById("bg").play()
      } else {
        for (let i = 0; i < audioElements.length; i++) {
          audioElements[i].muted = true;
        }
        soundImage.src = "pic/sound_off.png";
        isMuted = true;
        localStorage.setItem("muted", "true")
        document.getElementById("bg").pause()
      }
    });

 

    /* Toggle sound for createsound */
    createsound.addEventListener("click", function () {
      if (createsound.paused) {
        createsound.play();
      } else {
        createsound.pause();
      }
    });

  }
  sound(type) {
    let sound = document.getElementById("sound");

    switch (type) {


      case "correct":
        sound.src = `/preme/music/digitscell.mp3`;
        sound.play();

        break;

      case "wrong":
        sound.src = `/preme/music/digitcell-wrong.mp3`;
        sound.play();

        break;
      case "win":
        sound.src = `/preme/music/victory.mp3`;
        sound.play();

        break;

      default:
        break;
    }
  }
  LuckyBoardCheck() {
    for (let i = 1; i < 10; i++) {
      if (this.LuckyCount(i)) {
        document.getElementById(`${i}`).setAttribute("onclick", "preme");
        document
          .getElementById(`${i}`)
          .setAttribute("class", "digits-cell-disabled");
      } else {
        document
          .getElementById(`${i}`)
          .setAttribute("onclick", `sudokuCute.select(${i})`);
        document.getElementById(`${i}`).setAttribute("class", "digits-cell");
      }
    }
  }

  LuckyCount(num) {
    let stack = 0;

    for (let i = 0; i < 81; i++) {
      if (num == this.RealBoard[i].value && !this.RealBoard[i].isHide) {
        stack++;
      }
    }

    if (stack == 9) return true;

    return false;
  }

  Hide() {
    for (let i = 0; i < this.hidetotal; i++) {
      this.RealBoard[this.HideList[i]] = {
        value: this.RealBoard[this.HideList[i]].value,
        isHide: true,
      };
    }
  }
  //Change 2D Arr to 1D Arr
  FullBoard() {
    let j = 0;
    for (let i = 0; i < 10; i++) {
      if (i === 9) {
        j++;
        i = 0;
      }
      if (j === 9) break;
      this.RealBoard.push({ value: this.board[j][i], isHide: false });
    }
  }

  createCell(amount) {
    let i = 0;
    while (i < amount) {
      const cellZoneElm = document.createElement("div");
      cellZoneElm.setAttribute("id", `cell${i + 1}`);
      cellZoneElm.setAttribute("class", `sudoku-cell`);

      document.getElementById("sudoku-board").appendChild(cellZoneElm);

      this.display(i + 1, this.RealBoard[i].value, this.RealBoard[i].isHide);

      i++;
    }
  }

  random(max) {
    return parseInt(Math.random() * max) % max;
  }

  check = (value) => {
    for (let i = 0; i < 81; i++) {
      if (value == this.HideList[i]) {
        this.fail = 0;
        this.success = 0;
        return false;
      } else {
        this.success++;
        if (this.success > this.HideList.length) {
          this.fail = 0;
          this.success = 0;
          return true;
        }
      }
    }
  };

  modeselect = (hide) => {
    let i = 0;
    while (i < hide) {
      let current = this.random(81);
      if (i == 0) {
        this.HideList.push(current);
        i++;
      }

      if (this.check(current)) {
        this.HideList.push(current);
      } else {
        while (true) {
          current = this.random(81);
          if (this.check(current)) {
            this.HideList.push(current);
            break;
          }
        }
      }
      i++;
    }
  };

  display(id, value, isFaceDown) {
    if (isFaceDown === false) {
      document.getElementById(
        `cell${id}`
      ).innerHTML = `<img src="/preme/picture/${
        value + 1
      }.png" class="testimg" />`;
      document.getElementById(`cell${id}`).setAttribute("class", `sudoku-cell`);
    } else {
      document.getElementById(`cell${id}`).innerHTML = " ";
      document
        .getElementById(`cell${id}`)
        .setAttribute("onclick", `sudokuCute.click(${id});`);
    }
  }

  //Create 9x9 2D Array
  createBoard() {
    const board = [];
    for (let i = 0; i < 9; i++) {
      board[i] = [];
      for (let j = 0; j < 9; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  }

  generateSudoku() {
    this.fillCell(0, 0);
    return this.board;
  }

  fillCell(y, x) {
    if (x === 9) {
      y++; //next line
      x = 0;
      if (y === 9) {
        return true; //last cell is 8 because 0-8 = 9 [So 9 = 10 is more than sudoku size (9x9)]
      }
    }

    if (this.board[y][x] !== 0) {
      // Default num is 0 (if not equal to 0) = filled (+1 to go next cell)
      return this.fillCell(y, x + 1);
    }

    const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];
      if (this.isValid(y, x, num)) {
        this.board[y][x] = num; // Not Found same number (so set to that number)
        if (this.fillCell(y, x + 1)) {
          return true; //Check next cell
        }
        this.board[y][x] = 0; // Found same number (So set to default number is 0)
      }
    }

    return false; // Cant find valid num (So goto previous num)
  }

  isValid(y, x, num) {
    // Check same num in Y
    for (let i = 0; i < 9; i++) {
      if (this.board[y][i] === num) {
        return false;
      }
    }

    // Check same num in X
    for (let i = 0; i < 9; i++) {
      if (this.board[i][x] === num) {
        return false;
      }
    }

    // Check same number in the 3x3 box
    const startY = Math.floor(y / 3) * 3;
    const startX = Math.floor(x / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[startY + i][startX + j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); //use ; because endl
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  select(id) {
    this.selectDigits = id;
    for (let i = 0; i < 81; i++) {
      if (this.RealBoard[i].value == id && this.RealBoard[i].isHide != true) {
        document.getElementById(`cell${i + 1}`).className = "testimg-select";
      } else {
        document.getElementById(`cell${i + 1}`).className = "sudoku-cell";
      }
    }
  }
  // when click correct, css change
  click(id) {
    if (this.RealBoard[id - 1].value == this.selectDigits) {
      //console.log(this.counttest())
      document
        .getElementById(`cell${id}`)
        .setAttribute("class", "testimg-select");
      document.getElementById(
        `cell${id}`
      ).innerHTML = `<img src="/preme/picture/${
        this.selectDigits + 1
      }.png" class="testimg" />`;
      this.RealBoard[id - 1] = { value: this.selectDigits, isHide: false };
      console.log(this.RealBoard[id - 1]);
      //decrease  Hidelist
      this.HideList.splice(this.HideList.indexOf(id - 1), 1);
      this.hidetotal--;
      this.countTypeOfBear();
      this.sound("correct");
      //Preme
      this.test(this.currentmode);
      //Preme

      if (this.HideList.length == 0) {
        this.sound("win");
  
        //setTimeout(function({confirm("ชนะแล้ว เก่งเกินคน")},200);
        setTimeout(()=> confirm("adadsa"), 200)

        this.stopTimer();
        window.localStorage.setItem("status","true")
        window.location.href = "/win.html"
      }
    } else {
      this.sound("wrong");
      if(localStorage.getItem(`countWrong${this.currentmode}`) != null){
        let countwrong = parseInt(localStorage.getItem(`countWrong${this.currentmode}`))
        countwrong++
        localStorage.setItem(`countWrong${this.currentmode}`,countwrong)
      }else{
        localStorage.setItem(`countWrong${this.currentmode}`,"1")
      }
      
      setTimeout(()=> confirm(this.alert[this.random(this.alert.length)]), 200);
      
    }
}

  countTypeOfBear(){
    let keep = [];
    for (let k = 0; k < 81; k++) {
      if (
        this.selectDigits == this.RealBoard[k].value &&
        this.RealBoard[k].isHide == false
      ) {
        this.countbaby++;
        keep.push(k);
      } else if (
        this.selectDigits == this.RealBoard[k].value &&
        this.RealBoard[k].isHide
      ) {
        keep.push(k);
      }
      if (this.countbaby == 9) {
        for (let l = 0; l < keep.length; l++) {
          document.getElementById(`cell${keep[l] + 1}`).className =
            "sudoku-cell";
          document.getElementById(
            `cell${keep[l] + 1}`
          ).innerHTML = `<img src="/preme/picture/${
            this.selectDigits + 1
          }.png" class="testimg" />`;

          document
            .getElementById(`${this.selectDigits}`)
            .setAttribute("onclick", "eiei");
          document
            .getElementById(`${this.selectDigits}`)
            .setAttribute("class", "digits-cell-disabled");
          console.log("keep " + (keep[l] + 1));
        }
      }
    }
    console.log(" countbaby " + this.countbaby);
    this.countbaby = 0;
  }

  test(mode) {
    //Preme
    if(mode === 1){
      window.localStorage.setItem("board", JSON.stringify(this.RealBoard));
      window.localStorage.setItem("hide", JSON.stringify(this.HideList));
      window.localStorage.setItem("hidetotal", JSON.stringify(this.hidetotal));
     
      
    }else if(mode == 2){
      window.localStorage.setItem("board2", JSON.stringify(this.RealBoard));
      window.localStorage.setItem("hide2", JSON.stringify(this.HideList));
      window.localStorage.setItem("hidetotal2", JSON.stringify(this.hidetotal));
   
    }else{
      window.localStorage.setItem("board3", JSON.stringify(this.RealBoard));
      window.localStorage.setItem("hide3", JSON.stringify(this.HideList));
      window.localStorage.setItem("hidetotal3", JSON.stringify(this.hidetotal));
     
    }
    //Preme
  }

  newgame() {
    //Preme
    if(this.currentmode === 1){
      window.localStorage.removeItem("board")
      window.localStorage.removeItem("hide")
      window.localStorage.removeItem("hidetotal")
      window.localStorage.removeItem("elapsedTime")
    }else if(this.currentmode === 2){
      window.localStorage.removeItem("board2")
      window.localStorage.removeItem("hide2")
      window.localStorage.removeItem("hidetotal2")
      window.localStorage.removeItem("elapsedTime2")
    }else{
      window.localStorage.removeItem("board3")
      window.localStorage.removeItem("hide3")
      window.localStorage.removeItem("hidetotal3")
      window.localStorage.removeItem("elapsedTime3")
    }
    //Preme
  }

  oldboard(mode) {
    //Preme
    if(mode === 1){
      const old = JSON.parse(localStorage.board);
      const oldhide = JSON.parse(localStorage.hide);
      const oldhidetotal = JSON.parse(localStorage.hidetotal);

      this.RealBoard = old;
      this.HideList = oldhide;
      this.hidetotal = oldhidetotal;

      //Fix Duplicate Preme
      if(document.getElementById("cell81") == null){
      this.createCell(81);
      }
      //Preme

      this.RealBoard.forEach((element, index) => {
      this.display(index + 1, element.value, element.isHide);
    });

    this.Hide(); //Hide X positions use data in this.HideList
    this.LuckyBoardCheck(); //if start game and get that bear=9 -> disable that bear

    }else if(mode === 2){
      const old = JSON.parse(localStorage.board2);
      const oldhide = JSON.parse(localStorage.hide2);
      const oldhidetotal = JSON.parse(localStorage.hidetotal2);

      this.RealBoard = old;
      this.HideList = oldhide;
      this.hidetotal = oldhidetotal;
      
      //Fix Duplicate Preme
      if(document.getElementById("cell81") == null){
        this.createCell(81);
        }
        //Preme  
      
      this.RealBoard.forEach((element, index) => {
      this.display(index + 1, element.value, element.isHide);
    });

    this.Hide(); //Hide X positions use data in this.HideList
    this.LuckyBoardCheck(); //if start game and get that bear=9 -> disable that bear

    }else{
      const old = JSON.parse(localStorage.board3);
      const oldhide = JSON.parse(localStorage.hide3);
      const oldhidetotal = JSON.parse(localStorage.hidetotal3);

      this.RealBoard = old;
      this.HideList = oldhide;
      this.hidetotal = oldhidetotal;
      
      //Fix Duplicate Preme
      if(document.getElementById("cell81") == null){
        this.createCell(81);
        }
        //Preme
  
      this.RealBoard.forEach((element, index) => {
      this.display(index + 1, element.value, element.isHide);
    });

    this.Hide(); //Hide X positions use data in this.HideList
    this.LuckyBoardCheck(); //if start game and get that bear=9 -> disable that bear
    }
    //Preme
  }

  startTimer() {
    //Preme
    if(this.currentmode == 1){
      const elapsedTime = localStorage.getItem("elapsedTime");
      if (elapsedTime !== null) {
        this.startTime = Date.now() - parseInt(elapsedTime, 10);
        this.updateTimer();
      } else {
        this.startTime = Date.now();
      }
      this.timeInterval = setInterval(this.updateTimer.bind(this), 1000);
    }else if(this.currentmode == 2){
      const elapsedTime = localStorage.getItem("elapsedTime2");
      if (elapsedTime !== null) {
        this.startTime = Date.now() - parseInt(elapsedTime, 10);
        this.updateTimer();
      } else {
        this.startTime = Date.now();
      }
      this.timeInterval = setInterval(this.updateTimer.bind(this), 1000);
    }else{
      const elapsedTime = localStorage.getItem("elapsedTime3");
      if (elapsedTime !== null) {
        this.startTime = Date.now() - parseInt(elapsedTime, 10);
        this.updateTimer();
      } else {
        this.startTime = Date.now();
      }
      this.timeInterval = setInterval(this.updateTimer.bind(this), 1000);
    }
    //Preme
  }

  stopTimer() {
    clearInterval(this.timeInterval);
  }

  updateTimer() {
    const currentTime = Date.now(); // ใช้ Date.now() แทนการสร้างวัตถุ Date ใหม่
    this.elapsedTime = currentTime - this.startTime;

    const hours = Math.floor(this.elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (this.elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((this.elapsedTime % (1000 * 60)) / 1000);

    const timerDisplay = document.getElementById("setTime");
    timerDisplay.textContent =
      this.padZero(hours) +
      ":" +
      this.padZero(minutes) +
      ":" +
      this.padZero(seconds);

    // บันทึกค่าเวลาที่ผ่านไปล่าสุดใน Local Storage
    //Preme
    if(this.currentmode == 1){
      localStorage.setItem("elapsedTime", this.elapsedTime);
    }else if(this.currentmode == 2){
      localStorage.setItem("elapsedTime2", this.elapsedTime);
    }else{
      localStorage.setItem("elapsedTime3", this.elapsedTime);
    }
    //Preme
  }

  padZero(value) {
    return value.toString().padStart(2, "0"); // ใช้ padStart() เพื่อใส่ "0" ข้างหน้าตัวเลขที่มีค่าน้อยกว่า 10
  }

  static padZero(value) {
    return value.toString().padStart(2, "0"); // ใช้ padStart() เพื่อใส่ "0" ข้างหน้าตัวเลขที่มีค่าน้อยกว่า 10
  }

  clearAll(){
    this.stopTimer;
    localStorage.clear()
  }
}

/*const sudoku = new Sudoku();
window.addEventListener("load", function () {
  sudoku.startTimer();
});

const backButton = document.getElementById('backButton');
backButton.addEventListener('click', function() {
      sudoku.newgame(); 
    });
*/
