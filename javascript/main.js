      //TABLETOP
      //window.onload = function() { init() };

      var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Ix4tVSja9VqRt0G5j0l0d6bnAlZeXTvjZ9Q_sOeYO0I/pubhtml';

      function init() {
        Tabletop.init( { key: public_spreadsheet_url,
                         callback: showInfo,
                         simpleSheet: true
                       } )
      }


      function showInfo(data, tabletop) {

        var container = document.querySelector(".container");
        container.innerHTML = "";

        var one = data.map(function(data){
      
          var obj = {};
          obj = [data.State, Number(data.SARs)];
          return obj;
        })

        var two = data.map(function(data){
      
          var obj = {};
          obj = [data.State, Number(data.sars_per_thousand)];
          return obj;
        })     
      
        var three = data.map(function(data){
      
          var obj = {};
          obj = [data.State, Number(data.sars_per_billion)];
          return obj;
        })

        var four = data.map(function(data){
      
          var obj = {};
          obj = [data.State, Number(data.SARs)];
          return obj;
        })

        drawChart(one,two,three);
        drawRegionsMap(four)


      }


      //GOOGLE CHARTS 
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {
        'packages':['corechart','geochart'],
        'mapsApiKey': 'AIzaSyBZwDPOPCo9j2uWC0vLUAclihnEGyKeO34'

      });

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(init,drawRegionsMap);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart(dataStuff1,dataStuff2,dataStuff3) {

        // Create the data table.
        var data1 = new google.visualization.DataTable();
        data1.addColumn('string', 'State');
        data1.addColumn('number', 'SARs');
        data1.addRows(dataStuff1);

        var data2 = new google.visualization.DataTable();
        data2.addColumn('string', 'State');
        data2.addColumn('number', 'sars_per_thousand');
        data2.addRows(dataStuff2);

        var data3 = new google.visualization.DataTable();
        data3.addColumn('string', 'State');
        data3.addColumn('number', 'sars_per_billion');
        data3.addRows(dataStuff3);

        // Set chart options
        var options1 = {'title':'Filed by MSBs',
                       'width':1500,
                       'height':800,
                        colors: ['#6b7c93'],
                        legend: { position: "none" }
                       };

        var options2 = {'title':'MSB filings per thousand people (2018 population estimate)',
                       'width':1500,
                       'height':800,
                        colors: ['#6b7c93'],
                        legend: { position: "none" }

                     };

        var options3 = {'title':'MSB filings per $1bn of GDP (2017 GDP)',
                       'width':1500,
                       'height':800,
                        colors: ['#6b7c93'],
                        legend: { position: "none" }                        
                     };                         


        // Instantiate and draw our charts, passing in some options.
        var chart1 = new google.visualization.ColumnChart(document.getElementById('chart1_div'));
        chart1.draw(data1, options1);

        var chart2 = new google.visualization.ColumnChart(document.getElementById('chart2_div'));
        chart2.draw(data2, options2);

        var chart3 = new google.visualization.ColumnChart(document.getElementById('chart3_div'));
        chart3.draw(data3, options3);

      }

        function drawRegionsMap(dataStuff4) {

        var data4 = new google.visualization.DataTable();
        data4.addColumn('string', 'State');
        data4.addColumn('number', 'SARs');
        data4.addRows(dataStuff4);

        var options4 = {
                    sizeAxis: { minSize: 1, maxSize: 50 },
                    region: 'US',
                    legend: 'none',
                    displayMode: 'markers',
                    colorAxis: {colors: ['#ffe7cb', '#7c0e3e']} // reds
                      };

        var chart4 = new google.visualization.GeoChart(document.getElementById('chart4_div'));
        chart4.draw(data4, options4);

      };

