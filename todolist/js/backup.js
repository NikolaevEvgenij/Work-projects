/*jshint esversion: 9 */

let todoList = [],
   num = 0;

function fillAllToDo() {
   filterTasks();
   displayMessages(todoList, '', $(`.tasks_list`));
   todoList.forEach((item, i) => {
      filterTasks();
      displayMessages(item.subTask, 'sub', $(`.subtasks_list`).eq(i));
      item.subTask.forEach((item1, i1) => {
         filterTasks();
         displayMessages(item1.subSubTask, 'subsub', $(`.subsubtasks_list[idsub^="${i}"]`).eq(i1));
      });
   });
}

function filterTasks() {
   const activeTasks = todoList.filter(item => item.checked == false);
   const completedTasks = todoList.filter(item => item.checked == true);
   todoList = [...activeTasks, ...completedTasks];
}

if (localStorage.getItem('todo')) {
   todoList = JSON.parse(localStorage.getItem('todo'));
   fillAllToDo();
}

$('.add_task').click(function () {
   if ($('.task_text').val() == '') {
      return;
   }
   let newTodo = {
      todo: $('.task_text').val(),
      checked: false,
      subTask: [],
      counter: 0,
      checkedcounter: 0
   };

   todoList.push(newTodo);

   fillAllToDo();

   localStorage.setItem('todo', JSON.stringify(todoList));
   console.log(newTodo, todoList);

});


function progressCalc(item, selector) {
   num = Math.round((item.checkedcounter / item.counter) * 100);
   console.log(num);
   if (isNaN(num)) { num = 0; }
   if (item.checked === true) { num = 100; }
   selector.closest('.todo_task').find('.progress').html(num + "%");
}

function displayMessages(target, sub, selector) {

   let displayMessage = '';

   target.forEach((item, i) => {
      if (!sub) {
         // console.log(todoList[i].checkedcounter, todoList[i].counter);
         progressCalc(item, selector);
      }

      displayMessage += `
         <li class = 'todo_${sub}task ' id = '${i}'>
            <div class = 'task_body  ${item.checked ? 'checked' : ''}' >
               <div class = '${sub}task_filler'>
                  <input class='${sub}checkbox' type='checkbox' id = '${selector.attr('idsub') == undefined ? '' : selector.attr('idsub')}item_${i}' ${item.checked ? 'checked' : ''}>
                  <label for='${selector.attr('idsub') == undefined ? '' : selector.attr('idsub')}item_${i}'>${item.todo}</label>
               </div >
         <div class='edit'>
            ${!sub ? '<span class="progress">' + num + '%</span>' : ''}
            <span class='edit_button add_button add_${sub}subtask' idadd='${selector.attr('idsub') == undefined ? '' : selector.attr('idsub')}${i}'>+</span>
            <span class='edit_button delete_button delete_${sub}task' iddel='${selector.attr('idsub') == undefined ? '' : selector.attr('idsub')}${i}'>\u00D7</span>
         </div>
            </div >
         <ul class='${sub}subtasks_list' idsub='${selector.attr('idsub') == undefined ? '' : selector.attr('idsub')}${i}'>
         </ul>
         </li >
         `;

      selector.html(displayMessage);
      $('.add_subsubsubtask').hide();

   });


   // // ${target[i].checked ? 'checked' : ''}
   // for (i = 0; i < todoList.length; i++) {
   //    displayMessage += `
   //    <li class = 'todo_${sub}task'>
   //       <div class = 'task_body'>
   //          <input type='checkbox' id = 'item_${i}' >
   //          <label for='item_${i}'>${target[i].todo}</label>
   //       </div>
   //       <div class = 'edit'>
   //          <button class = 'edit_button add_${sub}subtask' idadd = '${i}'>Добавить подэтап</button>
   //          <button class = 'edit_button delete_${sub}task' iddel = '${i}'>Удалить задачу</button>
   //       </div>
   //       <ul class = '${sub}subtasks_list'>
   //       </ul>
   //    </li>
   //    `;

   //    $(`.${sub}tasks_list`).html(displayMessage);
   // }

}

function checkDone(i) {
   if (todoList[i].checkedcounter == todoList[i].counter && todoList[i].counter != 0 && todoList[i].checkedcounter != 0) {
      todoList[i].checked = true;
   } else if (todoList[i].counter != 0) {
      todoList[i].checked = false;
   }
}

