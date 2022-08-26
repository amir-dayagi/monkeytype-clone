import { CHAR_STATUS, CURSOR, WORD_STATUS, KEY } from "./constants";

export class Char {
  constructor(char, status) {
    this.char = char;
    this.status = status ? status : -1;
    this.cursor = -1;
  }
}

export class Word {
  constructor(str, dispatch, row) {
    this.dispatch = dispatch;
    this.chars = this.strToCharArr(str);
    this.status = -1;
    this.currIdx = 0;
    this.row = row;
    this.incorrect = 0;
    // this.totalincorrect = 0;
    this.isActive = false;
  }

  //transfer a str to an arr of Char objects and returns that arr
  strToCharArr(str) {
    const charArr = [];
    for (const char of [...str]) {
      charArr.push(new Char(char));
    }
    return charArr;
  }

  //returns Char of the current idx
  getCurrChar() {
    return this.chars[this.currIdx];
  }

  //return Char of the idx it got as a param
  getChar(idx) {
    return this.chars[idx];
  }

  //adds a Char to the chars arr with a char value of the param, and a status of extra
  addExtra(char) {
    this.chars.push(new Char(char, CHAR_STATUS.EXTRA));
    this.incorrect++;
    this.dispatch("changeExtra", 1);
    // this.totalincorrect++;
  }

  //removes the last Char from the chars arr
  removeExtra() {
    this.chars.pop();
    this.incorrect--;
    this.dispatch("changeExtra", -1);
  }

  //changes this.status depending on amount of incorrect
  updateStatus() {
    if (this.incorrect > 0) {
      this.status = WORD_STATUS.INCORRECT;
      // this.dispatch("changeError", 1);
    } else {
      this.status = -1;
    }
    // this.status = this.incorrect > 0 ? WORD_STATUS.INCORRECT : -1;
  }

  //inverts this.isActive
  activeSwitch() {
    this.isActive = !this.isActive;
    this.updateCursor();
  }

  //called when a key is pressed (handles each case). returns type of key
  keyHandler(key) {
    if (key === " ") {
      if (this.currIdx > 0) {
        this.completeWord();
        return KEY.SPACE;
      }
      return;
    } else if (key === "Backspace") {
      if (this.currIdx === 0) {
        return KEY.BACKSPACE_START;
      } else {
        this.currIdx--;
        //if last char was an extra simply remove it
        if (this.getCurrChar().status === CHAR_STATUS.EXTRA) {
          this.removeExtra();
        } else {
          //if the char was incorrect, remove one from incorrect
          if (this.getCurrChar().status === CHAR_STATUS.INCORRECT) {
            this.incorrect--;
            this.dispatch("changeIncorrect", -1);
          } else {
            this.dispatch("changeCorrect", -1);
          }
          this.getCurrChar().status = -1;
        }
        //update word's status and where the cursor is
        this.updateStatus();
        this.updateCursor();
        return KEY.BACKSPACE;
      }
    }

    //if we are already beyond the last char simply add an extra
    if (this.currIdx === this.chars.length) {
      this.addExtra(key);
    } else {
      //find what char is expected
      const charToMatch = this.getCurrChar().char;
      if (key === charToMatch) {
        //if it matches we update that char's status to correct
        this.getCurrChar().status = CHAR_STATUS.CORRECT;
        this.dispatch("changeCorrect", 1);
      } else {
        //if it doesn't match we update that char's status to incorrect and add one to the incorrect
        this.getCurrChar().status = CHAR_STATUS.INCORRECT;
        this.incorrect++;
        this.dispatch("changeIncorrect", 1);

        // this.totalincorrect++;
      }
    }
    //move on to the next char and update word's status and where the cursor is
    this.currIdx++;
    this.updateStatus();
    this.updateCursor();
    return KEY.CHARACTER;
  }

  //called when space is pressed
  completeWord() {
    //if there is more than one error or there are any chars that yet to be correct or incorrect (aka not touched) make word's status incorrect
    const incompleteChars = this.chars.filter(({ status }) => status === -1)
      .length;
    if (this.incorrect > 0 || incompleteChars > 0) {
      // this.totalincorrect++;
      this.status = WORD_STATUS.INCORRECT;
      // this.dispatch("changeError", 1);
    } else {
      //else reset status
      this.status = -1;
    }
  }

  //updates all Char in chars arr status according to currIdx
  updateCursor() {
    //reset cursor for all chars
    this.chars.forEach(char => {
      char.cursor = -1;
    });
    if (this.isActive) {
      //if the current idx is not the last char make that char have a left cursor
      if (this.currIdx < this.chars.length) {
        this.getCurrChar().cursor = CURSOR.LEFT;
      } else {
        //else get a right cursor
        this.getChar(this.currIdx - 1).cursor = CURSOR.RIGHT;
      }
    }
  }
}

