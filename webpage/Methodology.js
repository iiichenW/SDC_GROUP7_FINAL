var chart = Highcharts.chart('Methodology', {
	chart: {
		backgroundColor: 'white',
		events: {
			load: function () {
				// Draw the flow chart
				var ren = this.renderer,
					colors = Highcharts.getOptions().colors,
					rightArrow = ['M', 0, 0, 'L', 60, 0, 'L', 55, 5, 'M', 60, 0, 'L', 55, -5],
					leftArrow = ['M', 100, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];

      	// Separator,Variable Test from Panel Data Test
				ren.path(['M', 110, 40, 'L', 110, 330])
					.attr({
					'stroke-width': 2,
					stroke: 'silver',
					dashstyle: 'dash'
				}).add();

				// Separator. Panel Data Test from Model Selection
				ren.path(['M', 250, 40, 'L', 250, 330])
					.attr({
					'stroke-width': 2,
					stroke: 'silver',
					dashstyle: 'dash'
				}).add();

        // Separator. Model Selection from Model Estimation
        ren.path(['M', 910, 40, 'L', 910, 330])
          .attr({
          'stroke-width': 2,
          stroke: 'silver',
          dashstyle: 'dash',
        }).add();


      	// Headers
				ren.label('Variable Test', 10, 43)
					.css({
          color: "#B08B0D",
          font:'Arial',
          fontSize:'12',
					fontWeight: 'bold',
          fontFamily:'Arial'
				}).add();


				ren.label('Panel Data Test', 130, 43)
					.css({
          color: "#97282C",
          font:'Arial',
          fontSize:'12',
					fontWeight: 'bold',
          fontFamily:'Arial'
				}).add();

				ren.label('Model Selection', 535, 43)
					.css({
          color: "#428F89",
          font:'Arial',
          fontSize:'12',
					fontWeight: 'bold',
          fontFamily:'Arial'
				}).add();

        ren.label('Estimation', 955, 43)
					.css({
          color: "#805489",
          font:'Arial',
          fontSize:'12',
					fontWeight: 'bold',
          fontFamily:'Arial'
				}).add();


      	// Variable Test label
				ren.label('Pearson‘s <br/>Correlation <br/>Test', 15, 82)
					.attr({
					fill: "#B08B0D",
					stroke: 'white',
					'stroke-width': 2,
					padding: 5,
					r: 5
				}).css({
          font:'Arial',
					color: 'white',
          fontFamily:'Arial'
				}).add().shadow(true);

        // Vertical line （M/L）
        ren.path(['M', 50, 140, 'L', 50, 175, 'L', 45, 170, 'M', 55, 170, 'L', 50, 176])
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        }).add();

        ren.label('Multi-<br/>Collinearity <br/>Test', 15, 180)
          .attr({
          fill: "#B08B0D",
          stroke: 'white',
          'stroke-width': 2,
          padding: 5,
          r: 5
        })
          .css({
          font:'Arial',
          color: 'white',
          width: '100px',
          fontFamily:'Arial'
        })
          .add()
          .shadow(true);

				// Arrow from Variable Test to  Panel Data Test
				ren.path(rightArrow)
					.attr({
					'stroke-width': 2,
					stroke: colors[1]
				})
					.translate(80, 160)
					.add();

        ren.label('No collinear variables', 55, 140)
  				.css({
          font:'Arial',
  				fontSize: '10px',
          fontFamily:'Arial',
  				color: colors[1]
  			}).add();



//Panel Data Test

        ren.label('Unit Root Test', 130, 95)
          .attr({
          fill: "#97282C",
          stroke: 'white',
          'stroke-width': 2,
          padding: 5,
          r: 5
        })
          .css({
          color: 'white',
          width: '100px',
          fontFamily:'Arial'
        })
          .add()
          .shadow(true);

        ren.label('Cointegration Test', 122, 200)
          .attr({
          fill: "#97282C",
          stroke: 'white',
          'stroke-width': 2,
          padding: 5,
          r: 5
        })
          .css({
          color: 'white',
          width: '200px',
          fontFamily:'Arial'
          })
          .add()
          .shadow(true);


				// lines
				ren.path(['M', 175, 120, 'L', 175, 195, 'L', 170, 190, 'M', 175, 195, 'L', 180, 190])
					.attr({
					'stroke-width': 2,
					stroke: colors[1]
				}).add();
				ren.label('Stationary Panel Data', 195, 140)
					.css({
					color: colors[1],
					fontSize: '10px',
          fontFamily:'Arial'
				}).add();
        ren.path(rightArrow)
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        })
          .translate(220, 160)
          .add();



// Model Selection label
				ren.label('Build<br> Model</br>', 310, 135)
					.attr({
					fill: "#428F89",
					stroke: 'white',
					'stroke-width': 2,
					padding: 5,
					r: 5
				})
					.css({
					color: 'white',
					width: '100px',
          fontFamily:'Arial'
				})
					.add()
					.shadow(true);
          // Arrow from Build Model to Models420
        ren.path(['M', 370, 90, 'L', 370, 210, 'L', 380, 210, 'M', 380, 90, 'L', 370, 90,
                  'M', 360, 155, 'L', 380, 155])
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        }).add();

        ren.label('Pooled Regression Model', 380, 80)
          .attr({
          fill: "#428F89",
          stroke: 'white',
          'stroke-width': 2,
          padding: 5,
          r: 5,
          width: 145
        })
          .css({
          color: 'white',
          width: '200px',
          fontFamily:'Arial'
        })
          .add()
          .shadow(true);

        ren.label('Fixed Effects Model', 380, 140)
          .attr({
          fill: "#428F89",
          stroke: 'white',
          'stroke-width': 2,
          padding: 5,
          r: 5,
          width: 145
        })
          .css({
          color: 'white',
          width: '200px',
          fontFamily:'Arial'
        })
          .add()
          .shadow(true);

        ren.label('Random Effects Model', 380, 200)
          .attr({
          fill: "#428F89",
          stroke: 'white',
          'stroke-width': 2,
          padding: 5,
          r: 5,
          width: 145
        })
          .css({
          color: 'white',
          width: '200px',
          fontFamily:'Arial'
        })
          .add()
          .shadow(true);


        //F test line
        ren.path(['M', 550, 90, 'L', 550, 145, 'L', 540, 145, 'M', 550, 90, 'L',540 , 90,
                  'M', 550, 145, 'L',550 , 145])
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        }).add();

        var ren = this.renderer,
          colors = Highcharts.getOptions().colors,
          rightArrow1 = ['M', 0, 0, 'L', 265, 0, 'L', 260, 5, 'M', 265, 0, 'L', 260, -5],
          leftArrow1 = ['M', 265, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];
        ren.path(rightArrow1)
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        })
          .translate(550, 110)
          .add();
        ren.path(leftArrow1)
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        })
          .translate(550, 100)
          .add();
        ren.label('p < 0.05', 640, 80)
          .css({
          fontFamily:'Arial',
          ontSize: '10px',
          color: colors[1]
        }).add();


        // Three Test left
       ren.path(['M', 550, 160, 'L',550, 210, 'L', 540, 210, 'M', 550, 160, 'L',540 , 160,
                  'M', 550, 180, 'L',560 , 180])
          .attr({
          'stroke-width': 2,
           stroke: colors[1]
        }).add();
       // right
       ren.path(['M', 570, 155, 'L', 570, 210, 'L', 570, 210, 'M', 590, 155, 'L', 570, 155,
                 'M', 570, 210, 'L',590 , 210])
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
          }).add();

       var rightArrow3 = ['M', 0, 0, 'L', 10, 0, 'L', 5, 5, 'M', 10, 0, 'L', 5, -5],
           leftArrow3 = ['M', 10, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];
       ren.path(leftArrow3)
         .attr({
         'stroke-width': 2,
         stroke: colors[1]
        })
         .translate(540, 145)
         .add();
       ren.path(leftArrow3)
         .attr({
         'stroke-width': 2,
         stroke: colors[1]
        })
          .translate(540, 160)
          .add();

        var rightArrow3 = ['M', 0, 0, 'L', 20, 0, 'L', 15, 5, 'M', 20, 0, 'L', 15, -5],
            leftArrow3 = ['M', 20, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];

        ren.path(leftArrow3)
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        })
          .translate(550, 180)
          .add();
        ren.path(rightArrow3)
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        })
          .translate(550, 190)
          .add();


          ren.label('Serial Correlation Test', 580, 140)
            .attr({
            fill: "#428F89",
            stroke: 'white',
            'stroke-width': 2,
            padding: 5,
            r: 5,
            width: 150
          })
            .css({
            color: 'white',
            width: '200px',
            fontFamily:'Arial'
          })
            .add()
            .shadow(true);

            ren.label('Heteroskedasticity Test', 580, 170)
              .attr({
              fill: "#428F89",
              stroke: 'white',
              'stroke-width': 2,
              padding: 5,
              r: 5,
              width: 150
            })
              .css({
              color: 'white',
              width: '200px',
              fontFamily:'Arial'
            })
              .add()
              .shadow(true);

              ren.label('Cross-sectional <br>Dependence Test</br>', 580, 200)
                .attr({
                fill: "#428F89",
                stroke: 'white',
                'stroke-width': 2,
                padding: 5,
                r: 5,
                width: 150
              })
                .css({
                color: 'white',
                width: '200px',
                fontFamily:'Arial'
              })
                .add()
                .shadow(true);

