//
// (landing_gear_sound.js)
//

class LandingGearSound {
    constructor(ctx, destination) {
        this.ctx = ctx;
        this.destination = destination;
    }

    createNoiseBuffer(seconds) {
        const length =
            Math.floor(
                this.ctx.sampleRate *
                seconds);

        const buffer =
            this.ctx.createBuffer(
                1,
                length,
                this.ctx.sampleRate);

        const data =
            buffer.getChannelData(0);

        for(let i=0;i<length;i++)
        {
            data[i] =
                Math.random()*2-1;
        }

        return buffer;
    }

    //------------------------------------
    // 油圧モーター
    //------------------------------------
    playHydraulic(duration) {
        const osc =
            this.ctx.createOscillator();

        osc.type =
            "sawtooth";

        osc.frequency.value =
            110;

        const gain =
            this.ctx.createGain();

        gain.gain.value =
            0.06;

        osc.connect(gain);
        gain.connect(this.destination);

        osc.start();

        osc.stop(
            this.ctx.currentTime +
            duration);
    }

    //------------------------------------
    // ドア音
    //------------------------------------

    playDoor() {
        const osc =
            this.ctx.createOscillator();

        osc.type =
            "square";

        osc.frequency.value =
            70;

        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            0.3,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.destination);

        osc.start();
        osc.stop(
            this.ctx.currentTime + 0.2);
    }

    //------------------------------------
    // ロック音
    //------------------------------------
    playLock() {
        const osc =
            this.ctx.createOscillator();

        osc.type =
            "square";

        osc.frequency.value =
            60;

        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            0.4,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime + 0.12);

        osc.connect(gain);
        gain.connect(this.destination);

        osc.start();
        osc.stop(
            this.ctx.currentTime + 0.15);
    }

    //------------------------------------
    // ギアダウン
    //------------------------------------
    gearDown() {
        //
        // ドア開放
        //
        this.playDoor();

        //
        // 降下
        //
        setTimeout(
            ()=>{
                this.playHydraulic(3.3);
            },
            200);

        //
        // ロック
        //

        setTimeout(
            ()=>{
                this.playLock();
            },
            3500);
    }

    //------------------------------------
    // ギアアップ
    //------------------------------------

    gearUp() {
        //
        // ロック解除
        //

        this.playDoor();

        //
        // 格納
        //

        setTimeout(
            ()=>{
                this.playHydraulic(3.2);
            },
            150);

        //
        // ドア閉鎖
        //

        setTimeout(
            ()=>{
                this.playDoor();
            },
            3300);

        //
        // ロック
        //

        setTimeout(
            ()=>{
                this.playLock();
            },
            3500);
    }
}
// (landing_gear_sound.js)

