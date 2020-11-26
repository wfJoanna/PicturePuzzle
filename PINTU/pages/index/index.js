//index1.js
//获取应用实例
const app = getApp();

Page({
    data: {
        num: [1, 2, 3, 4, 5, 6, 7, 8, 9],  //初始化前的数组
        hidden: true,   //隐藏空白格中的数字
        success: '',  //成功与否
        time: 0,   //时间
        t: '',   //定时器要用的一个变量
        step: 0   //步数
    },
    onLoad: function () {

    },
    //随机打乱数组
    sortArr: function (arr) {
        return arr.sort(function () {
            return Math.random() - 0.5
        })
    },

    Move: function (e) {
        var index = e.currentTarget.dataset.index;
        var item = e.currentTarget.dataset.item;

        if (this.data.num[index + 3] === 9) {
            this.down(e);
        }
        if (this.data.num[index - 3] === 9) {
            this.up(e);
        }
        if (this.data.num[index + 1] === 9 && index !== 2 && index !== 5) {
            this.right(e);
        }
        if (this.data.num[index - 1] === 9 && index !== 3 && index !== 6) {
            this.left(e);
        }
        var stepper = this.data.step;
        stepper++;
        this.setData({
            step: stepper
        });
    },
    up: function (e) {
        var index = e.currentTarget.dataset.index;
        var temp = this.data.num[index];
        this.data.num[index] = this.data.num[index - 3];
        this.data.num[index - 3] = temp;
        this.setData({
            num: this.data.num
        });
        if (this.data.num.toString() === [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
            this.success();
        }
    },
    down: function (e) {
        //index是当前button对应的数组下标
        var index = e.currentTarget.dataset.index;
        //temp是当前button的内容
        var temp = this.data.num[index];

        //然后让这个button和空白button互换位置，即改变数组元素
        this.data.num[index] = this.data.num[index + 3];
        this.data.num[index + 3] = temp;

        this.setData({
            num: this.data.num
        });
        //如果互换后数组元素依次为1，2，3，4，5，6，7，8，9，则表示拼图成功，否则还要继续拼图
        //成功的话，就执行success函数
        if (this.data.num.toString() === [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
            this.success();
        }
    },
    left: function (e) {
        var index = e.currentTarget.dataset.index;
        var temp = this.data.num[index];
        this.data.num[index] = this.data.num[index - 1];
        this.data.num[index - 1] = temp;
        this.setData({
            num: this.data.num
        });
        if (this.data.num.toString() === [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
            this.success();
        }
    },
    right: function (e) {
        var index = e.currentTarget.dataset.index;
        var temp = this.data.num[index];
        this.data.num[index] = this.data.num[index + 1];
        this.data.num[index + 1] = temp;
        this.setData({
            num: this.data.num
        });
        if (this.data.num.toString() === [1, 2, 3, 4, 5, 6, 7, 8, 9].toString()) {
            this.success();
        }
    },

    success: function () {
        var that = this;
        //成功的话，就修改data中的success变量为'you win!'，并显示相关消息框，并重新初始化
        that.setData({
            success: 'you win !'
        });
        wx.showToast({
            title: '你成功了',
            image: "../../icons/happy.png",
            success: function () {
                that.init();
            }
        })
    },
    fail: function () {
        var that = this;
        that.setData({
            success: 'you lost !'
        });
        wx.showToast({
            title: '你失败了',
            image: "../../icons/sad.png"
        })
    },


    init: function () {
        this.setData({
            //首先前面8个元素先打乱，然后再通过concat连接第九个元素9。这就保证了每次开始时，都是第九个button是空白的
            num: this.sortArr([1, 2, 3, 4, 5, 6, 7, 8]).concat([9])
        })
    },
    timeCount: function () {
        var that = this;
        var timer = that.data.time;
        that.setData({
            //通过setInterval设置定时器
            t: setInterval(function () {
                timer++;
                that.setData({
                    time: timer //data里的time通过定时器不断修改
                })
            }, 1000)  //这里设置timeout的意思是按照指定的周期（以毫秒计）来执行注册的回调函数。
            // 这里就是每过1000毫秒，也就是1秒，就执行一次上面的回调函数，time就加1
        })
    },
    timeBegin: function () {
        //首先用clearInterval清除定时器
        clearInterval(this.data.t);
        //time和step设回0
        this.setData({
            time: 0,
            step: 0
        });
        this.timeCount();  //定时器开始
        this.init();   //初始化拼图
    },

    timeStop: function () {
        clearInterval(this.data.t);
        this.fail();

    }
});