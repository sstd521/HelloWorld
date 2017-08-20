var InputPersonalInfo = VerifyID.extend({
    _name: null,
    _id: null,
    _verifyRight: null,

    ctor: function (paraObject) {
        this._super(paraObject);
        this.addTouchEvent();
        this.addInputBox();
    },

    onEnter: function () {
        this._super();
    },

    addTouchEvent: function () {
        this._touch_listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.touchBegin,
        });
        cc.eventManager.addListener(this._touch_listener, this);
    },

    touchBegin: function (touch, event) {
        return true;
    },

    addInputBox: function () {
        var inputBoxName = new cc.EditBox(cc.size(526, 80), new cc.Scale9Sprite("res/input_bg_3.png"));
        inputBoxName.setName("inputBoxName");
        this.setPropertis(inputBoxName);

        var inputBoxID = new cc.EditBox(cc.size(526, 80), new cc.Scale9Sprite("res/input_bg_3.png"));
        this.setPropertis(inputBoxID);

        this._name = inputBoxName;
        this._id = inputBoxID;

        this._confirmBtn.addTouchEventListener(this.eventTouch.bind(this), this);
    },

    setPropertis: function (inputBox) {
        var placeHolder = "请输入身份证号";
        var inputMode = cc.EDITBOX_INPUT_MODE_NUMERIC;
        var maxLength = 18;
        var positionY = 56;
        if (inputBox.getName() === "inputBoxName") {
            placeHolder = "请输入真实姓名";
            inputMode = cc.EDITBOX_INPUT_MODE_SINGLELINE;
            maxLength = 20;
            positionY = 155;
        }
        inputBox.setPlaceHolder(placeHolder);
        inputBox.setInputMode(inputMode);
        inputBox.setFontColor(cc.color(63, 65, 110));
        inputBox.setPlaceholderFontColor(cc.color(63, 65, 110));
        inputBox.setFont("Thonburi", 32);
        inputBox.setPlaceholderFont("Thonburi", 32);
        inputBox.setPosition(this._innerBg.getContentSize().width / 2, positionY);
        inputBox.setMaxLength(maxLength);
        inputBox.setReturnType(cc.KEYBOARD_RETURNTYPE_SEND);
        inputBox.setDelegate(this);
        this._innerBg.addChild(inputBox);
    },

    editBoxEditingDidBegin: function (sender) {
    },

    editBoxEditingDidEnd: function (sender) {
    },

    editBoxTextChanged: function (sender, text) {
    },

    editBoxReturn: function (sender) {
        this.verifyAuto(sender);
    },

    verifyAuto: function (sender) {
        if (sender.getName() === "inputBoxName")
            this.matchName(sender.getString());
        else
            this.matchID(sender.getString());
    },

    verifyConfirm: function (name, id) {
        if (this.matchName(name)) {
            if (this.matchID(id)) {
                this.addDialog("您的身份验证正确，谢谢！");
                this._verifyRight = true;
            }
        }
    },

    addDialog: function (contents) {
        var dialog = new VerifyID({title: "提示", content: contents, isOneBtn: true, hasInnerBg: true});
        this.addChild(dialog);
    },

    matchName: function (name) {
        // if(name === host.name){
        //     this.addDialog("您的姓名与他人同名，请重新输入!");
        //     return;
        // }

        // var reg = /^[a-zA-Z\d]\w{2,19}[a-zA-Z\d$]/;     //正则
        // if (reg.test(name))
        // if (backValue === "验证通过!")
        //     return true;
        // else {
        //     // this.addDialog("您的姓名输入错误，请重新输入！");
        //     return false;
        // }
        var backValue = this.testName(name);
        return this.test(backValue);
    },

    matchID: function (id) {
        // var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        // if (reg.test(id))
        //     return true;
        // else {
        //     this.addDialog("您的身份证号输入错误，请重新输入！");
        //     return false;
        // }
        var backValue = this.testID(id);
        return this.test(backValue);
    },

    test:function (content) {
        if (content === "验证通过!")
            return true;
        else {
            cc.log("backValue = "+ content);
            // this.addDialog("您的姓名输入错误，请重新输入！");
            this.addDialog(content);
            return false;
        }
    },

    testName: function (name) {
        if (name === "")
            return "姓名不能为空！";
        if (name.length <= 3)
            return "姓名长度不少于4位！";
        var reg = /^[a-zA-Z\d]\w{2,19}[a-zA-Z\d$]/;     //正则
        if (reg.test(name))
            return "验证通过!";
        else
            return "您的姓名输入错误，请重新输入！";
    },

    testID: function (id) {
        var Errors = new Array("验证通过!", "身份证号码位数不对，请重新输入!!", "身份证号码出生日期超出范围或含有非法字符，请重新输入!!", "身份证号码校验错误，请重新输入!", "身份证地区非法，请重新输入!", "身份证号码不能为空!");
        var area = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        var id, Y, JYM;
        var S, M;
        var reg = /^1[1]+1$/;
        var id_array = new Array();
        id_array = id.split("");
        if (id === "") {
            return Errors[5];
        }
        if (area[parseInt(id.substr(0, 2))] == null)
            return Errors[4];
        if (reg.test(id))
            return Errors[3];
        switch (id.length) {
            case 15:
                if ((parseInt(id.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(id.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(id.substr(6, 2)) + 1900) % 4 == 0 )) {
                    reg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
                }
                else {
                    reg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
                }
                if (reg.test(id))
                    return Errors[0];
                else
                    return Errors[2];
                break;
            case 18:
                if (parseInt(id.substr(6, 4)) % 4 == 0 || ( parseInt(id.substr(6, 4)) % 100 == 0 && parseInt(id.substr(6, 4)) % 4 == 0 )) {
                    reg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
                }
                else {
                    reg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
                }
                if (reg.test(id)) {
                    S = (parseInt(id_array[0]) + parseInt(id_array[10])) * 7 + (parseInt(id_array[1]) + parseInt(id_array[11])) * 9 + (parseInt(id_array[2]) + parseInt(id_array[12])) * 10 + (parseInt(id_array[3]) + parseInt(id_array[13])) * 5 + (parseInt(id_array[4]) + parseInt(id_array[14])) * 8 + (parseInt(id_array[5]) + parseInt(id_array[15])) * 4 + (parseInt(id_array[6]) + parseInt(id_array[16])) * 2 + parseInt(id_array[7]) * 1 + parseInt(id_array[8]) * 6 + parseInt(id_array[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y, 1);
                    if (M == id_array[17])
                        return Errors[0];
                    else
                        return Errors[3];
                }
                else
                    return Errors[2];
                break;
            default:
                return Errors[1];
                break;
        }
    },

    eventTouch: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.setScale(0.9);
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(1);
                this.verifyConfirm(this._name.getString(), this._id.getString());
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(1);
                break;
            default:
                break;
        }
    },

    removeThisNode: function () {
        this.removeFromParent();
    }
});

InputPersonalInfo.show = function (paraObject) {
    if (cc.director.getRunningScene().getChildByName("InputPersonalInfo"))
        return cc.director.getRunningScene().getChildByName("InputPersonalInfo");
    var layer = new InputPersonalInfo(paraObject);
    layer.setName("InputPersonalInfo");
    // KFGJ.DialogShowMgr.addDialog(layer, KFGJ.DialogLv.Lv_4);
    cc.director.getRunningScene().addChild(layer);
    return layer;
};