//Hausman and Modified Hausman Test Link
       ren.path(['M', 745, 150, 'L', 745, 210, 'L', 738, 210, 'M', 745, 150, 'L',738 , 150])
         .attr({
         'stroke-width': 2,
         stroke: colors[1]
       }).add();

       var rightArrow4 = ['M', 0, 0, 'L', 38, 0, 'L', 33, 5, 'M', 38, 0, 'L', 33, -5],
               leftArrow4 = ['M', 38, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];
       ren.path(leftArrow4)
         .attr({
         'stroke-width': 2,
         stroke: colors[1]
       })
          .translate(748, 180)
          .add();

        ren.path(rightArrow4)
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
                     })
          .translate(746, 190)
          .add();

        ren.label('Exist', 747, 190)
          .css({
          fontFamily:'Arial',
          ontSize: '10px',
          color: colors[1]
         }).add();
        ren.label('p<0.05', 749, 155)
          .css({
          fontFamily:'Arial',
          ontSize: '10px',
          fontSize:"9px",
          color: colors[1]
          }).add();

        ren.path(['M', 785, 150, 'L',785, 210, 'L', 785, 210, 'M', 785, 150, 'L',795, 150,
                     'M', 785, 210, 'L',795 , 210])
           .attr({
           'stroke-width': 2,
           stroke: colors[1]
        }).add();



        var rightArrow5 = ['M', 0, 0, 'L', 8, 0, 'L', 3, 5, 'M', 8, 0, 'L', 3, -5],
            leftArrow5 = ['M', 8, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];
        ren.path(rightArrow5)
                 .attr({
                 'stroke-width': 2,
                 stroke: colors[1]
                  })
                  .translate(840, 210)
                  .add();

        ren.label('F Test', 820, 90)
          .attr({
          fill: "#428F89",
          stroke: 'white',
          'stroke-width': 2,
          padding: 5,
          r: 5
        })
          .css({
          color: 'white',
          width: '100px',
          fontFamily:'Arial'
        })
          .add()
          .shadow(true);

      ren.label('Classical Hausman Test', 800, 140)
        .attr({
        fill: "#428F89",
        stroke: 'white',
        'stroke-width': 2,
         padding: 5,
         r: 5
       })
         .css({
         color: 'white',
         width: '100px',
         fontFamily:'Arial'
      })
         .add()
         .shadow(true);

         ren.label('Modified Hausman Test', 800, 200)
           .attr({
           fill: "#428F89",
           stroke: 'white',
           'stroke-width': 2,
           padding: 5,
           r: 5
        })
           .css({
           color: 'white',
           width: '100px',
           fontFamily:'Arial'
        })
           .add()
           .shadow(true);

