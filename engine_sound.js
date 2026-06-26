//
// (engine_sound1.js)
//

class EngineSound {

    constructor(audioContext) {
        this.ctx = audioContext;

        this.throttle = 0;
        this.isReverse = false;
        this.n1 = 0;
        this.n2 = 0;
        this.masterVolume = 0.4;

        this.master = this.ctx.createGain();

        // マスターボリューム
        this.master.gain.value = this.masterVolume;
        //this.master.gain.value = 0.4;
        //this.master.gain.value = 0.8;

        this.master.connect(this.ctx.destination);

        this.createNoise();
        this.createFan();
        this.createCore();
        this.createRumble();

        //let reverbNode = this.createReverb(audioContext);
        //this.master.connect(reverbNode);

//        this.update();
    }

    //
    // シンプルなリバーブ（インパルス応答生成）                                    //     
    createReverb(audioCtx) {
        const duration = 1.5; // 残響時間                                           
        const sampleRate = audioCtx.sampleRate;
        const length = sampleRate * duration;
        const impulse = audioCtx.createBuffer(2, length, sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const data = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                data[i] =
                    (Math.random() * 2 - 1) *
                    Math.pow(1 - i / length, 2);
            }
        }
        const convolver = audioCtx.createConvolver();
        convolver.buffer = impulse;
        return convolver;
    }


    //--------------------------------------------------
    // ピンクノイズ
    //--------------------------------------------------
    createNoise() {
        const length = this.ctx.sampleRate * 2;

        const buffer =
            this.ctx.createBuffer(
                1,
                length,
                this.ctx.sampleRate);

        const data = buffer.getChannelData(0);

        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < length; i++) {
            const white = Math.random() * 2 - 1;

            b0 =  0.99886 * b0 + white * 0.0555179;
            b1 =  0.99332 * b1 + white * 0.0750759;
            b2 =  0.96900 * b2 + white * 0.1538520;
            b3 =  0.86650 * b3 + white * 0.3104856;
            b4 =  0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616  * b5 - white * 0.0168980;

            data[i] = 
                b0 + b1 + b2 + b3 + b4 + b5 + b6 +
                white * 0.5362;

            data[i] *= 0.1;

            b6 = white * 0.115926;
        }

        this.noise = this.ctx.createBufferSource();

        this.noise.buffer = buffer;
        this.noise.loop = true;

        this.noiseFilter = this.ctx.createBiquadFilter();

        this.noiseFilter.type = "bandpass";

        this.noiseGain = this.ctx.createGain();

        this.noise.connect(this.noiseFilter);

        this.noiseFilter.connect(this.noiseGain);

        this.noiseGain.connect(this.master);

        this.noise.start();
    }

    //--------------------------------------------------
    // ファン
    //--------------------------------------------------
    createFan() {
        this.fan = this.ctx.createOscillator();
        this.fan2 = this.ctx.createOscillator();

        this.fan.type = "sawtooth";
        this.fan2.type = "sawtooth";

        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'lowpass';

        this.reverbNode = this.createReverb(this.ctx);

        this.fanGain = this.ctx.createGain();

        this.fanGain.gain.value = 0;

        //this.fan.connect(this.fanGain);
        this.fan.connect(this.filter);
        this.fan2.connect(this.filter);
        this.filter.connect(this.reverbNode);
        this.reverbNode.connect(this.fanGain);
        this.fanGain.connect(this.master);

        this.fan.start();
        this.fan2.start();
    }

    //--------------------------------------------------
    // コア
    //--------------------------------------------------
    createCore() {
        this.core =
            this.ctx.createOscillator();

        this.core.type = "triangle";
        //this.core.type = "sine";

        this.coreGain = this.ctx.createGain();

        this.coreGain.gain.value = 0;

        this.core.connect(this.coreGain);
        this.coreGain.connect(this.master);

        this.core.start();
    }

    //--------------------------------------------------
    // ランブル
    //--------------------------------------------------
    createRumble() {
        this.rumble = this.ctx.createOscillator();

        this.rumble.type = "sine";

        this.rumble.frequency.value = 40;

        this.rumbleGain = this.ctx.createGain();

        this.rumbleGain.gain.value = 0.05;
        //this.rumbleGain.gain.value = 0.15;

        this.rumble.connect(this.rumbleGain);

        this.rumbleGain.connect(this.master);

        this.rumble.start();
    }

    //--------------------------------------------------
    // スロットル設定
    //--------------------------------------------------
    setThrottle(value) {
        //let v = value;
        let v;
        if (value < 0) {
            this.isReverse = true;
            v = -value * 4;
        } else {
            this.isReverse = false;
            v = value;
        }
        this.throttle = Math.max(0, Math.min(1, v));
    }

    mute(to) {
        if (to) {
            this.masterVolume = 0.0;
        } else {
            this.masterVolume = 0.4;
        }
    }

    //--------------------------------------------------
    // 毎フレーム更新
    //--------------------------------------------------
    updateOld() {
        const n1Rate = 0.8;
        const n2Rate = 1.8;
        
//        requestAnimationFrame(
//            () => this.update());

        // マスターボリューム
        this.master.gain.value = this.masterVolume;

        //
        // N1
        //
        //let targetN1 = 20 + this.throttle * 80;
        let targetN1;

        if (this.isReverse) {
            targetN1 = 50 + this.throttle * 50;
        } else {
            targetN1 = 20 + this.throttle * 80;
        }
        this.n1 += (targetN1 - this.n1) * 0.005;

        //
        // N2
        //
        let targetN2 = 60 + this.throttle * 40;

        this.n2 += (targetN2 - this.n2) * 0.01;

        //
        // Fan Blade Passing Frequency
        //
        const bpf  = this.n1 * 18;
        const bpf2 = this.n1 * 20;

        this.fan.frequency.setTargetAtTime(
            bpf,
            this.ctx.currentTime,
            //0.05
            0.25
        );
        this.fan2.frequency.setTargetAtTime(
            bpf,
            this.ctx.currentTime,
            //0.05
            0.05
        );

        this.fanGain.gain.setTargetAtTime(
            0.02 +
            this.throttle * 0.06,
            this.ctx.currentTime,
            //0.05
            0.5
        );

        //
        // Core
        //
        const coreFreq = 400 + this.n2 * 25;

        this.core.frequency.setTargetAtTime(
            coreFreq,
            this.ctx.currentTime,
            //0.04
            0.2
        );

        this.coreGain.gain.setTargetAtTime(
            0.01 +
            this.throttle * 0.03,
            this.ctx.currentTime,
            //0.04
            0.2
        );

        //
        // Jet Noise
        //
        let noiseLevel;
        let noiseFreq;

        if (this.isReverse) {
            noiseLevel = 0.25 * this.throttle * 0.75;
            noiseFreq = 2000 + this.throttle * 5000;
        } else {
            noiseLevel = 0.50 * this.throttle * 0.35;
            noiseFreq = 200 + this.throttle * 4000;
        }

        
        this.noiseFilter.frequency
            .setTargetAtTime(
                //200 + this.throttle * 4000,
                noiseFreq,  
                this.ctx.currentTime,
                //0.05
                0.1
            );

        this.noiseGain.gain
            .setTargetAtTime(
                //0.05 + this.throttle * 0.35,
                //0.10 + this.throttle * 0.60,
                noiseLevel,
                this.ctx.currentTime,
                //0.05
                0.1
            );

        //
        // Low frequency rumble
        //
        let rumbleGain;

        if (this.isReverse) {
            rumbleGain = 0.10 + this.throttle * 0.20;
        } else {
            rumbleGain = 0.03 + this.throttle * 0.12;
        }
        
        this.rumble.frequency
            .setTargetAtTime(
                25 + this.throttle * 45,
                this.ctx.currentTime,
                //0.05
                0.5
            );

        this.rumbleGain.gain
            .setTargetAtTime(
                //0.03 + this.throttle * 0.12,
                rumbleGain,
                this.ctx.currentTime,
                //0.05
                0.5
            );
    } // update()

    //--------------------------------------------------
    // 毎フレーム更新
    //--------------------------------------------------
    update(n1, n2) {
        const n1Rate = 0.8;
        const n2Rate = 1.8;
        
//        requestAnimationFrame(
//            () => this.update());

        // マスターボリューム
        this.master.gain.value = this.masterVolume;

        //
        // N1
        //
//        let targetN1;

//        if (this.isReverse) {
//            targetN1 = 50 + this.throttle * 50;
//        } else {
//            targetN1 = 20 + this.throttle * 80;
//        }
//        this.n1 += (targetN1 - this.n1) * 0.005;
	this.n1 = n1;

        //
        // N2
        //
//        let targetN2 = 60 + this.throttle * 40;
//        this.n2 += (targetN2 - this.n2) * 0.01;
	this.n2 = n2;

        //
        // Fan Blade Passing Frequency
        //
        const bpf  = this.n1 * 18;
        const bpf2 = this.n1 * 20;

        this.fan.frequency.setTargetAtTime(
            bpf,
            this.ctx.currentTime,
            //0.05
            0.25
        );
        this.fan2.frequency.setTargetAtTime(
            bpf,
            this.ctx.currentTime,
            //0.05
            0.05
        );

        this.fanGain.gain.setTargetAtTime(
            0.02 +
            this.throttle * 0.06,
            this.ctx.currentTime,
            //0.05
            0.5
        );

        //
        // Core
        //
        const coreFreq = 400 + this.n2 * 25;

        this.core.frequency.setTargetAtTime(
            coreFreq,
            this.ctx.currentTime,
            //0.04
            0.2
        );

        this.coreGain.gain.setTargetAtTime(
            0.01 +
            this.throttle * 0.03,
            this.ctx.currentTime,
            //0.04
            0.2
        );

        //
        // Jet Noise
        //
        let noiseLevel;
        let noiseFreq;

        if (this.isReverse) {
            noiseLevel = 0.25 * this.throttle * 0.75;
            noiseFreq = 2000 + this.throttle * 5000;
        } else {
            noiseLevel = 0.50 * this.throttle * 0.35;
            noiseFreq = 200 + this.throttle * 4000;
        }

        
        this.noiseFilter.frequency
            .setTargetAtTime(
                //200 + this.throttle * 4000,
                noiseFreq,  
                this.ctx.currentTime,
                //0.05
                0.1
            );

        this.noiseGain.gain
            .setTargetAtTime(
                //0.05 + this.throttle * 0.35,
                //0.10 + this.throttle * 0.60,
                noiseLevel,
                this.ctx.currentTime,
                //0.05
                0.1
            );

        //
        // Low frequency rumble
        //
        let rumbleGain;

        if (this.isReverse) {
            rumbleGain = 0.10 + this.throttle * 0.20;
        } else {
            rumbleGain = 0.03 + this.throttle * 0.12;
        }
        
        this.rumble.frequency
            .setTargetAtTime(
                25 + this.throttle * 45,
                this.ctx.currentTime,
                //0.05
                0.5
            );

        this.rumbleGain.gain
            .setTargetAtTime(
                //0.03 + this.throttle * 0.12,
                rumbleGain,
                this.ctx.currentTime,
                //0.05
                0.5
            );
    } // update()
} // class EngineSound

// End of file (engine_sound.js)
