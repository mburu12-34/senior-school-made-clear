
"use strict";

/*
  Senior School Made Clear v0.0
  Storage: this browser and device only.
  Marking: simple rubric/keyword matching, not AI semantic grading.
*/

const PASS_MARK = 80;
const TOPIC_MINUTES = 20;
const COMBINED_MINUTES = 45;
const MIN_QUESTIONS = 8;

const topics = [
  {
    id: "matter",
    title: "What is matter?",
    description: "Understand matter, mass, volume and particles.",
    intro: "Everything around us is made of matter, but what makes something matter?",
    body: [
      ["Matter", "Matter is anything that has mass and occupies space."],
      ["Mass", "Mass describes the amount of matter in an object. It is commonly measured in kilograms (kg) or grams (g)."],
      ["Volume", "Volume is the space occupied by a substance. Common units include cubic centimetres (cm³) and cubic metres (m³)."],
      ["Particles", "Matter is made of tiny particles. The arrangement and movement of these particles help explain the properties of materials."]
    ],
    example: "A stone and the air inside a balloon are both matter. The stone is easy to see, but the air also has mass and occupies space.",
    hint: "Think about mass, occupied space and tiny particles. Can you explain how these ideas are connected?",
    questions: [
      q("Explain", "What is matter? Give a definition and two examples.", ["mass", "space"], "Matter has mass and occupies space. Air and a stone are examples."),
      q("Reasoning", "Explain why air inside an inflated balloon is considered matter.", ["mass", "space"], "Air has mass and occupies space inside the balloon."),
      q("Compare", "Explain the difference between mass and volume.", ["amount", "space"], "Mass describes the amount of matter; volume describes the space it occupies."),
      q("Application", "A sealed empty-looking container contains air. Explain how you could investigate whether the air has mass.", ["balance", "mass"], "Compare the mass of the container with air to a suitable comparison, using a balance."),
      q("Scientific explanation", "Describe the particle model of matter.", ["particles", "movement"], "Matter consists of tiny particles that are in motion."),
      q("Calculation", "A sample has a mass of 20 g and a volume of 5 cm³. Calculate its density and show the formula.", ["4", "g/cm"], "Density = mass ÷ volume = 20 ÷ 5 = 4 g/cm³."),
      q("Reasoning", "Why is a gas still matter even though it may be invisible?", ["mass", "space"], "A gas has mass and occupies space even when it cannot be seen."),
      q("Application", "Explain how a syringe with its nozzle sealed can demonstrate that air occupies space.", ["plunger", "compress"], "The trapped air resists compression as the plunger is pushed, showing that the air occupies space.")
    ]
  },
  {
    id: "states",
    title: "States of matter",
    description: "Compare solids, liquids and gases.",
    intro: "Why does a stone keep its shape while water flows and air spreads out?",
    body: [
      ["Solids", "Solids have a definite shape and volume. Their particles are closely packed and vibrate about fixed positions."],
      ["Liquids", "Liquids have a definite volume but take the shape of their container. Their particles can move past one another."],
      ["Gases", "Gases have no fixed shape or volume. Their particles are far apart and move freely."],
      ["Particle movement", "The spacing, arrangement and movement of particles help explain the observable properties of each state."]
    ],
    example: "Ice keeps its shape, liquid water takes the shape of a cup, and water vapour spreads to fill the available space.",
    hint: "Compare shape, volume, particle spacing and freedom of movement.",
    questions: [
      q("Explain", "Describe the arrangement and movement of particles in a solid.", ["closely", "vibrate"], "Solid particles are closely packed and vibrate around fixed positions."),
      q("Compare", "Give two differences between a liquid and a gas.", ["volume", "shape"], "A liquid has a definite volume; a gas does not have a definite volume or shape."),
      q("Reasoning", "Why can a liquid flow but a solid usually keeps its shape?", ["particles", "move"], "Liquid particles can move past one another, while solid particles vibrate about fixed positions."),
      q("Application", "A gas is released in one corner of a room. Explain why it can spread throughout the room.", ["particles", "move"], "Gas particles move freely and spread into the available space."),
      q("Scientific explanation", "Use the particle model to explain why gases can be compressed more easily than liquids.", ["far apart", "space"], "Gas particles have larger spaces between them, so they can be pushed closer together."),
      q("Compare", "Describe the shape and volume of a solid.", ["definite shape", "definite volume"], "A solid has a definite shape and a definite volume."),
      q("Application", "A liquid is poured from a narrow bottle into a wide bowl. What changes and what stays the same?", ["shape", "volume"], "Its shape changes to fit the bowl, while its volume remains the same if none is lost."),
      q("Reasoning", "Explain how heating can affect the movement of particles in a substance.", ["energy", "faster"], "Heating usually increases particle kinetic energy, so particles move or vibrate faster.")
    ]
  },
  {
    id: "changes",
    title: "Changes of state",
    description: "Explore melting, freezing, evaporation and condensation.",
    intro: "Matter can change from one state to another when energy is transferred.",
    body: [
      ["Melting", "Melting is the change from solid to liquid when a substance absorbs energy."],
      ["Freezing", "Freezing is the change from liquid to solid when a substance loses energy."],
      ["Evaporation and boiling", "Evaporation occurs at a liquid's surface and can happen below its boiling point. Boiling occurs throughout the liquid at its boiling point under a given pressure."],
      ["Condensation", "Condensation is the change from gas to liquid when the substance loses energy."]
    ],
    example: "Water droplets on the outside of a cold glass can form when water vapour in the surrounding air condenses.",
    hint: "For each change, identify the starting state, final state and whether energy is absorbed or released.",
    questions: [
      q("Explain", "What is melting? Describe the state change and energy transfer.", ["solid", "liquid", "energy"], "Melting changes a solid into a liquid as energy is absorbed."),
      q("Compare", "Explain the difference between evaporation and boiling.", ["surface", "boiling point"], "Evaporation occurs at the surface and can happen below boiling point; boiling occurs throughout the liquid."),
      q("Reasoning", "Why can water droplets form on the outside of a cold glass?", ["water vapour", "condensation"], "Water vapour in the air loses energy at the cold surface and condenses into liquid droplets."),
      q("Application", "Describe what happens to liquid water when it freezes.", ["liquid", "solid", "energy"], "Water changes from liquid to solid as energy is removed."),
      q("Scientific explanation", "Explain condensation using particle movement and energy.", ["energy", "slower"], "Particles lose energy, move less freely and form a liquid."),
      q("Compare", "Distinguish between melting and freezing.", ["solid", "liquid"], "Melting changes solid to liquid; freezing changes liquid to solid."),
      q("Application", "Wet clothes dry on a warm day. Explain the change of state involved.", ["evaporation", "liquid", "gas"], "Liquid water evaporates into water vapour."),
      q("Reasoning", "What happens to the particles' average kinetic energy as a substance is heated, without changing state?", ["kinetic energy", "increase"], "The particles' average kinetic energy generally increases as the substance is heated.")
    ]
  }
];

