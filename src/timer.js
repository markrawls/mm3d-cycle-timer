class Timer {
  running = false;
  startTime = null;
  homeBufferTime = 3700;

  wrongWarpWindowOffset = 149000;
  zeroDayWindowOffset = 84000;

  wrongWarpWindowLength = 15000;
  zeroDayWindowLength = 15000;

  cycleRepeatOffset = 80400;

  get inWrongWarpWindow() {
    return this.inWindow(this.wrongWarpWindowOffset, this.wrongWarpWindowLength);
  }

  get inZeroDayWindow() {
    return this.inWindow(this.zeroDayWindowOffset, this.zeroDayWindowLength);
  }

  inWindow = (startOffset, length) => {
    if (!this.running) {
      return false;
    }

    const currentTime = Date.now();

    for (let i = this.startTime + startOffset; i <= currentTime; i += this.cycleRepeatOffset) {
      if (currentTime <= i + length) {
        return true;
      }
    }

    return false;
  };

  start = () => {
    this.running = true;
    this.startTime = Date.now();
  };

  stop = () => {
    this.running = false;
    this.startTime = null;
  };

  toggle = () => {
    if (this.running) {
      return this.stop();
    }

    return this.start();
  };

  homeBuffer = () => {
    if (!this.running) {
      return;
    }

    this.startTime += this.homeBufferTime;
  };

  undoHomeBuffer = () => {
    if (!this.running) {
      return;
    }

    this.startTime -= this.homeBufferTime;
  };
}

export default Timer;
