import i0 from '../images/0.png'
import i1 from '../images/1.png'
import i2 from '../images/2.png'
import i3 from '../images/3.png'
import i4 from '../images/4.png'
import i5 from '../images/5.png'
import i6 from '../images/6.png'
import i7 from '../images/7.png'
import i8 from '../images/8.png'
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
var questions = [
   
	["What does this sign mean? <br> <img src={i2}/><br> " ,"No freeway","No parking","No right turn","B"],
	["Near a pedestrian crossing,when the pedestrian are waiting to cross road, you should?", "Sound horn and proceed", "Slow down ,sound horn and pass", "Stop vehicle and wait till the pedestrian cross the road and then proceed", "C" ],
	["On a road that has been designated as one way ?", "You should not drive in reverse gear","You should not overtake","You should not park","A"],
	["You can overtake a vehicle that is in the front?","Through the left side of the vehicle ahead","Through the right side of the vehicle ahead","If the road is wide enough","B"],
	[ "A learner’s license is valid for a period of ?","30 days","6 months","Until a driving license is availed","B"],
	["What does this sign mean? <br> <img src={i0}> <br>","No u-turn","No right turn","No freeway","B"],	
	["The following sign represents:<br> <img src={i1}><br>", "No left turn","No freeway","No U-Turn" ,"C"],
	["On a one-way road, you should not : ","Over-speed","Park on the way","Drive in the reverse gear","C"],
	["Overtaking is allowed only:","From the right side","From the left side","After honking 3 times","A"],
	["Vehicles used for transport can be differentiated through","Vehicle’s colour","Vehicle’ number plate","Vehicle’s tyre size","B"],
	
	["The following sign represents: <br> <img src={i3}/><br>","Stop","Stop","Hospital ahead","A"],
	["The following sign represents: <br> <img src={i4}/><br> ","Petrol pump","Parking lot - Taxis","Ferry" ,"A"],
	["You are approaching a narrow bridge, another vehicle is about to enter the room from opposite side, you should","Increase the speed and try to cross the bridge as fast as possible","Put on the head light and pass the bridge","Wait till the other vehicle crosses the bridge and then proceed","C"],
	["The following sign represents: <br> <img src={i5}/><br>","One way","Give way","Hospital","A"],
	["When a vehicle is involved in an accident causing injury to any person ?","Take the vehicle to the nearest police station and report the accident","Stop the vehicle and report to the police station","Take all reasonable steps to secure medical attention to the injured and report to the nearest police station within 24 hours","C" ],
	["The following sign represents: <br> <img src={i6}/><br> ","Request to stop the vehicle from behind","Request to stop the vehicle from front","Request to stop the vehicle from behind and front","A"],
	["The following sign represents: <br> <img src={i7}/><br> ","Request to stop the vehicle from behind","Request to stop the vehicle from front","Request to stop the vehicle from behind and front","B"],
	["On a road designated as one way ?","Parking is prohibited","Overtaking is prohibited","Should not drive in reverse gear","C"],
	["The following sign represents:<img src={i8}/><br>","Horn prohibited","Sound horn compulsory","Cross road","A"],
	["Overtaking is prohibited ","When the road ahead is not clearly visible","In the night","When the road center is marked with white broken lines","A"],
	
	
	
	
	
	
];
function _(x){
	return document.getElementById(x);
}
function renderQuestion(){
	test = _("test");
	if(pos >= questions.length){
		test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
		_("test_status").innerHTML = "Test Completed";
		pos = 0;
		correct = 0;
		return false;
	}
	_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
	question = questions[pos][0];
	chA = questions[pos][1];
	chB = questions[pos][2];
	chC = questions[pos][3];
	test.innerHTML = "<h3>"+question+"</h3>";
	test.innerHTML += "<input type='radio' name='choices' value='A'> "+chA+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br><br>";
	test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}
function checkAnswer(){
	choices = document.getElementsByName("choices");
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;
		}
	}
	if(choice == questions[pos][4]){
		correct++;
	}
	pos++;
	renderQuestion();
}
window.addEventListener("load", renderQuestion, false);
