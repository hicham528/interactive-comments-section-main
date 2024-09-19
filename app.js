let container = document.querySelector(".container");
let delete_container = document.querySelector(".delete_container");
let accepted_delete = document.querySelector(".accepted_delete");
let refuse_delete = document.querySelector(".refuse_delete");
const fetchJsonFile = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      createAllComments(data.comments);
    })
    .catch((error) => console.error("Error fetching the data:", error));
};

fetchJsonFile();

const createAllComments = (comments) => {
  if (comments.length > 0) {
    container.innerHTML = "";

    comments.forEach((comment) => {
      const parentDiv = document.createElement("div");
      parentDiv.classList.add("parent_content");

      parentDiv.innerHTML = `
        <div class="quantity">
          <img src="images/icon-plus.svg" alt="plus" class="plus_value">
          <span class="number_quantity">${comment.score}</span>
          <img src="images/icon-minus.svg" alt="minus" class="minus_value">
        </div>
        <div class="info_comment">
          <div class="header_comment">
            <div class="info_of_humen">
              <img src="${comment.user.image.png}" alt="${comment.user.username}">
              <h1>${comment.user.username}</h1>
              <h5>${comment.createdAt}</h5>
            </div>
            <div class="reply_btn">
              <img src="images/icon-reply.svg" alt="reply">
              <h3 class="click_to_replay">reply</h3>
            </div>
          </div>
          <p>${comment.content}</p>
          <div class="comment_replay">
  <img src="images/avatars/image-juliusomo.png" alt="">
  <textarea name="" id="replay_textarea" placeholder="add a comment..." class="replay_textarea"></textarea>
  <button class="replay_btn">replay</button>
</div>
        </div>
        
      `;

      container.appendChild(parentDiv);

      // Add replies
      if (comment.replies && comment.replies.length > 0) {
        createAllReplies(comment.replies, parentDiv);
      }
      const click_to_replay = parentDiv.querySelector(".click_to_replay");
      const replay_textarea=parentDiv.querySelector(".replay_textarea");
      const replay_btn=parentDiv.querySelector(".replay_btn")
      
      click_to_replay.onclick = () => {
        parentDiv
          .querySelector(".comment_replay")
          .classList.toggle("new_comment_replay");
      };
      replay_btn.onclick=()=>{
        if(replay_textarea.value!==""){
            const info_comment=parentDiv.querySelector(".info_comment");
            const parent_element=document.createElement("div");
            parent_element.classList.add("parent_content");
            parent_element.style.border="2PX SOLID BLACK";
            parent_element.style.padding="20PX";
            parent_element.innerHTML+=`
                     <div class="quantity">
        <img src="images/icon-plus.svg" alt="plus" class="plus_value">
        <span class="number_quantity">1</span>
        <img src="images/icon-minus.svg" alt="minus" class="minus_value">
      </div>
      <div class="info_comment">
        <div class="header_comment">
          <div class="info_of_humen">
            <img src="images/avatars/image-juliusomo.png" alt="user avatar">
            <h1>juliusomo</h1>
            <h5>21h</h5>
          </div>
          <div class="reply_btn">
             <button class="delete_btn"><img src="images/icon-delete.svg" alt="">delete</button>
             <button class="edit_btn"><img src="images/icon-edit.svg" alt="">edit</button>
          </div>
        </div>
        <p class="text_content">${replay_textarea.value}</p>
      </div>
            `
            info_comment.appendChild(parent_element)
            replay_textarea.value="";
            parentDiv
            .querySelector(".comment_replay")
            .classList.remove("new_comment_replay");
            const delete_btn=parent_element.querySelector(".delete_btn");
            const edit_btn=parent_element.querySelector(".edit_btn")
            delete_btn.onclick = () => {
                delete_container.style.display = "flex";
                accepted_delete.onclick = () => {
                  parent_element.remove();
                  delete_container.style.display = "none";
                };
                refuse_delete.onclick = () => {
                  delete_container.style.display = "none";
                };
              };
              edit_btn.onclick=()=>{
                let text_content=parent_element.querySelector(".text_content");
                parentDiv
                .querySelector(".comment_replay")
                .classList.toggle("new_comment_replay");
                parent_element.style.display="none"
                replay_btn.innerHTML="Update";
                replay_textarea.value=text_content.textContent;
                replay_btn.onclick=()=>{
                  replay_btn.innerHTML="replay";
                  parent_element.style.display="flex";
                  text_content.textContent=replay_textarea.value;
                  parentDiv
                .querySelector(".comment_replay")
                .classList.remove("new_comment_replay");
                replay_textarea.value="";
                }
              }
              const plus_value=parent_element.querySelector(".plus_value");
              const minus_value=parent_element.querySelector(".minus_value");
              const number_quantity=parent_element.querySelector(".number_quantity");
              let scoor=1;
              plus_value.onclick=()=>{
                console.log("hello");
                
                scoor++;
                number_quantity.textContent=scoor;
              }
              minus_value.onclick=()=>{
                console.log("hello");
                if(scoor>0){
                    scoor--;
                    number_quantity.textContent=scoor;
                }
              }
        }
      }
      // Plus and minus functionality
      const plusBtn = parentDiv.querySelector(".plus_value");
      const minusBtn = parentDiv.querySelector(".minus_value");
      const scoreElement = parentDiv.querySelector(".number_quantity");
      let score = comment.score;

      plusBtn.addEventListener("click", () => {
        score++;
        scoreElement.textContent = score;
      });

      minusBtn.addEventListener("click", () => {
        if (score > 0) {
          score--;
          scoreElement.textContent = score;
        }
      });
    });
  }
};

