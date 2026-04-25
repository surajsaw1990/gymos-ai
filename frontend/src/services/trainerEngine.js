const exerciseLibrary = {
  incline_bench_press: {
    key: 'incline_bench_press',
    name: 'Incline bench press',
    dayTags: ['push', 'upper', 'chest'],
    muscleGroup: 'chest',
    primaryMuscles: ['Upper chest'],
    secondaryMuscles: ['Front delts', 'Triceps'],
    formCue: 'Pin the shoulder blades down and press on a soft arc.',
    commonMistake: 'Flaring elbows too wide and losing upper-back tension.',
    safetyNote: 'If the front of the shoulder feels pinchy, switch to a neutral-grip press.',
    replacements: ['dumbbell_incline_press', 'machine_chest_press', 'push_ups'],
  },
  dumbbell_incline_press: {
    key: 'dumbbell_incline_press',
    name: 'Dumbbell incline press',
    dayTags: ['push', 'upper', 'chest'],
    muscleGroup: 'chest',
    primaryMuscles: ['Upper chest'],
    secondaryMuscles: ['Front delts', 'Triceps'],
    formCue: 'Keep wrists stacked over elbows and drive evenly through both arms.',
    commonMistake: 'Dropping the dumbbells too deep and losing rib position.',
    safetyNote: 'Use a neutral grip if the shoulder feels cranky.',
    replacements: ['machine_chest_press', 'incline_bench_press', 'push_ups'],
  },
  machine_chest_press: {
    key: 'machine_chest_press',
    name: 'Machine chest press',
    dayTags: ['push', 'upper', 'chest'],
    muscleGroup: 'chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Front delts', 'Triceps'],
    formCue: 'Set the seat so the handles line up with mid-chest.',
    commonMistake: 'Shrugging the shoulders and bouncing through the lockout.',
    safetyNote: 'Stop a rep early if the shoulder drifts forward.',
    replacements: ['dumbbell_incline_press', 'push_ups', 'incline_bench_press'],
  },
  push_ups: {
    key: 'push_ups',
    name: 'Push-ups',
    dayTags: ['push', 'upper', 'chest'],
    muscleGroup: 'chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Front delts', 'Triceps', 'Core'],
    formCue: 'Brace the trunk and keep the body in one long line.',
    commonMistake: 'Letting the hips sag and the neck reach forward.',
    safetyNote: 'Elevate the hands if the wrist or shoulder does not love the floor angle.',
    replacements: ['machine_chest_press', 'dumbbell_incline_press', 'incline_bench_press'],
  },
  overhead_press: {
    key: 'overhead_press',
    name: 'Overhead press',
    dayTags: ['push', 'upper', 'shoulders'],
    muscleGroup: 'shoulders',
    primaryMuscles: ['Front delts'],
    secondaryMuscles: ['Triceps', 'Upper chest'],
    formCue: 'Squeeze glutes, brace ribs down, and press straight overhead.',
    commonMistake: 'Overarching the lower back to finish the rep.',
    safetyNote: 'Skip this if shoulder pain climbs above a mild ache.',
    replacements: ['dumbbell_shoulder_press', 'landmine_press', 'cable_lateral_raise'],
  },
  dumbbell_shoulder_press: {
    key: 'dumbbell_shoulder_press',
    name: 'Dumbbell shoulder press',
    dayTags: ['push', 'upper', 'shoulders'],
    muscleGroup: 'shoulders',
    primaryMuscles: ['Front delts'],
    secondaryMuscles: ['Triceps', 'Upper chest'],
    formCue: 'Press with a slight inward arc and keep the forearms vertical.',
    commonMistake: 'Starting too low and rolling the shoulders forward.',
    safetyNote: 'Use a neutral grip if overhead work feels stiff.',
    replacements: ['landmine_press', 'cable_lateral_raise', 'overhead_press'],
  },
  landmine_press: {
    key: 'landmine_press',
    name: 'Landmine press',
    dayTags: ['push', 'upper', 'shoulders'],
    muscleGroup: 'shoulders',
    primaryMuscles: ['Front delts'],
    secondaryMuscles: ['Upper chest', 'Triceps', 'Serratus'],
    formCue: 'Press up and forward while keeping the ribs stacked.',
    commonMistake: 'Twisting through the lower back to finish the rep.',
    safetyNote: 'This is the safest shoulder-friendly press when overhead work is irritated.',
    replacements: ['dumbbell_shoulder_press', 'cable_lateral_raise', 'machine_chest_press'],
  },
  cable_lateral_raise: {
    key: 'cable_lateral_raise',
    name: 'Cable lateral raise',
    dayTags: ['push', 'upper', 'shoulders'],
    muscleGroup: 'shoulders',
    primaryMuscles: ['Side delts'],
    secondaryMuscles: ['Upper traps'],
    formCue: 'Lead with the elbows and stop around shoulder height.',
    commonMistake: 'Shrugging the shoulders and swinging the torso.',
    safetyNote: 'Use a lighter load if the trap takes over.',
    replacements: ['dumbbell_lateral_raise', 'landmine_press', 'dumbbell_shoulder_press'],
  },
  dumbbell_lateral_raise: {
    key: 'dumbbell_lateral_raise',
    name: 'Dumbbell lateral raise',
    dayTags: ['push', 'upper', 'shoulders'],
    muscleGroup: 'shoulders',
    primaryMuscles: ['Side delts'],
    secondaryMuscles: ['Upper traps'],
    formCue: 'Float the dumbbells out wide with soft elbows.',
    commonMistake: 'Turning it into a front raise with momentum.',
    safetyNote: 'If the shoulder clicks hard, lower the range slightly.',
    replacements: ['cable_lateral_raise', 'landmine_press', 'dumbbell_shoulder_press'],
  },
  rope_pushdown: {
    key: 'rope_pushdown',
    name: 'Rope pushdown',
    dayTags: ['push', 'arms'],
    muscleGroup: 'triceps',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Forearms'],
    formCue: 'Pin elbows by the ribs and split the rope at the bottom.',
    commonMistake: 'Letting the shoulders roll forward as the weight drops.',
    safetyNote: 'Stop short of elbow lock if the joint feels irritated.',
    replacements: ['overhead_triceps_extension', 'bench_dips', 'close_grip_push_up'],
  },
  overhead_triceps_extension: {
    key: 'overhead_triceps_extension',
    name: 'Overhead triceps extension',
    dayTags: ['push', 'arms'],
    muscleGroup: 'triceps',
    primaryMuscles: ['Long-head triceps'],
    secondaryMuscles: ['Forearms'],
    formCue: 'Keep elbows pointed forward and stretch under control.',
    commonMistake: 'Flaring the elbows and arching the lower back.',
    safetyNote: 'Use one dumbbell if the cable path feels awkward.',
    replacements: ['rope_pushdown', 'close_grip_push_up', 'bench_dips'],
  },
  close_grip_push_up: {
    key: 'close_grip_push_up',
    name: 'Close-grip push-up',
    dayTags: ['push', 'arms'],
    muscleGroup: 'triceps',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Chest', 'Front delts', 'Core'],
    formCue: 'Keep elbows close and the rib cage down.',
    commonMistake: 'Letting the elbows flare as fatigue rises.',
    safetyNote: 'Elevate the hands if elbow comfort drops.',
    replacements: ['rope_pushdown', 'overhead_triceps_extension', 'bench_dips'],
  },
  lat_pulldown: {
    key: 'lat_pulldown',
    name: 'Lat pulldown',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'back',
    primaryMuscles: ['Lats'],
    secondaryMuscles: ['Upper back', 'Biceps'],
    formCue: 'Pull the elbows to the ribs and stay tall through the chest.',
    commonMistake: 'Yanking with the lower back and cutting the range short.',
    safetyNote: 'Use a shoulder-width neutral grip if the shoulder feels tight.',
    replacements: ['assisted_pull_up', 'single_arm_lat_pulldown', 'seated_cable_row'],
  },
  assisted_pull_up: {
    key: 'assisted_pull_up',
    name: 'Assisted pull-up',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'back',
    primaryMuscles: ['Lats'],
    secondaryMuscles: ['Upper back', 'Biceps', 'Core'],
    formCue: 'Drive elbows down and keep the ribs stacked.',
    commonMistake: 'Kicking through the legs to finish the top.',
    safetyNote: 'Control the lower down instead of dropping back to the stack.',
    replacements: ['lat_pulldown', 'single_arm_lat_pulldown', 'seated_cable_row'],
  },
  single_arm_lat_pulldown: {
    key: 'single_arm_lat_pulldown',
    name: 'Single-arm lat pulldown',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'back',
    primaryMuscles: ['Lats'],
    secondaryMuscles: ['Rear delts', 'Biceps'],
    formCue: 'Keep the torso quiet and finish the elbow near the back pocket.',
    commonMistake: 'Twisting through the torso to cheat the rep.',
    safetyNote: 'Stay lighter if shoulder control is inconsistent.',
    replacements: ['lat_pulldown', 'assisted_pull_up', 'one_arm_dumbbell_row'],
  },
  chest_supported_row: {
    key: 'chest_supported_row',
    name: 'Chest-supported row',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'back',
    primaryMuscles: ['Upper back'],
    secondaryMuscles: ['Lats', 'Rear delts', 'Biceps'],
    formCue: 'Drive elbows back and keep the chest heavy on the pad.',
    commonMistake: 'Shrugging and bouncing off the bottom.',
    safetyNote: 'Use this if the lower back does not like unsupported rows.',
    replacements: ['seated_cable_row', 'one_arm_dumbbell_row', 'barbell_row'],
  },
  seated_cable_row: {
    key: 'seated_cable_row',
    name: 'Seated cable row',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'back',
    primaryMuscles: ['Mid-back'],
    secondaryMuscles: ['Lats', 'Rear delts', 'Biceps'],
    formCue: 'Reach long, then pull elbows past the torso without leaning back hard.',
    commonMistake: 'Turning the row into a torso swing.',
    safetyNote: 'Keep ribs stacked if the lower back gets cranky.',
    replacements: ['chest_supported_row', 'one_arm_dumbbell_row', 'single_arm_lat_pulldown'],
  },
  one_arm_dumbbell_row: {
    key: 'one_arm_dumbbell_row',
    name: 'One-arm dumbbell row',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'back',
    primaryMuscles: ['Lats'],
    secondaryMuscles: ['Upper back', 'Biceps'],
    formCue: 'Pull the elbow toward the hip and keep the torso square.',
    commonMistake: 'Rotating the body to finish the rep.',
    safetyNote: 'Brace the free hand hard to spare the lower back.',
    replacements: ['chest_supported_row', 'seated_cable_row', 'single_arm_lat_pulldown'],
  },
  face_pull: {
    key: 'face_pull',
    name: 'Face pull',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'rear_delts',
    primaryMuscles: ['Rear delts'],
    secondaryMuscles: ['Upper back', 'Rotator cuff'],
    formCue: 'Pull to nose level and rotate the thumbs back at the finish.',
    commonMistake: 'Dropping the elbows and turning it into a row.',
    safetyNote: 'Stay smooth and light. This is about position, not ego.',
    replacements: ['reverse_pec_deck', 'rear_delt_row', 'cable_external_rotation'],
  },
  reverse_pec_deck: {
    key: 'reverse_pec_deck',
    name: 'Reverse pec deck',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'rear_delts',
    primaryMuscles: ['Rear delts'],
    secondaryMuscles: ['Upper back'],
    formCue: 'Lead with the elbows and pause with the shoulders down.',
    commonMistake: 'Pushing through the traps and shortening the arc.',
    safetyNote: 'Use this if cables are busy and you need a stable rear-delt slot.',
    replacements: ['face_pull', 'rear_delt_row', 'cable_external_rotation'],
  },
  rear_delt_row: {
    key: 'rear_delt_row',
    name: 'Rear-delt row',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'rear_delts',
    primaryMuscles: ['Rear delts'],
    secondaryMuscles: ['Upper back', 'Biceps'],
    formCue: 'Keep elbows wide and hands loose so the rear delts do the work.',
    commonMistake: 'Pulling too low and turning it into a lat row.',
    safetyNote: 'Stay light and controlled.',
    replacements: ['face_pull', 'reverse_pec_deck', 'cable_external_rotation'],
  },
  cable_external_rotation: {
    key: 'cable_external_rotation',
    name: 'Cable external rotation',
    dayTags: ['pull', 'upper', 'back'],
    muscleGroup: 'rotator_cuff',
    primaryMuscles: ['Rotator cuff'],
    secondaryMuscles: ['Rear delts'],
    formCue: 'Keep the elbow pinned and rotate through the shoulder only.',
    commonMistake: 'Swinging the wrist instead of rotating the shoulder.',
    safetyNote: 'This is a control drill, not a heavy movement.',
    replacements: ['face_pull', 'reverse_pec_deck', 'rear_delt_row'],
  },
  back_squat: {
    key: 'back_squat',
    name: 'Back squat',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'legs',
    primaryMuscles: ['Quads'],
    secondaryMuscles: ['Glutes', 'Core'],
    formCue: 'Brace first, sit between the hips, and drive the floor away.',
    commonMistake: 'Losing mid-foot pressure and folding at the bottom.',
    safetyNote: 'If knees or lower back flare up, move to a goblet squat or leg press.',
    replacements: ['goblet_squat', 'leg_press', 'split_squat'],
  },
  goblet_squat: {
    key: 'goblet_squat',
    name: 'Goblet squat',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'legs',
    primaryMuscles: ['Quads'],
    secondaryMuscles: ['Glutes', 'Core'],
    formCue: 'Keep the bell close, ribs stacked, and elbows inside the knees.',
    commonMistake: 'Falling forward because the brace disappears.',
    safetyNote: 'This is the cleanest beginner squat option when balance is shaky.',
    replacements: ['leg_press', 'split_squat', 'back_squat'],
  },
  leg_press: {
    key: 'leg_press',
    name: 'Leg press',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'legs',
    primaryMuscles: ['Quads'],
    secondaryMuscles: ['Glutes'],
    formCue: 'Drive through the full foot and keep the hips glued to the pad.',
    commonMistake: 'Letting the hips tuck hard off the seat at the bottom.',
    safetyNote: 'Shorten the range if the lower back rounds under load.',
    replacements: ['goblet_squat', 'split_squat', 'back_squat'],
  },
  split_squat: {
    key: 'split_squat',
    name: 'Split squat',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'legs',
    primaryMuscles: ['Quads'],
    secondaryMuscles: ['Glutes', 'Adductors'],
    formCue: 'Stay tall and let the front knee travel forward over the toes.',
    commonMistake: 'Cutting the depth short and bouncing off the back leg.',
    safetyNote: 'Use straps or a rack for balance if needed.',
    replacements: ['leg_press', 'goblet_squat', 'walking_lunge'],
  },
  romanian_deadlift: {
    key: 'romanian_deadlift',
    name: 'Romanian deadlift',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'posterior_chain',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Glutes', 'Lower back'],
    formCue: 'Push the hips back and keep the bar close to the legs.',
    commonMistake: 'Turning it into a squat by bending the knees too much.',
    safetyNote: 'If the lower back is sensitive, shorten the range and brace harder.',
    replacements: ['hip_thrust', 'hamstring_curl', 'cable_pull_through'],
  },
  hip_thrust: {
    key: 'hip_thrust',
    name: 'Hip thrust',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'posterior_chain',
    primaryMuscles: ['Glutes'],
    secondaryMuscles: ['Hamstrings'],
    formCue: 'Tuck the ribs down and squeeze through the top without overextending.',
    commonMistake: 'Finishing with the lower back instead of the glutes.',
    safetyNote: 'Pause for one second at lockout to keep the tension honest.',
    replacements: ['romanian_deadlift', 'hamstring_curl', 'cable_pull_through'],
  },
  hamstring_curl: {
    key: 'hamstring_curl',
    name: 'Hamstring curl',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'posterior_chain',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Calves'],
    formCue: 'Curl under control and keep the hips heavy on the pad.',
    commonMistake: 'Snapping the weight up with momentum.',
    safetyNote: 'Stay smooth if hamstrings tend to cramp.',
    replacements: ['romanian_deadlift', 'hip_thrust', 'cable_pull_through'],
  },
  cable_pull_through: {
    key: 'cable_pull_through',
    name: 'Cable pull-through',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'posterior_chain',
    primaryMuscles: ['Glutes'],
    secondaryMuscles: ['Hamstrings'],
    formCue: 'Push the hips back and snap them forward while keeping the ribs stacked.',
    commonMistake: 'Squatting the movement and losing the hinge.',
    safetyNote: 'Great option when the lower back wants a lighter hinge pattern.',
    replacements: ['hip_thrust', 'hamstring_curl', 'romanian_deadlift'],
  },
  calf_raise: {
    key: 'calf_raise',
    name: 'Calf raise',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'calves',
    primaryMuscles: ['Calves'],
    secondaryMuscles: [],
    formCue: 'Pause high and lower through a full stretch each rep.',
    commonMistake: 'Bouncing through the bottom and rushing the top.',
    safetyNote: 'Hold onto support if balance steals the tension.',
    replacements: ['seated_calf_raise', 'tibialis_raise', 'walking_lunge'],
  },
  seated_calf_raise: {
    key: 'seated_calf_raise',
    name: 'Seated calf raise',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'calves',
    primaryMuscles: ['Calves'],
    secondaryMuscles: [],
    formCue: 'Drive through the big toe and pause hard at the top.',
    commonMistake: 'Turning it into a bounce instead of a controlled raise.',
    safetyNote: 'Use a shorter range if the ankle feels pinchy.',
    replacements: ['calf_raise', 'tibialis_raise', 'walking_lunge'],
  },
  tibialis_raise: {
    key: 'tibialis_raise',
    name: 'Tibialis raise',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'calves',
    primaryMuscles: ['Tibialis'],
    secondaryMuscles: ['Shins'],
    formCue: 'Pull the toes up high and lower under control.',
    commonMistake: 'Leaning back so hard that the range disappears.',
    safetyNote: 'Good add-on when shin splints or ankle stiffness show up.',
    replacements: ['calf_raise', 'seated_calf_raise', 'walking_lunge'],
  },
  walking_lunge: {
    key: 'walking_lunge',
    name: 'Walking lunge',
    dayTags: ['legs', 'lower'],
    muscleGroup: 'legs',
    primaryMuscles: ['Quads', 'Glutes'],
    secondaryMuscles: ['Adductors', 'Core'],
    formCue: 'Stay tall, land soft, and keep the front foot flat.',
    commonMistake: 'Stepping too short and dumping the knee forward.',
    safetyNote: 'Shorten the stride if the hips feel pinchy.',
    replacements: ['split_squat', 'leg_press', 'goblet_squat'],
  },
  bicep_curl: {
    key: 'bicep_curl',
    name: 'Bicep curl',
    dayTags: ['arms', 'pull'],
    muscleGroup: 'biceps',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    formCue: 'Keep elbows tucked and let the biceps finish the top.',
    commonMistake: 'Swinging the torso to chase heavier weight.',
    safetyNote: 'Lower slowly if elbows feel cranky.',
    replacements: ['hammer_curl', 'cable_curl', 'preacher_curl'],
  },
  hammer_curl: {
    key: 'hammer_curl',
    name: 'Hammer curl',
    dayTags: ['arms', 'pull'],
    muscleGroup: 'biceps',
    primaryMuscles: ['Brachialis'],
    secondaryMuscles: ['Biceps', 'Forearms'],
    formCue: 'Keep palms neutral and curl without shrugging.',
    commonMistake: 'Letting the elbows drift forward at the top.',
    safetyNote: 'Great swap if straight-bar curls annoy the wrists.',
    replacements: ['cable_curl', 'bicep_curl', 'preacher_curl'],
  },
  cable_curl: {
    key: 'cable_curl',
    name: 'Cable curl',
    dayTags: ['arms', 'pull'],
    muscleGroup: 'biceps',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    formCue: 'Stay tall and keep constant tension through the full arc.',
    commonMistake: 'Walking backward and using the whole body.',
    safetyNote: 'Use a lighter load if elbows feel sticky.',
    replacements: ['hammer_curl', 'bicep_curl', 'preacher_curl'],
  },
  preacher_curl: {
    key: 'preacher_curl',
    name: 'Preacher curl',
    dayTags: ['arms', 'pull'],
    muscleGroup: 'biceps',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    formCue: 'Stay on the pad and lift smoothly without yanking the bottom.',
    commonMistake: 'Snapping out of the stretched position.',
    safetyNote: 'Do not force the last inch if the tendon feels sharp.',
    replacements: ['hammer_curl', 'cable_curl', 'bicep_curl'],
  },
  bench_dips: {
    key: 'bench_dips',
    name: 'Bench dips',
    dayTags: ['arms', 'push'],
    muscleGroup: 'triceps',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Lower chest', 'Front delts'],
    formCue: 'Stay close to the bench and use a short, controlled range.',
    commonMistake: 'Dropping too deep and dumping the shoulders forward.',
    safetyNote: 'Skip these if the shoulder already feels irritated.',
    replacements: ['rope_pushdown', 'close_grip_push_up', 'overhead_triceps_extension'],
  },
  chest_fly: {
    key: 'chest_fly',
    name: 'Cable chest fly',
    dayTags: ['push', 'chest'],
    muscleGroup: 'chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Front delts'],
    formCue: 'Hug the rib cage and squeeze the handles together in front of the sternum.',
    commonMistake: 'Reaching too far behind the body and stressing the shoulder.',
    safetyNote: 'Keep a soft bend in the elbow the whole time.',
    replacements: ['machine_chest_press', 'push_ups', 'dumbbell_incline_press'],
  },
  dead_bug: {
    key: 'dead_bug',
    name: 'Dead bug',
    dayTags: ['recovery', 'full_body'],
    muscleGroup: 'core',
    primaryMuscles: ['Core'],
    secondaryMuscles: ['Hip flexors'],
    formCue: 'Keep the lower back pinned and move slowly.',
    commonMistake: 'Letting the ribs pop up as the legs reach away.',
    safetyNote: 'Shorten the reach if the back lifts off the floor.',
    replacements: ['bird_dog', 'plank', 'cable_external_rotation'],
  },
  bird_dog: {
    key: 'bird_dog',
    name: 'Bird-dog',
    dayTags: ['recovery', 'full_body'],
    muscleGroup: 'core',
    primaryMuscles: ['Core'],
    secondaryMuscles: ['Glutes', 'Shoulder stabilizers'],
    formCue: 'Reach long through heel and hand without twisting.',
    commonMistake: 'Dumping weight into the lower back.',
    safetyNote: 'Move slower than you think you need to.',
    replacements: ['dead_bug', 'plank', 'walking_lunge'],
  },
  plank: {
    key: 'plank',
    name: 'Plank',
    dayTags: ['recovery', 'full_body'],
    muscleGroup: 'core',
    primaryMuscles: ['Core'],
    secondaryMuscles: ['Shoulders', 'Glutes'],
    formCue: 'Pull elbows toward toes and keep the ribs tucked.',
    commonMistake: 'Letting the hips sag and the chest collapse.',
    safetyNote: 'Raise the hands if the wrists or shoulders complain.',
    replacements: ['dead_bug', 'bird_dog', 'cable_external_rotation'],
  },
};

