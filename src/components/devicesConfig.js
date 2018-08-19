const DEVICE_MODES = {
    portrait: {
        id: 'portrait',
        mobile: true,
        landscape: false
    },
    landscape: {
        id: 'landscape',
        mobile: true,
        landscape: true
    },
    portraitTablet: {
        id: 'portraitTablet',
        mobile: false,
        landscape: false,
    },
    landscapeTablet: {
        id: 'landscapeTablet',
        mobile: false,
        landscape: true,
    }
};

const CREATIVE_TYPES = {
    interstitial: [
        {
            mode: DEVICE_MODES.portrait,
            sizes: {
                sm: { w: 320, h: 480 },
                md: { w: 900, h: 1400 },
                lg: { w: 900, h: 1600 },
                xl: { w: 1120, h: 1500 }
            }
        },
        {
            mode: DEVICE_MODES.landscape,
            sizes: {
                lg: {w: 768, h: 1024},
                xl: {w: 1536, h: 2048}
            }
        },
        {
            mode: DEVICE_MODES.portraitTablet,
            sizes: {
                sm: {w: 480, h: 320},
                md: {w: 1400, h: 900},
                lg: {w: 1600, h: 900},
                xl: {w: 1500, h: 1120}
            }
        },
        {
            mode: DEVICE_MODES.landscapeTablet,
            sizes: {
                lg: {w: 1024, h: 768},
                xl: {w: 2048, h: 1536}
            }
        }
    ],

    banner: [
        {
            mode: DEVICE_MODES.landscape,
            sizes: {
                sm: { w: 320, h: 50 },
                md: { w: 640, h: 100 }
            }
        },
        {
            mode: DEVICE_MODES.landscapeTablet,
            sizes: {
                md: { w: 728, h: 90 }
            }
        }
    ]
};

export {
    CREATIVE_TYPES
}