// statistics.js

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve exercise log and total duration from local storage
    const exerciseLog = JSON.parse(localStorage.getItem('exerciseLog')) || [];

    // Extract unique dates and exercises from the exercise log
    const uniqueDates = [...new Set(exerciseLog.map(exercise => exercise.date))];
    const uniqueExercises = [...new Set(exerciseLog.map(exercise => exercise.name))];


    let totalExercises = 0;
    let exerciseFrequency = {};

    // Calculate total duration and exercise frequency
    exerciseLog.forEach(exercise => {
        totalExercises += 1;
        exerciseFrequency[exercise.name] = (exerciseFrequency[exercise.name] || 0) + 1;
    });




    // Function to calculate total duration for each date
    function calculateTotalDurationByDate(date) {
        return exerciseLog.filter(exercise => exercise.date === date)
            .reduce((total, exercise) => total + exercise.duration, 0);
    }

    // Function to calculate total duration for each exercise
    function calculateTotalDurationByExercise(exercise) {
        return exerciseLog.filter(e => e.name === exercise)
            .reduce((total, e) => total + e.duration, 0);
    }

    // Display line chart for statistics by date
    const dateCtx = document.getElementById('dateChart').getContext('2d');
    const dateChart = new Chart(dateCtx, {
        type: 'line',
        data: {
            labels: uniqueDates,
            datasets: [{
                label: 'Total Duration (minutes) by Date',
                data: uniqueDates.map(date => calculateTotalDurationByDate(date)),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Display bar chart for statistics by exercise
    const exerciseCtx = document.getElementById('exerciseChart').getContext('2d');
    const exerciseChart = new Chart(exerciseCtx, {
        type: 'bar',
        data: {
            labels: uniqueExercises,
            datasets: [{
                label: 'Total Duration (minutes) by Exercise',
                data: uniqueExercises.map(exercise => calculateTotalDurationByExercise(exercise)),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    // display pie chart of frequencies
    const frequencyCtx = document.getElementById('frequencyChart').getContext('2d');
    const frequencyChart = new Chart(frequencyCtx, {
        type: 'doughnut',
        data: {
            labels: uniqueExercises,
            datasets: [{
                label: 'Exercise Frequency',
                data: uniqueExercises.map(exercise => exerciseFrequency[exercise]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }],
            options: {
                cutout: '80%',
            }

        }



    });
    frequencyCtx.canvas.style.height = '600px';
    frequencyCtx.canvas.style.height = '600px';


});
