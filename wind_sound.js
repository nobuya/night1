//
// (wind_sound.js)
//

class WindSound {
    constructor(ctx, destination) {
        this.ctx = ctx;

        this.airspeed = 0;
        this.flaps = 0;
        this.gearDown = false;

        //
        // White Noise
        //
        const length =
            ctx.sampleRate * 2;

        const buffer =
            ctx.createBuffer(
                1,
                length,
                ctx.sampleRate);

        const data =
            buffer.getChannelData(0);

        for (let i = 0; i < length; i++) {
            data[i] =
                Math.random()*2-1;
        }

        this.source =
            ctx.createBufferSource();

        this.source.buffer =
            buffer;

        this.source.loop =
            true;

        //
        // Filter
        //
        this.filter =
            ctx.createBiquadFilter();

        //this.filter.type = "bandpass";
        this.filter.type = "lowpass";

        //
        // Gain
        //
        this.gain =
            ctx.createGain();

        this.gain.gain.value = 0;

        this.source.connect(
            this.filter);

        this.filter.connect(
            this.gain);

        this.gain.connect(
            destination);

        this.source.start();
    }

    setAirspeed(knots) {
        this.airspeed = knots;
    }

    //  position   factor    ratio
    // ---------- -------- --------
    //     0        1.00     0.000
    //     1        1.03     0.034
    //     5        1.15     0.167
    //    15        1.45     0.500
    //    30        1.90     1.000
    setFlaps(ratio) {
        this.flaps = ratio; // 0.0 - 1.0
    }

    // state = true  ... gear down
    // state = false ... gear up
    setGearDown(state) {
        this.gearDown = state;
    }

    update() {
        //
        // 基本風量
        //
        let speedFactor =
            Math.min(
                1.0,
                this.airspeed / 250);

        //
        // フラップ補正
        //
        //let flapFactor = 1.0 + this.flaps * 0.03;
        //let flapFactor = 1.0 + this.flaps * 0.90;
        let flapFactor = 1.0 + this.flaps; // 1.0 - 2.0

        //
        // ギア補正
        //
        let gearFactor =
            this.gearDown
            ? 1.6
            : 1.0;

        //
        // 総合音量
        //
        let level = speedFactor * speedFactor * flapFactor * gearFactor;

        this.gain.gain
            .setTargetAtTime(
                level * 0.12,
                this.ctx.currentTime,
                0.2);

        //
        // スペクトラム変化
        //
        //let freq = 500 + speedFactor * 3500;
        let freq = 1500 + speedFactor * 2000;

        this.filter.frequency
            .setTargetAtTime(
                freq,
                this.ctx.currentTime,
                0.2);
    }
}
// End of file (wind_sound.js) */
