//
// (flap_sound.js)
//

class FlapSound {
    constructor(ctx, destination) {
        this.ctx = ctx;
        this.destination = destination;

        this.flapRatio = 0.0;

        //------------------------------------
        // Hydraulic pump (continuous)
        //------------------------------------
        this.pump =
            ctx.createOscillator();

        this.pump.type =
            "sawtooth";

        this.pump.frequency.value =
            95;

        this.pumpGain =
            ctx.createGain();

        this.pumpGain.gain.value =
            0;

        this.pump.connect(
            this.pumpGain);

        this.pumpGain.connect(
            destination);

        this.pump.start();

        //------------------------------------
        // Wind noise
        //------------------------------------
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
                Math.random()* 2 - 1;
        }

        this.wind =
            ctx.createBufferSource();

        this.wind.buffer =
            buffer;

        this.wind.loop =
            true;

        this.windFilter =
            ctx.createBiquadFilter();

        this.windFilter.type =
            "bandpass";

        this.windGain =
            ctx.createGain();

        this.windGain.gain.value =
            0;

        this.wind.connect(
            this.windFilter);

        this.windFilter.connect(
            this.windGain);

        this.windGain.connect(
            destination);

        this.wind.start();
    }

    //------------------------------------
    // White Noise
    //------------------------------------
    createNoise(seconds) {
        const buffer =
            this.ctx.createBuffer(
                1,
                this.ctx.sampleRate *
                seconds,
                this.ctx.sampleRate);

        const data =
            buffer.getChannelData(0);

        for(let i=0;i<data.length;i++)
        {
            data[i] =
                Math.random()*2-1;
        }

        return buffer;
    }

    //------------------------------------
    // Slat
    //------------------------------------
    playSlat() {
        const source =
            this.ctx.createBufferSource();

        source.buffer =
            this.createNoise(1.0);

        const filter =
            this.ctx.createBiquadFilter();

        filter.type =
            "bandpass";

        filter.frequency.value =
            1400;

        const gain =
            this.ctx.createGain();

        gain.gain.value =
            0.08;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(
            this.destination);

        source.start();

        source.stop(
            this.ctx.currentTime+1.0);
    }

    //------------------------------------
    // Flap motor
    //------------------------------------
    playFlapMotor(seconds) {
        const osc =
            this.ctx.createOscillator();

        osc.type =
            "sawtooth";

        osc.frequency.setValueAtTime(
            260,
            this.ctx.currentTime);

        osc.frequency.linearRampToValueAtTime(
            180,
            this.ctx.currentTime+
            seconds);

        const gain =
            this.ctx.createGain();

        gain.gain.value =
            0.05;

        osc.connect(gain);
        gain.connect(
            this.destination);

        osc.start();

        osc.stop(
            this.ctx.currentTime+
            seconds);
    }

    //------------------------------------
    // Lock
    //------------------------------------
    playLock() {
        const osc =
            this.ctx.createOscillator();

        osc.type =
            "square";

        osc.frequency.value =
            80;

        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            0.25,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime+0.08);

        osc.connect(gain);
        gain.connect(
            this.destination);

        osc.start();

        osc.stop(
            this.ctx.currentTime+0.1);
    }

    //------------------------------------
    // Flap movement
    //------------------------------------
    moveFlaps(oldRatio,
              newRatio) {
        const delta =
            Math.abs(
                newRatio -
                oldRatio);

        const moveTime =
            delta * 6.0;

        this.playSlat();

        this.playFlapMotor(
            moveTime);

        this.pumpGain.gain
            .setTargetAtTime(
                0.05,
                this.ctx.currentTime,
                0.1);

        setTimeout(
            () => {
                this.playLock();

                this.pumpGain.gain
                    .setTargetAtTime(
                        0,
                        this.ctx.currentTime,
                        0.3);
            },
            moveTime * 1000);

        this.flapRatio =
            newRatio;
    }

    //------------------------------------
    // Continuous wind
    //------------------------------------
    update(airspeed,
           flapRatio) {
        this.windGain.gain
            .setTargetAtTime(
                flapRatio *
                airspeed / 250 *
                0.12,
                this.ctx.currentTime,
                0.2);

        this.windFilter.frequency
            .setTargetAtTime(
                800 +
                flapRatio * 1200,
                this.ctx.currentTime,
                0.2);
    }
}
// End of file (flap_sound.js)