const splitSequences = {
  'push-pull-legs': ['push', 'pull', 'legs', 'push', 'pull', 'legs'],
  'upper-lower': ['upper', 'lower', 'upper', 'lower', 'upper', 'lower'],
  'full-body': ['full_body_a', 'full_body_b', 'full_body_c', 'full_body_a', 'full_body_b', 'full_body_c'],
  'bro-split': ['chest', 'back', 'legs', 'shoulders', 'arms', 'back'],
};

const dayTemplates = {
  push: ['incline_bench_press', 'machine_chest_press', 'cable_lateral_raise', 'rope_pushdown'],
  pull: ['lat_pulldown', 'chest_supported_row', 'face_pull', 'hammer_curl'],
  legs: ['back_squat', 'romanian_deadlift', 'walking_lunge', 'calf_raise'],
  upper: ['incline_bench_press', 'lat_pulldown', 'dumbbell_shoulder_press', 'seated_cable_row'],
  lower: ['leg_press', 'romanian_deadlift', 'hamstring_curl', 'calf_raise'],
  full_body_a: ['goblet_squat', 'machine_chest_press', 'lat_pulldown', 'dead_bug'],
  full_body_b: ['leg_press', 'dumbbell_incline_press', 'one_arm_dumbbell_row', 'plank'],
  full_body_c: ['split_squat', 'landmine_press', 'seated_cable_row', 'bird_dog'],
  chest: ['incline_bench_press', 'machine_chest_press', 'chest_fly', 'rope_pushdown'],
  back: ['lat_pulldown', 'chest_supported_row', 'single_arm_lat_pulldown', 'face_pull'],
  shoulders: ['landmine_press', 'cable_lateral_raise', 'reverse_pec_deck', 'overhead_triceps_extension'],
  arms: ['rope_pushdown', 'hammer_curl', 'cable_curl', 'close_grip_push_up'],
  recovery: ['bird_dog', 'dead_bug', 'plank', 'walking_lunge'],
};

