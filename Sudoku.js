class Sudoku{
    alert=[
      "เเค่นี้ก็เล่นผิด ไม่เเเปลกที่เค้าไม่รัก",
      "ไม่ใช่ๆ เริ่มใหม่สิ เเต่เรื่องของเขาเริ่มใหม่ไม่ได้นะ",
      "ผิดได้ไง กลับบ้านไปดูดนมนอนซะ!",
      "ถ้าเค้าจะรักตอบผิดเค้าก็รัก เพราะงั้นตอบใหม่เถอะ"
    ]
    countbaby=0;
    selectDigits =0 
    HideList = []
    NewHideList = [] 
    fail = 0
    success = 0 
    hidetotal;
    RealBoard = []
    Fetch = []
    board;
        constructor(mode){
            if(mode == "easy"){
                this.hidetotal = 40   
            }else if(mode == "med"){
                this.hidetotal = 50
            }else{
                this.hidetotal = 60
            }
          this.board = this.createBoard() //create 2D Array store in this.board property
          this.generateSudoku() //gen num1-9 in 2D Array
          this.FullBoard() //change 2D Arr(this.board) to 1D Arr(this.RealBoard)
          this.modeselect(this.hidetotal) //Random X positions to hide store in this.HideList
          this.Hide() //Hide X positions use data in this.HideList
          this.createCell(81) //Create Sudoku Board (HTML)
          this.LuckyBoardCheck() //if start game and get that bear=9 -> disable that bear
        }
        static createaudio(){
          let bg = document.createElement('audio');
          bg.id       = 'bg';
          bg.src      = '/preme/music/game-comedy-interesting-playful-sweet-bright-childish-music-57040.mp3';
          bg.type     = 'audio/mpeg';
          bg.loop = true
          bg.autoplay = true
          document.getElementsByTagName(`body`)[0].appendChild(bg);

          let createsound = document.createElement('audio');
          createsound.id= `sound`
          createsound.type=`audio/mpeg`
          createsound.autoplay= true
          document.getElementsByTagName(`body`)[0].appendChild(createsound);
        }


        sound(type){
          let sound = document.getElementById("sound");

          switch(type){

            case "correct": sound.src = `/preme/music/digitscell.mp3`
                            sound.play()
                            
                            break

            case "wrong":   sound.src = `/preme/music/digitcell-wrong.mp3`
                            sound.play()
                            
                            break
           case "win":      sound.src = `/preme/music/victory.mp3`
                            sound.play()
                            
                            break

            default: break
          }
          
        }
        LuckyBoardCheck(){
          for(let i=1; i<10; i++){
            if(this.LuckyCount(i)){
              document.getElementById(`${i}`).setAttribute("onclick", "eiei")
              document.getElementById(`${i}`).setAttribute("class", "digits-cell-disabled")
            }else{
              document.getElementById(`${i}`).setAttribute("onclick", `sudokuCute.select(${i})`)
              document.getElementById(`${i}`).setAttribute("class", "digits-cell")
            }
          }
        }

        LuckyCount(num){
          let stack = 0

          for(let i=0; i<81; i++){
            if(num == this.RealBoard[i].value && !this.RealBoard[i].isHide){
              stack++
            }
          }

          if(stack == 9) return true
          
          return false
        }

        Hide(){
            for(let i=0; i<this.hidetotal; i++){
                this.RealBoard[this.HideList[i]] = {value: this.RealBoard[this.HideList[i]].value, isHide: true}
                this.Fetch[this.HideList[i]] = {value: this.RealBoard[this.HideList[i]].value, isHide: true}
            }
         } 
         //Change 2D Arr to 1D Arr
        FullBoard(){
            let j =0
            for(let i=0; i<10; i++){
                if(i===9){
                    j++
                    i=0
                } 
                if(j===9) break
                this.RealBoard.push({value: this.board[j][i], isHide: false})
                this.Fetch.push({value: this.board[j][i], isHide: false})
            }
        }

        createCell(amount){
            let i=0;
             while(i<amount){
               const cellZoneElm = document.createElement("div")
               cellZoneElm.setAttribute("id", `cell${i+1}`)
               cellZoneElm.setAttribute("class", `sudoku-cell`)
  
               document.getElementById("sudoku-board").appendChild(cellZoneElm)
  
              this.display(i+1,this.RealBoard[i].value,this.RealBoard[i].isHide)
  
               i++;
                   }
         }
  
        random(max) {
              return parseInt(Math.random() * max) % max
           }
  
        check =(value)=>{
           
              for(let i=0; i<81; i++){
                  if(value == this.HideList[i]){
                    this.fail = 0
                    this.success = 0
                      return false
                  }else{
                    this.success++
                      if(this.success > this.HideList.length){
                        this.fail = 0
                        this.success = 0
                          return true
                      }
                  }
              } 
           }
  
        modeselect =(hide)=>{
            let i = 0 
            while(i<hide){
              let current = this.random(81)
              if(i == 0){
                this.HideList.push(current)
                this.NewHideList.push(current)
                      i++ 
              }
  
              if(this.check(current)){
                this.HideList.push(current)
                this.NewHideList.push(current)
                  }else{
                      while(true){
                        current = this.random(81)
                          if(this.check(current)){
                            this.HideList.push(current)
                            this.NewHideList.push(current)
                              break
                          }  
                      }
                  } 
              i++
        }
          
    } 
  
         display(id,value,isFaceDown){
        
            if(isFaceDown===false){       
                document.getElementById(`cell${id}`).innerHTML = `<img src="/preme/picture/${value+1}.png" class="testimg" />`;
                document.getElementById(`cell${id}`).setAttribute("class", `sudoku-cell`);
  
            }else{
                document.getElementById(`cell${id}`).innerHTML=" ";
                document.getElementById(`cell${id}`).setAttribute("onclick", `sudokuCute.click(${id});`);
            }
         }

        //Create 9x9 2D Array 
        createBoard() {
            const board = []
            for (let i = 0; i < 9; i++) {
              board[i] = []
              for (let j = 0; j < 9; j++) {
                board[i][j] = 0
              }
            }
            return board
          }


        generateSudoku() {
            this.fillBoard(this.board)
            return this.board
          }
          

        fillBoard() {
            const row = 0
            const col = 0
            this.fillCell(row, col)
          }
          

        fillCell(row, col) {
            if (col === 9) {
              row++ //new line (row)
              col = 0
              if (row === 9) {
                return true //last row is 8 because 0-8 = 9 [So 9 = 10 is more than sudoku size (9x9)]
              }
            }
          
            if (this.board[row][col] !== 0) {
              // Default num is 0 (if not equal to 0) = filled (+1 to go next column)
              return this.fillCell(row, col + 1)
            }
          
            const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
          
            for (let i = 0; i < numbers.length; i++) {
              const num = numbers[i]
              if (this.isValid(row, col, num)) {
                this.board[row][col] = num // Not Found same number (so set to that number)
                if (this.fillCell(row, col + 1)) {
                  return true //Check next line
                }
                this.board[row][col] = 0 // Found same number (So set to default number is 0)
              }
            }
          
            return false // Cant find valid num (So goto previous num)
          }
          
        isValid(row, col, num) {
            // Check same num in row
            for (let i = 0; i < 9; i++) {
              if (this.board[row][i] === num) {
                return false
              }
            }
          
            // Check same num in column (line)
            for (let i = 0; i < 9; i++) {
              if (this.board[i][col] === num) {
                return false
              }
            }
          
            // Check same number in the 3x3 box
            const startRow = Math.floor(row / 3) * 3
            const startCol = Math.floor(col / 3) * 3
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (this.board[startRow + i][startCol + j] === num) {
                  return false
                }
              }
            }
          
            return true
          }
          
          shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1)); //use ; because endl
              [array[i], array[j]] = [array[j], array[i]]
            }
            return array;
          }

          select(id){
            this.selectDigits=id
            for(let i=0;i<81;i++){
               if(this.RealBoard[i].value==id && this.RealBoard[i].isHide!=true){
                document.getElementById(`cell${i+1}`).className="testimg-select"
               }
               else{
                document.getElementById(`cell${i+1}`).className="sudoku-cell"
               }
            }

            
               
          }
          // when click correct, css change
        click(id){
          
                if( this.RealBoard[id-1].value==this.selectDigits){ 
                    
                    //console.log(this.counttest())
                    document.getElementById(`cell${id}`).setAttribute("class", "testimg-select")
                    document.getElementById(`cell${id}`).innerHTML = `<img src="/preme/picture/${this.selectDigits+1}.png" class="testimg" />`
                    this.RealBoard[id-1]={value:this.selectDigits, isHide: false}
                    console.log(this.RealBoard[id-1])
                   //decrease  Hidelist
                   this.HideList.splice(this.HideList.indexOf(id-1),1)
                   this.countTypeOfBear()
                   this.sound("correct")
                   
                   if(this.HideList.length == 0){ 
                    this.sound("win")
                    document.getElementById(`message`).innerHTML=`<p>ชนะแล้ว เก่งเกินคน</p>`
                    }
                }
                else
                {
                    this.sound("wrong")
                    document.getElementById(`message`).innerHTML=`<p>${this.alert[this.random(this.alert.length)]}</p>`
                }

                }
                
        countTypeOfBear(){
            let keep = []
                for(let k=0;k<81;k++){
                if( this.selectDigits == this.RealBoard[k].value && this.RealBoard[k].isHide==false ){ 
                    this.countbaby++
                    keep.push(k)
                }else if(this.selectDigits == this.RealBoard[k].value && this.RealBoard[k].isHide){
                    keep.push(k)
                }
                if(this.countbaby==9){
                    for(let l=0;l<keep.length;l++){
                        document.getElementById(`cell${(keep[l]+1)}`).className ="sudoku-cell"
                        document.getElementById(`cell${(keep[l]+1)}`).innerHTML = `<img src="/preme/picture/${this.selectDigits+1}.png" class="testimg" />`
                        
                        document.getElementById(`${this.selectDigits}`).setAttribute("onclick", "eiei")
                        document.getElementById(`${this.selectDigits}`).setAttribute("class", "digits-cell-disabled")
                        console.log("keep "+(keep[l]+1))
                    }
                   }

                }
                console.log(" countbaby "+this.countbaby)
                this.countbaby=0

        }
    

    
    }
            
            
    
    