function checkAllSubs(i) {
   if (todoList[i].checked) {
      checker(i);
      // if (!test) {
      //    todoList[i].counter = 1;
      // }
      todoList[i].checkedcounter = todoList[i].counter;
   }
}

function checker(i) {

   setCheckTrue(todoList[i]);



   function setCheckTrue(todoList) {

      for (let property in todoList) {
         if (typeof (todoList[property]) === 'object') {
            for (let subProperty in todoList[property]) {
               todoList[property][subProperty].checked = true;
               setCheckTrue(todoList[property][subProperty]);
            }
         }
      }

   }
}

$('.tasks_list').on('change', (e) => {

   // $('[type="checkbox"]').each((i, item) => {
   //    // console.log(item);
   //    if ($(e.target).attr('id') == item.getAttribute('id')) {
   //       if ($(e.target).hasClass('subcheckbox')) {
   //          let target = todoList[$(e.target).closest('.subtasks_list').attr('idsub')].subTask[$(e.target).closest('.todo_subtask').attr('id')];
   //          console.log(target);
   //          target.checked = !target.checked;
   //       } else {
   //          let target = todoList[$(e.target).closest('.todo_task').attr('id')];
   //          console.log(target);
   //          target.checked = !target.checked;
   //       }
   //       localStorage.setItem('todo', JSON.stringify(todoList));
   //    }
   // });

   //чекнуть главную таску, если прогресс 100%
   // function check100() {
   //    $('.progress').each((i, item) => {
   //       console.log(item.textContent);
   //       if (item.textContent === '100%') {
   //          todoList[i].checked = true;
   //       } else {
   //          todoList[i].checked = false;
   //       }
   //    });
   // }


   $('.checkbox').each((i, item) => {

      if ($(e.target).attr('id') == item.getAttribute('id')) {
         console.log(todoList[i]);
         todoList[i].checked = !todoList[i].checked;
         $(e.target).closest('.task_body').toggleClass('checked');
         checkAllSubs(i);
      }
      $(`.subcheckbox[id^="${i}"]`).each((i1, item1) => {
         if ($(e.target).attr('id') == item1.getAttribute('id')) {
            console.log(todoList[i].subTask[i1]);
            todoList[i].subTask[i1].checked = !todoList[i].subTask[i1].checked;
            todoList[i].subTask[i1].checked ? todoList[i].checkedcounter++ : todoList[i].checkedcounter--;
            $(e.target).closest('.task_body').toggleClass('checked');
            checkDone(i);
         }
         $(`.subsubcheckbox[id^="${i}${i1}"]`).each((i2, item2) => {
            if ($(e.target).attr('id') == item2.getAttribute('id')) {
               console.log(todoList[i].subTask[i1].subSubTask[i2]);
               todoList[i].subTask[i1].subSubTask[i2].checked = !todoList[i].subTask[i1].subSubTask[i2].checked;
               todoList[i].subTask[i1].subSubTask[i2].checked ? todoList[i].checkedcounter++ : todoList[i].checkedcounter--;
               $(e.target).closest('.task_body').toggleClass('checked');
               checkDone(i);
            }
         });
      });
      progressCalc(todoList[i], $(e.target));
   });

   fillAllToDo();
   localStorage.setItem('todo', JSON.stringify(todoList));
});




// function deleteTask(i, target, sub, selector) {
//    todoList.splice(i, 1);
//    localStorage.setItem('todo', JSON.stringify(todoList));
//    displayMessages(todoList, '', $(`.tasks_list`));
//    displayMessages(todoList[i].subTask, 'sub', $(`.subtasks_list`).eq(i));
// }


function deleteTask(i, target, sub, selector, indexTodo) {
   console.log(target[i]);
   //убрать в массиве задачи и чекнутые задачи, если удаляем задачу кнопкой
   if (sub) {
      if (target[i].checked) {
         todoList[indexTodo].checkedcounter--;
      }
      todoList[indexTodo].counter--;
      if (sub === 'sub') {
         if (target[i].subSubTask.length !== 0) {
            target[i].subSubTask.forEach((item, i1) => {
               if (item.checked) {
                  todoList[indexTodo].checkedcounter--;
               }
            });
            todoList[indexTodo].counter -= target[i].subSubTask.length;
         }
      }
      progressCalc(todoList[indexTodo], selector);
   }
   // if (sub === 'subsub') {
   //    console.log(target[i]);
   //    if (target[i].checked) {
   //       todoList[indexTodo].checkedcounter--;
   //    }
   //    todoList[indexTodo].counter--;
   // }
   checkDone(indexTodo);
   target.splice(i, 1);

   localStorage.setItem('todo', JSON.stringify(todoList));
   fillAllToDo();
}

