function popupEvents() {
    let more_btn = document.querySelectorAll(".more")
    let pop_cont = document.querySelectorAll(".pop_container")
    let pop = document.querySelectorAll(".pop")
    let closebtn = document.querySelectorAll(".close")
    more_clicked = false

    more_btn.forEach((element, index) => {
        element.addEventListener("click", () => {
            if (!more_clicked) {
                pop_cont[index].classList.remove("hidden")
                more_clicked = true
            }
        })
    });
    pop_cont.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.add("hidden")
            more_clicked = false
        })
    });
    closebtn.forEach((element, index) => {
        element.addEventListener("click", () => {
            pop_cont[index].classList.add("hidden")
            more_clicked = false
        })
    });
    pop.forEach(element => {
        element.addEventListener("click", e => {
            e.stopPropagation()
        })
    });
}

function removeEvents() {
    try {
        let overall_task = document.querySelectorAll(".overall_task")
        overall_task.forEach(task => {
            let removebtn = task.querySelector(".remove")
            let title = task.querySelector(".title").textContent.trim()
            removebtn.addEventListener("click", async () => {
                await fetch("http://localhost:3000/remove", {
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

let closebtns = document.querySelectorAll(".close1")
let curr_close = closebtns[0].addEventListener("click",()=>{
    let tasklist = document.getElementById("tasklist")
    tasklist.innerHTML=""
})
let comp_close = closebtns[1].addEventListener("click",()=>{
    let comp_tasklist = document.getElementById("comp_tasklist")
    comp_tasklist.innerHTML=""
})