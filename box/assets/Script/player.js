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
       collided : 0,
       audioPlayerJump : {
        default : null,
        url : cc.AudioClip
    },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        cc.director.getCollisionManager().enabled =true;
     },
     onCollisionEnter(){
        this.collided = 450;
     },
     onCollisionExit(){
         this.collided = 0;
    },
    jump : function(){
        if(this.collided == 450){
            cc.audioEngine.play(this.audioPlayerJump ,false ,0.7);
        }
        var jump = cc.moveBy(0.2,new cc.Vec2(0,this.collided)).easing(cc.easeCircleActionOut());
        this.node.runAction(jump);
    },
    start () {
        this.node.y-=0.2;
    },

     update (dt) {},
});
