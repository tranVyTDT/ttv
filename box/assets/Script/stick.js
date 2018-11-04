// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        right : true,
        left : false,
        collide : true,
        finish : false,
        sound : true,
        speed : 0,
        time : 0,
        time1 : 0,
        balance : 0,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.getCollisionManager().enabled = true;
     },
     onCollisionEnter(){   
         this.sound = true;
        this.finish = true;
     },
     onCollisionStay(){
         this.time+=0.1;
         this.time1+=0.1;
         if(this.sound){
            this.game.audioCollide();
            this.sound = false;
         }
        if(this.collide && this.time>0.5 && this.finish){
            if(this.game.nextStep()){
                //this.speed = 0;
                this.finish = false;
                this.balance = this.node.x+540-this.game.player.x;
                if(this.balance > 100 || this.balance < -100){
                   // this.balance = 0;
                }
            }
            this.collide = false;
            this.time = 0;
        }
        if(!this.finish){
            this.game.move(this.node.x+540-this.balance);
        }
        if(this.game.getPlayerPosition()&&this.time1>0.5&&this.finish){
            this.game.nextStep();
            this.finish = false;
            
            this.time1 = 0;
        }
     },
     onCollisionExit(){
         this.sound = true;
     },
     jump1 : function(y){
        var jump = cc.moveBy(0.2 , new cc.Vec2(0,-1*y));
        this.node.runAction(jump);
     },
    start () {
        this.speed = Math.random()*4 + 5;
    },
     update (dt) {
         if(this.game.startGameTap()){
            this.node.y-=0.2;
         }
         if(this.node.y < -960){
             this.node.destroy();
         }
        if(this.right){
            this.node.x +=this.speed;
            if(this.node.x >= 440){
                this.right = false;
                this.left = true;
            }
        }
        if(this.left){
           this.node.x -=this.speed;
           if(this.node.x <= -440){
               this.right = true;
               this.left = false;
           }
        }
     },
});
