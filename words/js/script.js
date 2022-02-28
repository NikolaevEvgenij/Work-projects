/*jshint esversion: 6 */
function array_rand(data, num) {
   num = Math.min(num || 1, data.length);
   var rand = [];
   while (num--) {
      rand.push(data.splice(Math.floor(Math.random() * data.length) % data.length, 1)[0]);
   }
   return rand;
}

// слова и глассные
const words =
   [
      ['алкогОль'],
      ['агЕнт'],
      ['агронОмия'],
      ['акрОполь'],
      ['алфавИт'],
      ['Амфора'],
      ['анАлог'],
      ['анАтом'],
      ['анонИм'],
      ['апокАлипсис'],
      ['апострОф'],
      ['арАхис'],
      ['арЕст'],
      ['аргумЕнт'],
      ['асимметрИя'],
      ['астрОлог'],
      ['астронОм'],
      ['атмосфЕра'],
      ['афЕра'],
      ['аэропОрты'],
      ['бАнты', ' (им.п. мн.ч)'],
      ['бАржа'],
      ['бОроду', ' (вин.п. ед.ч.)'],
      ['бУнгало'],
      ['балОванный', ' (прич.)'],
      ['балУясь'],
      ['баловАть'],
      ['блАговест'],
      ['блуднИца'],
      ['бралА'],
      ['бралАсь'],
      ['бухгАлтеров', ' (род.п. мн.н)'],
      ['бюрокрАтия'],
      ['вЕрба'],
      ['вЕчеря'],
      ['вОвремя'],
      ['вОгнутый'],
      ['валовОй'],
      ['вандАлы'],
      ['вдовствО'],
      ['вернА'],
      ['вероисповЕдание'],
      ['ветеринАрия'],
      ['взАпуски'],
      ['взапертИ'],
      ['взялА'],
      ['взялАсь'],
      ['включЁн'],
      ['включЁнный'],
      ['включИм'],
      ['включИт'],
      ['включИшь'],
      ['влилАсь'],
      ['водопровОд'],
      ['воздухопровОд'],
      ['ворвалАсь'],
      ['воспринялА'],
      ['воспроизведЕние'],
      ['воссоздалА'],
      ['вручИт'],
      ['втрИдорога'],
      ['вчистУю'],
      ['газирОванный'],
      ['гЕнезис'],
      ['гЕрбовый'],
      ['газопровОд'],
      ['гастронОмия'],
      ['гегемОния'],
      ['гипОтеза'],
      ['гналА'],
      ['гналАсь'],
      ['гомеопАтия'],
      ['гофрировАть'],
      ['граждАнство'],
      ['грошОвый'],
      ['дОверху'],
      ['дОгмат'],
      ['дОнизу'],
      ['дОсуха'],
      ['дОсыта'],
      ['давнИшний'],
      ['дефИс'],
      ['диалОг'],
      ['диспансЕр'],
      ['добелА'],
      ['добралА'],
      ['добралАсь'],
      ['довезЁнный'],
      ['договОр'],
      ['договорЁнность'],
      ['дождалАсь'],
      ['дозИровать'],
      ['дозвонИтся'],
      ['дозвонЯтся'],
      ['докраснА'],
      ['докумЕнт'],
      ['донЕльзя'],
      ['долбИт'],
      ['досУг'],
      ['дотрОнуться'],
      ['дремОта'],
      ['духовнИк'],
      ['евАнгелие'],
      ['еретИк'],
      ['жалюзИ', ' (ср.р. мн.ч.)'],
      ['ждалА'],
      ['жилОсь'],
      ['зАгнутый'],
      ['зАгодя'],
      ['зАнял'],
      ['зАняло'],
      ['зАнятый'],
      ['зАсветло'],
      ['зАтемно'],
      ['завИдно'],
      ['завсегдАтай'],
      ['задОлго'],
      ['закУпорив'],
      ['закУпорить'],
      ['занятА'],
      ['запАдина'],
      ['запертА'],
      ['запломбировАть'],
      ['заселЁн'],
      ['звалА'],
      ['звонИм'],
      ['звонИт'],
      ['звонИшь'],
      ['зимОвщик'],
      ['злОба'],
      ['знАмение'],
      ['знАчимость'],
      ['знАчимый'],
      ['зубчАтый'],
      ['Издавна'],
      ['Иконопись'],
      ['Иксы'],
      ['Искоса'],
      ['Искра', ' (знания)'],
      ['искрА', ' (зажигания)'],
      ['Исстари'],
      ['игУмен'],
      ['идеОлог'],
      ['иерОглиф'],
      ['изОгнутый'],
      ['избалОванный'],
      ['избаловАть'],
      ['издрЕвле'],
      ['изобретЕние'],
      ['импЕрский'],
      ['инАче'],
      ['инсУльт'],
      ['инстИнкт'],
      ['исключИт'],
      ['искривИться'],
      ['исчЕрпать'],
      ['кАмбала'],
      ['кАшлянуть'],
      ['кОнусы'],
      ['кУхонный'],
      ['каталОг'],
      ['каучУк'],
      ['квартАл', ' (городской)'],
      ['кедрОвый'],
      ['киломЕтр'],
      ['кладовАя'],
      ['клАла'],
      ['клЕить'],
      ['коклЮш'],
      ['корЫсть'],
      ['кормЯщий'],
      ['крАлась'],
      ['крАны'],
      ['красИвее'],
      ['красИвейший'],
      ['кремЕнь'],
      ['кренИтся'],
      ['крепИтся'],
      ['кровоточАщий'],
      ['кровоточИть'],
      ['лЕкторы'],
      ['лгалА'],
      ['лилА'],
      ['лилАсь'],
      ['ловкА(ж.р)'],
      ['ломОта'],
      ['ломОть'],
      ['лубОчный'],
      ['лыжнЯ'],
      ['мЕльком'],
      ['мЕстностей', ' (род.п. мн.ч)'],
      ['магазИн'],
      ['мастерскИ'],
      ['медикамЕнты'],
      ['метонИмия'],
      ['мозаИчный'],
      ['молОх'],
      ['молЯщий'],
      ['монолОг'],
      ['мусоропровОд'],
      ['мытАрство'],
      ['нАвзничь'],
      ['нАискось'],
      ['нАчал'],
      ['нАчали'],
      ['нАчатый'],
      ['нЕдруг'],
      ['нЕнависть'],
      ['нЕнецкий'],
      ['нОвости'],
      ['нОгтя', ' (род.п. ед.ч.)'],
      ['наОтмашь'],
      ['навЕрх'],
      ['навралА'],
      ['наговОр'],
      ['надОлго'],
      ['наделИт'],
      ['надорвалАсь'],
      ['нажИвший'],
      ['нажИлся'],
      ['нажитА'],
      ['назвалАсь'],
      ['назлО'],
      ['накренИт'],
      ['налИвший'],
      ['налилА'],
      ['намЕрение'],
      ['нанЯвшийся'],
      ['нарОст'],
      ['нарвалА'],
      ['насорИт'],
      ['недУг'],
      ['незадОлго'],
      ['некролОг'],
      ['ненадОлго'],
      ['несказАнно'],
      ['нефтепровОд'],
      ['низИна'],
      ['низведЁн'],
      ['новоприбЫвший'],
      ['новорождЁнный'],
      ['обеспЕчение'],
      ['обетовАнный'],
      ['обзвонИт'],
      ['облегчИт'],
      ['облегчИть'],
      ['облилАсь'],
      ['обнаружЕние'],
      ['обнялАсь'],
      ['обогналА'],
      ['ободрЁн'],
      ['ободрЁнный'],
      ['ободрИть'],
      ['ободрИшься'],
      ['ободралА'],
      ['обострЁнный'],
      ['обострИть'],
      ['объезднОй'],
      ['одОбренный'],
      ['одолжИт'],
      ['ожилА'],
      ['озвУчение'],
      ['озлОбить'],
      ['озлОбленный'],
      ['ознакОмленный'],
      ['оклЕить'],
      ['окружИт'],
      ['опОшлят'],
      ['оперИться'],
      ['опломбировАть'],
      ['определЁн'],
      ['оптОвый'],
      ['освЕдомить'],
      ['освЕдомиться'],
      ['осведомлЁнный'],
      ['остриЁ'],
      ['осужденА'],
      ['отбылА'],
      ['отдАв'],
      ['отдалА'],
      ['откУпорил'],
      ['откУпорить'],
      ['отключЁнный'],
      ['отозвалА'],
      ['отозвалАсь'],
      ['оторвалА'],
      ['Отрочество'],
      ['оценЁнный'],
      ['пАсквиль'],
      ['пЕтля'],
      ['пОнял'],
      ['пОручни'],
      ['пОстриг', ' (сущ.)'],
      ['пУстошь'],
      ['партЕр'],
      ['патриАрхия'],
      ['перезвонИт'],
      ['перекрОенный'],
      ['перелилА'],
      ['переслАла'],
      ['петлЯ'],
      ['пиццерИя'],
      ['плЕсневеть'],
      ['платО'],
      ['плодоносИть'],
      ['пломбировАть'],
      ['поИмка'],
      ['повторЁнный'],
      ['повторИт'],
      ['пОгнутый'],
      ['поделЁнный'],
      ['подзаголОвок'],
      ['подОшва'],
      ['поднЯв'],
      ['подрОстковый'],
      ['подчистУю'],
      ['позвалА'],
      ['позвонИт'],
      ['поискОвый'],
      ['полилА'],
      ['положИл'],
      ['положИть'],
      ['полтергЕйст'],
      ['понЯв'],
      ['понЯвший'],
      ['понялА'],
      ['портфЕль'],
      ['послАла'],
      ['прИбыл'],
      ['прИбыло'],
      ['прИкус'],
      ['прИнял'],
      ['прИняли'],
      ['прИнятый'],
      ['приручЁнный'],
      ['предвосхИтить'],
      ['премировАть'],
      ['прибЫв'],
      ['прибылА'],
      ['приговОр'],
      ['придАное'],
      ['призЫв'],
      ['принУдить'],
      ['принЯть'],
      ['приручЁнный'],
      ['прогИб'],
      ['прожИвший'],
      ['прозорлИва'],
      ['проторЁнный'],
      ['процЕнт'],
      ['псевдонИм'],
      ['пулОвер'],
      ['пургА'],
      ['путепровОд'],
      ['рАджа'],
      ['рАпорт'],
      ['рОвненько'],
      ['рОзги'],
      ['развитОй'],
      ['ракУшка'],
      ['рвалА'],
      ['ревЕнь'],
      ['сЕтчатый'],
      ['сОгнутый'],
      ['сОздало'],
      ['сабО'],
      ['свЁкла'],
      ['сверлИт'],
      ['сверлИшь'],
      ['сегмЕнт'],
      ['сирОты'],
      ['слИвовый'],
      ['снялА'],
      ['созЫв'],
      ['создАвший'],
      ['создАл'],
      ['создалА'],
      ['созданА'],
      ['сорИт'],
      ['сосредотОчение'],
      ['срЕдства', ' (им.п. мн.ч.)'],
      ['срЕдствами'],
      ['стАтуя'],
      ['стенА'],
      ['столЯр'],
      ['тАинство'],
      ['тОртов'],
      ['тОрты'],
      ['тОтчас'],
      ['тУфля'],
      ['табУ'],
      ['тамОжня'],
      ['танцОвщица'],
      ['тигрОвый'],
      ['толИка'],
      ['тошнотА'],
      ['трУбчатый'],
      ['трубопровОд'],
      ['убралА'],
      ['убыстрИть'],
      ['углубИть'],
      ['уговОр'],
      ['узаконЕние'],
      ['украИнский'],
      ['укрепИт'],
      ['умЕрший'],
      ['упрОчение'],
      ['факсИмиле'],
      ['фенОмен', ' (необычное явление)'],
      ['феномЕн', ' (выдающийся человек)'],
      ['фетИш'],
      ['флюорогрАфия'],
      ['ходАтайство'],
      ['цЕнтнер'],
      ['цемент'],
      ['цепОчка'],
      ['чЕрпать'],
      ['чИстильщик'],
      ['шАрфы'],
      ['шофЁр'],
      ['щЁлкать'],
      ['щИколотка'],
      ['щавЕль'],
      ['щемИт'],
      ['экспЕрт'],
      ['Экскурс'],
      ['электропрОвод'],
      ['языкОвая', ' (колбаса)'],
      ['языковАя', ' (система)']
   ],
   vowels = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];


