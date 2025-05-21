// updating finished status
function finishedEvent() {
    try {
        let overall_task = document.querySelectorAll(".overall_task")

        overall_task.forEach(task => {
            let finished = task.querySelector(".finished")
            let title = task.querySelector(".title").textContent.trim()

            finished.addEventListener("click", async () => {
                await fetch("http://localhost:3000/finished", {
                    method: "POST",
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ title })
                })
                display_task()
                display_FinishedTask()

            })
        });
    }catch(error){

    }
}
async function display_FinishedTask() {
    let response = await fetch("http://localhost:3000/getFinishedData")
    let Ftasks = await response.json()
    let comp_tasklist = document.getElementById("comp_tasklist")
    comp_tasklist.innerHTML = ""
    Ftasks.forEach(element => {
        //extracting only date part
        let create_date = element.create_date.toString().split("T")[0]
        let due_date = element.due_date.toString().split("T")[0]
        let finished_date = element.finished_date.toString().split("T")[0]
        comp_tasklist.innerHTML += `<div class="overall_task ">
                <div id="task" class=" Ftask ">
                    <div class="finished_date">Finished on ${finished_date}</div>
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
                <div class="w-[200px] sm:w-[8%] flex items-center sm:flex-col gap-2 mt-6 ">
                    <div class="task_button remove">remove</div>
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
}
let Fshowbtn = document.querySelectorAll(".show")[1]
Fshowbtn.addEventListener("click", display_FinishedTask)