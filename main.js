// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const likeButtons = document.getElementsByClassName('like-glyph')
const rawPostList = document.getElementsByClassName('media-post')
const postUrl="http://mimicServer.example.com"
const numberOfPosts = document.getElementsByClassName('media-post').length

// Your JavaScript code goes here!

document.getElementById('modal').classList.add('hidden')

document.addEventListener('DOMContentLoaded', (e) => {
  console.log('hello, world.')

  let refinedPostList = createPostObjects(rawPostList)
  createLikeButtonEventListener(refinedPostList)

})

// Helper Methods -----------------------------------

function createPostObjects(rawPostList) {
  let refinedPostList = []
   for(const rawPost of rawPostList) {
     let post = {
       "id": `${rawPost.id}`,
       "button":rawPost.getElementsByClassName('like-glyph'),
       "likes":0}
     refinedPostList.push(post)
   }
   return refinedPostList
}

function createLikeButtonEventListener(refinedPostList) {
  for(const post of refinedPostList) {
      buttonFunctionality(post);
    }
}

 function buttonFunctionality(post) {
   let button = post.button[0]

   button.addEventListener('mousedown', () => {
   mimicServerCall(postUrl, createConfig(post))
    .then(function(serverMessage){

    // ----- if server call is good -------

    addButtonEventListenerActions(post)
    }).catch(function(error) {

    // ----- if server call is bad -------

      const modal = document.getElementById("modal");
      modal.className = "";
      modal.innerText = error;
      setTimeout(() =>  modal.className = "hidden", 3000);
    });
   })
 }

function createConfig(post) {
  config = {
    method: "POST",
    headers: {
      "Content": "application/json",
      "Accept": "application/json"
    },
    body: {
      id: post.id,
      likes: post.likes
    }
  }
  return JSON.stringify(config)
}

function displayPostLikes(post) {
  post.button[0].innerText = FULL_HEART + " +" + `${post.likes}`
}

function addButtonEventListenerActions(post) {
  post.button[0].classList.add = 'activated-heart'
  post.likes += 1
  displayPostLikes(post)
  // post.button[0].addEventListener('mouseup', () => {
  //     post.button[0].classList.remove = 'activated-heart'
  //   })
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}