class LetsPlayTheGame {

    constructor() {
        this.hands =  ['rock', 'paper','scissor'];
        this.player = null;
        this.playerElement = null;
        this.comp = null;
        this.compElement = null;
        this.alreadySelected = false;
        this.result = document.querySelector('.result');
    }

    match(element) {
        if(!this.alreadySelected) {
            this.playerElement = element;
            this.alreadySelected = true;
            this.playerElement.classList.add('bingkai');
            this.player = this.playerElement.id;
            this.#randomCompHand();
            this.#rules();
        } else {
            alert('anda sudah memilih, klik refresh untuk main lagi');
        }
    }   

    #randomCompHand() {
        this.comp = this.hands[Math.floor(Math.random() * this.hands.length)];
        this.compElement = document.querySelector(`#comp-${this.comp}`);
        this.compElement.classList.add('bingkai');
      }

    #rules() {
        let msg;
        if (this.player == this.comp) {
          msg = 'DRAW';
        } else {
          if ((this.player == 'rock' && this.comp == 'scissor') || (this.player == 'scissor' && this.comp == 'paper') || (this.player == 'paper' && this.comp == 'rock')) {
            msg = 'PLAYER WIN';
          } else {
            msg = 'COMP WIN';
          }
        }
        this.result.innerHTML = msg;
        
        msg == 'DRAW' ? 
        this.result.classList.add('msg', 'msg-draw') : 
        this.result.classList.add('msg', 'msg-win');

        if (msg === 'DRAW') {
          return null;
        }
        if (msg === 'PLAYER WIN') {
          return msg;
        } else {
          return msg;
        }
    }
    refresh() {
        if (this.alreadySelected) {
          this.alreadySelected = false;
          this.playerElement.classList.remove('bingkai');
          this.compElement.classList.remove('bingkai');
          this.player = null;
          this.comp = null;
          this.alreadySelected = false;
          this.result.innerHTML = 'VS';
          this.result.classList.remove('msg', 'msg-draw');
          this.result.classList.remove('msg', 'msg-win');

        } else {
          return alert('Silahkan Pilih Tangan Pada Player Untuk Bermain Lalu Menangkan!!');
        }
      }
}

const gameStart = new LetsPlayTheGame();