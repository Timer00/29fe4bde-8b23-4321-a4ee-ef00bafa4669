/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        // @ts-ignore
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: [
                                // These ensure we can handle multiple SVGs in the same page without id conflicts
                                {
                                    name: 'cleanupIds',
                                    active: false
                                },
                                {
                                    name: 'prefixIds',
                                    active: true
                                },
                                {
                                    // This is to fix some malformed SVGs
                                    name: 'removeDimensions',
                                    active: true
                                }
                            ]
                        }
                    }
                }]
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
    experimental: {
        // TODO: Remove once DeepL API is optimized
        workerThreads: false,
        cpus: 1
    },
};

export default config;