//Estimation label
          ren.label('Driving Factors', 950, 100)
            .attr({
            fill: "#805489",
            stroke: 'white',
            'stroke-width': 2,
             padding: 5,
             r: 5,
          })
             .css({
             color: 'white',
             width: '100px',
             fontFamily:'Arial'
          })
             .add()
             .shadow(true);

          ren.label('Parameters', 960, 180)
            .attr({
            fill: "#805489",
            stroke: 'white',
            'stroke-width': 2,
            padding: 5,
            r: 5,
          })
            .css({
            color: 'white',
            width: '100px',
            fontFamily:'Arial'
          })
            .add()
            .shadow(true);

          ren.path(rightArrow4)
            .attr({
            'stroke-width': 2,
            stroke: colors[1]
          })
            .translate(895, 160)
            .add();


				// Arrow from step 1 to step 4
        ren.path(rightArrow3)
          .attr({
          'stroke-width': 2,
          stroke: colors[1]
        })
          .translate(100, 53)
          .add();

				ren.path(rightArrow1)
					.attr({
          font:'Arial',
					'stroke-width': 2,
					stroke: colors[1]
				})
					.translate(235, 53)
					.add();

          ren.path(rightArrow1)
            .attr({
            'stroke-width': 2,
            stroke: colors[1]
          })
            .translate(680, 53)
            .add();
			}
		}
	},
	title: {
		text: '',
		style: {
      fontSize:"18",
			color: 'black',
      fontFamily:'Arial'
      
		}
	}
});