//Écrivez une fonction fibGenerator qui renvoie un objet générateur qui produit la séquence de Fibonacci .
//La  séquence de Fibonacci  est définie par la relation .Xn = Xn-1 + Xn-2
//Les premiers numéros de la série sont 0, 1, 1, 2, 3, 5, 8, 13.

var fibGenerator = function*() {
    yield a = 0
    yield b = 1
    while( true) {
        yield num = (a-2) +(b-1)

    }
}


const gen = fibGenerator();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 1
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);