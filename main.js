noseX = 0;
noseY = 0;
difference = 0;
wristLeft = 0;
wristRight = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('PoseNet Is Initialised!');
}
function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX is = " +noseX+ " and NoseY is = "+noseY);

        wristLeft = results[0].pose.leftWrist.x;
        wristRight = results[0].pose.rightWrist.x;
        difference = floor(wristLeft - wristRight);

        console.log("wristLeft is = " +wristLeft+ " wristRight is = "+wristRight+ " and the difference = "+ difference);

    }
}
function draw() {
    background('#808080');

    document.getElementById("square_side").innerHTML = "Width and height of the square will be "+ difference+"px";
    fill('#FF0000');
    stroke('#FF0000');
    textSize(difference);
    text('Lerato',noseX, noseY);
}