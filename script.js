let health = 100;
let sanity = 100;
let inventory = [];

const locations = {
  forest: {
    name: "Whispering Forest",
    image: "images/forest.jpg",
    text: "The trees whisper your name. Something watches from the dark.",
    choices: [
      { text: "Search the ground", effect: () => addItem("Rusty Key") },
      { text: "Listen closer", effect: () => loseSanity(10) }
    ],
    npc: "A shadowy figure whispers warnings."
  },

  town: {
    name: "Abandoned Town",
    image: "images/town.jpg",
    text: "Doors hang open. Footsteps echo behind you.",
    choices: [
      { text: "Talk to the stranger", effect: () => npcDialogue() },
      { text: "Loot the store", effect: () => loseHealth(10) }
    ]
  },

  hospital: {
    name: "Derelict Hospital",
    image: "images/hospital.jpg",
    text: "Lights flicker. Screams stain the walls.",
    choices: [
      { text: "Search medicine cabinet", effect: () => heal(15) },
      { text: "Enter operating room", effect: () => loseSanity(15) }
    ]
  }
};

function travel(locationKey) {
  playClick();
  const loc = locations[locationKey];
  document.getElementById("location-name").textContent = loc.name;
  document.getElementById("scene-image").src = loc.image;
  document.getElementById("story-text").textContent = loc.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  loc.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = choice.effect;
    choicesDiv.appendChild(btn);
  });

  updateUI();
}

function updateUI() {
  document.getElementById("health").textContent = health;
  document.getElementById("sanity").textContent = sanity;
  document.getElementById("inventory-items").textContent =
    inventory.length ? inventory.join(", ") : "Empty";
}

function addItem(item) {
  inventory.push(item);
  updateUI();
}

function loseHealth(amount) {
  health -= amount;
  document.getElementById("hurtSound").play();
  checkGameOver();
  updateUI();
}

function loseSanity(amount) {
  sanity -= amount;
  checkGameOver();
  updateUI();
}

function heal(amount) {
  health = Math.min(100, health + amount);
  updateUI();
}

function npcDialogue() {
  alert("NPC: 'You shouldn't be here… it follows you.'");
}

function playClick() {
  document.getElementById("clickSound").play();
}

function checkGameOver() {
  if (health <= 0 || sanity <= 0) {
    alert("You succumb to the horrors. Game Over.");
    location.reload();
  }
}

document.getElementById("ambientSound").play();
travel("forest");
