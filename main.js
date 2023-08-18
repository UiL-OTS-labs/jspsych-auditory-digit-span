/*
 * This file creates and starts the jsPsych timeline.
 * The sub parts/trials that represent the basic building blocks of the lexical
 * decision are in the file ld_trials.js.
 */

let jsPsych = initJsPsych(
    {
        exclusions: {
            min_width: MIN_WIDTH,
            min_height: MIN_HEIGHT
        }
    }
);

// updated from main using querystring.
let g_prolific_vars = undefined;

let preload_audio = {
    type : jsPsychPreload,
    message : PRELOAD_MSG,
    audio : [... getAudioStimuli(), AUDIO_TEST_STIMULUS]
};

let request_fullscreen = {
    type : jsPsychFullscreen,
    fullscreen_mode : true
};

let maybe_preload_audio = {
    timeline : [preload_audio],
    conditional_function : experimentUsesAudio
};

let instruction_screen_practice = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        let text = PRE_PRACTICE_INSTRUCTION;
        return "<div class='instruction' >" +
               "<p>" + text + "</p></div>";
    },
    choices: ["Ga verder"],
    response_ends_trial: true,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

let pre_test_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        return "<div class='instruction' >" +
            '<p>' + PRE_TEST_INSTRUCTION + '</p></div>';
    },
    choices: ["Ga verder"],
    response_ends_trial: true,
    data: { useful_data_flag: false },
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

let end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: DEBRIEF_MESSAGE,
    choices: ["Ga naar deel 3"],
    trial_duration: DEBRIEF_MESSAGE_DURATION,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
        uil.browser.redirect(REDIRECTION_URL, g_prolific_vars);
    },
    on_load : function() {
        uil.saveData(ACCESS_KEY);
    }
};

let practice = {
    timeline : [
        {
            type : ilsAudioDigitSpan,
            stimuli : jsPsych.timelineVariable('stimuli'),
            expected_answer : jsPsych.timelineVariable('answer'),
            isi : ISI,
            post_trial_gap : 2000,
            prompt : RECALL_PROMPT,
        },
        // feedback
        {
            type : jsPsychHtmlKeyboardResponse,
            stimulus : function () {
                let correct = jsPsych.data.get().last(1).values()[0].correct;
                let feedback = correct ? "\u2714" : "\u2718";
                let fontcolor = correct ? "green" : "red";
                return `<h1 style="color: ${fontcolor};">${feedback}</h1>`;
            },
            trial_duration : FEEDBACK_DURATION,
            choices : []
        }
    ],
    timeline_variables : getPracticeItems(),
};

let digit_test = {
    num_consecutive_errors : 0,
    span : 0,
    timeline : [
        {
            type : ilsAudioDigitSpan,
            stimuli : jsPsych.timelineVariable('stimuli'),
            expected_answer : jsPsych.timelineVariable("answer"),
            isi : ISI,
            post_trial_gap : 2000,
            prompt : RECALL_PROMPT,
            on_finish : (data) => {
                if (data.correct === true) {
                    digit_test.num_consecutive_errors = 0;
                    if (data.expected_answer.length > digit_test.span) {
                        digit_test.span = data.expected_answer.length;
                    }
                }
                else {
                    digit_test.num_consecutive_errors++;
                    if (digit_test.num_consecutive_errors >= MAX_NUM_ERRORS) {
                        jsPsych.endCurrentTimeline();
                    }
                }
            }
        }
    ],
    timeline_variables : getTestItems(),
}

function initExperiment() {

    // Data added to the output of all trials.
    g_prolific_vars = {
        PROLIFIC_PID : jsPsych.data.getURLVariable('PROLIFIC_PID'),
        STUDY_ID : jsPsych.data.getURLVariable('STUDY_ID'),
        SESSION_ID : jsPsych.data.getURLVariable('SESSION_ID'),
    };
    jsPsych.data.addProperties(g_prolific_vars);


    let timeline = [];

    // request fullscreen
    timeline.push(request_fullscreen);

    // task instruction (with button)
    timeline.push(instruction_screen_practice);
    
    // test/set audio level (sountest.js)
    // timeline.push(maybe_test_audio);
    
    timeline.push(practice);

    timeline.push(pre_test_screen);

    timeline.push(digit_test);

    timeline.push(end_screen);

    // Start jsPsych when running on a Desktop or Laptop style pc.
    uil.browser.rejectMobileOrTablet();
    jsPsych.run(timeline);
}


function main() {

    // Make sure you've updated your key in globals.js
    uil.setAccessKey(ACCESS_KEY);
    uil.stopIfExperimentClosed();

    initExperiment();
}


