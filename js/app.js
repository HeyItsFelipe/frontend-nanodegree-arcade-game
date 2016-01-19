// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.StartingX = x;
    this.StartingY = y;
    this.x = this.StartingX;
    this.y = this.StartingY;
    this.width = 65;
    this.height = 55;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    //if statement to randomize enemy starting y location
    //once it passes canvas right edge
    if (this.x > 606) {

        this.x = this.StartingX;
        this.y = 60 + (83 * Math.floor(Math.random() * 3));
    }

    //if statement for collision detection, if beetle collides with
    //player, player is sent to beginning
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {

        player.x = player.StartingX;
        player.y = player.StartingY;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    this.sprite = 'images/char-boy.png';
    this.StartingX = x;
    this.StartingY = y;
    this.x = this.StartingX;
    this.y = this.StartingY;
    this.width = 65;
    this.height = 80;
};

Player.prototype.update = function(dt){

    //When player goes into the water row,
    //player goes back to starting position
    if (this.y < 60) {

        this.x = this.StartingX;
        this.y = this.StartingY;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Input for controls makes sure
//player doesn't go off canvas
Player.prototype.handleInput = function(dir) {

    if (dir == 'right' && this.x < 404)
        this.x = this.x + 101;

    if (dir == 'left' && this.x > 0)
        this.x = this.x - 101;

    if (dir == 'up')
        this.y = this.y - 83;

    if (dir == 'down' && this.y < 392)
        this.y = this.y + 83;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Larry = new Enemy(-101, 60, 101);
var Moe = new Enemy(-101, 143, 211);
var Curly = new Enemy(-101, 226, 307);
var allEnemies = [Larry, Moe, Curly];
var player = new Player(202, 392);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
