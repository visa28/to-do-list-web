let members = JSON.parse(localStorage.getItem('members')) || [];
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save members to LocalStorage
function saveMembers() {
    localStorage.setItem('members', JSON.stringify(members));
}

// Save todos to LocalStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add a new member
document.getElementById('addMemberForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const member = {
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        status: document.getElementById('status').value,
        ranking: document.getElementById('ranking').value,
        jobdesk: document.getElementById('jobdesk').value
    };

    members.push(member);
    saveMembers();

    window.location.href = 'index.html';  // Redirect back to main page
});

// Render the list of members in the sidebar
function renderMembers() {
    const memberList = document.getElementById('memberList');
    const memberSelect = document.getElementById('memberSelect');

    memberList.innerHTML = '';
    memberSelect.innerHTML = '';

    members.forEach((member, index) => {
        const li = document.createElement('li');
        li.textContent = member.name;

        // Add view actions
        li.addEventListener('click', () => {
            displayMemberTasks(member.name);
            document.getElementById('selectedMemberName').textContent = member.name;
        });

        memberList.appendChild(li);

        // Populate member select dropdown for To-Do assignments
        const option = document.createElement('option');
        option.value = member.name;
        option.textContent = member.name;
        memberSelect.appendChild(option);
    });
}

// Display the tasks for the selected member
function displayMemberTasks(memberName) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clear current list

    todos.forEach(task => {
        if (task.member === memberName) {
            const li = document.createElement('li');
            li.textContent = `${task.taskName} (Deadline: ${task.deadline}, Status: ${task.status})`;
            todoList.appendChild(li);
        }
    });
}

// Add a new task to a member's To-Do list
document.getElementById('addToDoForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const task = {
        member: document.getElementById('memberSelect').value,
        taskName: document.getElementById('taskName').value,
        deadline: document.getElementById('deadline').value,
        status: document.getElementById('taskStatus').value
    };

    todos.push(task);
    saveTodos();
    displayMemberTasks(task.member); // Update the task list for the selected member

    // Clear the form
    document.getElementById('taskName').value = '';
    document.getElementById('deadline').value = '';
    document.getElementById('taskStatus').value = 'Not Started';
});

// Initial render
renderMembers();