const createAllReplies = (replies) => {
  replies.forEach((reply) => {
    const replyDiv = document.createElement("div");
    replyDiv.classList.add("parent_content");

    replyDiv.innerHTML = `
      <div class="quantity">
        <img src="images/icon-plus.svg" alt="plus" class="plus_value">
        <span class="number_quantity">${reply.score}</span>
        <img src="images/icon-minus.svg" alt="minus" class="minus_value">
      </div>
      <div class="info_comment">
        <div class="header_comment">
          <div class="info_of_humen">
            <img src="${reply.user.image.png}" alt="${reply.user.username}">
            <h1>${reply.user.username}</h1>
            <h5>${reply.createdAt}</h5>
          </div>
          <div class="reply_btn">
            <img src="images/icon-reply.svg" alt="reply" class="reply_img">
            <h3 class="click_to_replay">reply</h3>
              <button class="delete_btn"><img src="images/icon-delete.svg" alt="">delete</button>
               <button class="edit_btn"><img src="images/icon-edit.svg" alt="">edit</button>
          </div>
        </div>
        <p class="text_content"><span>@${reply.replyingTo} </span> ${reply.content}</p>
                <div class="comment_replay">
  <img src="images/avatars/image-juliusomo.png" alt="">
  <textarea name="" id="replay_textarea" placeholder="add a comment..." class="replay_textarea"></textarea>
  <button class="add_replay">replay</button>
</div>
      </div>
    `;

    container.appendChild(replyDiv);

    const click_to_replay=replyDiv.querySelector(".click_to_replay");
    const add_replay=replyDiv.querySelector(".add_replay");
    const replay_textarea=replyDiv.querySelector(".replay_textarea")
    click_to_replay.onclick=()=>{
        replyDiv.querySelector(".comment_replay").classList.toggle("new_comment_replay")
    }

    add_replay.onclick=()=>{
if(replay_textarea.value!==""){
    console.log("hello");
    const info_comment=replyDiv.querySelector(".info_comment");
    const parent_replay=document.createElement("div");
    parent_replay.classList.add("parent_content");
    parent_replay.style.padding="20PX"
    parent_replay.style.border="2PX SOLID black"
    parent_replay.innerHTML+=`
          <div class="quantity">
        <img src="images/icon-plus.svg" alt="plus" class="plus_value">
        <span class="number_quantity">1</span>
        <img src="images/icon-minus.svg" alt="minus" class="minus_value">
      </div>
      <div class="info_comment">
        <div class="header_comment">
          <div class="info_of_humen">
            <img src="images/avatars/image-juliusomo.png" alt="user avatar">
            <h1>juliusomo</h1>
            <h5>21h</h5>
          </div>
          <div class="reply_btn">
             <button class="delete_btn"><img src="images/icon-delete.svg" alt="">delete</button>
             <button class="edit_btn"><img src="images/icon-edit.svg" alt="">edit</button>
          </div>
        </div>
        <p class="text_content">${replay_textarea.value}</p>
      </div>
    `
    info_comment.appendChild(parent_replay);
    replyDiv.querySelector(".comment_replay").classList.remove("new_comment_replay");
    const plus_value= parent_replay.querySelector(".plus_value");
    const minus_value= parent_replay.querySelector(".minus_value");
    const number_quantity= parent_replay.querySelector(".number_quantity");
    let scoor=1;
    plus_value.onclick=()=>{
      console.log("hello");
      
      scoor++;
      number_quantity.textContent=scoor;
    }
    minus_value.onclick=()=>{
      console.log("hello");
      if(scoor>0){
          scoor--;
          number_quantity.textContent=scoor;
      }
    }
}
    }
    // Plus and minus functionality
    const plusBtn = replyDiv.querySelector(".plus_value");
    const minusBtn = replyDiv.querySelector(".minus_value");
    const scoreElement = replyDiv.querySelector(".number_quantity");
    let score = reply.score;

    plusBtn.addEventListener("click", () => {
      score++;
      scoreElement.textContent = score;
    });

    minusBtn.addEventListener("click", () => {
      if (score > 0) {
        score--;
        scoreElement.textContent = score;
      }
    });
    const delete_btn = replyDiv.querySelector(".delete_btn");
    const edit_btn = replyDiv.querySelector(".edit_btn");
    delete_btn.onclick = () => {
      delete_container.style.display = "flex";
      accepted_delete.onclick = () => {
        replyDiv.remove();
        delete_container.style.display = "none";
      };
      refuse_delete.onclick = () => {
        delete_container.style.display = "none";
      };
    };
    edit_btn.onclick = () => {
      let text_content = replyDiv.querySelector(".text_content");
      textarea_comment.value = text_content.textContent;
      send_btn.innerHTML = "edit";
      send_btn.onclick = () => {
        text_content.innerHTML = textarea_comment.value;
        send_btn.innerHTML = "send";
        textarea_comment.value = "";
      };
    };
  });
};

