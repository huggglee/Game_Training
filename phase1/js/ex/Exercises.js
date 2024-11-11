// console.log('Hello world');


// console.log('The quick brown fox jumps over the lazy dog.');


// console.log('Haikus are easy');
// console.log("But sometimes they don't make sense");
// console.log('Refridgerator');

// let name = 'Apples';
// let price = 5.99;
// let quantity = 45;
// let discounted = false;

// price = 4.99;
// quantity = quantity - 24;
// discounted = !discounted;


// let heads = 0;
// let tails = 0;
// heads +=1;
// heads +=1;
// heads +=1;
// tails +=1;
// heads +=1;
// console.log('head: '+heads);
// console.log('tail: '+tails);

// //Ex2
// const PI = 3.1415;
// const e = 2.718;
// const r = 2;
// let circle = 2*PI*r;
// let result = Math.pow(e,circle);
// console.log(result);

// function surfaceArea(length,width,height){
//     return 2*(length*width + width*height + height*length);
// }

// let a = 4;

// function mystery1(a) {
// 	let b = a * -8;
// 	return (a - b) / a;
// }

// function mystery2(a, b) {
// 	let c = mystery1(b);
// 	b = a;
// 	a = mystery1(a);
// 	return a + b + c;
// }

// console.log(mystery2(mystery1(3)));

let sum =0;
for(let i = 4;i<=72;i++){
	sum+=i;
}
console.log(sum);

// mystery = 4;

// while (mystery > 0) {
// 	mystery--;
// 	for (let i = mystery; i > 0; i --) {
// 		console.log(i);
// 	}
// }

// function triangularNumber(num){
// 	let sum = 0;
// 	for(let i = 1;i<=num;i++){
// 		sum+=i;
// 	}
// 	return sum;
// }
// console.log(triangularNumber(5))

// class Team {
// 	constructor(name, wins=0, losses=0) {
// 		this.name = name;
// 		this.w = wins;
// 		this.l = losses;
// 	}

// 	winPercentage() {
// 		return this.w / (this.w + this.l);
// 	}

// 	gamesAhead(that) {
// 		return (this.w - this.l - that.w + that.l) / 2;
// 	}

// 	static playGame(winner, loser) {
// 		winner.w++;
// 		loser.l++;
// 	}
// }

