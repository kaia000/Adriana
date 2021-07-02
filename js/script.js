// getting all required elements
const start_btn1 = document.querySelector(".start_btn1 button");

const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");

const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const word_input_box = document.querySelector(".word-input-box");
const word_submit = quiz_box.querySelector(".word-submit");
const word_input = quiz_box.querySelector(".word-input");
const msg = quiz_box.querySelector(".msg");


const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");



// let audio_list = document.querySelector(".quiz_box .audio_list");
let audio_list = ['media/1.mp3','media/2.mp3','media/3.mp3','media/4.mp3','media/5.mp3'];
let audio = document.querySelector(".quiz_box .audio_list .audio");
let audio_buttons = document.querySelector(".quiz_box section .audio_buttons");
const playPauseBTN = document.querySelector(".quiz_box .audio_buttons .audio_btn1");
const stopBTN = document.querySelector(".quiz_box .audio_buttons .audio_btn2");


let iconPlay = '<div class="iconPlay"><i class="fas fa-play"></i></div>';
let iconPause = '<div class="iconPause"><i class="fas fa-pause"></i></div>';
let iconStop = '<div class="iconPause"><i class="fas fa-pause"></i></div>';
let audio_count = 0;



playPauseBTN.onclick = ()=>{
    playPause();
}
stopBTN.onclick = ()=>{
    stop();
}

function playPause(){
    if(audio_count == 0){
            audio_count = 1;
            audio.src = audio_list[que_count];
            audio.play();
            playPauseBTN.innerHTML = 'Pause'+ iconPause;
    }else{
            audio_count = 0;
            audio.src = audio_list[que_count];

            audio.pause();
            playPauseBTN.innerHTML =  'Play'+ iconPlay;

    }
    
}

function stop(){
    playPause();
    audio.src = audio_list[que_count];
    audio.pause();
    audio.currentTime = 0;
    playPauseBTN.innerHTML =  'Play'+ iconPlay;

}

function off(){
    // document.querySelector(".quiz_box section .audio_buttons .audio_btn1").disabled = true;
    playPauseBTN.disabled = true;
    stopBTN.disabled = true;
    audio.pause();
}

function on(){
    playPauseBTN.disabled = false;
    stopBTN.disabled = false;
    playPauseBTN.innerHTML =  'Play'+ iconPlay;
    

}


// if start quiz button clicked
start_btn1.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show the info box
}



// if exit button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
    window.location.href="index.html";

}

// if continue button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions2(0);

    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}



let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;



const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");




//실패 아래처럼 수정
restart_quiz.onclick = ()=>{
    window.location.reload();
}



quit_quiz.onclick = ()=>{
    window.location.href="index.html";
}


word_submit.onclick = ()=>{
    if(que_count < questions.length ){
        inputAns();
        next_btn_value(que_count);

        // que_count++;
        // que_numb++;
        // showQuestions2(que_count);
        // queCounter(que_numb);
        // startTimer(timeValue);
        // startTimerLine(widthValue);

        clearInterval(counterLine);
        clearInterval(counter);

        next_btn.style.display = "block";
        word_input_box.classList.add("disabled");
        off();

        timeOff.textContent = "Time Left";
        word_input.value="";
       

    }
    else{
        // clearInterval(counter);
        // clearInterval(counterLine);

        console.log("Questions completed");
        

        showResultBox();
    }
}


next_btn.onclick = ()=>{
    if(que_count < questions.length -1){

        que_count++;
        que_numb++;
        showQuestions2(que_count);
        on();
        


        
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
        word_input.value="";
        word_input_box.classList.remove("disabled");
        msg.innerHTML = "Your answer is ..";
        next_btn_value();

    }
    else{
        // clearInterval(counter);
        // clearInterval(counterLine);

        console.log("Questions completed");
        showResultBox();
    }
}


function next_btn_value(index){
    if(que_count < questions.length -1){
        next_btn.innerHTML = "Next Que";
    }else{
        next_btn.innerHTML = "Go to Result";

    }
}


function showQuestions2(index){
    
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    
    que_text.innerHTML = que_tag; 
    
    
    
}

function inputAns(answer){
    let correctAns = questions[que_count].answer;
    console.log(correctAns);

  
        if(word_input.value == correctAns){
            msg.innerHTML = "correct!";

            userScore += 1;
            console.log(userScore);
            console.log(correctAns);
            console.log("Answer is Correct!");
        }
    
        
        else{
            console.log("Answer is Wrong!");
            msg.innerHTML = "wrong..!";


        }
}





function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); //show the result box
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>and congrats! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}



function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";


            word_input_box.classList.add("disabled");
            next_btn.style.display = "block";
            msg.innerHTML = "time's up!";
            next_btn_value(que_count);
            off();


        }
    }
}

//라인 속도25 너비648 조절 어려움
function startTimerLine(time){
    counterLine= setInterval(timer, 25);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        // 박스 사이즈를 더 넓게 해서 조금 달라짐 549-->?
        if(time > 648){
            clearInterval(counterLine);

        }
    }
}





function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
