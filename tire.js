//
// (tire.js)
//

class TireSkidSound {
    constructor(ctx) {
        this.ctx = ctx;
    }

    play(verticalSpeed, groundSpeed) {
        //
        // 接地強さ
        //
        const impact =
            Math.min(
                1.0,
                Math.abs(verticalSpeed) / 800
            );

        //
        // 速度依存
        //
        const speedFactor =
            Math.min(
                1.0,
                groundSpeed / 150
            );

        const gainValue =
            0.8 *
            impact *
            speedFactor;

        //----------------------------------
        // White Noise
        //----------------------------------
        const length =
            this.ctx.sampleRate;

        const buffer =
            this.ctx.createBuffer(
                1,
                length,
                this.ctx.sampleRate
            );

        const data =
            buffer.getChannelData(0);

        for(let i=0;i<length;i++)
        {
            data[i] =
                (Math.random()*2-1);
        }

        const source =
            this.ctx.createBufferSource();

        source.buffer = buffer;

        //----------------------------------
        // Bandpass
        //----------------------------------
        const filter =
            this.ctx.createBiquadFilter();

        filter.type =
            "bandpass";

        filter.frequency.value =
            1800;

        filter.Q.value =
            2;

        //----------------------------------
        // Gain Envelope
        //----------------------------------
        const gain =
            this.ctx.createGain();

        gain.gain.setValueAtTime(
            gainValue,
            this.ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime + 0.8
        );

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        source.start();

        source.stop(
            this.ctx.currentTime + 1.0
        );
    }
}
