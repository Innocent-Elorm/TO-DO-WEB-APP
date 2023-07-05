//Dark Mode js codes
const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn__icon');

function store(value){
  localStorage.setItem('darkmode', value);
}

function load() {
  const darkmode = localStorage.getItem('darkmode');

  if (!darkmode) {
    store(false);
    icon.classList.add('fa-sun');
  } else if (darkmode === 'true') {
    body.classList.add('darkmode');
    icon.classList.add('fa-moon');
  } else if (darkmode === 'false') {
    icon.classList.add('fa-sun');
  }
}
load()

btn.addEventListener('click', () => {
  body.classList.toggle('darkmode');
  icon.classList.add('animated');
  store(body.classList.contains('darkmode'));

  if (body.classList.contains('darkmode')) {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  setTimeout(() => {
    icon.classList.remove('animated');
  }, 500);
});
//end of dark mode codes

// To-do items
const input = document.querySelector('#input_task');
const input_btn = document.querySelector('#add_btn');
const notCompleted = document.querySelector('.notCompleted');
const completed = document.querySelector('.Completed');

input_btn.addEventListener('click', addList);
input.addEventListener('keyup', (e) => {
  (e.key === 'Enter' ? addList(e) : null);
})

function addList(e) {
  const newLi = document.createElement('li');
  const checkBtn = document.createElement('button');
  const delBtn = document.createElement('button');

  checkBtn.innerHTML = '<i class="fa fa-check"></i>';
  delBtn.innerHTML = '<i class="fa fa-trash"></i>';

  if (input.value.trim() !== '') {
    newLi.textContent = input.value.trim();
    input.value = '';
    notCompleted.appendChild(newLi);
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);

    checkBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      parent.remove();
      completed.appendChild(parent);
      checkBtn.style.display = 'none';
      saveTasks();
      saveCompletedTasks();
    });

    delBtn.addEventListener('click', function () {
      const parent = this.parentNode;
      parent.remove();
      saveTasks();
      saveCompletedTasks();
    });

    saveTasks();
    saveCompletedTasks();
  }
}

// Save the tasks to local storage
function saveTasks() {
  const tasks = Array.from(notCompleted.querySelectorAll('li')).map(li => li.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Save the completed tasks to local storage
function saveCompletedTasks() {
  const completedTasks = Array.from(completed.querySelectorAll('li')).map(li => li.textContent);
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Load the tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
      const newLi = document.createElement('li');
      const checkBtn = document.createElement('button');
      const delBtn = document.createElement('button');

      checkBtn.innerHTML = '<i class="fa fa-check"></i>';
      delBtn.innerHTML = '<i class="fa fa-trash"></i>';

      newLi.textContent = task;
      notCompleted.appendChild(newLi);
      newLi.appendChild(checkBtn);
      newLi.appendChild(delBtn);

      checkBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
        completed.appendChild(parent);
        checkBtn.style.display = 'none';
        saveTasks();
        saveCompletedTasks();
      });

      delBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
        saveTasks();
        saveCompletedTasks();
      });
    });
  }
}

// Load the completed tasks from local storage
function loadCompletedTasks() {
  const storedCompletedTasks = localStorage.getItem('completedTasks');
  if (storedCompletedTasks) {
    const completedTasks = JSON.parse(storedCompletedTasks);
    completedTasks.forEach(task => {
      const newLi = document.createElement('li');
      const checkBtn = document.createElement('button');
      const delBtn = document.createElement('button');

      delBtn.innerHTML = '<i class="fa fa-trash"></i>';

      newLi.textContent = task;
      completed.appendChild(newLi);
      newLi.appendChild(checkBtn);
      newLi.appendChild(delBtn);

      checkBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
        notCompleted.appendChild(parent);
        checkBtn.style.display = 'none';
        saveTasks();
        saveCompletedTasks();
      });

      delBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
        saveTasks();
        saveCompletedTasks();
      });
    });
  }
}

// Filter dropdown functionality
const allTasks = document.querySelector('#all_active');
const filterDropdown = document.querySelector('.filter_dropdown');
const allFilter = document.querySelector('#all');
const activeFilter = document.querySelector('#active');
const completedFilter = document.querySelector('#completed');

allFilter.addEventListener('click', function (e) {
  e.preventDefault();
  showAllTasks();
});

activeFilter.addEventListener('click', function (e) {
  e.preventDefault();
  showActiveTasks();
});

completedFilter.addEventListener('click', function (e) {
  e.preventDefault();
  showCompletedTasks();
});

function showAllTasks() {
  notCompleted.style.display = 'block';
  completed.style.display = 'block';
}

function showActiveTasks() {
  completed.style.display = 'none';
  notCompleted.style.display = 'block';
}

function showCompletedTasks() {
  notCompleted.style.display = 'none';
  completed.style.display = 'block';
}

// Load the tasks on page load
loadTasks();
loadCompletedTasks();


function submitFeedback(event) {
  event.preventDefault();

  // Retrieve form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var number = document.getElementById("number").value;
  var address = document.getElementById("address").value;
  var feedback = document.getElementById("feedback").value;

  alert("Form submitted successfully!");

  // Perform any desired operations with the form values
  console.log("Name: " + name);
  console.log("Email: " + email);
  console.log("Number: " + number);
  console.log("Address: " + address);
  console.log("Feedback: " + feedback);

  // Clear form inputs
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("number").value = "";
  document.getElementById("address").value = "";
  document.getElementById("feedback").value = "";
}
