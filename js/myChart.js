
var ctx = document.getElementById('myChart').getContext('2d');
var focusHours = document.getElementById('focusMode').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['Discord', 'Spotify', 'Chrome', 'Photoshop', 'Steam', 'Word'],
        datasets: [{
            label: 'Hours spent on Applications (in hours)',
            data: [26, 3, 14, 2, 12, 1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
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
        }]
    },
    options: {
        resposive: true,
    }
});

var myChart = new Chart(focusHours, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saterday'],
        datasets: [{
            label: 'Focus Mode Duration Per Day (in hours)',
            data: [12, 10, 5, 8, 10, 2],
            backgroundColor: [
                'rgba(0, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.2)'
            ],
            borderColor: [
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)'
            ],
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