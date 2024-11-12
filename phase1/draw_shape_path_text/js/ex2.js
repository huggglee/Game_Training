"use strict";
      let canvas;
      let context;

      window.onload = init;

      function init() {
        // Get a reference to the canvas
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");

        drawLogo();
      }
      function drawLogo(){
        context.beginPath();
      context.arc(400,200,100,0,2*Math.PI);
      context.fillStyle="#ec2b0d";
      context.fill();

      context.beginPath();
      context.arc(400,200,70,0,2*Math.PI);
      context.fillStyle="white";
      context.fill();
      context.lineWidth=5;
      context.stroke();

      context.beginPath();
      context.lineWidth=3
      context.moveTo(280,190);
      context.quadraticCurveTo(400, 150, 520, 190);
      context.stroke();

      context.beginPath();
      context.lineWidth=3
      context.moveTo(280,220);
      context.quadraticCurveTo(400, 180, 520, 220);
      context.stroke();

      context.beginPath();
      context.font ="22px Georgia";
      context.fillStyle = 'black';
      context.fillText('HungLee',353,193);
      }
