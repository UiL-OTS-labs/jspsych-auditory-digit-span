
// ACCESS_KEY needs to be used for server setup (data store)
const ACCESS_KEY = '00000000-0000-0000-0000-000000000000'; 

// Default behavior of (sub) trial phases. times are in ms.
const FEEDBACK_DURATION = 1000;

// Default restrictions of minimal browser dimensions
const MIN_WIDTH = 800;
const MIN_HEIGHT = 600;

// Bail out string for mobiles
const BAIL_OUT_MOBILE_TEXT = "Please run this experiment on a PC or Laptop.";

// Test stimulus name for the test audio.
const AUDIO_TEST_STIMULUS = "./sounds/sound_test.mp3";

// message while loading sounds
const PRELOAD_MSG = "Loading the experiment, please be patient.";

// The duration the last stimulus/debriefing is visible
const DEBRIEF_MESSAGE_DURATION = 30000;

const DEFAULT_ITI = 1000;

const ISI = 200;

const MAX_NUM_ERRORS = 2; // Consecutive errors.
