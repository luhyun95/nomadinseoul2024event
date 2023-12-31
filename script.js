document.addEventListener("DOMContentLoaded", function() {
    const bubbleContainer = document.getElementById("bubble-container");
    const inputField = document.getElementById("data-input");
    const form = document.getElementById("input-form"); // Define the form variable here
   const submitButton = document.getElementById("submit-button");
  const contentBox = document.getElementById("content-box");


    // Simulated database with random data
    const database = [
        "새해에는 돈 아주 아주 많이 벌게 해주세요",
        "집 사고 싶습니다",
        "노마드가 되는 게 꿈이에요",
        "매일 5시 30분 기상하기",
        "요가 자격증 따기",
        "직장 생활이 좀 더 평화로웠으면",
        "주식 대박나면 좋겠어요",
        "책 100권 읽기",
        "여자친구 생기게 해주세요",
        "살 20kg 빼기, 운동 매일",
        "부수입 50만원 만들기",
        "글쓰기 시작하기",
        "매일 하루 한 번 명상하기",
        "건강해졌으면 좋겠습니다",
    ];

    // Function to create a bubble element with random data
  // Function to create a bubble element with random data
  function createBubble() {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.left = Math.random() * 100 + "%";
      bubble.style.top = Math.random() * 100 + "%";

      const text = getRandomData();
      bubble.textContent = text;
      bubble.style.fontSize = Math.max(12, 18 - text.length) + "px"; // Adjust the size based on text length
      bubble.style.color = "#ffffff"; // Set text color to white

      if (text.length > 10) {
          // Center align text and add padding/margin for long text
          bubble.style.textAlign = "center";
          bubble.style.padding = "8px";
          bubble.style.margin = "4px";
      }

      bubble.velocityX = (Math.random() - 0.5) * 0.5; // Slower horizontal velocity
      bubble.velocityY = (Math.random() - 0.5) * 0.5; // Slower vertical velocity
      bubble.bounceCount = 0; // Counter for the number of bounces

      return bubble;
  }

    // Function to get random data from the simulated database
    function getRandomData() {
        const randomIndex = Math.floor(Math.random() * database.length);
        return database[randomIndex];
    }

    // Function to move and bounce bubbles
    function moveBubbles() {
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            // Update bubble position based on velocity
            bubble.style.left = parseFloat(bubble.style.left) + bubble.velocityX + "%";
            bubble.style.top = parseFloat(bubble.style.top) + bubble.velocityY + "%";

            // Check for collisions with container boundaries
            if (parseFloat(bubble.style.left) < 0 || parseFloat(bubble.style.left) > 100) {
                bubble.velocityX *= -1; // Reverse horizontal velocity on collision
                bubble.bounceCount++;
            }

            if (parseFloat(bubble.style.top) < 0 || parseFloat(bubble.style.top) > 100) {
                bubble.velocityY *= -1; // Reverse vertical velocity on collision
                bubble.bounceCount++;
            }

            // Pop the bubble after three bounces
            if (bubble.bounceCount >= 3) {
                bubbleContainer.removeChild(bubble);
            }
        });

        requestAnimationFrame(moveBubbles); // Continuously move bubbles with animation frames
    }

    // Function to continuously add new bubbles from below
    function addNewBubbles() {
        setInterval(() => {
            const bubble = createBubble();
            bubbleContainer.appendChild(bubble);
        }, 1000); // Add a new bubble every 5 seconds (slower)
    }

    // Call functions to move and bounce existing bubbles and add new bubbles
    moveBubbles();
    addNewBubbles();



  // Your existing code

  // Add a variable to track whether the dark overlay is active
  let darkOverlayActive = false;

  function showContentBox() {
    contentBox.classList.add("visible"); // Add the "visible" class to show the content box
  }

  function hideContentBox() {
    contentBox.classList.remove("visible"); // Remove the "visible" class to hide the content box
  }

  function createFirework(x, y) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = x + "px";
    firework.style.top = y + "px";
    document.body.appendChild(firework);

    // Remove the firework element after the animation is complete
    firework.addEventListener("animationend", () => {
      firework.remove();
    });
  }

  // Function to handle keyboard visibility
  function handleKeyboardVisibility() {
      const isMobile = window.innerWidth <= 600;
      const inputFieldBottom = inputField.getBoundingClientRect().bottom;

      if (isMobile) {
          if (inputFieldBottom > window.innerHeight / 2) {
              // Move the input-form up when the keyboard is active
              form.style.bottom = "60px";
              document.body.style.overflow = "hidden"; // Prevent scrolling when the keyboard is active
          } else {
              // Restore the input-form position when the keyboard is not active
              form.style.bottom = "30px";
              document.body.style.overflow = "auto"; // Allow scrolling when the keyboard is not active
          }
      }
  }

  // Function to reset screen scroll position
  function resetScrollPosition() {
      form.style.bottom = "30px"; // Restore the input-form position
      document.body.style.overflow = "auto"; // Allow scrolling
  }


      // Attach input event listener to handle keyboard visibility
      inputField.addEventListener("input", handleKeyboardVisibility);
      // Attach scroll event listener to reset screen scroll position
      window.addEventListener("scroll", resetScrollPosition);


  //SUBMIT

  function handleSubmit(event) {
    event.preventDefault();

    // Get input value
    const inputValue = inputField.value.trim();

    if (inputValue) {
      // Check if the dark overlay is not already active
      if (!darkOverlayActive) {
        // Set the dark overlay as active
        darkOverlayActive = true;

        // Log the input value being added to the database
        console.log(`Adding to database: ${inputValue}`);

        // Append the input data to the simulated database
        database.push(inputValue);

        // Clear the input field
        inputField.value = "";

        // Create a dark overlay
        const darkOverlay = document.createElement("div");
        darkOverlay.className = "dark-overlay";
        document.body.appendChild(darkOverlay);

        // Display message in the middle of the screen
        const message = document.createElement("div");
        message.className = "message";
        message.innerHTML = `<span style="font-size: 30px; color: #F25C54;font-weight: bold;">${inputValue}</span> <br> 2024년에는 이루어질거에요`;
        document.body.appendChild(message);

        // Scroll the screen up instantly
        window.scrollTo(0, 0);

        // Add click event listener to remove dark overlay when clicked
        darkOverlay.addEventListener("click", () => {
          darkOverlay.remove();
          message.remove();
          darkOverlayActive = false;
          resetScrollPosition();
          showContentBox();

          // Hide the input form
          form.style.display = "none";

        });
      }
    }
  }

  // Attach form submission handler
  form.addEventListener("submit", handleSubmit);



  // Call functions to disperse existing bubbles and add new bubbles
  disperseBubbles();
  addNewBubbles();
});
