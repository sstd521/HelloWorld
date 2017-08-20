var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // /////////////////////////////
        // // 2. add a menu item with "X" image, which is clicked to quit the program
        // //    you may modify it.
        // // ask the window size
        var size = cc.winSize;
        //
        // // add a "close" icon to exit the progress. it's an autorelease object
        // var closeItem = new cc.MenuItemImage(
        //     res.CloseNormal_png,
        //     res.CloseSelected_png,
        //     function () {
        //         cc.log("Menu is clicked!");
        //     }, this);
        // closeItem.attr({
        //     x: size.width - 20,
        //     y: 20,
        //     anchorX: 0.5,
        //     anchorY: 0.5
        // });
        //
        // var menu = new cc.Menu(closeItem);
        // menu.x = 0;
        // menu.y = 0;
        // this.addChild(menu, 1);
        //
        // /////////////////////////////
        // // 3. add your codes below...
        // // add a label shows "Hello World"
        // // create and initialize a label
        // var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // // position the label on the center of the screen
        // helloLabel.x = size.width / 2;
        // helloLabel.y = 0;
        // // add the label as a child to this layer
        // this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1,
            // rotation: 180
        });
        this.addChild(this.sprite, 0);

        // this.sprite.runAction(
        //     cc.sequence(
        //         cc.rotateTo(2, 0),
        //         cc.scaleTo(2, 1, 1)
        //     )
        // );
        // helloLabel.runAction(
        //     cc.spawn(
        //         cc.moveBy(2.5, cc.p(0, size.height - 40)),
        //         cc.tintTo(2.5,255,125,0)
        //     )
        // );
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        // var layer = new TiemerLayer();
        var layer1 = new VerifyID({title: "实名认证", content: "请输入真实姓名", isOneBtn: true, hasInnerBg: false});
        var layer2 = new VerifyID({title: "提示", content: "身份证号码输入错误，请重新输入！", isOneBtn: true, hasInnerBg: true});
        // var layer3 = new InputPersonalInfo({title:"实名认证",content:"",isOneBtn:true,hasInnerBg:false});
        // this.addChild(layer1);
        // this.addChild(layer2);
        // this.addChild(layer3);
        // TiemerLayer();
        InputPersonalInfo.show({title: "实名认证", content: "", isOneBtn: true, hasInnerBg: false});
    }
});

