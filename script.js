document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector("#emoji-input");
  const animateButton = document.querySelector("#animate-button");
  const addButton = document.querySelector("#add-button");
  const screenshotButton = document.querySelector("#screenshot-button");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const slowDownButton = document.querySelector("#slow-down-button");
  const speedUpButton = document.querySelector("#speed-up-button");
  const backgroundColorSelect = document.querySelector("#background-color");
  const darkModeToggle = document.querySelector("#dark-mode-toggle");
  const recordButton = document.querySelector("#record-button");
  const removeLastButton = document.querySelector("#remove-last-button");
  const emojiMenu = document.querySelector(".emoji-list");
  const changeDirectionButton = document.querySelector("#change-direction-button");
  const changeDirectionButtonAll = document.querySelector("#change-direction-button-all");

  // ------------------------testing area-----------------------------------------------START



  // ------------------------testing area-----------------------------------------------END

  var emojiList = [];
  let speed = 2;
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let dx = 2;
  let dy = 2;
  let emojiArray = [];
  let recording = false;
  let mediaRecorder;

  // ------------------------testing area-----------------------------------------------START



  // ------------------------testing area-----------------------------------------------END

  // creates a list of emojis to pick from & auto populates the input-containe
  const generateEmojiList = () => {
    const emojiTable = document.createElement("table");

    const emojiList = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "🤢", "🤧", "😷", "🤒", "🤕", "😈", "👿", "👹", "👺", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👐", "🙌", "👏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤘", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐", "🖖", "👋", "🤙", "💪", "🖕", "✍️", "🙏", "🤳", "💔", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "🎂", "🍰", "🍔", "🍟", "🍕", "🍗", "🍖", "🍔", "🍟", "🍻", "🍺", "🍸", "🍹", "🍷", "🍴", "🍦", "🍧", "🎉", "🎊", "🎁", "🎀", "🎄", "🎁", "⛄️", "❄️", "⚡️", "🔥", "🌪️", "💦", "🌊", "🌈", "🌤️", "⛅️", "🌞", "🌝", "🌚", "🌛", "🌜", "🌞", "⭐️", "🌟", "💫", "✨", "⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🎱", "🏓", "🥊", "🚴‍♀️", "🚴‍♂️", "🏊‍♀️", "🏊‍♂️", "🤸‍♀️", "🤸‍♂️", "⛹️‍♀️", "⛹️‍♂️", "🏋️‍♀️", "🏋️‍♂️", "🚣‍♀️", "🚣‍♂️", "🏇", "🏂", "🎿", "🏂", "💍", "💄", "💋", "👄", "👅", "👂", "👃", "👣", "👀", "🗣️", "👤", "👥", "👶", "👦", "👧", "👨", "👩", "👱‍♀️", "👱", "👴", "👵", "👲", "👳‍♀️", "👳", "👮‍♀️", "👮", "👷‍♀️", "👷", "💂‍♀️", "💂", "🕵️‍♀️", "🕵️", "👩‍⚕️", "👨‍⚕️", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎨", "👨‍🎨", "👩‍🏭", "👨‍🏭", "👩‍💼", "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", "👨‍🔬", "👩‍🎤", "👨‍🎤", "👩‍🎨", "👨‍🎨", "👩‍🏫", "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", "👩‍💼", "👨‍💼", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚀", "👨‍🚀", "👩‍⚖️", "👨‍⚖️", "👰", "🤵", "👸", "🤴", "🦸‍♀️", "🦸‍♂️", "🧙‍♀️", "🧙‍♂️", "🧝‍♀️", "🧝‍♂️", "🧛‍♀️", "🧛‍♂️", "🧟‍♀️", "🧟‍♂️", "🧞‍♀️", "🧞‍♂️", "🧜‍♀️", "🧜‍♂️", "🧚‍♀️", "🧚‍♂️", "👼", "🎅", "🤶", "🧑‍🎄", "⛄️", "🎁", "🎉", "🎂", "🎈", "🎊", "🎌", "🏮", "✨", "💫", "💥", "🎥", "🎬", "📹", "📼", "🔍", "🔎", "💡", "🔌", "🔋", "💊", "💉", "🛁", "🚿", "🏥", "🏨", "🔦", "🏮", "📔", "📕", "📖", "📗", "📘", "📙", "📚", "🛏️", "🛋️", "🚪", "🚽", "📓", "📒", "📃", "📜", "📄", "📰", "🗞️", "📑", "🔖", "🏷️", "💰", "💴", "💵", "💶", "💷", "💸", "💳", "🧾", "✉️", "📧", "📨", "📩", "📤", "📥", "📦", "📫", "📪", "📬", "📭"];

    let currentRow;
    emojiList.forEach((emoji, index) => {
      if (index % 6 === 0) {
        currentRow = document.createElement("tr");
        emojiTable.appendChild(currentRow);
      }

      const emojiCell = document.createElement("td");
      emojiCell.innerHTML = emoji;
      emojiCell.addEventListener("click", (event) => {
        input.value = emoji;
        emojiListDiv.style.display = "none";
      });
      currentRow.appendChild(emojiCell);
    });

    return emojiTable;
  };

  const emojiListDiv = document.querySelector(".emoji-list");
  emojiListDiv.appendChild(generateEmojiList());

  //   sets background color of the canvas
  const setBackgroundColor = () => {
    canvas.style.backgroundColor = backgroundColorSelect.value;
  };

  //speed -
  const slowDown = () => {
    speed /= 2;
    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].dx /= 2;
      emojiArray[i].dy /= 2;
    }
  };

  // speed +
  const speedUp = () => {
    speed *= 2;
    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].dx *= 2;
      emojiArray[i].dy *= 2;
    }
  };

  //  animates the emojis
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < emojiArray.length; i++) {
      const emoji = emojiArray[i]
      ctx.font = "64px Arial";
      ctx.fillText(emoji.value, emoji.x, emoji.y);

      if (emoji.x + emoji.dx > canvas.width || emoji.x + emoji.dx < 0) {
        emoji.dx = -emoji.dx;
      }

      if (emoji.y + emoji.dy > canvas.height || emoji.y + emoji.dy < 0) {
        emoji.dy = -emoji.dy;
      }

      emoji.x += emoji.dx;
      emoji.y += emoji.dy;
    }
    requestAnimationFrame(animate);
  };

  // randomises the start location of the animation
  const addEmoji = () => {
    emojiArray.push({
      value: input.value,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: 2,
      dy: 2
    });
  };

  // changes direction of the emoji
  let lastEmoji;

  const addEmoji2 = (dx, dy) => {
    emojiArray.push({
      value: input.value,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: dx,
      dy: dy
    });
  };

  const changeDirection = () => {
    let emoji = emojiArray[emojiArray.length - 1];
    emoji.dx = -emoji.dx;
    emoji.dy = -emoji.dy;
  };

  // changes direction of all the emojis
  const changeDirection1 = () => {
    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].dx = -emojiArray[i].dx;
      emojiArray[i].dy = -emojiArray[i].dy;
    }
  };

  // action listeners 
  backgroundColorSelect.addEventListener("change", setBackgroundColor);
  animateButton.addEventListener("click", animate);
  addButton.addEventListener("click", addEmoji);
  slowDownButton.addEventListener("click", slowDown);
  speedUpButton.addEventListener("click", speedUp);
  changeDirectionButton.addEventListener("click", changeDirection);
  changeDirectionButtonAll.addEventListener("click", changeDirection1);


  input.addEventListener("click", (event) => {
    emojiListDiv.style.display = emojiListDiv.style.display === "none" ? "block" : "none";
    emojiMenu.style.width = input.offsetWidth + "px";
    input.parentNode.insertBefore(emojiMenu, input);
  });
  // ------------------------testing area-----------------------------------------------START



  // ------------------------testing area-----------------------------------------------END


  //screenshot function
  screenshotButton.addEventListener("click", () => {
    const screenshotCanvas = document.createElement("canvas");
    screenshotCanvas.width = canvas.width;
    screenshotCanvas.height = canvas.height;

    const screenshotCtx = screenshotCanvas.getContext("2d");
    screenshotCtx.fillStyle = backgroundColorSelect.value;
    screenshotCtx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < emojiArray.length; i++) {
      const emoji = emojiArray[i];
      screenshotCtx.font = "64px Arial";
      screenshotCtx.fillText(emoji.value, emoji.x, emoji.y);
    }

    const screenshot = screenshotCanvas.toDataURL();
    const link = document.createElement("a");
    link.href = screenshot;
    link.download = "screenshot.png";
    link.click();
  });

  //listens for record button click
  recordButton.addEventListener("click", record);

  //listens for change to dark mode toggle and swaps the background color
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  });

  // listening for remove last animation click
  removeLastButton.addEventListener("click", () => {
    emojiArray.pop();
  });

  // listening for a reload of the page
  window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
  });

  // listening for a change of screen size
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
  });



  //record function, records 10s clip and saves it
  function record() {

    recording = true;
    mediaRecorder = new MediaRecorder(canvas.captureStream(30));
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = (event) => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "animation.webm";
      link.click();
    };

    mediaRecorder.start();

    const ctx = canvas.getContext("2d");

    // redraw the background color and emoji animation for each frame of the recording
    function draw() {
      ctx.fillStyle = backgroundColorSelect.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < emojiArray.length; i++) {
        const emoji = emojiArray[i];
        ctx.font = "64px Arial";
        ctx.fillText(emoji.value, emoji.x, emoji.y);
      }

      if (recording) {
        requestAnimationFrame(draw);
      }
    }

    draw();

    setTimeout(() => {
      recording = false;
      mediaRecorder.stop();
    }, 10000);
  };
});


