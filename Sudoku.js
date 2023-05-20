class Sudoku{
    HideList = [] 
    fail = 0
    success = 0 
    hidetotal;
    RealBoard = []
    board;
        constructor(mode){
            if(mode == "easy"){
                this.hidetotal = 30
            }else if(mode == "med"){
                this.hidetotal = 50
            }else{
                this.hidetotal = 70
            }
          this.board = this.createBoard()
          this.generateSudoku()
          this.FullBoard()
          this.modeselect(this.hidetotal)
          this.Hide()
          this.createCell(81)
      }
        Hide(){
            for(let i=0; i<this.hidetotal; i++){
                this.RealBoard[this.HideList[i]] = true
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
                      i++ 
              }
  
              if(this.check(current)){
                this.HideList.push(current)
                  }else{
                      while(true){
                        current = this.random(81)
                          if(this.check(current)){
                            this.HideList.push(current)
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
  
            }else{
                document.getElementById(`cell${id}`).innerHTML=" ";
                document.getElementById(`cell${id}`).setAttribute("onclick", `test.click(${id});`);
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
            for(let i=0;i<81;i++){
               if( this.RealBoard[i].value==id){
                console.log(i)
                document.getElementById(`cell${i+1}`).className="testimg-select"
               }
               else{
                document.getElementById(`cell${i+1}`).className="sudoku-cell"
               }
            }

            
               
          }

          click(id){
                if( this.RealBoard[id].value==1){ 
                console.log("preme cute")
                }
                else
                {console.log("yung cute")}
            


        }
    
    
    }