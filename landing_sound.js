//
//  (landing_sound.js)
//

class LandingSoundSystem {

    constructor(ctx) {
        this.ctx = ctx;
    }

    //------------------------------------------------
    // White Noise Generator
    //------------------------------------------------
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

    //------------------------------------------------
    // Tire Chirp
    //------------------------------------------------
    playTireChirp(vspeed, gspeed) {
        const impact =
            Math.min(
                1.0,
                Math.abs(vspeed)/1000);

        const speed =
            Math.min(
                1.0,
                gspeed/160);

        const gainLevel =
            impact*speed;

        const source =
            this.ctx.createBufferSource();

        source.buffer =
            this.createNoiseBuffer(1.0);

        const filter =
            this.ctx.createBiquadFilter();

        filter.type =
            "bandpass";

        filter.frequency.value =
            1800;

        filter.Q.value = 4;

        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            gainLevel,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime+0.7);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        source.start();
        source.stop(
            this.ctx.currentTime+1.0);
    }

    //------------------------------------------------
    // Spoiler Deploy
    //------------------------------------------------
    playSpoiler() {
        const source =
            this.ctx.createBufferSource();

        source.buffer =
            this.createNoiseBuffer(0.3);

        const filter =
            this.ctx.createBiquadFilter();

        filter.type =
            "highpass";

        filter.frequency.value =
            1200;

        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            0.4,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime+0.2);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        source.start();
        source.stop(
            this.ctx.currentTime+0.3);
    }

    //------------------------------------------------
    // Reverse Engagement
    //------------------------------------------------
    playReverseDeploy() {
        const osc =
            this.ctx.createOscillator();

        const gain =
            this.ctx.createGain();

        osc.type =
            "sawtooth";

        osc.frequency.setValueAtTime(
            80,
            this.ctx.currentTime);

        osc.frequency.exponentialRampToValueAtTime(
            250,
            this.ctx.currentTime+0.4);

        gain.gain.setValueAtTime(
            0.25,
            this.ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime+0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(
            this.ctx.currentTime+0.5);
    }

    //------------------------------------------------
    // Landing Sequence
    //------------------------------------------------

    playLanding(vspeed, gspeed) {
        //
        // 左主脚
        //

        this.playTireChirp(
            vspeed,
            gspeed);

        //
        // 右主脚
        //

        setTimeout(
            ()=>{
                this.playTireChirp(
                    vspeed*0.95,
                    gspeed);
            },
            50);

        //
        // Spoiler
        //

        setTimeout(
            ()=>{
                this.playSpoiler();
            },
            120);

        //
        // Reverse
        //

        setTimeout(
            ()=>{
                this.playReverseDeploy();
            },
            300);
    }
}
