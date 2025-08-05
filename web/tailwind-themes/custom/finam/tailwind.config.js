/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    // tremor
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      transitionProperty: {
        spacing: "margin, padding",
      },
      keyframes: {
        "subtle-pulse": {
          "0%, 100%": { opacity: 0.9 },
          "50%": { opacity: 0.5 },
        },
        pulse: {
          "0%, 100%": { opacity: 0.9 },
          "50%": { opacity: 0.4 },
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-out-scale": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "subtle-pulse": "subtle-pulse 2s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-scale": "fade-in-scale 0.2s ease-out forwards",
        "fade-out-scale": "fade-out-scale 0.2s ease-in forwards",
      },

      gradientColorStops: {
        "neutral-10": "var(--neutral-10) 5%",
      },
      screens: {
        "2xl": "1420px",
        "3xl": "1700px",
        "4xl": "2000px",
        mobile: { max: "767px" },
        desktop: "768px",
        tall: { raw: "(min-height: 800px)" },
        short: { raw: "(max-height: 799px)" },
        "very-short": { raw: "(max-height: 600px)" },
      },
      fontFamily: {
        sans: ["Hanken Grotesk", "var(--font-inter)", "sans-serif"],
        hanken: ["Hanken Grotesk", "sans-serif"],
      },
      width: {
        "message-xs": "450px",
        "message-sm": "550px",
        "message-default": "740px",
        "searchbar-xs": "560px",
        "searchbar-sm": "660px",
        searchbar: "850px",
        "document-sidebar": "800px",
        "document-sidebar-large": "1000px",
        "searchbar-max": "60px",
      },
      maxWidth: {
        "document-sidebar": "1000px",
        "message-max": "850px",
        "content-max": "725px",
        "searchbar-max": "800px",
      },
      colors: {
        // Finam theme colors - replacing existing colors with brandbook colors
        // Primary colors from brandbook
        primary: {
          light: "#F9F9FC", // Primary light
          yellow: "#FFC75A", // Primary yellow (accent)
        },
        // Secondary colors from brandbook
        secondary: {
          light: "#F1F0F4", // Secondary light
          red: "#F26B6F", // Secondary red (accent)
        },
        // Tertiary colors from brandbook
        tertiary: {
          gray: "#797780", // Tertiary gray
          dark: "#202023", // Tertiary dark
        },
        // Background colors from brandbook
        background: {
          primary: {
            light: "#FFFFFF", // Background primary light
            dark: "#27272B", // Background primary dark
          },
          secondary: {
            light: "#FAF9FC", // Background secondary light
            dark: "#2D2C30", // Background secondary dark
          },
          tertiary: {
            light: "#F1F0F5", // Background tertiary light
            dark: "#1F1F21", // Background tertiary dark
          },
        },

        // code styling
        "code-bg": "#000",
        "code-text": "var(--code-text)",
        "token-comment": "var(--token-comment)",
        "token-punctuation": "var(--token-punctuation)",
        "token-property": "var(--token-property)",
        "token-selector": "var(--token-selector)",
        "token-atrule": "var(--token-atrule)",
        "token-function": "var(--token-function)",
        "token-regex": "var(--token-regex)",
        "token-attr-name": "var(--token-attr-name)",
        "non-selectable": "var(--non-selectable)",

        "gray-background": "#F1F0F4", // Using secondary light

        "new-background": "#FFFFFF", // Using background primary light
        "new-background-light": "#FAF9FC", // Using background secondary light
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",

        "input-text": "#202023", // Using tertiary dark

        // background - replacing with finam colors
        background: "#FFFFFF", // Using background primary light
        "input-border": "#F1F0F4", // Using secondary light
        "input-background": "#FFFFFF", // Using background primary light
        "input-option": "#FAF9FC", // Using background secondary light
        "input-option-hover": "#F1F0F5", // Using background tertiary light
        "accent-background": "#FFC75A", // Using primary yellow
        "accent-background-hovered": "#F26B6F", // Using secondary red
        "accent-background-selected": "#FFC75A", // Using primary yellow
        "background-50": "#F9F9FC", // Using primary light
        "background-dark": "#F1F0F4", // Using secondary light
        "background-100": "#F1F0F4", // Using secondary light
        "background-125": "#F1F0F5", // Using background tertiary light
        "background-150": "#F1F0F5", // Using background tertiary light
        "background-200": "#F1F0F4", // Using secondary light
        "background-300": "#797780", // Using tertiary gray
        "background-400": "#797780", // Using tertiary gray
        "background-500": "#797780", // Using tertiary gray
        "background-600": "#202023", // Using tertiary dark
        "background-700": "#202023", // Using tertiary dark
        "background-800": "#27272B", // Using background primary dark
        "background-900": "#2D2C30", // Using background secondary dark

        "gray-background": "#F1F0F4", // Using secondary light
        "gray-background-dark": "#F1F0F4", // Using secondary light
        "gray-background-100": "#F1F0F4", // Using secondary light
        "gray-background-125": "#F1F0F5", // Using background tertiary light
        "gray-background-150": "#F1F0F5", // Using background tertiary light
        "gray-background-200": "#F1F0F4", // Using secondary light
        "gray-background-300": "#797780", // Using tertiary gray
        "gray-background-400": "#797780", // Using tertiary gray
        "gray-background-500": "#797780", // Using tertiary gray
        "gray-background-600": "#202023", // Using tertiary dark
        "gray-background-700": "#202023", // Using tertiary dark
        "gray-background-800": "#27272B", // Using background primary dark
        "gray-background-900": "#2D2C30", // Using background secondary dark

        "text-history-sidebar-button": "#202023", // Using tertiary dark

        "background-inverted": "#27272B", // Using background primary dark
        "background-emphasis": "#F1F0F5", // Using background tertiary light
        "background-strong": "#797780", // Using tertiary gray
        "background-search": "#FFFFFF", // Using background primary light

        "background-history-sidebar-button-hover": "#F1F0F4", // Using secondary light
        "divider-history-sidebar-bar": "#F1F0F4", // Using secondary light
        "text-mobile-sidebar": "#202023", // Using tertiary dark
        "background-search-filter": "#F1F0F4", // Using secondary light
        "background-search-filter-dropdown": "#F1F0F4", // Using secondary light

        "user-bubble": "#F1F0F4", // Using secondary light

        // colors for sidebar in chat, search, and manage settings
        "background-chatbar": "#FAF9FC", // Using background secondary light
        "text-sidebar": "#797780", // Using tertiary gray

        "toggled-background": "#797780", // Using tertiary gray
        "untoggled-background": "#F1F0F4", // Using secondary light
        "background-starter-message": "#FFFFFF", // Using background primary light
        "background-starter-message-hover": "#F1F0F4", // Using secondary light

        "text-sidebar-toggled-header": "#202023", // Using tertiary dark
        "text-sidebar-header": "#202023", // Using tertiary dark

        "background-back-button": "#F1F0F4", // Using secondary light
        "text-back-button": "#27272B", // Using background primary dark

        // Settings
        "text-sidebar-subtle": "#797780", // Using tertiary gray
        "icon-settings-sidebar": "#202023", // Using tertiary dark
        "text-settings-sidebar": "#202023", // Using tertiary dark
        "text-settings-sidebar-strong": "#2D2C30", // Using background secondary dark
        "background-settings-hover": "#F1F0F4", // Using secondary light

        "text-application-toggled": "#202023", // Using tertiary dark
        "text-application-untoggled": "#797780", // Using tertiary gray
        "text-application-untoggled-hover": "#202023", // Using tertiary dark

        "background-chat-hover": "#F1F0F5", // Using background tertiary light
        "background-chat-selected": "#F1F0F5", // Using background tertiary light
        black: "#202023", // Using tertiary dark
        white: "#FFFFFF", // Using background primary light

        // Background for chat messages (user bubbles)
        user: "#F1F0F4", // Using secondary light

        "userdropdown-background": "#27272B", // Using background primary dark
        "text-mobile-sidebar-toggled": "#27272B", // Using background primary dark
        "text-mobile-sidebar-untoggled": "#797780", // Using tertiary gray
        "text-editing-message": "#27272B", // Using background primary dark
        "background-sidebar": "#FAF9FC", // Using background secondary light
        "background-search-filter": "#F1F0F4", // Using secondary light
        "background-search-filter-dropdown": "#F1F0F5", // Using background tertiary light

        "background-toggle": "#F1F0F4", // Using secondary light

        // Colors for the search toggle buttons
        "background-agentic-toggled": "#FFC75A", // Using primary yellow
        "background-agentic-untoggled": "#F1F0F4", // Using secondary light
        "text-agentic-toggled": "#202023", // Using tertiary dark
        "text-agentic-untoggled": "#FFFFFF", // Using background primary light
        "text-chatbar-subtle": "#797780", // Using tertiary gray
        "text-chatbar": "#27272B", // Using background primary dark

        // Color for the star indicator on high quality search results.
        "star-indicator": "#F1F0F4", // Using secondary light

        // Backgrounds for submit buttons on search and chat
        "submit-background": "#27272B", // Using background primary dark
        "disabled-submit-background": "#797780", // Using tertiary gray

        input: "#FFFFFF", // Using background primary light

        text: "#202023", // Using tertiary dark
        "text-darker": "#202023", // Using tertiary dark
        "text-dark": "#27272B", // Using background primary dark
        "sidebar-border": "#F1F0F4", // Using secondary light
        "text-gray": "#797780", // Using tertiary gray

        "text-light": "#F9F9FC", // Using primary light

        "text-50": "#F9F9FC", // Using primary light
        "text-100": "#F1F0F4", // Using secondary light
        "text-200": "#F1F0F4", // Using secondary light
        "text-300": "#797780", // Using tertiary gray
        "text-400": "#797780", // Using tertiary gray
        "text-500": "#797780", // Using tertiary gray
        "text-600": "#202023", // Using tertiary dark
        "text-700": "#202023", // Using tertiary dark
        "text-800": "#27272B", // Using background primary dark
        "text-900": "#2D2C30", // Using background secondary dark
        "text-950": "#1F1F21", // Using background tertiary dark
        "text-muted": "#797780", // Using tertiary gray

        "user-text": "#27272B", // Using background primary dark

        description: "#797780", // Using tertiary gray
        subtle: "#202023", // Using tertiary dark
        default: "#202023", // Using tertiary dark
        emphasis: "#202023", // Using tertiary dark
        strong: "#2D2C30", // Using background secondary dark

        // borders
        border: "#F1F0F4", // Using secondary light
        "border-light": "#F1F0F4", // Using secondary light
        "border-medium": "#797780", // Using tertiary gray
        "border-strong": "#797780", // Using tertiary gray
        "border-dark": "#202023", // Using tertiary dark
        "non-selectable-border": "#F1F0F4", // Using secondary light

        inverted: "#FFFFFF", // Using background primary light
        link: "#FFC75A", // Using primary yellow
        "link-hover": "#F26B6F", // Using secondary red

        // one offs
        error: "#F26B6F", // Using secondary red
        success: "#FFC75A", // Using primary yellow
        alert: "#F26B6F", // Using secondary red
        accent: "#FFC75A", // Using primary yellow
        "agent-sidebar": "#FAF9FC", // Using background secondary light
        agent: "#FFC75A", // Using primary yellow
        "lighter-agent": "#F9F9FC", // Using primary light
        "agent-hovered": "#F26B6F", // Using secondary red
        // hover
        "hover-light": "#F1F0F5", // Using background tertiary light
        "hover-lightish": "#F1F0F5", // Using background tertiary light

        hover: "#F1F0F5", // Using background tertiary light
        "hover-emphasis": "#797780", // Using tertiary gray
        "accent-hover": "#F26B6F", // Using secondary red

        // keyword highlighting
        highlight: {
          text: "#FFC75A", // Using primary yellow
        },

        // scrollbar
        scrollbar: {
          track: "#F1F0F4", // Using secondary light
          thumb: "#797780", // Using tertiary gray
          "thumb-hover": "#202023", // Using tertiary dark

          dark: {
            thumb: "#797780", // Using tertiary gray
            "thumb-hover": "#202023", // Using tertiary dark
          },
        },

        // for display documents
        document: "#202023", // Using tertiary dark

        // light mode
        tremor: {
          brand: {
            faint: "#F9F9FC", // Using primary light
            muted: "#F1F0F4", // Using secondary light
            subtle: "#FFC75A", // Using primary yellow
            DEFAULT: "#FFC75A", // Using primary yellow
            emphasis: "#F26B6F", // Using secondary red
            inverted: "#FFFFFF", // Using background primary light
          },
          background: {
            muted: "#F1F0F4", // Using secondary light
            subtle: "#FAF9FC", // Using background secondary light
            DEFAULT: "#FFFFFF", // Using background primary light
            emphasis: "#F1F0F5", // Using background tertiary light
          },
          border: {
            DEFAULT: "#F1F0F4", // Using secondary light
          },
          ring: {
            DEFAULT: "#FFC75A", // Using primary yellow
          },
          content: {
            subtle: "#797780", // Using tertiary gray
            DEFAULT: "#202023", // Using tertiary dark
            emphasis: "#27272B", // Using background primary dark
            strong: "#2D2C30", // Using background secondary dark
            inverted: "#FFFFFF", // Using background primary light
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#1F1F21", // Using background tertiary dark
            muted: "#2D2C30", // Using background secondary dark
            subtle: "#FFC75A", // Using primary yellow
            DEFAULT: "#FFC75A", // Using primary yellow
            emphasis: "#F26B6F", // Using secondary red
            inverted: "#202023", // Using tertiary dark
          },
          background: {
            muted: "#2D2C30", // Using background secondary dark
            subtle: "#27272B", // Using background primary dark
            DEFAULT: "#1F1F21", // Using background tertiary dark
            emphasis: "#202023", // Using tertiary dark
          },
          border: {
            DEFAULT: "#2D2C30", // Using background secondary dark
          },
          ring: {
            DEFAULT: "#FFC75A", // Using primary yellow
          },
          content: {
            subtle: "#797780", // Using tertiary gray
            DEFAULT: "#F1F0F4", // Using secondary light
            emphasis: "#FFFFFF", // Using background primary light
            strong: "#F9F9FC", // Using primary light
            inverted: "#202023", // Using tertiary dark
          },
        },
        foreground: "#202023", // Using tertiary dark
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "2xs": "0.625rem",
        "code-sm": "small",
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      fontWeight: {
        description: "375",
        "token-bold": "bold",
      },
      fontStyle: {
        "token-italic": "italic",
      },
      calendar: {
        // Light mode
        "bg-selected": "#FFC75A", // Using primary yellow
        "bg-outside-selected": "#F1F0F4", // Using secondary light
        "text-muted": "#797780", // Using tertiary gray
        "text-selected": "#202023", // Using tertiary dark
        "range-start": "#FFC75A", // Using primary yellow
        "range-middle": "#F9F9FC", // Using primary light
        "range-end": "#FFC75A", // Using primary yellow
        "text-in-range": "#202023", // Using tertiary dark

        // Dark mode
        "bg-selected-dark": "#FFC75A", // Using primary yellow
        "bg-outside-selected-dark": "#2D2C30", // Using background secondary dark
        "text-muted-dark": "#797780", // Using tertiary gray
        "text-selected-dark": "#FFFFFF", // Using background primary light
        "range-start-dark": "#FFC75A", // Using primary yellow
        "range-middle-dark": "#1F1F21", // Using background tertiary dark
        "range-end-dark": "#FFC75A", // Using primary yellow
        "text-in-range-dark": "#FFFFFF", // Using background primary light

        // Hover effects
        "hover-bg": "#F1F0F5", // Using background tertiary light
        "hover-bg-dark": "#202023", // Using tertiary dark
        "hover-text": "#202023", // Using tertiary dark
        "hover-text-dark": "#F1F0F4", // Using secondary light

        // Today's date
        "today-bg": "#F26B6F", // Using secondary red
        "today-bg-dark": "#F26B6F", // Using secondary red
        "today-text": "#FFFFFF", // Using background primary light
        "today-text-dark": "#FFFFFF", // Using background primary light
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
  ],
}; 