module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        blue: {
          DEFAULT: "#002577",
          facebook: "#435995",
          google: "#4B65AB",
          indeed: "#3376B5",
          linkedIn: "#5B89EE",
          medium: "#176194",
          light: "#8EA9B4",
        },
        grey: "#F2F2F2",
        white: "#FFFFFF",
        // Below are for theming values
        primary: "#8105D9",
        secondary: "#002577",
      },
      fontFamily: {
        avenir: ["AvenirNext"],
        avenirBold: ["AvenirNextBold"],
        openSans: ["OpenSans"],
        openSansBold: ["OpenSansBold"],
      },
      fontSize: {
        sm: "0.875rem", // 14px,
        normal: "1rem", // 16px
        md: "1.125rem;", // 18px
        lg: "1.5625rem", // 25px
        xlg: "2rem", // 32px
        xxlg: "2.5rem", // 40px
      },
      screens: {
        tablet: "744px",
        desktop: "1440px",
      },
      boxShadow: {
        "4xl": "4px 4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