const workoutSchedules = {
  3: [1, 3, 5],
  4: [1, 2, 4, 6],
  5: [1, 2, 3, 5, 6],
  6: [1, 2, 3, 4, 5, 6],
};

const budgetCategoryCopy = {
  lean: 'lean budget',
  balanced: 'balanced budget',
  performance: 'performance budget',
};

function normalizeLegacyGoal(goal) {
  if (goal === 'discipline') {
    return 'recomp';
  }

  return goal || 'recomp';
}

function normalizeLegacyTone(tone) {
  if (tone === 'assertive') {
    return 'strict';
  }

  if (tone === 'companion') {
    return 'friendly';
  }

  return tone || 'calm';
}

export function createDefaultProfile() {
  return {
    name: 'Suraj',
    phoneNumber: '',
    age: '27',
    gender: 'male',
    heightCm: '175',
    weightKg: '74',
    goal: 'recomp',
    experienceLevel: 'intermediate',
    workoutDaysPerWeek: 4,
    cadence: '4x',
    preferredSplit: 'push-pull-legs',
    foodPreference: 'eggetarian',
    budget: 'balanced',
    dailyBudget: '12',
    injuries: 'Mild right shoulder tightness on deep pressing.',
    language: 'hinglish',
    trainerName: 'Coach Arjun',
    tone: 'motivational',
    reminders: 'smart',
    savedAt: null,
  };
}

