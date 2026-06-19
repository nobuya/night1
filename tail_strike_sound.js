//
// (tail_straike_sound.js)
//

class TailStrikeSound {
    constructor(ctx, destination) {
        this.ctx = ctx;
        this.destination = destination;
    }

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

    //-----------------------------------
    // Initial Impact
    //-----------------------------------
    playImpact(strength) {
        const osc =
            this.ctx.createOscillator();

        osc.type =
            "square";

        osc.frequency.value =
            60;

        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            0.6 * strength,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime + 0.12);

        osc.connect(gain);
        gain.connect(
            this.destination);

        osc.start();

        osc.stop(
            this.ctx.currentTime + 0.15);
    }

    //-----------------------------------
    // Scraping Sound
    //-----------------------------------
    playScrape(duration, strength) {
        const source =
            this.ctx.createBufferSource();

        source.buffer =
            this.createNoise(duration);

        const filter =
            this.ctx.createBiquadFilter();

        filter.type =
            "bandpass";

        filter.frequency.value =
            1800;

        filter.Q.value =
            2;

        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            0.25 * strength,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime +
            duration);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(
            this.destination);

        source.start();

        source.stop(
            this.ctx.currentTime +
            duration);
    }

    //-----------------------------------
    // Airframe Vibration
    //-----------------------------------
    playVibration(duration) {
        const osc =
            this.ctx.createOscillator();

        osc.type =
            "sawtooth";

        osc.frequency.value =
            25;

        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            0.08,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime +
            duration);

        osc.connect(gain);
        gain.connect(
            this.destination);

        osc.start();

        osc.stop(
            this.ctx.currentTime +
            duration);
    }

    //-----------------------------------
    // Main Sequence
    //-----------------------------------
    play(strength = 1.0) {
        this.playImpact(strength);

        setTimeout(
            () => {
                this.playScrape(
                    1.0,
                    strength);
            },
            80);

        setTimeout(
            () => {
                this.playVibration(
                    2.0);
            },
            100);
    }
}
// End of file (tail_strike_sound.js)

