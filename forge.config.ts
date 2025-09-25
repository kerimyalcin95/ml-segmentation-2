import type { ForgeConfig } from '@electron-forge/shared-types';
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const config: ForgeConfig = {
    packagerConfig: {
        asar: { unpack: '**/*.py' },
        ignore: [
            /\.gitignore$/,
            /requirements.txt$/
        ]
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'ml_segmentation_2',
                authors: 'Kerim Yalcin',
                setupExe: 'ml-segmentation-2-setup.exe',
                noMsi: true,
                setupMsi: false,
                skipUpdateIcon: false,
                shortcutName: 'ML-Segmentation-2'
            },
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
            config: {}
        },
        {
            name: '@electron-forge/maker-deb',
            platforms: ['linux'],
            config: {}
        }
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {},
        },
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};

export default config;
