// module.exports = {
//     theme: {
//       extend: {
//         colors: {
//           primary: '#2563eb',
//           secondary: '#4f46e5',
//           accent: '#0ea5e9',
//           dark: '#1e293b',
//           light: '#f8fafc'
//         }
//       }
//     }
//   }
  
  
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // allows toggling dark mode manually with .dark
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom darker shade for your dark mode
        darker: "#1a1a1a", 
        primary: {
          DEFAULT: "#3B82F6", // Tailwind blue-500
          light: "#60A5FA",   // Tailwind blue-400
          dark: "#2563EB",    // Tailwind blue-600
        },
      },
    },
  },
  plugins: [],
};
