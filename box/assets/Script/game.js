
cc.Class({
    extends: cc.Component,

    properties: {
        stringEditbox :"",
        score : 0,
        playSound : true,
        startGame : true,
        inGame : false,
        endGame : false,
        load : true,
        lineColor : 0,
        brColor : 0,
        nextColor : 1,
        stepColor : 0.1,
        hScore : 0,
        sayHello : true,
        r : 0 , 
        g : 0 ,
        b : 0 ,
        editbox : {
            default : null,
            type : cc.EditBox
        },
        fallCheck : true,
        gameName : {
            default : null,
            type : cc.Node
        },
        gameNameList : {
            default : [],
            type : cc.SpriteFrame
        },
        audioEnd : {
            default : null,
            url : cc.AudioClip
        },
        audioHello : {
            default : null,
            url : cc.AudioClip
        },
        audioStartGame : {
            default : null,
            url : cc.AudioClip
        },
        audioPlayerCollide : {
            default : null,
            url : cc.AudioClip
        },
        audioGameOver : {
            default : null,
            url : cc.AudioClip
        },
        mode : {
            default : null,
            type : cc.Node
        },
        yourScore : {
            default : null,
            type : cc.Label
        },
        hello : {
            default : null,
            type : cc.Node
        },
        animation : {
            default : null,
            type : cc.Node
        },
        lineColorList : {
            default : [],
            type : cc.Color
        },
        playerSprite : {
            default : [],
            type : cc.SpriteFrame
        },
        color : {
            default : [],
            type : cc.Color
        },
        tapToStart : {
            default : null,
            type : cc.Node
        },
        
        labelScore : {
            default : null,
            type : cc.Node
        },
        labelScore1 : {
            default : null,
            type : cc.Label
        },
       stick : {
           default : null,
           type : cc.Prefab
       },
       player : {
           default : null,
           type : cc.Node
       },
       backRound : {
           default : [],
           type : cc.Node
       },
       startStick : {
           default : null,
           type : cc.Node
       },
       endScore : {
           default : null,
           type : cc.Node
       },
       endScore1 : {
            default : null,
            type : cc.Node
        },
        endScore2 : {
            default : null,
            type : cc.Node
        },
       highestScore : {
        default : null,
        type : cc.Label
       },
       replay : {
           default : null,
           type : cc.Node
       },
    },

    // LIFE-CYCLE CALLBACKS:
     onLoad () {
         this.touch();
         
     },
    editingDidEnded : function(){
        cc.log(this.editbox.string);
        cc.sys.localStorage.setItem('name',this.editbox.string);
    },
    
     
     changeBackRound : function(){
         for(var i  = 0 ; i < 3 ; i++){
            if(this.backRound[i].x > -540 && this.backRound[i].x < 540){
                var run = cc.moveBy(0.2 ,new cc.Vec2(Math.random()*50-Math.random()*50,0));
                this.backRound[i].runAction(run);
            }else
            if(this.backRound[i].x > 540){
                var run = cc.moveBy(0.2 ,new cc.Vec2(-1*Math.random()*50,0));
                this.backRound[i].runAction(run);
            }else{
                var run = cc.moveBy(0.2 ,new cc.Vec2(Math.random()*50,0));
                this.backRound[i].runAction(run);
            }
         }
     },
    touch : function(){
        var self = this;
        this.node.on('touchstart',function(){
            var t = true;
            self.t = t;
        });
    },
    spawnStickStart : function(){
        var stick = cc.instantiate(this.stick);
        var stick1 = cc.instantiate(this.stick);
        var stick2 = cc.instantiate(this.stick);
        var stick3 = cc.instantiate(this.stick);
        stick.x = Math.random()*540-Math.random()*540;
        stick.y = -320;
        stick1.x = Math.random()*540-Math.random()*540;
        stick1.y = 0;
        stick2.x = Math.random()*540-Math.random()*540;
        stick2.y = 320;
        stick3.x = Math.random()*540-Math.random()*540;
        stick3.y = 320*2;
        stick.color = this.lineColorList[this.lineColor];
        stick1.color = this.lineColorList[this.lineColor];
        stick2.color = this.lineColorList[this.lineColor];
        stick3.color = this.lineColorList[this.lineColor];
        this.node.addChild(stick);
        this.node.addChild(stick1);
        this.node.addChild(stick2);
        this.node.addChild(stick3);
        stick.getComponent('stick').game = this;
        stick1.getComponent('stick').game = this;
        stick2.getComponent('stick').game = this;
        stick3.getComponent('stick').game = this;
    },
    
    spawnStick : function(y){
        var stick = cc.instantiate(this.stick);
        stick.x = Math.random()*540-Math.random()*540;
        stick.y = y;
        stick.color = this.lineColorList[this.lineColor];
        this.node.addChild(stick);
        stick.getComponent('stick').game = this;
    },
    nextStep : function(){
        if(this.inGame){
            this.animation.getComponent('animation').playAnimation();
            var children = this.node.children;
            this.getScore();
            this.startStick.y = -2000;
            this.spawnStick(children[children.length-1].y+320);
            this.changeBackRound();
            var jump = cc.moveTo(0.2 , new cc.Vec2(this.player.x,320));
            for(var i = 0 ; i < children.length ; i++){
                children[i].getComponent('stick').jump1(this.player.y-320);
            }
            this.player.runAction(jump);

        }
        return true;
    },
    move : function (x){
        this.player.x = x;
    },
    getPlayerPosition : function(){
        if(this.player.y > 700){
            return true;
        } else {
            return false;
        }
    },
    getScore : function(){
        this.score++;
        this.labelScore1.string = "Score : " + this.score;
    },
    start () { 
        this.labelScore.active = false; 
        this.brColor = Math.floor(Math.random()*15);
        this.lineColor = Math.floor(Math.random()*18);
        this.startStick.color = this.lineColorList[this.lineColor];
        this.spawnStickStart();
        var startColor = Math.floor(Math.random()*15);
        for(var i = 0 ; i < 4 ; i++){
            this.backRound[i].color = this.color[this.brColor];
        }
        this.r = this.backRound[0].color.getR();
        this.g = this.backRound[0].color.getG();
        this.b = this.backRound[0].color.getB();
        this.endScore.active = false;
        cc.audioEngine.play(this.audioStartGame,false,1);
        this.setGameNameSprite();
        //cc.sys.localStorage.setItem('theHighestScore',0);
        
    },
    changeColor : function(){
        if(new cc.Color(this.r,this.g,this.b).equals(this.color[this.nextColor])){
            if(this.nextColor == 15){
                this.nextColor = -1;
            }
            this.nextColor+=1;
        }
        if(this.r > this.color[this.nextColor].getR()){
            this.r-=this.stepColor;
        }
        if(this.r < this.color[this.nextColor].getR()){
            this.r+=this.stepColor;
        }
        if(this.g > this.color[this.nextColor].getG()){
            this.g-=this.stepColor;
        }
        if(this.g < this.color[this.nextColor].getG()){
            this.g+=this.stepColor;
        }
        if(this.b > this.color[this.nextColor].getB()){
            this.b-=this.stepColor;
        }
        if(this.b < this.color[this.nextColor].getB()){
            this.b+=this.stepColor;
        }
        for(var i = 0 ; i < 4 ; i++){
            this.backRound[i].color = new cc.Color(this.r,this.g,this.b);
        }
        
    },
    startGameTap : function(){
        return this.inGame;
    },
    gameOver : function(){
        if(cc.sys.localStorage.getItem('theHighestScore') != null){
            this.hScore = cc.sys.localStorage.getItem('theHighestScore');
        }
        if(this.score > this.hScore){
            this.hScore = this.score;
            cc.sys.localStorage.setItem('theHighestScore',this.hScore);
            this.highestScore.string = "You're The Best : " + this.hScore;
            this.yourScore.string = "Congratulation ";
            this.editbox.getComponent('editbox').theBest();
            this.endScore1.getComponent(cc.Sprite).spriteFrame = this.playerSprite[Math.floor(this.score/10)];
        }else{
            this.editbox.getComponent('editbox').notTheBest();
            if(cc.sys.localStorage.getItem('name') != null){
                this.highestScore.string = cc.sys.localStorage.getItem('name')+ " : " + this.hScore;
            }else{
                this.highestScore.string =  "Unknow : " + this.hScore;
            }
            this.yourScore.string = "your score : " + this.score;
            this.endScore1.getComponent(cc.Sprite).spriteFrame = this.playerSprite[Math.floor(this.score/10)];
        }
        
        this.endScore2.color = this.lineColorList[Math.floor(Math.random()*18)];
        
        this.endScore.active = true;
        var moveEnd = cc.moveTo(1.5 , this.endScore.x , 960).easing(cc.easeQuarticActionIn());
        this.endScore.runAction(moveEnd);

    },
    audioCollide : function(){
        cc.audioEngine.play(this.audioPlayerCollide ,false ,1);
    },
    setGameNameSprite :function() {
        this.gameName.getComponent(cc.Sprite).spriteFrame = this.gameNameList[Math.floor(cc.random0To1()*5)];
    },
    setPayerSprite : function(){
         var index = Math.floor(this.score/10);
         this.player.getComponent(cc.Sprite).spriteFrame = this.playerSprite[index];
    },
     update (dt) {
         if(this.score % 10 == 0 && this.score != 0){
             this.hello.active = true;
             if(this.sayHello){
                cc.audioEngine.play(this.audioHello,false,1);
                this.sayHello = false;
             }
             
         }else{
             this.hello.active = false;
             this.sayHello = true;
         }
         this.hello.x = this.player.x + 70;
         this.hello.y = this.player.y +50;
         this.animation.x = this.player.x;
         this.animation.y = this.player.y-20;
         this.setPayerSprite();
         this.changeColor();
       if(this.t && this.inGame&&this.startStick.getComponent('startStick').checkCollide()){
        this.mode.active = false;
        this.labelScore.active = true;
        
         this.player.getComponent('player').jump();
         this.t = false;
       }
       if(this.t){
           this.tapToStart.destroy();
           this.inGame = true;
           this.startGame = false;
       }
       if(this.player.y<0&&this.fallCheck){
           cc.audioEngine.play(this.audioGameOver,false,1);
           this.fallCheck = false;
       }
       if(this.player.y < -1080){
           this.endGame = true;
           this.inGame = false;
       }
       if(this.endGame&&this.load){
           this.labelScore.active = false;
           this.gameOver();
           this.load = false;
       }
       if(this.endScore.y < 970&&this.playSound){
           cc.audioEngine.play(this.audioEnd,false,1);
           this.playSound = false;
       }
     },
});