export function sanitizeProfile(profile = {}) {
  const defaults = createDefaultProfile();
  const workoutDays =
    Number.parseInt(profile.workoutDaysPerWeek || profile.cadence, 10) ||
    Number.parseInt(defaults.workoutDaysPerWeek, 10);
  const cleanDays = Math.min(6, Math.max(3, workoutDays));
  const cleanBudget = String(profile.dailyBudget ?? defaults.dailyBudget);

  return {
    ...defaults,
    ...profile,
    goal: normalizeLegacyGoal(profile.goal || defaults.goal),
    tone: normalizeLegacyTone(profile.tone || defaults.tone),
    workoutDaysPerWeek: cleanDays,
    cadence: `${cleanDays}x`,
    dailyBudget: cleanBudget,
    budget: profile.budget || defaults.budget,
  };
}

function getDayNumber(date = new Date()) {
  const weekday = date.getDay();

  return weekday === 0 ? 7 : weekday;
}

function getTrainingSchedule(daysPerWeek) {
  return workoutSchedules[daysPerWeek] || workoutSchedules[4];
}

function getSessionOrdinal(profile, date = new Date()) {
  const schedule = getTrainingSchedule(profile.workoutDaysPerWeek);
  const dayNumber = getDayNumber(date);

  return schedule.findIndex((value) => value === dayNumber);
}