function q(type, prompt, keywords, model) {
  return { type, prompt, keywords, model };
}

const STORAGE_KEY = "ssmc_v00_state";

const defaultState = {
  goalName: "",
  goalTarget: 80,
  goalTopic: "all",
  scores: {},
  history: [],
  badges: [],
  attempts: {},
  bestScores: {},
  mastered: []
};

let state = loadState();
let currentTopicId = "matter";
let currentAssessment = null;
let currentIndex = 0;
let answers = [];
let timerId = null;
let secondsRemaining = 0;
let lastResult = null;
let drawingContext = null;
let drawingActive = false;
let lastPoint = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...defaultState, ...saved } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.warn("Progress could not be saved in this browser.");
  }
}

function byId(id) {
  return document.getElementById(id);
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.toggle("hidden", screen.id !== screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getTopic(id = currentTopicId) {
  return topics.find(topic => topic.id === id);
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function renderDashboard() {
  byId("goalTitle").textContent = state.goalName || "Choose your target";
  byId("goalScore").textContent = `${state.goalTarget}%`;
  byId("masteredCount").textContent = state.mastered.length;
  byId("badgeCount").textContent = state.badges.length;

  const percentage = Math.round((state.mastered.length / topics.length) * 100);
  byId("overallProgress").style.width = `${percentage}%`;
  byId("progressText").textContent =
    `${percentage}% of introductory Chemistry topics mastered. Keep learning at your own pace.`;

  byId("topicList").innerHTML = topics.map((topic, index) => {
    const best = state.bestScores[topic.id];
    const mastered = state.mastered.includes(topic.id);
    return `
      <article class="topic-card">
        <div class="topic-card-top">
          <div class="topic-number">${String(index + 1).padStart(2, "0")}</div>
          <div>
            <h3>${escapeHTML(topic.title)}</h3>
            <p>${escapeHTML(topic.description)}</p>
            <p>${best !== undefined ? `Best score: ${best}%` : "Not assessed yet"}${mastered ? " · Mastered" : ""}</p>
          </div>
        </div>
        <button class="btn primary" data-topic="${topic.id}">Open lesson</button>
      </article>`;
  }).join("");

  document.querySelectorAll("[data-topic]").forEach(button => {
    button.addEventListener("click", () => openLesson(button.dataset.topic));
  });

  renderBadges();
}

const badgeDefinitions = [
  { id: "first_lesson", icon: "🌱", name: "First Steps", description: "Complete your first topic assessment." },
  { id: "mastery", icon: "⭐", name: "Mastery Star", description: "Reach at least 80% on a topic test." },
  { id: "perfect", icon: "🏆", name: "Perfect Understanding", description: "Score 100% on a topic test." },
  { id: "improved", icon: "📈", name: "Keep Growing", description: "Improve your best score on a topic." },
  { id: "explorer", icon: "🔗", name: "Knowledge Explorer", description: "Complete a combined assessment." }
];

function awardBadge(id) {
  if (!state.badges.includes(id)) {
    state.badges.push(id);
  }
}

function renderBadges() {
  byId("badgeList").innerHTML = badgeDefinitions.map(badge => {
    const earned = state.badges.includes(badge.id);
    return `
      <div class="achievement ${earned ? "" : "locked"}">
        <span class="medal">${badge.icon}</span>
        <div>
          <strong>${escapeHTML(badge.name)}</strong>
          <div class="small">${earned ? "Earned!" : escapeHTML(badge.description)}</div>
        </div>
      </div>`;
  }).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  })[char]);
}

