module.exports = {
    "collectCoverage": true,
    "collectCoverageFrom": [
        "server/controller/*.{js,jsx,ts,tsx}",
        "!server/lib/*.{js,jsx,ts,tsx}",
        "server/model/*.{js,jsx,ts,tsx}",
        "server/utils/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/",
        "!server/server.js",
    ],
    "coverageThreshold": {
        "global": {
            "lines": 0.1,
            "statements": 0.1
        }
    },
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/"
    ],
    "testTimeout": 1800000 
}