function getDaySequence(profile) {
  return splitSequences[profile.preferredSplit] || splitSequences['push-pull-legs'];
}

function pickDayKey(profile, date = new Date()) {
  const sessionOrdinal = getSessionOrdinal(profile, date);

  if (sessionOrdinal === -1) {
    return 'recovery';
  }

  const sequence = getDaySequence(profile);

  return sequence[sessionOrdinal % sequence.length];
}

function getGoalRepProfile(goal, compound, easyMode) {
  const profiles = {
    strength: compound ? ['4-6', 135] : ['6-8', 90],
    muscle_gain: compound ? ['6-10', 105] : ['10-14', 75],
    fat_loss: compound ? ['8-12', 75] : ['12-15', 60],
    recomp: compound ? ['6-8', 90] : ['10-12', 70],
  };

  const fallback = profiles.recomp;
  const [reps, rest] = profiles[goal] || fallback;

  if (!easyMode) {
    return [reps, rest];
  }

  return [compound ? '6-8' : '10-12', Math.max(60, rest - 10)];
}

function getSetCount(profile, position, easyMode) {
  const base = profile.experienceLevel === 'advanced' ? 4 : profile.experienceLevel === 'beginner' ? 3 : 4;
  const premium = position === 0 && profile.goal === 'strength' ? 1 : 0;
  const easyPenalty = easyMode ? 1 : 0;

  return Math.max(2, base + premium - easyPenalty - (position > 2 ? 1 : 0));
}

function buildTrainerNote(exercise, profile, dayKey, recovery, easyMode) {
  const recoveryLine =
    recovery >= 88
      ? 'Recovery is green, so the work can stay crisp and confident.'
      : recovery <= 82
        ? 'Recovery is a touch soft, so keep one clean rep in reserve.'
        : 'Recovery is steady. Stay technical and own the pace.';
  const splitLine =
    dayKey === 'push' || dayKey === 'chest'
      ? 'Press hard, but never lose shoulder position.'
      : dayKey === 'pull' || dayKey === 'back'
        ? 'Drive the elbow first and keep the torso quiet.'
        : dayKey === 'legs' || dayKey === 'lower'
          ? 'Use the brace before the rep, not during the rep.'
          : 'Keep the movement quality clean and repeatable.';

  if (easyMode) {
    return `Today stays lighter on purpose. ${recoveryLine}`;
  }

  return `${splitLine} ${recoveryLine}`;
}

function adjustForLimitations(exerciseKeys, profile) {
  const injuries = (profile.injuries || '').toLowerCase();

  return exerciseKeys.map((key) => {
    if (injuries.includes('shoulder')) {
      if (key === 'overhead_press') {
        return 'landmine_press';
      }

      if (key === 'incline_bench_press') {
        return 'machine_chest_press';
      }
    }

    if (injuries.includes('knee')) {
      if (key === 'back_squat') {
        return 'leg_press';
      }

      if (key === 'walking_lunge') {
        return 'split_squat';
      }
    }

    if (injuries.includes('back')) {
      if (key === 'romanian_deadlift') {
        return 'hip_thrust';
      }

      if (key === 'barbell_row') {
        return 'chest_supported_row';
      }
    }

    return key;
  });
}

function createExercisePrescription(key, profile, recovery, dayKey, position, easyMode = false) {
  const exercise = exerciseLibrary[key];
  const compound = position < 2;
  const [repsLabel, baseRest] = getGoalRepProfile(profile.goal, compound, easyMode);
  const restSeconds =
    baseRest +
    (recovery <= 82 ? 15 : 0) +
    (profile.experienceLevel === 'beginner' ? -10 : 0);

  return {
    ...exercise,
    sets: getSetCount(profile, position, easyMode),
    repsLabel,
    reps: repsLabel,
    restSeconds: Math.max(45, restSeconds),
    targetMusclesLabel: [...exercise.primaryMuscles, ...exercise.secondaryMuscles].join(', '),
    trainerNote: buildTrainerNote(exercise, profile, dayKey, recovery, easyMode),
  };
}

