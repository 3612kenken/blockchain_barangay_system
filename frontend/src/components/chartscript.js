export const ChartScript = () => {

        window.onload = function(){
            
                // Line chart from swirlData for dashReport
                // var ctx = document.getElementById("dashReport").getContext("2d");
                // window.myBar = new Chart(ctx).Bar(barChartHorizontalData, {
                //     responsive : true
                // });
                
                  
            

                new Chart("dashReport", {
                    type: 'bar',
                    data: barData,
                    options: {
                        indexAxis: 'y'
                      
                    }
                    
                });

                new Chart("chart-area3", {
                    type: 'pie',
                    data: pieData
                    
                });

                new Chart("chart-area4", {
                    type: 'doughnut',
                    data: doughnutData2
                    
                });

        }   
}