let textarea_comment = document.getElementById("textarea_comment");
let send_btn = document.querySelector(".send-btn");

send_btn.onclick = () => {
  if (textarea_comment.value.trim() !== "") {
    const newComment = document.createElement("div");
    newComment.classList.add("parent_content");

    const currentDate = new Date().toLocaleString("en", {
      month: "short",
      day: "numeric",
    });

    newComment.innerHTML = `
      <div class="quantity">
        <img src="images/icon-plus.svg" alt="plus" class="plus_value">
        <span class="number_quantity">1</span>
        <img src="images/icon-minus.svg" alt="minus" class="minus_value">
      </div>
      <div class="info_comment">
        <div class="header_comment">
          <div class="info_of_humen">
            <img src="images/avatars/image-juliusomo.png" alt="user avatar">
            <h1>juliusomo</h1>
            <h5>${currentDate}</h5>
          </div>
          <div class="reply_btn">
             <button class="delete_btn"><img src="images/icon-delete.svg" alt="">delete</button>
             <button class="edit_btn"><img src="images/icon-edit.svg" alt="">edit</button>
          </div>
        </div>
        <p class="text_content">${textarea_comment.value}</p>
      </div>
    `;

    container.appendChild(newComment);

    textarea_comment.value = "";

    const plusBtn = newComment.querySelector(".plus_value");
    const minusBtn = newComment.querySelector(".minus_value");
    const scoreElement = newComment.querySelector(".number_quantity");
    let score = 1;

    plusBtn.addEventListener("click", () => {
      score++;
      scoreElement.textContent = score;
    });

    minusBtn.addEventListener("click", () => {
      if (score > 0) {
        score--;
        scoreElement.textContent = score;
      }
    });
    const delete_btn = newComment.querySelector(".delete_btn");
    const edit_btn = newComment.querySelector(".edit_btn");
    delete_btn.onclick = () => {
      delete_container.style.display = "flex";
      accepted_delete.onclick = () => {
        newComment.remove();
        delete_container.style.display = "none";
      };
      refuse_delete.onclick = () => {
        delete_container.style.display = "none";
      };
    };

    edit_btn.onclick = () => {
      let text_content = newComment.querySelector(".text_content");
      textarea_comment.value = text_content.textContent;
      send_btn.innerHTML = "edit";
      send_btn.onclick = () => {
        text_content.innerHTML = textarea_comment.value;
        send_btn.innerHTML = "send";
        textarea_comment.value = "";
      };
    };
  }
};