function openLesson(topicId) {
  currentTopicId = topicId;
  const topic = getTopic();

  byId("lessonLabel").textContent = "CHEMISTRY · TOPIC";
  byId("lessonTitle").textContent = topic.title;
  byId("lessonIntro").textContent = topic.intro;
  byId("lessonExample").textContent = topic.example;

  byId("lessonBody").innerHTML = topic.body.map(([heading, text]) =>
    `<h3>${escapeHTML(heading)}</h3><p>${escapeHTML(text)}</p>`
  ).join("");

  byId("explanationInput").value = "";
  byId("practiceFeedback").classList.add("hidden");
  byId("hintBox").classList.add("hidden");
  clearDrawing();
  showScreen("lessonScreen");
}

function checkPracticeExplanation() {
  const text = byId("explanationInput").value.trim();
  const feedback = byId("practiceFeedback");
  const topic = getTopic();

  feedback.classList.remove("hidden", "warning");

  if (text.length < 15) {
    feedback.classList.add("warning");
    feedback.textContent = "Try explaining a little more. What is the main idea, and why is it true?";
    return;
  }

  const words = text.toLowerCase().match(/[a-z0-9³]+/g) || [];
  const usefulWords = new Set(words);
  const topicWords = topic.body.join(" ").toLowerCase().match(/[a-z0-9³]+/g) || [];
  const matches = topicWords.filter(word => usefulWords.has(word)).length;

  feedback.innerHTML = "";
  const title = document.createElement("strong");
  title.textContent = "Thank you for explaining the idea.";
  const note = document.createElement("p");
  note.textContent =
    "This practice check can only inspect text length and word overlap. It cannot reliably judge whether your explanation is scientifically correct. Compare your answer with the lesson and ask yourself whether you can explain the idea without looking.";
  feedback.append(title, note);

  if (matches === 0) {
    feedback.classList.add("warning");
  }
}

function showHint() {
  const box = byId("hintBox");
  box.textContent = getTopic().hint;
  box.classList.remove("hidden");
}

function getQuestionPool(topicId) {
  return getTopic(topicId).questions.map((question, index) => ({
    ...question,
    topicId,
    sourceIndex: index
  }));
}

function buildTopicAssessment(topicId, isRetake = false) {
  let pool = getQuestionPool(topicId);
  if (isRetake) pool = shuffle(pool);

  return {
    kind: "topic",
    topicId,
    title: getTopic(topicId).title,
    minutes: TOPIC_MINUTES,
    questions: pool.slice(0, Math.max(MIN_QUESTIONS, pool.length))
  };
}

function buildCombinedAssessment(isRetake = false) {
  let combined = [];

  topics.forEach(topic => {
    const pool = getQuestionPool(topic.id);
    combined.push(...shuffle(pool).slice(0, 3));
  });

  combined = shuffle(combined);
  if (isRetake) combined = shuffle(combined);

  return {
    kind: "combined",
    topicId: null,
    title: "Chemistry Connections",
    minutes: COMBINED_MINUTES,
    questions: combined
  };
}