function getWhyWorkout(profile, dayKey, recovery) {
  const splitCopy =
    profile.preferredSplit === 'push-pull-legs'
      ? 'your push-pull-legs rhythm'
      : profile.preferredSplit === 'upper-lower'
        ? 'your upper-lower rhythm'
        : profile.preferredSplit === 'bro-split'
          ? 'your bro-split structure'
          : 'your full-body rotation';
  const recoveryCopy =
    recovery >= 88
      ? 'Recovery is high, so the plan keeps the main lifts strong and direct.'
      : recovery <= 82
        ? 'Recovery is softer today, so the plan trims fatigue and protects form.'
        : 'Recovery is stable, so the plan stays productive without overreaching.';

  if (dayKey === 'recovery') {
    return `Today is a recovery day inside ${splitCopy}. The goal is to stay mobile, keep blood flow high, and come back fresher for the next hard session.`;
  }

  return `This session is built around ${splitCopy}, your ${profile.goal.replace('_', ' ')} goal, and ${profile.experienceLevel} training history. ${recoveryCopy}`;
}

function getTodayFocus(dayKey) {
  const labels = {
    push: 'Chest, front delts, and triceps',
    pull: 'Lats, upper back, and biceps',
    legs: 'Quads, glutes, hamstrings, and calves',
    upper: 'Upper body strength and balance',
    lower: 'Lower body strength and hinge quality',
    full_body_a: 'Squat, press, pull, and core',
    full_body_b: 'Leg drive, incline press, row, and trunk control',
    full_body_c: 'Single-leg work, shoulder-friendly press, row, and core',
    chest: 'Chest density with shoulder-safe pressing',
    back: 'Width, thickness, and rear-delt control',
    shoulders: 'Delts, upper-back balance, and triceps support',
    arms: 'Arms volume with elbow-friendly choices',
    recovery: 'Mobility, core control, and easy blood flow',
  };

  return labels[dayKey] || 'Balanced full-body training';
}

function formatDayLabel(dayKey) {
  const labels = {
    push: 'Push Day',
    pull: 'Pull Day',
    legs: 'Leg Day',
    upper: 'Upper Day',
    lower: 'Lower Day',
    full_body_a: 'Full Body A',
    full_body_b: 'Full Body B',
    full_body_c: 'Full Body C',
    chest: 'Chest Day',
    back: 'Back Day',
    shoulders: 'Shoulder Day',
    arms: 'Arms Day',
    recovery: 'Recovery Reset',
  };

  return labels[dayKey] || 'Today\'s Session';
}

export function buildTrainerGreeting(profile, date = new Date()) {
  const hour = date.getHours();
  const name = profile.name || 'champ';
  const trainer = profile.trainerName || 'Coach Arjun';
  let slot = 'evening';

  if (hour < 12) {
    slot = 'morning';
  } else if (hour < 17) {
    slot = 'afternoon';
  }

  if (profile.language === 'english') {
    return `${slot === 'morning' ? 'Good morning' : slot === 'afternoon' ? 'Good afternoon' : 'Good evening'}, ${name}. ${trainer} has your plan ready.`;
  }

  if (profile.language === 'hindi') {
    return `${name}, shubh ${slot === 'morning' ? 'subah' : slot === 'afternoon' ? 'dopahar' : 'shaam'}. ${trainer} tumhare liye aaj ka plan leke tayyar hai.`;
  }

  return `${name}, ${slot === 'morning' ? 'good morning' : slot === 'afternoon' ? 'good afternoon' : 'good evening'}. ${trainer} aaj ka plan ready rakha hai.`;
}

export function generateWorkoutPlan(profile, recovery, date = new Date(), easyMode = false) {
  const dayKey = pickDayKey(profile, date);
  const baseKeys = adjustForLimitations(dayTemplates[dayKey] || dayTemplates.recovery, profile);
  const exercises = baseKeys.map((key, index) =>
    createExercisePrescription(key, profile, recovery, dayKey, index, easyMode),
  );

  return {
    dayKey,
    dayLabel: formatDayLabel(dayKey),
    isWorkoutDay: dayKey !== 'recovery',
    title:
      dayKey === 'recovery'
        ? `${profile.trainerName || 'Coach Arjun'} Recovery Reset`
        : `${formatDayLabel(dayKey)} | ${profile.goal.replace('_', ' ')} focus`,
    todayFocus: getTodayFocus(dayKey),
    whyThisWorkout: getWhyWorkout(profile, dayKey, recovery),
    trainerGreeting: buildTrainerGreeting(profile, date),
    exercises,
    defaultMuscleFocusKey: exercises[0]?.key || 'incline_bench_press',
  };
}

export function getExerciseByKey(key) {
  return exerciseLibrary[key] || exerciseLibrary.incline_bench_press;
}

export function getMuscleFocus(exerciseKey) {
  const exercise = getExerciseByKey(exerciseKey);

  return {
    title: exercise.name,
    primaryMuscles: exercise.primaryMuscles,
    secondaryMuscles: exercise.secondaryMuscles,
    formCue: exercise.formCue,
    commonMistake: exercise.commonMistake,
    safetyNote: exercise.safetyNote,
    muscleGroup: exercise.muscleGroup,
  };
}

export function getReplacementOptions(exerciseKey, profile, recovery) {
  const exercise = getExerciseByKey(exerciseKey);

  return exercise.replacements
    .filter((key) => exerciseLibrary[key])
    .map((key, index) => createExercisePrescription(key, profile, recovery, 'push', index))
    .slice(0, 3);
}

export function createReplacementExercise(exerciseKey, profile, recovery, sourceExercise) {
  if (!exerciseLibrary[exerciseKey]) {
    return sourceExercise;
  }

  const replacement = createExercisePrescription(exerciseKey, profile, recovery, 'push', 1);

  return {
    ...replacement,
    sets: sourceExercise?.sets || replacement.sets,
    repsLabel: sourceExercise?.repsLabel || replacement.repsLabel,
    reps: sourceExercise?.reps || replacement.reps,
    restSeconds: sourceExercise?.restSeconds || replacement.restSeconds,
  };
}

