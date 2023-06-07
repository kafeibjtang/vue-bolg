export default class Effects {
    constructor(e) {
        this.a_idx = Math.floor((Math.random() * 26));
        this.color1 = Math.floor((Math.random() * 255));
        this.color2 = Math.floor((Math.random() * 255));
        this.color3 = Math.floor((Math.random() * 255));
        this.arr = ["乐观", "❤", "积极", "向上", "自由", "正能量", "❤", "(*^▽^*)", "元气满满", "开心", "❤", "快乐",
            "善良", "可爱", "暴富", "暴瘦", "❤", "富强", "民主", "文明", "❤", "和谐", "自由", "平等",
            "公正", "法治", "❤", "爱国", "敬业", "诚信", "友善"
        ]
        this.$i = $("<span />").text(this.arr[this.a_idx]);
        this.a_idx = (this.a_idx + 1) % this.arr.length;
        this.x = e.pageX;
        this.y = e.pageY;
        this.$i.css({
            "z-index": 9999999999999,
            "top": this.y - 20,
            "left": this.x,
            "position": "absolute",
            "font-family": "mmm",
            "fontSize": Math.floor((Math.random() * 10) + 15),
            "font-weight": "bold",
            "color": "rgb(" + this.color1 + "," + this.color2 + "," + this.color3 + ")",
            "-webkit-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
        });
        $("body").append(this.$i);
        this.$i.animate({
                "top": this.y - 200,
                "opacity": 0
            },
            1000,
            () => {
                this.$i.remove();
            });
    }
}