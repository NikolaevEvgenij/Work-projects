/*jshint esversion: 6 */

function array_rand(data, num) {
   num = Math.min(num || 1, data.length);
   var rand = [];
   while (num--) {
      rand.push(data.splice(Math.floor(Math.random() * data.length) % data.length, 1)[0]);
   }
   return rand;
}

function array_search(query, data, chek_type) {

   chek_type = !!chek_type;

   for (var key in data) {
      if ((chek_type && data[key] === query) || (!chek_type && data[key] == query)) return key;
   }

   return false;
}

function shuffle(array) {
   array.sort(() => Math.random() - 0.5);
}

//массив с массивами эмоций, внутри уже цифры

const imgAndEmotions = [[1, 'Страх'], [2, 'Страх'], [3, 'Счастье'], [4, 'Счастье'], [5, 'Грусть'], [6, 'Грусть']];
let yes = 0,
   no = 0;

$('form').on("submit", e => {
   e.preventDefault();

   const picsNum = $('#number').val(),
      timeSelected = $('#time').val();

   console.log(picsNum, timeSelected);

   let timeLeft = 3;

   function timer() {

      $('form').hide();
      $('#timer').addClass('active');
      var timeleft_content = '<span class="animated fadeIn timer_number' + timeLeft + '">' + timeLeft + '</span>';
      timeLeft--;
      $('#timer').html(timeleft_content);
      console.log(timeLeft);
      if (timeLeft == -1) {
         $('#timer').html('<span class="animated fadeIn timer_start">Старт</span>');
         clearInterval(timerId);
         setTimeout(function () { $('#timer').html(''); $('#timer').removeClass('active'); preview(); }, 1000);
      }
   }

   const timerId = setInterval(timer, 1000);


   function calculateImg() {
      console.log(selected, steps);

      // for (let i = 0, I = selected.length; i < I; i++) {

      //    const emotions = ['Страх', 'Злость', 'Отвращение', 'Счастье', 'Удивление', 'Грусть', 'Презрение', 'Равнодушность'];
      //    key = array_search(selected[i][1], emotions);
      //    if (key !== false) {
      //       emotions.splice(key, 1);
      //    }

      //    const final = array_rand(emotions, 3);
      //    final.push(selected[i][1]);
      //    shuffle(final);

      //    console.log(selected[i][1], final, 11);
      //    console.log(key);


      // }

      const emotions = ['Страх', 'Злость', 'Отвращение', 'Счастье', 'Удивление', 'Грусть', 'Презрение', 'Равнодушность'];
      key = array_search(selected[step][1], emotions);
      if (key !== false) {
         emotions.splice(key, 1);
      }

      const final = array_rand(emotions, 3);
      final.push(selected[step][1]);
      shuffle(final);

      console.log(selected[step][1], final, 11);
      console.log(key);

      document.querySelector('.emotions_list').innerHTML +=
         `
         <li class="emotions-step memo${step}">
            <div class="emotions-step__index">${step + 1} из ${selected.length}</div>
               <h2 class="emotions-step__header">Выбор:</h2>
               <div><img class='emotions-image' src = 'img/img${selected[step][0]}.png' alt = ''></div>
               <div class="choose_emotion_container">
                  <a data-step="${step}" class="choose_emotion">${final[0]}</a>
                  <a data-step="${step}" class="choose_emotion">${final[1]}</a>
                  <a data-step="${step}" class="choose_emotion">${final[2]}</a>
                  <a data-step="${step}" class="choose_emotion">${final[3]}</a>
               </div>
         </li>
         `;

      step++;

      ImgHide = setTimeout(function () {

         $('.game_word').last().removeClass('active');
         no++;
         $('.incorr').html(no);
         incorrectHtml += '<li class="game_word active">' + renderCorrectAnswer(wordsArr[step - 1]) + '</li>';


         if (step < steps) {

            calculateImgLoop = setTimeout(calculateImg(), +timeSelected);
            //  wordHide
            $('.choose_emotion').on('click', function (e) {
               clearTimeout(addWordLoop);
            });
            $('#play_pause').on('click', function (e) {
               clearTimeout(addWordLoop);
            });

         } else {
            endGame();
         }



      }, +timeSelected);
   }

   function endGame() {
      $('#res_navi').css("display", "block");
      $("#play_pause").css("display", "none");
      // $('.words_list').append(incorrectHtml);
      let yesProsentage = Math.round((yes / wordsNum) * 100) + '%',
         noProsentage = Math.round((no / wordsNum) * 100) + '%';
      console.log(yesProsentage, noProsentage);
      localStorage.setItem('player_right', yesProsentage);
      localStorage.setItem('player_wrong', noProsentage);
   }

   function preview() {
      let selected = array_rand(imgAndEmotions, picsNum);
      let time = 1000,
         step = 0,
         steps = selected.length,
         arrPics = [];

      // let time = 1000,
      //    step = 0,
      //    steps = wordsArr.length,
      //    myTimer = -1;
      $("#play_pause").css("display", "inline-block");
      $("#scores").css("display", "block");

      $("#play_pause").click(function (e) {
         if (myTimer == -1) {
            $("#play_pause").html('Продолжить');
            clearTimeout(wordHide);
            myTimer = 0;
         } else {
            $("#play_pause").html('Пауза');
            $('.game_word').last().removeClass('active');
            no++;
            $('.incorr').html(no);
            incorrectHtml += '<li class="game_word active">' + renderCorrectAnswer(wordsArr[step - 1]) + '</li>';
            if (step < steps) { addWord(); }
            myTimer = -1;
         }
      });

      calculateImg();

   }

});