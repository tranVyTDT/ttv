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
      
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log(this.node.y);
        //this.node.active = false;
    },
    theBest : function () {
        this.node.active = true;

        cc.log(" be called" + this.node.y);
    },
    notTheBest : function () {
        this.node.active = false;
    },
    // update (dt) {},
});