function resolveProteinMultiplier(goal) {
  if (goal === 'muscle_gain') {
    return 2.1;
  }

  if (goal === 'fat_loss') {
    return 2.0;
  }

  if (goal === 'strength') {
    return 1.9;
  }

  return 2.0;
}

function getBudgetBucket(dailyBudget) {
  const budget = Number.parseFloat(dailyBudget || '12');

  if (budget <= 8) {
    return 'lean';
  }

  if (budget >= 15) {
    return 'performance';
  }

  return 'balanced';
}

function getFoodMeals(foodPreference) {
  const meals = {
    veg: {
      postWorkout: 'Paneer bhurji with roti and curd',
      affordable: ['Soya pulao', 'Paneer rice bowl', 'Moong chilla with curd'],
    },
    'non-veg': {
      postWorkout: 'Chicken rice bowl with cucumber curd',
      affordable: ['Egg bhurji roti', 'Chicken pulao', 'Curd rice with grilled chicken'],
    },
    eggetarian: {
      postWorkout: 'Egg bhurji with rice and curd',
      affordable: ['Masala omelette with toast', 'Egg rice bowl', 'Paneer + egg wrap'],
    },
  };

  return meals[foodPreference] || meals.eggetarian;
}

export function buildDietPlan(profile, isWorkoutDay) {
  const weight = Number.parseFloat(profile.weightKg || '74');
  const proteinTarget = Math.max(95, Math.round(weight * resolveProteinMultiplier(profile.goal)));
  const budgetBucket = getBudgetBucket(profile.dailyBudget);
  const meals = getFoodMeals(profile.foodPreference);
  const dailyBudget = Number.parseFloat(profile.dailyBudget || '12');
  const mealSuggestion =
    budgetBucket === 'lean'
      ? meals.affordable[0]
      : budgetBucket === 'performance'
        ? meals.affordable[1]
        : meals.affordable[2];

  return {
    proteinTarget,
    budgetBucket,
    budgetLabel: budgetCategoryCopy[budgetBucket],
    dailyBudget,
    dayTypeLabel: isWorkoutDay ? 'Workout day' : 'Recovery day',
    mealSuggestion,
    postWorkoutMeal: meals.postWorkout,
    affordableMeals: meals.affordable,
    rationale: `${profile.foodPreference} meals stay inside a ${budgetCategoryCopy[budgetBucket]} while still supporting ${profile.goal.replace('_', ' ')}.`,
  };
}

function getCurrentExercise(workout) {
  return workout.queue[workout.currentExerciseIndex] || workout.queue[0];
}

function findExerciseByMessage(message, workout) {
  const normalized = message.toLowerCase();
  const queueMatch = workout.queue.find((item) => normalized.includes(item.name.toLowerCase()));

  if (queueMatch) {
    return queueMatch;
  }

  return Object.values(exerciseLibrary).find((exercise) =>
    normalized.includes(exercise.name.toLowerCase()),
  );
}

function formatLanguageCopy(profile, english, hindi, hinglish) {
  if (profile.language === 'english') {
    return english;
  }

  if (profile.language === 'hindi') {
    return hindi;
  }

  return hinglish;
}

