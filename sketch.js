//PASSO 1 CRIAR AS VARIÁVEIS
var trex_correndo, trex, trex_parado;
var solo, soloImagem, soloInvisivel;
var nuvemImagem;
var pulo = -13,anger = 0
var reset,resetim
//criar as variáveis para os grupos
var cactoGrupo, nuvemGrupo;
var PLAY = 1;
var END = 0;
var score = 0
var gameState = PLAY;
var sompulo,somded
//CARREGAR ARQUIVOS DE MÍDIA
function preload() {
    soloImagem = loadImage("solo.png");
    nuvemImagem = loadImage("nuvem.png");
    gameOverImagem = loadImage("gameOver.png");
    resetim = loadImage("restart.png")
    sompulo = loadSound("jump.mp3")
    somded = loadSound("die.mp3")
    trex_correndo = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    trex_parado = loadAnimation("trex1.png");
    obs1 = loadImage("obstaculo1.png");
    obs2 = loadImage("obstaculo2.png");
    obs3 = loadImage("obstaculo3.png");
    obs4 = loadImage("obstaculo4.png");
    obs5 = loadImage("obstaculo5.png");
    obs6 = loadImage("obstaculo6.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //criar os grupos
    cactoGrupo = new Group();
    nuvemGrupo = new Group();
    //gameOver
    gameOver = createSprite(width/2,height-300);
    gameOver.addImage(gameOverImagem);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    reset = createSprite(width/2,height-250)
    reset.addImage(resetim)
    reset.scale = 0.5
    reset.visible = false
    //solo
    solo = createSprite(width/2, height-195, 600, 20);
    solo.addImage(soloImagem);
    
    //solo invisível
    soloInvisivel = createSprite(width/2, height-199, width, 2);
    soloInvisivel.visible = false;    
    //trex
    trex = createSprite(width/12, height-270, 50, 50);
    trex.addAnimation("correndo", trex_correndo);
    trex.addAnimation("parado", trex_parado);
    trex.scale = 0.5;
}

function draw() {
    background("white");
solo.velocityX = -score/5 -3;
    if(gameState==PLAY){
        trex.changeAnimation("correndo");
        if(keyDown("t")){
            pulo = -13
            score = 0
            anger = 0
        }
        if (solo.x < 400) {
            solo.x = solo.width / 3;
        }
        if(keyDown("r")){
            gameState = END
        }
        if ((keyDown("space") || touches.length>0) && trex.isTouching(solo)) {
            trex.velocityY = pulo;
            sompulo.play()
            touches = []
        }
        if(!trex.isTouching(solo)){
            trex.changeAnimation("parado");
        }
        console.log( Math.round( random( 50,450 ) ) )
        score +=0.3
        text(Math.round(score),width/1.5,height/2)
        pulo = -score/25 -13 -anger

        
       cactoGrupo.setVelocityXEach(-score/5 -3)
        criarNuvens();
        gerarObs();
        if(trex.isTouching(cactoGrupo)){
            gameState = END;
            somded.play()
        }
    }
    if(gameState == END){
        solo.velocityX = 0;
        cactoGrupo.setVelocityXEach(0)
        nuvemGrupo.setVelocityXEach(0)
        
        cactoGrupo.setLifetimeEach(-1);
        nuvemGrupo.setLifetimeEach(-1);
        gameOver.visible = true;
        reset.visible = true
        trex.changeAnimation("parado");
        if(mousePressedOver(reset)||touches.length>0){
            TRUE_RESET()
            touches = []
        }
    }
    trex.velocityY += 0.8;
    trex.collide(soloInvisivel);
    drawSprites();

}
//cria a function 
function criarNuvens(){
    if (frameCount % 60 === 0) {
        nuvem = createSprite(width, height/4, 40, 10);
        nuvem.y = Math.round(random(height/40,height/6.3));
        nuvem.addImage(nuvemImagem);
        nuvem.scale = 0.5;
        nuvem.velocityX = -3;

        //atribuir tempo de vida à sprite
        nuvem.lifetime = width/3;
        //ajustar a profundidade
        trex.depth = nuvem.depth + 1;
        nuvemGrupo.add(nuvem);
    }
}

function gerarObs() {
    if (frameCount % 40 === 0) {
        var cacto = createSprite(width, height-200, 10, 40);
        
        //gerar obstáculos aleatórios
        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1:
                cacto.addImage(obs1);
                break;
            case 2:
                cacto.addImage(obs2);
                break;
            case 3:
                cacto.addImage(obs3);
                break;
            case 4:
                cacto.addImage(obs4);
                break;
            case 5:
                cacto.addImage(obs5);
                break;
            case 6:
                cacto.addImage(obs6);
                break;
            default:
                break;
        }

        //atribuir escala e vida útil ao obstáculo       
        cacto.scale = 0.5;
        cacto.lifetime = width/2;
        cactoGrupo.add(cacto);
        


    }
}
function TRUE_RESET(){
    cactoGrupo.destroyEach()
    nuvemGrupo.destroyEach()
    score = 0 
    gameState = PLAY
    gameOver.visible = false
    reset.visible = false
    anger += 1
}
