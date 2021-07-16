let V, E;
let l = 3;
let Sc = -1;
let Csc = [];
let but, sel;

function init() {
    V = []; E = []; Sc = -1; Csc = [];
    let VS = [];
    for (let i = 0; i < l*l; i++) VS.push(i);
    for (let i = 0; i < l*l; i++) {
        let tmp = Math.floor(Math.random()*VS.length);
        let SV = [400+360*Math.sin(VS[tmp]/(l*l)*2*Math.PI), 400+360*Math.cos(VS[tmp]/(l*l)*2*Math.PI)];
        VS.splice(tmp, 1);
        V.push(SV);
    }
    
    for (let i = 0; i < l*l; i++) {
        if (i == 0) E.push([1, l]);
        else if (i == l-1) E.push([i-1, i+l, i+l-1]);
        else if (i == l*(l-1)) E.push([i-l, i+1, i-l+1]);
        else if (i == l*l-1) E.push([i-l, i-1]);
        else if (i < l) E.push([i-1, i+l, i+l-1, i+1]);
        else if (i > l*(l-1)) E.push([i-1, i-l, i-l+1, i+1]);
        else if (i%l == 0) E.push([i+l, i-l, i-l+1, i+1]);
        else if (i%l == l-1) E.push([i+l, i-l, i+l-1, i-1]);
        else E.push([i+1, i-1, i+l, i-l, i+l-1, i-l+1]);
    }
}

function setup() {
    createCanvas(800, 800);
    but = createButton("New Game");
    but.mouseClicked(newGame);
    but.size(83,21);
    but.position(100, 29);

    sel = createSelect();
    sel.option(1);
    sel.option(2);
    sel.option(3);
    sel.option(4);
    sel.option(5);
    sel.changed(changeN);
    sel.position(50, 30);

    init();
}

function newGame(){
    init();
}

function changeN(){
    l = parseInt(sel.value()) + 2;
    init();
}

function cross(a, b) {
    return true;
}

function mousePressed() {
    for (let i = 0; i < l*l; i++) {
        if (Math.sqrt((mouseX-V[i][0])*(mouseX-V[i][0])+(mouseY-V[i][1])*(mouseY-V[i][1])) <= 10) {
            Sc = i;
            Csc = E[i];
        }
    }
}

function mouseDragged() {
    V[Sc][0] = mouseX;
    V[Sc][1] = mouseY;
}

function mouseReleased() {
    Sc = -1;
    Csc = [];
}

function draw() {
    background(255);
    for (let i = 0; i < l*l; i++) {
        for (let j = 0; j < E[i].length; j++) {
            if (cross(i, j)) stroke('red');
            else stroke('green');
            line(V[i][0], V[i][1], V[E[i][j]][0], V[E[i][j]][1]);
        }
    }
    
    stroke('black');
    for (let i = 0; i < l*l; i++) {
        fill('blue');
        circle(V[i][0], V[i][1], 10);
        if (i == Sc) {
            fill('white');
            circle(V[i][0], V[i][1], 10);
        } if (Csc.includes(i)) {
            fill('yellow');
            circle(V[i][0], V[i][1], 10);
        }
    }
}