$('.tasks_list').click((e) => {

   $('.delete_task').each((i, item) => {
      if (e.target.getAttribute('iddel') == item.getAttribute('iddel')) {
         console.log(e.target);
         deleteTask(i, todoList, '', $(`.tasks_list`), i);
         if (todoList.length === 0) $(`.tasks_list`).html('');
      }
      $(`.delete_subtask[iddel^="${i}"]`).each((i1, item1) => {
         if (e.target.getAttribute('iddel') == item1.getAttribute('iddel')) {
            console.log(e.target);
            deleteTask(i1, todoList[i].subTask, 'sub', $(`.subtasks_list`).eq(i), i);
            if (todoList[i].subTask.length === 0) { $(`.subtasks_list`).eq(i).html(''); }
         }
         $(`.delete_subsubtask[iddel^="${i}${i1}"]`).each((i2, item2) => {
            if (e.target.getAttribute('iddel') == item2.getAttribute('iddel')) {
               deleteTask(i2, todoList[i].subTask[i1].subSubTask, 'subsub', $(`.subsubtasks_list[idsub^="${i}"]`).eq(i1), i);
            }
         });
      });
   });
});



$('.tasks_list').click((e) => {
   // let addButtons = document.querySelectorAll('.add_subtask');
   // addButtons.forEach((item, i) => {
   //    if (e.target.getAttribute('idadd') == item.getAttribute('idadd')) {
   //       if (e.target.classList.contains('add_subtask')) {
   //          console.log(i);
   //          // deleteTask(e.target.getAttribute('idadd'));
   //          let subTask = {
   //             todo: $('.task_text').val(),
   //             checked: false
   //          };

   //          console.log($('.add_subtask').attr('idadd'));

   //          todoList[i].subTask.push(subTask);

   //          displayMessages(todoList[i].subTask, 'sub', $(`.subtasks_list`).eq(i));
   //          localStorage.setItem('todo', JSON.stringify(todoList));
   //          console.log(todoList[i]);
   //       } else {
   //          let subSubTask = {
   //             todo: $('.task_text').val(),
   //             checked: false
   //          };
   //       }
   //    }
   // });


   // $('.add_button').each((i, item) => {
   //    if (e.target.getAttribute('idadd') == item.getAttribute('idadd')) {
   //       if (e.target.classList.contains('add_subtask')) {
   //          console.log(i);
   //          // deleteTask(e.target.getAttribute('idadd'));
   //          let subTask = {
   //             todo: $('.task_text').val(),
   //             checked: false
   //          };

   //          console.log($('.add_subtask').attr('idadd'));

   //          todoList[i].subTask.push(subTask);

   //          displayMessages(todoList[i].subTask, 'sub', $(`.subtasks_list`).eq(i));
   //          localStorage.setItem('todo', JSON.stringify(todoList));
   //          console.log(todoList[i]);
   //       } else {
   //          let subSubTask = {
   //             todo: $('.task_text').val(),
   //             checked: false
   //          };
   //       }
   //    }
   // });



   $('.add_subtask').each((i, item) => {
      if (e.target.getAttribute('idadd') == item.getAttribute('idadd')) {
         if ($('.task_text').val() == '') {
            return;
         }
         let subTask = {
            todo: $('.task_text').val(),
            checked: false,
            subSubTask: []
         };
         console.log($('.add_subtask').attr('idadd'));

         todoList[i].subTask.push(subTask);
         todoList[i].counter++;

         console.log(todoList[i].counter);
         checkDone(i);
         fillAllToDo();

         localStorage.setItem('todo', JSON.stringify(todoList));
         progressCalc(todoList[i], $(e.target));
         console.log(todoList[i], $(e.target).closest('.todo_task').find('.progress'));
      }
      $(`.add_subsubtask[idadd^="${i}"]`).each((i1, item1) => {
         if (e.target.getAttribute('idadd') == item1.getAttribute('idadd')) {
            if ($('.task_text').val() == '') {
               return;
            }
            let subSubTask = {
               todo: $('.task_text').val(),
               checked: false
            };

            todoList[i].subTask[i1].subSubTask.push(subSubTask);
            todoList[i].counter++;
            checkDone(i);
            fillAllToDo();
            localStorage.setItem('todo', JSON.stringify(todoList));
            progressCalc(todoList[i], $(e.target));
         }
      });
   });
});


