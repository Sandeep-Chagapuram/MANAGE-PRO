//event for adding tasks
let addbtn = document.getElementById("add")

addbtn.addEventListener("click", async () => {
    // taking input values
    let title = document.getElementById("inp_title").value.trim()
    let due_date = document.getElementById("inp_date").value.trim()
    let desc = document.getElementById("inp_desc").value.trim()

    if (title && due_date) {

        try {
            await fetch("http://localhost:3000/addtask", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, due_date, desc })
            })
            display_task()
        } catch (error) {

        }

    }
    else{
        alert("Fill title and date sections")
    }
    document.getElementById("inp_title").value = ""
    document.getElementById("inp_date").value = ""
    document.getElementById("inp_desc").value = ""
})
// displays tasks in current tasks
async function display_task() {
    let response = await fetch("http://localhost:3000/getdata")
    let tasks = await response.json()
    let tasklist = document.getElementById("tasklist")
    tasklist.innerHTML = " "
    tasks.forEach(element => {
        //extracting only date part
        let create_date = element.create_date.toString().split("T")[0]
        let due_date = element.due_date.toString().split("T")[0]

        tasklist.innerHTML += `<div class="overall_task">
                <div id="task" class=" task">
                    
                    <!-- title of the task -->
                    <div id="title" class=" title">${element.title}</div>
                    
                    <!-- create.due dates -->
                    <div class="w-[43%] flex gap-1 ">
                        <!-- created date div  -->
                        <div id="created" class="task_create_due">
                            <div class="task_subhead">Created on</div>
                            <div id="created_date" class="date">${create_date}</div>
                        </div>
                        <!-- due date div -->
                        <div id="due" class="task_create_due">
                            <div class="task_subhead">Due date</div>
                            <div id="due_date" class="date">${due_date}</div>
                        </div>   
                    </div>
                </div>
    
                <!-- finish.remove.more buttons -->
                <div class="w-[200px] sm:w-[10%] flex items-center sm:flex-col gap-2 mt-6 ">
                    <div class="bg-[#9ce595] task_button finished">Finished</div>
                    <div class="bg-[#fb8b8b] task_button remove">Remove</div>
                    <div class="more_button more">more</div>
                </div>   
                
                <!-- description -  popup -->
                <div id="pop_container" class="pop_container hidden ">
                    <div class="flex justify-center">
                        <div id="pop" class="pop_up pop">
                            <h1 class="text-4xl font-semibold">Description</h1> 
                            <p id="desc_cont" class="overflow-auto text-3xl h-full">${element.desc}</p>
                            <i class="fa-solid fa-circle-xmark text-5xl absolute top-7 hover:cursor-pointer close"></i>
                        </div>
                    </div>
                </div>
            </div>`
    });
    popupEvents()
    removeEvents()
    finishedEvent()
}
//point
let Currshowbtn = document.querySelectorAll(".show")[0]
Currshowbtn.addEventListener("click",display_task)