export function buildTrainerReply({
  message,
  profile,
  workout,
  analytics,
  dietPlan,
}) {
  const normalized = message.toLowerCase();
  const currentExercise = getCurrentExercise(workout);
  const mentionedExercise = findExerciseByMessage(message, workout) || currentExercise;
  const trainerName = profile.trainerName || 'Coach Arjun';
  const userName = profile.name || 'champ';
  const replacementOptions = getReplacementOptions(mentionedExercise.key, profile, analytics.recovery);
  const mentionPlan = workout.plan;

  if (normalized.includes('replace')) {
    const first = replacementOptions[0];
    const second = replacementOptions[1];

    return {
      muscleFocusKey: mentionedExercise.key,
      text: formatLanguageCopy(
        profile,
        `${userName}, swap ${mentionedExercise.name} for ${first.name}. Do ${first.sets} sets of ${first.repsLabel}, rest ${first.restSeconds} sec. Second option is ${second.name} if you want a simpler line of push.`,
        `${userName}, ${mentionedExercise.name} ko ${first.name} se replace karo. ${first.sets} set x ${first.repsLabel} reps rakho, ${first.restSeconds} second rest lo. Dusra safe option ${second.name} hai.`,
        `${userName}, ${mentionedExercise.name} ko ${first.name} se swap kar lo. ${first.sets} set x ${first.repsLabel} reps rakho, ${first.restSeconds} sec rest lo. Agar aur smooth chahiye toh ${second.name} bhi clean rahega.`,
      ),
    };
  }

  if (normalized.includes('shoulder pain')) {
    return {
      muscleFocusKey: 'landmine_press',
      text: formatLanguageCopy(
        profile,
        `${userName}, back off deep pressing today. Use landmine press for 3 sets of 8-10, rest 75 sec, and keep pain under 3 out of 10. ${trainerName} wants shoulder position protected first.`,
        `${userName}, aaj deep pressing halka rakho. Landmine press 3 set x 8-10 reps karo, 75 second rest lo, aur dard ko 3/10 se neeche rakho. ${trainerName} safety pehle rakhega.`,
        `${userName}, shoulder pain ho toh deep press mat force karo. Landmine press 3 set x 8-10 reps karo, 75 sec rest rakho, aur pain 3/10 ke neeche hi rehna chahiye. ${trainerName} pehle shoulder safe rakhega.`,
      ),
    };
  }

  if (normalized.includes('push day')) {
    const first = mentionPlan.exercises[0];
    const second = mentionPlan.exercises[1];

    return {
      muscleFocusKey: first.key,
      text: formatLanguageCopy(
        profile,
        `${userName}, today is ${mentionPlan.dayLabel}. Start with ${first.name} for ${first.sets} x ${first.repsLabel}, rest ${first.restSeconds} sec. Then move to ${second.name}. Keep shoulders packed and chase clean reps.`,
        `${userName}, aaj ${mentionPlan.dayLabel} hai. ${first.name} se ${first.sets} x ${first.repsLabel} start karo, ${first.restSeconds} second rest lo. Fir ${second.name} par jao. Kandhe stable rakho aur clean reps lo.`,
        `${userName}, aaj ${mentionPlan.dayLabel} hai. ${first.name} se ${first.sets} x ${first.repsLabel} start karenge, ${first.restSeconds} sec rest rakho. Uske baad ${second.name}. Shoulder blades tight rakho aur clean reps maaro.`,
      ),
    };
  }

  if (normalized.includes('chest focus')) {
    return {
      muscleFocusKey: 'incline_bench_press',
      text: formatLanguageCopy(
        profile,
        `${userName}, chest focus means press, press, then adduction. Keep ${mentionPlan.exercises[0].name}, add cable chest fly for 3 x 12, and keep the elbows 45 degrees. ${trainerName} wants the chest doing the work, not the shoulders.`,
        `${userName}, chest focus ke liye press, press, phir fly rakhenge. ${mentionPlan.exercises[0].name} rakho, cable chest fly 3 x 12 add karo, aur kohni 45 degree par rakho. Kandhon ko kaam mat churaane do.`,
        `${userName}, chest focus chahiye toh press, press, phir fly. ${mentionPlan.exercises[0].name} rakho, cable chest fly 3 x 12 add karo, aur elbows 45 degree pe rakho. ${trainerName} chahta hai chest ka load chest pe hi rahe.`,
      ),
    };
  }

  if (normalized.includes('tired')) {
    return {
      muscleFocusKey: currentExercise.key,
      text: formatLanguageCopy(
        profile,
        `${userName}, low-energy day is fine. Drop one set from the first two lifts, keep one rep in reserve, and extend rest by 15 sec. The goal today is completion with good form.`,
        `${userName}, thakan hai toh koi problem nahi. Pehle do lifts se ek-ek set kam karo, ek rep reserve mein rakho, aur rest 15 second bada do. Aaj ka goal clean completion hai.`,
        `${userName}, tired feel kar rahe ho toh session ko smart rakho. Pehle do lifts se ek set kam kar do, ek rep reserve mein rakho, aur rest 15 sec bada do. Aaj bas clean finish chahiye.`,
      ),
    };
  }

  if (normalized.includes('eat after workout') || normalized.includes('post workout')) {
    return {
      muscleFocusKey: currentExercise.key,
      text: formatLanguageCopy(
        profile,
        `${userName}, post-workout meal rakho ${dietPlan.postWorkoutMeal}. Protein target ${dietPlan.proteinTarget}g hai, so keep that meal simple, salty, and easy to digest.`,
        `${userName}, workout ke baad ${dietPlan.postWorkoutMeal} rakho. Protein target ${dietPlan.proteinTarget}g hai, isliye meal simple, namkeen, aur easy digestible rakho.`,
        `${userName}, post-workout ke liye ${dietPlan.postWorkoutMeal} best rahega. Protein target ${dietPlan.proteinTarget}g hai, toh meal simple, salty, aur easy digest hona chahiye.`,
      ),
    };
  }

  if (normalized.includes('back workout')) {
    const pullOne = getExerciseByKey('lat_pulldown');
    const pullTwo = getExerciseByKey('chest_supported_row');

    return {
      muscleFocusKey: pullOne.key,
      text: formatLanguageCopy(
        profile,
        `${userName}, for back focus go ${pullOne.name} 4 x 8-10, then ${pullTwo.name} 4 x 8-10, rest 75-90 sec. Think elbows to hips on the pulldown and chest glued to the pad on the row.`,
        `${userName}, back focus ke liye ${pullOne.name} 4 x 8-10 karo, phir ${pullTwo.name} 4 x 8-10. 75-90 second rest lo. Pulldown mein kohni hip ki taraf kheecho aur row mein chest pad par chipka ke rakho.`,
        `${userName}, back workout ke liye ${pullOne.name} 4 x 8-10, phir ${pullTwo.name} 4 x 8-10 rakho. 75-90 sec rest. Pulldown mein elbow hip ki taraf lao aur row mein chest pad se mat hatao.`,
      ),
    };
  }

  if (normalized.includes('beginner')) {
    return {
      muscleFocusKey: currentExercise.key,
      text: formatLanguageCopy(
        profile,
        `${userName}, beginner-friendly version is 3 sets per exercise, 8-10 reps, and full control on every lowering phase. ${trainerName} wants you owning the pattern before chasing load.`,
        `${userName}, beginner-friendly version mein har exercise ke 3 set, 8-10 rep, aur neeche aate waqt full control rakho. Load se pehle pattern pakka karo.`,
        `${userName}, beginner-friendly rakhna hai toh har exercise 3 set, 8-10 reps, aur eccentric full control mein. ${trainerName} pehle movement pattern lock karwana chahta hai.`,
      ),
    };
  }

  if (normalized.includes('what should i eat') || normalized.includes('diet')) {
    return {
      muscleFocusKey: currentExercise.key,
      text: formatLanguageCopy(
        profile,
        `${userName}, keep today simple: ${dietPlan.mealSuggestion} as the affordable anchor, then ${dietPlan.postWorkoutMeal} after training. That fits your ${dietPlan.budgetLabel} and ${profile.foodPreference} preference.`,
        `${userName}, aaj khana simple rakho: ${dietPlan.mealSuggestion} ko affordable anchor banao, aur workout ke baad ${dietPlan.postWorkoutMeal} rakho. Ye tumhare ${dietPlan.budgetLabel} aur ${profile.foodPreference} preference ke andar fit hota hai.`,
        `${userName}, aaj diet simple rakho: ${dietPlan.mealSuggestion} ko main affordable meal banao, aur workout ke baad ${dietPlan.postWorkoutMeal} lo. Ye tumhare ${dietPlan.budgetLabel} aur ${profile.foodPreference} style mein fit rahega.`,
      ),
    };
  }

  return {
    muscleFocusKey: mentionedExercise.key,
    text: formatLanguageCopy(
      profile,
      `${userName}, ${trainerName} wants today simple: ${mentionPlan.todayFocus}. Stay on ${currentExercise.name}, use ${currentExercise.sets} x ${currentExercise.repsLabel}, rest ${currentExercise.restSeconds} sec, and keep safety first.`,
      `${userName}, ${trainerName} aaj ek simple focus chahta hai: ${mentionPlan.todayFocus}. ${currentExercise.name} par raho, ${currentExercise.sets} x ${currentExercise.repsLabel} karo, ${currentExercise.restSeconds} second rest lo, aur safety pehle rakho.`,
      `${userName}, ${trainerName} ka aaj simple focus hai: ${mentionPlan.todayFocus}. ${currentExercise.name} pe raho, ${currentExercise.sets} x ${currentExercise.repsLabel} karo, ${currentExercise.restSeconds} sec rest rakho, aur safety pehle.`,
    ),
  };
}
