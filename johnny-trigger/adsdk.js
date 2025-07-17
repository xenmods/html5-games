/**
 * adService constructor.
 * Manages the state of rewarded video ads.
 */
function adService() {
    // State constants for the ad loading process
    this.n = -1; // Not loaded or initial state
    this.a = 1;  // Actively loading
    this.o = 2;  // Loaded and ready to show ('o' for okay/loaded)
    this.l = 3;  // Legacy or other state

    // Initial state
    this.loadRewardState = this.n;

    console.log("Ad service initialized.");
}

/**
 * Starts a recurring check to ensure a rewarded ad is preloaded.
 */
adService.prototype.startPreLoad = function() {
    // Set an interval to check for an ad every 30 seconds
    setInterval(this.checkHasAd.bind(this), 30000);
    // Perform an initial check immediately
    this.checkHasAd();
    console.log("Ad preloading process started. Will check every 30 seconds.");
};

/**
 * Checks if an ad needs to be loaded.
 * If the ad is not already loaded or in the process of loading, it triggers the load.
 */
adService.prototype.checkHasAd = function() {
    var t = this;
    console.log("Checking if an ad needs to be loaded. Current state:", this.loadRewardState);
    // If state is not 'loaded' (o) and not 'loading' (a), then start loading.
    if (this.loadRewardState !== this.o && this.loadRewardState !== this.a) {
        console.log("No ad ready. Triggering preload.");
        this.loadRewardedVideo();
    } else {
        console.log("An ad is already loading or ready.");
    }
};

/**
 * Simulates preloading a rewarded video ad.
 * This function mimics an asynchronous ad loading call.
 */
adService.prototype.loadRewardedVideo = function(e) {
    var t = this;

    // Proceed only if an ad isn't already loaded or in the process of loading.
    if (this.loadRewardState !== this.o && this.loadRewardState !== this.a) {
        // Set state to 'loading'
        t.loadRewardState = this.a;
        console.log("Attempting to preload rewarded ad... State set to 'loading' (1).");

        // Simulate a network request with a timeout
        setTimeout(function() {
            // Simulate a successful ad load
            console.log("Mock ad preloaded successfully.");
            // Set state to 'loaded'
            t.loadRewardState = t.o;
            console.log("Ad state set to 'loaded' (2).");
        }, 1500); // Simulate a 1.5 second load time
    }
};

/**
 * Simulates showing a rewarded video ad.
 * Returns a promise that resolves if the ad is "shown" successfully
 * and rejects otherwise.
 */
adService.prototype.showRewardedVideo = function(e, t) {
    var i = this;

    // This function returns a Promise, maintaining the original API contract.
    return new Promise(function(resolve, reject) {
        // Check if the ad is in the 'loaded' state.
        if (i.loadRewardState == i.o) {
            console.log("Attempting to show rewarded ad...");

            // Simulate showing the ad and waiting for it to complete.
            setTimeout(function() {
                console.log("Ad shown successfully. Resolving promise and granting reward.");
                resolve(); // Signal success
                // Reset state to 'not loaded' so a new ad can be fetched later.
                i.loadRewardState = i.n;
                console.log("Ad state reset to 'not loaded' (-1).");
            }, 500); // Simulate a quick 0.5 second ad view

        } else {
            // If the ad is not ready to be shown.
            console.error("Could not show ad because it was not loaded. Current state:", i.loadRewardState);
            reject(); // Signal failure
        }
    });
};
