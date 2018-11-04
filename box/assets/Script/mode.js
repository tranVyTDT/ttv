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
       backRound : {
           default : null,
           type : cc.Node
       },
       modeList : {
        default : [],
        type : cc.SpriteFrame
    },
    },

    // LIFE-CYCLE CALLBACKS:
    touch : function(){
        var self = this;
        this.node.on('touchend',function(){
           var a = true;
           self.t = a;
        });
    },
    changeMode : function(){
        if(this.backRound.color.getR() == 0){
            this.backRound.color = new cc.color(255,255,255);
            this.node.getComponent(cc.Sprite).spriteFrame = this.modeList[0];
        }else{
            this.backRound.color = new cc.color(0,0,0);
            this.node.getComponent(cc.Sprite).spriteFrame = this.modeList[1];
        }
        cc.sys.localStorage.setItem('br',this.backRound.color.getR());
    },
     onLoad () {
         this.touch();
     },

    start () {
        if(cc.sys.localStorage.getItem('br') != null){
            if(cc.sys.localStorage.getItem('br') != this.backRound.color.getR()){
                this.changeMode();
            }
            
        }
    
    },

     update (dt) {
    if(this.t){
        this.changeMode();
        this.t = false;
    }
     },
});
