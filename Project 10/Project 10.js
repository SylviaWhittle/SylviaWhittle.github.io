// const axescol = 'rgba(255, 255, 255, 0.5)'

// const labels = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//   ];
//   const data = {
//     labels: labels,
//     datasets: [{
//       label: 'Dataset',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0, 10, 5, 2, 20, 30, 45],
//     }]
//   };
  
//   const config = {
//     type: 'line',
//     data: data,
//     options: {

//       color: axescol,

//       scales: {
//       xAxes: [{gridLines: { color: axescol }}],
//       yAxes: [{gridLines: { color: axescol }}]
//       },

//       layout: {
//           padding: 0
//       }
//     }
//   };


//   // === include 'setup' then 'config' above ===

//   var myChart = new Chart(
//     document.getElementById('chart canvas'),
//     config
//   );


var data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [{
    label: "Dataset #1",
    backgroundColor: "rgba(255,99,132,0.2)",
    borderColor: "rgba(255,99,132,1)",
    borderWidth: 2,
    hoverBackgroundColor: "rgba(255,99,132,0.4)",
    hoverBorderColor: "rgba(255,99,132,1)",
    data: [65, 59, 20, 81, 56, 55, 40],
  }]
};

var options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      stacked: true,
      grid: {
        display: true,
        color: "rgba(255,99,132,0.2)"
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

new Chart('chart canvas', {
  type: 'line',
  options: options,
  data: data
});

