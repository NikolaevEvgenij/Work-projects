/*jshint esversion: 6 */
// 'use strict';

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


document.addEventListener('DOMContentLoaded', () => {

   // $('#myform, #settings').css('display', 'none');

   let answer = {},
      // forcheck = {},
      controlsteps = 0,
      yes = 0,
      no = 0;

   const numSelector = document.querySelector('#number'),
      imgList = document.querySelector('.mnemonics__images'),
      startButton = document.querySelector('#myform');

   startButton.addEventListener("submit", e => {
      e.preventDefault();

      const numSelector = document.querySelector('#number'),
         picsNum = numSelector.value,
         timeSelector = document.querySelector('#time'),
         timeSelected = timeSelector.value,
         arr_length = 435;



      arr = Array.from({ length: arr_length }, (v, i) => i);

      let selected = array_rand(arr, picsNum);

      timer();

      function timer() {

         $('form').hide();

         $('#timer').addClass('active');
         var timeleft = 4;
         var downloadTimer = setInterval(function () {


            timeleft = timeleft - 1;
            var timeleft_content = '<span class="animated fadeIn timer_number' + timeleft + '">' + timeleft + '</span>';
            if (timeleft != 0) {
               //say(timeleft);

               $('#timer').html(timeleft_content);
            }


            $('#timer').html(timeleft_content);
            if (timeleft == 0) {

               $('#timer').html('<span class="animated fadeIn timer_start">Старт</span>');
               clearInterval(downloadTimer);

               setTimeout(function () { $('#timer').html(''); $('#timer').removeClass('active'); preview(); }, 2000);

            }
         }, 1000);

      }

      function preview() {
         //////////////////////////////////

         $('.mnemonics__images').addClass('active_img');

         let time = 1000,
            step = 1,
            steps = selected.length;

         let arrPics = [];

         function addpics() {

            // uploader = document.getElementById("file-chooser");
            // file = uploader.files[0];
            // console.log(file);

            // var info = stackinfo();
            // console.log(info[0].file);


            console.log(selected);

            for (let i = 0, I = selected.length; i < I; i++) {
               arrPics[i] = new Image();
               arrPics[i].src = 'img/new-min' + (selected[i]) + '.png';
               arrPics[i].classList.add('mnemonics-image');
               // arrPics[i].style = 'display: none;';
               console.log(arrPics[i]);
            }

            console.log(arrPics);

            arrPics.forEach((i) => {

               imgList.append(i);

            });
         }

         addpics();
         addMemo();

         // выделяем трушные и добавляем в массив

         function addMemo() {

            for (i = 0, I = selected.length; i < I; i++) {

               clear_arr = Array.from({ length: arr_length }, (v, i) => i);

               let right_id = selected[i];

               console.log(right_id);

               key = array_search(right_id, clear_arr);

               if (key !== false) {
                  clear_arr.splice(key, 1);
               }

               const final = array_rand(clear_arr, 4);

               final.push(right_id);

               shuffle(final);

               console.log(final, final[1], 11);

               const mnemo_wraper = document.querySelector('.mnemo_wraper');

               mnemo_wraper.innerHTML +=
                  `
               <div class="mnemonics-step memo${i}">
                  <div class="mnemonics-step__index">${i + 1} из ${selected.length}</div>
                     <h2 class="mnemonics-step__header">Выбор:</h2>
                     <button class="mnemonics-step__button check_type_button">
                        <div class="background-button">Выбрать</div>
                     </button>
                     <div class="choose_img__container">
                        <img data-step="${i}" data-id="${final[0]}" class="choose_img" src="img/new-min${final[0]}.png" alt="">
                        <img data-step="${i}" data-id="${final[1]}" class="choose_img" src="img/new-min${final[1]}.png" alt="">
                        <img data-step="${i}" data-id="${final[2]}" class="choose_img" src="img/new-min${final[2]}.png" alt="">
                        <img data-step="${i}" data-id="${final[3]}" class="choose_img" src="img/new-min${final[3]}.png" alt="">
                        <img data-step="${i}" data-id="${final[4]}" class="choose_img" src="img/new-min${final[4]}.png" alt="">
                     </div>
               </div>
               `;


            }


         }

         arrPicsAdded = document.querySelectorAll('.mnemonics-image');


         $('.mnemonics-image').each(function () {
            var rtr = $(this);

            setTimeout(function () {

               rtr.addClass('active');
               show_hide(rtr, step, steps);
               step++;

            }, time);
            time += (+timeSelected + 10);
         });

         function show_hide(ttt, step, steps) {
            setTimeout(function () {
               // ttt.classList.remove('active');
               ttt.removeClass('active');
            }, +timeSelected);

            console.log(step, steps, timeSelected, time);
            if (step == steps) {
               setTimeout(function () {
                  start_game();
                  $('.mnemonics__images').removeClass('active_img');
               }, +timeSelected);	//1000
            }
         }

         $('.choose_img').on('click', function () {
            $('.choose_img').removeClass('active');
            $(this).addClass('active');

         });

      }


      function start_game() {

         console.log(selected);
         $('#tots').html(selected.length);
         var step = 0;
         $('.memo' + step).css('display', 'block');

      }

      $("body").on('click', '.mnemonics-step__button', function () {
         var resi;
         var ob = $(this).closest('.mnemonics-step').find('img.active');
         var block = $(this).closest('.mnemonics-step').find('div.choose_img__container');
         console.log(ob);
         var data = ob.attr('data-id');
         var step = ob.attr('data-step');
         console.log(data + ' ' + step + ' ' + controlsteps);
         if (data == 'undefined') {
            alert('Выберите картинку');
            return false;
         }
         else {
            console.log('rrrrr: ' + selected[step]);
            if (step != undefined) {
               if (selected[step] == data) {
                  answer[step] = 'Правильно'; resi = 'правильно'; yes++;
               }
               else {
                  answer[step] = 'Неправильно'; resi = 'неправильно'; no++;
               }

               var correct = block.find('[data-id="' + selected[step] + '"]').addClass('corr');
               ob.addClass('choosen');
               ob.removeClass('active');

               $('.memo' + step).css('display', 'none');
               ++step;
               $('.memo' + step).css('display', 'block');

               correct.clone().appendTo('#res');

               $('#corrs').html(yes);

            }

            const yesProsentage = Math.round((yes / selected.length) * 100) + '%',
               noProsentage = Math.round((no / selected.length) * 100) + '%';
            console.log(yesProsentage, noProsentage);

            console.log(answer, Object.keys(answer).length);

            if (Object.keys(answer).length == selected.length) {
               //alert('Игра закончена');
               $('#res, #res_navi').css('display', 'block');
               localStorage.setItem('player_right', yesProsentage);
               localStorage.setItem('player_wrong', noProsentage);
            }
         }

      });

   });

});