function startAssessment(assessment) {
  stopTimer();

  currentAssessment = assessment;
  currentIndex = 0;
  answers = assessment.questions.map(() => "");
  secondsRemaining = assessment.minutes * 60;

  byId("testKind").textContent = assessment.kind === "topic"
    ? "TOPIC MASTERY TEST"
    : "COMBINED ASSESSMENT";

  byId("testTitle").textContent = assessment.title;
  byId("testInstructions").textContent =
    `You have ${assessment.minutes} minutes. Explain in your own words and show calculations or reasoning where relevant. Aim for at least ${PASS_MARK}%.`;

  byId("submitTest").classList.add("hidden");
  byId("previousQuestion").classList.remove("hidden");
  byId("nextQuestion").classList.remove("hidden");

  renderQuestion();
  updateTimerDisplay();
  showScreen("testScreen");

  timerId = setInterval(() => {
    secondsRemaining--;
    updateTimerDisplay();

    if (secondsRemaining <= 0) {
      stopTimer();
      finishAssessment(true);
    }
  }, 1000);
}

function renderQuestion() {
  const question = currentAssessment.questions[currentIndex];
  const total = currentAssessment.questions.length;

  byId("questionCounter").textContent = `Question ${currentIndex + 1} of ${total}`;
  byId("testProgress").style.width = `${((currentIndex + 1) / total) * 100}%`;

  byId("questionArea").innerHTML = `
    <article class="question-card">
      <span class="question-type">${escapeHTML(question.type)}</span>
      <h2>${escapeHTML(question.prompt)}</h2>
      <p class="question-hint">Write what you understand. Include steps, units, labels or reasoning where relevant.</p>
      <textarea id="currentAnswer" rows="6" placeholder="Write your answer here..." aria-label="Your answer">${escapeHTML(answers[currentIndex])}</textarea>
      ${question.type === "Diagram" ? '<p class="question-hint">Use the lesson drawing area to practise your diagram. In this version, the drawing is not attached to your test answer.</p>' : ""}
    </article>`;

  byId("previousQuestion").disabled = currentIndex === 0;
  byId("nextQuestion").classList.toggle("hidden", currentIndex === total - 1);
  byId("submitTest").classList.toggle("hidden", currentIndex !== total - 1);

  byId("currentAnswer").addEventListener("input", event => {
    answers[currentIndex] = event.target.value;
  });
}

function saveCurrentAnswer() {
  const field = byId("currentAnswer");
  if (field) answers[currentIndex] = field.value;
}

function updateTimerDisplay() {
  const minutes = Math.floor(Math.max(0, secondsRemaining) / 60);
  const seconds = Math.max(0, secondsRemaining) % 60;
  byId("timerDisplay").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  byId("timerDisplay").parentElement.classList.toggle("urgent", secondsRemaining <= 60);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function keywordScore(answer, question) {
  /*
    Transparent demo rubric:
    - Each expected keyword/phrase contributes equally.
    - This does NOT understand meaning, context, negation or equivalent phrasing.
    - A correct answer using different words can be under-scored.
  */
  const normalized = answer.toLowerCase().replace(/[³]/g, "3");
  const terms = question.keywords;
  if (!answer.trim()) return 0;

  let found = 0;
  terms.forEach(term => {
    if (normalized.includes(term.toLowerCase().replace(/[³]/g, "3"))) found++;
  });

  let score = found / terms.length;

  // Avoid giving full marks for a very short keyword-only answer.
  if (answer.trim().split(/\s+/).length < 5) score = Math.min(score, 0.5);

  return Math.max(0, Math.min(1, score));
}

function finishAssessment(timeExpired = false) {
  if (!currentAssessment) return;
  stopTimer();

  const questions = currentAssessment.questions;
  const breakdown = questions.map((question, index) => {
    const answer = answers[index] || "";
    const fraction = keywordScore(answer, question);
    return {
      question,
      answer,
      fraction,
      percent: Math.round(fraction * 100)
    };
  });

  const score = Math.round(
    breakdown.reduce((sum, item) => sum + item.fraction, 0) / questions.length * 100
  );
  const passed = score >= PASS_MARK;
  const assessment = currentAssessment;
  const topicId = assessment.topicId;

  if (assessment.kind === "topic" && topicId) {
    const oldBest = state.bestScores[topicId];
    state.attempts[topicId] = (state.attempts[topicId] || 0) + 1;
    state.bestScores[topicId] = Math.max(oldBest ?? 0, score);

    if (passed && !state.mastered.includes(topicId)) {
      state.mastered.push(topicId);
    }

    awardBadge("first_lesson");
    if (passed) awardBadge("mastery");
    if (score === 100) awardBadge("perfect");
    if (oldBest !== undefined && score > oldBest) awardBadge("improved");
  } else {
    awardBadge("explorer");
  }

  state.history.push({
   
