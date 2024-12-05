import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		fontFamily: {
  			'destaque-gg': ["var(--font-raleway)"],
  			'destaque-g': ["var(--font-raleway)"],
  			destaque: ["var(--font-raleway)"],
  			'destaque-p': ["var(--font-raleway)"],
  			titulos: ["var(--font-quicksand)"],
  			subtitulos: ["var(--font-quicksand)"],
  			paragrafos: ["var(--font-quicksand)"],
  			citacao: ["var(--font-raleway)"],
  			placeholder: ["var(--font-quicksand)"]
  		},
  		fontSize: {
  			'destaque-gg': '2.25rem',
  			'destaque-g': '2rem',
  			destaque: '1.5rem',
  			'destaque-p': '1rem',
  			titulos: '1.8rem',
  			subtitulos: '1.25rem',
  			paragrafos: '1.25rem',
  			citacao: '1rem',
  			placeholder: '0.75rem'
  		},
  		fontWeight: {
  			'destaque-gg': '900',
  			'destaque-g': '900',
  			destaque: '900',
  			'destaque-p': '900',
  			titulos: '700',
  			subtitulos: '600',
  			paragrafos: '400',
  			citacao: '300',
  			placeholder: '400'
  		},
  		colors: {
  			'verde-claro': '#57949F',
  			'verde-escuro': '#1E4857',
  			pessego: '#DB876D',
  			lilas: '#C49DA5',
  			'rosa-suave': '#F5DDD5',
  			amarelo: '#FAC957',
  			preto: '#1C1C1C',
  			'cinza-escuro': '#989898',
  			'cinza-medio': '#D9D9D9',
  			'cinza-claro': '#EAEAEA'
  		},
  		animation: {
  			'spin-fast': 'spin .3s linear infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
