// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize exercise log and total duration from local storage
    let exerciseLog = JSON.parse(localStorage.getItem('exerciseLog')) || [];
    let totalDuration = parseInt(localStorage.getItem('totalDuration')) || 0;

    // Function to update local storage and the UI
    function updateLocalStorageAndUI() {
        // Update local storage
        localStorage.setItem('exerciseLog', JSON.stringify(exerciseLog));
        localStorage.setItem('totalDuration', totalDuration.toString());

        // Update UI
        updateUI();
    }

    // Function to update the exercise log and statistics
    function updateUI() {
        const logList = document.getElementById('logList');
        const totalDurationSpan = document.getElementById('totalDuration');
        const averageDurationSpan = document.getElementById('averageDuration');
        const totalExercisesSpan = document.getElementById('totalExercises');

        // Clear the log list
        logList.innerHTML = '';

        // Populate the log list
        exerciseLog.forEach((exercise) => {
            const listItem = document.createElement('li');
            listItem.textContent = formatExerciseLog(exercise);
            logList.appendChild(listItem);
        });

        // Update total duration
        totalDurationSpan.textContent = totalDuration;

        // Calculate and update average duration
        const averageDuration = exerciseLog.length > 0 ? totalDuration / exerciseLog.length : 0;
        averageDurationSpan.textContent = averageDuration.toFixed(2);

        // Update total exercises
        totalExercisesSpan.textContent = exerciseLog.length.toString();
    }

    // Function to format exercise log for display
    function formatExerciseLog(exercise) {
        let formattedLog = `${exercise.name}: ${exercise.duration} minutes`;

        // Include additional information based on exercise type
        if (exercise.additionalInfo) {
            formattedLog += ` - ${exercise.additionalInfo}`;
        }

        formattedLog += ` on ${exercise.date}`;
        return formattedLog;
    }

    // Function to add an exercise
    window.addExercise = function () {
        const exerciseSelect = document.getElementById('exerciseSelect');
        const durationInput = document.getElementById('durationInput');

        const exerciseName = exerciseSelect.value;
        const exerciseDuration = parseInt(durationInput.value);
        const exerciseDate = new Date().toLocaleDateString(); // Use current date by default

        // Validate duration
        if (isNaN(exerciseDuration) || exerciseDuration <= 0) {
            alert('Please enter a valid duration.');
            return;
        }

        // Get additional information based on exercise type
        let additionalInfo = '';
        console.log(exerciseName)
        switch (exerciseName) {
            case 'Running':
                additionalInfo = prompt('Enter distance (in km):') + " km";
                break;
            case 'Walking':
                additionalInfo = prompt('Enter steps:') + " steps";
                break;
            case 'Weightlifting':
                additionalInfo = prompt('Enter weight (in kg):') + " kg";
                break;
            case 'Push-ups':
            case 'Sit-ups':
                additionalInfo = prompt('Enter reps:') + " reps";
                break;
        }

        // Add exercise to log
        exerciseLog.push({
            name: exerciseName,
            duration: exerciseDuration,
            additionalInfo: additionalInfo || null,
            date: exerciseDate,
        });

        // Update total duration
        totalDuration += exerciseDuration;

        // Clear input fields
        exerciseSelect.value = 'Running';
        durationInput.value = '';

        // Update local storage and the UI
        updateLocalStorageAndUI();
    };

    // Initial UI update
    updateUI();
});
