<script>
let computerSelection = Math.random();
let computerChoice;
console.log(computerSelection);


if (computerSelection < 0.35) {
	computerChoice = "PAPER"}

else if ((computerSelection > 0.34) && (computerSelection < 0.68)) {
	computerChoice = "SCISSOR"}

else {
	computerChoice = "ROCK"}
    
    
console.log("computer chooses " + computerChoice);    
    
let userSelection = prompt("Please Select ROCK, PAPER OR SCISSORS");    
console.log("user chooses " + userSelection);    
  
if ((computerChoice === "ROCK" && userSelection === "ROCK") 
    || (computerChoice === "PAPER" && userSelection === "PAPER")
  || (computerChoice === "SCISSOR" && userSelection === "SCISSOR"))
  {console.log("Its a tie!")}
 
else if ((computerChoice === "ROCK" && userSelection === "SCISSOR") 
    || (computerChoice === "SCISSOR" && userSelection === "PAPER")
  || (computerChoice === "PAPER" && userSelection === "ROCK"))
  {console.log("Computer Wins!")}
  
  else {console.log("User Wins!")}  
</script>