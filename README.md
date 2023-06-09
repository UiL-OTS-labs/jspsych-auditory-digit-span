# jspsych-auditory-digit-span

## Generic documentation

Please read the [generic documentation](https://github.com/UiL-OTS-labs/jspsych-uil-template-docs)
for some context and scope.

## Task Description

In an auditory digit span, numbers are presented via speakers, headphones etc.
The participants should respond with the same sequence of digits, if so the
participant did it correctly. The sequence to remember gets increasingly longer.
And at some point the participant will not be able recall the correct sequence.
The highest number of digits remember is a measure of working memory.
Typically 7 plus or minus 2 numbers are remembered.

After more than 2 (by default) errors the task stops.

## Getting started

People _affiliated with ILS labs_ can use the information
[from our lab webiste](https://ils-labs.wp.hum.uu.nl/experiments/overview/)
and expand the "Online experiments using jsPsych" section for details. Please
follow [this how-to](https://ils-labs.wp.hum.uu.nl/how-to/online-experimenting/).

### Make your experiment ready for use with the data server

#### Update access key

The file `globals.js` contains a variable:

```javascript
const ACCESS_KEY = '00000000-0000-0000-0000-000000000000';
```

Before uploading your experiment to the ILS data server, you will need to
change this to the access key that you obtained when your experiment was
approved. For elaborate info see `globals.js`.

### Adapting stimuli

- Open the file `stimuli.js` in your plain text editor.
- There is a list, called `LIST_1`:

  ```javacript
  const LIST_1 = [ // stimuli and timeline variables
  ```
  For a more elaborate example see the Adding stimuli section below.
- This list can be adapted to your own needs, i.e, you can replace values,
  make the list longer (don't forget to increment the 'id' values for new items!).
- If you need to implement a more complex design, you should read the
  `stimuli.js` file (and its comment sections) a little better.
- For an example of a Latin square design, please have a look
  [here](https://github.com/UiL-OTS-labs/jspsych-spr-mw).

## Output

The data of _all_ (sub) _trial phases_ are logged in the data, but the output
data can be filtered after data collection in many ways.
Please read the
[general primer on jsPsych's data](https://github.com/UiL-OTS-labs/jspsych-output)
if you are new to jsPsych data output.

Essential output for the _'true experimental'_ purpose in this template are:

Good luck, happy experimenting!