document.addEventListener('DOMContentLoaded', () => {

   let answer = {},
      // forcheck = {},
      controlsteps = 0,
      yes = 0,
      no = 0;

   console.log(words);

   $('form').on("submit", e => {

      e.preventDefault();

      const numSelector = document.querySelector('#number'),
         wordsNum = numSelector.value,
         timeSelector = document.querySelector('#time'),
         timeSelected = timeSelector.value;

      let wordsArr = array_rand(words, wordsNum),
         wordsArrList = [];
      console.log(wordsArr);


      //берем слова из массива и преобразуем их
      function renderWord(wA) {
         let rawWord = wA,
            currentCorrect = false,
            word = "";

         $(rawWord[0].split("")).each(function (i, letter) {

            let isUpperCase = letter == letter.toUpperCase();

            if (isUpperCase) {
               currentCorrect = true;
               letter = letter.toLowerCase();
            }

            let lowerCaseLetter = letter.toLowerCase();

            if ($.inArray(lowerCaseLetter, vowels) === -1) {
               word += letter;
               return;
            }

            let acuteClassName = "acute";

            if (lowerCaseLetter === "е") {
               acuteClassName += " acute-e";
            } else if (lowerCaseLetter === "ы" || lowerCaseLetter === "ю") {
               acuteClassName += " acute-u";
            }

            if (lowerCaseLetter !== letter) {
               acuteClassName += " big";
            }

            let className = '';
            if (currentCorrect) {
               className = 'correct vowel';
            } else {
               className = 'vowel';
            }

            word += '<span class="' + className + '">' + letter + '<span class="' + acuteClassName + '">&acute;</span></span>';

            currentCorrect = false;
         });

         if (rawWord[1] !== undefined) {
            word += rawWord[1];
         }

         return word;
      }

      //берем слова из массива и преобразуем их(неправильные ответы меняем на правильные)
      function renderCorrectAnswer(wA) {
         let rawWord = wA,
            currentCorrect = false,
            word = "";

         $(rawWord[0].split("")).each(function (i, letter) {

            let isUpperCase = letter == letter.toUpperCase();

            if (isUpperCase) {
               currentCorrect = true;
               letter = letter.toLowerCase();
            }

            let lowerCaseLetter = letter.toLowerCase();

            if ($.inArray(lowerCaseLetter, vowels) === -1) {
               word += letter;
               return;
            }
            if (!currentCorrect) {
               word += letter;
               return;
            }

            let acuteClassName = "acute";
            if (letter === "е") {
               acuteClassName += " acute-e";
            } else if (letter === "ы" || letter === "ю") {
               acuteClassName += " acute-u";
            }


            word += '<span class="vowel_correct">' + letter + '<span class="' + acuteClassName + '">&acute;</span></span>';

            currentCorrect = false;
         });

         if (rawWord[1] !== undefined) {
            word += rawWord[1];
         }

         return word;
      }


      timer();

      //TIMER
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

               setTimeout(function () {
                  $('#timer').html('');
                  $('#timer').removeClass('active');
                  preview();
               }, 2000);

            }

         }, 1000);

      }

      let incorrectHtml = "";

      function endGame() {
         $('#res_navi').css("display", "block");
         $("#play_pause").css("display", "none");
         $('.words_list').append(incorrectHtml);
         let yesProsentage = Math.round((yes / wordsNum) * 100) + '%',
            noProsentage = Math.round((no / wordsNum) * 100) + '%';
         console.log(yesProsentage, noProsentage);
         localStorage.setItem('player_right', yesProsentage);
         localStorage.setItem('player_wrong', noProsentage);
      }

      function preview() {

         let time = 1000,
            step = 0,
            steps = wordsArr.length,
            myTimer = -1;

         addWord();

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

         function addWord() {

            const li = document.createElement("li");
            $('ul').append(li);
            $('li').last().addClass('game_word').append(renderWord(wordsArr[step]));
            $('.game_word').last().addClass('active');

            step++;

            wordHide = setTimeout(function () {

               $('.game_word').last().removeClass('active');
               no++;
               $('.incorr').html(no);
               incorrectHtml += '<li class="game_word active">' + renderCorrectAnswer(wordsArr[step - 1]) + '</li>';

               if (step < steps) {

                  addWordLoop = setTimeout(addWord(), +timeSelected);
                  //  wordHide
                  $('.vowel').on('click', function (e) {
                     clearTimeout(addWordLoop);
                  });
                  $('#play_pause').on('click', function (e) {
                     clearTimeout(addWordLoop);
                  });

               } else {
                  endGame();
               }


            }, +timeSelected);


            $('.vowel').on('click', function (e) {

               if (this.classList.contains('correct')) {
                  yes++;
                  $('.corr').html(yes);
               } else {
                  no++;
                  $('.incorr').html(no);
                  incorrectHtml += '<li class="game_word active">' + renderCorrectAnswer(wordsArr[step - 1]) + '</li>';
               }
               if (step == steps) {

                  endGame();

                  if (no == 0) {
                     $('#perfect').html('Отлично, без ошибок!');
                  }
               }


               console.log(this);
               $(this).closest(".game_word").removeClass('active');

               clearTimeout(wordHide);

               if (step < steps) { addWord(); }

               $("#play_pause").html('Пауза');
               myTimer = -1;

            });

         }

      }

   });

});