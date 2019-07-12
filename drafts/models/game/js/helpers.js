export {sayHi, generate_color}

function generate_color() {
    return "#"+((1<<24)*Math.random()|0).toString(16)
}

function sayHi(user) {
    alert("helo ${user}");
}
