var VerifyID = cc.Layer.extend({
    _contentMsg: null,   //内容
    _bg: null,
    _innerBg: null,
    _titleBg: null,
    _title: null,
    _confirmBtn: null,
    _cancelBtn: null,
    _click: null,

    ctor: function (paraObject) {
        this._super();
        this.addTouchEvent();
        this.init(paraObject);
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
        if (this._touch_listener) {
            cc.eventManager.removeListener(this._touch_listener);
            this._touch_listener = null;
        }
    },

    init: function (paraObject) {
        this.addBgLayer(); // 添加底层黑幕
        this.addImageBg();
        this.addInnerBg(paraObject.hasInnerBg);
        this.addTitleBg();
        this.addTitle(paraObject.title);
        this.addContent(paraObject.content);
        this.setOneBtn(paraObject.isOneBtn);
    },

    addTouchEvent: function () {
        this._touch_listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.touchBegin,
            // onTouchEnded: this.touchEnded
        });
        cc.eventManager.addListener(this._touch_listener, this);
    },

    touchBegin: function (touch, event) {
        return true;
    },

    addBgLayer: function () {
        var layer = new cc.LayerColor(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height);
        layer.setPosition(cc.p(0, 0));
        this.addChild(layer, -1);
    },

    addImageBg: function () {
        // var bg = new cc.Scale9Sprite("res/Zhongma_1/pop_bg.png", cc.rect(0, 0, 588, 588), cc.rect(100, 44, 388, 500));
        var bg = new cc.Scale9Sprite("res/Zhongma_1/pop_bg.png", cc.rect(0, 0, 588, 588), cc.rect(50, 99, 488, 400));
        bg.setPreferredSize(cc.size(622, 418));
        bg.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        this.addChild(bg);
        this._bg = bg;
    },

    addInnerBg: function (hasInnerBg) {
        var innerBg = new cc.Scale9Sprite("res/Zhongma_1/pop_bg_2.png");
        var bgSize = cc.size(this._bg.getContentSize().width - 68, this._bg.getContentSize().height - 208);
        if (this._bg !== null) {
            this._bg.addChild(innerBg);
            // var bgSize = this._bg.getContentSize();
            innerBg.setPosition(this._bg.getContentSize().width / 2, this._bg.getContentSize().height / 2 + 22);
        }
        else {
            this.addChild(innerBg);
            // var bgSize = cc.size(622, 641);
        }
        var scale9Size = new cc.Sprite("res/Zhongma_1/pop_bg_2.png").getContentSize();
        innerBg.setCapInsets(cc.rect(scale9Size.width / 2, scale9Size.height / 2, 1, 1));
        // _innerBg.setPreferredSize(cc.size(bgSize.width * 0.95, bgSize.height * 0.92));
        innerBg.setPreferredSize(bgSize);
        this._innerBg = innerBg;
        if (!hasInnerBg) {
            this.setInnerBgNotVisible();
        }
    },

    addTitleBg: function () {
        var titleBg = new cc.Sprite("res/qinyou_pop_bg_title.png");
        // titleBg.setPosition(this._bg.getContentSize().width / 2, (this._bg.getContentSize().height + this._innerBg.getContentSize().height / 2 + this._innerBg.getPositionY()) / 2 - 21);
        titleBg.setPosition(this._bg.getContentSize().width / 2, this._bg.getContentSize().height - 62);
        this._bg.addChild(titleBg);
        this._titleBg = titleBg;
    },

    addTitle: function (titleStr) {
        var title = new cc.LabelTTF(titleStr, "", 30);
        title.setColor(cc.color(251, 238, 82));
        title.setPosition(this._titleBg.getContentSize().width / 2, this._titleBg.getContentSize().height / 2 + 13);
        this._titleBg.addChild(title);
    },

    addContent: function (contentStr) {
        if (contentStr === undefined || contentStr === "" || contentStr === null) {
            return;
        }
        this._contentMsg = new cc.LabelTTF(contentStr, "", 30, cc.size(this._innerBg.getContentSize().width * 0.8, 0));
        this._contentMsg.setColor(cc.color(188, 193, 255));
        this._contentMsg.setPosition(this._innerBg.getContentSize().width / 2, this._innerBg.getContentSize().height / 2);
        this._innerBg.addChild(this._contentMsg);
    },

    addConfirmBtn: function () {
        var confirmBtn = new ccui.Button("res/december_btn_cyan.png");
        confirmBtn.setZoomScale(0);
        confirmBtn.setPosition(this._bg.getContentSize().width / 2 + 10 + confirmBtn.getContentSize().width / 2, 71);
        confirmBtn.setName("confirmBtn");
        confirmBtn.addTouchEventListener(this.eventTouch.bind(this), this);
        this._confirmBtn = confirmBtn;
        this.addLabel(this._confirmBtn);
        this._bg.addChild(this._confirmBtn, 2);
    },

    addCancelBtn: function () {
        var cancelBtn = new ccui.Button("res/december_btn_cyan2.png");
        cancelBtn.setPosition(this._bg.getContentSize().width / 2 - 10 - cancelBtn.getContentSize().width / 2, 71);
        cancelBtn.addTouchEventListener(this.eventTouch.bind(this), this);
        this._cancelBtn = cancelBtn;
        this.addLabel(this._cancelBtn);
        this._bg.addChild(this._cancelBtn, 2);
    },

    addLabel: function (sender) {
        var str = "";
        var font = "";
        if (sender.getName() === "confirmBtn") {
            str = "确定";
            font = "res/btn_gold.fnt";
        }
        else {
            str = "取消";
            font = "res/btn_purple.fnt";
        }
        var label = new cc.LabelBMFont(str, font);
        label.setPosition(sender.getContentSize().width / 2, sender.getContentSize().height / 2);
        sender.addChild(label);
    },

    setOneBtn: function (isOnebtn) {
        this.addConfirmBtn();
        if (isOnebtn)
            this._confirmBtn.setPositionX(this._bg.getContentSize().width / 2);
        else
            this.addCancelBtn();

    },

    setInnerBgNotVisible: function () {
        // this._innerBg.setVisible(false);
        this._innerBg.setOpacity(0);
    },

    eventTouch: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.setScale(0.9);
                break;
            case ccui.Widget.TOUCH_ENDED:
                // KFGJ.AudioManager.getInstance().playClick();
                sender.setScale(1);
                if (sender === this._confirmBtn) {
                    cc.log("confirm button is clicked");
                    var inputPersonalInfo = InputPersonalInfo.show({
                        title: "实名认证",
                        content: "",
                        isOneBtn: true,
                        hasInnerBg: false
                    });
                    if (inputPersonalInfo._verifyRight)
                        inputPersonalInfo.removeThisNode();
                    this.removeSelf();
                }
                else if (sender == this._cancelBtn) {
                    cc.log("cancel button is clicked");
                    this.removeSelf();
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(1);
                break;
            default:
                break;
        }

    },

    removeSelf: function () {
        this.removeFromParent();
    }
});

// TiemerLayer.show = function (paraObject) {
//     if (cc.director.getRunningScene().getChildByName("TiemerLayer"))
//         return cc.director.getRunningScene().getChildByName("TiemerLayer");
//     var layer = new TiemerLayer(paraObject);
//     layer.setName("TiemerLayer");
//     // KFGJ.DialogShowMgr.addDialog(layer, KFGJ.DialogLv.Lv_4);
//     cc.director.getRunningScene().addChild(layer);
//     return layer;
// };