var TiemerLayer = cc.Layer.extend({
    _imgBg: null,
    _innerBg: null,
    _titleBg: null,
    _title: null,
    _innerTitle: null,
    _titleZhongmaNum: null, // 中马为多少匹
    _MaPai: null, // 马牌

    ctor: function () {
        this._super();
        this.init(8, 4)
        // this.addSome();
    },
    addSome: function () {
        var maPai = this.createZhengmianBg();
        this.addChild(maPai);
        // var mj_bg_zhen_mian = maPai.getChildByName("zhengmianBg");
        // this._imgBg.addChild(mj_bg_zhen_mian, 10);

    },
    init: function (n, m) {
        this.addBg();
        this.addImgBg(n);
        this.addInnerBg(n);
        this.addTitleBg();
        this.addTitile(m);
        this.addInnerTitle("我");
        // this.createMaPai(); // 制作马牌
        this.addMaPai(n); // 添加马牌
    },
    addBg: function () {
        //添加底层黑幕
        var layer = new cc.LayerColor(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height);
        layer.setPosition(cc.p(0, 0));
        this.addChild(layer, -1);
    },
    addImgBg: function (n) {

        var imgBg = new ccui.ImageView("res/Zhongma_1/pop_bg.png");
        imgBg.setScale9Enabled(true);
        imgBg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        imgBg.setAnchorPoint(0.5, 0.5);
        imgBg.setCapInsets(cc.rect(50, 99, 488, 400));
        if (n <= 6) {

            // imgBg.setContentSize(cc.size(173 + 36 * (n - 1) + 76 * n, 314));
            // imgBg.setContentSize(cc.size(614, 350));
            imgBg.setContentSize(cc.size(284 + 111 * (n - 1), 348));
        }
        else
            imgBg.setContentSize(cc.size(284 + 111 * (6 - 1), 495));

        this._imgBg = imgBg;
        this.addChild(this._imgBg);

        // if (n <= 1) {
        //     this._imgBg.setSize(cc.size(280, 300));
        // }
        // else if (1 < n && n <= 6) {
        //     this._imgBg.setSize(cc.size((n - 2) * 110 + 280, 300));
        //     // line  = 6;
        //     // lineY = 0;
        // }
        // else if (6 < n && n <= 8) {
        //     this._imgBg.setSize(cc.size(2 * 110 + 280, 300 + Math.floor((n - 1) / 5) * 140));
        //     // line = 4;
        // }
        // else if (8 < n && n <= 10) {
        //     this._imgBg.setSize(cc.size(3 * 110 + 280, 300 + Math.floor((n - 1) / 5) * 140));
        //     // line = 5;
        // }

    },

    addInnerBg: function (n) {
        var innerBg = new ccui.ImageView("res/Zhongma_1/pop_bg_2.png");
        innerBg.setScale9Enabled(true);
        innerBg.setAnchorPoint(0.5, 0.5);
        innerBg.setPosition(this._imgBg.getContentSize().width / 2, (this._imgBg.getContentSize().height - 76) / 2 + 5);
        innerBg.setCapInsets(cc.rect(25, 25, 1, 1));
        // innerBg.setContentSize(36 * (n - 1) + 76 * n + 74 * 2, 226);
        innerBg.setContentSize(this._imgBg.getContentSize().width - 60, this._imgBg.getContentSize().height - 123);
        this._innerBg = innerBg;
        this._imgBg.addChild(this._innerBg);
    },

    addTitleBg: function () {
        var titleBg = new cc.Sprite("res/Zhongma_1/zhongma_bg.png");
        titleBg.setScale(this._innerBg.getContentSize().width / 560, 1);
        // titleBg.setContentSize(this._innerBg.getContentSize().width*0.8,titleBg.getContentSize().height);
        // titleBg.width = this._innerBg.getContentSize().width /2;
        titleBg.setAnchorPoint(0.5, 0.5);
        titleBg.setPosition(this._imgBg.getContentSize().width / 2, this._imgBg.getContentSize().height - 55);
        this._titleBg = titleBg;
        this._imgBg.addChild(this._titleBg);
    },

    addTitile: function (num) {
        var title = new ccui.RichText();
        title.ignoreContentAdaptWithSize(true);
        title.setPosition(this._imgBg.getContentSize().width / 2, this._imgBg.getContentSize().height - 58);
        var titleZhongma = new cc.LabelBMFont("中 马 ", "res/Zhongma_1/zhongma.fnt");
        var titleZhongmaNum = new cc.LabelBMFont("" + num, "res/Zhongma_1/zhongma_num.fnt");
        var titlePi = new cc.LabelBMFont(" 匹", "res/Zhongma_1/zhongma.fnt");
        var ti = new cc.LabelBMFont("99", "res/Zhongma_1/zhongma.fnt");
        var text1 = new ccui.RichElementCustomNode(1, cc.color.WHITE, 255, titleZhongma);
        var text2 = new ccui.RichElementCustomNode(2, cc.color.WHITE, 255, titleZhongmaNum);
        var text3 = new ccui.RichElementCustomNode(3, cc.color.WHITE, 255, titlePi);
        var text4 = new ccui.RichElementCustomNode(3, cc.color.WHITE, 255, ti);
        title.pushBackElement(text1);
        title.pushBackElement(text2);
        title.pushBackElement(text3);
        this._titleZhongmaNum = titleZhongmaNum;
        this._title = title;
        this._imgBg.addChild(this._title);
        // cc.log("title[2]"+title._richElements[2]);
        title.removeElement(text2);
        title.insertElement(text4, 1);
        this.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            title[2] = "100";
            // title.insertElement(text4,2);
        })));

    },

    addInnerTitle: function (name) {
        var innerTitle = new cc.LabelTTF(name + "正在摸马", "", 22);
        innerTitle.setColor(cc.color(255, 204, 0));
        innerTitle.setAnchorPoint(0.5, 0);
        innerTitle.setPosition(this._innerBg.getContentSize().width / 2, this._innerBg.getContentSize().height - 45);
        this._innerTitle = innerTitle;
        this._innerBg.addChild(this._innerTitle)
    },

    createMaPai: function () {
        var shineBg = this.createShineBg();
        var zhengmianBg = this.createZhengmianBg();

        var pai = cc.Sprite();

        zhengmianBg.setPosition(shineBg.getPosition());
        pai.addChild(shineBg);
        pai.addChild(zhengmianBg);
        return pai;
    },
    createShineBg: function () {
        var shineBg = cc.Sprite("res/Zhongma_1/zhongma_bg_2.png"); // 发光背景
        shineBg.setAnchorPoint(0.5, 0.5);
        shineBg.setScale(0.98);
        shineBg.setName("shineBg");
        // shineBg.setPosition(this._innerBg.getContentSize().width / 2, this._innerTitle.getPosition().y/2);
        return shineBg;
    },
    createZhengmianBg: function () {
        var zhengmianBg = cc.Sprite("res/Zhongma_1/zhengmian_1.png");
        zhengmianBg.setAnchorPoint(0.5, 0.5);
        zhengmianBg.setScale(0.84);
        zhengmianBg.setName("zhengmianBg");
        // zhengmianBg.setPosition(this._innerBg.getContentSize().width / 2, this._innerTitle.getPosition().y/2);

        var paiSprite = cc.Sprite("res/Zhongma_1/zhengmian_tiao_1.png");
        paiSprite.setAnchorPoint(0.5, 0.5);
        paiSprite.setPosition(zhengmianBg.getContentSize().width / 2, zhengmianBg.getContentSize().height / 2);
        paiSprite.setName("paiSprite");

        zhengmianBg.addChild(paiSprite);
        return zhengmianBg;
    },
    addMaPai: function (n) {
        if (n <= 6)
            this.addPai(n);
        else
            this.addMorePai(n - 6);
    },

    addPai: function (n) {
        for (var i = 0; i < n; i++) {
            var pai = this.createMaPai();
            this._innerBg.addChild(pai);
            pai.setPosition(112 + 111 * i, this._innerTitle.getPosition().y - 88);
        }
    },

    addMorePai: function (n) {
        this.addPai(6);
        for (var i = 0; i < n; i++) {
            var pai = this.createMaPai();
            this._innerBg.addChild(pai);
            pai.setPosition(112 + 111 * i, 92);
        }
    }
});