export class WordBank {
  constructor() {
    this.words = "a ability able about above accept according account across act action activity actually add address administration admit adult affect after again against age agency agent ago agree agreement ahead air all allow almost alone along already also although always American among amount analysis and animal another answer any anyone anything appear apply approach area argue arm around arrive art article artist as ask assume at attack attention attorney audience author authority available avoid away baby back bad bag ball bank bar base be beat beautiful because become bed before begin behavior behind believe benefit best better between beyond big bill billion bit black blood blue board body book born both box boy break bring brother budget build building business but buy by call camera campaign can cancer candidate capital car card care career carry case catch cause cell center central century certain certainly chair challenge chance change character charge check child choice choose church citizen city civil claim class clear clearly close coach cold collection college color come commercial common community company compare computer concern condition conference Congress consider consumer contain continue control cost could country couple course court cover create crime cultural culture cup current customer cut dark data daughter day dead deal death debate decade decide decision deep defense degree Democrat democratic describe design despite detail determine develop development die difference different difficult dinner direction director discover discuss discussion disease do doctor dog door down draw dream drive drop drug during each early east easy eat economic economy edge education effect effort eight either election else employee end energy enjoy enough enter entire environment environmental especially establish even evening event ever every everybody everyone everything evidence exactly example executive exist expect experience expert explain eye face fact factor fail fall family far fast father fear federal feel feeling few field fight figure fill film final finally financial find fine finger finish fire firm first fish five floor fly focus follow food foot for force foreign forget form former forward four free friend from front full fund future game garden gas general generation get girl give glass go goal good government great green ground group grow growth guess gun guy hair half hand hang happen happy hard have he head health hear heart heat heavy help her here herself high him himself his history hit hold home hope hospital hot hotel hour house how however huge human hundred husband I idea identify if image imagine impact important improve in include including increase indeed indicate individual industry information inside instead institution interest interesting international interview into investment involve issue it item its itself job join just keep key kid kill kind kitchen know knowledge land language large last late later laugh law lawyer lay lead leader learn least leave left leg legal less let letter level lie life light like likely line list listen little live local long look lose loss lot love low machine magazine main maintain major majority make man manage management manager many market marriage material matter may maybe me mean measure media medical meet meeting member memory mention message method middle might military million mind minute miss mission model modern moment money month more morning most mother mouth move movement movie Mr Mrs much music must my myself name nation national natural nature near nearly necessary need network never new news newspaper next nice night no none nor north not note nothing notice now n't number occur of off offer office officer official often oh oil ok old on once one only onto open operation opportunity option or order organization other others our out outside over own owner page pain painting paper parent part participant particular particularly partner party pass past patient pattern pay peace people per perform performance perhaps period person personal phone physical pick picture piece place plan plant play player PM point police policy political politics poor popular population position positive possible power practice prepare present president pressure pretty prevent price private probably problem process produce product production professional professor program project property protect prove provide public pull purpose push put quality question quickly quite race radio raise range rate rather reach read ready real reality realize really reason receive recent recently recognize record red reduce reflect region relate relationship religious remain remember remove report represent Republican require research resource respond response responsibility rest result return reveal rich right rise risk road rock role room rule run safe same save say scene school science scientist score sea season seat second section security see seek seem sell send senior sense series serious serve service set seven several sex sexual shake share she shoot short shot should shoulder show side sign significant similar simple simply since sing single sister sit site situation six size skill skin small smile so social society soldier some somebody someone something sometimes son song soon sort sound source south southern space speak special specific speech spend sport spring staff stage stand standard star start stats statsment station stay step still stock stop store story strategy street strong structure student study stuff style subject success successful such suddenly suffer suggest summer support sure surface system table take talk task tax teach teacher team technology television tell ten tend term test than thank that the their them themselves then theory there these they thing think third this those though thought thousand threat three through throughout throw thus time to today together tonight too top total tough toward town trade traditional training travel treat treatment tree trial trip trouble true truth try turn TV two type under understand unit until up upon us use usually value various very victim view violence visit voice vote wait walk wall want war watch water way we weapon wear week weight well west western what whatever when where whether which while white who whole whom whose why wide wife will win wind window wish with within without woman wonder word work worker world worry would write writer wrong yard yeah year yes yet you young your yourself".split(
      " "
    );
    this.idx = 0;
    this.shuffle();
  }

  //shuffles the words arr in a random order
  shuffle() {
    this.words.forEach((word, idx) => {
      const rand = parseInt(
        Math.random() * (this.words.length - idx - 1) + idx
      );
      const word2 = this.words[rand];
      this.words.splice(rand, 1, word);
      this.words.splice(idx, 1, word2);
    });
  }

  //return word of curr idx and increments idx by one
  nextWord() {
    const word = this.words[this.idx];
    this.idx++;
    return word;
  }

  //return word of previous idx
  previousWord() {
    if (this.idx > 0) {
      this.idx--;
      return this.words[this.idx];
    }
  }

  //return idx to 0;
  restart() {
    this.idx = 0;
  }
}

export class CalcStat {
  constructor(stats) {
    this.stats = stats;
    this.accuracy = this.calcAccuracy();
    this.grossWpm = this.calcGrossWpm();
    this.wpm = this.calcWpm();
  }

  calcAccuracy() {
    const total =
      this.stats.correct +
      this.stats.incorrect +
      this.stats.extra +
      this.stats.incomplete;
    const prec = (this.stats.correct / total) * 100;
    return Math.round(prec * 100) / 100;
  }

  calcGrossWpm() {
    const totalChars =
      this.stats.correct + this.stats.incorrect + this.stats.extra;
    const words = totalChars / 5;
    const wps = words / this.stats.time;
    const wpm = Math.round(wps * 60 * 10) / 10;

    return wpm;
  }

  calcWpm() {
    const words = this.stats.correct / 5;
    const wps = words / this.stats.time;
    const wpm = Math.round(wps * 60 * 10) / 10;
    return wpm;
  }
}
